/**
 * ShowController
 *
 * @description :: Server-side logic for managing shows
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var cheerio = require('cheerio');
var http = require('http');
var url = require('url');
module.exports = {
	"add" : function(req, res, next){
	//	var uriShow = req.param("uri");
	//	var parser = 
		return res.view();
	},
	"parser" : function(req, res, next){
		var self = {
			req : req,
			res : res,
			next : next
		};
		var parsing = function(data){
			var $ = cheerio.load(data);


			$("head").remove();
			$("script").remove();
			$("link").remove();


			/* THE BRAIN */
			var body = [];
			$(".listeEmissions li").each(function(i, elem) {
				body.push( options.protocol+"//"+options.host + "/" + $(this).find("a").first().attr("href"));
			});


			return self.res.json({
				data : body.join("<br/>")
			});
		};
		var options = 	url.parse( self.req.param("uri") );
		var req = http.request(options, function(res) {
			var body = '';
			res.setEncoding('utf8');
			res.on('data', function (chunk) {
				body += chunk;
			});
			res.on('end', function() {
    			parsing(body);
  			});
		});
		req.on('error', function(e) {
			console.log('problem with request: ' + e.message);
		});
		req.write('data\n');
		req.write('data\n');
		req.end();
	}
};

