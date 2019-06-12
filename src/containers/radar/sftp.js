var Client = require('ssh2').Client;
var connSettings = {
     host: '217.138.134.182',
     port: 2222,
     username: 'keith',
     password: 'WATERLOO'
     // You can use a key file too, read the ssh2 documentation
};
var remotePathToList = 'Documents/Radar/';

var conn = new Client();
console.log(getDates(conn));
function getDates (a)
{
var list = new Array();
a.on('ready', function() {
    a.sftp(function(err, sftp) {
         if (err) throw err;
         sftp.readdir(remotePathToList, function(err, list) {
            if (err) throw err;
            // List the directory in the console
            for (i = 0; i < list.length; i++) {
               const picked = (({filename}) => ({filename}))(list[i]);
               list.push(picked)
             }
            // Do not forget to close the connection, otherwise you'll get troubles
            conn.end();
    });
});
}).connect(connSettings);
return list
}
