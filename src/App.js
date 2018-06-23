import React, { Component } from 'react';
import logo from './logo.svg';
//import './App.css';
import Home from './Home';
import Example from './codesamples/Example';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

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
  Jumbotron,
  Button
} from 'reactstrap';

import NewTrade from './NewTrade/NewTrade';
import PutsCalls from './PutsCalls/PutsCalls';
import Summary from './Summary';
import Glossary from './Glossary';
import About from './About';
import Signin from './Signin';


class App extends Component {
  render() {
    return (
      <Router>
      <div>
      <Container >
      <br />
      <p><h3 className="d-flex justify-content-center">Final Project</h3></p>
      <Nav className="d-flex justify-content-center">
        <NavItem>
          <NavLink><Link to="/">Home</Link></NavLink>
        </NavItem>
        <NavItem>
          <NavLink><Link to="/newtrade">New Trade</Link></NavLink>
        </NavItem>
        <NavItem>
          <NavLink><Link to="/putscalls">Puts/Calls</Link></NavLink>
        </NavItem>
        <NavItem>
          <NavLink><Link to="/summary">Summary</Link></NavLink>
        </NavItem>
        <NavItem>
          <NavLink><Link to="/glossary">Glossary</Link></NavLink>
        </NavItem>
        <NavItem>
          <NavLink><Link to="/about">About</Link></NavLink>
        </NavItem>
        <NavItem>
          <NavLink> <Signin /></NavLink>
        </NavItem>
      </Nav>
      
      
      </Container >
      <Route exact path="/" component={Home} />
      <Route path="/newtrade" component={NewTrade} />
      <Route path="/putscalls" component={PutsCalls} />
      <Route path="/summary" component={Summary} />
      <Route path="/glossary" component={Glossary} />
      <Route path="/about" component={About} />
      </div>

      </Router>
    );
  }
}

export default App;

