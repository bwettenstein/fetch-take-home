const { transactions } = require('../config');

exports.getTransactions = (req, res) => {
  res.json(transactions);
};

exports.sortTransactions = (req, res) => {
    transactions.sort((x, y) => {
      return x.timestamp.localeCompare(y.timestamp)
    });
    res.json(transactions);
  };
