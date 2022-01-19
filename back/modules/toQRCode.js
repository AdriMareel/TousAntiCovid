const QRCode = require('qrcode')

function ToQRCode(id) {
    let urlcomplete = "http://10.224.3.61:3000/VerifPasse?" + id;
    let QRc = QRCode.toString(urlcomplete, function (err, url) {
    })

    console.log(QRc);
    console.log(typeof(QRc));

    return QRc;
}

module.exports = ToQRCode;