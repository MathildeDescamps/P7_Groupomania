import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import logo from '../../header-logo.png';
import { Avatar, Link } from '@material-ui/core/';
import SearchBar from "material-ui-search-bar";


// STYLE DU COMPOSANT :
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#F2D3D4',
        height: '10ch',
        justifyContent: 'space-between',
        paddingLeft: '30px',
        paddingRight: '30px',
    },
    logo: {
        height: '6ch',
    },
    leftPart: {
        display: 'flex',
    },
    centerPart: {
        width: '50ch',
    },
    rightPart: {
        display: 'flex',
        alignItems: 'center',
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

    const search = "";
    const classes = useStyles();

    const handleSearch = (e) => {};
    return (
        <div id="header-container" className={ classes.root } >
            <div id="left-part" className={ classes.leftPart } >
                <img src={ logo } alt='[ logo Postmania ]' className={classes.logo} id="logo" />
            </div>
            <div id="center-part" className={ classes.centerPart } >
                <SearchBar placeholder="Rechercher un collègue..." value={search} onChange={(newValue) => ({ value: newValue })} onRequestSearch={() => handleSearch(search)} />
            </div>
            <div id="right-part" className={ classes.rightPart } >
                <Avatar alt="" src="/static/images/avatar/1.jpg" />
                <Link className={classes.link} href="/" >Se déconnecter</Link>
            </div>
        </div>
    );
};

export default Header;