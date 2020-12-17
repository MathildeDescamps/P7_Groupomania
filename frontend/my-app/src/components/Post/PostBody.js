import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BodyContent from './BodyContent';

// LOGIQUE DU COMPOSANT :
const PostBody = () => {
    return(
        <>
            <h3>PostBody</h3>
            <BodyContent />
        </>
    );
};

export default PostBody;