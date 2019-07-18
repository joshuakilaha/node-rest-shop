const mongoose = require('mongoose');
const Product = require('../models/product');

exports.Get_All_Products = function(req,res,next) {
    Product.find()
        .select('name price _id productImage')
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                products: docs.map(doc => {
                    return{
                        name: doc.name,
                        price: doc.price,
                        productImage: doc.productImage,
                        _id: doc._id,
                        request:{
                            type: 'GET',
                            url: 'http://localhost:3000/products/'  +doc._id
                        }
                    }
                })
            };
            if (docs.length >= 0){
                res.status(200).json(response);
            }else {
                res.status(404).json({
                    message: "No entries found"
                })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
};

exports.Create_Product= function (req,res,next) {
//Schema item from product
    console.log(req.file);
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price:req.body.price,
        productImage: req.file.path
    });
    product
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Product Created ',
                createdProduct : {
                    name: result.name,
                    price: result.price,
                    _id: result._id,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/products/' + result._id
                    }
                }
            });
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

exports.Get_Product = function (req,res) {
    const id = req.params.productId;
    Product.findById(id)
    .select('name price _id productImage')
        .exec()
        .then(doc =>{
            console.log("From Mongodb",doc);
            if (doc){
                res.status(200).json({
                    Product: doc,
                    request: {
                        type: 'GET',
                        description: 'Get all products',
                        url: 'http://localhost:3000/products/'
                    }
                });
            }else {
                res.status(404).json({
                    message: "The id does not exist"
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

exports.Update_Product = function (req,res) {
    const id = req.params.productId;
    const updateOperations = {};
    for (const operations of req.body){
        updateOperations[operations.propName] = operations.value;
    }
    Product.update({_id:id}, {$set: updateOperations})
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Product Updated',
                request :{
                    type: 'GET',
                    url: 'http://localhost:3000/products/' + id
                }
            });
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
};

exports.Delete_Product = function (req,res,next) {
    const id = req.params.productId;
    Product.deleteOne({_id: id})
        .exec()
        .then(result => {
            res.status(200).json({
                message : "Product Deleted",
                request: {
                    type:'POST',
                    url: 'http://localhost:3000/products/',
                    body : {name:'String', price:'Number'}
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
};