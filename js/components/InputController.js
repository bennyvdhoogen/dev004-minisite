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

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight; 
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}

function onMouseWheel(event){
	controls.rotate(0.001 * event.deltaY);
}

function onMouseMove( event ) {
	// calculate mouse position in normalized device coordinates
	// (-1 to +1) for both components
  $('.menu').removeClass("short");
	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    controls.rotUp(Math.sin(mouse.y /200) * -1);

    // exp

    raycaster.setFromCamera( mouse, camera );

    var intersects = raycaster.intersectObjects( scene.children[1].children, true);
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

	}else{
		return false;
	}
  mouse.x = +(event.targetTouches[0].pageX / window.innerWidth) * 2 +-1;
  mouse.y = -(event.targetTouches[0].pageY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera( mouse, camera );

  var intersects = raycaster.intersectObjects( scene.children[1].children, true);

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
}

function onDocumentMouseDown( event ) {
    event.preventDefault();

    mouse.x = ( event.clientX / renderer.domElement.clientWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / renderer.domElement.clientHeight ) * 2 + 1;

    raycaster.setFromCamera( mouse, camera );

    var intersects = raycaster.intersectObjects( scene.children[1].children, true);

    if ( intersects.length > 0 ) {
    //  alert(mesh.name);

      var mesh  = intersects[0].object.parent;
      console.log(mesh);
      if(mesh.name == 'Cylinder'){
        moveToDownloadPage();
      }
    //  console.log(intersects[0].object.parent)
    //  alert(mesh.name);
      SoundManager.playTrackByName(mesh.name);

    }
}
