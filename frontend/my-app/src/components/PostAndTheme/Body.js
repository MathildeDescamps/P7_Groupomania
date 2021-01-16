import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import BodyContent from './BodyContent';
import axios from 'axios';
import Likes from './Likes';
import Comments from './Comments';

const UrlAPI = 'http://localhost:3000/api/';

// STYLE DU COMPOSANT :
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        width: '90%',
        margin: 'auto',

    },
    header: {
        backgroundColor: '#D75030',
        color: 'white',
        width: '20%',
        padding: '2ch',
        textAlign: 'left',
        "& a": {
            color: 'white',
            textDecoration: 'none',
            "&:hover": {
                textDecoration: 'underline',
            },
        },
    },
    body: {
        backgroundColor: '#F2D3D4',
        padding: '2ch',
        width: '100%',
        margin: 'auto',
        marginBottom: '10ch',
    },
}));

// LOGIQUE DU COMPOSANT :
const PostBody = ({post, user}) => {

    const classes = useStyles();

    //On initialise le state.
    const [userProfile, setUserProfile] = useState();
    const [image, setImage] = useState("");

    let buff; 
    let src; 

    //On fait une requête GET à l'API pour obtenir les infos du user concerné.
    useEffect ( () => {
        axios.get(UrlAPI + 'users/' + user)
        .then(res => { 
                setUserProfile(res.data[0]);
                buff = res.data[0].profilePic.data;
                src = Buffer.from(buff).toString();
                setImage(src);
            });
    }, []);


    //Le composant retourne le post.
    return(
        <div className={classes.root} >
            <div className={classes.header}>
                <h2>
                    <a style={{display: 'flex',}} href={userProfile &&  "/profile/" + userProfile.id}> 
                        {userProfile && userProfile.firstname + ' ' + userProfile.lastname}                
                        <Avatar className={ classes.avatar }>
                            <img id="image" src={image} style={{ width: 'auto', height: 'auto'}} />
                        </Avatar>
                    </a>
                </h2>
            </div>
            <div className={classes.body} > 
                <BodyContent url={post.url} content={post.content} />
                <Likes postId={post.id} />
                <Comments postId={post.id} />
            </div>
        </div>
    );
};

export default PostBody;