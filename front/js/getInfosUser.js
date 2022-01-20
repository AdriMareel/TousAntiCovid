window.onload = getInfo()

var pdf = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: [150, 150]
});
let nameFileQrCode

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
    const urlQrCode = result.data.urlQrCode

    nameFileQrCode = 'qrcode_' + dateVaccin + '.pdf' 

    if(typeVaccin == "" || dateVaccin == ""){
        // modif pour schéma vaccinal incomplet
        /*

        */
    }

    let qrcode = await new QRCode(document.getElementById("qr_code"), {
        text: urlQrCode,
        width: 128,
        height: 128,
        colorDark : "#000000",
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.H
    });

    let imgBase64Data = qrcode._oDrawing._elCanvas.toDataURL("image/png")
    console.log(imgBase64Data)

    pdf.addImage(imgBase64Data, 'png', 0, 0, 150, 150);

    document.getElementById('persoNomPrenom').innerHTML = result.data.name + '<br>' + result.data.prenom
    document.getElementById('persoDNaissance').innerHTML = 'Date de naissance : ' + dNaissance
    document.getElementById('persoTypeVaccin').innerHTML = result.data.typeVaccin
    document.getElementById('persoDVaccin').innerHTML = result.data.dateVaccin
}

let button = document.getElementById('cmd')
button.addEventListener('click', () => {
    pdf.save(nameFileQrCode)
})