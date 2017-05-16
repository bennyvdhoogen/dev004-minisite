//StateManager.drawSplash();
function loadTextFile(url, callback) {
  var request = new XMLHttpRequest();
  request.open('POST', url, true);
  request.addEventListener('load', function() {
     callback(request.responseText);
  });
  request.send();
}

// run after document load
window.addEventListener('load',function(){
	StateManager.setState(0);
  StateManager.setState(1);
});
