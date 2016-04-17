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

// Add a hook(always called before) to the user.save() function
UserSchema.pre('save', function(callback) {
    var user = this;

    // If the password hasn't changed, dont do anything
    if (!user.isModified('password')) return callback();

    // Rehash the password if it has changed
    bcrypt.genSalt(5, function(err, salt) {
        if (err) return callback(err);

        bcrypt.hash(user.password, salt, null, function(err, hash) {
            if (err) return callback(err);
            user.password = hash;
            callback();
        });
    });
});

UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};


// Method to verify passwords
UserSchema.methods.verifyPassword = function(password) {
    bcrypt.compareSync(password, this.password);
}

// Export the model
module.exports = mongoose.model('User', UserSchema);
