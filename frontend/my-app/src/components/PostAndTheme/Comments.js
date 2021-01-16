import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { Avatar, Button, Link } from '@material-ui/core';

const UrlAPI = 'http://localhost:3000/api';

// STYLE :

const useStyles = makeStyles((theme) => ({
    commentSection: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        backgroundColor: '#F4F4F4',
        marginTop: '1ch',
        padding: '1ch',
    },
    writeComment: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    commentButton: {
        backgroundColor: '#555555',
        color: 'white',
        textTransform: 'lowercase',
        height: '4.5ch',
        width: '10%',

    },
    seeMoreButton: {
        backgroundColor: '#555555',
        color: 'white',
        textTransform: 'lowercase',
        height: '4ch',
        alignSelf: 'flex-end',
        marginTop: '1ch',
    },
    firstLetter: {
        textTransform: 'capitalize',
    },
    writeCommentText: {
        width: '90%',
        height: '4.5ch',
        marginRight: '1ch',
        border: 'solid 2px #555555',
        padding: '0.5ch',
        color: '#555555',
        fontWeight: '500',
        fontFamily: 'Avenir, Segoe, UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
    },
    comments: {
        backgroundColor: 'white',
        width: '100%',
        marginTop: '1ch',
        padding: '1ch',
    },
    commentHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',
        height: '6ch',
    },
    avatar: {
        border: 'solid 2.5px #E3431D',
    },
    headerText: {
        color: '#E3431D',
        fontWeight: '500',
        fontSize: '15px',
        marginLeft: '1ch',
    },
    commentContent: {
        width: '100%',
        height: 'auto',
        textAlign: 'left',
        paddingLeft: '1ch',
        paddingLeft: '1ch',
        position: 'relative',
        bottom: '10px',
    },
}));

// LOGIQUE :

const Comments = ({postId}) => {

    const classes = useStyles();

    const [commentsList, setCommentsList] = useState([]);
    const [commentContent, setCommentContent] = useState("");

    let currentUser = JSON.parse(sessionStorage.getItem("currentUser"));

    useEffect ( () => {
        axios.get(UrlAPI + '/comments/' + postId)
        .then(res => setCommentsList(res.data))
        .catch(err => console.log(err));
    }, []);

    const setCommentText = (e) => {
        setCommentContent(e.target.value);
    };

    const handleComment = () => {
        axios({
                method: 'post',
                url: UrlAPI + '/mentions/' + postId,
                data: {user: currentUser.id, post: postId, content: commentContent}
            })
            .then(console.log("commentaire ajouté !"))
            .catch(err => console.log(err));
        setCommentContent("");
        return;
    };

    return(
        <div className={classes.commentSection}>
            <div className={classes.writeComment}>
                <textarea className={classes.writeCommentText} value={commentContent} onChange={setCommentText} type="text" placeholder="Rédigez un commentaire..."/>
                <Button onClick={handleComment} className={classes.commentButton} ><span className={classes.firstLetter}>C</span>ommenter</Button>
            </div>
            {commentsList && commentsList.map( comment => {
                return (
                    <div key={comment.id} className={classes.comments}>
                        <Link className={classes.commentHeader}>
                            <Avatar className={classes.avatar} />
                            <p className={classes.headerText}>Prénom Nom</p>
                        </Link>
                        <div className={classes.commentContent}>
                            <p className={classes.commentText}>{comment && comment.content}</p>
                        </div>
                    </div>
                )
            })}
            <Button className={classes.seeMoreButton}><span className={classes.firstLetter}>V</span>oir plus de commentaires</Button>
        </div>
    )
};

export default Comments;