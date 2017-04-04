const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const UserSchema = new Schema({

    firstName : {
        type: String,
        required: [true, 'First name required']
    },
    lastName : {
        type: String,
        required: [true, 'Last name required']
    },
    userName : {
        type: String,
        requierd: [true, 'Username required'],
        unique : true
    },
    email : {
        type    : String,
        required: [true, 'Email required'],
        validate: {
            validator: (x) => {
                return /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(x);
            },
            message: 'Invalid email format'  
        }
    },
    password : {
        type: String,
        requierd: [true, 'Password required']
    },
    phone : {
        type: String,
        validate: {
            validator: (x) => {
                return /^\d+$/.test(x)
            },
            message: 'Invalid phone format'
        }    
    },

},
{
  timestamps : true
})

// model logic
UserSchema.statics.allUsers = function(cb) {
    return this.find( {}, {__V: false, password: false}, cb)
}

UserSchema.statics.usernameCheck = function(reqUserName, cb) {
    return this.findOne({userName: reqUserName}, cb)
}

UserSchema.statics.emailCheck = function(reqEmail, cb){
    return this.findOne({email: reqEmail}, cb)
}

module.exports = mongoose.model('Users', UserSchema)