const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Product = require('../models/product');


router.get('/',function(req,res,next) {
    Product.find()
        .exec()
        .then(docs => {
            console.log(docs);
            if (docs.length >= 0){
                res.status(200).json(docs);
            }else {
                res.status(404).json({
                    message: "No entries found"
                })
            }
            res.status(200).json(docs);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
});

router.post("/", function (req,res,next) {
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
            res.status(201).json({
                message: 'Handling post request to /products',
                createdProduct : result
            });
        })
        .catch(err =>{
            console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

router.get("/:productId", function (req,res,next) {
    const id = req.params.productId;
   Product.findById(id)
       .exec()
       .then(doc =>{
          console.log("From Mongodb",doc);

          if (doc){
              res.status(200).json(doc);
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
});

router.patch('/:productId', function (req,res,next) {
    const id = req.params.productId;
    const updateOperations = {};
    for (const operations of req.body){
        updateOperations[operations.propName] = operations.value;
    }
   Product.update({_id:id}, {$set: updateOperations})
       .exec()
       .then(result => {
           console.log(result);
           res.status(200).json(result);
       })
       .catch(err =>{
           console.log(err);
           res.status(500).json({
               error: err
           })

       });
});

router.delete('/:productId', function (req,res,next) {
    const id = req.params.productId;
  Product.remove({_id: id})
      .exec()
      .then(result => {
          res.status(200).json(result);
      })
      .catch(err => {
          console.log(err);
          res.status(500).json({
              error: err
          })
      })
});

module.exports = router;