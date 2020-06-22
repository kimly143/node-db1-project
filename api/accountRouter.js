const express = require('express');
const accountDb = require('../data/accountsDb');

const router = new express.Router();

const loadAccount = async (req, res, next) => {
    try {
        const account = await accountDb.getAccount(req.params.id);
        if (!account) {
            return res.status(404).json({
                error: 'No account found',
            });
        }
        req.account = account;
        next();
    } catch (ex) {
        console.error(ex);
        return res.status(500).json({
            error: 'Failed to fetch account data from the database',
        });
    }
};

router.get('/', async (req, res) => {
    try {
        const accounts = await accountDb.getAllAccounts();
        return res.json(accounts);
    } catch (ex) {
        console.error(ex);
        return res.status(500).json({
            error: 'Failed to fetch account data from database.',
        });
    }
})

router.get('/:id', loadAccount, (req, res) => {
    res.json(req.account);
});

router.put('/:id', loadAccount, async (req, res) => {
    try {
        const newAccount = await accountDb.updateAccount(req.account.id, req.body);
        return res.json(newAccount);
    } catch (ex) {
        console.error(ex);
        return res.status(500).json({
            error: 'Failed to update the account'
        });
    }
});

router.delete('/:id', loadAccount, async (req, res) => {
    try {
        await accountDb.deleteAccount(req.account.id);
        return res.end();
    } catch (ex) {
        console.error(ex);
        return res.status(500).json({
            error: 'Failed to delete the account.',
        });
    }
})


module.exports = router;