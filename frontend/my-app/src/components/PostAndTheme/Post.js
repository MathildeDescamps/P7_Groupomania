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
        width: '26%',
        height: '10ch',
        paddingLeft: '2ch',
        justifyContent: 'flex-start',
        alignItems: 'center',
        textDecoration: 'none',
        "&:hover": {
            textDecoration: 'underline',
        },
        position: 'relative',
        top: '30px',
        zIndex: '1',
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
    },
    postedDate: {
        fontSize: '12px',
        textAlign: 'left',
        position: 'relative',
        bottom: '4ch',
        width: '100%',
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
        height: '80px',
        paddingTop: '15px',
        border: '2px solid red',
        borderRadius: '5px',
        backgroundColor: '#FFFFFF',
        alignSelf: 'flex-end',
        verticalAlign: 'middle',
    },
    confirmDelete: {
        border: 'solid red 1px',
        borderRadius: '5px',
        padding: '5px 10px 5px 10px',
        marginTop: '30px',
        width: '20%',
        alignSelf: 'center',
        "&:hover": {
            cursor: 'pointer',
        },
    },
    cancelDelete: {
        border: 'solid red 1px',
        borderRadius: '5px',
        padding: '5px 10px 5px 10px',
        marginTop: '30px',
        width: '20%',
        alignSelf: 'center',
        "&:hover": {
            cursor: 'pointer',
        },
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
            <a id={'header' + post.id} className={classes.header} href={userProfile &&  "/profile/" + userProfile.id}> 
                <Avatar className={ classes.avatar }>
                    {!image && <Person style={{fontSize: 40, padding: '2px'}} id="avatar"/>}
                    {image && <img id="image" src={image} style={{ width: '60px', height: '60px'}} />}
                </Avatar>
                <div>
                    <p className={classes.userName}>{userProfile && userProfile.firstname + ' ' + userProfile.lastname}</p>     
                    <p className={classes.postedDate} >Posté le {moment(post.createdAt).format("DD/MM/YYYY")} à {moment(post.createdAt).format("HH:m")}</p>   
                </div>        
            </a>
            <p id={"deleteAlert" + post.id} className={classes.deleteAlert} >
                Êtes-vous sûr(e) de vouloir supprimer ce post ?<br/>
                <span id='confirmDelete' className={classes.confirmDelete} onClick={deletePost}>Oui</span>
                <span id='cancelDelete' className={classes.cancelDelete} onClick={hideMessage} >Annuler</span>
            </p>
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