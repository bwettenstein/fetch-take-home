// Just holds all of the transactions and balance storage for the controllers to access it

const transactions = [
  { "payer": "DANNON", "points": 1000, "timestamp": "2020-11-02T14:00:00" },
  {"payer": "UNILEVER", "points": 200, "timestamp": "2020-10-31T11:00:00"},
  { "payer": "DANNON", "points": -200, "timestamp": "2020-10-31T15:00:00" },
  { "payer": "MILLER COORS", "points": 10000, "timestamp": "2020-11-01T14:00:00" },
  { "payer": "DANNON", "points": 300, "timestamp": "2020-10-31T10:00:00" }
];

const balance = {
  'Dannon': 1000,
  'UNILEVER': 0,
  'MILLER COORS': 5300,
};

module.exports = { transactions, balance };
