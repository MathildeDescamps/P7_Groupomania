import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import authHeader from '../AuthForm/AuthHeader';

const UrlAPI = 'http://localhost:3000/api/';

// STYLE :

const useStyles = makeStyles((theme) => ({
    mentionsBlock: {
        display: 'flex',
    },
    mentionButton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        color: 'white',
        height: '5ch',
        width: '10%',
        borderRadius: '5px',
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
    const [myMention, setMyMention] = useState(0);

    let currentUser = JSON.parse(sessionStorage.getItem("currentUser"));

    useEffect ( () => {
        axios.get(UrlAPI + currentUser.id + '/mentions/' + postId, { headers: authHeader() })
        .then(res => { setMentions(res.data); })
        .catch(err => console.log(err));

        axios.get(UrlAPI + currentUser.id + '/mentions/mine/' + postId + '/' + currentUser.id, { headers: authHeader() })
        .then(result => result.data)
        .then(data => setMyMention(data.mention))
    }, []);

    if (myMention && myMention == 1) {
        document.getElementById('dislike'+ postId).style.backgroundColor="#A2A2A2";
        document.getElementById('like'+ postId).style.backgroundColor="#FF5F39";
    } else if (myMention && myMention == -1) {
        document.getElementById('dislike'+ postId).style.backgroundColor="#FF5F39";
        document.getElementById('like'+ postId).style.backgroundColor="#A2A2A2";
    } else if (myMention && myMention == 0) {
        document.getElementById('dislike'+ postId).style.backgroundColor="#A2A2A2";
        document.getElementById('like'+ postId).style.backgroundColor="#A2A2A2";
    }

    const updateMyMention = (likedislike) => {
        switch(myMention) {
            case 0 :
                if (likedislike == 1) {
                    setMyMention(1);
                    setMentions({ likes: mentions.likes+1, dislikes: mentions.dislikes });
                } else if (likedislike == -1) {
                    setMyMention(-1);
                    setMentions({ likes: mentions.likes, dislikes: mentions.dislikes+1 });
                }
                break;
            case 1 :
                if (likedislike == 1) {
                    setMyMention(0);
                    setMentions({ likes: mentions.likes-1, dislikes: mentions.dislikes });
                } else if (likedislike == -1) {
                    setMyMention(-1);
                    setMentions({ likes: mentions.likes-1, dislikes: mentions.dislikes+1 });
                }
                break;
            case -1 :
                if (likedislike == 1) {
                    setMyMention(1);
                    setMentions({ likes: mentions.likes+1, dislikes: mentions.dislikes-1 });
                } else if (likedislike == -1) {
                    setMyMention(0);
                    setMentions({ likes: mentions.likes, dislikes: mentions.dislikes-1 });
                }
                break;
        }
    };

    const handleLike = (e) => {
        let name = e.target.getAttribute('name');
        if(name == 'like') {
            updateMyMention(1);
            axios({
                method: 'post',
                url: UrlAPI + currentUser.id + '/mentions/' + postId,
                data: {user: currentUser.id, post: postId, mention: 1},
                headers: authHeader(),
            })
            .then(result => result.data)
            .catch(err => console.log(err));
        } else if( name == 'dislike') {
            updateMyMention(-1);
            axios({
                method: 'post',
                url: UrlAPI + currentUser.id + '/mentions/' + postId,
                data: {user: currentUser.id, post: postId, mention: -1},
                headers: authHeader(),
            })
            .then(result => result.data)
            .catch(err => console.log(err));
        } else {
            return;
        }
        if (myMention == 1) {
            document.getElementById('like'+postId).style.backgroundColor="red";
            document.getElementById('dislike'+postId).style.backgroundColor="#D64F30";
        } else if (myMention == -1) {
            document.getElementById('dislike'+postId).style.backgroundColor="red";
            document.getElementById('like'+postId).style.backgroundColor="#D64F30";
        }
    };
    
    return(
        <>
            <div className={classes.mentionsBlock}>
                <div className={classes.mentionButton} id={'like' + postId} name='like' onClick={handleLike}>
                    <ThumbUpIcon />
                    <span className={classes.mentionNumber}>{mentions.likes}</span>
                </div>
                <div className={classes.mentionButton} id={'dislike' + postId} name='dislike' onClick={handleLike}>
                    <ThumbDownIcon />
                    <span className={classes.mentionNumber}>{mentions.dislikes}</span>
                </div>
            </div>
        </>
    );
};

export default Likes;