// Load packages
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

// Define the schema for the user
var UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});


UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};


// Method to verify passwords
UserSchema.methods.verifyPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
}

// Export the model
module.exports = mongoose.model('User', UserSchema);
