import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import validator from 'validator'

let UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: validator.isEmail,
            message: 'Wrong email'
        }
    },
    profileImageURL: {
        type: String
    },
    sessionTokens: [{
        token: String
    }]
})

UserSchema.pre('save', function(next) {
    let user = this;
    if (user.isModified('password')) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash
                next()
            })
        })
    } else {
        next()
    }
})

let User = mongoose.model('User', UserSchema)

export default User;