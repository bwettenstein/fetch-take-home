const express = require('express');

const balanceController = require('./controllers/balanceController');
const transactionController = require('./controllers/transactionController');

const app = express();

app.use(express.json());
app.get('/', balanceController.getBalance);
//app.get('/transaction', transactionController.getTransactions);
app.get('/transaction', transactionController.sortTransactions);

// To run the server locally, if 5000 doesn't work as a port it can be changed
const port = 5000;
app.listen(port);
