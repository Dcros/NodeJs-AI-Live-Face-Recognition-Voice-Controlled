const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
var app = require('express');
var fs = require('fs');


const userSchema = new mongoose.Schema({
    local: {
        email: String,
        password: String,
        name: String,
        img: { data: Buffer, contentType: String }
    },
    facebook: {
        email: String,
        password: String,
        token: String
    },
    twitter: {
        email: String,
        password: String,
        token: String
    },
    google: {
        email: String,
        password: String,
        token: String
    }
});


userSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null); 
};

userSchema.methods.validatePassword = function (password){
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', userSchema);
