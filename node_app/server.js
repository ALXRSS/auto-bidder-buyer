var http = require('http');
var url = require('url');
var serverPort = parseInt(process.env.PORT, 10) || 3000;
var querystring = require('querystring');

var username = "";
var password = "";
var secret = "";
var platform = "ps4";
var code = "";
var credits = "";

var server = http.createServer(function(req, res) {
    var page = url.parse(req.url).pathname;
    var params = querystring.parse(url.parse(req.url).query);
    console.log(page);
    res.writeHead(200, {"Content-Type": "text/plain"});
    if (page == '/') {
        res.write('Accueil');
    }
    else if (page == '/test') {
	
		var futapi = require("fut-api");
		var apiClient = new futapi();
		
		function twoFactorCodeCb(next){
		// send your authentication code with the "next" method 
		next(code);
		}
 
    
		apiClient.login(username,password,secret, platform,
			twoFactorCodeCb,
			function(error,response){
			if(error) {
				return console.log("Unable to login with "+username+" || "+error);
			}
			console.log("logged in with "+username);
			
			credits = apiClient.getCredits(function(error, response){ });
			
		});
		
        res.write('Nombre de crédits : '+credits);
    }
    res.end();
});

server.listen(serverPort, function(err) {
  if (err) {
    return console.log('Encountered error starting server: ', err);
  }

  console.log('running @ http://localhost:' + serverPort + '/');
});