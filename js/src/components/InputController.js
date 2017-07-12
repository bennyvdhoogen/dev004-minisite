function attachIOEventListeners(){
  window.addEventListener( 'mousedown', onDocumentMouseDown, false );
  window.addEventListener( 'touchstart', onTouchStart, false );
  window.addEventListener( 'touchend', onTouchEnd, false );
  window.addEventListener( 'mousemove', onMouseMove, false );
	window.addEventListener( 'mousewheel', onMouseWheel, false );
}

function detachIOEventListeners(){
  window.removeEventListener( 'mousedown', onDocumentMouseDown, false );
  window.removeEventListener( 'touchstart', onTouchStart, false );
  window.removeEventListener( 'touchend', onTouchEnd, false );
  window.removeEventListener( 'mousemove', onMouseMove, false );
	window.removeEventListener( 'mousewheel', onMouseWheel, false );
}

menuElem = document.getElementById('menu-elem');
menuElem.addEventListener("touchstart", toggleMobileExpand, false);
trackInfoElem = document.getElementById('track-information');
trackInfoElem.addEventListener("touchstart", toggleMobileExpand, false);

function toggleMobileExpand(){
  menuElem.classList.toggle('expand-mobile');
  trackInfoElem.classList.toggle('expand-mobile');
}

document.addEventListener( 'mouseover' , mouseEnters, false);
document.addEventListener( 'mouseout' , mouseLeaves, false);
document.addEventListener( "visibilitychange" , windowActiveToggle, false);


function mouseEnters(){
  window.shouldRender = true;
}

function mouseLeaves() {
  window.touchingEdge = 0;
}

function windowActiveToggle(){
  if(document.hidden){
    window.shouldRender = false;
  }else{
    window.shouldRender = true;
  }
}

function checkIfMouseNearEdges(event){
  edges = {};
  var edgeThickness = window.innerWidth * 0.20; // edge is 20% of screen width;
  edges.left = {x:{ start: 0, end: 0 + edgeThickness}};
  edges.left.x.size = edges.left.x.end - edges.left.x.start;
  edges.right = {x:{ start: window.innerWidth - edgeThickness, end: window.innerWidth}};
  edges.right.x.size = edges.right.x.end - edges.right.x.start;
  window.touchingEdge = 0;
  window.percentageInEdge = 0;

  if(event.clientX > edges.left.x.start && event.clientX < edges.left.x.end){
    window.touchingEdge = 'left';
    var progress = (edges.left.x.end - event.clientX);
    window.percentageInEdge  = progress / edges.left.x.size;
  }

  if(event.clientX > edges.right.x.start && event.clientX < edges.right.x.end){
    window.touchingEdge = 'right';
    var progress = (event.clientX - edges.right.x.start);
    window.percentageInEdge  = progress / edges.right.x.size;
  }
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}

function onMouseWheel(event){
  if(ScrollingController.applySmoothScrolling){
    ScrollingController.handleEvent(event);
  }else{
    controls.rotate(0.001 * event.deltaY);
  }
}

function onMouseMove( event ) {
	// calculate mouse position in normalized device coordinates
	// (-1 to +1) for both components
  $('.menu').removeClass("short");
	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
  checkIfMouseNearEdges(event);
//    controls.rotUp(Math.sin(mouse.y /200) * -1);

    // exp

    raycaster.setFromCamera( mouse, camera );

    var intersects = raycaster.intersectObjects( scene.children[3].children, true);
    document.body.style.cursor = 'default';

    if ( intersects.length > 0 ) {
      var mesh  = intersects[0].object.parent;
      window.lastMesh = mesh;
      WiggleMeshIn(mesh);
    //  mesh.rotateY(0.1);
      document.body.style.cursor = 'pointer';

    }else{
      if(window.lastMesh){
        WiggleMeshOut(window.lastMesh);
      }
    }
}

function onTouchEnd(event){
  console.log(event);
  onTouchStart(event);
}


function onTouchStart(event){
  console.log(event);
  if(event.targetTouches){
    mouse.x = +(event.targetTouches[0].pageX / window.innerWidth) * 2 +-1;
    mouse.y = -(event.targetTouches[0].pageY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera( mouse, camera );

    var intersects = raycaster.intersectObjects( scene.children[3].children, true);

    if ( intersects.length > 0 ) {
    //  alert(mesh.name);

      var mesh  = intersects[0].object.parent;
      if(mesh.name == 'Cylinder'){
        moveToDownloadPage();
      }
    //  console.log(intersects[0].object.parent)
    //  alert(mesh.name);
      SoundManager.playTrackByName(mesh.name);
     }
  }else{
		return false;
	}
}

function onDocumentMouseDown( event ) {
    event.preventDefault();

    mouse.x = ( event.clientX / renderer.domElement.clientWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / renderer.domElement.clientHeight ) * 2 + 1;

    raycaster.setFromCamera( mouse, camera );

    var intersects = raycaster.intersectObjects( scene.children[3].children, true);

    if ( intersects.length > 0 ) {

      var mesh  = intersects[0].object.parent;
      console.log(mesh);

      if(mesh.name == 'Cylinder'){
        moveToDownloadPage();
      }

      SoundManager.playTrackByName(mesh.name);

    }
}
