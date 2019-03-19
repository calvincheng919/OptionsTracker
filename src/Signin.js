import React, { Component } from 'react';
import firebase from 'firebase';

const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

class Signin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false
        }
    }

    componentDidMount() {
        auth.onAuthStateChanged((user) => {
            this.setState(() => {
                return {
                    isLoggedIn: user ? true : false
                };
            });
        })
    }

    signIn = () => {


        auth.setPersistence(firebase.auth.Auth.Persistence.SESSION)
        // .then(function() {
        //     // Existing and future Auth states are now persisted in the current
        //     // session only. Closing the window would clear any existing state even
        //     // if a user forgets to sign out.
        //     // ...
        //     // New sign-in will be persisted with session persistence.
        //     return auth.signInWithPopup(provider);
        // })
        // .catch(function(error) {
        //     // Handle Errors here.
        //     var errorCode = error.code;
        //     var errorMessage = error.message;
        // });

        auth.signInWithPopup(provider)
        .catch((error) => {
            alert(error.message);
        });
    }

    signOut = () => {
        auth.signOut();
    }

    render() {
        return (
            <ul>
                {!this.state.isLoggedIn && <li><a href="#signin" onClick={this.signIn}>Sign In</a></li>}
                {this.state.isLoggedIn && <li><a href="#signout" onClick={this.signOut}>Sign Out</a></li>}
            </ul>
        );
    }
}

export default Signin;