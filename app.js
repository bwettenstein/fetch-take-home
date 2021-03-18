const express = require('express');

const balanceController = require('./controllers/balanceController');
const transactionController = require('./controllers/transactionController');
const pointController = require('./controllers/pointController');
const app = express();

app.use(express.json());

// Move these routes to diff router files after this works
app.get('/balance', balanceController.getBalance);
app.get('/transaction', transactionController.getTransactions);
app.get('/transaction/sort', transactionController.getSortedTransactions);
app.post('/transaction/add', transactionController.addTransaction);
app.post('/points/add', pointController.addPoints);

// To run the server locally, if 5000 doesn't work as a port it can be changed
const port = 5000;
app.listen(port);
