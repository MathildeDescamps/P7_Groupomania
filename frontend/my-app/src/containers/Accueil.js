import React, { Component } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import PostContainer from '../components/Container/PostContainer';
import ThemeContainer from '../components/Container/ThemeContainer';



const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Avenir', 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #F6F6F5;
  }
`;

class Accueil extends Component {
  render() {
    return (
      <>
        <GlobalStyle/> 
        <Header />
        <PostContainer />
        <ThemeContainer />
        <Footer /> 
      </>
    );
  }
};

export default Accueil;
