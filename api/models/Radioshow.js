/**
* Show.js
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
			lowercase : true
		},
		address : {
			type : "String",
		},
		comment : {
			collection : "comment",
			via : "id"
		},
		podcasts : {
			collection : "podcast",
			via : "radioshow"
		},
		tag : {
			collection : "tag",
			via : "id"
		}
	},
	afterValidation : function(values, next){
		_
		.keys(Radioshow._attributes)
		.map(function(name){
			if(Radioshow._attributes[name].lowercase){
				values[name] = values[name].toLowerCase()||"";
			}
		});
		next();
	}
};

