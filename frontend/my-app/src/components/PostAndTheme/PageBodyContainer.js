import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline, Button } from '@material-ui/core';
import Post from './Post';
import CreatePost from './CreatePost';
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
        themeFlexBox: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            height: '100%',
        },
        themesButtons: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
        },
        cancelFiltersButton: {
            backgroundColor: '#D64F30',
            color: 'white',
            "&:hover": {
                backgroundColor: '#FF5F39'
            },
            marginLeft: '1ch',
            marginRight: '1ch',
            marginTop: '1ch',
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
                backgroundColor: '#D64F30',
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
}));

// LOGIQUE :

const PageBodyContainer = (props) => {   
    const [postList, setPostList] = useState(null);
    const [themeList, setThemeList] = useState(null);
    const [selectedThemes, setSelectedThemes] = useState([]);

    const classes = useStyles();

    let users = props.userList;

    const getUser = (userid) => {
        return users.filter(user => (user.id == userid));
    }

    //On envoi une requête GET à l'API pour récupérer un tableau 'postList' contenant des objets (1 objet / post).
    useEffect ( () => {
        if (users) {
            axios.get(UrlAPI + 'posts')
            .then(result => result.data)
            .then(data => { 
                setPostList(data.map(p => { 
                    p.author=getUser(p.user)[0]; 
                    return p; 
                }));
            });
        }    
    }, []);

    //On envoi une requête GET à l'API pour récupérer un tableau 'themeList' contenant des objets (1 objet / theme).
    useEffect ( () => {
        axios.get(UrlAPI + 'themes')
        .then(result => result.data)
        .then(data => setThemeList(data))
    }, []);

    const cancelFilters = () => {
        setSelectedThemes([]);
    };

    return (
        <>
            <CssBaseline />
                <div className= { classes.postContainer }>
                    <CreatePost themes={themeList} />
                    {postList && postList.filter(post => ((selectedThemes.includes(post.theme))||(selectedThemes.length == 0))).map( (post) => { 
                        return <Post key={post.id} post={post}/>;
                    })}
            </div>
            <div className={ classes.themeContainer } >
                <div className={ classes.themeContainerHeader } >THÈMES</div>
                    <div className={classes.themeFlexBox}>
                        <div className={classes.themesButtons}>
                            {themeList && themeList.map((theme) => { 
                                return (
                                    <Button key={theme.id} 
                                        className={selectedThemes.includes(theme.id) ? classes.activeTheme : classes.themeButton}
                                        onClick={() => { 
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
                        <Button className={classes.cancelFiltersButton} onClick={cancelFilters} >Retirer tous les filtres</Button>
                    </div>
            </div>
        </>
    )
};

export default PageBodyContainer;