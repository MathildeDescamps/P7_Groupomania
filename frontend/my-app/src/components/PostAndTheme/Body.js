import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BodyContent from './BodyContent';
import axios from 'axios';

const UrlAPI = 'http://localhost:3000/api/';

// STYLE DU COMPOSANT :
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        width: '120ch',
        margin: 'auto',

    },
    header: {
        backgroundColor: '#D75030',
        color: 'white',
        width: '25ch',
        padding: '2ch',
        textAlign: 'center',
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

    //On fait une requête GET à l'API pour obtenir les infos du user concerné.
    useEffect ( () => {
        axios.get(UrlAPI + 'users/' + user)
        .then(result => result.data)
        .then(data => setUserProfile(data[0]));
    }, []);


    //Le composant retourne le post.
    return(
        <div className={classes.root} >
            <div className={classes.header}>
                <h2><a href={userProfile &&  "/profile/" + userProfile.id}> {userProfile && userProfile.firstname + ' ' + userProfile.lastname} </a></h2>
            </div>
            <div className={classes.body} > 
                <BodyContent url={post.url} content={post.content} />
            </div>
        </div>
    );
};

export default PostBody;