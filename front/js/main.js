let proSante = document.getElementById('proSante')
let disco = document.getElementById('disconnect')
let connect = document.getElementById('connect')
let create = document.getElementById('create')
let importer = document.getElementById('importer')

autorisation()

async function autorisation(){
    const result = await fetch('/autorisation', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            token: localStorage.getItem('token'),
            page: window.location.href.split('/').pop()
        })
    }).then((res) => res.json())

    if(result.status === 'ok'){
        // passe
    } 
    if(result.status === 'pas ok'){
        // passe pas
        window.location.href = "../../"
    }
}

if(proSante) proSante.addEventListener("change",  function() {
    displaynone(importer)
})

if(!localStorage.getItem("token")) {
    disco.parentNode.parentNode.removeChild(disco.parentNode);
}

if(localStorage.getItem("token")) {
    connect.parentNode.parentNode.removeChild(connect.parentNode);
}

if(localStorage.getItem("token")) {
    create.parentNode.parentNode.removeChild(create.parentNode);
}

function displaynone(elem){
    if (elem.style.display == "none"){
        elem.style.display = "block"
    } else {
        elem.style.display = "none"
    }
}

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
    let nivAutorisation
    if(document.getElementById('proSante').checked == true) {
        nivAutorisation = 2
    } else {
        nivAutorisation = 1
    }

    const tabID = ['nCarteVitale','password','passwordVerif','nom','prenom','dNaissance','email','nTel']

    tabID.forEach(element => {
        inputRouge(element, false);
    });
    
    const result = await fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nCarteVitale, password, passwordVerif, nom, prenom, dNaissance, email, nTel, nivAutorisation
        })
    }).then((res) => res.json())

    if(result.status === 'ok'){
        console.log('User successfully created')
        console.log(window.location.host)
        window.location.href = 'http://'+window.location.host+'/login'
    } else {
        console.log(result.error)
        let tmp = result.error
        tmp.forEach(element=>{
            inputRouge(element, true)
        })
    }

}


let logForm = document.getElementById('logForm')
if(logForm) logForm.addEventListener('submit', loginUser)

async function loginUser(event){
    event.preventDefault()
    const nCarteVitale = document.getElementById('nCarteVitale').value
    const password = document.getElementById('password').value

    inputRouge("nCarteVitale", false)
    inputRouge("password", false)

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
        window.location.href = 'http://'+window.location.host+'/pagePerso'
    } else {
        let tmp = result.error
        tmp.forEach(element =>{
            if(element == "password" || element == "nCarteVitale"){
                inputRouge(element, true)
                document.getElementById(element).style.borderColor = "red";
            }
            if(element == "noAccount"){
                inputRouge("nCarteVitale", true)
                inputRouge("password", true)
            }
            
        })
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

let addVaccinForm = document.getElementById('addVaccinForm')
if(addVaccinForm) addVaccinForm.addEventListener('submit', addVaccin)

async function addVaccin(event){
    console.log("test")
    event.preventDefault()
    const nCarteVitale = document.getElementById('nCarteVitale').value
    const name = document.getElementById('name').value

    const result = await fetch('/vaccin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nCarteVitale: nCarteVitale,
            name: name,
            token: localStorage.getItem('token')
        })
    }).then((res) => res.json())

    if(result.status === 'ok'){
        console.log('Ajout d\'un vaccin')
        window.location.href = "../professionnel"
    } else {
        alert(result.error)
    }
}


let addTestUser = document.getElementById('addTestUser')
if(addTestUser) addTestUser.addEventListener('submit', addTest1)

async function addTest1(event){
    event.preventDefault()
    const nCarteVitale = document.getElementById('nCarteVitale').value
    const resultat = document.getElementById('resultat').value
    const type = document.getElementById('type').value
    const date = document.getElementById('date').value

    const result = await fetch('/addTestUser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nCarteVitale: nCarteVitale,
            resultat: resultat,
            type: type,
            date: date,
            token: localStorage.getItem('token')
        })
    }).then((res) => res.json())

    if(result.status === 'ok'){
        alert('Ajout d\'un test')
        window.location.href = "../professionnel"
    } else {
        alert(result.error)
    }
}

let CasContact = document.getElementById('CasContact')
if(CasContact) CasContact.addEventListener('submit', DeclareCasContact)

async function DeclareCasContact(event){
    event.preventDefault()

    const nCarteVitale = document.getElementById('nCarteVitale').value
    console.log(document.getElementById('nCarteVitale').value)
    const nom = document.getElementById('nom').value
    const prenom = document.getElementById('prenom').value

    const result = await fetch('/CasContact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nCarteVitale: nCarteVitale,
            nom: nom,
            prenom: prenom,
            token: localStorage.getItem('token')
        })
    }).then((res) => res.json())

    if(result.status === 'ok'){
        console.log('Ajout de cas contact')
    } else {
        alert(result.error)
    }
}



if(disco) disco.addEventListener("click", function() {
    localStorage.removeItem('token')
    // Test contenu localStorage event
    console.log(localStorage)
});

function inputRouge(id, rouge){
    if(rouge){
        document.getElementById(id).style.borderColor = "red";
        document.getElementById(id).style.boxShadow = "0px 0px 5px red";
    }
    else{
        document.getElementById(id).removeAttribute("style", "borderColor")
        document.getElementById(id).removeAttribute("style", "boxShadow")
    }
}

// Test contenu localStorage main
console.log(localStorage)
