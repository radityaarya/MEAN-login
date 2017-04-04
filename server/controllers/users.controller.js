const user   = require('../models/users.model');
const jwt    = require('jsonwebtoken');

module.exports = {
    getAllUser: (req, res) => {
        user.allUsers((err,data) => {
            res.send(data)
        })
    },

    createUser: (req, res) => {
        user.usernameCheck(req.body.userName, (err, username) => {
            user.emailCheck(req.body.email, (err, email) =>{
                if(username) res.json({err: "Username already taken!"})
                
                else if(email) res.json({err: "Email already taken!"})
                
                else if(!req.body.password || req.body.password.trim() === '')
                    res.json({err: 'Password required'})
                
                else if(!/^[\S\s]{6,35}$/.test(req.body.password))
                    res.json({err: 'Invalid password format (min. 6 and max. 35)'})
 
                else{
                    user.createUser(
                        req.body.firstName,
                        req.body.lastName,
                        req.body.userName,
                        req.body.email,
                        req.body.password,
                        req.body.phone,
                        (err, created) => {
                            if (err) res.send(err.errors)
                            else res.send('Registration success')
                    })
                }
            })
        })
    }
}