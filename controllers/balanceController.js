const { balance } = require('../config');

exports.getBalance = (req, res) => {
  res.json(balance);
};

// Searches the balance sheet to check if the name given by the transaction, is already present
// Basically, is the name of the transaction already in the balance sheet
exports.searchBalance = (payer) => {
  for (element in balance) {
    if (element === payer) return balance[element];
  }
  return null;
};

// Add an item to the balance sheet
exports.addBalance = (payer, points) => {
  balance[payer.toUpperCase()] = points;
};

// Add points to balance sheet
exports.addPoints = (payer, points) => {
  const element = this.searchBalance(payer);
  if (element) balance[payer] += points;
};
