var StateManager = (function () {
	var self = {};
	self.states = [
    {
			id: 0,
			name:"splash",
			ready: false,
			init: function(){
				window.init();
				window.render();
			  window.animate();
				self.drawSplash();
			},
			destroy: function(){
				self.removeSplash();
			}
		},
    {
			id: 1,
			name:"scene",
			ready: false,
			init: function(){
				window.scene.add( dae );
				debugger;
			},
			destroy: function(){
				//
			}
		},
		{
			id: 2,
			name:"fetch",
			ready: true,
			init: function(){
				self.drawFetch();

			},
			destroy: function(){
				self.removeFetch();
			}
		}
  ];

	self.currentState = self.states[0];

	self.getCurrentState = function() {
		return self.currentState;
	}

	self.updateState = function(obj){
		if(obj.id){
			if(self.states[obj.id]){
				for(key in obj){
					self.states[obj.id][key] = obj[key];
				}
			}
		}
	}

	self.setCurrentState = function(id) {
		if(self.states[id]){
			if(self.currentState.id != id){
					self.currentState.destroy();
			}
			self.currentState = self.states[id];
			self.currentState.init();
			return true;
		}
		return false; 
	}

	self.drawFetch = function(){
		var bodyElement = document.body;
		var template = '<div id="fetch-page" class="content bg-img"><div class="col-xs-8 col-sm-4 col-md-3 col-lg-2"><a href="" target="_blank" class="btn btn-outline"> dl ?></a><a href="" target="_blank" class="btn btn-outline"> redeem?> </a></div></div>'
		bodyElement.insertAdjacentHTML('beforeend', template);;
	}

	self.removeFetch = function(){
		var element = document.getElementById("fetch-page");
		element.parentNode.removeChild(element);
	}

	self.drawSplash = function(){
		var splashElem = document.getElementById("splash-screen");
		splashElem.style.display = 'block';
	}

	self.removeSplash = function(){
		var splashElem = document.getElementById("splash-screen");
		splashElem.style.display = 'none';
	//	element.parentNode.removeChild(element);
	}

	self.moveToDownloadPage = function () {
    console.log('download page');
    window.location.href='get.php';
	};

	return self;
}());
