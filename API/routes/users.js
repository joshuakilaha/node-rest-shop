const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = require('../models/user');

router.post('/signup', function (req,res) {

    User.find({email: req.body.email})
        .exec()
        .then(user =>{
            if (user.length >= 1){
                return res.status(409).json({
                    message: 'The email address is already in use'
                });
            } else {
                bcrypt.hash(req.body.password, 10, function (err,hash) {
                    if (err){
                        return res.status(500).json({
                            error: err
                        });
                    } else {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            email:req.body.email,
                            password:hash,
                        });
                        user.save()
                            .then(result => {
                                console.log(result);
                                res.status(200).json({
                                    message: 'User Was created'
                                });
                            })
                            .catch(err =>{
                                res.status(500).json({
                                    error: err
                                })
                            })
                    }
                });
            }
        });
});

router.get('signin', function (req,res,next) {

});

router.delete('/:userId', function (req,res) {
User.deleteOne({_id: req.params.userId})
    .exec()
    .then( result => {
        res.status(200).json({
            message: 'user deleted'
        });
    })
    .catch(err =>{
        res.status(500).json({
            error: err
        });
    });

});

module.exports = router;