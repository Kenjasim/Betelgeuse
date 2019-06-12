var Client = require('ssh2').Client;
var dates = new Array();
var connSettings = {
     host: '217.138.134.182',
     port: 2222,
     username: 'keith',
     password: 'WATERLOO'
     // You can use a key file too, read the ssh2 documentation
};
var remotePathToList = 'Documents/Radar/';
var conn = new Client();

console.log(dates);
console.log(getDates());

conn.on('ready', function() {
     var j = new Array();
     conn.sftp(function(err, sftp) {
          if (err) throw err;
          sftp.readdir(remotePathToList, function(err, list) {
               if (err) throw err;
               // List the directory in the console
               for (i = 0; i < list.length; i++) {
                    const picked = (({filename}) => ({filename}))(list[i]);
                    var arr1 = Object.keys(picked);
                    var arr2 = arr1.map(function (k) {
                    return picked[k];
                    });
                    j.push(arr2);
                    //console.log(j);
                    //console.log(dates);
               }
               dates = j;
               //console.log(j);
               //console.log(dates);
               conn.end();
          });     
     });
     }).connect(connSettings);
     

function getDates()
{ 
     return dates;
}


