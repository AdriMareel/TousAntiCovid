const express = require('express')
const router = express.Router()
const app = express()

const mongoose = require('mongoose') // npm install mongoose

// Connect to mongodb
/* A mettre en dessous de cont app = express()/
/ mongodb+srv://<username>:<password>@data.tr5qe.mongodb.net/myFirstDatabase?retryWrites=true&w=majority */
const mongodb = 'mongodb+srv://admin:admin123@data.tr5qe.mongodb.net/covid_data?retryWrites=true&w=majority'
//mongoose.connect(mongodb);
mongoose.connect(mongodb, { useNewUrlParser: true, useUnifiedTopology: true})
    //.then((result) => app.listen(3000))
    .then((result) => console.log("connected to database"))
    .catch((err) => console.log(err))

app.use(express.static(__dirname + '/public'));
//body parser
app.use(express.urlencoded({extended: false}))

//routes
app.use('/', require('./routes/landing.js'))
app.use('/users', require('./routes/users.js'))

app.listen(3000)