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
    Input,
    TabContent,
    TabPane
} from 'reactstrap';
  import firebase from 'firebase';
  import { DTE, Status, Reserve, ProfitLoss, DaysHeld, AnnualizedROR, Breakeven } from './PutsCalls/derivedCalcs';
  import moment from 'moment';

  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();
  const database = firebase.database();

class Edit extends Component {
    
    constructor(props) {
        //console.log('constructor');
        super(props);
        //console.log('state at constructor call', this.state);
        //console.log('props at constructor call', this.props);
        
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
            toggle: ''

        }
    }

    static getDerivedStateFromProps(props, state) {
        if (!state.symbol) {
            return {
                symbol: props.entry.symbol,
                open: props.entry.open,
                expiration: props.entry.expiration,
                type: props.entry.type,
                transtype: props.entry.transtype,
                strike: props.entry.strike,
                premium: props.entry.premium,
                contracts: props.entry.contracts,
                fees: props.entry.fees,
                exit: props.entry.exit,
                close: props.entry.close
            };
        }
        return null;
    }

    onInputChange = (e) => {
        e.preventDefault();

        const newValue = e.target.value;
        const targetElement = e.target.id;
        console.log('targetElement', targetElement);
        console.log('state', this.state.symbol);
        this.setState(() => {
            return {
                [targetElement]: newValue
            }
        })

    }

    submitDB = (e) => {
        
        e.preventDefault();
        //console.log('props data to be pushed to state at click', this.props);
        //console.log('this.state', this.state);
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

        //console.log('data for db update', data);
        
        database.ref(`users/${auth.currentUser.uid}/${this.props.editTrans.key}`)
          .set(data);

        //console.log('You Clicked ', e.target);
        //console.log('state', this.state);

        this.setState((prevState, props) => ({
                            
            toggle: true
        
        }))

    }

    deleteDB = (e) => {
        
        e.preventDefault();
        //console.log('props data to be pushed to state at click', this.props);
        //console.log('this.state', this.state);
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

        //console.log('data for db update', data);
        
        database.ref(`users/${auth.currentUser.uid}/${this.props.editTrans.key}`)
          .set(null);

        //console.log('You Clicked ', e.target);
        //console.log('state', this.state);

        this.setState((prevState, props) => ({
               
            toggle: true
        
        }))

    }
    render() {
        const inputStyle = {padding:"0px 0px", margin: "0px 0px 0px 0px", fontSize: "small"};
        const inputFont = {fontSize: "small", padding:"3px 0px 3px 15px" , backgroundColor: this.state.bgColor};
        
        //console.log('state at render', this.state);
        //console.log('props at render',this.props);

        return (
            <Container >
            
            <Row className="small" style={{height:40}}>
                <Col sm="1" style={inputStyle}><Input id="symbol" onChange={this.onInputChange} style={inputFont} className="small" disabled={this.props.editTrans.toggle} value={this.state.symbol}/></Col>
                <Col sm="1" style={inputStyle}><Input id="open" onChange={this.onInputChange} style={inputFont} className="small" disabled={this.props.editTrans.toggle} value={this.state.open}/></Col>
                <Col sm="1" style={inputStyle}><Input id="expiration" onChange={this.onInputChange} style={inputFont} className="small" disabled={this.props.editTrans.toggle} value={this.state.expiration}/></Col>
                <Col sm="1" style={inputStyle}><Input id="type" onChange={this.onInputChange} style={inputFont} className="small" disabled={this.props.editTrans.toggle} value={this.state.type}/></Col>
                <Col sm="1" style={inputStyle}><Input id="transtype" onChange={this.onInputChange} style={inputFont} className="small" disabled={this.props.editTrans.toggle} value={this.state.transtype}/></Col>
                <Col sm="1" style={inputStyle}><Input id="strike" onChange={this.onInputChange} style={inputFont} className="small" disabled={this.props.editTrans.toggle} value={this.state.strike}/></Col>
                <Col sm="1" style={inputStyle}><Input id="premium" onChange={this.onInputChange} style={inputFont} className="small" disabled={this.props.editTrans.toggle} value={this.state.premium}/></Col>
                <Col sm="1" style={inputStyle}><Input id="contracts" onChange={this.onInputChange} style={inputFont} className="small" disabled={this.props.editTrans.toggle} value={this.state.contracts}/></Col>
                <Col sm="1" style={inputStyle}><Input id="fees" onChange={this.onInputChange} style={inputFont} className="small" disabled={this.props.editTrans.toggle} value={this.state.fees}/></Col>
                <Col sm="1" style={inputStyle}></Col>
                <Col sm="1" style={inputFont}></Col>
                <Col sm="1" style={inputFont}></Col>
                                    
            </Row>

                <Row>
                <Col></Col>
                <Col></Col>
                <Col></Col>
                <Col></Col>    
                <Col sm="1"><Button onClick={this.submitDB} color="primary" disabled={this.props.editTrans.toggle}>Submit</Button></Col>
                <Col sm="1"><Button onClick={this.deleteDB} color="primary" disabled={this.props.editTrans.toggle}>Delete</Button></Col>
                </Row>

            </Container>
        ) 
    }
}

