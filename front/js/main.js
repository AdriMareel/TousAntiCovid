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
    const nivAutorisation = 1

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




//partie création HTML
const { jsPDF } = require("jspdf"); // will automatically load the node version
let fs=require('fs');
const doc = new jsPDF();
var imgData = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHQAAAB0CAYAAABUmhYnAAAAAklEQVR4AewaftIAAAKsSURBVO3BQW7kQAwEwSxC//9yro88NSBIM2sTjIg/WGMUa5RijVKsUYo1SrFGKdYoxRqlWKMUa5RijVKsUYo1SrFGKdYoxRrl4qEkfJNKl4QTlS4JncpJEr5J5YlijVKsUYo1ysXLVN6UhDtUuiS8SeVNSXhTsUYp1ijFGuXiw5Jwh8oTSehUuiS8KQl3qHxSsUYp1ijFGuXij1M5ScJJEjqVv6xYoxRrlGKNcvHHJeFE5SQJkxRrlGKNUqxRLj5M5ZNU7kjCm1R+k2KNUqxRijXKxcuS8E1J6FS6JHQqXRLuSMJvVqxRijVKsUaJPxgkCZ1Kl4QTlb+sWKMUa5RijXLxUBI6lZMk/E8qXRK6JHQqJ0noVLok3KHyRLFGKdYoxRrl4j9TeSIJncoTKl0STlTuUPmkYo1SrFGKNcrFQypdEt6UhCeS0Kl0KneonCThjiR0Kk8Ua5RijVKsUeIPXpSEE5WTJHQqJ0l4QqVLQqdykoROpUvCicqbijVKsUYp1igXH6bSJeFEpUtCp9KpdEk4UXkiCSdJ6FS6JHxSsUYp1ijFGiX+4A9LQqdyRxI6lTuS0Kl0SbhD5YlijVKsUYo1ysVDSfgmlZMknKjckYQ7knCi8knFGqVYoxRrlIuXqbwpCU+odEk4ScI3JaFTeaJYoxRrlGKNcvFhSbhD5X9SOUlCp9IloVPpktCpvKlYoxRrlGKNcjGMSpeEE5UuCScqJyonKp9UrFGKNUqxRrn441S6JNyRhBOVkyR0Kl0S7lB5olijFGuUYo1y8WEq36TSJeEOlS4JnUqn8psUa5RijVKsUS5eloRvSkKn0qm8KQknKp3KNxVrlGKNUqxR4g/WGMUapVijFGuUYo1SrFGKNUqxRinWKMUapVijFGuUYo1SrFGKNUqxRvkHv7QE9MppxbsAAAAASUVORK5CYII=';
doc.text("Nom", 80, 190);
doc.text("Prénom",80,200 );
doc.addImage(imgData, 'JPEG', 40, 30, 150, 150);
doc.save("Passe.pdf");

//partie création HTML
let id=1;
let content='<html><body><h3>Nom</h3><h3>Prénom</h3><img src="'+imgData+'" alt="QrCode"></body></html>';
fs.writeFile('../html/Passe'+id+'.html',content,function(err){
    if(err) throw err;
    console.log('ff');
});
let addVaccinForm = document.getElementById('addVaccinForm')
if(addVaccinForm) addVaccinForm.addEventListener('submit', addVaccin)

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



let disco = document.getElementById("disconnect")

if(disco) disco.addEventListener("click", function() {
    localStorage.removeItem('token')
    // Test contenu localStorage event
    console.log(localStorage)
});

// Test contenu localStorage main
console.log(localStorage)
