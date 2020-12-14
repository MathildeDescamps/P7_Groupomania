import React, { Component, useState } from 'react';
import clsx from 'clsx';
import { TextField, Button, Typography, Link, Grid } from '@material-ui/core/';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { makeStyles, StylesProvider } from '@material-ui/core/styles';
import axios from 'axios';
const UrlAPI = 'http://localhost:3000/api/auth';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection : 'column',
        alignItems: 'center',
        backgroundColor: '#F1D4D4',
        color: '#9C9D9C',
        width: '50ch',
        height: '50ch',
        position: 'absolute',
        top: 110,
        bottom: 0,
        left: 0,
        right: 0,
        margin: 'auto',
        paddingTop: '5ch',
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
        marginBottom: '4ch',
        marginTop: '2ch',
    },
    button: {
        backgroundColor: '#D75030',
        width: '25ch',
        color: 'white',
        marginBottom: '8ch',
        position: 'relative',
        top: '20px',
        '&:hover': {
            backgroundColor: '#BF5438'
        },
    },
    link: {
        color: '#D75030',
        textDecoration: 'underlined',
    },
}));

const LoginForm = () => {

        //On crée les constantes login, password, etc et on les initialise. Ce sont des strings vides au départ mais elles seront mises à jour avec setName().
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
        const [showPassword, setShowPassword] = useState(false);
        const [firstname, setFirstname] = useState("");
        const [lastname, setLastname] = useState("");
        const [status, setStatus] = useState("");
        const [hiringDate, setHiringDate] = useState("");

        const classes = useStyles();

        const handleSubmit = (e) => {
            //On place ici la logique a appliquer lorsque le user clique sur 'Se connecter'.
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

        const handleClickShowPassword = () => {
            setShowPassword(!showPassword);
        };

        const handleMouseDownPassword = (event) => {
            event.preventDefault();
        };

        return (
            <div>
                <form className={classes.root} noValidate autoComplete="off">
                    <FormControl className={clsx(classes.margin, classes.formField)}>
                        <InputLabel className={classes.label} htmlFor="standard-adornment-password">Email</InputLabel>
                         <Input id="email-field" type="email" endAdornment={
                            <InputAdornment position="end">
                                <AccountCircle className={classes.icon} />
                            </InputAdornment>
                        } onChange={(e) => setEmail(e.target.value)}/>
                    </FormControl>
                    <FormControl className={clsx(classes.margin, classes.formField)}>
                        <InputLabel className={classes.label} htmlFor="standard-adornment-password">Mot de passe</InputLabel>
                        <Input id="password-field" type={showPassword ? 'text' : 'password'} endAdornment={
                            <InputAdornment position="end">
                                <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword}>
                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        } onChange={(e) => setPassword(e.target.value)}/>
                    </FormControl>
                    <FormControl className={ classes.checkbox}>
                        <FormControlLabel control={ 
                            <Checkbox name="RGPD" color="default" inputProps={{ 'aria-label': 'checkbox with default color' }} />
                            } label="En cochant cette case, je reconnais avoir pris connaissance de la charte RGPD de CAP Formation et en accepte les termes."/>
                    </FormControl>
                    <Button size="large" className={classes.button} onClick={handleSubmit}>Se connecter</Button>
                    <Link className={classes.link} href="#" onClick={handleSubmit} >Vous n'avez pas encore de compte ? S'inscrire.</Link>
                </form>
            </div>
        );
    };


export default LoginForm;