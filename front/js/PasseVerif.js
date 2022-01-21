console.log('script')
let secu=window.location.search.substring(1);
window.onload = verif()

//console.log(secu)

async function verif(){
    const result = await fetch('/verify', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nCarteVitale: secu,
            token: localStorage.getItem('token')
        })
    }).then((res) => res.json())

    if(result.data.pass === true){
        // passe
        //alert('passe')
        document.getElementsByClassName('bloc1')[0].style.background = 'rgba(0, 255, 0, 0.75)'
        document.getElementById('nomPrenom').innerHTML = result.data.prenom + ' ' + result.data.nom
    } 
    if(result.data.pass === false){
        // passe pas
        //alert('passe pas')
        document.getElementsByClassName('bloc1')[0].style.background = 'rgba(255, 0, 0, 0.75)'
        document.getElementById('nomPrenom').innerHTML = result.data.prenom + '<br>' + result.data.nom
    }
    if(result.data.pass === null){
        // inconnu
        document.getElementsByClassName('bloc1')[0].style.background = 'rgba(255, 0, 0, 0.75)'
        document.getElementById('nomPrenom').innerHTML = 'Non reconnu'
    }
}