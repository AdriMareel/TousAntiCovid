const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const User = require('./back/model/user') 
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const ToQRCode = require('./back/modules/toQRCode.js')



const JWT_SECRET = 'zekljazifjziogjaioeh8O34U_hhozreuhuhu_8_çt_7T8gf'

const mongodb = 'mongodb+srv://admin:admin@datacovid.gqdpj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
//const mongodb = 'mongodb+srv://admin:admin@datacovid.gqdpj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
//const mongodb = 'mongodb://Admin:Admin123@192.168.252.87:27017/covid_data?authSource=admin';
mongoose.connect(mongodb, { useNewUrlParser: true, useUnifiedTopology: true })
    //.then((result) => app.listen(3000))
    .then((result) => console.log("connected to database"))
    .catch((err) => console.log(err))


app.use('/', express.static(__dirname + '/front'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/front/html/home.html')
})

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/front/html/login.html')
})

app.get('/professionnel', (req, res) => {
    res.sendFile(__dirname + '/front/html/professionnel.html')
})

app.get('/professionnel/vaccination', (req, res) => {
    res.sendFile(__dirname + '/front/html/professionnel-vaccination.html')
})

app.get('/professionnel/test', (req, res) => {
    res.sendFile(__dirname + '/front/html/professionnel-test.html')
})


app.get('/register', (req, res) => {
    res.sendFile(__dirname + '/front/html/register.html')
})

app.get('/change-password', (req, res) => {
    res.sendFile(__dirname + '/front/html/change-password.html')
})

app.get('/pagePerso', (req, res) => {
    res.sendFile(__dirname + '/front/html/pagePerso.html')
})
app.get('/vaccin', (req, res) => {
    res.sendFile(__dirname + '/front/html/vaccin.html')
})

app.get('/addTestUser', (req, res) => {
    res.sendFile(__dirname + '/front/html/addTestUser.html')
})

app.get('/pass', (req, res) => {
    res.sendFile(__dirname + '/front/html/VerifPasse.html')
})

app.get('/CasContact', (req, res) => {
    res.sendFile(__dirname + '/front/html/CasContact.html')
})

app.use(bodyParser.json())

app.post('/change-password', async (req, res) => {
    const { token, newpassword: plainTextPassword } = req.body
    try{
        const user = jwt.verify(token, JWT_SECRET)

        console.log(user)

        const _id = user.id
        const password = await bcrypt.hash(plainTextPassword, 10)
        await User.updateOne({ _id }, { $set: { password }})
        res.json({ status: 'ok' })
    }
    catch(error){
        res.json({ status: 'error', error: '(:'})
    }
})

