import React, { useState, useEffect } from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import ProfilePageBodyContainer from '../components/PostAndTheme/ProfilePageBodyContainer';
import axios from 'axios';
import authHeader from '../components/AuthForm/AuthHeader';

const UrlAPI = 'http://localhost:3000/api/';

const Profile = () => {
  const [userList, setUserList] = useState(null);
  let currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
  const getUsers = async () => {
    const response = await axios.get(UrlAPI + currentUser.id + '/users', { headers: authHeader() })
        .then(result => result.data)
        .then(data => setUserList(data))
  }

  useEffect ( () => {
      if (!userList) getUsers();
  }, []);

    return (
      <>
        {userList && <Header userList={userList} />}
        {userList && <ProfilePageBodyContainer userList={userList} />}
        <Footer /> 
      </>
    );
};
export default Profile;
