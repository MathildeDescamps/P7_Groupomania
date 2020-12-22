import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import Accueil from './containers/Accueil';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';


if (window.location.pathname === '/') {
  ReactDOM.render(
    <App url='/' />,
    document.getElementById('root')
  );
} else if (window.location.pathname === '/accueil') {
  ReactDOM.render(
    <Accueil url='/accueil' />,
    document.getElementById('accueil')
  );
};


serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
