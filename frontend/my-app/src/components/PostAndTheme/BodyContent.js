import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

// STYLE DU COMPOSANT :
const useStyles = makeStyles(() => ({
    root: {
        backgroundColor: 'white',
        width: '110ch',
        padding: '2ch',
        marginLeft: '3ch',
        marginRight: 'auto',
        textAlign: 'left',
    },
}));

// LOGIQUE DU COMPOSANT :
const BodyContent = ({url, content}) => {
        
    const classes = useStyles();

    const getImageAlt = (img) => {
        let string = img.split('images/');
        string = string[1];
        string = string.split('/');
        let alt = string[1];
        return alt;
    }; 
    return(
        <div className={classes.root} >
            {content}<br/>
            {url && url.map((img,i) =>  {
                    return <img src={img} alt={getImageAlt(img)} style={{width: '100px'}} key={i} />;
                })}
        </div>
    );
};

export default BodyContent;