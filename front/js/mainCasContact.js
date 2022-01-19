let counter = 0;

function ajoutCasContact(){
    var div = document.createElement("div");
    document.getElementById("inputCasContact").appendChild(div).setAttribute("id", "balise"+counter);               //se place dans div avec l'id inputCasContact
    document.getElementById("balise"+counter).innerHTML="Prénom : <input id='name"+counter+"'></input> Nom : <input id='nickname"+counter+"'></input> Numéro carte vitale : <input id='nbrVitale"+counter+"'></input>"
    counter++;
}

function deleteInput(){
    if(counter > 0){
        counter--;
    }
    
    let id = "balise"+counter;

    var sup = document.getElementById(id);
    sup.parentNode.removeChild(sup);
}

function submit(){
    let sub = true;
    let infoCasContact = new Array()
    if(counter != 0){
        for(let i = 0 ; i<counter; i++){
            let nameID = "name" + i;
            let nicknameID = "nickname"+i;
            let vitaleID = "nbrVitale"+i;
            
            let name = document.getElementById(nameID).value;
            if(isName(name)){infoCasContact.push(name);erreurInput(nameID, true)}else{sub = false;erreurInput(nameID, false)}

            let nickname = document.getElementById(nicknameID).value
            if(isName(nickname)){infoCasContact.push(nickname);erreurInput(nicknameID, true)}else{sub = false;erreurInput(nicknameID, false)}  
       
            let nbrCarteVitale = document.getElementById(vitaleID).value
            if(isNbrVital(nbrCarteVitale)){infoCasContact.push(nbrCarteVitale);erreurInput(vitaleID, true)}else{sub = false;erreurInput(vitaleID, false)}  
        }
    }

    let date = new Date()
    date = date.getDate()+"/"+date.getMonth()+1+"/"+date.getFullYear();
    infoCasContact.push(date);

    if(sub == true && counter > 0){
        console.log(infoCasContact)
    }
}



