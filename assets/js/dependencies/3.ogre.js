window.OOGRE = {
	templates : function(template, data){
		data = data || {};
		data._csrf = window.OOGRE.data._csrf;
		return JST["assets/templates"+template+".ejs"](data);
	},
	UI : {
		dropdown : {
			eventsHandler : {
				"select" : []
			},
			close : function(list){
				list
				.hide()
				.prev("input")
				.removeClass("open");
			},
			build : function(parent, data){
				var $parent = 	$(parent)
								.empty()
								.show()
								.append(function(){
									return data
									.map(function(radioshow){
										return "<li><a href='#'' data-value='"+radioshow.id+"' data-title='"+radioshow.title+"'>"+radioshow.title+"</a></li>";
									}).join("");
								}());
				if($parent.is(":empty")){
					window.OOGRE.UI.dropdown.close($parent);
				}else{
					$parent
					.prev("input")
					.on("blur", function(){
						setTimeout(function(){
							if($parent.children("li.active").length == 0){
								window.OOGRE.UI.dropdown.close($parent);
							}
						}, 50);
					})
					.end()
					.children("li")
					.on("mouseover", function(){
						$(this)
						.children("a")
						.focus();
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
							if($parent.children("li.active").length == 0){
								window.OOGRE.UI.dropdown.close($parent);
							}
						}, 50);
					})
					.on("keyup", function(event){
						if(event.keyCode == 40 || event.keyCode == 38){
							window.OOGRE.UI.dropdown.keyAction($(this).parent().parent(), event.keyCode);
						}
					})
					.on("click keyup", function(event){
						if(event.keyCode == 13 || event.keyCode == undefined){
							var event = {
								value : $(this).attr("data-value"),
								title : $(this).attr("data-title"),
								target : $parent.prev("input")
							};

							window.OOGRE.UI.dropdown.eventsHandler
							.select
							.map(function(action){
								action(event);
							});

							window.OOGRE.UI.dropdown.close($parent);
							return false;
						}
					});
					$parent.prev("input").addClass("open");
				}
			},
			keyAction : function(parent, keyCode){
				var $parent = $(parent);
				if(keyCode == 40){
					if($parent.children("li.active").next("li").length>0){
						$parent.children("li.active").next("li").children("a").focus();
					}else{
						
						$parent.children("li:first-child").children("a").focus();
					}
				}
				else if(keyCode == 38){
					if($parent.children("li.active").prev("li").length>0){
						$parent.children("li.active").prev("li").children("a").focus();
					}else{
						$parent.prev("input").focus();
					}
				}
			}
		}
	}
}