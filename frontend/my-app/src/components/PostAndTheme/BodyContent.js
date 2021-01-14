import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

// STYLE DU COMPOSANT :
const useStyles = makeStyles(() => ({
    root: {
        backgroundColor: 'white',
        width: '100%',
        padding: '2ch',
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
                    return <img src={img} alt={getImageAlt(img)} style={{width: '250px', marginRight: '2ch', marginTop: '2ch',}} key={i} />;
                })}
        </div>
    );
};

export default BodyContent;