import React, { Component } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container,
    Row,
    Col,
    Button,
    InputGroup, 
    InputGroupAddon, 
    InputGroupText, 
    Input
  } from 'reactstrap';

import firebase from 'firebase';

import 'react-datepicker/dist/react-datepicker.css';
import Stockquote from './Stockquote';

const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const database = firebase.database();

class NewTrade extends Component {
    constructor(props) {
        super(props);
        this.state = {
            symbol: '',
            open: '',
            expiration: '',
            type: '',
            transtype: '',
            strike: '',
            premium: '',
            contracts: '',
            fees: '',
            exit: '',
            close: '',
            entryInput: '',
            tradeEntries: {}
        }
        
    }

    componentDidMount() {
        if (!auth.currentUser) {
            alert('You must be logged in to view options performance');
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

    onInputChange = (e) => {
        e.preventDefault();
        const newValue = e.target.value;

        const targetElement = e.target.id;
        this.setState(() => {
            return {
                
                entryInput: newValue, 
                [targetElement]: newValue
                
            }
        })
        console.log('symbol', this.state.symbol);

    }

    addEntry = (e) => {
        e.preventDefault();

        const data={
            symbol: this.state.symbol,
            open: this.state.open,
            expiration: this.state.expiration,
            type: this.state.type,
            transtype: this.state.transtype,
            strike: this.state.strike,
            premium: this.state.premium,
            contracts: this.state.contracts,
            fees: this.state.fees,
            exit: this.state.exit,
            close: this.state.close
            }    
        database.ref(`users/${auth.currentUser.uid}`)
          .push(data);

        //console.log('You Clicked ', e.target);
        //console.log('state', this.state);
        this.setState(() => {
            return {
                
                entryInput: '',
                symbol: '',
                open: '',
                expiration: '',
                type: '',
                transtype: '',
                strike: '',
                premium: '',
                contracts: '',
                fees: '',
                exit: '',
                close: ''
                
            };
        })
    }

    getQuote = (e) => {
        e.preventDefault();
        console.log(this);
        this.setState(() => {
            return {

                symbol: this.state.symbol

            };
        })
        
    }

    render () {
        //console.log('from firebase', Object.keys(this.state.journalEntries));
        return (
            <Container>
            <hr />    
            <form onSubmit={this.addEntry}>
            <h4>New Trade</h4><br />
                <Row>
                <Col>            
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">Stock Symbol:</InputGroupAddon>
                        <Input className="text-uppercase" id="symbol" placeholder="ABCD" onChange={this.onInputChange} value={this.state.symbol}/>
                    </InputGroup>
                </Col>
                <Col><Col sm="1"></Col></Col>
                <Col >

                    <Stockquote symbol={this.state.symbol} />

                </Col>
                </Row>
                <br /><br />
                <Row>
                <Col sm={{ size: 'auto', offset: 1 }}>                    
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">Open Date</InputGroupAddon>
                        <Input type= "date" id="open" placeholder="Date" onChange={this.onInputChange} value={this.state.open}/>
                        
                    </InputGroup> </Col>
                <Col> </Col>
                <Col> </Col>
                </Row>
                <br />
                <Row>
                <Col sm={{ size: 'auto', offset: 1 }}>
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">Option Expiration Date</InputGroupAddon>
                        <Input  type= "date" id="expiration" placeholder="Date" onChange={this.onInputChange} value={this.state.expiration}/>
                    </InputGroup>
                </Col>
                <Col> </Col>
                <Col> </Col>
                </Row>
                <br />
                <Row>
                <Col sm={{ size: 'auto', offset: 1 }}>
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">Option Type</InputGroupAddon>
                        <Input className="text-uppercase" id="type" placeholder="CALL or PUT" onChange={this.onInputChange} value={this.state.type} />
                    </InputGroup>
                </Col>
                <Col> </Col>
                <Col> </Col>
                </Row>
                <br />
                <Row>
                <Col sm={{ size: 'auto', offset: 1 }}>
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">Transaction Type</InputGroupAddon>
                        <Input id="transtype" placeholder="Buy or Sell" onChange={this.onInputChange} value={this.state.transtype}/>
                    </InputGroup>
                </Col>
                <Col> </Col>
                <Col> </Col>
                </Row>
                <br />
                <Row>
                <Col sm={{ size: 'auto', offset: 1 }}>
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">Option Strike Price</InputGroupAddon>
                        <Input id="strike" placeholder="$$$.$$" onChange={this.onInputChange} value={this.state.strike}/>
                    </InputGroup>
                </Col>
                <Col> </Col>
                <Col> </Col>
                </Row>
                <br />
                <Row>
                <Col sm={{ size: 'auto', offset: 1 }}>
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">Option Premium</InputGroupAddon>
                        <Input id="premium" placeholder="$$$.$$" onChange={this.onInputChange} value={this.state.premium}/>
                    </InputGroup>
                </Col>
                <Col> </Col>
                <Col> </Col>
                </Row>
                <br />
                <Row>
                <Col sm={{ size: 'auto', offset: 1 }}>
                    <InputGroup>
                        <InputGroupAddon addonType="prepend"># of Contracts</InputGroupAddon>
                        <Input id="contracts" placeholder="1 or more" onChange={this.onInputChange} value={this.state.contracts}/>
                    </InputGroup>
                </Col>
                <Col> </Col>
                <Col> </Col>
                </Row>
                <br />
                <Row>
                <Col sm={{ size: 'auto', offset: 1 }}>
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">Fees</InputGroupAddon>
                        <Input id="fees" placeholder="Comm + per contract" onChange={this.onInputChange} value={this.state.fees}/>
                    </InputGroup>
                </Col>
                <Col> </Col>
                <Col> </Col>
                </Row>
                <br />
                <Row>
                <Col sm={{ size: 'auto', offset: 1 }}>
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">Exit Price</InputGroupAddon>
                        <Input id="exit" placeholder="$$$.$$" onChange={this.onInputChange} value={this.state.exit}/>
                    </InputGroup>
                </Col>
                <Col> </Col>
                <Col> </Col>
                </Row>
                <br />
                <Row>
                <Col sm={{ size: 'auto', offset: 1 }}>
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">Close Date</InputGroupAddon>
                        <Input  type= "date" id="close" placeholder="Date" onChange={this.onInputChange} value={this.state.close}/>
                    </InputGroup>
                </Col>
                <Col> </Col>
                <Col><Button color="primary" type="submit">Save</Button>{' '}</Col>
                </Row>
            </form>
            </Container>
        );
       
    }
    
}

export default NewTrade;