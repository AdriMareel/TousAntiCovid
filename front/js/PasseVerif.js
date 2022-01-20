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

    if(result.status === 'ok'){
        // passe
        alert('ok')
    } 
    if(result.status === 'pas ok'){
        // passe pas
        alert('pas ok')
    }
    if(result.status === 'inconnu'){
        // inconnu
        alert('inconnu')
    }
}