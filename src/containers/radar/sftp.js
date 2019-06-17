let Client = require('ssh2-sftp-client');
let sftp = new Client();
var stream = require('stream');
sftp.connect({
     host: '217.138.134.182',
     port: 2222,
     username: 'keith',
     password: 'WATERLOO'
}).then(() => {
        var body = new stream();
        body = sftp.get('Documents/Radar/13062019/radarImage1560438868.bmp');
        body.then(response => response.body)
        .then(body => {
          const reader = body.getReader();
        
        return new ReadableStream({
            start(controller) {
              return pump();
              function pump() {
                return reader.read().then(({ done, value }) => {
                  // When no more data needs to be consumed, close the stream
                  if (done) {
                      controller.close();
                      return;
                  }
                  // Enqueue the next data chunk into our target stream
                  controller.enqueue(value);
                  return pump();
                });
              }
            }  
          })
        .then(stream => new Response(stream))
        .then(response => response.blob())
        .then(blob => URL.createObjectURL(blob))
        .then(url => console.log(image.src = url))
        .catch(err => console.error(err))
        });
}).catch((err) => {
    console.log(err, 'catch error');
})