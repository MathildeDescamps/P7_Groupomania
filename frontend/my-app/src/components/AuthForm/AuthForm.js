import React, { useState } from 'react';
import clsx from 'clsx';
import { Button, IconButton, Input, InputLabel, InputAdornment , Link, FormControl, FormControlLabel, FormHelperText, Checkbox } from '@material-ui/core/';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import logo from '../../portalLogo.png';


const UrlAPI = 'http://localhost:3000/api/auth';

// STYLE DU COMPOSANT :
const useStyles = makeStyles((theme) => ({
    logo: {
        height: '10ch',
        marginTop: '23ch',
    },
    loginRoot: {
        display: 'flex',
        flexDirection : 'column',
        alignItems: 'center',
        backgroundColor: '#F1D4D4',
        color: '#9C9D9C',
        width: '50ch',
        height: '30ch',
        position: 'absolute',
        top: 50,
        bottom: 0,
        left: 0,
        right: 0,
        margin: 'auto',
        paddingTop: '5ch',
    },
    signupRoot: {
        display: 'none',
        flexDirection : 'column',
        alignItems: 'center',
        backgroundColor: '#F1D4D4',
        color: '#9C9D9C',
        width: '50ch',
        height: '75ch',
        position: 'absolute',
        top: 180,
        bottom: 0,
        left: 0,
        right: 0,
        margin: 'auto',
        paddingTop: '3ch',
    },
    formField: {
        width: '30ch',
        marginBottom: '2ch',
        backgroundColor: '#F6F5F5',
        borderRadius: '10px',
    },
    label: {
        marginLeft: '15px',
    },
    icon: {
        marginRight: '10px',
    },
    checkbox: {
        backgroundColor: 'white',
        width: '40ch',
        borderRadius: '10px',
        padding: '10px',
        marginBottom: '3ch',
        marginTop: '1ch',
    },
    loginButton: {
        backgroundColor: '#D75030',
        width: '25ch',
        color: 'white',
        marginBottom: '6ch',
        position: 'relative',
        top: '20px',
        '&:hover': {
            backgroundColor: '#BF5438'
        },
    },
    signupButton: {
        backgroundColor: '#D75030',
        width: '25ch',
        color: 'white',
        marginBottom: '2ch',
        position: 'relative',
        top: '-8px',
        '&:hover': {
            backgroundColor: '#BF5438'
        },
    },
    link: {
        color: '#D75030',
        textDecoration: 'underlined',
    },
}));

// LOGIQUE DU COMPOSANT :
const showSignup = () => { 
	document.getElementById("login-form").style.display="none";
	document.getElementById("signup-form").style.display="flex"; 
    document.getElementById("logo").style.marginTop="10ch";
};

const showLogin = () => { 
	document.getElementById("login-form").style.display="flex";
	document.getElementById("signup-form").style.display="none"; 
    document.getElementById("logo").style.marginTop="23ch";
}

