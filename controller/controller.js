const { response } = require('express');
const db = require('../db/db');

exports.getClientForm = (req, res, next) => {
    res.render('../view/form.ejs')
}

exports.postClientRecord = async (req, res, next) => {
    const name = req.body.name;
    const age = req.body.age;
    console.log(name + "-" + age)

    if (!name || !age) {
        return res.send('Please provide both name and age' );
    }

    const result = await db.query('INSERT INTO clients (name, age) VALUES ($1, $2) RETURNING *', [name, age]);
    // res.json(result.rows[0]);
    res.send('Record added sussesfully...');
}


exports.getClientList = async (req, res, next) => {
    const clients = await (await db.query('SELECT * FROM clients ;')).rows;
    //res.json(clients);
    res.render('../view/clients.ejs', {
        clientList: clients
    })
}