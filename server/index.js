const http = require('http');
const fs = require('fs')
var macs = []; // array of mac's of devices
var htmlcontent = "";
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
	//console.log(macs);
      });
      console.log("***");
      console.log(macs);
      console.log("***");
      htmlcontent = "" ;
      for (var i = 0; i < macs.length; i++) {
  	htmlcontent += macs[i] + "<br>";
      }

      res.end(`
        <!doctype html>
        <html>
        <body>
		<h1> Y a qui au kot ? </h1>
		<p> ${htmlcontent} </p>
            <!--form action="/" method="post">
                <input type="text" name="fname" /><br />
                <input type="number" name="age" /><br />
                <input type="file" name="photo" /><br />
                <button>Save</button>
            </form-->
        </body>
        </html>
      `);
    }
});server.listen(9876);
