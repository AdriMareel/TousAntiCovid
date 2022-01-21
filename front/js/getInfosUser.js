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
    const tabVaccin = result.data.tabVaccin
    const tabTest = result.data.tabTest
    const tabContact = result.data.tabContact

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

    let date_actuel = new Date();
    const monthNames = ["janvier", "février", "mars", "avril", "mai", "juin",
        "juillet", "aout", "septembre", "octobre", "novembre", "decembre"];
// Si positif avec test
    if(tabTest.length != 0) {    
        let date_user = new Date(); // Date du test
        date_user.setDate(tabTest[tabTest.length-1].date.substr(8,2)); date_user.setMonth(tabTest[tabTest.length-1].date.substr(5,2)-1); date_user.setFullYear(tabTest[tabTest.length-1].date.substr(0,4));
            
        let isolement = new Date(); isolement.setDate(10);
        if(((date_user.getDate() + isolement.getDate()) >= date_actuel.getDate()+1) &&(date_user.getTime() + isolement.getTime() > date_actuel.getTime())) {
            console.log(date_user.getDate() + isolement.getDate() );

            document.getElementById('titre').innerText = "Vous êtes positif depuis le " + date_user.getDate() + " " + monthNames[date_user.getMonth()] + " " + date_user.getFullYear();
            let difference = isolement.getDate() - Math.abs(date_actuel.getDate() - date_user.getDate())
            document.getElementById('txt').innerText = "Veuillez rester isoler encore " + difference + " jours"
            document.getElementById('test').style.background = "linear-gradient(to right, #DC281E, #F00000)";

        }
    }
// Si vaccin invalide
   // let tabVaccin = new Array();
   // tabVaccin = ['21/12/2021', "21/06/2022"];
    let date_Vaccin= new Date();
    date_Vaccin.setDate(dateVaccin.substr(8,2)); date_Vaccin.setMonth(dateVaccin.substr(5,2)-1); date_Vaccin.setFullYear(dateVaccin.substr(0,4));

    // Si vaccin invalide (Soit 1 dose; Soit 2 mais il y a + de 6mois)
    if(((tabVaccin.length == 0 || tabVaccin.length == 1 || tabVaccin.length == 2 && (date_actuel.getTime() - date_Vaccin.getTime()) / (1000 * 3600 * 24) > 183) && ((typeof date_user === 'undefined') || (date_actuel.getTime() - date_user.getTime()) / (1000 * 3600 * 24) > 183)) && (date_Vaccin.getTime()+7 > date_actuel.getTime())){
        document.getElementById('titre').innerText = "Votre pass sanitaire n'est pas valide";
        if(tabVaccin.length == 0)
            document.getElementById('txt').innerText = "Vous n'êtes pas vacciné";
        if(tabVaccin.length == 1)
            document.getElementById('txt').innerText = "Vous n'avez qu'une dose, veuillez faire la deuxième.";
        if(tabVaccin.length == 2)
            document.getElementById('txt').innerText = "Votre deuxième dose date de plus de 6 mois, veuillez faire votre dose de rappel.";

        document.getElementById('test').style.background = "linear-gradient(to right, #DC281E, #F00000)";
    }
// Si Cas contact
    if(tabContact.length != 0) {    
        let date_contact = new Date(); // Date du test
        date_contact.setDate(tabContact[tabContact.length-1].date.substr(8,2)); date_contact.setMonth(tabContact[tabContact.length-1].date.substr(5,2)-1); date_contact.setFullYear(tabContact[tabContact.length-1].date.substr(0,4));
        let isolementc = new Date(); isolementc.setDate(7);
        // Si schéma vaccinale incomplet et pas eus le covid en 6mois : isolement 7 jours + test
        if((date_actuel.getTime() - date_contact.getTime() )/ (1000 * 3600 * 24) < 7&& ((tabVaccin.length == 1 || (tabVaccin.length == 2 && (date_actuel.getTime() - date_Vaccin.getTime()) / (1000 * 3600 * 24) > 183 ))) && ((typeof date_user === 'undefined') || ((date_actuel.getTime() - date_user.getTime()) / (1000 * 3600 * 24) > 183) )) {
            document.getElementById('titre').innerText = "Vous avez été déclaré cas contact le " + date_contact.getDate() + " " + monthNames[date_contact.getMonth()] + " " + date_contact.getFullYear();
            let difference = isolementc.getDate() - Math.abs(date_actuel.getDate() - date_contact.getDate())
            document.getElementById('txt').innerText = "Votre schéma vaccinale est incomplet, veuillez rester isoler encore " + difference + " jours, puis réalisez un test de dépistage RT-PCR";
            document.getElementById('test').style.background = "linear-gradient(to right, #f7b733, #fc4a1a)";
        }
        // Si schéma vaccinale complet ou a attrapé le covid dans les 6mois
        if(((date_actuel.getTime() - date_contact.getTime() )/ (1000 * 3600 * 24) <7 ) && ((tabVaccin.length == 3 || (tabVaccin.length == 2 && (date_actuel.getTime() - date_Vaccin.getTime()) / (1000 * 3600 * 24) < 183 )) || ((date_actuel.getTime() - date_user.getTime()) / (1000 * 3600 * 24) < 183) )) {
            document.getElementById('titre').innerText = "Vous avez été déclaré cas contact le " + date_contact.getDate() + " " + monthNames[date_contact.getMonth()] + " " + date_contact.getFullYear();
            document.getElementById('txt').innerText = "Veuillez réaliser un test de dépistage RT-PCR";
            document.getElementById('test').style.background = "linear-gradient(to right, #f7b733, #fc4a1a)";
        }
    }


    if (date_actuel.getMonth() < 10)
        document.getElementById('maj').innerText = "Mis à jour le : " + date_actuel.getDate() + "/" + "0" + (date_actuel.getMonth() + 1) + "/" + date_actuel.getFullYear();
    else
        document.getElementById('maj').innerText = "Mis à jour le : " + date_actuel.getDate() + "/" + (date_actuel.getMonth() + 1) + "/" + date_actuel.getFullYear();
}


let button = document.getElementById('cmd')
button.addEventListener('click', () => {
    pdf.save(nameFileQrCode)
})