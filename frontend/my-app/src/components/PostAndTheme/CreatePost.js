import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { Button } from '@material-ui/core';
import ImageUploader from 'react-images-upload';
import authHeader from '../AuthForm/AuthHeader';

const UrlAPI = 'http://localhost:3000/api/';

// STYLE :

const useStyles = makeStyles((theme) => ({
    createPostBlock: {
            display: 'flex',
            flexDirection: 'column',
            width: '70%',
            margin: 'auto',  
            marginTop: '4ch',
            marginBottom: '8ch',
        },
        createPostHeader: {
            backgroundColor: '#D75030',
            color: 'white',
            width: '25%',
            padding: '1ch',
            textAlign: 'left',
            fontSize: '12px',
        },
        createPostBody: {
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#F2D3D4',
            padding: '2ch',
            width: '100%',
            margin: 'auto',
        },
        createPostBodyContent: {
            backgroundColor: '#FFFFFE',
            width: '95%',
            margin: 'auto',
            padding: '2ch',
            textAlign: 'left',
        },  
        postTextarea: {
            width: '100%',
            height: 'auto',
            fontFamily: 'Avenir, Segoe, UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
            border: 'none',
            "&:focus": {
                outline: 'none',
            },
        },
        buttons: {
            display: 'flex',
            width: '95%',
            height: '3.5ch',
            margin: 'auto',
            marginTop: '2ch',
            justifyContent: 'space-between',
        },
        buttonsText: {
            color: '#D75030',
            fontWeight: '600',
            fontSize: '14px',   
            marginRight: '1ch',
            marginTop: '0.5ch',
        },
        dropDownList: {
            width: '30%',
            backgroundColor: '#D75030',
            borderStyle: 'none',
            color: '#FFFFFE',
            paddingLeft: '1ch',
            marginRight: '1ch',
            fontSize: '14px',   
            cursor: 'pointer',
        },
        createTheme: {
            color: '#686A6C',
            width: '35%',
            fontSize: '14px',   
            borderStyle: 'none',
            paddingLeft: '1ch',
        },
        publish: {
            backgroundColor: '#D75030',
            color: '#FFFFFE',
            borderRadius: '5px',
            width: '15%',
            fontWeight: '400',
            "&:hover": {
                backgroundColor: '#B85030',
            },
        },
        errorMessages: {
            display: 'none',
            width: '100%',
            marginTop: '0.5ch',
            color: '#D7502F',
            fontWeight: '500',
            textAlign: 'right',
        },
}));

// LOGIQUE :

