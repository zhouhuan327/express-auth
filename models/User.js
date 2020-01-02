const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        set(val) {
            return require('bcryptjs').hashSync(val, 10);
        }
    }
})
const User = mongoose.model('User', UserSchema)

module.exports = {
    User
}