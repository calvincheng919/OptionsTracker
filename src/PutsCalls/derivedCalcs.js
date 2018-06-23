import React, { Component } from 'react';
import moment from 'moment';

const currDate = moment();


class DTE extends Component {

    render() {
     
        const expDate = moment(this.props.exp);
        const duration = moment.duration(expDate.diff(currDate));
        const days = () => {
            if (Math.floor(duration.asDays()) < 0) {
                return "-"
            } else {
                return Math.floor(duration.asDays());
            }
        }    
        return <p>{days()}</p>
    }
}

class Status extends Component {

    render(){

        const expDate = moment(this.props.exp);
        const status = () => {
            if (this.props.close != '' || currDate > expDate) {
                return 'Closed';
            } else if (moment.duration(expDate.diff(currDate)).asDays() < 0) {
                return 'Expired';
            } else {return 'Open'}
        }
        return <p>{status()}</p>
    }
}

class Reserve extends Component {

    render() {
        const type = this.props.type;
        const transtype = this.props.transtype;
        const strike = this.props.strike;
        const contracts = this.props.contracts;
        
        const reserve = () => {
            if( type.toUpperCase() == 'PUT' && transtype.toUpperCase() == 'SELL' ) {
                return strike*contracts*100;
            }
        }
        return <p>{reserve()}</p>
    }

}

class ProfitLoss extends Component {
    render() {
        const type = this.props.type;
        const contracts = this.props.contracts;
        const premium = this.props.premium;
        const exit = this.props.exit;
        const fees = this.props.fees;
        const transtype = this.props.transtype;
        const profitloss = () => {
            if (transtype.toUpperCase() == 'SELL') {
                return 100*contracts*(premium-exit)-fees; 
            } else {
                return 100*contracts*(exit-premium)-fees;
            }
        }   
        return <p>{profitloss()}</p>
    }

}

class DaysHeld extends Component {

    render() {
        const open = moment(this.props.open);
        const expDate = moment(this.props.exp);
        const close = (this.props.close ? moment(this.props.close) : 'NotClosed');
        const daysheld = () => {

            if (close == 'NotClosed') {
                return Math.floor(moment.duration(expDate.diff(open)).asDays())
            } else { return (moment.duration(close.diff(open)).asDays())}
    
        }
        return <p>{daysheld()}</p>
    }
}

class AnnualizedROR extends Component {

    render() {
        const type = this.props.type;
        const contracts = this.props.contracts;
        const strike = this.props.strike;
        const premium = this.props.premium;
        const exit = this.props.exit;
        const fees = this.props.fees;
        const transtype = this.props.transtype;
        const open = moment(this.props.open);
        const expDate = moment(this.props.exp);
        const close = (this.props.close ? moment(this.props.close) : 'NotClosed');
        const profitloss = () => {
            if (transtype.toUpperCase() == 'SELL') {
                return 100*contracts*(premium-exit)-fees; 
            } else {
                return 100*contracts*(exit-premium)-fees;
            }
        }  
        const daysheld = () => {

            if (close == 'NotClosed') {
                return Math.floor(moment.duration(expDate.diff(open)).asDays())
            } else { return (moment.duration(close.diff(open)).asDays())}
    
        }
        const reserve = () => {
            if( type.toUpperCase() == 'PUT' && transtype.toUpperCase() == 'SELL' ) {
                return strike*contracts*100;
            }
        }
        const annualizedror = () => {
            if (type.toUpperCase() == 'PUT' && transtype.toUpperCase() == 'SELL') {
                return ((profitloss()/reserve())/daysheld()*365*100).toFixed(1)+"%";
            } else if (type.toUpperCase() == 'CALL' && transtype.toUpperCase() == 'SELL') {
                return ((profitloss()/(100*contracts*strike))/daysheld()*365*100).toFixed(1)+"%";
            } else { return (profitloss()/(premium*contracts*100)/daysheld()*365*100).toFixed(1)+"%"}
        }
        return <p>{annualizedror()}</p>
    } 
    
}

class Breakeven extends Component {
    
    render() {
        const type = this.props.type;
        const strike = this.props.strike;
        const premium = this.props.premium;
        //console.log('BE Props', this.props);

        const result = () => {
            if (type.toUpperCase() == 'PUT') {
                return (strike-premium);
            }else { return (strike+premium) }
        }
        return <p>{result()}</p>;
    }
}



export  { DTE, Status, Reserve, ProfitLoss, DaysHeld, AnnualizedROR, Breakeven };

