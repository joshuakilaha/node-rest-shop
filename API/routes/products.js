const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Product = require('../models/product');


router.get('/',function(req,res,next) {
    res.status(200).json({
        message: 'Handling GET request to /products'
    });
});

router.post('/', function (req,res,next) {
//Schema item from product
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price:req.body.price
    });
    product
        .save()
        .then(result => {
        console.log(result);
    })
        .catch(err => console.log(err));

    res.status(201).json({
        message: 'Handling post request to /products',
        createdProduct : product
    });
});

router.get('/:productId', function (req,res,next){
    const id = req.params.productId;
    Product.findById(id)
        .exec()
        .then(doc => {
        console.log("From Database",doc);
        return  res.status(200).json( doc);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error:err});
        })
});

router.patch('/:productId', function (req,res,next){
    res.status(200).json({
        message: 'Updated product!'
    });
});

router.delete('/:productId', function (req,res,next){
    res.status(200).json({
       message: 'Delete product!'
        });
    });

module.exports = router;