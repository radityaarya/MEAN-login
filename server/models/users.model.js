const UserSchema = require('./schema/users.schema')

const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const bcrypt = require('bcrypt'), SALT_WORK_FACTOR = 10;

UserSchema.statics.allUsers = function(cb) {
    return this.find( {}, {__V: false, password: false}, cb)
}

UserSchema.statics.usernameCheck = function(reqUserName, cb) {
    return this.findOne({userName: reqUserName}, cb)
}

UserSchema.statics.emailCheck = function(reqEmail, cb){
    return this.findOne({email: reqEmail}, cb)
}

UserSchema.statics.createUser = function(firstName, lastName, userName, email, password, phone, cb){
    return this.create({
        firstName: firstName,
        lastName: lastName,
        userName: userName,
        email: email,
        password: password,
        phone: phone,
    }, cb)
}


// middleware password encryption
UserSchema.pre('save', function(next) {
    var user = this;

    if (!user.isModified('password')) return next();

    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            user.password = hash;
            next();
        });
    });
});

module.exports = mongoose.model('Users', UserSchema)