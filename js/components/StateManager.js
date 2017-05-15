var StateManager = (function () {
	var self = {};
	self.states = [
    {id: 0, name:"splash", init: function(){
			window.init();
			window.render();
		  window.animate();
		}},
    {id: 1, name:"scene", init: function(){
			window.scene.add( dae );
		}}
  ];

	self.currentState = self.states[0];

	self.getCurrentState = function() {
		return self.currentState;
	}

	self.setState = function(id) {
		if(self.states[id]){
			self.currentState = self.states[id];
			self.currentState.init();
			return true;
		}
		return false;
	}

	self.drawSplash = function(){
		var bodyElement = document.body;
		debugger;
		var template = '<div id="splash-screen" style="top: 0px; width: 100%; height:100%; background-color: white; opacity: 0.5; position:fixed;"></div>'
		bodyElement.insertAdjacentHTML('beforeend', template);;
	}

	self.removeSplash = function(){
		var element = document.getElementById("splash-screen");
		element.parentNode.removeChild(element);
	}

	self.moveToDownloadPage = function () {
    console.log('download page');
    window.location.href='get.php';
	};

	return self;
}());
