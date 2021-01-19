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
    },
    button: {
        backgroundColor: '#555555',
        color: 'white',
        textTransform: 'lowercase',
        height: '4.5ch',
        width: '10%',

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
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '20%',
        height: '6ch',
        border: 'solid 1px black',
    },
    headerPic: {},
    avatar: {
        border: 'solid 3px #E3431D',
    },
    headerText: {
        height: '',
    },
    headerName: {
        color: '#E3431D',
        fontWeight: '600',
        fontSize: '17px',
    },
    headerDate: {
        fontSize: '10px',
    },
    content: {
        width: '100%',
        height: '2ch',
        maxHeight: '8ch',
        textAlign: 'left',
        paddingLeft: '1ch',
        paddingRight: '1ch',
        paddingBottom: '0ch',
        position: 'relative',
        bottom: '10px',
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
            })}
            <Button className={classes.seeMoreButton}><span className={classes.firstLetter}>V</span>oir plus de commentaires</Button>
        </div>
    )
};

export default Comments;