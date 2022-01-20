async function getInfo(){
    const result = await fetch('/getInfosHisto', {
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

    const vaccin = result.data.vaccin
    const test = result.data.test

    document.getElementById('persoNomPrenom').innerHTML = result.data.name + '<br>' + result.data.prenom
    document.getElementById('persoDNaissance').innerHTML = 'Date de naissance : ' + dNaissance
    document.getElementById('persoTypeVaccin').innerHTML = result.data.typeVaccin
    document.getElementById('persoDVaccin').innerHTML = result.data.dateVaccin
}