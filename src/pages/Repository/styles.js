import styled from "styled-components";

export const Loading = styled.div`
  color: #fff;
  font-size: 30px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

export const Owner = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;

  a {
    color: #7159c1;
    font-size: 16px;
    text-decoration: none;
  }

  img {
    width: 120px;
    border-radius: 50%;
    margin-top: 20px;
  }

  h1 {
    font-size: 24px;
    margin-top: 10px;
  }

  p {
    margin-top: 5px;
    font-size: 14px;
    color: #666;
    line-height: 1.4;
    text-align: center;
    max-width: 400px;
  }
`;

export const Filter = styled.div`
  margin-top: 15px;
  display: flex;
  align-items: flex-start;
  justify-content: center;

  label input {
    margin-left: 10px;
  }

  label span {
    padding-left: 5px;
  }
`;

export const IssueList = styled.ul`
  margin-top: 30px;
  padding-top: 30px;
  border-top: 1px solid #eee;
  list-style: none;

  li {
    padding: 15px 10px;
    border: 1px solid #eee;
    border-radius: 4px;
    display: flex;

    & + li {
      margin-top: 10px;
    }
  }

  li img {
    height: 36px;
    width: 36px;
    border-radius: 50%;
    border: 2px solid #eee;
  }

  div {
    flex: 1;
    margin-left: 15px;

    strong {
      font-size: 16px;

      a {
        text-decoration: none;
        color: #333;

        &:hover {
          color: #7159c1;
        }
      }

      span {
        height: 20px;
        background: #eee;
        border-radius: 2px;
        color: #333;
        font-size: 12px;
        font-weight: 600;
        margin-left: 10px;
        padding: 3px 4px;
      }
    }

    p {
      margin-top: 5px;
      font-size: 12px;
      color: #999;
    }
  }
`;
