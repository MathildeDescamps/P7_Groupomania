import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {CssBaseline} from '@material-ui/core';
import Post from './Post/Post';
import axios from 'axios';

const UrlAPI = 'http://localhost:3000/api/';

const useStyles = makeStyles((theme) => ({
        root: {
            width: '80%',
            position: 'relative',
            paddingTop: '10ch',
        },
}));

const PostContainer = () => {
    
    //let { id } = useParams();

    const [postList, setPostList] = useState(null);
    
    const classes = useStyles();

    useEffect ( () => {
        axios.get(UrlAPI + 'posts')
        .then(result => result.data)
        .then(data => setPostList(data));
    }, []);

    return (
        <>
            <CssBaseline />
            <div className= { classes.root }>
                {postList && postList.map(post => { 
                return <Post key={post.id} post={post} />;})}
            </div>
        </>
    );
};

export default PostContainer;