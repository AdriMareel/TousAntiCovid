let counter = 0;

function ajoutCasContact(){
    var div = document.createElement("div");
    document.getElementById("inputCasContact").appendChild(div).setAttribute("id", "balise"+counter);               //se place dans div avec l'id inputCasContact
    document.getElementById("balise"+counter).innerHTML="Prénom : <input id='name"+counter+"'></input> Nom : <input id='nickname"+counter+"'></input>"
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
    if(counter != 0){
        for(let i = 0 ; i<counter; i++){
            let nameID = "name" + i;
            let nicknameID = "nickname"+i;
            console.log(nameID, nicknameID)
            console.log(document.getElementById(nameID).value);
            console.log(document.getElementById(nicknameID).value);
            
        }
    }
    let date = new Date()
    date = date.getDate()+"/"+date.getMonth()+1+"/"+date.getFullYear();
}