var StateManager = (function () {
	var self = {};

	self.states = [
		{
			id: 0,
			name:"initialize",
			ready: false,
			init: function(){
				// only run once
					window.init();
					console.log('Loaded : 1 / 4');
					window.render();
					console.log('Loaded : 2 / 4');
					window.animate();
					console.log('Loaded : 3 / 4');
					window.scene.add( dae );
					console.log('Loaded : 4 / 4');
					self.updateState({id: 0, ready: true});
					self.setCurrentState(1);
				//
			},
			destroy: function(){
				//
			}
		},
    {
			id: 1,
			name:"splash",
			ready: false,
			init: function(){
				self.drawSplash();
			},
			destroy: function(){
				self.removeSplash();
			}
		},
    {
			id: 2,
			name:"scene",
			ready: false,
			init: function(){
				//
			},
			destroy: function(){
				//
			}
		},
		{
			id: 3,
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
		if(id == 0 && self.states[0].ready){
			console.log('Init already done.');
			return false;
		}

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
		var fetchPageElem = document.getElementById('fetch-page');
		fetchPageElem.style.display = '';
	}

	self.removeFetch = function(){
		var fetchPageElem = document.getElementById('fetch-page');
		fetchPageElem.style.display = 'none';
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
