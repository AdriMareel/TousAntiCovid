window.onload = getInfo()

async function getInfo(){
    const result = await fetch('/getInfo', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            token: localStorage.getItem('token'),
            url: window.location.host
        })
    }).then((res) => res.json())

    console.log(result.data)

    const dNaissance = result.data.dNaissance.split('-').reverse().join('/')
    const typeVaccin = result.data.typeVaccin
    const dateVaccin = result.data.dateVaccin

    if(typeVaccin == "" || dateVaccin == ""){
        // modif pour schéma vaccinal incomplet
        /*

        */
    }

    document.getElementById('persoNomPrenom').innerHTML = result.data.name + '<br>' + result.data.prenom
    document.getElementById('persoDNaissance').innerHTML = 'Date de naissance : ' + dNaissance
    document.getElementById('persoTypeVaccin').innerHTML = result.data.typeVaccin
    document.getElementById('persoDVaccin').innerHTML = result.data.dateVaccin
}