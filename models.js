const mongoose = require('mongoose')
const key = require('./config/key')
mongoose.connect(key.mongoURI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})
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
// User.db.dropCollection('users')
module.exports = {
    User
}