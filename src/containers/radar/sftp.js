var Client = require('ssh2').Client;
var promise = require('promises')
var Q = require('q');
var data = new Array();
var connSettings = {
     host: '217.138.134.182',
     port: 2222,
     username: 'keith',
     password: 'WATERLOO'
     // You can use a key file too, read the ssh2 documentation
};
function resolveAfter2Seconds() {
     return new Promise(resolve => {
       setTimeout(() => {
         resolve('resolved');
       }, 2000);
     });
   }
function getImages(date, callbackfunc)
{
     var j = new Array();
     var remotePathToList = 'Documents/Radar/'+date;
     var conn = new Client();
     conn.on('ready', function() {
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
                         
                    }
                    data = callbackfunc(j);
                    conn.end();
               });     
          });
          }).connect(connSettings);
          
}
function sortData(array)
{
     var yeet = array.toString();
     var arr = yeet.split(',');
                    
     return arr;
}                    
getImages('06062019', sortData );                    
console.log(data);