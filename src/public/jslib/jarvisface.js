 // Values to play with:
 var color1 = "rgb(255, 255, 255)";
 var color2 = "rgb(255, 255, 255)";
 var canvas = document.getElementById('canvas');
 var rotateXSpeed = 1;
 var rotateYSpeed = 1;
 var rotateZSpeed = 1;
 // Other variable initialization.
 var scene, renderer, camera, light, roadscrown, loaderrods, crown, loadercrown, rings, loaderrings, semirings, loadersemirings, inners, loaderinners, dentro, loadedentro, loadereye, eye, material;
 var WIDTH = canvas.width,
     HEIGHT = canvas.height;
 function initWorld(){
   scene = new THREE.Scene();
   camera = new THREE.PerspectiveCamera(3, WIDTH/HEIGHT, 0.1, 1000);
   renderer = new THREE.WebGLRenderer({
     alpha: true,
     antialias: true
   });
   renderer.setSize(WIDTH, HEIGHT);
   renderer.shadowMapEnabled = true;
   container = document.getElementById('world');
   container.appendChild(renderer.domElement);
   light = new THREE.DirectionalLight(color1, 1);
   light.position.set(0,-100,150);
   light.castShadow = true;
   light.shadowDarkness = .1;
   scene.add(light);
   light2 = new THREE.DirectionalLight(color2, 1);
   light2.position.set(100,0,0);
   light2.castShadow = true;
   light2.shadowDarkness = .1;
   scene.add(light2);
   // HANDLE SCREEN RESIZE
   window.addEventListener('resize', handleWindowResize, false);
   //Rods of the crown
   loaderrods = new THREE.JSONLoader();
   loaderrods.load('./webgl/crownrods.json', function(geometry) {
     material = new THREE.MeshLambertMaterial({
     color:0xFF9900,
     shininess:0,
     specular:0x000000,
     shading:THREE.FlatShading,
   });
    roadscrown = new THREE.Mesh(geometry, material);
    roadscrown.rotation.y = Math.PI / 1; // initial position
    scene.add(roadscrown);
    camera.position.z = 5;
   });
   //Crown border
   loadercrown = new THREE.JSONLoader();
   loadercrown.load('./webgl/crown.json', function(geometry) {
     material = new THREE.MeshLambertMaterial({
     color:0x000000,
     shininess:0,
     specular:0x000000,
     shading:THREE.FlatShading,
   });
    crown = new THREE.Mesh(geometry, material);
    crown.rotation.y = Math.PI / 1; // initial position
    scene.add(crown);
    camera.position.z = 5;
   });
   //rings
   loaderrings = new THREE.JSONLoader();
   loaderrings.load('./webgl/rings.json', function(geometry) {
     material = new THREE.MeshLambertMaterial({
     color:0x000000,
     shininess:0,
     specular:0x000000,
     shading:THREE.FlatShading,
    });
    rings = new THREE.Mesh(geometry, material);
    rings.rotation.y = Math.PI / 1; // initial position
    scene.add(rings);
    camera.position.z = 5;
    });
    //semi ring
    loadersemirings = new THREE.JSONLoader();
    loadersemirings.load('./webgl/semiring.json', function(geometry) {
      material = new THREE.MeshLambertMaterial({
      color:0x000000,
      shininess:0,
      specular:0x000000,
      shading:THREE.FlatShading,
    });
     semirings = new THREE.Mesh(geometry, material);
     semirings.rotation.y = Math.PI / 1; // initial position
     scene.add(semirings);
     camera.position.z = 5;
    });
    //inners ring
    loaderinners = new THREE.JSONLoader();
    loaderinners.load('./webgl/innerrings.json', function(geometry) {
      material = new THREE.MeshLambertMaterial({
      color:0xFF9900,
      shininess:0,
      specular:0x000000,
      shading:THREE.FlatShading,
    });
     inners = new THREE.Mesh(geometry, material);
     inners.rotation.y = Math.PI / 1; // initial position
     scene.add(inners);
     camera.position.z = 5;
    });
    //dentro ring
    loadedentro = new THREE.JSONLoader();
    loadedentro.load('./webgl/dentroring.json', function(geometry) {
      material = new THREE.MeshLambertMaterial({
      color:0xFF9900,
      shininess:0,
      specular:0x000000,
      shading:THREE.FlatShading,
    });
     dentro = new THREE.Mesh(geometry, material);
     dentro.rotation.y = Math.PI / 1; // initial position
     scene.add(dentro);
     camera.position.z = 5;
    });
    //eyes
    loadereye = new THREE.JSONLoader();
    loadereye.load('./webgl/eyes.json', function(geometry) {
      material = new THREE.MeshLambertMaterial({
      color:0xFF9900,
      shininess:0,
      specular:0x000000,
      shading:THREE.FlatShading,
    });
     eye = new THREE.Mesh(geometry, material);
     eye.rotation.y = Math.PI / 1; // initial position
     scene.add(eye);
     camera.position.z = 5;
    });
   loop();
 }
 function loop(){
// Rotation values
if (roadscrown) {
    //sblogo.rotation.x += (0.01 * rotateXSpeed);
    //sblogo.rotation.y += (0.01 * rotateYSpeed);
roadscrown.rotation.z += (0.01 * rotateZSpeed);
}
if (crown) {
//sblogo.rotation.x += (0.01 * rotateXSpeed);
//crown.rotation.y += (0.01 * rotateYSpeed);
crown.rotation.z += (0.01 * rotateZSpeed);
}
if (rings) {
//sblogo.rotation.x += (0.01 * rotateXSpeed);
//crown.rotation.y += (0.01 * rotateYSpeed);
rings.rotation.z += (0.01 * rotateZSpeed);
}
if (semirings) {
semirings.rotation.x += (0.01 * rotateXSpeed);
//crown.rotation.y += (0.01 * rotateYSpeed);
semirings.rotation.z += (0.01 * rotateZSpeed);
}
if (inners) {
//semirings.rotation.x += (0.01 * rotateXSpeed);
//crown.rotation.y += (0.01 * rotateYSpeed);
inners.rotation.z += (0.01 * rotateZSpeed);
}
if (dentro) {
//semirings.rotation.x += (0.01 * rotateXSpeed);
dentro.rotation.y += (0.01 * rotateYSpeed);
dentro.rotation.z += (0.01 * rotateZSpeed);
}
if (eye) {
eye.rotation.x += (0.01 * rotateXSpeed);
//dentro.rotation.y += (0.01 * rotateYSpeed);
eye.rotation.z += (0.01 * rotateZSpeed);
}
renderer.render(scene, camera);
requestAnimationFrame(loop);
}
function handleWindowResize() {
// Update the renderer and the camera
renderer.setSize(WIDTH, HEIGHT);
camera.aspect = WIDTH / HEIGHT;
camera.updateProjectionMatrix();
}
initWorld();