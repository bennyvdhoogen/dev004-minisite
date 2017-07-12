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
  applyEdgeRotation();

	for ( var i = 0; i < intersects.length; i++ ) {
      // iterate through all intersecting objects
	}
  particleLight.position.x = Math.sin( timer * 4 ) * 3009;
  particleLight.position.y = Math.cos( timer * 5 ) * 4000;
  particleLight.position.z = Math.cos( timer * 4 ) * 3009;
  THREE.AnimationHandler.update( clock.getDelta() );
  renderer.render( scene, camera );
}

function applyEdgeRotation(){
  var speed = 0.018;
  switch(window.touchingEdge){
    case 'left':
      document.body.style.cursor = 'w-resize';
      controls.rotate(window.percentageInEdge * -speed);
      break;
    case 'right':
      document.body.style.cursor = 'e-resize';
      controls.rotate(window.percentageInEdge * speed);
      break;
  }
}

function getInitialRotationForObjects(){
  console.log(scene);
  window.initialObjectRotations = {};
  window.SoundManager.songs.forEach(function(item){
    var mesh = window.scene.getObjectByName(item.name);
    if(mesh){
        window.initialObjectRotations[item.name] = mesh.rotation;
    }
  });
}

function getMeshByTarget(mesh){
  meshName = mesh.name;
  meshName = meshName.replace("invis_", "");
  mesh = scene.getObjectByName(meshName);
  return mesh;
}

function WiggleMeshIn(mesh){
  //debugger;
  // find the actual mesh
  actualMesh = getMeshByTarget(mesh);
  meshName = actualMesh.name;
//  mesh.rotateX(-0.005);
  if(actualMesh.isAnimating != 'in'){
  //    animateRotation(meshName,0, window.initialObjectRotations[meshName].y, actualMesh.rotation.y + 0.5, 200, 'in');
  //  animateMethod(meshName,'rotateY',0, 0, 0.005, 200, 'in');
    animateScale(meshName, 0, 1, 1.25, 250, 'in');
  }
}

function animateRotation(meshName,unit,from,to,time, status) {
    elem = scene.getObjectByName(meshName);
    if(!elem) return;
    var start = new Date().getTime(),
        timer = setInterval(function() {
            var step = Math.min(1,(new Date().getTime()-start)/time);
            elem['rotation']['y'] = (from+step*(to-from))+unit;
            if( step == 1){ clearInterval(timer); elem.isAnimating = status;}
        },25);
    elem.isAnimating = status;
    elem['rotation']['x'] = from+unit;
}

function animateScale(meshName,unit,from,to,time, status) {
    elem = scene.getObjectByName(meshName);
    if(!elem) return;
    var start = new Date().getTime(),
        timer = setInterval(function() {
            var step = Math.min(1,(new Date().getTime()-start)/time);
            elem['scale']['x'] = (from+step*(to-from))+unit;
            elem['scale']['y'] = (from+step*(to-from))+unit;
            elem['scale']['z'] = (from+step*(to-from))+unit;
            if( step == 1){ clearInterval(timer); elem.isAnimating = status;}
        },25);
    elem.isAnimating = status;
    console.log(elem.isAnimating);
    elem['scale']['x'] = from+unit;
    elem['scale']['y'] = from+unit;
    elem['scale']['z'] = from+unit;
}

function animateMethod(meshName,method,unit,from,to,time,status) {
    elem = scene.getObjectByName(meshName);
    if(!elem) return;
    var start = new Date().getTime(),
        timer = setInterval(function() {
            var step = Math.min(1,(new Date().getTime()-start)/time);
            elem[method]((from+step*(to-from))+unit);
            if( step == 1){ clearInterval(timer); elem.isAnimating = status;}
        },25);
    elem[method](from+unit);
}

function WiggleMeshOut(mesh){
//  debugger;
  actualMesh = getMeshByTarget(mesh);
  meshName = actualMesh.name;

//  mesh.rotateX(-0.005);
  if(actualMesh.isAnimating != 'out'){
    //  animateRotation(meshName,0, actualMesh.rotation.y, window.initialObjectRotations[meshName].y, 200, 'out');
  //  animateMethod(meshName,'rotateY',0, 0, -0.005, 200, 'out');
    animateScale(meshName, 0, 1.25, 1, 250, 'out');
  }
    console.log(actualMesh.rotation.x);
  //
}
