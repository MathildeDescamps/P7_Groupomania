import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline, Button, Avatar, Link } from '@material-ui/core';
import { Person, ArrowBack } from '@material-ui/icons';
import Post from './Post';
import axios from 'axios';
import FileBase64 from 'react-file-base64';
import moment from 'moment';
import authHeader from '../AuthForm/AuthHeader';

const UrlAPI = 'http://localhost:3000/api/';

// STYLE :

const useStyles = makeStyles(() => ({
        postContainer: {
            width: '60%',
            position: 'relative',
            paddingTop: '20ch',
            margin: 'auto',
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
            zIndex: '3',
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
            "&>span": {
                display: "none",
            },
            "&:hover": {
                "&>span": {
                    display: 'block',
                    textDecoration: 'underline',
                    cursor: 'pointer',
                },
                "&>#avatar": {
                    display: 'none',
                },
            },
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
        backToHome: {
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            backgroundColor: 'white',
            color: '#757575',
            position: 'fixed',
            marginTop: '-76px',
            zIndex: '2',
            "&:hover": {
                color: '#D64F30',
                textDecoration: 'none',
            },
        },
}));

// LOGIQUE :

const ProfilePageBodyContainer = (props) => {
        
    //On initialise le state.
    const [postList, setPostList] = useState(null);
    const [themeList, setThemeList] = useState(null);
    const [selectedThemes, setSelectedThemes] = useState([]);
    const [userInfos, setUserInfos] = useState(null);
    const [image, setImage] = useState("");

    const classes = useStyles();

    let url = window.location.pathname;
    let userId = url.split('profile/')[1];
    let buff; 
    let src; 
    let currentUser = JSON.parse(sessionStorage.getItem("currentUser"));

    let users = props.userList;

    const getUser = (userid) => {
        return users.filter(user => (user.id == userid));
    }

    //On envoi une requête GET à l'API pour récupérer un tableau 'postList' contenant des objets (1 objet / post).
    useEffect ( () => {
        if (users) {
            axios.get(UrlAPI + currentUser.id + '/posts', { headers: authHeader() })
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
        axios.get(UrlAPI + currentUser.id + '/themes', { headers: authHeader() })
        .then(result => result.data)
        .then(data => setThemeList(data));
    }, []);

    //On récupère les infos du user cliqué et on traite la photo de profile pour pouvoir l'afficher.
    useEffect ( () => {
        axios.get(UrlAPI + currentUser.id + '/users/' + userId, { headers: authHeader() })
            .then(res => { 
                setUserInfos(res.data[0]);
                buff = res.data[0].profilePic.data;
                src = Buffer.from(buff).toString();
                setImage(src);
            })
            .catch(err => console.log(err));
    }, []);

    //On récupère l'image uploadée par le user pour la mettre à jour en base. 
    const changeImage = (img) => {
        setImage(img.base64);
        axios.put(UrlAPI + currentUser.id + '/users/' + userInfos.id + '/image', { image: img.base64 }, { headers: authHeader() })
            .then(result => {
                console.log(result);
            })
            .catch(err => console.log(err))
    };

    const cancelFilters = () => {
        setSelectedThemes([]);
    };
    
    return ( 
        <>
            <CssBaseline />
            <div className= { classes.profileContainer }> 
                <Avatar className= { classes.avatar } >
                    {!image && <Person style={{fontSize: 60}} id="avatar"/>}
                    {image && <img id="image" src={image} style={{ display: 'block', width: 'auto', height: 'auto', minHeight: '10ch', maxWidth: '10ch'}} />}
                </Avatar>
                {(userInfos && ((userInfos.id == currentUser.id) || (currentUser.rights == 'admin'))) &&
                <FileBase64 multiple={ false } onDone={changeImage} />
                }
                <h3 className= { classes.userName }> {userInfos && userInfos.firstname + ' ' + userInfos.lastname}  </h3>
                <p className= { classes.list } >
                    <b>{ userInfos && userInfos.status}</b><br/>
                    <b>Date d'embauche :</b> { userInfos && moment(userInfos.hiringDate).format("DD/MM/YYYY")}<br/>
                    <b>Email :</b> {userInfos && userInfos.email}<br/>
                </p>
            </div>
            <div className= { classes.postContainer }>
                <Link className={classes.backToHome} href='/accueil'>
                    <ArrowBack style={{ fontSize: 35, cursor: 'pointer', marginRight: '1ch' }} />
                    <p>Revenir à la page d'accueil</p>
                </Link>
                {postList && postList.filter(post => (userInfos && (post.user == userInfos.id) && ((selectedThemes.includes(post.theme)) || (selectedThemes.length == 0)))).map(post => 
                    { 
                        return <Post key={post.id} post={post} />;
                    }
                )}
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
    );
};

export default ProfilePageBodyContainer;