const user   = require('../models/user.model');
const crypto = require('crypto-js');
const jqt    = require('jsonwebtoken');

module.exports = {
    getAllUser: (req, res) => {
        user.find( {}, {__V: false, password: false}, (err, data) => {
            res.send(data)
        })
    },

    createUser: (req, res) => {
        user.findOne({userName: req.body.userName}, (err, username) => {
            if(username) res.json({err: "Username already taken!"})
            else{
                user.findOne({email: req.body.email}, (err, email) =>{
                if(email) res.json({err: "Email already taken!"})
                else{
                    let newUser = user({
                        firstName: req.body.firstName,
                        lastName : req.body.lastName,
                        userName : req.body.userName,
                        email    : req.body.email,
                        password : req.body.password,
                        phone    : req.body.phone || ''
                    })

                    newUser.save((err, created) => {
                        if (err) res.send(err.errors)
                        else res.send('Registration success')
                    })
                }
            })
            }
        })
    }
}