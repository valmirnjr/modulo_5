import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

import api from "../../services/api";

import Container from "../../components/Container";
import { Loading, Owner, IssueList, Filter, PageList } from "./styles";

const propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      repository: PropTypes.string,
      page: PropTypes.number,
    }),
  }).isRequired,
};

class Repository extends Component {
  state = {
    repository: {},
    issues: [],
    loading: true,
    repoState: "open",
    page: 1,
  };

  async componentDidMount() {
    const { match } = this.props;

    const { repoState, page } = this.state;

    const repoName = decodeURIComponent(match.params.repository);

    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          state: repoState,
          page,
          per_page: 5,
        },
      }),
    ]);

    this.setState({
      repository: repository.data,
      issues: issues.data,
      loading: false,
    });
  }

  // Atualizar página com novo filtro
  /* async componentDidUpdate(_, prevState) {
    const { match } = this.props;
    const { repoState, page } = this.state;

    const repoName = decodeURIComponent(match.params.repository);

    if (repoState !== prevState.repoState) {
      const issues = await api.get(`/repos/${repoName}/issues`, {
        params: {
          state: repoState,
          page: 1,
          per_page: 5,
        },
      });

      this.setState({
        issues: issues.data,
        page: 1,
        loading: false,
      });
    }

    if (page !== prevState.page) {
      const issues = await api.get(`/repos/${repoName}/issues`, {
        params: {
          state: repoState,
          page,
          per_page: 5,
        },
      });

      this.setState({
        issues: issues.data,
        page,
        loading: false,
      });
    }
  } */

  loadIssues = async () => {
    const { match } = this.props;
    const { repoState, page } = this.state;

    const repoName = decodeURIComponent(match.params.repository);

    const issues = await api.get(`/repos/${repoName}/issues`, {
      params: {
        state: repoState,
        page,
        per_page: 5,
      },
    });

    this.setState({
      issues: issues.data,
      loading: false,
    });
  };

  handleInputChange = async e => {
    await this.setState({ repoState: e.target.value, page: 1 });
    this.loadIssues();
  };

  // Receives the amount of pages to avance or to go back
  handlePageChange = async amount => {
    const { page } = this.state;
    await this.setState({ page: page + amount });
    this.loadIssues();
  };

  render() {
    const { repository, issues, loading, page } = this.state;

    if (loading) {
      return <Loading>Carregando</Loading>;
    }

    return (
      <Container>
        <Owner>
          <Link to="/">Voltar aos repositórios</Link>
          <img
            src={`${repository.owner.avatar_url}`}
            alt={`${repository.owner.login}`}
          />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>

        <Filter>
          Buscar repositórios:
          <label htmlFor="open">
            <input
              type="radio"
              id="open"
              name="stateFilter"
              value="open"
              onChange={this.handleInputChange}
            />
            <span>Abertos</span>
          </label>
          <label htmlFor="closed">
            <input
              type="radio"
              id="closed"
              name="stateFilter"
              value="closed"
              onChange={this.handleInputChange}
            />
            <span>Fechados</span>
          </label>
          <label htmlFor="all">
            <input
              type="radio"
              id="all"
              name="stateFilter"
              value="all"
              onChange={this.handleInputChange}
            />
            <span>Todos</span>
          </label>
        </Filter>

        <IssueList>
          {issues.map(issue => (
            <li key={String(issue.id)}>
              <img src={issue.user.avatar_url} alt={issue.user.login} />
              <div>
                <strong>
                  <a href={issue.html_url}>{issue.title} </a>
                  {issue.labels.map(label => (
                    <span key={String(label.id)}>{label.name}</span>
                  ))}
                </strong>
                <p>{issue.user.login}</p>
              </div>
            </li>
          ))}
        </IssueList>

        <PageList>
          <button
            type="button"
            onClick={() => this.handlePageChange(-1)}
            disabled={page === 1}
          >
            <FaArrowLeft color="#fff" size={14} />
          </button>
          <button type="button" onClick={() => this.handlePageChange(1)}>
            <FaArrowRight color="#fff" size={14} />
          </button>
        </PageList>
      </Container>
    );
  }
}

Repository.propTypes = propTypes;

export default Repository;
