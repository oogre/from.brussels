window.OOGRE = window.OOGRE || {};

_.extend(window.OOGRE, {
	templates : function(template, data){
		data = data || {};
		data._csrf = window.OOGRE.data._csrf;
		return JST["assets/templates"+template+".ejs"](data);
	},
	eventsHandler : function(events){
		var _events = events;
		var _actions = {};
		return {
			on : function(event, action){
				if(_.contains(_events, event)){
					_actions[event] = _actions[event]||[];
					_actions[event].push(action);
				}
				else{
					throw new Error("UNKNOW EVENT : "+event);
				}
			},
			trigger : function(eventName, data){
				return _actions[eventName]
				.map(function(action){
					return action(data);
				});
			}
		}
	}
});
