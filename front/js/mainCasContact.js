let counter = 1;

function ajoutCasContact(){
    var div = document.createElement("div");
    document.getElementById("inputCasContact").appendChild(div).setAttribute("id", "balise"+counter);               //se place dans div avec l'id inputCasContact
    document.getElementById("balise"+counter).innerHTML="Prénom : <input id='name"+counter+"'></input> Nom : <input id='nickname"+counter+"'></input> Numéro carte vitale : <input id='nbrVital"+counter+"'></input>"
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


let sub = true;
let infoCasContact = new Array()
function submit(){
    if(counter != 0){
        for(let i = 0 ; i<counter; i++){
            let nameID = "name" + i;
            let nicknameID = "nickname"+i;
            let vitalID = "nbrVital"+i;
            
            let name = document.getElementById(nameID).value;
            if(isName(name)){infoCasContact.push(name);erreurInput(nameID, true)}else{sub = false;erreurInput(nameID, false)}

            let nickname = document.getElementById(nicknameID).value
            if(isName(nickname)){infoCasContact.push(nickname);erreurInput(nicknameID, true)}else{sub = false;erreurInput(nicknameID, false)}

            let nbrVital = document.getElementById(vitalID).value
            if(isNbrVital(nbrVital)){infoCasContact.push(nbrVital);erreurInput(vitalID, true)}else{sub = false;erreurInput(vitalID, false)}
        }
    }

    let date = new Date()
    date = date.getDate()+"/"+date.getMonth()+1+"/"+date.getFullYear();
    infoCasContact.push(date);

    if(sub == true && counter > 0){
        console.log(infoCasContact)
    }
    let CasContact = document.getElementById('CasContact')
}




