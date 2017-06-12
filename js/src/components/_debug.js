window.addEventListener('load',function(){
	var obj = {
	    number : 0,
      range: [Math.PI * -1,Math.PI],
	    string : 'X'
	};
  var obj2 = {
	    number : 0,
      range: [Math.PI * -1,Math.PI],
	    string : 'Y'
	};
	var controlKit = new ControlKit();
	    controlKit.addPanel()
	        .addGroup()
	            .addSubGroup()
	                .addSlider(obj,'number', 'range', { label: obj.string, onChange: function(evt){ console.log(window.camera.position.x = obj.number); }})
                  .addSlider(obj2,'number', 'range', { label: obj2.string, onChange: function(evt){ console.log(window.camera.position.y = obj.number); }})
	                .addStringInput(obj,'string');
});
