const { balance, transactions } = require('../config');
const { sortTransactions } = require('./transactionController');
const { addPointsToBalanceSheet, addBalance } = require('./balanceController');

// Requires a points header
exports.addPoints = (req, res) => {
  console.log('CALLED');
  let points = parseInt(req.header('points'));
  const sortedTransactions = sortTransactions();

  // Holds the names of the payers that will get bankrupted from this point request
  // Names that are on here will get ignored when it comes to evaluating whose points will get added
  const bankrupted = [];

  // Shallow copy of the balance, all the point modifications will be done to this
  // After everything finishes, set the actual balance point values to the ones in this
  const balanceCopy = { ...balance };

  if (!points)
    return res.json({
      success: false,
      message: 'Req.points must not be empty',
    });

  sortedTransactions.forEach((element) => {
    if (points <= 0) return;
    const sortedPayer = element.payer;
    const sortedPoints = element.points;
    const balancePoints = balanceCopy[sortedPayer];

    // Check if they'll be bankrupted from this
    // If they are, go to next iteration of loop
    if (bankrupted.includes(sortedPayer)) return;

    // Check if they'll be bankrupt
    // If they are, push to bankrupted and go to next iteration of loop
    // MAYBE REMOVE THIS
    if (balancePoints - sortedPoints < 0) {
      bankrupted.push(sortedPayer);
      return;
    }

    // If the point sis less than the value of the point number in this specific transaction
    // Then set points to 0, otherwise we'll be subracting
    if (points - sortedPoints < 0) {
      balanceCopy[sortedPayer] -= points;
      console.log('points', points);
      points = 0;
      console.log(balanceCopy[sortedPayer], 'fooooo');
    } else {
      balanceCopy[sortedPayer] -= sortedPoints;
      points -= sortedPoints;
    }
  });
  // Check the current point value
  // If there's enough points in the balance, then points should be 0
  // If there's not that means there's not enough points in our balance sheet
  // Therefore, return an error
  if (points !== 0)
    return res.json({
      Success: false,
      Message: 'Not enough points in the balance sheet to fulfil this request',
      LeftoverPoints: points,
    });
  console.log('bankrupted', bankrupted);
  // Loop and add the point changes to the transactions sheet
  for (prop in balanceCopy) {
    // If the point values are equal, it means their points weren't affected
    // So go to the next iteration of the loops

    if (balance[prop] === balanceCopy[prop]) break;
    const difference = balance[prop] - balanceCopy[prop];

    const payer = prop;
    // Gives it the negative number
    const points = difference * -1;
    const timestamp = new Date().toISOString();

    const transaction = { payer, points, timestamp };
    transactions.push(transaction);

    // Set the point values in the balance sheet equal to the values in balanceCopy
    addBalance(prop, points * -1);
    console.log(prop, 'PROP', balanceCopy[prop], 'NAME');
  }

  return res.json({ Success: true, balance });
};
