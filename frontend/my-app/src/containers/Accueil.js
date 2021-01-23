import React, { useState, useEffect } from 'react';
import authHeader from '../components/AuthForm/AuthHeader';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import PageBodyContainer from '../components/PostAndTheme/PageBodyContainer';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const UrlAPI = 'http://localhost:3000/api/';
let currentUser = JSON.parse(sessionStorage.getItem("currentUser"));

const Accueil = () => {

  const history = useHistory();

  const [userList, setUserList] = useState(null);

  const getUsers = async () => {  
    currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
    if (!currentUser) {
    window.location.pathname = "/";
    }
    const response = await axios.get(UrlAPI + currentUser.id + '/users', { headers: authHeader() })
    .then(result => result.data)
    .then(data => setUserList(data))
    .catch(res => { 
      if (res.status == 401) {
        window.location.pathname = "/";
      }
    });
  }

  useEffect ( () => {
      if (!userList) getUsers();
  }, []);

    return (
      <>
        {(userList && currentUser) && <Header userList={userList} />}
        {userList && <PageBodyContainer userList={userList} />}
        <Footer /> 
      </>
    );
};

export default Accueil;
