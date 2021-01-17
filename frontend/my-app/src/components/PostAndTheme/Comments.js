import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { Avatar, Button, Link } from '@material-ui/core';
import { Person } from '@material-ui/icons';
import moment from 'moment';
import authHeader from '../AuthForm/AuthHeader';

const UrlAPI = "http://localhost:3000/api/";

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

    let currentUser = JSON.parse(sessionStorage.getItem("currentUser"));

    const classes = useStyles();

    const [commentsList, setCommentsList] = useState([]);
    const [commentContent, setCommentContent] = useState("");
    const [userList, setUserList] = useState(null);

    const getUsers = async () => {
        const response = await axios.get(UrlAPI + currentUser.id + '/users', { headers: authHeader() })
        .then(result => result.data)
        .then(data => setUserList(data))
    }

    useEffect ( () => {
        if (!userList) getUsers();
        axios.get(UrlAPI + currentUser.id + '/comments/' + postId, { headers: authHeader() })
        .then(res => setCommentsList(res.data))
        .catch(err => console.log(err));
    }, []);

    const setCommentText = (e) => {
        setCommentContent(e.target.value);
    };

    const handleComment = () => {
        axios({
                method: 'post',
                url: UrlAPI + currentUser.id + '/comments/' + postId,
                data: {user: currentUser.id, post: postId, content: commentContent},
                headers: authHeader(),
            })
            .then(res => setCommentsList([res.data, ...commentsList]))
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
            {userList && commentsList && commentsList.map( (comment) => {
                return (
                    <div key={comment.id} className={classes.comments}>
                        {userList.filter(author => (comment.user == author.id)).map(author => {
                        let src="";
                        if (author.profilePic) {
                            let buff = author.profilePic.data;
                            src = Buffer.from(buff).toString();
                        }
                        return (
                        <React.Fragment key={comment.id} >
                            <Link className={classes.commentHeader}>
                                <Avatar className={classes.avatar} >
                                  {src=="" && <Person style={{fontSize: 40}} id="avatar"/>}
                                  {src!="" && <img id="image" src={src} style={{ width: '40px', height: '40px'}} />}
                                </Avatar>
                                <p className={classes.headerText}>
                                    {author.firstname + " " + author.lastname}
                                </p>
                            </Link>
                            <span> ({moment(comment.createdAt).format("DD/MM/YYYY HH:m")})</span>
                            <div className={classes.commentContent}>
                                <p className={classes.commentText}>{comment.content}</p>
                            </div>
                        </React.Fragment>
                        ); }) }
                    </div>
                )
            })}
            <Button className={classes.seeMoreButton}><span className={classes.firstLetter}>V</span>oir plus de commentaires</Button>
        </div>
    )
};

export default Comments;