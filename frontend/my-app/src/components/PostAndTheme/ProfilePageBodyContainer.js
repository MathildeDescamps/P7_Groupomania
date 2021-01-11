import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline, Button, Avatar } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import Post from './Post';
import CreatePost from './CreatePost';
import axios from 'axios';
import FileBase64 from 'react-file-base64';

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
            "&>span": {
                display: "none",
            },
            "&:hover": {
                //opacity: '0.5',
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
}));

// LOGIQUE :

const ProfilePageBodyContainer = () => {
        
    //On initialise le state.
    const [postList, setPostList] = useState(null);
    const [themeList, setThemeList] = useState(null);
    const [selectedThemes, setSelectedThemes] = useState([]);
    const [pic, setPic] = useState("");
    const [image, setImage] = useState("");

    const classes = useStyles();

    let url = window.location.pathname;
    let userId = url.split('profile/')[1];
    let userInfos; 
    let buff; 
    let src; 

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
        .then(data => setThemeList(data));
    }, []);

    

    //On récupère les infos du user cliqué et on traite la photo de profile pour pouvoir l'afficher.
    useEffect ( () => {
        axios.get(UrlAPI + 'users/' + userId)
            .then(res => { 
                userInfos = res.data[0];
                buff = JSON.stringify(userInfos.profilePic.data);
                src = Buffer.from(buff).toString('base64');
                setPic(JSON.stringify(src));
            })
            .catch(err => console.log(err));
    }, []);

    //On récupère l'image uploadée par le user pour la mettre à jour en base. 
    const changeImage = (img) => {
        setImage(img.base64);
        axios.put(UrlAPI + 'users/' + userId + '/image', { image: image })
            .then(result => console.log(result))
            .catch(err => console.log(err))
    };
    
    return ( 
        <>
            <CssBaseline />
            <div className= { classes.profileContainer }> 
                <Avatar className= { classes.avatar } >
                    <PersonIcon style={{fontSize: 60}} id="avatar"/>
                    <FileBase64 multiple={ false } onDone={changeImage} />
                    <img id="image" src={pic} style={{ width: 'auto', height: 'auto'}} />
                </Avatar>
                <h3 className= { classes.userName }> {userInfos && userInfos.firstname + ' ' + userInfos.lastname}  </h3>
                <p className= { classes.list } >
                    <b>{ userInfos && userInfos.status}</b><br/>
                    <b>Date d'embauche :</b> { userInfos && userInfos.hiringDate}<br/>
                    <b>Email :</b> {userInfos && userInfos.email}<br/>
                </p>
            </div>
            <div className= { classes.postContainer }>
                <CreatePost themes={themeList} />
                {postList && postList.filter(post => (userInfos && (post.user == userInfos.id) && ((selectedThemes.includes(post.theme)) || (selectedThemes.length == 0)))).map(post => 
                    { 
                        return <Post key={post.id} post={post} />;
                    }
                )}
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
    );
};

//<Theme filter={props.filter}  key={theme.id} theme={theme} />
export default ProfilePageBodyContainer;

//a mettre dans File6Base4 : onDone={getImage}