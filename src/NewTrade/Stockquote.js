import React, { Component } from 'react';

class Stockquote extends Component {
    constructor(props) {
        super(props);
        this.state = {
            symbol: "",
            quote: ""
        }
    }

    componentDidMount() {
        const symbol = this.props.symbol;
        console.log('symbol',symbol);
       //const symbol = "MSFT";
       fetch(`https://www.alphavantage.co/query?function=BATCH_STOCK_QUOTES&symbols=${symbol}&apikey=${process.env.REACT_APP_ALPHA_API_KEY}`)
           .then(response => response.json())
           .then(data => {
               
               
               const quote = parseFloat(data["Stock Quotes"][0]["2. price"]).toFixed() ;
               console.log('quote', quote );
               this.setState((prevState, props) => {
                   return {
                       quote: quote
                   }
               })
           })
           
           .catch(error => console.log(error));

   }


    render() {
        return <p>{this.state.quote} </p>
    }

}

export default Stockquote;


