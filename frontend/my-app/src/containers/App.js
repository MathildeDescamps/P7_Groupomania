import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import AuthForm from '../components/AuthForm/AuthForm';
import Accueil from './Accueil';


const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Avenir', 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  text-align: center;
  }
`;

class App extends Component {
  render() {
    return (
      <>
      <Router>
        <GlobalStyle/>
        <Switch>
          <Route path="/" exact component={AuthForm} />
          <Route path="/accueil" exact component={Accueil} />
          <Route path="/accueil/:id" exact component={Accueil} />
        </Switch>

      </Router>
      </>
    );
  }
}

export default App;
