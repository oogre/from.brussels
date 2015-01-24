module.exports = function(param){


	/*
		param = {
			"type": "other",
    		"mime": "image/jpeg",
    		"description": null,
			"data": {}
 		}
 	*/
 	var shortid = require('shortid');
 	var fs = require('fs');
 	var promise = require('promised-io/promise');
	var Deferred = promise.Deferred;
	var deferred = new Deferred();
	var err = false;

	if(!_.isObject(param)){
		err = ["UNREADABLE_IMAGE"];
	}
	else if(!_.isString(param.mime)){
		err = ["UNREADABLE_MIME"];
	}
	else if(!_.isObject(param.data)){
		err = ["UNREADABLE_IMAGE_DATA"];
	}
	
	if(err){
		deferred.reject(err);
		return deferred;
	}

	var mimeToExt = function(mime){
		var mimes = [{
				mime : "image/gif",
				ext : "gif"
			},
			{
				mime : "image/jpeg",
				ext : "jpg"
			},
			{
				mime : "image/png",
				ext : "png"
			}
		];
		mime = _.find(mimes, function(_mime){
			return mime == _mime.mime;
		});

		if(mime) return mime.ext;
		else{
			err = ["UNKNOW_MIME_TYPE"];
		};
	};

	param.ext = mimeToExt(param.mime);
	param.filename = shortid.generate();
	param.destination = param.destination||"public/";
	param.src = param.destination+param.filename+"."+param.ext;

	if(err){
		deferred.reject(err);
		return deferred;
	}
	//console.log(param.data);
	//var buffer = new Buffer(param.data);
	//console.log(buffer);

	fs.writeFile(param.src, new Buffer( new Uint8Array(param.data) ), function(err) {
		if(err) deferred.reject(err);
		else deferred.resolve(param.src);
	}); 
	return deferred;
};



/*285x215*/