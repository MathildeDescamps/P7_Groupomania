import React, { useState,useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import logo from '../../header-logo.png';
import { Avatar, Link } from '@material-ui/core/';
import SearchBar from "material-ui-search-bar";
import axios from 'axios';

const UrlAPI = 'http://localhost:3000/api/';

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
    link: {
        color: '#0E0C0C',
        fontWeight: '500',
        fontSize: '20px',
        marginLeft: '15px',
    },
}));

// LOGIQUE DU COMPOSANT :
const Header = () => {

    const classes = useStyles();
    const [users, setUsers] = useState();
    const [search, setSearch] = useState();
    const [searchInput, setSearchInput] = useState("");
    const [list, setList] = useState([]);

    const searchOnChange = (value) => {
        const found = list.find((user) => {
            return (user.indexOf(value) !== -1);
        });
        console.log("search =>", search);
        setSearch(found);
        setSearchInput(value);
    };

    const handleSearch = () => {
        console.log("search..");
    };

    useEffect ( () => {
        axios.get(UrlAPI + 'users/' )
        .then(result => result.data)
        .then(data => {
            const result = [];
            data.forEach(element => {
                result.push(element.firstname + ' ' + element.lastname);
            });
            setList(result);
        });
    }, []);

    return (
    <>
        <div id="header-container" className={ classes.root } >
            <div id="left-part" className={ classes.leftPart } >
                <img src={ logo } alt='[ logo Postmania ]' className={classes.logo} id="logo" />
            </div>
            <div id="center-part" className={ classes.centerPart } >
            <SearchBar
            // dataSource={search} 
            // id="search-bar" placeholder="Rechercher un collègue..." value={searchInput} 
            // onChange={(value) => setSearch([ value, value+value, value+value+value])}
            // style={{
            //     margin: '0 auto',
            //     maxWidth: 800
            // }} 
            />               
            </div>
            {users && users.map(user => { 
                return <p key={user.id} >{user.firstname}</p>;})}
            <div id="right-part" className={ classes.rightPart } >
                <Avatar alt="" src="/static/images/avatar/1.jpg" />
                <Link className={classes.link} href="/" >Se déconnecter</Link>
            </div>
        </div>
    </>
    );
};

export default Header;