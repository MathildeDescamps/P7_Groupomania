import React, { Component } from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import PageBodyContainer from '../components/PostAndTheme/PageBodyContainer';
//import ThemeContainer from '../components/Theme/ThemeContainer';


class Accueil extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      themeClicked: null,
};
  };


  render() {
    return (
      <>
        <Header />
        <PageBodyContainer />
        <Footer /> 
      </>
    );
  }
};

export default Accueil;
