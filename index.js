const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const User = require('./model/user') 
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const JWT_SECRET = 'zekljazifjziogjaioeh8O34U_hhozreuhuhu_8_çt_7T8gf'

// mongodb+srv://<username>:<password>@data.tr5qe.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
const mongodb = 'mongodb+srv://admin:admin123@data.tr5qe.mongodb.net/covid_data?retryWrites=true&w=majority'
mongoose.connect(mongodb, { useNewUrlParser: true, useUnifiedTopology: true })
    //.then((result) => app.listen(3000))
    .then((result) => console.log("connected to database"))
    .catch((err) => console.log(err))


app.use('/', express.static(__dirname + '/front'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/front/html/index.html')
})

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/front/html/login.html')
})

app.use(bodyParser.json())

app.post('/login', async (req, res) => {
    const { username, password } = req.body
    const user = await User.findOne({ username }).lean()

    if(!user){
        return res.json({ status: 'error', error: 'Invalid username/password'})
    }

    if(await bcrypt.compare(password, user.password)){

        const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET)
        return res.json({ status: 'ok', data: token})
    }

    res.json({ status: 'error', error: 'Invalid username/password' })
})

app.post('/register', async (req, res) => {
    const { username, password: plainTextPassword } = req.body

    if(!username || typeof username != 'string'){
        return res.json({ status: 'error', error: 'Invalid username' })
    }
    if(!plainTextPassword || typeof plainTextPassword != 'string'){
        return res.json({ status: 'error', error: 'Invalid password' })
    }

    if(plainTextPassword.length < 6){
        return res.json({ status: 'error', error: 'Password too small. Should be atleast 6 characters' })
    }

    const password = await bcrypt.hash(plainTextPassword, 10)

    try {
        const response = await User.create({
            username,
            password
        })
        console.log('User created successfully: ', response)
    } catch(error){
        if(error.code === 11000){
            return res.json({ status: 'error', error: 'Username already used'})
        }
        throw error
    }

    res.json({ status: 'ok' })
})

app.listen(3000, () => {
    console.log('Server up at 3000')
})