function animate() {
  requestAnimationFrame( animate );
  render();
  if(window.deviceOrientationSupported){
    DOcontrols.update();
  }
}

var clock = new THREE.Clock();
var start = Date.now();

function render() {
  perlinMaterial.uniforms[ 'time' ].value = .0005 * ( Date.now() - start );
	//perlinMaterial.uniforms[ 'pitchMod' ].value = .0005 * ( Date.now() - start );
	perlinMaterial.uniforms[ 'weight' ].value = 1.0 * ( .5 + .5 * Math.sin( .00025 * ( Date.now() - start ) ) );
	//perlinMaterial.uniforms[ 'weight' ].value = 10.0;
  var timer = Date.now() * 0.0005;
  radious = 1;
  camera.updateMatrix();

  // update the picking ray with the camera and mouse position
	raycaster.setFromCamera( mouse, camera );

	// calculate objects intersecting the picking ray
	var intersects = raycaster.intersectObjects( scene.children );

	for ( var i = 0; i < intersects.length; i++ ) {
      // iterate through all intersecting objects
	}
  particleLight.position.x = Math.sin( timer * 4 ) * 3009;
  particleLight.position.y = Math.cos( timer * 5 ) * 4000;
  particleLight.position.z = Math.cos( timer * 4 ) * 3009;
  THREE.AnimationHandler.update( clock.getDelta() );
  renderer.render( scene, camera );
}
