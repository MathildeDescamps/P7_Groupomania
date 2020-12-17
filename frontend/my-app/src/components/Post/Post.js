import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PostHeader from './PostHeader';
import PostBody from './PostBody';


// LOGIQUE DU COMPOSANT :
const Post = (post) => {
    return(
        <>
            <PostHeader />
            {post}
            <PostBody />
        </>
    );
};

export default Post;