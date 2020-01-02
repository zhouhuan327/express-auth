const express = require('express');
const router = express.Router();

const {
    auth
} = require('../utils/jwt')
const {
    jwtSign
} = require('../utils/jwt');
const {
    User
} = require('../models/User');


router.get('/users', async (req, res) => {
    const users = await User.find()
    res.send(users)
})

router.post('/register', async (req, res) => {
    const user = await User.create({
        username: req.body.username,
        password: req.body.password
    })
    res.send(user)
})

router.post('/login', async (req, res) => {
    const user = await User.findOne({
        username: req.body.username
    })
    if (!user) {
        return res.status(422).send({
            message: '用户名不存在'
        })
    }
    const isPasswordValid = require('bcryptjs').compareSync(
        req.body.password,
        user.password
    )
    if (!isPasswordValid) {
        return res.status(422).send({
            message: '密码错误'
        })
    }

    //生成token
    jwtSign({
        id: String(user._id)
    })

    res.send({
        message: "登陆成功",
        user,
        token: token
    })
})


router.get('/profile', auth, async (req, res) => {

    res.send({
        message: 'suc',
        userid: req.userid
    })


})

module.exports = router;