var scene, camera, renderer, material;
var loader, controls;
var uniforms;

function init(vertexShader, fragmentShader, obj) {
  scene = new THREE.Scene();
  loader = new THREE.OBJLoader();

  camera = new THREE.PerspectiveCamera( 75, 1, 0.1, 1000 );
  camera.position.z = 3;

  controls = new THREE.OrbitControls( camera );
  
  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  document.body.appendChild( renderer.domElement );

  uniforms = {
    u_time: { type: "f", value: 1.0 },
    u_resolution: { type: "v2", value: new THREE.Vector2() },
    u_mouse: { type: "v2", value: new THREE.Vector2() }
  };

  material = new THREE.ShaderMaterial( {
    uniforms: uniforms,
    vertexShader: vertexShader,
    fragmentShader: fragmentShader
  } );

  if(obj == 'default') {
    var geometryBox = new THREE.BoxGeometry( 1, 1, 1 );    
    var mesh = new THREE.Mesh( geometryBox, material );
    scene.add( mesh );
  } else {
    loadOBJ(obj);
  }

  onWindowResize();
  window.addEventListener( 'resize', onWindowResize, false );
  
  document.onmousemove = function (e) {
    uniforms.u_mouse.value.x = e.pageX
    uniforms.u_mouse.value.y = e.pageY
  }
}

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  render();
}

function render() {
  uniforms.u_time.value += 0.05;
  renderer.render(scene, camera);
}

function onWindowResize(event) {
  camera.aspect = window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);

  uniforms.u_resolution.value.x = renderer.domElement.width ;
  uniforms.u_resolution.value.y = renderer.domElement.height ;
}

function loadOBJ(obj) {
  loader.load(
    obj,
    function ( object ) {
      object.traverse( function ( child ) {
        if ( child instanceof THREE.Mesh ) {
            child.material = material;
        }
      } );
      scene.add( object );
    },
    function ( xhr ) {
      console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
    },
    function ( error ) {
      console.log( 'OBJ could not be loaded!' );
    }
  );
}