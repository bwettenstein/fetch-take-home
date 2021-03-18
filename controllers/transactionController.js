const { transactions } = require('../config');
const {
  searchBalance,
  addPointsToBalanceSheet,
  addBalance,
} = require('../controllers/balanceController');

// Returns the existing transactions
exports.getTransactions = (req, res) => {
  res.json(transactions);
};

exports.getSortedTransactions = (req, res) => {
  const sortedTransactions = this.sortTransactions();
  return res.json(sortedTransactions);
};

// Grabs the existing transactions, sorts them by date and time, and returns them
exports.sortTransactions = () => {
  const sortedTransactions = [...transactions];
  sortedTransactions.sort((x, y) => {
    return x.timestamp.localeCompare(y.timestamp);
  });
  return sortedTransactions;
};

// Adds a singular transaction from a POST request
exports.addTransaction = (req, res) => {
  const payer = req.header('payer').toUpperCase();
  let points = req.header('points');

  // If timestamp isn't provided by user, set it to the current date and time
  const timestamp = req.header('timestamp') || new Date().toISOString();

  // Error handling if variables are blank
  if (!payer || !points || !timestamp)
    return res.error(400).send('A header is empty');

  if (parseInt(points)) points = parseInt(points);
  else res.error(400).send('Points must be an integer');

  const transaction = { payer, points, timestamp };
  transactions.push(transaction);

  // Check if the name is already present in the balance sheet
  // If it is, then add the points to the existing point total
  // If it isn't, then add it to the balance sheet
  if (searchBalance(payer)) addPointsToBalanceSheet(payer, points);
  else {
    addBalance(payer, points);
  }

  return res.json(transaction);
};
