const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema(
    {
        // informations utilisateur
        nCarteVitale: { type: String, required: true, unique: true },
        password:     { type: String, required: true },
        nom:          { type: String, required: true },
        prenom:       { type: String, required: true },
        dNaissance:   { type: String, required: true },
        email:        { type: String, required: true },
        nTel:         { type: String, required: true },

        // à ajouter : niveau d'autorisation
        /*
        nivAutorisation: { type: Number ? required: true }
            1 : Utilisateur lambda
            2 : Professionnel de santé
            3 : Gouvernement
            4 : admin ?
        */

        // à ajouter : vaccins
        
        vaccins:      [{
            numero:   { type: Number },
            name:     { type: String },
            date:     { type: String }  // année-mois-jour-heure-minute
        }],
        

        // à ajouter : tests (pcr, antigénique)
        /*
        tests:        [{
            numero:   { type: Number },
            typeTest: { type: String },
            date:     { type: String },
            result:   { type: String }
        }]
        */
        token:        { type: String },
    }, 
    { collection: 'users' }
)

const model = mongoose.model('UserSchema', UserSchema)

module.exports = model