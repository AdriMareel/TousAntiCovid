const express = require('express')
const router = express.Router()

//handle get requests and render the appropriate pages
router.get('/login', (req, res)=>{
    res.render('login')
})
router.get('/register', (req, res)=>{
    res.render('register')
})

//handle post requests
router.post('/register', (req, res)=>{

})
router.post('/login', (req, res)=>{

})

//handle logout
router.get('/logout', (req, res)=>{

})

module.exports = router