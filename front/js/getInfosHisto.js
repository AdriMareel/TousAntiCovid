window.onload = getInfoHisto();

async function getInfoHisto(){
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

    const vaccin = result.data.vaccin;
    const test = result.data.test;

    let table = document.getElementById("table");

    let i = 1;

    vaccin.forEach(element =>  {
        table.innerHTML += "<tr><th>"+element.name+"</th><th>"+i+"</th><th>"+element.date+"</th></tr>";
        i++;
    });

    console.log(test);

    i = 1;
    test.forEach(element =>  {
        table.innerHTML += "<tr><th>"+element.typeTest+"</th><th>"+element.result+"</th><th>"+element.date+"</th></tr>";
        i++;
    });

}