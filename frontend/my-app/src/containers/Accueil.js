import React, { useState, useEffect } from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import PageBodyContainer from '../components/PostAndTheme/PageBodyContainer';
import axios from 'axios';

const UrlAPI = 'http://localhost:3000/api/';

const Accueil = () => {
  const [userList, setUserList] = useState(null);

  const getUsers = async () => {
    const response = await axios.get(UrlAPI + 'users')
        .then(result => result.data)
        .then(data => setUserList(data))
  }

  useEffect ( () => {
      if (!userList) getUsers();
  }, []);

    return (
      <>
        {userList && <Header userList={userList} />}
        {userList && <PageBodyContainer userList={userList} />}
        <Footer /> 
      </>
    );
};

export default Accueil;
