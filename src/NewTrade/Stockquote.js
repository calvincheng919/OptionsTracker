import React, { Component } from 'react';
import moment from 'moment';

class Stockquote extends Component {
    constructor(props) {
        super(props);
        this.state = {
            symbol: "",
            quote: ""
        }
    }

    // componentDidMount() {
    //      const symbol = this.props.symbol;
    //     // console.log(symbol);
    //     //const symbol = "MSFT";
    //     fetch(`https://www.alphavantage.co/query?function=BATCH_STOCK_QUOTES&symbols=${symbol}&apikey=${process.env.REACT_APP_ALPHA_API_KEY}`)
    //         .then(response => response.json())
    //         .then(data => {
                
                
    //             const quote = parseFloat(data["Stock Quotes"][0]["2. price"]).toFixed ;
    //             console.log('quote', quote );
    //             this.setState((prevState, props) => {
    //                 return {
    //                     quote: quote
    //                 }
    //             })
    //         })
    //         .catch(error => console.log(error));
    // }

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

    // static getDerivedStateFromProps(props, state) {
    //     console.log('state.symbol', state.symbol);
    //     console.log('props.symbol', props.symbol);

    //     if (state.symbol != props.symbol ) {
            
    //         return {
    //             symbol: props.symbol
                
    //         };
    //         const symbol = this.props.symbol;
    //         console.log('state.symbol after chagne',state.symbol);
    //         console.log('if executed');
    //        //const symbol = "MSFT";
    //        fetch(`https://www.alphavantage.co/query?function=BATCH_STOCK_QUOTES&symbols=${symbol}&apikey=${process.env.REACT_APP_ALPHA_API_KEY}`)
    //            .then(response => response.json())
    //            .then(data => {
                   
                   
    //                const quote = data["Stock Quotes"][0]["2. price"];
    //                console.log('quote', quote );
    //                this.setState((prevState, props) => {
    //                    return {
    //                        quote: quote
    //                    }
    //                })
    //            })
    //            .catch(error => console.log(error));



    //     }
    //     return null;
    // }

    render() {
        return <p>{this.state.quote} </p>
    }

}

export default Stockquote;


