const express = require('express');
const router = express.Router();
const authorize = require('../middleware/auth');
const Transaction = require('../models/Transaction');
router.get('/stats', authorize(['Admin', 'Commander', 'Logistics']), async (req, res) => {
    try {
        const { base } = req.query;
        let filter = {};
        if (req.user.role === 'Commander') {
            filter = { toBase: req.user.base };
        } else if (base && base !== 'All') {
            filter = { toBase: base };
        }
        const transactions = await Transaction.find(filter);
        const stats = transactions.reduce((acc, tx) => {
            if (tx.type === 'PURCHASE') acc.purchases += tx.quantity;
            if (tx.type === 'TRANSFER_IN') acc.transfersIn += tx.quantity;
            if (tx.type === 'TRANSFER_OUT') acc.transfersOut += tx.quantity;
            if (tx.type === 'EXPENDITURE') acc.expended += tx.quantity;
            if (tx.type === 'ASSIGNMENT') acc.assigned += tx.quantity;
            return acc;
        }, { purchases: 0, transfersIn: 0, transfersOut: 0, expended: 0, assigned: 0 });

        const netMovement = stats.purchases + stats.transfersIn - stats.transfersOut;
        const openingBalance = 1200; 
        res.json({
            openingBalance,
            netMovement,
            purchases: stats.purchases,
            transfersIn: stats.transfersIn,
            transfersOut: stats.transfersOut,
            assigned: stats.assigned,
            expended: stats.expended,
            closingBalance: openingBalance + netMovement - stats.expended
        });
    } 
    catch (error) {
        console.error("Dashboard Stats Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
module.exports = router;