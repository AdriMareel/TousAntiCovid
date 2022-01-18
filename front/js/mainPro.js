function recupVaccin(){
    let infoVaccin = new Array();
    infoVaccin.push(document.getElementById("prenomVaccination").value);
    infoVaccin.push(document.getElementById("nomVaccination").value);
    infoVaccin.push(document.getElementById("nbrVitalVaccination").value);
    infoVaccin.push(document.getElementById("dose").value);
    infoVaccin.push(document.getElementById("vaccin").value);

    let date = new Date()
    infoVaccin.push(date.getDate()+"/"+date.getMonth()+1+"/"+date.getFullYear())

    console.log(infoVaccin)
}

function recupTest(){
    let infotest = new Array();
    infotest.push(document.getElementById("prenomTest").value);
    infotest.push(document.getElementById("nomTest").value);
    infotest.push(document.getElementById("nbrVitalTest").value);
    infotest.push(document.getElementById("test").value);
    infotest.push(document.getElementById("resultat").value);

    let date = new Date()
    infotest.push(date.getDate()+"/"+date.getMonth()+1+"/"+date.getFullYear())

    console.log(infotest)
}