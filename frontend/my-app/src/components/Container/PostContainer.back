import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {CssBaseline, Typography, Container} from '@material-ui/core';
import { positions } from '@material-ui/system';
import Box from '@material-ui/core/Box';
import Post from '../Post/Post';
import axios from 'axios';

const UrlAPI = 'http://localhost:3000/api/';

const PostContainer = () => {
    
    const [postList, setPostList] = useState(null);
    useEffect ( () => {
        getAllPosts();
    },[]);
    const getAllPosts = async () => {
        const result = await axios (UrlAPI + 'posts');
        setPostList(result.data);
    };

    return (
        <>
            <CssBaseline />
            <Container>
                {postList && postList.map((post )=> {
                    return(
                        <Post post={post.user} />
                    );
                })}
            </Container>
        </>
    );
};

export default PostContainer;