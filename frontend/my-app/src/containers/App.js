import React, { Component } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import AuthForm from '../components/AuthForm/AuthForm';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Avenir', 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;

const AppWrapper = styled.div `
  text-align: center;
`;


class App extends Component {
  render() {
    return (
      <>
        <GlobalStyle/>
        <AppWrapper>
          <AuthForm />
        </AppWrapper>
      </>
    );
  }
}

export default App;
