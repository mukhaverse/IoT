function initHero3D() {
  const container = document.querySelector('.hero-3d');

  /* Scene */
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x222222);

  /* Camera */
  const camera = new THREE.PerspectiveCamera(
    45,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
  );
  camera.position.set(0, 1, 3);

  /* Renderer */
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);

  /* Lights */
  scene.add(new THREE.AmbientLight(0xffffff, 1));

  const dirLight = new THREE.DirectionalLight(0xffffff, 1);
  dirLight.position.set(5, 5, 5);
  scene.add(dirLight);

  /* TEST CUBE (keep for now) */
  const cube = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshStandardMaterial({ color: 0xff0000 })
  );
  scene.add(cube);

  /* Resize */
  function resize() {
    const w = container.clientWidth;
    const h = container.clientHeight;
    if (!w || !h) return;

    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  }

  window.addEventListener('resize', resize);

  /* Render loop */
  function animate() {
    requestAnimationFrame(animate);
    cube.rotation.y += 0.01;
cube.rotation.x += 0.005;

    renderer.render(scene, camera);
  }

  resize();
  animate();
}

window.addEventListener('load', initHero3D);