const AuthForm = () => {

        //On crée les constantes login, password, etc et on les initialise. Ce sont des strings vides au départ mais elles seront mises à jour avec setName().
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
        const [showPassword, setShowPassword] = useState(false);
        const [firstname, setFirstname] = useState("");
        const [lastname, setLastname] = useState("");
        const [status, setStatus] = useState("");
        const [hiringDate, setHiringDate] = useState("");

        const classes = useStyles();

        const handleLoginSubmit = (e) => {
            //On place ici la logique à appliquer lorsque le user clique sur 'Se connecter'.
            axios({
                method: 'post',
                url: UrlAPI + '/login',
                data: { email : email, password: password}
            })
            .then(function (response) {
                //On traite la suite une fois la réponse obtenue 
                console.log(response);
            })
            .catch(function (error) {
                //On traite ici les erreurs éventuellement survenues
                console.log(error);
            });
        };
        const handleSignupSubmit = (e) => {
            //On place ici la logique à appliquer lorsque le user clique sur 'S'inscrire'.
            axios({
                method: 'post',
                url: UrlAPI + '/signup',
                data: { email : email, password: password, firstname: firstname, lastname: lastname, status: status, hiringDate: hiringDate }
            })
            .then(function (response) {
                //On traite la suite une fois la réponse obtenue 
                console.log(response);
            })
            .catch(function (error) {
                //On traite ici les erreurs éventuellement survenues
                console.log(error);
            });
        };

        const handleClickShowPassword = () => {
            setShowPassword(!showPassword);
        };

        const handleMouseDownPassword = (event) => {
            event.preventDefault();
        };

        return (
            <div id="form-container">
                <img src={ logo } alt='[ logo Postmania ]' className={classes.logo} id="logo" />
                <form id="login-form" className={classes.loginRoot} noValidate autoComplete="off">
                    <FormControl className={clsx(classes.margin, classes.formField)}>
                        <InputLabel className={classes.label} htmlFor="standard-adornment-login">Email</InputLabel>
                        <Input  className={classes.label} id="login-email-field" type="email" endAdornment={
                            <InputAdornment position="end">
                                <AccountCircle className={classes.icon} />
                            </InputAdornment>
                        } onChange={(e) => setEmail(e.target.value)}/>
                    </FormControl>
                    <FormControl className={clsx(classes.margin, classes.formField)}>
                        <InputLabel className={classes.label} htmlFor="standard-adornment-password">Mot de passe</InputLabel>
                        <Input className={classes.label} id="login-password-field" type={showPassword ? 'text' : 'password'} endAdornment={
                            <InputAdornment position="end">
                                <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword}>
                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        } onChange={(e) => setPassword(e.target.value)}/>
                    </FormControl>
                    <Button size="large" className={classes.loginButton} href="./accueil" onClick={handleLoginSubmit}>Se connecter</Button>
                    <Link className={classes.link} href="#" onClick={showSignup} >Vous n'avez pas encore de compte ? S'inscrire.</Link>
                </form>
                <form id="signup-form" className={classes.signupRoot} noValidate autoComplete="off">
                    <FormControl className={clsx(classes.margin, classes.formField)}>
                        <InputLabel className={classes.label} htmlFor="standard-adornment-login">Email</InputLabel>
                        <Input className={classes.label} id="signup-email-field" type="email" endAdornment={
                            <InputAdornment position="end">
                                <AccountCircle className={classes.icon} />
                            </InputAdornment>
                        } onChange={(e) => setEmail(e.target.value)}/>
                    </FormControl>
                    <FormControl className={clsx(classes.margin, classes.formField)}>
                        <InputLabel className={classes.label} htmlFor="standard-adornment-password">Mot de passe</InputLabel>
                        <Input className={classes.label} id="signup-password-field" type={showPassword ? 'text' : 'password'} endAdornment={
                            <InputAdornment position="end">
                                <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword}>
                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        } onChange={(e) => setPassword(e.target.value)}/>
                    </FormControl>
                    <FormControl className={clsx(classes.margin, classes.formField)}>
                        <InputLabel className={classes.label} htmlFor="standard-adornment-firstname">Prénom</InputLabel>
                        <Input className={classes.label} id="firstname-field" type="text" onChange={(e) => setFirstname(e.target.value)}/>
                    </FormControl>
                    <FormControl className={clsx(classes.margin, classes.formField)}>
                        <InputLabel className={classes.label} htmlFor="standard-adornment-lastname">Nom</InputLabel>
                        <Input className={classes.label} id="lastname-field" type="text" onChange={(e) => setLastname(e.target.value)}/>
                    </FormControl>
                    <FormControl className={clsx(classes.margin, classes.formField)}>
                        <InputLabel className={classes.label} htmlFor="standard-adornment-status">Statut</InputLabel>
                        <Input className={classes.label} id="status-field" type="text" onChange={(e) => setStatus(e.target.value)}/>
                        <FormHelperText className={classes.label} id="outlined-weight-helper-text">Ex : Directeur commerciale.</FormHelperText>
                    </FormControl>
                    <FormControl className={clsx(classes.margin, classes.formField)}>
                        <Input className={classes.label} id="hiringDate-field" type="date" onChange={(e) => setHiringDate(e.target.value)}/>
                        <FormHelperText className={classes.label} id="outlined-weight-helper-text">Date d'embauche</FormHelperText>
                    </FormControl>
                    <FormControl className={ classes.checkbox}>
                        <FormControlLabel required control={ 
                            <Checkbox name="RGPD" color="default" inputProps={{ 'aria-label': 'checkbox with default color' }} />
                            } label="En cochant cette case, je reconnais avoir pris connaissance de la charte RGPD de CAP Formation et en accepte les termes."/>
                    </FormControl>
                    <Button size="large" className={classes.signupButton} onClick={handleSignupSubmit}>S'inscrire</Button>
                    <Link className={classes.link} href="accueil" onClick={showLogin} >Vous avez déjà un compte ? Se connecter.</Link>
                </form>
            </div>
        );
    };


export default AuthForm;