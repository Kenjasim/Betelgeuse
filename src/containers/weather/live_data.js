const io = require('socket.io-client');
WEB_SOCKET_SWF_LOCATION = 'inc/WebSocketMain.swf';
const socket = io.connect('http://217.138.134.182:3000');
socket.on('connected', function (data) {
    socket.emit('ready for data', {});
});
socket.on('update', function (data) {
    const message = data.message.payload;
    const result = message.split(",");
    const data = passData(result);
    console.log(data);
});
function passData(array)
{
    const data = [{
        'id': array[0],
        'time local': array[1],
        'wind direction': array[2],
        'reference': array[3],
        'wind speed': array[4],
        'humidity': array[5],
        'temp': array[6],
        'air pressure': array[7],
        'altitude': array[8]
    }]
    return data
}
