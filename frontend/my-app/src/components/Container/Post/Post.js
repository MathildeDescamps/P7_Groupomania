//import React, { useState } from 'react';
import Body from './Body';


// LOGIQUE DU COMPOSANT :

const Post = ({post}) => {
    return(
        <>
            <Body user={post.user} post={post} />
        </>
    );
};


export default Post;