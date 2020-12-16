const http = require('http');
const fs = require('fs');
//const readline = require('readline');

var macs = []; // array of mac's of devices
var htmlcontent = "";
var arr = { "e0:cc:f8:54:4c:3e" : "Spartak", "18:5e:0f:a2:3f:28" : "IliesPC", "8c:f5:a3:df:c8:cc": "Nadir", "6e:de:7c:ee:16:9f":"Caner"};

const server = http.createServer((req, res) => {
    if (req.method === 'POST') {
        // Handle post info...
        let body = '';
        req.on('data', chunk => {
            body += decodeURIComponent(chunk.toString()); // convert Buffer to string
        });

        req.on('end', () => {
            console.log(body);
            fs.writeFile('devices.txt', body, function (err) {
            if (err) return console.log(err);
            //console.log('Hello World > helloworld.txt');
            });
            res.end('ok');
        });
    }
    else {
      fs.readFile('devices.txt', 'utf8', function(err, contents) {
        macs = contents.split('=')[1].split(';');
      });
      console.log(macs);
      htmlcontent = "" ;
      for (var i = 0; i < macs.length; i++) {
        var mac_i = macs[i];
        for (var key in arr){
                if (mac_i == key){ 
                        htmlcontent += arr[key] + "<br>";
                }
        }
      }

      res.end(`
        <!doctype html>
        <html>
        <body>
                <h1> Y a qui au kot ? </h1>
                <p> ${htmlcontent} </p>
        </body>
        </html>
      `);
    }
});server.listen(9876);
