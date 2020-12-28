import React, { Component } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import PostContainer from '../components/Container/PostContainer';
import ThemeContainer from '../components/Container/ThemeContainer';
import UrlAPI from '../components/Container/ThemeContainer';
class Accueil extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      themeClicked: null,
};
  };

  handleFilter = () => {
    let url = new URL('http://localhost:5000/accueil');
    let params = new URLSearchParams(url.search);
    let theme = params.get('theme_id');
    this.setState({ themeClicked: theme });
    console.log(this.state.themeClicked);
    console.log('yo');
    //this.setState({ themeClicked: fullUrl.theme_id });
  };

  render() {
    return (
      <>
        <Header />
        <PostContainer />
        <ThemeContainer filter={this.handleFilter} />
        <Footer /> 
      </>
    );
  }
};

export default Accueil;
