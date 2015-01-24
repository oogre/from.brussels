/**
 * Default model configuration
 * (sails.config.models)
 *
 * Unless you override them, the following properties will be included
 * in each of your models.
 *
 * For more info on Sails models, see:
 * http://sailsjs.org/#/documentation/concepts/ORM
 */

module.exports.models = {
	migrate : "safe",

	types: {
		url : function(value){
			if(! sails.config.regexp.uri.test(value) ) return false;
			else return true;
		},
		lowercase : function(value){
			/* 	
				[HACK] : to be complient with Model building...
				To force lowercase : do it into "beforeCreate"
			*/
			if(_.isString(value)){
				return true;
			}
			return false;
		},
		notEmpty : function(value){
			if(_.isString(value)) 
				return !_.str.isBlank(value);
			return !_.isEmpty(value);
		}
	},
  /***************************************************************************
  *                                                                          *
  * Your app's default connection. i.e. the name of one of your app's        *
  * connections (see `config/connections.js`)                                *
  *                                                                          *
  ***************************************************************************/

	connection: 'mongodbServer'
//	connection : 'localDiskDb'
};
