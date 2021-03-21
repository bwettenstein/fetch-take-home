const { transactions } = require('../config');
const {
  searchBalance,
  addPointsToBalanceSheet,
  changeBalance,
} = require('../controllers/balanceController');

// Grabs the unsorted transaction sheet and returns it in a json response
exports.getTransactions = (req, res) => {
  res.json(transactions);
};

// Grabs the sorted transaction sheet and returns it in a json response
// Accomplishes this by grabbing the unsorted transactions sheet and passing
// it as a parameter to the sortTransactions method
exports.getSortedTransactions = (req, res) => {
  const sortedTransactions = this.sortTransactions();
  return res.json(sortedTransactions);
};

// Grabs the existing transactions, sorts them by the timestamp, and returns them
exports.sortTransactions = () => {
  const sortedTransactions = [...transactions];
  sortedTransactions.sort((x, y) => {
    return x.timestamp.localeCompare(y.timestamp);
  });
  return sortedTransactions;
};

// Adds a singular transaction to the transaction sheet from a POST request
// Checks to make sure that the user has correctly passed the correct info in the correct headers
// pushes the transaction to the transaction sheet and return it in a json response

// Required Request Headers:
// 'payer' - A string the identifies who the payer is
// 'points' - An integer that holds the point balance for the payer

// Optional Request Headers
// 'timestamp' - Not required, but if one is passed, it must be passed by ISOString()
// If it's not passed, an ISOString() timestamp will be generated
exports.addTransaction = (req, res) => {
  const payer = req.header('payer').toUpperCase();
  let points = req.header('points');

  // If timestamp isn't provided by user, set it to the current date and time
  const timestamp = req.header('timestamp') || new Date().toISOString();

  // Error handling if variables are blank
  if (!payer || !points || !timestamp)
    return res.error(400).send('A header is empty');

  // In case the integer is passed as a string
  if (parseInt(points)) points = parseInt(points);
  else res.error(400).send('Points must be an integer');

  const transaction = { payer, points, timestamp };
  transactions.push(transaction);

  // Check if the name is already present in the balance sheet
  // If it is, then add the points to the existing point total
  // If it isn't, then add the name and balance to the balance sheet
  if (searchBalance(payer)) addPointsToBalanceSheet(payer, points);
  else {
    changeBalance(payer, points);
  }

  return res.json(transaction);
};

// Adds to the transaction sheet from parameters passed by the user
// Unlike the addTransaction method above, it doesn't get the info from request headers
exports.addTransactionFromAddPoints = (payer, points) => {
  const transaction = {
    payer: payer.toUpperCase(),
    points: points,
    timestamp: new Date().toISOString(),
  };
  transactions.push(transaction);
};

// If the user makes a GET request, tell them they have to make a POST request
exports.addTransactionGet = (req, res) => {
  res.json({
    Success: false,
    message:
      "You must make a post request to modify the transactions. Include, 'payer' and 'point' headers in your request.",
  });
};
