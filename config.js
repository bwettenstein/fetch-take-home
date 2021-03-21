// Just holds all of the transactions and balance storage for the controllers to access it

const transactions = [
  // Uncomment if you want to use the given transaction data to test
  // { payer: 'DANNON', points: 1000, timestamp: '2020-11-02T14:00:00' },
  // { payer: 'UNILEVER', points: 200, timestamp: '2020-10-31T11:00:00' },
  // { payer: 'DANNON', points: -200, timestamp: '2020-10-31T15:00:00' },
  // { payer: 'MILLER COORS', points: 10000, timestamp: '2020-11-01T14:00:00' },
  // { payer: 'DANNON', points: 300, timestamp: '2020-10-31T10:00:00' },
];

const balance = {
  // Uncomment if you want to use the given balance data to test
  // 'DANNON': 1100,
  // 'UNILEVER': 200,
  // 'MILLER COORS': 10000,
};

module.exports = { transactions, balance };