class Edit2 extends Component {
    
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
            toggle: ''
           
        }
    }

    static getDerivedStateFromProps(props, state) {
        if (!state.symbol) {
            return {
                symbol: props.entry.symbol,
                open: props.entry.open,
                expiration: props.entry.expiration,
                type: props.entry.type,
                transtype: props.entry.transtype,
                strike: props.entry.strike,
                premium: props.entry.premium,
                contracts: props.entry.contracts,
                fees: props.entry.fees,
                exit: props.entry.exit,
                close: props.entry.close
            };
        }
        return null;
    }

    onInputChange = (e) => {
        e.preventDefault();

        const newValue = e.target.value;
        const targetElement = e.target.id;
        console.log('targetElement', targetElement);
        console.log('state', this.state.symbol);
        this.setState(() => {
            return {
                [targetElement]: newValue
            }
        })

    }

    submitDB = (e) => {
        
        e.preventDefault();
        //console.log('props data to be pushed to state at click', this.props);
        //console.log('this.state', this.state);
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

        //console.log('data for db update', data);
        
        database.ref(`users/${auth.currentUser.uid}/${this.props.editTrans.key}`)
          .set(data);

        //console.log('You Clicked ', e.target);
        //console.log('state', this.state);

        this.setState((prevState, props) => ({
                            
            toggle: true
        
        }))

    }

    deleteDB = (e) => {
        
        e.preventDefault();
        //console.log('props data to be pushed to state at click', this.props);
        //console.log('this.state', this.state);
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

        //console.log('data for db update', data);
        
        database.ref(`users/${auth.currentUser.uid}/${this.props.editTrans.key}`)
          .set(null);

        //console.log('You Clicked ', e.target);
        //console.log('state', this.state);

        this.setState((prevState, props) => ({
               
            toggle: true
        
        }))

    }
    render() {
        const inputStyle = {padding:"0px 0px", margin: "0px 0px 0px 0px", fontSize: "small"};
        const inputFont = {fontSize: "small", padding:"3px 0px 3px 15px"};
        //console.log('entry',this.props);
        
        return (
            <Container >
            
            <Row className="small" style={{height:40}}>
                <Col sm="1" style={inputStyle}><Input id="symbol" onChange={this.onInputChange} style={inputFont} className="small" disabled={this.props.editTrans.toggle} value={this.state.symbol}/></Col>
                <Col sm="1" style={inputStyle}></Col>
                <Col sm="1" style={inputStyle}><Input id="expiration" onChange={this.onInputChange} style={inputFont} className="small" disabled={this.props.editTrans.toggle} value={this.state.expiration}/></Col>
                <Col sm="1" style={inputStyle}><Input id="type" onChange={this.onInputChange} style={inputFont} className="small" disabled={this.props.editTrans.toggle} value={this.state.type}/></Col>
                <Col sm="1" style={inputStyle}><Input id="transtype" onChange={this.onInputChange} style={inputFont} className="small" disabled={this.props.editTrans.toggle} value={this.state.transtype}/></Col>
                <Col sm="1" style={inputStyle}></Col>
                <Col sm="1" style={inputStyle}><Input id="exit" onChange={this.onInputChange} style={inputFont} className="small" disabled={this.props.editTrans.toggle} value={this.state.exit}/></Col>
                <Col sm="1" style={inputStyle}><Input id="close" onChange={this.onInputChange} style={inputFont} className="small" disabled={this.props.editTrans.toggle} value={this.state.close}/></Col>
                <Col sm="1" style={inputStyle}></Col>
                <Col sm="1" style={inputStyle}></Col>
                <Col sm="1" style={inputFont}></Col>
                <Col sm="1" style={inputFont}></Col>
                                    
            </Row>
            
            <Row>
                <Col></Col>
                <Col></Col>
                <Col></Col>
                <Col></Col>    
                <Col sm="1"><Button onClick={this.submitDB} color="primary" disabled={this.props.editTrans.toggle}>Submit</Button></Col>
                <Col sm="1"><Button onClick={this.deleteDB} color="primary" disabled={this.props.editTrans.toggle}>Delete</Button></Col>
                </Row>
            </Container>
        ) 
    }
}

export { Edit as Edit1, Edit2 } ;