const CreatePost = props => {

    const classes = useStyles();
    const [content, setContent] = useState('');
    const [newTheme, setNewTheme] = useState('');
    const [user, setUser] = useState('');
    const [theme, setTheme] = useState('');
    const [pictures, setPictures] = useState([]);

    const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));

    const handleChange = (event) => {
        setTheme(event.target.value);
    };

    const handleContent = (event) => {
        setContent(event.target.value);
    };

    const handleNewTheme = (event) => {
        setNewTheme(event.target.value);
    };
    
    //Gestion d'import d'image(s) lors de la création d'un post.
    const onDrop = picture => {
        setPictures(picture);
    };

    const handlePublication = () => {
            if(theme != '' && newTheme != '') {
                let errorBlock = document.getElementById('errorMessages');
                let errorMessage = document.getElementById('error1');
                let errorMessage2 = document.getElementById('error2');
                errorBlock.style.cssText='display: block;';
                errorMessage.style.cssText='display: block;';
                errorMessage2.style.cssText='display: none;';
            } else if (theme != '' && newTheme == '') {
                axios({
                    method: 'post',
                    url: UrlAPI + currentUser.id + '/posts',
                    data: { content : content, theme: theme, user: currentUser.id },
                    headers: authHeader(),
                })
                .then(function (response) {
                    //On traite la suite une fois la réponse obtenue 
                    let postId = response.data.id;
                    if (pictures.length >0) {
                        const fd = new FormData();
                        let pictureList = [];
                        pictureList = pictures.map(p => {
                            fd.append('image', p);
                        });                    
                        const config = {
                            headers: {
                                'Content-Type' : 'multipart/form-data',
                                'x-access-token': currentUser.token,
                                'Authorization': 'Bearer ' + currentUser.token,
                            }
                        }
                        axios.post(UrlAPI + currentUser.id + '/posts/' + postId + '/images', fd, config)
                        .then(function (response) {
                            console.log('image:', response);
                            window.location.reload(false);
                        })
                        .catch(function (error) {
                            //On traite ici les erreurs éventuellement survenues
                            console.log(error);
                        });
                    }
                    else window.location.reload(false);
                })
                .catch(function (error) {
                    //On traite ici les erreurs éventuellement survenues
                    console.log(error);
                });
            } else if (theme == '' && newTheme != '') {
                axios({
                    method: 'post',
                    url: UrlAPI + currentUser.id + '/themes',
                    data: { user : currentUser.id, name: newTheme },
                    headers: authHeader(),
                })
                .then(res => {
                    axios({
                        method: 'post',
                        url: UrlAPI + currentUser.id + '/posts',
                        data: { content : content, theme: res.data.id, user: currentUser.id },
                        headers: authHeader(),
                    })
                    .then(function (response) {
                        //On traite la suite une fois la réponse obtenue 
                        let postId = response.data.id;
                        if (pictures.length >0) {
                            const fd = new FormData();
                            let pictureList = [];
                            pictureList = pictures.map(p => {
                                fd.append('image', p);
                            });                    
                            const config = {
                                headers: {
                                    'Content-Type' : 'multipart/form-data',
                                    'x-access-token': currentUser.token,
                                    'Authorization': 'Bearer ' + currentUser.token,
                                }
                            }
                            axios.post(UrlAPI + currentUser.id + '/posts/' + postId + '/images', fd, config)
                            .then(function (response) {
                                console.log('image:', response);
                                window.location.reload(false);
                            })
                            .catch(function (error) {
                                //On traite ici les erreurs éventuellement survenues
                                console.log(error);
                            });
                        }
                        else window.location.reload(false);
                    })
                    .catch(function (error) {
                        //On traite ici les erreurs éventuellement survenues
                        console.log(error);
                    });
                })
                .catch(err => {
                    console.log(err);
                });
            }
            else {
                let errorBlock = document.getElementById('errorMessages');
                let errorMessage = document.getElementById('error1');
                let errorMessage2 = document.getElementById('error2');
                errorBlock.style.cssText='display: block;';
                errorMessage2.style.cssText='display: block;';
                errorMessage.style.cssText='display: none;';
            }
            
        };

    return(
        <div className= { classes.createPostBlock }>
            <div className={classes.createPostHeader}>
                <h2>PUBLIER UN POST</h2>
            </div>
            <div className={classes.createPostBody} >
                <div className={classes.createPostBodyContent} >
                    <textarea className={classes.postTextarea} placeholder="Ecrivez le contenu de votre post ici..." value={content} onChange={handleContent}/>
                    <ImageUploader
                        withIcon={false}
                        buttonText='Ajoutez des images'
                        onChange={onDrop}
                        imgExtension={['.jpg', '.gif', '.png', '.gif']}
                        maxFileSize={5242880}
                        withPreview={true}
                        withLabel={false}
                        fileSizeError='Image trop volumineuse'
                        buttonStyles={{backgroundColor: '#757575', borderRadius: '5px', position: "relative", margin: "0", height: '30px'}}
                    />
                </div>
                <div className={classes.buttons}>
                    <select className={classes.dropDownList} value={theme} placeholder="Choisissez un thème" onChange={handleChange}>
                        <option value="" defaultValue data-default>Choisissez un thème</option>
                        {props.themes && props.themes.map((theme) => { 
                        return (
                            <option key={theme.id} value={theme.id}>{theme.name}</option>
                        ); })}
                    </select>
                    <div className={classes.buttonsText}>OU</div>
                    <input className={classes.createTheme} type="text" onChange={handleNewTheme} value={newTheme} id="new-theme" placeholder="Créez un nouveau thème..." />
                    <Button onClick={handlePublication} className={classes.publish} >PUBLIER</Button>
                </div>
            </div>
            <div id="errorMessages" className={classes.errorMessages} >
                    <p id="error1" style={{display: 'none'}} >Veuillez ne renseigner qu'un seul thème.</p>
                    <p id="error2" style={{display: 'none'}} >Veuillez renseigner un thème.</p>
            </div>
        </div>
    );

};

export default CreatePost;