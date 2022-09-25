// Import Node.js core module i.e http
var http = require('http');
var fs = require('fs');
var qs = require('querystring');
   
// Create web server
var server = http.createServer(function (req, res) {  
      
    // Check the URL of the current request
    if (req.url == '/') {
           
        // Set response header
        res.writeHead(200, { 'Content-Type': 'text/html' }); 
           
        // Set response content    
        res.write(fs.readFileSync("index.html"));
        res.end();//end the response
       
    }
    else if (req.url.match(/\/postform*/)) {
           
      console.log(req.server);
      if (req.method == 'POST') {
        var body = '';

        req.on('data', function (data) {
            body += data;

            // Too much POST data, kill the connection!
            // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
            if (body.length > 1e6)
                req.end();
        });

        req.on('end', function () {
            var post = qs.parse(body);
            // use post['blah'], etc.
            console.log(post);
        });
      }
        console.log("done");
     
  }
    else if (req.url == "/webtech") {
           
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(`
          <html><body style="text-align:center;">
            <h1 style="color:green;">Welcome to GeeksforGeeks</h1>
            <a href="https://www.geeksforgeeks.org/web-technology/">
              Read Web Technology content
            </a>
          </body></html>`);
        res.end();//end the response
       
    }
    else if (req.url == "/DS") {
           
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(`<html><body style="text-align:center;">
          <h1 style="color:green;">GeeksforGeeks</h1>
          <a href="https://www.geeksforgeeks.org/data-structures/">
            Read Data Structures Content
          </a>
        </body></html>`);
        res.end(); //end the response
       
    }
    else if (req.url == "/algo") {
           
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(`<html><body style="text-align:center;">
        <h1 style="color:green;">GeeksforGeeks</h1>
        <a href="https://www.geeksforgeeks.org/fundamentals-of-algorithms/">
          Read Algorithm analysis and Design Content
        </a>
      </body></html>`);
      res.end(); //end the response
     
  }
    else
        res.end('Invalid Request!'); //end the response
   
// Server object listens on port 80
}).listen(80, ()=>console.log('Server running on port 80'));