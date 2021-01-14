import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import logo from '../../header-logo.png';
import SearchBox from "./SearchBox";
import { Avatar, Link } from '@material-ui/core';
import axios from 'axios';

const UrlAPI = 'http://localhost:3000/api/';

// STYLE DU COMPOSANT :
const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        position: 'fixed',
        alignItems: 'center',
        backgroundColor: '#F2D3D4',
        height: '10ch',
        width: '100%',
        justifyContent: 'space-between',
        paddingLeft: '30px',
        paddingRight: '30px',
        zIndex: '2',
    },
    logo: {
        height: '6ch',
    },
    leftPart: {
        display: 'flex',
        justifyContent: 'flex-start',
    },
    centerPart: {
        width: '50ch',
        justifyContent: 'center',
    },
    rightPart: {
        display: 'flex',
        alignItems: 'center',
    },
    avatar: {
        cursor: 'pointer',
    },
    link: {
        color: '#0E0C0C',
        fontWeight: '500',
        fontSize: '20px',
        marginLeft: '15px',
    },
}));

// LOGIQUE DU COMPOSANT :
const Header = () => {

    const [userInfos, setUserInfos] = useState(null);
    const classes = useStyles();
  
    return (
    <>
        <div id="header-container" className={ classes.root } >
            <div id="left-part" className={ classes.leftPart } >
                <Link href='/accueil'><img src={ logo } alt='[ logo Postmania ]' className={classes.logo} id="logo" /></Link>
            </div>
            <div id="center-part" className={ classes.centerPart } >
                <SearchBox className={classes.centerPart} />
            </div>
            <div id="right-part" className={ classes.rightPart } >
                <Avatar id="profile-picture" className={ classes.avatar }  alt="[ votre photo de profile ]"   />
                <Link className={classes.link} href="/" >Se déconnecter</Link>
            </div>
        </div>
    </>
    );
};

export default Header;