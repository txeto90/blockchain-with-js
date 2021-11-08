const fs = require('fs');
const QRcode = require('qrcode');

module.exports = {

    createQr: async function(data){
       const QR = await QRcode.toFile(
           'QRcode.png',
            [{
                data: Buffer.from(data),
                mode: 'byte'
            }]
        );
       //fs.writeFileSync('./index.html', `${htmlContent}`);
   }
}
