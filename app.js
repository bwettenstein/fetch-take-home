const express = require('express');

const balanceController = require('./controllers/balanceController');
const transactionController = require('./controllers/transactionController');
const pointController = require('./controllers/pointController');
const app = express();

app.use(express.json());

// Balance controller methods
app.get('/balance', balanceController.getBalance);

// Transaction controller methods
app.get('/transaction', transactionController.getTransactions);
app.get('/transaction/sort', transactionController.getSortedTransactions);
app.get('/transaction/add', transactionController.addTransactionGet);
app.post('/transaction/add', transactionController.addTransaction);

// Point controller methods
app.get('/points/spend', pointController.spendPointsGet);
app.post('/points/spend', pointController.spendPoints);

// Code to run the code locally on a server, if 5000 doesn't work as a port it can be changed
const port = 5000;
app.listen(port);
