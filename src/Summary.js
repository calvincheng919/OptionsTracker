import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Button, ListGroup, ListGroupItem, Nav, NavItem, NavLink } from 'reactstrap';


class Summary extends Component {
    render() {
        return (
            <Container>
            <hr />
            <h4>Performance Summary</h4>
            <Row>
             <Col sm="4" className="border">Committed Capital</Col>
             <Col sm="4"  className="border">$150,000</Col>
            </Row>
            
            <Row>
             <Col sm="4"  className="border">(Put) Cash Reserve</Col>
             <Col sm="4"  className="border"></Col>
            </Row>
            
            <Row>
             <Col sm="4"  className="border">Cummulated Profit/Loss</Col>
             <Col sm="4"  className="border"></Col>
            </Row>
            <Row>
             <Col sm="4"  className="border">Performance against Committed Capital</Col>
             <Col sm="4"  className="border"></Col>
            </Row>
            <Row>
             <Col sm="4"  className="border">Performance against Cash Reserve</Col>
             <Col sm="4"  className="border"></Col>
            </Row>
            
            


            </Container>
        );
    }
}

export default Summary;