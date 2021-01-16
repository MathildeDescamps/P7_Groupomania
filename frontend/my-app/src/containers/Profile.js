import React, { Component } from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import ProfilePageBodyContainer from '../components/PostAndTheme/ProfilePageBodyContainer';

class Profile extends Component {
  render() {
    return (
      <>
        <Header />
        <ProfilePageBodyContainer />
        <Footer /> 
      </>
    );
  }
};

export default Profile;
