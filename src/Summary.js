import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Button, ListGroup, ListGroupItem, Nav, NavItem, NavLink } from 'reactstrap';
import Overallperf from './Performance/Overallperf';
import firebase from 'firebase';

const auth = firebase.auth(); //instantiate a firebase auth object instance
//const provider = new firebase.auth.GoogleAuthProvider(); //this auth provider can be Google, email/pw, FB, GitHub, etc...
const database = firebase.database();

class Summary extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tradeEntries: {}
        }
    }

    componentDidMount() {
        //console.log("current user" + auth.currentUser);
        if (!auth.currentUser) {
            alert('You must be logged in to view overall performance');
            return this.props.history.push('/');
        }
  
        auth.onAuthStateChanged((user) => {
          
            if (!user) {
                this.props.history.push('/');
            }
        });
  
        database.ref(`users/${auth.currentUser.uid}`)
        .on('value', (snapshot) => {
            this.setState(() => {
                return {
                    tradeEntries: snapshot.val() || {}
                };
            });
        })
        
  
    }
    
    render() {
        // console.log("Summary Component")
        // console.log(this.state.tradeEntries);
        return (
            <Container>
            <hr />
            <h4>Performance Summary</h4>
            <br />
                <Overallperf tradeEntries={this.state.tradeEntries}/>
            </Container>
        );
    }
}

export default Summary;