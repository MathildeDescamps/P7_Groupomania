import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import clsx from 'clsx';
import { Button, IconButton, Input, InputLabel, InputAdornment, Link, FormControl, FormControlLabel, FormHelperText, Checkbox } from '@material-ui/core/';
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
        marginBottom: '4ch',
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
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'underline',
        },
    },
}));

// LOGIQUE DU COMPOSANT :

const AuthForm = () => {

    let history = useHistory();
    const classes = useStyles();

    //On crée les constantes login, password, etc et on les initialise. Ce sont des strings vides au départ mais elles seront mises à jour avec setName().
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [status, setStatus] = useState("");
    const [hiringDate, setHiringDate] = useState("");
    let isValid;

    const showSignup = () => { 
        document.getElementById('loginError').style.display="none";
        document.getElementById("login-form").style.display="none";
        document.getElementById("signup-form").style.display="flex"; 
        document.getElementById("logo").style.marginTop="10ch";
    };

    const showLogin = () => { 
        document.getElementById("login-form").style.display="flex";
        document.getElementById("signup-form").style.display="none"; 
        document.getElementById("logo").style.marginTop="23ch";
    }

    const displaySuccessMessage = () => {
        let signedUpMessage = document.getElementById('sign-up-ok');
        signedUpMessage.style.cssText='display: block; width: 35%; margin: auto; position: relative; top: 30px; color: green; background-color: #D5EDD1; border: green 1px solid; border-radius: 5px; padding: 5px 0px 5px 0px;';
    };

    const displayErrorMessage = () => {
        let emailRegex = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
        isValid = emailRegex.test(email);
        return isValid;
    };

    const handleLoginSubmit = (e) => {
        //On place ici la logique à appliquer lorsque le user clique sur 'Se connecter'.
        axios({
            method: 'post',
            url: UrlAPI + '/login',
            data: { email : email, password: password}
        })
        //Si la connexion réussie, le backend nous renvoi un token et les infos du user connecté (que l'on stocke dans le session storage) et celui-ci accède à l'application.
        .then(response => {
            let user = response.data.user;
            user.token = response.data.token;
            sessionStorage.setItem("currentUser", JSON.stringify(user));
            history.push('/accueil');
        })
        //Si la connexion échoue, un message d'erreur s'affiche.
        .catch(error => {
            console.log(error);
            let loginError = document.getElementById('loginError');
            loginError.style.cssText='display: block; width: 35%; margin: auto; position: relative; top: 30px; color: red; background-color: #E7E3E3; border: red 1px solid; border-radius: 5px; padding: 5px 0px 5px 0px';
        });
    };
    const handleSignupSubmit = async (e) => {
        displayErrorMessage();
        if (isValid == false) {
            console.log('oops');
            return;
        } else if (isValid == true) {
            console.log('yayy');
            //On envoi à l'API une requête POST contenant les infos du nouveau user pour qu'il soit ajouté en base.
            await axios({
                method: 'post',
                url: UrlAPI + '/signup',
                data: { email : email, password: password, firstname: firstname, lastname: lastname, status: status, hiringDate: hiringDate }
            })
            //Si l'inscription se passe bien, le user est renvoyée sur la page de login avec un message de succès et doit se connecter.
            .then(response => {
                console.log(response);
                let signupError = document.getElementById('loginError');
                signupError.style.cssText='display: none;';
                setPassword("");
                showLogin();
                displaySuccessMessage();
            })
            //Si non, un message d'erreur s'affiche et il n'est pas redirigé vers la page de login.
            .catch(error => {
                e.preventDefault();
                console.log(error);
                document.getElementById("logo").style.marginTop="7ch";
                let signupError = document.getElementById('loginError');
                signupError.style.cssText='display: block; width: 35%; margin: auto; position: relative; top: 30px; color: red; background-color: #E7E3E3; border: red 1px solid; border-radius: 5px; padding: 5px 0px 5px 0px';
            });
        };
    }

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
            <div id="form-container">
                <p id="sign-up-ok" style={{display: 'none'}}>Félicitations, vous êtes inscrit ! Connectez-vous pour accéder à Postmania.</p>
                <p id="loginError" style={{display: 'none'}} >La connexion a échouée, veuillez réessayer.</p>
                <p id="signupError" style={{display: 'none'}} >L'inscription a échouée, veuillez réessayer.</p>
                <img src={ logo } alt='[ logo Postmania ]' className={classes.logo} id="logo" />
                <form id="login-form" className={classes.loginRoot} noValidate autoComplete="off">
                    <FormControl className={clsx(classes.margin, classes.formField)}>
                        <InputLabel className={classes.label} value={email} htmlFor="standard-adornment-login">Email</InputLabel>
                        <Input  className={classes.label} id="login-email-field" type="email" endAdornment={
                            <InputAdornment position="end">
                                <AccountCircle className={classes.icon} />
                            </InputAdornment>
                        } onChange={(e) => setEmail(e.target.value)}/>
                    </FormControl>
                    <FormControl className={clsx(classes.margin, classes.formField)}>
                        <InputLabel className={classes.label} htmlFor="standard-adornment-password">Mot de passe</InputLabel>
                        <Input className={classes.label} id="passwordInput" value={password} type={showPassword ? 'text' : 'password'} endAdornment={
                            <InputAdornment position="end">
                                <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword}>
                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        } onChange={(e) => setPassword(e.target.value)}/>
                    </FormControl>
                    <Button id="loginButton" size="large" className={classes.loginButton} onClick={handleLoginSubmit}>Se connecter</Button>
                    <Link className={classes.link} href="#" onClick={showSignup} >Vous n'avez pas encore de compte ? S'inscrire.</Link>
                </form>
                <form id="signup-form" className={classes.signupRoot} noValidate autoComplete="off">
                    <FormControl className={clsx(classes.margin, classes.formField)}>
                        <InputLabel className={classes.label} htmlFor="standard-adornment-login">Email</InputLabel>
                        <Input className={classes.label} id="signup-email-field" value={email} type="email" endAdornment={
                            <InputAdornment position="end">
                                <AccountCircle className={classes.icon} />
                            </InputAdornment>
                        } 
                        onChange={(e) => setEmail(e.target.value)} />
                        <p id="emailError" style={{display: 'none', color: 'red', fontSize: '14px'}}>Veuillez saisir une adresse mail valide.</p>
                    </FormControl>
                    <FormControl className={clsx(classes.margin, classes.formField)}>
                        <InputLabel className={classes.label} htmlFor="standard-adornment-password">Mot de passe</InputLabel>
                        <Input className={classes.label} id="signup-password-field" value={password} type={showPassword ? 'text' : 'password'} endAdornment={
                            <InputAdornment position="end">
                                <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword}>
                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        } onChange={(e) => setPassword(e.target.value)}/>
                    </FormControl>
                    <FormControl className={clsx(classes.margin, classes.formField)}>
                        <InputLabel className={classes.label} htmlFor="standard-adornment-firstname">Prénom</InputLabel>
                        <Input className={classes.label} id="firstname-field" value={firstname} type="text" onChange={(e) => setFirstname(e.target.value)}/>
                    </FormControl>
                    <FormControl className={clsx(classes.margin, classes.formField)}>
                        <InputLabel className={classes.label} htmlFor="standard-adornment-lastname">Nom</InputLabel>
                        <Input className={classes.label} id="lastname-field" value={lastname} type="text" onChange={(e) => setLastname(e.target.value)}/>
                    </FormControl>
                    <FormControl className={clsx(classes.margin, classes.formField)}>
                        <InputLabel className={classes.label} htmlFor="standard-adornment-status">Statut</InputLabel>
                        <Input className={classes.label} id="status-field" value={status} type="text" onChange={(e) => setStatus(e.target.value)}/>
                        <FormHelperText className={classes.label} id="outlined-weight-helper-text">Ex : Directeur commerciale.</FormHelperText>
                    </FormControl>
                    <FormControl className={clsx(classes.margin, classes.formField)}>
                        <Input className={classes.label} id="hiringDate-field" value={hiringDate} type="date" onChange={(e) => setHiringDate(e.target.value)}/>
                        <FormHelperText className={classes.label} id="outlined-weight-helper-text">Date d'embauche</FormHelperText>
                    </FormControl>
                    <FormControl className={ classes.checkbox}>
                        <FormControlLabel required control={ 
                            <Checkbox name="RGPD" color="default" inputProps={{ 'aria-label': 'checkbox with default color' }} />
                            } label="En cochant cette case, je reconnais avoir pris connaissance de la charte RGPD de CAP Formation et en accepte les termes."/>
                    </FormControl>
                    <Button size="large" className={classes.signupButton} onClick={handleSignupSubmit}>S'inscrire</Button>
                    <Link className={classes.link} href="/" onClick={showLogin} >Vous avez déjà un compte ? Se connecter.</Link>
                </form>
            </div>
    );
};

export default AuthForm;