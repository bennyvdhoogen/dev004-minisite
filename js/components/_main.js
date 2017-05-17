//StateManager.drawSplash();
function loadTextFile(url, callback) {
  var request = new XMLHttpRequest();
  request.open('POST', url, true);
  request.addEventListener('load', function() {
     callback(request.responseText);
  });
  request.send();
}

function goToState(id){
  StateManager.setCurrentState(id);
}

function mutePlayer(){
  SoundManager.muteAllToggle();
}

// run after document load
window.addEventListener('load',function(){
	StateManager.setCurrentState(0);
  SoundManager.attachSCPlayer();
  //StateManager.setCurrentState(1);
});

window.addEventListener('statestatus',function(evt){
  data = evt.detail;
  stateUpdateObject = {
    id: data.stateId,
    ready: true,
  }
  StateManager.updateState(stateUpdateObject);
});
