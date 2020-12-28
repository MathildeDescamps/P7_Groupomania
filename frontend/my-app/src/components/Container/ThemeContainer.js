import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Theme from './Theme/Theme';
import axios from 'axios';

const UrlAPI = 'http://localhost:3000/api/';

const useStyles = makeStyles((theme) => ({
        root: {
            backgroundColor: '#F1D4D4',
            width: '20%',
            height: '100%',
            position: 'absolute',
            position: 'fixed',
            right: '0', 
            top: '0',
            marginTop: '10ch',      
            paddingLeft: '1ch',
            paddingRight: '1ch',
        },
        header: {
            backgroundColor: '#D7502F',
            color: 'white',
            fontSize: '28px',
            fontWeight: '600',
            textAlign: 'center',
            padding: '1ch',
        },
}));

const ThemeContainer = props => {
    
    const [themeList, setThemeList] = useState(null);
    
    const classes = useStyles();

    //On envoi une requête GET à l'API pour récupérer un tableau 'themeList' contenant des objets (1 objet / theme).
    useEffect ( () => {
        axios.get(UrlAPI + 'themes')
        .then(result => result.data)
        .then(data => setThemeList(data))
    }, []);

    return (
            <div className={ classes.root } >
                <div className={ classes.header } >THÈMES</div>
                {themeList && themeList.map(theme => { 
                return <Theme filter={props.filter}  key={theme.id} theme={theme} />;})}
            </div>
    );
};

export default ThemeContainer;