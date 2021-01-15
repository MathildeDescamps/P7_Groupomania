import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';

const UrlAPI = 'http://localhost:3000/api';

// STYLE :

const useStyles = makeStyles((theme) => ({
    mentionsBlock: {
        display: 'flex',
    },
    mentionButton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#D64F30',
        color: 'white',
        height: '5ch',
        width: '10%',
        marginRight: '1ch',
        marginTop: '1ch',
        paddingLeft: '2ch',
        paddingRight: '2ch',
        "&:hover": {
            cursor: 'pointer',
            backgroundColor: '#FF5F39',
        },
    },
    mentionNumber: {
        fontWeight: '800',
        fontSize: '16px',
    },
}));

// LOGIQUE :

const Likes = ({postId}) => {

    const classes = useStyles();

    const [mentions, setMentions] = useState({});

    let currentUser = JSON.parse(sessionStorage.getItem("currentUser"));

    useEffect ( () => {
        axios.get(UrlAPI + '/mentions/' + postId)
        .then(res => setMentions(res.data))
        .catch(err => console.log(err));
    }, []);

    const handleLike = (e) => {
        let name = e.target.getAttribute('name');
        if(name == 'like') {
            console.log("liké !");
            axios({
                method: 'post',
                url: UrlAPI + '/mentions/' + postId,
                data: {user: currentUser.id, post: postId, mention: 1}
            })
            .then(setMentions(mentions.likes++))
            .catch(err => console.log(err));

            return;
        } else if( name == 'dislike') {
            console.log("disliké !");
            axios({
                method: 'post',
                url: UrlAPI + '/mentions/' + postId,
                data: {user: currentUser.id, post: postId, mention: -1}
            })
            .then(setMentions(mentions.dislikes++))
            .catch(err => console.log(err));
            return;
        } else {
            return;
        }
    };
    
    return(
        <>
            <div className={classes.mentionsBlock}>
                <div className={classes.mentionButton} name='like' onClick={handleLike}>
                    <ThumbUpIcon />
                    <span className={classes.mentionNumber}>{mentions && mentions.likes}</span>
                </div>
                <div className={classes.mentionButton} name='dislike' onClick={handleLike}>
                    <ThumbDownIcon />
                    <span className={classes.mentionNumber}>{mentions && mentions.dislikes}</span>
                </div>
            </div>
        </>
    );
};

export default Likes;