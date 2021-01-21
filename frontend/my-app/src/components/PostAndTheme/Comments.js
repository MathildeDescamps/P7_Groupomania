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
    root: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        backgroundColor: '#E9E9E9',
        marginTop: '1ch',
        padding: '1ch',
    },
    input: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    inputText: {
        width: '90%',
        height: '4.5ch',
        marginRight: '1ch',
        border: 'solid 2px #555555',
        padding: '0.5ch',
        color: '#555555',
        fontWeight: '500',
        fontFamily: 'Avenir, Segoe, UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
        [theme.breakpoints.down('md')]: {
            width: '80%',
        },
    },
    button: {
        backgroundColor: '#555555',
        color: 'white',
        textTransform: 'lowercase',
        height: '4.5ch',
        width: '10%',
        [theme.breakpoints.down('md')]: {
            width: '20%',
        },

    },
    firstLetter: {
        textTransform: 'capitalize',
    },
    comments: {
        backgroundColor: 'white',
        width: '100%',
        marginTop: '1ch',
        padding: '1ch',
    },
    header: {
        display: 'flex',
        backgroundColor: 'white',
        color: '#E3431D',
        width: '25%',
        height: '7ch',
        marginTop: '0px',
        textAlign: 'left',
        paddingLeft: '2ch',
        justifyContent: 'flex-start',
        alignItems: 'center',
        textDecoration: 'none',
        "&:hover": {
            textDecoration: 'underline',
        },
        zIndex: '1',
        [theme.breakpoints.down('md')]: {
            width: '50%',
            paddingLeft: '1ch',
        },
    },
    avatar: {
        border: '3px solid #445760',
        width: '4ch',
        height: '4ch',
        marginRight: '1ch',
    },
    userName: {
        fontWeight: '600',
        fontSize: '18px',
        position: 'relative',
        top: '0.5ch',
    },
    postedDate: {
        fontSize: '12px',
        position: 'relative',
        bottom: '2ch',
    },
    content: {
        width: '100%',
        height: '2ch',
        textAlign: 'left',
        paddingBottom: '4ch',
    },
    seeMoreButton: {
        backgroundColor: '#555555',
        color: 'white',
        textTransform: 'lowercase',
        height: '4ch',
        alignSelf: 'flex-end',
        marginTop: '1ch',
    },
}));

// LOGIQUE :

const Comments = ({postId}) => {

    let currentUser = JSON.parse(sessionStorage.getItem("currentUser"));

    const classes = useStyles();

    const [commentsList, setCommentsList] = useState([]);
    const [commentContent, setCommentContent] = useState("");
    const [userList, setUserList] = useState(null);
    const [moreComments, setMoreComments] = useState(false);

    let buttonText = moreComments ? 'Masquer les commentaires' : 'Voir plus de commentaires';

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
        <div className={classes.root}>
            <div className={classes.input}>
                <textarea className={classes.inputText} value={commentContent} onChange={setCommentText} type="text" placeholder="Rédigez un commentaire..."/>
                <Button onClick={handleComment} className={classes.button} ><span className={classes.firstLetter}>C</span>ommenter</Button>
            </div>
            {userList && commentsList && commentsList.map( (comment,i ) => {
                if ((i < 1 && moreComments == false) || (moreComments == true)) {
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
                                <Link className={classes.header}>
                                        <Avatar className={classes.avatar} >
                                            {src=="" && <Person style={{fontSize: 30}} id="avatar"/>}
                                            {src!="" && <img id="image" src={src} style={{ width: '40px', height: '40px'}} />}
                                        </Avatar>
                                    <div>
                                        <p className={classes.userName}>{author.firstname + " " + author.lastname}</p>
                                        <p className={classes.postedDate}>Posté le {moment(comment.createdAt).format("DD/MM/YYYY")} à {moment(comment.createdAt).format("HH:m")} </p>
                                    </div>
                                </Link>
                                <div className={classes.content}>
                                    <p className={classes.contentText}>{comment.content}</p>
                                </div>
                            </React.Fragment>
                            ); }) }
                        </div>
                    )
                }
                else if (moreComments == true) {
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
                                <Link className={classes.header}>
                                    <div className={classes.headerPic} >
                                        <Avatar className={classes.avatar} >
                                            {src=="" && <Person style={{fontSize: 40}} id="avatar"/>}
                                            {src!="" && <img id="image" src={src} style={{ width: '40px', height: '40px'}} />}
                                        </Avatar>
                                    </div>
                                    <div className={classes.headerText} >
                                        <p className={classes.headerName}>{author.firstname + " " + author.lastname}</p>
                                        <p className={classes.headerDate}>Posté le {moment(comment.createdAt).format("DD/MM/YYYY")} à {moment(comment.createdAt).format("HH:m")} </p>
                                    </div>
                                </Link>
                                <div className={classes.content}>
                                    <p className={classes.contentText}>{comment.content}</p>
                                </div>
                            </React.Fragment>
                            ); }) }
                        </div>
                    )
                } else return;
            })}
            <Button className={classes.seeMoreButton} onClick={() => setMoreComments(!moreComments)}>{buttonText}</Button>
        </div>
    )
};

export default Comments;