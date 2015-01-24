module.exports = function(address){
	var id3 = require('id3js');
	var promise = require('promised-io/promise');
	var Deferred = promise.Deferred;
	var deferred = new Deferred();
	var data = {
		address : address
	};

	id3({ file: data.address, type: id3.OPEN_URI }, function(err, tags) {
		if(err) return deferred.reject(err);
		
		data.title = tags.title || tags.v1.title || tags.v2.title;
		data.artist = tags.artist || tags.v1.artist || tags.v2.artist;
		data.album = tags.album || tags.v1.album || tags.v2.album;
		data.year = tags.year || tags.v1.year;
		data.image = tags.v2.image;

		_.keys(data).map(function(key){
			if(data[key] && _.isString(data[key])){
				data[key] = data[key].replace(/\u0000/g, "");
			}
		});

		data.title = data.title || null;
		data.artist = data.artist || null;
		data.album = data.album || null;
		data.artist = data.artist || null;
		data.year = data.year || null;
		data.image = data.image || null;
		data.tag = tags.v2.genre || null;

		deferred.resolve(data);
	});
	return deferred;
}