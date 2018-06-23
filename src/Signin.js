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