import React from 'react';
import '../CreateAccount/CreateAccount.css'
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../../firebase.config'
import { useState } from 'react';
import { useContext } from 'react';
import { UserContext } from '../../App'
import { useHistory, useLocation } from 'react-router';

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app();
}

const CreateAccount = () => {
    const [newUser, setNewUser] = useState(false);
    const [user, setUser] = useState({
        signIn: false,
        newUser: false,
        name: '',
        email: '',
        password: '',
        photo: '',
        error: '',
        success: false
    });

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    console.log(loggedInUser);
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };


    const googleProvider = new firebase.auth.GoogleAuthProvider();
    const fbProvider = new firebase.auth.FacebookAuthProvider();
    const gitProvider = new firebase.auth.FacebookAuthProvider();
    const signInHandler = () => {
        firebase.auth().signInWithPopup(googleProvider)
            .then(res => {
                const { displayName, photoURL, email } = res.user;
                const signedInUser = {
                    signIn: true,
                    name: displayName,
                    email: photoURL,
                    photo: email
                }
                setUser(signedInUser);
            })
            .catch(error => { })
    }

    const fbSignInHandler = () => {
        firebase
            .auth()
            .signInWithPopup(fbProvider)
            .then((result) => {
                /** @type {firebase.auth.OAuthCredential} */
                let credential = result.credential;
                let user = result.user;
                console.log(user);
                let accessToken = credential.accessToken;
                console.log(accessToken);
            })
            .catch((error) => {
                let errorCode = error.code;
                console.log(errorCode);
                let errorMessage = error.message;
                console.log(errorMessage);
                let email = error.email;
                console.log(email);
                let credential = error.credential;
                console.log(credential);
            });
    }

    const signOutHandler = () => {
        firebase.auth().signOut()
            .then(res => {
                const signedOutUser = {
                    signIn: false,
                    name: '',
                    email: '',
                    photo: ''
                }
                setUser(signedOutUser);
            })
            .catch(error => { })
    }

    const submitHandler = (event) => {
        if (newUser && user.email && user.password) {
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then((userCredential) => {
                    let user = userCredential.user;
                    const newUserInfo = { ...user };
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    setUser(newUserInfo);
                    setLoggedInUser(newUserInfo);
                    updateInfo(user.name);
                })
                .catch(error => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo);
                });
        }

        if (!newUser && user.email && user.password) {
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then((userCredential) => {
                    let user = userCredential.user;
                    const newUserInfo = { ...user };
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    setUser(newUserInfo);
                    history.replace(from);
                })
                .catch((error) => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo);
                });
        }
        event.preventDefault();
    }


    const blurHandler = (event) => {
        let isFieldValid = true;
        if (event.target.name === "email") {
            isFieldValid = /\S+@\S+\.\S+/.test(event.target.value);
        }
        if (event.target.value === "password") {
            const isPasswordValid = event.target.value.length > 6;
            const numInPassword = /\d{1}/.test(event.target.value);
            isFieldValid = isPasswordValid && numInPassword
        }
        if (isFieldValid) {
            const newUserInfo = { ...user };
            newUserInfo[event.target.name] = event.target.value;
            setUser(newUserInfo);
        }
    }

    const updateInfo = name => {
        user.updateProfile({
            displayName: name,
            photoURL: "https://example.com/jane-q-user/profile.jpg"
        }).then(function () {
        }).catch(function (error) {
        });
    }

    const githubSignInHandler = () => {
        firebase
            .auth()
            .signInWithPopup(gitProvider)
            .then((result) => {
                /** @type {firebase.auth.OAuthCredential} */
                var credential = result.credential;
                var token = credential.accessToken;
                console.log(token);
                var user = result.user;
                setUser(user);
            }).catch((error) => {
                var errorCode = error.code;
                console.log(errorCode);
                var errorMessage = error.message;
                console.log(errorMessage);
                var email = error.email;
                console.log(email);
                var credential = error.credential;
                console.log(credential);
            });
    }

    return (
        <div className="authentication-div container-fluid">
            <h1>Login</h1>
            <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id="" />
            <label htmlFor="newUser">New User Sign Up</label>
            <form onSubmit={submitHandler}>
                {newUser && <input type="text" name="name" onBlur={blurHandler} placeholder="Name" required />}<br></br>
                <input type="text" name="email" onBlur={blurHandler} placeholder="Email" required /><br />
                <input type="password" name="password" onBlur={blurHandler} placeholder="Password" required /><br />
                <input type="submit" value={newUser ? 'Sign up' : 'Login'} />
            </form>
            <h4 className="mt-5" style={{ color: 'red' }}>{user.error}</h4>
            {user.success && <h4 className="mt-5" style={{ color: 'green' }}>User {newUser ? 'created' : 'Logged in'} successfully!</h4>}
            <h3 className="mb-3">Name: {user.name}</h3>

            {
                user.signIn ? <button className="btn btn-primary sign-btn" onClick={signOutHandler}>Sign out</button> :
                    <button className="btn btn-primary sign-btn" onClick={signInHandler}>Sign in using Google</button>
            }
            <br />
            <button onClick={fbSignInHandler} className="sign-btn">Sign in using Facebook</button>
            <button onClick={githubSignInHandler} className="sign-btn">Sign in using Github</button>
            {
                user.signIn && <div>
                    <p>Greetings, {user.name}</p>
                    <p>Email Address: {user.name}</p>
                    <img src={user.photo} alt="" />
                </div>
            }
        </div>
    );
};

export default CreateAccount;