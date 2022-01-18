const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const User = require('./back/model/user') 
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const ToQRCode = require('./back/modules/toQRCode.js');



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

app.get('/change-password', (req, res) => {
    res.sendFile(__dirname + '/front/html/change-password.html')
})

app.use(bodyParser.json())

app.post('/change-password', async (req, res) => {
    const { token, newpassword: plainTextPassword } = req.body
    try{
        const user = jwt.verify(token, JWT_SECRET)
        const _id = user.id
        const password = await bcrypt.hash(plainTextPassword, 10)
        await User.updateOne({ _id }, { $set: { password }})
        res.json({ status: 'ok' })
    }
    catch(error){
        res.json({ status: 'error', error: '(:'})
    }
    res.json({ status: 'ok' })
})

// Login
app.post('/login', async (req, res) => {
    // Get user input
    const { username, password } = req.body

    // Find username in database
    const user = await User.findOne({ username }).lean()

    // If user exist
    if(!user){
        return res.json({ 
            status: 'error', 
            error: 'Invalid username/password'
        })
    }

    if(await bcrypt.compare(password, user.password)){
        // Create token
        const token = jwt.sign({ 
            id: user._id, 
            username: user.username 
        }, 
        JWT_SECRET
        )

        // User
        return res.json({ 
            status: 'ok', 
            data: token
        })
    }

    res.json({ status: 'error', error: 'Invalid username/password' })
})

// Register
app.post('/register', async (req, res) => {

    // Get user input
    const { username, password: plainTextPassword } = req.body

    // Validate user input
    if(!username || typeof username != 'string'){
        return res.json({ 
            status: 'error', 
            error: 'Invalid username' 
        })
    }
    if(!plainTextPassword || typeof plainTextPassword != 'string'){
        return res.json({ 
            status: 'error', 
            error: 'Invalid password' 
        })
    }
    if(plainTextPassword.length < 6){
        return res.json({ 
            status: 'error', 
            error: 'Password too small. Should be atleast 6 characters' 
        })
    }

    // Encrypt user password
    const password = await bcrypt.hash(plainTextPassword, 10)

    // Try to create user in the database
    try {
        const response = await User.create({
            username,
            password
        })
        console.log('User created successfully: ', response)

        // Create token
        const token = jwt.sign({ 
            id: response._id, 
            username: response.username 
        }, 
        JWT_SECRET
        )

        res.json({ 
            status: 'ok',
            data: token
        })

    } catch(error){
        if(error.code === 11000){
            return res.json({ 
                status: 'error', 
                error: 'Username already used'
            })
        }
        throw error
    }
})

app.listen(3000, () => {
    console.log('Server up at 3000')
})