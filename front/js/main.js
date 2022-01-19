let regForm = document.getElementById('regForm')
if(regForm) regForm.addEventListener('submit', registerUser)

async function registerUser(event){
    event.preventDefault()
    const nCarteVitale = document.getElementById('nCarteVitale').value
    const password = document.getElementById('password').value
    const passwordVerif = document.getElementById('passwordVerif').value
    const nom = document.getElementById('nom').value
    const prenom = document.getElementById('prenom').value
    const dNaissance = document.getElementById('dNaissance').value
    const email = document.getElementById('email').value
    const nTel = document.getElementById('nTel').value
    const nivAutorisation = 1

    if (password == passwordVerif) {
        if (isName(nom)) {
            erreurInput(nom, true)
            if (isNbrTel(nTel)) {
                erreurInput(nTel, true)
                if (isNbrVital(nCarteVitale)) {
                    erreurInput(nCarteVitale, true)        
                    const result = await fetch('/register', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            nCarteVitale, password, nom, prenom, dNaissance, email, nTel, nivAutorisation
                        })
                    }).then((res) => res.json())

                    if(result.status === 'ok'){
                        alert('User successfully created')
                    } else {
                        alert(result.error)
                    }
                } else {
                    erreurInput('nCarteVitale', false)
                    alert("Carte vitale invalide !")
                }
            } else {
                erreurInput('nTel', false)
                alert("Numéro de téléphone invalide !")
            }
        } else {
            erreurInput('nom', false)
            alert("Le nom est invalide !")
        }
    } else {
        erreurInput('passwordVerif', false)
        erreurInput('password', false)
        alert("Les mots de passe ne correspondent pas !")
    }

}


let logForm = document.getElementById('logForm')
if(logForm) logForm.addEventListener('submit', loginUser)

async function loginUser(event){
    event.preventDefault()
    const nCarteVitale = document.getElementById('nCarteVitale').value
    const password = document.getElementById('password').value

    const result = await fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nCarteVitale, password
        })
    }).then((res) => res.json())

    if(result.status === 'ok'){
        console.log('Got the token: ', result.data)
        localStorage.setItem('token', result.data)
    } else {
        alert(result.error)
    }
}



let changeForm = document.getElementById('changeForm')
if(changeForm) changeForm.addEventListener('submit', changePassword)

async function changePassword(event){
    event.preventDefault()
    const password = document.getElementById('password').value

    const result = await fetch('/change-password', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            newpassword: password,
            token: localStorage.getItem('token')
        })
    }).then((res) => res.json())

    if(result.status === 'ok'){
        console.log('Successfully changed the password')
        // Remove le token lors du changement de mdp pour redirect au login
        localStorage.removeItem('token')
    } else {
        alert(result.error)
    }
}

let disco = document.getElementById("disconnect")

if(disco) disco.addEventListener("click", function() {

    localStorage.removeItem('token');

});

async function addVaccin(event){
    event.preventDefault()
    const date = document.getElementById('date').value
    const nCarteVitale = document.getElementById('nCarteVitale').value
    const name = document.getElementById('name').value

    const result = await fetch('/vaccin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            newdate: date,
            nCarteVitale: nCarteVitale,
            name: name,
            token: localStorage.getItem('token')
        })
    }).then((res) => res.json())

    if(result.status === 'ok'){
        console.log('Ajout d\'un vaccin')
    } else {
        alert(result.error)
    }
}


let addTestUser = document.getElementById('addTestUser')
if(addTestUser) addTestUser.addEventListener('submit', addTest1)

async function addTest1(event){
    event.preventDefault()
    const nCarteVitale = document.getElementById('nCarteVitale').value
    const date = document.getElementById('date').value
    const resultat = document.querySelector('input[name=resultat]:checked').value
    const type = document.getElementById('type').value

    const result = await fetch('/addTestUser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nCarteVitale: nCarteVitale,
            date: date,
            resultat: resultat,
            type: type,
            token: localStorage.getItem('token')
        })
    }).then((res) => res.json())

    if(result.status === 'ok'){
        console.log('Ajout d\'un test')
    } else {
        alert(result.error)
    }
}

if(disco) disco.addEventListener("click", function() {
    localStorage.removeItem('token')
    // Test contenu localStorage event
    console.log(localStorage)
});

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
    if(stringTest.match(/(0|\\+33|0033)[1-9][0-9]{8}/)){
        return true
    }
    else{
        return false
    }
}

function erreurInput(id, valide){
    if(valide){
        document.getElementById(id).removeAttribute("style", "borderColor")
    }
    else{
        document.getElementById(id).style.borderColor = "red";
    }
}

// Test contenu localStorage main
console.log(localStorage)
<<<<<<< HEAD
=======







/*
document.addEventListener('onload', verif)

async function verif(event){

    const result = await fetch('/verify', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            newpassword: nCarteVitale,
            token: localStorage.getItem('token')
        })
    }).then((res) => res.json())

    if(result.status === 'ok'){
        console.log('verified')
    } else {
        alert(result.error)
    }
}*/
>>>>>>> backEnd_Loïc
