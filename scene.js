if ( ! Detector.webgl ) Detector.addGetWebGLMessage();
var container, stats;
var camera, scene, renderer, objects;
var particleLight;
var dae;
var loader = new THREE.ColladaLoader();
var textureLoader;

var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

var havePointerLock = 'pointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document;

if ( havePointerLock ) {

  var element = document.body;

  var pointerlockchange = function ( event ) {

    if ( document.pointerLockElement === element || document.mozPointerLockElement === element || document.webkitPointerLockElement === element ) {

      controlsEnabled = true;
      controls.enabled = true;

      blocker.style.display = 'none';

    } else {

      controls.enabled = false;

      blocker.style.display = '-webkit-box';
      blocker.style.display = '-moz-box';
      blocker.style.display = 'box';

      instructions.style.display = '';

    }

  };

  var pointerlockerror = function ( event ) {

    instructions.style.display = '';

  };

  // Hook pointer lock state change events
  document.addEventListener( 'pointerlockchange', pointerlockchange, false );
  document.addEventListener( 'mozpointerlockchange', pointerlockchange, false );
  document.addEventListener( 'webkitpointerlockchange', pointerlockchange, false );

  document.addEventListener( 'pointerlockerror', pointerlockerror, false );
  document.addEventListener( 'mozpointerlockerror', pointerlockerror, false );
  document.addEventListener( 'webkitpointerlockerror', pointerlockerror, false );

  instructions.addEventListener( 'click', function ( event ) {

    instructions.style.display = 'none';

    // Ask the browser to lock the pointer
    element.requestPointerLock = element.requestPointerLock || element.mozRequestPointerLock || element.webkitRequestPointerLock;
    element.requestPointerLock();

  }, false );

} else {

  instructions.innerHTML = 'Your browser doesn\'t seem to support Pointer Lock API';

}

loader.options.convertUpAxis = true;
loader.load( 'assets/demo.dae', function ( collada ) {
  dae = collada.scene;
  dae.traverse( function ( child ) {
    if ( child instanceof THREE.SkinnedMesh ) {
      var animation = new THREE.Animation( child, child.geometry.animation );
      animation.play();
    }
  } );
  dae.scale.x = dae.scale.y = dae.scale.z = 0.05;
  dae.updateMatrix();
  init();
  animate();
} );

function init() {
  container = document.createElement( 'div' );
  document.body.appendChild( container );
  camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 200 );
  camera.position.set( 1, 1, 1);
  scene = new THREE.Scene();

  // Grid
  var size = 14, step = 1;
  var geometry = new THREE.Geometry();
  var material = new THREE.LineBasicMaterial( { color: 0x303030 } );
  for ( var i = - size; i <= size; i += step ) {
    geometry.vertices.push( new THREE.Vector3( - size, - 0.04, i ) );
    geometry.vertices.push( new THREE.Vector3(   size, - 0.04, i ) );
    geometry.vertices.push( new THREE.Vector3( i, - 0.04, - size ) );
    geometry.vertices.push( new THREE.Vector3( i, - 0.04,   size ) );
  }
  var line = new THREE.LineSegments( geometry, material );
  scene.add( line );

  // Textures
var textureLoader = new THREE.TextureLoader();

var sphereTex = textureLoader.load( 'assets/dev004_sphere_bg.jpg' );
var sphereMat = new THREE.MeshPhongMaterial( { color: 0xffffff, map: sphereTex } );

  perlinMaterial = new THREE.ShaderMaterial( {
    uniforms: {
      tShine: { type: "t", value: THREE.ImageUtils.loadTexture( 'assets/dev004_sphere_bg.jpg' ) },
      time: { type: "f", value: 0 },
      weight: { type: "f", value: 0 }
    },
    vertexShader: document.getElementById( 'vertexShader' ).textContent,
    fragmentShader: document.getElementById( 'fragmentShader' ).textContent

  } );

  var geometry = new THREE.SphereGeometry(100, 50, 50, 0, Math.PI * 2, 0, Math.PI * 2);
  var material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
  var sphere = new THREE.Mesh(geometry, perlinMaterial);

  sphere.position = new THREE.Vector3(0, 0, -299);
  scene.add(sphere);
  // Add the COLLADA
  scene.add( dae );
  particleLight = new THREE.Mesh( new THREE.SphereGeometry( 4, 8, 8 ), new THREE.MeshBasicMaterial( { color: 0xffff00 } ) );
