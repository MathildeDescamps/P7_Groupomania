import React, { Component } from 'react';
import styled from 'styled-components';
import LoginForm from '../../components/LoginForm/LoginForm';
//import Button from '../../components/Button';

const PortalWrapper = styled.div`
    background-color: #F1D4D4;
    width: 700px;
    height: 500px;
    position: fixed;
    top: 50%;
    left: 50%;
    margin-top: -180px;
    margin-left: -350px;
    padding-top: 10px;
`;

//On crée le composant Portal.
class Portal extends Component {
    render(){
        return(
            <PortalWrapper>
                <LoginForm />
            </PortalWrapper>
        );
    }
}

export default Portal;