// Login
app.post('/login', async (req, res) => {
    // Get user input
    const { nCarteVitale, password } = req.body
    let tabErreur = new Array()

    // Find username in database
    const user = await User.findOne({ nCarteVitale }).lean()

    // If user exist
    if(!user){
        tabErreur.push('noAccount')
    }
    if(!isNbrVital(nCarteVitale)){
        tabErreur.push('nCarteVitale')
    }
    if(!password){
        tabErreur.push('password')
    }

    if(tabErreur.length != 0){
        console.log(tabErreur)
        return res.json({ 
            status: 'error', 
            error: tabErreur
        })
    }

    if(await bcrypt.compare(password, user.password)){
        // Create token
        const token = jwt.sign({ 
            id: user._id, 
            nCarteVitale: user.nCarteVitale 
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
    const { nCarteVitale, password: plainTextPassword,passwordVerif: plainTextPasswordVerif, nom, prenom, dNaissance, email, nTel, nivAutorisation } = req.body

    let tabErreur = new Array();
    // Validate user input
    // à ajouter : nom, prenom, dNaissance, email, nTel, nivAutorisation
    if(!dNaissance){
        tabErreur.push("dNaissance")
    }
    if(!nom || typeof nom != 'string' || !isName(nom)){
        tabErreur.push('nom')
    }
    if(!prenom || typeof prenom != 'string' || !isName(prenom)){
        tabErreur.push('prenom') 
    }
    if(!nTel || typeof nTel != 'string' || !isNbrTel(nTel)){
        tabErreur.push('nTel') 
    }
    if(!nCarteVitale || typeof nCarteVitale != 'string' || !isNbrVital(nCarteVitale)){
        tabErreur.push('nCarteVitale') 
    }
    if(!email || typeof email != 'string' || !isEmail(email)){
        tabErreur.push('email') 
    }
    if(!plainTextPassword || typeof plainTextPassword != 'string' || plainTextPassword.length < 6){
        tabErreur.push('password') 
    }
    if(plainTextPassword != plainTextPasswordVerif || !plainTextPasswordVerif){
        tabErreur.push('passwordVerif') 
    }

    if(tabErreur.length != 0){
        return res.json({ 
            status: 'error', 
            error: tabErreur
        })
    }

    // Encrypt user password
    const password = await bcrypt.hash(plainTextPassword, 10)

    // Find username in database
    const user = await User.findOne({ nCarteVitale }).lean()

    // If user not exist
    if (!user) {
            

    // Try to create user in the database
        try {
            const response = await User.create({
                nCarteVitale,
                password,
                nom,
                prenom,
                dNaissance,
                email,
                nTel,
                nivAutorisation
            })
            console.log('User created successfully: ', response)

            // Create token
            const token = jwt.sign({ 
                id: response._id, 
                nCarteVitale: response.nCarteVitale 
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
    }

    else{
            const response = await User.updateOne({ nCarteVitale }, {$set: { password, nom, prenom, dNaissance, email, nTel, nivAutorisation } })
            res.json({ status: 'ok' })
            console.log('User changed successfully: ', response)
    }
})

// ADD VACCIN
app.post('/vaccin', async (req, res) => {

    // Get user input
    const { token, nCarteVitale, name } = req.body

    let newdate = new Date()
        newdate = newdate.getFullYear()+"-"+newdate.getMonth()+1+"-"+newdate.getDate()

    // Validate user input
    if (!nCarteVitale || typeof nCarteVitale != 'string') {
        return res.json({
            status: 'error',
            error: 'Invalid carte'
        })
    }

    // Find username in database
    const user = await User.findOne({ nCarteVitale }).lean()
    console.log(user)

    // If user exist
    if (!user) {
        return res.json({
            status: 'error',
            error: 'Invalid username/password'
        })
    }


    await User.updateOne({ nCarteVitale }, { $addToSet: { vaccins: { name : name, date: newdate} } })
    res.json({ status: 'ok' })
})

// Add Test User
app.post('/addTestUser', async (req, res) => {

    // Get user input
    const {nCarteVitale, resultat, type, token } = req.body
    let date = new Date()
        date = date.getFullYear()+"-"+date.getMonth()+1+"-"+date.getDate()

    // Validate user input
    if (!nCarteVitale || typeof nCarteVitale != 'string') {
        return res.json({
            status: 'error',
            error: 'Invalid carte'
        })
    }

    // Find username in database
    const user = await User.findOne({ nCarteVitale }).lean()
    console.log(user)

    // If user exist
    if (!user) {
        return res.json({
            status: 'error',
            error: 'Vous n\'êtes pas connecté.e'
        })
    }


    console.log(nCarteVitale, resultat, date, type)

    // Try to add vaccin in the database
    await User.updateOne({ nCarteVitale }, { $addToSet: { tests: { typeTest : type, date: date, result : resultat} } })
    res.json({ status: 'ok' })

})

app.post('/verify', async (req, res) => {
    const { token, nCarteVitale } = req.body
    const user = await User.findOne({ nCarteVitale }).lean()
    //console.log(nCarteVitale)
    if(user) {
        console.log(user.vaccins.length)
        if(user.vaccins.length != 0){
            const dateVaccin = Date.parse(user.vaccins[user.vaccins.length - 1].date)
            const date = new Date()
            console.log(date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate())
            const dateNow = Date.parse(date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate())

            console.log(dateNow + ' = date maintenant')
            console.log(dateVaccin + ' = date dernier vaccin')
            console.log((dateNow - dateVaccin)/(3600*24*1000))
            if((dateNow - dateVaccin)/(3600*24*1000) < 14 || (dateNow - dateVaccin)/(3600*24*1000) > 7*31){
                res.json({ status: 'pas ok' })
            } else {
                res.json({ status: 'ok' })
            }
        } else {
            res.json({ status: 'pas ok' })
        }
    }
    if(!user) {
        res.json({ status: 'inconnu' })
    } 
})


app.post('/getInfo', async (req, res) => {
    const { token, url } = req.body
    try{
        const user = jwt.verify(token, JWT_SECRET)
        //console.log(user)
        const _id = user.id
        const infoUser = await User.findOne({ _id })
        console.log(infoUser)
        let typeVaccin
        let dateVaccin
        let urlQrCode
        if(infoUser.vaccins.length != 0){
            typeVaccin = infoUser.vaccins[infoUser.vaccins.length - 1].name
            dateVaccin = infoUser.vaccins[infoUser.vaccins.length - 1].date
            urlQrCode = 'http://'+url+'/VerifPasse?'+infoUser.nCarteVitale
        } else {
            typeVaccin = ""
            dateVaccin = ""
            urlQrCode = ""
        }

        //const qr = ToQRCode('http://'+url+'/VerifPasse?'+infoUser.nCarteVitale)
        //console.log(qr)

        const infoUserToSend = {
            name: infoUser.nom,
            prenom: infoUser.prenom,
            dNaissance: infoUser.dNaissance,
            typeVaccin: typeVaccin,
            dateVaccin: dateVaccin,
            urlQrCode: urlQrCode
        }
        console.log(infoUserToSend)
        res.json({ status: 'ok', data: infoUserToSend })
    }
    catch(error){
        res.json({ status: 'error', error: '(:'})
    }
})


// DECLARE CAS CONTACT
// Add Test User
app.post('/CasContact', async (req, res) => {
    // Get user input
    const {nCarteVitale, nom, prenom, token } = req.body
    console.log(nCarteVitale + ' iindex')
    const user = await User.findOne({ nCarteVitale }).lean()
    // Si pas de compte, création dans BDD
    console.log(user)
    if(!user){
        // Try to create user in the database
        const response = await User.create({
            nCarteVitale: nCarteVitale,
            password: "0",
            nom: nom,
            prenom: prenom,
            dNaissance: "0",
            email: "0",
            nTel: "0",
            nivAutorisation: 1
        })
        console.log('User created successfully: ', response)
        res.json({ status: 'ok' })
    }
    else{
        let date = new Date()
        date = date.getFullYear()+"-"+date.getMonth()+1+"-"+date.getDate()
        await User.updateOne({ nCarteVitale }, { $addToSet: {contacts: { date: date }}})
        res.json({ status: 'ok' })
    }
})

app.listen(3000, () => {
    console.log('Server up at 3000')
})

// Test génération QR code
//ToQRCode('http://'+window.location.host+'/VerifPasse?' + 'zzzzzz')


function isName(stringTest){
    if (stringTest.match(/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u)){
        return true
    }
    else{
        return false
    }
}

function isNbrVital(stringtest){
    if(stringtest.match(/^[1|2]([0-9]{2})(0[1-9]|1[0-2]|62|63)(2[ABab]|[0-9]{2})(00[1-9]|0[1-9][0-9]|[1-8][0-9]{2}|9[0-8][0-9]|990)(00[1-9]|0[1-9][0-9]|[1-9][0-9]{2})(0[1-9]|[1-8][0-9]|9[0-7])$/)){
        return true
    }
    else{
        return false
    }
}

function isNbrTel(stringTest){
    if(stringTest.match(/(0|\\+33|0033)[1-9][0-9]{8}$/)){
        return true
    }
    else{
        return false
    }
}

function isEmail(stringTest){
    if(stringTest.match(/[a-zA-Z\.]*@[a-zA-Z\.]*$/)){
        return true
    }
    else{
        return false
    }
}
