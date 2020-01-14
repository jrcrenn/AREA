var mongoose = require('mongoose')
var bcrypt = require('bcryptjs');

var UserSchema = new mongoose.Schema({
    local : {
        name: String,
        email: String,
        password: String,
        date: {
            type: Date,
            default: Date.now
        },
        widgets: { type: Array, required: false}
    },
    facebook : {
        id : String,
        token : String,
        name : String,
        widgets: { type: Array, required: false}
    },
    google : {
        id : String,
        token : String,
        name : String,
        widgets: { type: Array, required: false}
    }
});

UserSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(9));
};

UserSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.local.password);
};

var User = mongoose.model('User', UserSchema);

module.exports = User