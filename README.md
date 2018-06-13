# OptionsTracker

## Stock Options Performance Tracker 

### Elevator Pitch

+ This app keeps track of Stock Options performance in your portfolio. 
+ While there are many apps and websites out there to help manage your stock performance (because it's pretty straight forward), there aren't many applications and websites created to keep track of your options trade performance against your portfolio. This app will be based on an existing online spreadsheet called the "Options Tracker Spreadsheet" - http://www.twoinvesting.com/2016/10/options-tracker-spreadsheet/ 

### Dependencies

#### Current known dependencies:

1. Create React App
2. Stock and Options quote service API (this may not be needed)
3. Firebase to store all entered stock options trades

### Task list

1. Create React shell and test deployment on git pages - 6/13/2018 
1. Create all component shells - 6/13/2018
1. Create input page for trade input - 6/16/2018
    - Underlying stock symbol
    - trade open date
    - option expiration date
    - option type (Put or Call)
    - transation type (Buy/Sell)
    - option strike price
    - option premium
    - number of contracts
    - fees (commission + per contract)
    - exit Price
    - close date
1. Create basic derived values - 6/17/2018
    - underlying stock price (stock quote API)
1. Create a table of all trades with above inputs and derived values - 6/17/2018
1. Create summary of options trades performance - 6/18/2018
