import React, { Component } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import PostContainer from '../components/Container/PostContainer';
import ThemeContainer from '../components/Container/ThemeContainer';


class Profile extends Component {
  render() {
    return (
      <>
        <Header />
        <PostContainer />
        <ThemeContainer />
        <Footer /> 
      </>
    );
  }
};

export default Profile;
