const express = require('express');

let cart = [
    {
        name: 'router',
        price: 50,
        id: 1,
    },
    {
        name: 'iphone',
        price: 1000,
        id: 2,
    },
    {
        name: 'keyboard',
        price: 85,
        id: 3,
    },
    {
        name: 'earphones',
        price: 500,
        id: 4,
    },
];

const cartRouter = express.Router();

cartRouter.get('/', (req, res) => {
    res.status(200).json({
        status: 'success',
        statusCode: 200,
        data: cart,
    });
});

cartRouter.get('/totalamount', (req, res) => {
    res.status(200).json({
        status: 'success',
        statusCode: 200,
        data: cart.reduce((prev, cur) => prev + cur.price, 0),
    });
});

cartRouter.post('/', (req, res) => {
    const { name, id, price } = req.body;
    if (!name || !price || !id) {
        res.status(400).json({
            status: 'failure',
            statusCode: 400,
            error: 'please provide id AND price AND name',
        });
    } else {
        const product = {
            name,
            id,
            price: +price,
        };
        cart.push(product);
        res.status(201).json({
            status: 'success',
            statusCode: 201,
            data: cart,
        });
    }
});

cartRouter.delete('/', (req, res) => {
    const { id } = req.query;
    if (id) {
        cart = cart.filter(product => product.id !== +id);
        res.status(202).json({
            status: 'success',
            statusCode: 202,
            data: cart,
        });
    } else {
        res.status(400).json({
            status: 'failure',
            statusCode: 400,
            error: 'invalid request, please send id',
        });
    }
});

module.exports = cartRouter;