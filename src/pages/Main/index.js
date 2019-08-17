import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FaGithubAlt, FaPlus, FaSpinner } from "react-icons/fa";

import Container from "../../components/Container";
import { Form, SubmitButton, List } from "./styles";

import api from "../../services/api";

export default class Main extends Component {
  state = {
    newRepo: "",
    repositories: [],
    loading: false,
    caughtError: false,
  };

  // Carregar os dados do localStorage
  componentDidMount() {
    const repositories = localStorage.getItem("repositories");

    if (repositories) {
      this.setState({ repositories: JSON.parse(repositories) });
    }
  }

  // Atualizar dados no localStorage
  componentDidUpdate(_, prevState) {
    const { repositories } = this.state;

    if (repositories !== prevState.repositories) {
      localStorage.setItem("repositories", JSON.stringify(repositories));
    }
  }

  handleInputChange = e => {
    this.setState({ newRepo: e.target.value, caughtError: false });
  };

  handleSubmit = async e => {
    e.preventDefault();

    this.setState({ loading: true });

    const { newRepo, repositories } = this.state;

    try {
      if (repositories.find(repo => repo.name === newRepo)) {
        throw new Error("Repositório duplicado");
      }

      const response = await api.get(`/repos/${newRepo}`);

      const data = {
        name: response.data.full_name,
      };

      this.setState({
        repositories: [...repositories, data],
        newRepo: "",
      });
    } catch (err) {
      this.setState({ caughtError: true });
    }
    this.setState({
      loading: false,
    });
  };

  render() {
    const { newRepo, repositories, loading, caughtError } = this.state;

    return (
      <Container>
        <h1>
          <FaGithubAlt />
          Repositórios
        </h1>

        <Form
          onSubmit={this.handleSubmit}
          className={caughtError ? "redBorder" : "greyBorder"}
        >
          <input
            type="text"
            placeholder="Adicionar repositório"
            value={newRepo}
            onChange={this.handleInputChange}
          />
          <SubmitButton loading={loading}>
            {loading ? (
              <FaSpinner color="#fff" size={14} />
            ) : (
              <FaPlus color="#fff" size={14} />
            )}
          </SubmitButton>
        </Form>

        <List>
          {repositories.map(repository => (
            <li key={repository.name}>
              <span>{repository.name}</span>
              <Link to={`/repository/${encodeURIComponent(repository.name)}`}>
                Detalhes
              </Link>
            </li>
          ))}
        </List>
      </Container>
    );
  }
}
