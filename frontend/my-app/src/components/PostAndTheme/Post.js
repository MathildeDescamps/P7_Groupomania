import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { Person, Close } from '@material-ui/icons';
import BodyContent from './BodyContent';
import Likes from './Likes';
import Comments from './Comments';
import moment from 'moment';
import axios from 'axios';
import authHeader from '../AuthForm/AuthHeader';

const UrlAPI = 'http://localhost:3000/api/';

// STYLE DU COMPOSANT :
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        width: '90%',
        margin: 'auto',
        paddingBottom: '0',
        zIndex: '3',
    },
    header: {
        display: 'flex',
        backgroundColor: '#D75030',
        color: 'white',
        width: '30%',
        height: '10ch',
        paddingLeft: '2ch',
        justifyContent: 'flex-start',
        alignItems: 'center',
        textDecoration: 'none',
        "&:hover": {
            textDecoration: 'underline',
        },
        position: 'relative',
        //top: '30px',
        zIndex: '1',
        [theme.breakpoints.down('md')]: {
            width: '45%',
        },
    },
    avatar: {
        border: '3px solid #445760',
        width: '5ch',
        height: '5ch',
        marginRight: '1ch',
    },
    userName: {
        fontWeight: '600',
        fontSize: '24px',
        color: 'white',
        textAlign: 'left',
        width: '100%',
        marginTop: '2.5ch',
        [theme.breakpoints.down('md')]: {
            fontSize: '18px',
            marginTop: '3.5ch',
            marginBottom: '30px',
        },
    },
    postedDate: {
        fontSize: '12px',
        textAlign: 'left',
        position: 'relative',
        bottom: '4ch',
        width: '100%',
        [theme.breakpoints.down('md')]: {
        },
    },
    body: {
        backgroundColor: '#F2D3D4',
        padding: '2ch',
        width: '100%',
        margin: 'auto',
        marginBottom: '10ch',
    },
    cross: {
        display: 'none', 
        alignSelf: 'flex-end', 
        backgroundColor: '#D7502F', 
        color: 'white', 
        width: '25px', 
        height: '25px', 
        marginBottom: '5px',
        "&:hover": { 
            backgroundColor: '#FF5F39',
            cursor: 'pointer',
        },
    },
    deleteAlert: {
        display: 'none',
        width: '50ch',
        height: 'auto',
        paddingTop: '1ch',
        paddingBottom: '3ch',
        borderRadius: '5px',
        backgroundColor: '#E9E9E9',
        alignSelf: 'flex-end',
        verticalAlign: 'middle',
        marginBottom: '1ch',
    },
    question: {
        marginBottom: '-0.5ch',
        fontSize: '16px',
    },
    confirmDelete: {
        backgroundColor: '#D74F2F',
        color: 'white',
        borderRadius: '5px',
        padding: '1ch',
        "&:hover": {
            cursor: 'pointer',
            backgroundColor: '#FF5F39',
        },
        marginRight: '1ch',
    },
    cancelDelete: {
        backgroundColor: 'grey',
        color: 'white',
        borderRadius: '5px',
        "&:hover": {
            cursor: 'pointer',
            backgroundColor: '#B4B4B4',
        },
        padding: '1ch',
    },

    
}));

// LOGIQUE DU COMPOSANT :
const Post = ({post}) => {

    const classes = useStyles();

    //On initialise le state.
    const [userProfile, setUserProfile] = useState(null);
    const [image, setImage] = useState(null);

    let buff; 
    let src; 

    useEffect ( () => {
        if (post.author) {
            setUserProfile(post.author);
            if (post.author.profilePic) {
                buff = post.author.profilePic.data;
                src = Buffer.from(buff).toString();
                setImage(src);
            }
            let currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
            if ((post.author.id == currentUser.id) || (currentUser.rights == "admin")) {
                document.getElementById('deleteCross'+ post.id).style.display="block";
                document.getElementById('header'+ post.id).style.top="30px";
            }
        }
    }, []);

    const confirmDeletion = () => {
        document.getElementById('deleteAlert'+ post.id).style.display="block";
        document.getElementById('header'+ post.id).style.top="140px";
    };

    const hideMessage = () => {
        document.getElementById('deleteAlert'+ post.id).style.display="none";
        document.getElementById('header'+ post.id).style.top="30px";
    };

    const deletePost = async () => {
        let currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
        await axios.delete(UrlAPI + currentUser.id + '/posts/' + post.id, { headers: authHeader() })
        .then(result => console.log(result))
        .catch(err => console.log(err));
        await window.location.reload(false);
    };


    //Le composant retourne le post.
    return(
        <div className={classes.root} >
            <a id={"header" + post.id} className={classes.header} href={userProfile &&  "/profile/" + userProfile.id}> 
                <Avatar className={ classes.avatar }>
                    {!image && <Person style={{fontSize: 40, padding: '2px'}} id="avatar"/>}
                    {image && <img id="image" src={image} style={{ width: '60px', height: '60px'}} />}
                </Avatar>
                <div>
                    <p className={classes.userName}>{userProfile && userProfile.firstname + ' ' + userProfile.lastname}</p>     
                    <p className={classes.postedDate} >Posté le {moment(post.createdAt).format("DD/MM/YYYY")} à {moment(post.createdAt).format("HH:m")}</p>   
                </div>        
            </a>
            <div id={"deleteAlert" + post.id} className={classes.deleteAlert}>
                <p className={classes.question} >Êtes-vous sûr(e) de vouloir supprimer ce post ?</p><br/>
                <span id='confirmDelete' className={classes.confirmDelete} onClick={deletePost}>Supprimer</span>
                <span id='cancelDelete' className={classes.cancelDelete} onClick={hideMessage} >Annuler</span>
            </div>
            <Close id={'deleteCross'+ post.id } className={classes.cross} onClick={confirmDeletion} />
            <div className={classes.body} >
                <BodyContent url={post.url} content={post.content} />
                <Likes postId={post.id} />
                <Comments postId={post.id} />
            </div>
        </div>
    );
};

export default Post;