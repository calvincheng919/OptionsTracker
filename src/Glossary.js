import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Button, ListGroup, ListGroupItem, Nav, NavItem, NavLink } from 'reactstrap';


class Glossary extends Component {
    render() {
        return (
            <Container>
            <hr />
                <h4>Glossary of Terms</h4><br />
<b>Stock Symbol</b><br />
The ticker symbol for the stock underlying the option contract. I use a Google Finance call to look up the stock price so you must use the ticker symbol as recognized by Google Finance.
<br /><br />
<b>Open Date</b><br />
Open Date is the date that the option contract was opened.
<br /><br />
<b>Exp Date</b><br />
Exp Date stands for expiration date and is the date that the contracted is scheduled to end. If you decide to close a contract early, then make sure to update the Close Date (see below).
<br /><br />
<b>Call or Put</b><br />
Type “Call” or “Put” here depending on what kind of contracted you opened.
<br /><br />
<b>B/S</b><br />
This stands for buy or sell and refers to how the option was first started. If you sell a put you are technically “selling to open.” Most people will likely just keep this as an S.
<br /><br />
<b>Stock Price DOC</b><br />
Enter the underlying stock price at the time you opened the contract. This field is used to calculate the annualized rate of return for a margin account and is used in the calculation for determining margin cash reserve.
<br /><br />
<b>DTE</b><br />
Days to expiration. This shows the days left on the option contract. If the option has already expired, then 0 will be displayed rather than a negative number.
<br /><br />
<b>Current Stock Price</b><br />
This field shows the current stock price of the underlying stock.
<br /><br />
<b>Break Even Price</b><br />
This field shows the break even price for the option exclusive of any fees. For example if I sold a put on a stock priced at $100 and received a premium of $1.50, my break even price is $98.50. If I sold a covered call on that same stock and received $1.00, my break even point would be $101.
<br /><br />
<b>Strike Price</b><br />
The strike price of the option.
<br /><br />
<b>Premium</b><br />
Premium is the money collected for selling a put or call. It is also what you pay if buying a put or call. Since contracts are transacted in increments of 100 shares, you’d enter the 2.38 into column if you received $238 in premium.
<br /><br />
<b>C</b><br />
C stands for contracts and indicates how many contracts you either sold or bought.
<br /><br />
<b>(Put) Cash Reserve</b><br />
This field show the amount of money needed on hand in order to sell the option. This will be 100 x the strike price. For a non-margin account, that total amount needs to be in the account before your broker will allow the trade to go through. This is why this is called a cash-secured put. That cash is ear marked for that option trade in case it gets put to you. If you sold a call, then this field is not used.
<br /><br />
<b>(Put) Margin Reserve</b><br />
This field calculates the amount of money needed in the account for a naked put sold in an account with margin. I used Schwab’s calculations for this which is (25% of the underlying stock’s market value + the option ask price – any out-of-the money amount) x 100 (per contract) x the number of contracts. If your broker has different requirements then this formula can be updated to reflect that.
<br /><br />
<b>(Call) Cost Basis/Share</b><br />
This field is for selling covered calls. It can be used to calculate the annualized rate of return (column U). However, this field is not currently used. The annualized rate of return is based solely on the option rate of return as calculated on the strike price. It does not take into account any gains or losses from selling the underlying stock. I did this to keep this spreadsheet dedicated to profit/loss only related to options. Any stock transactions can be performed on a separate spreadsheet. This can changed by editing the formula in column U, if desired. Let me know if you’d be interested in that and I can do the formula for you. Calculating the rate of return can be tricky, as discussed here: Calculating Covered Call Profits – Not As Easy As It Sounds
<br /><br />
<b>Fees</b><br />
Enter any fees associated with the trade. If I sold to open a contract and it expired, then I’d just put the fee of the initial trade. If I bought to close the option then I would add that additional commission to the original value.
<br />
<b>Exit Price</b><br />
This is the price to exit the option. If it expired, then you’d either leave it blank or type in 0. If you bought to close, then type in whatever premium you paid.
<br /><br />
Close Date<br />
This is the date you either closed the option or it expired. It is used to calculate the Days Held column and is important for accurately calculating the annualized rate of return.
<br /><br />
<b>Profit/Loss</b><br />
This show the final profit or loss for each finalized option trade. The cell will be dark green for profit and red for a loss.
<br /><br />
<b>Annualized ROR for Options</b><br />
This calculates the annualized rate of return for the option trade. As described above, it does not include any profit or loss from selling the underlying stock in a covered call situation.
<br /><br />
<b>Margin Annualized ROR</b><br />
Calculates the annualized rate of return based on the smaller margin cash reserve. This field is only used at this point for puts. It is not yet set up for calculating the rate of return for naked calls.
<br /><br />
<b>Status</b><br />
Open, Closed, or Exercised. An example of exercised would be that you sold a covered call and it got called away from you.
<br />

            </Container>
        );
    }
}

export default Glossary;

