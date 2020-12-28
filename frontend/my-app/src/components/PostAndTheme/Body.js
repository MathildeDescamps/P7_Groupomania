import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BodyContent from './BodyContent';
import axios from 'axios';

const UrlAPI = 'http://localhost:3000/api/';

// STYLE DU COMPOSANT :
const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: '#F2D3D4',
        padding: '2ch',
        width: '120ch',
        margin: 'auto',
        marginBottom: '10ch',
    },
    header: {
        backgroundColor: '#D75030',
        color: 'white',
        width: '25ch',
        padding: '2ch',
        marginLeft: '3ch',
        postion: 'relative',
        textAlign: 'center',
    },
}));

// LOGIQUE DU COMPOSANT :
const PostBody = ({post, user}) => {
    //On initialise le state.
    const [userProfile, setUserProfile] = useState();
    //On fait une requête GET à l'API pour obtenir les infos du user concerné.
    useEffect ( () => {
        axios.get(UrlAPI + 'users/' + user)
        .then(result => result.data)
        .then(data => setUserProfile(data[0]));
    }, []);

    const classes = useStyles();
    //Le composant retourne le post.
    return(
        <React.Fragment>
            <div className={classes.root} > 
                <div className={classes.header}>
                    <h2>User : {userProfile && userProfile.firstname} </h2>
                </div>
                <BodyContent content={post.content} />
            </div>
        </React.Fragment>
    );
};

export default PostBody;