import { Link } from '@material-ui/core';
import React, { useState } from 'react';
import './Login.css'
import firebaseConfig from './firebase';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useHistory } from 'react-router-dom';


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const Login = () => {

    const history = useHistory();



    const [email, setEamil] = useState('');
    const [password, setPassword] = useState('');


    const signIn = e => {
        // some fancy firebase login shitttt....
        e.preventDefault();

        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then(auth => {
                history.push('/');
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });



    }

    const register = e => {
        //some fancy firebase register shittttt...
        e.preventDefault();

        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then((auth) => {
                // Signed in 
                console.log(auth);
                if (auth) {
                    history.push('/');
                }
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
            });


    }


    return (
        <div className="login">
            <Link to="/">
                <img className="login__logo" src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png' alt="" />
            </Link>

            <div className="login__container">
                <h1>Sign-in</h1>
                <form action="/">
                    <h5>Email</h5>
                    <input type="text" value={email} onChange={e => setEamil(e.target.value)} />

                    <h5>Password</h5>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} />

                    <button className="login__signInButton" onClick={signIn}>Sign In</button>
                </form>
                <p>
                    By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use & Sale. Please
                    see our Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice.
                </p>
                <button className="login__registerButton" onClick={register}>Create your Amazon Account</button>
            </div>
        </div>
    );
};

export default Login;