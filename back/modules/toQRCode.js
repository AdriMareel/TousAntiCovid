const QRCode = require('qrcode')

function ToQRCode(url) {
    let QRc = QRCode.toString(url, function (err, url) {
    })

    //console.log(QRc);
    //console.log(typeof(QRc));

    return QRc;
}

module.exports = ToQRCode;