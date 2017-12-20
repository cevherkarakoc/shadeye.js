var scene, camera, renderer, controls;
var uniforms;

function init(vertexShader, fragmentShader) {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(400, 400, 0.1, 1000);
  camera.position.z = 2;
  
  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  document.body.appendChild( renderer.domElement );

  var geometry = new THREE.PlaneBufferGeometry(2, 2, 2);

  uniforms = {
    u_time: { type: "f", value: 1.0 },
    u_resolution: { type: "v2", value: new THREE.Vector2() },
    u_mouse: { type: "v2", value: new THREE.Vector2() }
  };

  var material = new THREE.ShaderMaterial( {
    uniforms: uniforms,
    vertexShader: vertexShader,
    fragmentShader: fragmentShader
  } );

  var mesh = new THREE.Mesh( geometry, material );
  scene.add( mesh );

  onWindowResize();
  window.addEventListener( 'resize', onWindowResize, false );
  
  document.onmousemove = function (e) {
    uniforms.u_mouse.value.x = e.pageX
    uniforms.u_mouse.value.y = e.pageY
  }
}

function onWindowResize(event) {
  renderer.setSize(window.innerWidth, window.innerHeight);
  uniforms.u_resolution.value.x = renderer.domElement.width ;
  uniforms.u_resolution.value.y = renderer.domElement.height ;
}

function animate() {
  requestAnimationFrame(animate);
  render();
}

function render() {
  uniforms.u_time.value += 0.05;
  renderer.render(scene, camera);
}