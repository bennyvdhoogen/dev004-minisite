<?php
session_start();
//  header('Location: gui.html');
if($_SESSION['allowed'] != true){
  header('Location: login.html', true);
  exit();
}
 ?>
<html>
<head>
  <script src="js/react.js"></script>
  <link rel="stylesheet" href="css/foundation.css">
  <link rel="stylesheet" type="text/css" href="css/style.css"/>
  <script src="js/three.min.js"></script>
  <script src="js/loaders/collada/Animation.js"></script>
  <script src="js/loaders/collada/AnimationHandler.js"></script>
  <script src="js/loaders/collada/KeyFrameAnimation.js"></script>
  <script src="js/loaders/ColladaLoader.js"></script>
  <script src="js/Detector.js"></script>
  <script src="js/libs/stats.min.js"></script>
  <script src="js/controls/OrbitControls.js"></script>
  <body>
    <script>
			if ( ! Detector.webgl ) Detector.addGetWebGLMessage();
			var container, stats;
			var camera, scene, renderer, objects;
			var particleLight;
			var dae;
			var loader = new THREE.ColladaLoader();
			loader.options.convertUpAxis = true;
			loader.load( 'assets/demo.dae', function ( collada ) {
				dae = collada.scene;
				dae.traverse( function ( child ) {
					if ( child instanceof THREE.SkinnedMesh ) {
						var animation = new THREE.Animation( child, child.geometry.animation );
						animation.play();
					}
				} );
				dae.scale.x = dae.scale.y = dae.scale.z = 0.002;
				dae.updateMatrix();
				init();
				animate();
			} );
      document.addEventListener('keydown',onDocumentKeyDown,false);
function onDocumentKeyDown(event){
var delta = 2;
event = event || window.event;
var keycode = event.keyCode;
switch(keycode){
case 37 : //left arrow 向左箭头
camera.position.x = camera.position.x - delta;
break;
case 38 : // up arrow 向上箭头
camera.position.z = camera.position.z - delta;
break;
case 39 : // right arrow 向右箭头
camera.position.x = camera.position.x + delta;
break;
case 40 : //down arrow向下箭头
camera.position.z = camera.position.z + delta;
break;
}
}

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
				// Add the COLLADA
				scene.add( dae );
				particleLight = new THREE.Mesh( new THREE.SphereGeometry( 4, 8, 8 ), new THREE.MeshBasicMaterial( { color: 0xffff00 } ) );
				scene.add( particleLight );
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
        controls = new THREE.OrbitControls( camera, renderer.domElement );
				//controls.addEventListener( 'change', render ); // add this only if there is no animation loop (requestAnimationFrame)
				controls.enableDamping = true;
				controls.dampingFactor = 0.25;
				controls.enableZoom = false;
				stats = new Stats();
				stats.domElement.style.position = 'absolute';
				stats.domElement.style.top = '0px';
				container.appendChild( stats.domElement );
        console.log(scene);
				//
				window.addEventListener( 'resize', onWindowResize, false );
			}
			function onWindowResize() {
				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();
				renderer.setSize( window.innerWidth, window.innerHeight );
			}

			//
			function animate() {
				requestAnimationFrame( animate );
				render();
				stats.update();
			}
			var clock = new THREE.Clock();
			function render() {
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
				particleLight.position.x = Math.sin( timer * 4 ) * 3009;
				particleLight.position.y = Math.cos( timer * 5 ) * 4000;
				particleLight.position.z = Math.cos( timer * 4 ) * 3009;
				THREE.AnimationHandler.update( clock.getDelta() );
				renderer.render( scene, camera );
			}
		</script>
    </script>
  </body>
</head>
</html>
