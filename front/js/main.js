//partie création HTML
const { jsPDF } = require("jspdf"); // will automatically load the node version
let fs=require('fs');
const doc = new jsPDF();
var imgData = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHQAAAB0CAYAAABUmhYnAAAAAklEQVR4AewaftIAAAKsSURBVO3BQW7kQAwEwSxC//9yro88NSBIM2sTjIg/WGMUa5RijVKsUYo1SrFGKdYoxRqlWKMUa5RijVKsUYo1SrFGKdYoxRrl4qEkfJNKl4QTlS4JncpJEr5J5YlijVKsUYo1ysXLVN6UhDtUuiS8SeVNSXhTsUYp1ijFGuXiw5Jwh8oTSehUuiS8KQl3qHxSsUYp1ijFGuXij1M5ScJJEjqVv6xYoxRrlGKNcvHHJeFE5SQJkxRrlGKNUqxRLj5M5ZNU7kjCm1R+k2KNUqxRijXKxcuS8E1J6FS6JHQqXRLuSMJvVqxRijVKsUaJPxgkCZ1Kl4QTlb+sWKMUa5RijXLxUBI6lZMk/E8qXRK6JHQqJ0noVLok3KHyRLFGKdYoxRrl4j9TeSIJncoTKl0STlTuUPmkYo1SrFGKNcrFQypdEt6UhCeS0Kl0KneonCThjiR0Kk8Ua5RijVKsUeIPXpSEE5WTJHQqJ0l4QqVLQqdykoROpUvCicqbijVKsUYp1igXH6bSJeFEpUtCp9KpdEk4UXkiCSdJ6FS6JHxSsUYp1ijFGiX+4A9LQqdyRxI6lTuS0Kl0SbhD5YlijVKsUYo1ysVDSfgmlZMknKjckYQ7knCi8knFGqVYoxRrlIuXqbwpCU+odEk4ScI3JaFTeaJYoxRrlGKNcvFhSbhD5X9SOUlCp9IloVPpktCpvKlYoxRrlGKNcjGMSpeEE5UuCScqJyonKp9UrFGKNUqxRrn441S6JNyRhBOVkyR0Kl0S7lB5olijFGuUYo1y8WEq36TSJeEOlS4JnUqn8psUa5RijVKsUS5eloRvSkKn0qm8KQknKp3KNxVrlGKNUqxR4g/WGMUapVijFGuUYo1SrFGKNUqxRinWKMUapVijFGuUYo1SrFGKNUqxRvkHv7QE9MppxbsAAAAASUVORK5CYII=';
doc.text("Nom", 80, 190);
doc.text("Prénom",80,200 )
doc.addImage(imgData, 'JPEG', 40, 30, 150, 150)
doc.save("Passe.pdf");

//partie création HTML
let id=1;
let content='<html><body><h3>Nom</h3><h3>Prénom</h3><img src="'+imgData+'" alt="QrCode"></body></html>';
fs.writeFile('../html/Passe'+id+'.html',content,function(err){
    if(err) throw err;
    console.log('ff');
});