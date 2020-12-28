import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core/';

const UrlAPI = 'http://localhost:3000/api/themes/';

//STYLE DU COMPOSANT :

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: '#FFFFFE',
        color: '#696A6B',
        fontSize: '18px',
        fontWeight: '400',
        padding: '1ch',
        maxWidth: '24ch',
        width: '14ch',
        textAlign: 'center',
        margin: '1ch',
        '&:hover': {
            backgroundColor: '#D35233',
            color: 'white',
        },
        clickedButton: {
            backgroundColor: 'red',
            color: 'white',
        },
    },
}));

// LOGIQUE DU COMPOSANT :

const Theme = props => {

    const classes = useStyles();

    let setThemeClicked = () => {
        let url = new URL('http://localhost:5000/accueil');
        let params = new URLSearchParams(url.search);
        params.set('theme_id', props.theme.id);
        url.search = params.toString();
        let newUrl = url.toString();
        console.log(newUrl);
        props.filter();
    } 
    return(
        <>
            <Button className={ classes.root } onClick={() => { setThemeClicked(); }}> 
                {props.theme && props.theme.name} 
            </Button>
        </>
    );
};


export default Theme;