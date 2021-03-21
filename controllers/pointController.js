const { balance } = require('../config');
const {
  sortTransactions,
  addTransactionFromAddPoints,
} = require('./transactionController');
const { changeBalance } = require('./balanceController');

// Spends points from POST request passed by the user
// Goes from the sorted list of transactions and spends the points
// without bankrupting a payer. Return an error message if there's
// not enough points to fulfill the request.

// Required Headers:
// 'points' - An integer that holds the points that will be distributed from payer points
exports.spendPoints = (req, res) => {
  let points = parseInt(req.header('points'));
  // Get the sorted transaction sheet in order to start from the oldest points
  const sortedTransactions = sortTransactions();

  // Holds the names of the payers with no points in their account
  // Names that are on here will get ignored when it comes to evaluating whose points will get added
  const bankrupt = [];

  // Shallow copy of the balance, all the point modifications will be done to this
  // After everything finishes, set the actual balance point values to the ones in this
  const balanceCopy = { ...balance };

  if (!points || points <= 0)
    return res.json({
      success: false,
      message: 'Req.points must not be empty and must be greater than 0',
    });

  // Iterate through each transaction
  sortedTransactions.forEach((element) => {
    // If points is 0, that means we've successfully distributed all the points so do nothing
    if (points === 0) return;

    const sortedPayer = element.payer;
    const sortedPoints = element.points;
    const balancePoints = balanceCopy[sortedPayer];

    // Check if the current transaction payer is inside bankrupt
    // If it is, go to the next iteration of the loop
    if (bankrupt.includes(sortedPayer)) return;

    // Check if the current payer has no points, if so then add to bankrupt
    if (balancePoints === 0) bankrupt.push(sortedPayer);

    // If the payer has more points than the current transaction point value
    if (balancePoints > sortedPoints) {
      // If the current transaction value is greater than the current point value
      // EX - Transaction value is 500, current point value is 200
      if (sortedPoints > points) {
        balanceCopy[sortedPayer] -= points;
        points = 0;
        // If the current transaction value is less than the current point value
        // EX - Current transaction value is 500 points, but this transaction is worth 1000 points
      } else {
        balanceCopy[sortedPayer] -= sortedPoints;
        points -= sortedPoints;
      }
      // If the payer has less points than the current transaction point value
    } else {
      // If the payer has more points than the current point value
      // EX - Payer has a 1000 point balance, current point value is 500
      if (balancePoints > points) {
        balanceCopy[sortedPayer] -= points;
        points = 0;
        // If the payer has less points than the current point value
        // EX - Payer has a 500 point balance, current point value is 1000
      } else {
        points -= balancePoints;
        balanceCopy[sortedPayer] = 0;
      }
    }
  });

  // If there's still points left over, then there's not enough points to get rid of in order to fulfil the request
  if (points !== 0)
    return res.json({
      Success: false,
      message: 'Not enough points to fulfil this request',
      excessPoints: points,
    });

  for (element in balanceCopy) {
    // Will hold the change in points from the previous point balance, to the current points balance after points were spent
    // We multiply it by negative 1 to show a change. This will get pushed to the transaction sheet
    // EX: The current balance total is 2000 points, 400 were just pulled from a spend call making the difference 400
    // Therefore, push -400 to the transaction sheet
    const difference = (balance[element] - balanceCopy[element]) * -1;
    // Check if difference isn't 0, if it is that means there is no change so don't push it to transactions
    if (difference !== 0) addTransactionFromAddPoints(element, difference);

    changeBalance(element, balanceCopy[element]);
  }

  //return res.json({ Success: true, balance });
  return res.send(balance);
};

exports.spendPointsGet = (req, res) => {
  return res.json({
    Success: false,
    message:
      "You must make a post request because this method modifies the transaction and balance sheets. Include, the 'point' header in your request.",
  });
};
