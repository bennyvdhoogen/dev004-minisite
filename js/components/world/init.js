function init() {
  container = document.createElement( 'div' );
  container.width = window.innerWidth;
  container.height = window.innerHeight;
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
  //scene.add( line );

  // Textures
  var textureLoader = new THREE.TextureLoader();


  var sphereTex = textureLoader.load( 'assets/img/dev004_sphere_bg.jpg' );
  var sphereMat = new THREE.MeshPhongMaterial( { color: 0xffffff, map: sphereTex } );

    perlinMaterial = new THREE.ShaderMaterial( {
      uniforms: {
        tShine: { type: "t", value: THREE.ImageUtils.loadTexture( 'assets/img/dev004_sphere_bg.jpg' ) },
        time: { type: "f", value: 1 },
        weight: { type: "f", value: 0.001 },
				pitchMod: { type: "f", value: 1 }
      },
      vertexShader: vertexShader,
      fragmentShader: fragmentShader

    } );
		window.perlinMaterial = perlinMaterial;
  var geometry = new THREE.SphereGeometry(120, 100, 100, 0, Math.PI * 2, 0, Math.PI * 2);
  var material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
  var sphere = new THREE.Mesh(geometry, perlinMaterial);

  sphere.position = new THREE.Vector3(0, 0, -299);
  scene.add(sphere);

  // add the c4d ssets
  //scene.add( dae );

  particleLight = new THREE.Mesh( new THREE.SphereGeometry( 4, 8, 8 ), new THREE.MeshBasicMaterial( { color: 0xffff00 } ) );
  var directionalLight = new THREE.DirectionalLight(/*Math.random() * 0xffffff*/0xeeeaaa );
  directionalLight.position.x = Math.random() - 0.5;
  directionalLight.position.y = Math.random() - 0.5;
  directionalLight.position.z = Math.random() - 0.5;
  directionalLight.position.normalize();
//  scene.add( directionalLight );

  var pointLight = new THREE.PointLight( 0xffffff, 4 );
//  particleLight.add( pointLight );

  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  container.appendChild( renderer.domElement );

  if(window.deviceOrientationSupported){
      DOcontrols = new THREE.DeviceOrientationControls( camera );
  }else{
    controls = new THREE.OrbitControls( camera, renderer.domElement );
    controls.enableDamping = true;
    controls.dampingFactor = 0.5;
    controls.enableZoom = false;
    controls.minPolarAngle = 1.55;
    controls.maxPolarAngle = 1.80;
		controls.reset();
  }

  window.addEventListener( 'resize', onWindowResize, false );


}
