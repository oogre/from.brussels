/**
 * Id3Controller
 *
 * @description :: Server-side logic for managing id3s
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	"index" : function(req, res, next){

		var id3 = require('id3js');

		// e.g.
		// 0 => infinite
		// 240000 => 4 minutes (240,000 miliseconds)
		// etc.
		//
		// Node defaults to 2 minutes.
		//res.setTimeout(0);


		res.setTimeout(0);

		id3({ file: req.param("mp3"), type: id3.OPEN_URI }, function(err, tags) {
			if(err) return next(err);
			return res.json(tags);
		});
	}
};

