import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

// STYLE DU COMPOSANT :
const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: 'white',
        width: '110ch',
        padding: '2ch',
        marginLeft: '3ch',
        marginRight: 'auto',
    },
}));

// LOGIQUE DU COMPOSANT :
const BodyContent = props => {
        
    const classes = useStyles();
    
    return(
        <div className={classes.root} >{props.content}</div>
    );
};

export default BodyContent;