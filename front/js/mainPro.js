function recupVaccin(){
    let infoVaccin = new Array();
    let sub = true;

    let prenom = document.getElementById("prenomVaccination").value
    if(isName(prenom)){infoVaccin.push(prenom); erreurInput("prenomVaccination", true)}else{sub = false;erreurInput("prenomVaccination", false)}
    
    let nom = document.getElementById("nomVaccination").value
    if(isName(nom)){infoVaccin.push(nom); erreurInput("nomVaccination", true)}else{sub = false;erreurInput("nomVaccination", false)}

    let nbrVital = document.getElementById("nbrVitalVaccination").value
    if(isNbrVital(nbrVital)){infoVaccin.push(nbrVital); erreurInput("nbrVitalVaccination", true)}else{sub = false;erreurInput("nbrVitalVaccination", false)}

    infoVaccin.push(document.getElementById("dose").value);
    infoVaccin.push(document.getElementById("vaccin").value);

    let date = new Date()
    infoVaccin.push(date.getDate()+"/"+date.getMonth()+1+"/"+date.getFullYear())

    if(sub == true){
        console.log(infoVaccin)
    }
}

function recupTest(){
    let infoTest = new Array();
    let sub = true; 

    let prenom = document.getElementById("prenomTest").value;
    if(isName(prenom)){infoTest.push(prenom); erreurInput("prenomTest", true)}else{sub = false;erreurInput("prenomTest", false)}

    let nom = document.getElementById("nomTest").value
    if(isName(nom)){infoTest.push(nom); erreurInput("nomTest", true)}else{sub = false;erreurInput("nomTest", false)}

    let nbrVital = document.getElementById("nbrVitalTest").value
    if(isNbrVital(nbrVital)){infoTest.push(nbrVital); erreurInput("nbrVitalTest", true)}else{sub = false;erreurInput("nbrVitalTest", false)}
    
    infoTest.push(document.getElementById("test").value);
    infoTest.push(document.getElementById("resultat").value);

    let date = new Date()
    infoTest.push(date.getDate()+"/"+date.getMonth()+1+"/"+date.getFullYear())

    if(sub == true){
        console.log(infoTest)
    }
}

