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
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err))