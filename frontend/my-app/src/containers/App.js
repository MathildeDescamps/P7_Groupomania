import React, { Component } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Portal from '../containers/Portal/Portal';
import logo from '../portalLogo.png';

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

const Logo = styled.img`
    height: 150px;
    margin-top: 70px;
`;

class App extends Component {
  render() {
    return (
      <>
        <GlobalStyle/>
        <AppWrapper>
          <Logo src={ logo } alt='[ logo Postmania ]' />
          <Portal />
        </AppWrapper>
      </>
    );
  }
}

export default App;
