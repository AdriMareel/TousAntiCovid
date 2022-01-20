let proSante = document.getElementById('proSante')
let importer = document.getElementById('importer')

if(proSante) proSante.addEventListener("change",  function() {
    if (importer.style.display == "none"){
        importer.style.display = "block"
    } else {
        importer.style.display = "none"
    }
})

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
            if(elemet = "password" || element == "nCarteVitale"){
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
