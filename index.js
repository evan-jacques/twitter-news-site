module.exports = require('./node_modules/twitter-js-client/lib/Twitter');

var express = require('express');
var app = express();
var OAuth2 = require('oauth').OAuth2;
var https = require('https');
var bodyParser = require('body-parser');

var error = function (err, response, body) {
    console.log('ERROR [%s]', JSON.stringify(err));
};
var success = function (data) {
    console.log('Data [%s]', data);
};

//var newsSites = new Array("nytimes","thetimes","ap","cnn","thesunnewspaper","bbcnews","cnet","msnuk","telegraph");
//'nytimes','thesunnewspaper','thetimes', 'ap', 'cnn', 'bbcnews', 'cnet', 'msnuk', 'telegraph', 'usatoday', 'wsj', 'washingtonpost','bostonglobe','newscomauhq','skynews', 'sfgate','ajenglish','independant','guardian', 'latimes','reutersagency','abc','bw','time'
var config = {
	"consumerKey": "IfY5uRqfGNxNa2Q9KpM8cGQVY",
	"consumerSecret": "xfK9OvXanOgmT0vOZluDaiVn3vHJapMXTgNirrsdALdOoVj55x",
    "accessToken": "2710313106-n3jClTtrTi7wjfGSUBmBbsHCbyBO16H97hoJmtH",
    "accessTokenSecret": "DqNsY9W6LxrsHSravfPheJiCecVUD6i02iFVMhd5q9WoF"
}

var twitter = new module.exports.Twitter(config);

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

//public is the folder your angular application is in.
//This allows your angular app to handle routing when you hit the URL root (/)
app.use(express.static('public'));


//ENDPOINTS

//unauthenticated request
app.post('/twitter/timeline', function (req, res) {
	var resultData = [];
	var count = 0;
	var newsSites = req.body.users;
	newsSites.forEach(function( site ) {
	    var data = twitter.getUserTimeline({ screen_name: site}, function(error, response, body){
	    	console.log(error);
	        res.send({
	            "error" : error
	        });
	    }, function(data){
	    	var jsonData = JSON.parse(data);
	    	for( var key in jsonData ){
	    		resultData.push(jsonData[key]);
	    	}
	        count++;
	        if( count === newsSites.length ){
	        	var resultStr = JSON.stringify(resultData);
	        	res.send({
			        result : {
			            "userData" : resultStr
			        }
    			});
	        }
	    });
	});
	

});

var server = app.listen(3000, function () {
	console.log("Server on port 3000");
	var host = server.address().address;
	var port = server.address().port;
})