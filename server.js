const express = require('express');
const mongoose = require('mongoose')
//node跨域设置
const cors = require('cors')
const app = express();
app.use(express.json());

const users = require('./routes/user')

// 配置跨域
app.use(cors());

// 连接mongodb
const db = require('./config/key').mongoURI;
mongoose.connect(db, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})

// 使用routes
app.use('/api', users);

app.listen(3001, () => {
    console.log('http://localhost:3001/api')
})