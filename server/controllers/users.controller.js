const user   = requier('../models.users.model');
const crypto = requier('crypto-js');
const jqt    = require('jsonwebtoken');

module.export = {
    getAllUser: (req, res) => {
        user.find( {}, {__V: false, password: false}, err(err, data) => {
            res.send(data)
        })
    },

    createUser: (req, res) => {
        user.findOne({userName: req.body.username}, (err, data) => {
            if(data) res.json({err: "Username already taken!"})
            user.findOne({email: req.body.email}, (err, data) =>{
                if(data) res.json({err: "Email already taken!"})
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
                        if (err) res.json({err.errors})
                        else res.send({'Registration success'})
                    })
                }
            })
        })
    }
}