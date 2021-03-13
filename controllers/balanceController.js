const { balance } = require('../config');

exports.getBalance = (req, res) => {
    res.json(balance);
};
