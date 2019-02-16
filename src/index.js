import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './initializeApp';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
//import './iexStockExample';


ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
