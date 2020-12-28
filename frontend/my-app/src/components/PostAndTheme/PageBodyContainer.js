import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline, Button } from '@material-ui/core';
import Post from './Post';
import axios from 'axios';

const UrlAPI = 'http://localhost:3000/api/';

// STYLE :

const useStyles = makeStyles(() => ({
        postContainer: {
            width: '80%',
            position: 'relative',
            paddingTop: '10ch',
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
            '&:hover': {
                backgroundColor: '#D35233',
                color: 'white',
            },
        },

}));

// LOGIQUE :

const PageBodyContainer = () => {
    
    const [postList, setPostList] = useState(null);
    const [themeList, setThemeList] = useState(null);
    const classes = useStyles();
    
    //On envoi une requête GET à l'API pour récupérer un tableau 'postList' contenant des objets (1 objet / post).
    useEffect ( () => {
        axios.get(UrlAPI + 'posts')
        .then(result => result.data)
        .then(data => setPostList(data));
    }, []);

    //On envoi une requête GET à l'API pour récupérer un tableau 'themeList' contenant des objets (1 objet / theme).
    useEffect ( () => {
        axios.get(UrlAPI + 'themes')
        .then(result => result.data)
        .then(data => setThemeList(data))
    }, []);

    const handleFilter = (e) => {
        console.log(e.target.value);
    };

    return (
        <>
            <CssBaseline />
            <div className= { classes.postContainer }>
                {postList && postList.map(post => { 
                    return <Post key={post.id} post={post} />;
                })}
            </div>
            <div className={ classes.themeContainer } >
                <div className={ classes.themeContainerHeader } >THÈMES</div>
                {themeList && themeList.map((theme) => { 
                    return (
                        <Button key={theme.id} className={ classes.themeButton } onClick={handleFilter} > 
                            {theme && theme.name} 
                        </Button>
                    )
                })}
            </div>
        </>
    )
};

export default PageBodyContainer;