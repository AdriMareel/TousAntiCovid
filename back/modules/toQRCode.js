const QRCode = require('qrcode')

function ToQRCode(id) {
<<<<<<< HEAD
    let urlcomplete = "http://10.224.3.61:3000/VerifPasse?" + id;
=======
    let urlcomplete = "http://192.168.252.56:3000/VerifPasse?" + id;
>>>>>>> backEnd_Loïc
    let QRc = QRCode.toString(urlcomplete, function (err, url) {
    })

    console.log(QRc);
    console.log(typeof(QRc));

    return QRc;
}

module.exports = ToQRCode;