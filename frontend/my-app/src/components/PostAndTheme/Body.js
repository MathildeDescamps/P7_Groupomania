import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { Person } from '@material-ui/icons';
import BodyContent from './BodyContent';
import Likes from './Likes';
import Comments from './Comments';
import moment from 'moment';

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
const PostBody = ({post}) => {

    const classes = useStyles();

    //On initialise le state.
    const [userProfile, setUserProfile] = useState(null);
    const [image, setImage] = useState(null);

    let buff; 
    let src; 

    //On fait une requête GET à l'API pour obtenir les infos du user concerné.
    useEffect ( () => {
        if (post.author) {
            setUserProfile(post.author);
            if (post.author.profilePic) {
                buff = post.author.profilePic.data;
                src = Buffer.from(buff).toString();
                setImage(src);
            }
        }
    }, []);


    //Le composant retourne le post.
    return(
        <div className={classes.root} >
            <div className={classes.header}>
                <h2>
                    <a style={{display: 'flex',}} href={userProfile &&  "/profile/" + userProfile.id}> 
                        {userProfile && userProfile.firstname + ' ' + userProfile.lastname}                
                        <Avatar className={ classes.avatar }>
                            {!image && <Person style={{fontSize: 40}} id="avatar"/>}
                            {image && <img id="image" src={image} style={{ width: '40px', height: '40px'}} />}
                        </Avatar>
                    </a>
                </h2>
                Posté le {moment(post.createdAt).format("DD/MM/YYYY HH:m")}
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