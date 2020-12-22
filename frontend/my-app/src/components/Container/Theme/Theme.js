import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core/';

const UrlAPI = 'http://localhost:3000/api/';

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
    },
}));

// LOGIQUE DU COMPOSANT :

const Theme = ({theme}) => {

    const [themeInfos, setThemeInfos] = useState();
    
    useEffect ( () => {
        axios.get(UrlAPI + 'themes/' + theme)
            .then(result => result.data)
            .then(data => setThemeInfos(data[0]));
    }, []);
    
    const classes = useStyles();

    const handleFilter = (e) => {};

    return(
        <>
            <Button  className={ classes.root } key={theme.id} onClick={handleFilter} >
                {themeInfos && themeInfos.name}
            </Button>
        </>
    );
};


export default Theme;