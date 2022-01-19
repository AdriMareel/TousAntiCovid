let regForm = document.getElementById('regForm')
if(regForm) regForm.addEventListener('submit', registerUser)

async function registerUser(event){
    event.preventDefault()
    const nCarteVitale = document.getElementById('nCarteVitale').value
    const password = document.getElementById('password').value
    const nom = document.getElementById('nom').value
    const prenom = document.getElementById('prenom').value
    const dNaissance = document.getElementById('dNaissance').value
    const email = document.getElementById('email').value
    const nTel = document.getElementById('nTel').value

    const result = await fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nCarteVitale, password, nom, prenom, dNaissance, email, nTel
        })
    }).then((res) => res.json())

    if(result.status === 'ok'){
        alert('User successfully created')
    } else {
        alert(result.error)
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



let addVaccinForm = document.getElementById('addVaccinForm')
if(addVaccinForm) addVaccinForm.addEventListener('submit', addVaccin)

async function addVaccin(event){
    event.preventDefault()
    const date = document.getElementById('date').value
    const nCarteVitale = document.getElementById('nCarteVitale').value

    const result = await fetch('/vaccin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            newdate: date,
            nCarteVitale: nCarteVitale,
            token: localStorage.getItem('token')
        })
    }).then((res) => res.json())

    if(result.status === 'ok'){
        console.log('Ajout d\'un vaccin')
    } else {
        alert(result.error)
    }
}

let disco = document.getElementById("disconnect")

if(disco) disco.addEventListener("click", function() {
    localStorage.removeItem('token')
    // Test contenu localStorage event
    console.log(localStorage)
});

// Test contenu localStorage main
console.log(localStorage)