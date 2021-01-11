import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline, Button, Avatar } from '@material-ui/core';
import Post from './Post';
import CreatePost from './CreatePost';
import axios from 'axios';

const UrlAPI = 'http://localhost:3000/api/';

// STYLE :

const useStyles = makeStyles(() => ({
        postContainer: {
            width: '60%',
            position: 'relative',
            paddingTop: '10ch',
            margin: 'auto',
        },
        themeContainer: {
            backgroundColor: '#F1D4D4',
            width: '20%',
            height: '100%',
            position: 'absolute',
            position: 'fixed',
            right: '0', 
            top: '0',
            marginTop: '10ch',      
            paddingLeft: '1ch',
            paddingRight: '1ch',
        },
        themeContainerHeader: {
            backgroundColor: '#D7502F',
            color: 'white',
            fontSize: '28px',
            fontWeight: '600',
            textAlign: 'center',
            padding: '1ch',
        },
        themeButton: {
            backgroundColor: '#FFFFFE',
            color: '#696A6B',
            fontSize: '18px',
            fontWeight: '400',
            padding: '1ch',
            maxWidth: '24ch',
            width: '14ch',
            textAlign: 'center',
            margin: '1ch',
            "&:hover": {
                backgroundColor: '#D35233',
                color: '#FFFFFE',
            },
        },
        activeTheme: {
            fontSize: '18px',
            fontWeight: '400',
            padding: '1ch',
            maxWidth: '24ch',
            width: '14ch',
            textAlign: 'center',
            margin: '1ch',
            backgroundColor: '#D35233',
            color: 'white',
        },
        profileContainer: {
            backgroundColor: '#FFFFFF',
            width: '20%',
            height: '100%',
            position: 'absolute',
            position: 'fixed',
            left: '0', 
            top: '0',
            marginTop: '10ch',      
            paddingLeft: '1ch',
            paddingRight: '1ch',
            textAlign: 'center',
        },
        avatar: {
            margin: 'auto',
            marginTop: '2ch',
            width: '10ch',
            height: '10ch',
        },
        userName: {
            textDecoration: 'underline',
            fontSize: '25px',
            color: '#D75030',
        },
        list: {
            listStyle: 'none',
            color:'#545555',
            marginLeft: '0',
            lineHeight: '2',
        },
}));

// LOGIQUE :

const PageBodyContainer = () => {
        
    //On initialise le state.
    const [postList, setPostList] = useState(null);
    const [themeList, setThemeList] = useState(null);
    const [selectedThemes, setSelectedThemes] = useState([]);
    const [userList, setUserList] = useState([]);

    const classes = useStyles();

    //On envoi une requête GET à l'API pour récupérer un tableau 'postList' contenant des objets (1 objet / post).
    useEffect ( () => {
        axios.get(UrlAPI + 'posts')
        .then(result => {
            return result.data;
        })
        .then(data => setPostList(data));
    }, []);

    //On envoi une requête GET à l'API pour récupérer un tableau 'themeList' contenant des objets (1 objet / theme).
    useEffect ( () => {
        axios.get(UrlAPI + 'themes')
        .then(result => result.data)
        .then(data => setThemeList(data));
    }, []);

    //On récupère la liste des users que l'on stocke dans le tableau 'userList'.
    useEffect ( () => {
        axios.get(UrlAPI + 'users')
        .then(result => result.data)
        .then(data => setUserList(data));
    }, []);

    let url = window.location.pathname;
    let userClicked = url.split('profile/')[1];

    const findUserClicked = (i) => {
        userList.forEach(user => {
            if (user.id == userClicked) {
                userClicked = user;
            } else { return; }
        });
    };

    findUserClicked();

    return (
        <>
            <CssBaseline />
            <div className= { classes.profileContainer }> 
                <Avatar alt="" src="/static/images/avatar/1.jpg" className= { classes.avatar } />
                <h3 className= { classes.userName }>{userClicked.firstname + ' ' + userClicked.lastname}  </h3>
                <p className= { classes.list } >
                    <b>{userClicked.status}</b><br/>
                    Date d'embauche: {userClicked.hiringDate}<br/>
                    Email : {userClicked.email}<br/>
                </p>
            </div>
            <div className= { classes.postContainer }>
                <CreatePost themes={themeList} />
                {postList && postList.filter(post => ((selectedThemes.includes(post.theme))||(selectedThemes.length == 0))).map(post => { 
                    return <Post key={post.id} post={post} />;
                })}
            </div>
            <div className={ classes.themeContainer } >
                <div className={ classes.themeContainerHeader } >THÈMES</div>
                {themeList && themeList.map((theme) => { 
                    return (
                        <Button key={theme.id} 
                            className={selectedThemes.includes(theme.id) ? classes.activeTheme : classes.themeButton}
                            onClick={(props) => { 
                                if (!selectedThemes.includes(theme.id)) {
                                    setSelectedThemes([...selectedThemes, theme.id]);
                                }
                                else {
                                    setSelectedThemes(selectedThemes.filter(item => { 
                                        return item !== theme.id; 
                                    }));
                                }
                            }} > 
                            {theme && theme.name} 
                        </Button>
                    )
                })}
            </div>
        </>
    )
};

//<Theme filter={props.filter}  key={theme.id} theme={theme} />
export default PageBodyContainer;