let Client = require('ssh2-sftp-client');
let sftp = new Client();
sftp.connect({
     host: '217.138.134.182',
     port: 2222,
     username: 'keith',
     password: 'WATERLOO'
}).then(() => {
    console.log(sftp.get('Documents/Radar/13062019/radarImage1560438868.bmp'));
}).catch((err) => {
    console.log(err, 'catch error');
});