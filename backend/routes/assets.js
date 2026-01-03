const express = require('express');
const router = express.Router();
const authorize = require('../middleware/auth');
const Transaction = require('../models/Transaction');
router.post('/purchase', authorize(['Admin', 'Logistics', 'Commander']), async (req, res) => {
    try {
        const { assetType, quantity, toBase } = req.body;
        console.log("Saving purchase:", { assetType, quantity, toBase, user: req.user.id });
        const newPurchase = new Transaction({
            assetType,
            quantity: Number(quantity),
            type: 'PURCHASE',
            toBase,
            fromBase: 'VENDOR',
            performedBy: req.user.id
        });
        await newPurchase.save();
        res.status(201).json({ message: "Purchase recorded successfully" });
    } 
    catch (err) {
        console.error("DB Save Error:", err.message);
        res.status(500).json({ message: err.message });
    }
});
router.post('/transfer', authorize(['Admin', 'Logistics', 'Commander']), async (req, res) => {
    try {
        const { assetType, quantity, fromBase, toBase } = req.body;
        const transferOut = new Transaction({
            assetType,
            quantity: Number(quantity),
            type: 'TRANSFER_OUT',
            toBase: fromBase,
            performedBy: req.user.id
        });
        const transferIn = new Transaction({
            assetType,
            quantity: Number(quantity),
            type: 'TRANSFER_IN',
            toBase: toBase,
            fromBase: fromBase,
            performedBy: req.user.id
        });
        await transferOut.save();
        await transferIn.save();
        res.status(201).json({ message: "Transfer completed" });
    } 
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
router.post('/record-usage', authorize(['Admin', 'Commander', 'Logistics']), async (req, res) => {
    try {
        const { assetType, quantity, type, personnel } = req.body; 
        const newUsage = new Transaction({
            assetType,
            quantity: Number(quantity),
            type: type, 
            toBase: req.user.base === 'All' ? 'Base Alpha' : req.user.base, 
            performedBy: req.user.id
        });
        await newUsage.save();
        res.status(201).json({ message: "Usage recorded successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
router.get('/history/transfers', authorize(['Admin', 'Commander', 'Logistics']), async (req, res) => {
    try {
        let filter = { type: { $in: ['TRANSFER_IN', 'TRANSFER_OUT'] } };
        if (req.user.role !== 'Admin') {
            filter.$or = [
                { toBase: req.user.base },
                { fromBase: req.user.base }
            ];
        }
        const history = await Transaction.find(filter).sort({ timestamp: -1 });
        res.json(history);
    } catch (err) {
        console.error("History fetch error:", err);
        res.status(500).json({ error: err.message });
    }
});
router.get('/history/purchases', authorize(['Admin', 'Commander', 'Logistics']), async (req, res) => {
    try {
        const history = await Transaction.find({ type: 'PURCHASE' }).sort({ timestamp: -1 });
        res.json(history);
    } catch (err) {
        console.error("Error fetching purchase history:", err);
        res.status(500).json({ error: err.message });
    }
});
module.exports = router;