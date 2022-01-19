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

let disco = document.getElementById("disconnect")

if(disco) disco.addEventListener("click", function() {

    localStorage.removeItem('token');

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