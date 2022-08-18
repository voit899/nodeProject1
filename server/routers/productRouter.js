const express = require('express');

const Product = require('../models/productModel');

const productRouter = express.Router();

productRouter.post('/', async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json({
            status: 'success',
            statusCode: 201,
            data: product,
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            statusCode: 400,
            error: err.message,
        });
    }
});

productRouter.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({
            status: 'success',
            statusCode: 200,
            data: products,
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            statusCode: 400,
            error: err.message,
        });
    }
});

productRouter.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        // const product = await Product.findOne({ _id: { $eq: id } });
        const product = await Product.findById(id);
        res.status(200).json({
            status: 'success',
            statusCode: 200,
            data: product,
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            statusCode: 400,
            error: err.message,
        });
    }
});

module.exports = productRouter;