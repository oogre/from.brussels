/**
* Genre.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	attributes: {
		title : {
			type : "String",
			required : true,
			unique : true,
			lowercase : true,
			notEmpty : true
		}
	},


	add : function(data){
		var Promise = require("bluebird");
		return 	Tag
				.findOne()
				.where(data)
				.then(function(tag){
					if(tag) return Promise.resolve(tag);
					else return	Tag
								.create(data)
								.then(function(tag){
									return tag;
								})
								.catch(function(err){
									return Promise.resolve();
								});
				});
	}, 

	afterValidation : function(values, next){
		_
		.keys(Tag._attributes)
		.map(function(name){
			if(Tag._attributes[name].lowercase){
				values[name] = values[name].toLowerCase()||"";
			}
		});
		next();
	}
};