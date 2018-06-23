import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Button, ListGroup, ListGroupItem, Nav, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';


class Home extends Component {
    render() {
        return (
            <Container>
<hr />
        <p  className="d-flex justify-content-left"><h4>Home</h4></p>
        <Nav vertical >
          <NavItem className="d-flex justify-content-left">
            <NavLink><Link to="/newtrade">On Options - The Options Performance Tracker</Link></NavLink>
          </NavItem> 
          <NavItem className="d-flex justify-content-left">
            <NavLink href="#">On Personal Finance - How to get out of debt</NavLink>
          </NavItem>
          <NavItem className="d-flex justify-content-left">
            <NavLink href="#">On Investing - How to start investing</NavLink>
          </NavItem>
          <NavItem className="d-flex justify-content-left">
            <NavLink href="#">On Life - How to visit 16 breweries in one day and still remain standing</NavLink>
          </NavItem>
          <NavItem className="d-flex justify-content-left">
            <NavLink href="https://www.youtube.com/watch?v=YNMIWdOykps" target="_blank">On Drone Racing - Love this crap!</NavLink>
          </NavItem>
        </Nav>

            </Container>
        );
    }
}

export default Home;