window.addEventListener( 'deviceorientation', function(event){
	 if(event.alpha != null){
		 window.deviceOrientationSupported = true;
	 }
	 else {
		 window.deviceOrientationSupported = false;
	 }}, false );

	 if ( ! Detector.webgl ) Detector.addGetWebGLMessage();
	 var container, stats;
	 var camera, scene, renderer, objects;
	 var particleLight;
	 var dae;
	 var loader = new THREE.ColladaLoader();
	 var textureLoader;
	 var raycaster = new THREE.Raycaster();
	 var mouse = new THREE.Vector2();
	 var vertexShader;
	 var fragmentShader;

	 loader.options.convertUpAxis = true;
	 loader.load( 'assets/meshes/scene100-red.dae', function ( collada ) {
	   loadTextFile('assets/shaders/vertexShader.glsl', function(vxShader){
	     vertexShader = vxShader;
	     loadTextFile('assets/shaders/fragmentShader.glsl', function(fragShader){
	       fragmentShader = fragShader;
	       dae = collada.scene;
	 			var invisMaterial = new THREE.MeshNormalMaterial( ) ; //3
	 			var invisMaterial = new THREE.MeshPhongMaterial( { color: 0xdddddd, shininess: 10, shading: THREE.SmoothShading, opacity: 0.5, transparent: true } );
	 			var symbolMeshMaterial = new THREE.MeshNormalMaterial();
	 			dae.children.forEach(function(item){
	 				if(item.name.indexOf('invis_') != -1){
	 						item.children.forEach(function(mesh){
	 								mesh.material = invisMaterial;
	 								mesh.material.visible = false;
	 						});
	 				}else{
	 					item.children.forEach(function(mesh){
	 							mesh.children[0].children[0].material = symbolMeshMaterial;
	 					});
	 				}

	 			});
	       dae.traverse( function ( child ) {

	         if ( child instanceof THREE.SkinnedMesh ) {
	           var animation = new THREE.Animation( child, child.geometry.animation );
	           animation.play();
	         }
	       } );
	       dae.scale.x = dae.scale.y = dae.scale.z = 0.03;
	       dae.updateMatrix();
	       dae.position.set(0,-15,0);
				 statusObj = {};
				 statusObj.stateId = 1;
				 var evtStateReady = new CustomEvent('statestatus', { 'detail': statusObj});
				 window.dispatchEvent(evtStateReady);
	  //     init();
	  //     animate();
	     });
	   });
	 });
