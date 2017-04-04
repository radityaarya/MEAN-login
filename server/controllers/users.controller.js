const user   = require('../models/user.model');
const crypto = require('crypto-js');
const jqt    = require('jsonwebtoken');

module.exports = {
    getAllUser: (req, res) => {
        user.allUsers((err,data) => {
            res.send(data)
        })
    },

    createUser: (req, res) => {
        user.usernameCheck(req.body.userName, (err, username) => {
            if(username) res.json({err: "Username already taken!"})
            else{
                
                user.emailCheck(req.body.email, (err, email) =>{

                if(email)
                    res.json({err: "Email already taken!"})
                else if(!req.body.password || req.body.password.trim() === '')
                    res.json({err: "Password required"})
                else if(!/^[\S\s]{6,35}$/.test(req.body.password))
                    res.json({err: "Invalid password format (min. 6 characters and max. 20 characters)"})
                else{
                    // user.createUser(req.body.firstName, req.body.lastName, req.body.userName, req.body.email, req.body.password, req.body.phone)
                    let newUser = user({
                        firstName: req.body.firstName,
                        lastName : req.body.lastName,
                        userName : req.body.userName,
                        email    : req.body.email,
                        password : crypto.HmacSHA1(req.body.password, process.env.HASH_KEY || 'use the force luke'),
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