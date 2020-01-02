const jwt = require('jsonwebtoken');
const secretKey = require('../config/key').secretOrKey;
const {
    User
} = require('../models/User');

const jwtSign = (data) => {
    const token = jwt.sign(data, secretKey, {
        expiresIn: 60 * 60
    })
    return token
}



const auth = async (req, res, next) => {
    const raw = req.headers.authorization;
    jwt.verify(raw, secretKey, (err, data) => {
        if (err) {
            res.send({
                msg: "token失效"
            })
        } else {

            req.userid = data.id;
            next();
        }
    });
}
module.exports = {
    auth,
    jwtSign
}