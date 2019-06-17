<?

header('Content-Type: image/jpeg');

echo file_get_contents('sftp://keith:WATERLOO@217.128.134.182:2222/~Documents/Radar/17062019/radarImage1560755968.bmp');