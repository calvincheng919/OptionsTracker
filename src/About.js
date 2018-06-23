import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Button, ListGroup, ListGroupItem, Nav, NavItem, NavLink } from 'reactstrap';


class About extends Component {
    render() {
        return (
            <Container>
            <hr />
                <h4>About</h4><br /><br />
My name is Calvin and this is my final project for the University of Washington's Continuing Education class on Javascript. Here is the <a href="https://github.com/calvincheng919/OptionsTracker" target="_blank"> GitHub repository</a>, as well as the initial project statement.


<br /><br />
This UW Contnuing Education ReactJS project is entirely based on a spreadsheet I've been using online for the past couple of years to keep track of my options trade performance. 
There is a distinct lack of tools out there to help the individual options trader, keep track of his trade performace. Here is a link to the original 
<a href="http://www.twoinvesting.com/2016/10/options-tracker-spreadsheet/" target="_blank"> site</a> and 
<a href="https://docs.google.com/spreadsheets/d/1SeDTO8a4RTgJyGXC8MrRnKNrEJrRFuugwRYReA8L97s/edit#gid=1662549766" target="_blank"> Google Sheet</a>.



            </Container>
        );
    }
}

export default About;