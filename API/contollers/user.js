const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
exports.SignUp_User = function (req,res) {

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
};

exports.Login_user = function (req,res,next) {
    User.find({email: req.body.email})
        .exec()
        .then(user =>{
            if(user.length <1 ){
                return res.status(401).json({
                    message: 'Auth Failed'
                });
            }
            bcrypt.compare(req.body.password, user[0].password, function (err, result) {
                if (err){
                    return res.status(401).json({
                        message: 'Auth Failed'
                    });
                }
                if (result) {
                    const token = jwt.sign(
                        {
                            email: user[0].email,
                            userId: user[0]._id
                        },
                        process.env.JWT_KEY,
                        {
                            expiresIn: "1h"
                        }
                    );
                    return res.status(200).json({
                        message: 'Auth successful',
                        token: token
                    });
                }
                res.status(401).json({
                    message: 'Auth Failed'
                })
            })
        })
        .catch(err =>{
            res.status(500).json({
                error:err
            })
        })
};

exports.Delete_user = function (req,res) {
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

};