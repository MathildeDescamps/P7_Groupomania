import React, { Component, useState } from 'react';
import clsx from 'clsx';
import { TextField, Button } from '@material-ui/core/';
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

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: '25ch',
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
                url: 'http://localhost:3000/api/auth/login',
                data: { email : email, password: password}
            })
            .then(function (reponse) {
                //On traite la suite une fois la réponse obtenue 
                console.log(reponse);
            })
            .catch(function (erreur) {
                //On traite ici les erreurs éventuellement survenues
                console.log(erreur);
            });
        };

        const handleClickShowPassword = () => {
            setShowPassword(!showPassword);
        };

        const handleMouseDownPassword = (event) => {
            event.preventDefault();
        };

        return (
            <div className={classes.root}>
                <form noValidate autoComplete="off">
              <FormControl className={classes.margin}>
                    <InputLabel htmlFor="input-with-icon-adornment">Email</InputLabel>
                    <Input
                    id="input-with-icon-adornment"
                    startAdornment={
                        <InputAdornment position="start">
                        <AccountCircle />
                        </InputAdornment>
                    }
                    onChange={(e) => setEmail(e.target.value)}
                    />
                </FormControl>
                <FormControl className={clsx(classes.margin, classes.textField)}>
                    {<InputLabel htmlFor="standard-adornment-password">Mot de passe</InputLabel>}
                    <Input id="password-field" label="Mot de passe" variant="filled" 
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                >
                                {showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        }
                        onChange={(e) => setPassword(e.target.value)}/>
                </FormControl>
                    <FormControlLabel control={ 
                        <Checkbox name="RGPD" color="primary" />
                    }
                    label="En cochant cette case, je reconnais avoir pris connaissance de la charte RGPD de CAP Formation et en accepte les termes."
                    />
                    <Button variant="outlined" onClick={handleSubmit}>Se connecter</Button>
                </form>
            </div>
        );
    };


export default LoginForm;