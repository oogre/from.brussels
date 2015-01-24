/**
* Podcast.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
	
	attributes: {
		title : {
			type : "String"
		},
		artist : {
			type : "String",
		},
		year : {
			type : "int",
			integer : true
		},
		address : {
			type : "String",
			required : true,
			url : true,
			unique : true
		},
		image : {
			type : "String",
		},
		
		comment : {
			collection : "comment",
			via : "id"
		},
		playlist : {
			collection : "track",
			via : "podcast"
		},
		radioshow : {
			model : "radioshow"
		},
		tag : {
			collection : "tag",
			via : "id"
		}
	},

	add : function(data){
		var Promise = require("bluebird");
		return 	Podcast
				.findOne()
				.where(data)
				.populateAll()
				.then(function(podcast){
					if(podcast) return Promise.resolve(podcast);
					return	Podcast
							.create(data)
							.then(function(podcast){
								podcast.created = true;
								return podcast;
							})
							.catch(function(err){
								return Promise.reject(err);
							});
				});
	}, 

	afterValidation : function(values, next){
		_
		.keys(Podcast._attributes)
		.map(function(name){
			if(Podcast._attributes[name].lowercase){
				values[name] = values[name].toLowerCase()||"";
			}
		});
		next();
	}
};

