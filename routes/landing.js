const express = require('express')
const router = express.Router()

//redirect to login page
router.get('/', (req, res)=>{
    res.render('welcome')
})

//redirect to register page
router.get('/register', (req, res)=>{
    res.render('register')
})

module.exports = router