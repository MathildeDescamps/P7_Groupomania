import React, { Component, useState } from 'react';
import { Button, TextField } from '@material-ui/core';
import styled from 'styled-components';

const FormWrapper = styled.div`
     
`;

class Form extends Component {
    render(){
        //On crée les constantes login et password etc et on les initialise. Ce sont des strings vides au départ mais elles seront mises à jour avec setName().
        function SetForm () {
            const [email, setEmail] = useState("");
            const [password, setPassword] = useState("");
            const [firstname, setFirstname] = useState("");
            const [lastname, setLastname] = useState("");
            const [status, setStatus] = useState("");
            const [hiringDate, setHiringDate] = useState("");

        }
        const handleSubmit = (e) => {
            //On place ici la logique a appliquer lorsque le user clique sur 'Se connecter'.
        }
        return(
            <FormWrapper>
                <form noValidate autoComplete="off">
                    <TextField id="email-field" label="Email" variant="filled" />
                    <TextField id="password-field" label="Mot de passe" variant="filled" />
                </form>
            </FormWrapper>
        );
    }
}

export default Form;