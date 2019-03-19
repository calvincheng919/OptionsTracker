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
    TabPane,
    Table
  } from 'reactstrap';

class Overallperf extends Component {
    constructor(props) {
        super(props);
        this.state = {
          commCapital: 150000,
          openPL: 4000,
          closedPL: 12000,
          putCashRes: 45000, 
          totalFees: 300, 
          perfCommCap: 0.45,
          perfCashRes: 0.5
        }
      
        this.handleOnchange = this.handleOnchange.bind(this);
        this.calcPutCashRes = this.calcPutCashRes.bind(this);
        this.calcTotalFees = this.calcTotalFees.bind(this);
    }


    componentDidMount(){

    }

    componentDidUpdate(){
      // console.log("component did update");
      //  console.log(this.props.tradeEntries);
      console.log("cash reserve " + this.calcPutCashRes(this.props.tradeEntries));
      console.log("total fees " + this.calcTotalFees(this.props.tradeEntries));
      console.log("PL function: " + this.calcOpenPL(this.props.tradeEntries));

    }

    handleOnchange(e){
      e.preventDefault();
      // console.log(e.target.value);
      this.setState({
          commCapital: e.target.value 
      });
    }

    calcPutCashRes(tradeEntries){
      if (Object.keys(tradeEntries).length !== 0 && tradeEntries.constructor === Object) { 
        console.log("render: ");
        console.log(tradeEntries);
          return Object.keys(tradeEntries).filter((key) => {
            const entry=tradeEntries[key];
            return entry.type.toUpperCase() ==='PUT';
          }).map((putTrades) => {
            const entry=tradeEntries[putTrades];
            return entry.strike*entry.contracts*100;
          }).reduce((sum, trade) => {
            return sum+trade;
          });
      }
    }
    
    calcTotalFees(tradeEntries){
      if (Object.keys(tradeEntries).length !== 0 && tradeEntries.constructor === Object){ 
          return Object.keys(tradeEntries).map((trades) => {
            const entry=tradeEntries[trades];
            return (entry.fees*1);
          }).reduce((sum,trade) => {
            return sum+trade;
          });
        }
    }

    calcOpenPL(tradeEntries){
      if (Object.keys(tradeEntries).length !== 0 && tradeEntries.constructor === Object) { 
            return Object.keys(tradeEntries).filter((key) => {
              const entry = tradeEntries[key];
              return entry.transtype.toUpperCase() ==='SELL';
            })
            .map((openTrades) => {
              const entry = tradeEntries[openTrades];
              return (100*entry.contracts*(entry.premium-entry.exit)-entry.fees); 
            }).reduce((sum,trade) => {
              return sum+trade;
            });
      }
      
    }

    calcClosedPL(tradeEntries){

    }




    render(){
      // console.log("render");
      // console.log(this.props.tradeEntries);
      // console.log("cash reserve: " + this.calcPutCashRes());
      // this.calcPutCashRes();

            return (
              <div className='wrapper'>

              <label>Committed Capital: </label>  <input className="text-uppercase" type="text" value={this.state.commCapital} onChange={this.handleOnchange} />
              <br /><br />

              <Table hover bordered className="bg-light font-weight-bold small">
                <thead>
                  <tr>
                    <th>Comm Cap</th>
                    <th>Open P/L</th>
                    <th>Closed P/L</th>
                    <th>(Put) Cash Res</th>
                    <th>Total Fees</th>
                    <th>Perf -> Comm Capital</th>
                    <th>Perf -> Cash Reserve</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                  </tr>
                  <tr>
                    <td>{this.state.commCapital}</td>
                    <td>{this.calcOpenPL(this.props.tradeEntries)}</td>
                    <td>{this.state.closedPL}</td>
                    <td>{this.calcPutCashRes(this.props.tradeEntries)}</td>
                    <td>{this.calcTotalFees(this.props.tradeEntries)}</td>
                    <td>{this.state.perfCommCap}</td>
                    <td>{this.state.perfCashRes}</td>
                  </tr>

                </tbody>
              </Table>
            </div>
            );
          
    }

}  

export default Overallperf;