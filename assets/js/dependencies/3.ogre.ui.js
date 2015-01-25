window.OOGRE = window.OOGRE || {};
_.extend(window.OOGRE, {
	UI : {
		dropdown : function(input){
			var $self = input;
			var $list = $($self.attr("data-toggle-target"));

			var _eHandler = new window.OOGRE.eventsHandler(["select", "inputFeed", "inject"]);

			var _closeList = function(){
				$list
				.empty()
				.hide();
				$self
				.removeClass("open");
			};
			var _openList = function(){
				$list
				.show();
				$self
				.addClass("open");
			};
			var _keyAction = function(keyCode){
				if(keyCode == 40){
					if($list.children("li.active").next("li").length>0){

						$list
						.children("li.active")
						.next("li")
						.children("a")
						.focus();
					}else{
						$list
						.children("li:first-child")
						.children("a")
						.focus();
					}
				}
				else if(keyCode == 38){
					if($list.children("li.active").prev("li").length>0){
						$list.children("li.active").prev("li").children("a").focus();
					}else{
						$self.focus();
					}
				}
			};

			var _updateList = function(data){
				
				$list
				.empty()
				.append(_eHandler.trigger("inject", data).join(""));
				if($list.is(":empty")){
					_closeList();
				}
				else{
					
					$self
					.on("blur", function(){
						setTimeout(function(){
							if($list.children("li.active").length == 0){
								_closeList();
							}
						}, 500);
					});
					$list
					.children("li")
					.on("mouseover", function(){
						$(this)
						.children("a")
						.focus();
					})
					.on("click", function(event){
						var event = {
							origin : $(this).children("a"),
							target : $self
						};
						_eHandler.trigger("select", event);
						_closeList();
						return false;
					})
					.children("a")
					.on("mouseover focus", function(){
						$(this)
						.parent()
						.addClass("active");
					})
					.on("blur", function(){
						$(this)
						.parent()
						.parent()
						.children("li.active")
						.removeClass("active");
						setTimeout(function(){
							if($list.children("li.active").length == 0 && !$self.is(":focus")){
								_closeList();
							}
						}, 500);
					})
					.on("keyup", function(event){
						if(event.keyCode == 40 || event.keyCode == 38){
							_keyAction(event.keyCode);
						}
					})
					.on("click keyup", function(event){
						if(event.keyCode == 13 || event.keyCode == undefined){
							var event = {
								origin : $(this),
								target : $self
							};
							_eHandler.trigger("select", event);
							_closeList();
							return false;
						}
					});
					_openList();
				}
			};

			$self
			.on("keyup", function(event){
				var list =	$(this).attr("data-toggle-target");
				var value = $(this).val()||"";

				if(!value){
					_closeList()
				}
				else if(event.keyCode == 40 || event.keyCode == 38){
					_keyAction(event.keyCode);
				}
				else{
					var event = {
						value : value,
						target : $self
					};
					_eHandler.trigger("inputFeed", event)
				}
			});

			return {
				on : function(event, action){
					_eHandler.on(event, action);
					return this;
				},
				update : function(data){
					_updateList(data);
					return this;
				}
			};
		}
	}
});