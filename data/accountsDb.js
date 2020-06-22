const dbConfig = require('./dbConfig');

const getAllAccounts = () => 
    dbConfig('accounts')
        .select('*');

const getAccount = (id) =>
    dbConfig('accounts')
        .where('id', id)
        .first();

const updateAccount = (id, newData) =>
    dbConfig('accounts')
        .where('id', id)
        .update(newData)
        .then(() => getAccount(id))


const deleteAccount = (id) => 
    dbConfig('accounts')
        .where('id', id)
        .del();

module.exports = {
    getAllAccounts,
    getAccount,
    updateAccount,
    deleteAccount,
}