//	scene.add( particleLight );
  // Lights
//		scene.add( new THREE.AmbientLight( 0xcccccc ) );
  var directionalLight = new THREE.DirectionalLight(/*Math.random() * 0xffffff*/0xeeeaaa );
  directionalLight.position.x = Math.random() - 0.5;
  directionalLight.position.y = Math.random() - 0.5;
  directionalLight.position.z = Math.random() - 0.5;
  directionalLight.position.normalize();
  scene.add( directionalLight );
  var pointLight = new THREE.PointLight( 0xffffff, 4 );
  particleLight.add( pointLight );
  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  container.appendChild( renderer.domElement );
  controls = new THREE.PointerLockControls( camera );
  scene.add( controls.getObject() );
  //controls.addEventListener( 'change', render ); // add this only if there is no animation loop (requestAnimationFrame)
  controls.enableDamping = false;
  controls.dampingFactor = 0.25;
  controls.enableZoom = false;
  stats = new Stats();
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.top = '0px';
  container.appendChild( stats.domElement );
  console.log(scene);
  //
  window.addEventListener( 'resize', onWindowResize, false );
  window.addEventListener( 'mousedown', onDocumentMouseDown, false );
  window.addEventListener( 'mousemove', onMouseMove, false );

}
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}

function onMouseMove( event ) {

	// calculate mouse position in normalized device coordinates
	// (-1 to +1) for both components

	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

}

function onDocumentMouseDown( event ) {

    console.log(event);
    console.log(raycaster);


    event.preventDefault();

    mouse.x = ( event.clientX / renderer.domElement.clientWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / renderer.domElement.clientHeight ) * 2 + 1;

    raycaster.setFromCamera( mouse, camera );

    var intersects = raycaster.intersectObjects( scene.children[2].children, true);

    if ( intersects.length > 0 ) {
      var mesh  = intersects[0].object.parent;
      console.log(intersects[0].object.parent)
      alert(mesh.name);
      //   console.log()

    }
  //  console.log(intersects);

}

//
function animate() {
  requestAnimationFrame( animate );
  render();
  stats.update();
}
var clock = new THREE.Clock();
var start = Date.now();

function render() {
  perlinMaterial.uniforms[ 'time' ].value = .00025 * ( Date.now() - start );
	perlinMaterial.uniforms[ 'weight' ].value = 10.0 * ( .5 + .5 * Math.sin( .00025 * ( Date.now() - start ) ) );
//	material.uniforms[ 'weight' ].value = 10.0;
  var timer = Date.now() * 0.0005;
  radious = 1;
  // camera.position.x = radious * Math.sin( theta * Math.PI / 360 )
  //                     * Math.cos( phi * Math.PI / 360 );
  // camera.position.y = radious * Math.sin( phi * Math.PI / 360 );
  // camera.position.z = radious * Math.cos( theta * Math.PI / 360 )
  //                     * Math.cos( phi * Math.PI / 360 );
  camera.updateMatrix();
  // camera.position.x = Math.cos( timer ) * 5;
  // camera.position.y = 5;
  // camera.position.z = Math.sin( timer ) * 10;
  // camera.lookAt( scene.position );

  // update the picking ray with the camera and mouse position
	raycaster.setFromCamera( mouse, camera );

	// calculate objects intersecting the picking ray
	var intersects = raycaster.intersectObjects( scene.children );

	for ( var i = 0; i < intersects.length; i++ ) {
//		intersects[ i ].object.material.color.set( 0xff0000 );

	}
  particleLight.position.x = Math.sin( timer * 4 ) * 3009;
  particleLight.position.y = Math.cos( timer * 5 ) * 4000;
  particleLight.position.z = Math.cos( timer * 4 ) * 3009;
  THREE.AnimationHandler.update( clock.getDelta() );
  renderer.render( scene, camera );
}
