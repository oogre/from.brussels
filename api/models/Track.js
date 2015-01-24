/**
* Track.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	attributes: {
		title : {
			type : "String",
			required : true,
			lowercase : true,
			notEmpty : true
		},
		artist : {
			type : "String"
		},
		album : {
			type : "String"
		},
		year : {
			type : "integer",
			integer : true
		},
		startTime : {
			type : "Integer",
			integer : true
		},
		endTime : {
			type : "Integer",
			integer : true
		},
		image : {
			type : "String",
			url : true
		},

		comment : {
			collection : "comment",
			via : "id"
		},
		podcast : {
			model : "podcast",
		},
		tag : {
			collection : "tag",
			via : "id"
		},
	}
};

