const { balance } = require('../config');

// Grabs the balance sheet and returns it in a json response
exports.getBalance = (req, res) => {
  res.json(balance);
};

// Searches the balance sheet to check if the name passed in the parameter is in the balance sheet
exports.searchBalance = (payer) => {
  for (element in balance) {
    if (element === payer) return balance[element];
  }
  return null;
};

// Changes the balance of a payer's point total in the balance sheet
exports.changeBalance = (payer, points) => {
  balance[payer.toUpperCase()] = points;
};

// Adds points to the current payer's point balance
exports.addPointsToBalanceSheet = (payer, points) => {
  const element = this.searchBalance(payer);
  if (element) balance[payer] += points;
};
