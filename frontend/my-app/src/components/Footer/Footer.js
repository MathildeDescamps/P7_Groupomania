import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from '@material-ui/core';

// STYLE DU COMPOSANT :
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#D75030',
        height: '5ch',
        width: '100%',
        justifyContent: 'center',
        position: 'fixed',
        bottom: '0',
    },
}));

// LOGIQUE DU COMPOSANT :
const Footer = () => {
    
    const classes = useStyles();

    return (
        <div id="footer-container" className={ classes.root } >
            <Link className={classes.link} href="/mentions-legales" >mentions légales | </Link>© kira-factory 2020 | <Link className={classes.link} href="mailto:contact@postmania.com" > Nous contacter</Link>
        </div>
    )
};

export default Footer;