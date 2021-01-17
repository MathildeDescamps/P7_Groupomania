import React, { useEffect } from 'react';
import Body from './Body';


// LOGIQUE DU COMPOSANT :

const Post = (props) => {

    return(
        <>
            <Body post={props.post} />
        </>
    );
};


export default Post;