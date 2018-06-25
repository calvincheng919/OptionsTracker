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
import classnames from 'classnames';
import firebase from 'firebase';
import moment from 'moment';
import { DTE, Status, Reserve, ProfitLoss, DaysHeld, AnnualizedROR, Breakeven } from './derivedCalcs';
import {Edit1, Edit2} from '../Edit';
import Stockquote from '../NewTrade/Stockquote';


const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const database = firebase.database();

class PutsCalls extends Component {

    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            tradeEntries: {},
            activeTab: '1',
            editTrans: {toggle: true, key: '', bgColor:"text-left small"},
            entry: {}
        }
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
          this.setState({
            activeTab: tab
          });
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

    onCellClick = (key) => {
        //console.log(key);
        //console.log('transaction',this.state.tradeEntries[key]);
        
                
        this.setState( () => {
            return {
                editTrans: {toggle: false, key: key, bgColor: "text-left small bg-secondary text-white"},
                entry: this.state.tradeEntries[key]
            }
        })
        
    }


    render() {
        //console.log('from FB', this.state.tradeEntries);
        return (
        
            <div>
            <Container>
            <Nav tabs>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '1' })}
                  onClick={() => { this.toggle('1'); }}
                >
                  Trade Entries
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '2' })}
                  onClick={() => { this.toggle('2'); }}
                >
                  Stats and Performance
                </NavLink>
              </NavItem>
            </Nav>
            
            <TabContent activeTab={this.state.activeTab}>
              <TabPane tabId="1">
              <Container>
                
                <Row className="bg-light font-weight-bold small"  style={{height:60}}>
                    <Col sm="1" className="border">Stock Symbol</Col>
                    <Col sm="1" className="border">Open Date</Col>
                    <Col sm="1" className="border">Exp Date</Col>
                    <Col sm="1" className="border">Call or Put</Col>
                    <Col sm="1" className="border">B/S</Col>
                    <Col sm="1" className="border">Strike Price</Col>
                    <Col sm="1" className="border">Premium</Col>
                    <Col sm="1" className="border">C</Col>
                    <Col sm="1" className="border">Fees</Col>
                    <Col sm="1" className="border">Current Stock Price</Col>
                    <Col sm="1" className="border">Break Even Price</Col>
                    <Col sm="1" className="border">Status</Col>
                                        
                </Row>
                {
                    Object.keys(this.state.tradeEntries).map((key) => {
                        const entry = this.state.tradeEntries[key];
                        //console.log('key', key);
                        return (
                        <div  onClick={() => this.onCellClick(key)}>
                            <Row className="text-left small">
                            <Col sm="1" className="border" style={{backgroundColor:"#FCCA9E"}}>{entry.symbol}</Col>
                            <Col sm="1" className="border" style={{backgroundColor:"#FCCA9E"}}>{moment(entry.open).format("MM/DD/YY")}</Col>
                            <Col sm="1" className="border" style={{backgroundColor:"#FCCA9E"}}>{moment(entry.expiration).format("MM/DD/YY")}</Col>
                            <Col sm="1" className="border" style={{backgroundColor:"#FCCA9E"}}>{entry.type}</Col>
                            <Col sm="1" className="border" style={{backgroundColor:"#FCCA9E"}}>{entry.transtype}</Col>
                            <Col sm="1" className="border" style={{backgroundColor:"#FCCA9E"}}>{entry.strike}</Col>
                            <Col sm="1" className="border" style={{backgroundColor:"#FCCA9E"}}>{entry.premium}</Col>
                            <Col sm="1" className="border" style={{backgroundColor:"#FCCA9E"}}>{entry.contracts}</Col>
                            <Col sm="1" className="border" style={{backgroundColor:"#FCCA9E"}}>{entry.fees}</Col>
                            <Col sm="1" className="border" style={{backgroundColor:"#C6FFDA"}}><Stockquote symbol={entry.symbol}/></Col>
                            <Col sm="1" className="border" style={{backgroundColor:"#C6FFDA"}}><Breakeven type={entry.type} strike={entry.strike} premium={entry.premium}/></Col>
                            <Col sm="1" className="border" style={{backgroundColor:"#275021" , color: "white"}}><Status close= {entry.close} exp={entry.expiration}/></Col>
                        </Row>
                        </div>
                        )
                    })
                }
            </Container>
                <br />
                <Edit1 key={this.state.editTrans.key} editTrans={this.state.editTrans} entry={this.state.entry} />
                
              </TabPane>
              <TabPane tabId="2">
              <Container >
            
                <Row className="bg-light font-weight-bold small" style={{height:60}}>
                    <Col sm="1" className="border">Stock Symbol</Col>
                    <Col sm="1" className="border">DTE</Col>
                    <Col sm="1" className="border">Exp Date</Col>
                    <Col sm="1" className="border">Call or Put</Col>
                    <Col sm="1" className="border">B/S</Col>
                    <Col sm="1" className="border">(Put) Cash Res</Col>
                    <Col sm="1" className="border">Exit Price</Col>
                    <Col sm="1" className="border">Close Date</Col>
                    <Col sm="1" className="border">Profit / Loss</Col>
                    <Col sm="1" className="border">Days Held</Col>
                    <Col sm="1" className="border">Ann. ROR Options</Col>
                    <Col sm="1" className="border">Status</Col>
                                        
                </Row>
                {
                    
                    Object.keys(this.state.tradeEntries).map((key) => {
                        
                        const entry = this.state.tradeEntries[key];
                        return (
                        <div  onClick={() => this.onCellClick(key)}>
                        <Row className="text-left small">
                            <Col sm="1" className="border" style={{backgroundColor:"#FCCA9E"}}>{entry.symbol}</Col>
                            <Col sm="1" className="border" style={{backgroundColor:"#C6FFDA"}}><DTE exp={entry.expiration}/></Col>
                            <Col sm="1" className="border" style={{backgroundColor:"#FCCA9E"}}>{moment(entry.expiration).format('MM/DD/YY')}</Col>
                            <Col sm="1" className="border" style={{backgroundColor:"#FCCA9E"}}>{entry.type}</Col>
                            <Col sm="1" className="border" style={{backgroundColor:"#FCCA9E"}}>{entry.transtype}</Col>
                            <Col sm="1" className="border" style={{backgroundColor:"#C6FFDA"}}><Reserve strike={entry.strike} type={entry.type} transtype={entry.transtype} contracts={entry.contracts} /></Col>
                            <Col sm="1" className="border" style={{backgroundColor:"#FCCA9E"}}>{entry.exit}</Col>
                            <Col sm="1" className="border" style={{backgroundColor:"#FCCA9E"}}>{entry.close ? moment(entry.close).format('MM/DD/YY') : "-"}</Col>
                            <Col sm="1" className="border" style={{backgroundColor:"#275021", color: "white"}}><ProfitLoss transtype={entry.transtype} type={entry.type} contracts={entry.contracts} premium={entry.premium} exit={entry.exit} fees= {entry.fees}/></Col>
                            <Col sm="1" className="border" style={{backgroundColor:"#C6FFDA"}}><DaysHeld symbol={entry.symbol} open={entry.open} close={entry.close} exp={entry.expiration}/></Col>
                            <Col sm="1" className="border" style={{backgroundColor:"#C6FFDA"}}><AnnualizedROR type={entry.type} contracts={entry.contracts} strike={entry.strike} premium={entry.premium} exit={entry.exit} fees= {entry.fees}
                                transtype={entry.transtype} open={entry.open} exp={entry.expiration} close={entry.close}/></Col>
                            <Col sm="1" className="border" style={{backgroundColor:"#275021" , color: "white"}}><Status close= {entry.close} exp={entry.expiration}/></Col>
                        </Row>
                        </div>
                        )
                    })
                }
            </Container>
                <br />
                <Edit2 key={this.state.editTrans.key} editTrans={this.state.editTrans} entry={this.state.entry} />
              </TabPane>
            </TabContent>
            </Container>

          </div>



            
        );
    }
}



export default PutsCalls;