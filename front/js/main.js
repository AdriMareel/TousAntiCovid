let regForm = document.getElementById('regForm')
if(regForm) regForm.addEventListener('submit', registerUser)

async function registerUser(event){
    event.preventDefault()
    const username = document.getElementById('username').value
    const password = document.getElementById('password').value

    const result = await fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username, password
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
    const username = document.getElementById('username').value
    const password = document.getElementById('password').value

    const result = await fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username, password
        })
    }).then((res) => res.json())

    if(result.status === 'ok'){
        console.log('Got the token: ', result.data)
        localStorage.setItem('token', result.data)
        console.log(localStorage, result.data)
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
    } else {
        alert(result.error)
    }
}

let disco = document.getElementById("sah")

if(disco) disco.addEventListener("click", function() {

    localStorage.removeItem('token');

  });