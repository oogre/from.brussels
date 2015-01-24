/**
* Comment.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	attributes: {
		author : {
			model : "user",
			required : true,
			notEmpty : true
		},
		content : {
			type : "String",
			required : true,
			notEmpty : true
		}
	}
};

