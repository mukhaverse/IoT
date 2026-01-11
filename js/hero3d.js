function initHero3D() {
  const container = document.querySelector('.hero-3d');
  const clock = new THREE.Clock();

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    45,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
  );
  camera.position.set(0, 1, 5);

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);

  scene.add(new THREE.AmbientLight(0xffffff, 1));
  const dirLight = new THREE.DirectionalLight(0xffffff, 1);
  dirLight.position.set(5, 5, 5);
  scene.add(dirLight);

  // <-- declare model here
  let model;

  const loader = new THREE.GLTFLoader();
  loader.load(
    'assets/models/first3D/scene.gltf',
    (gltf) => {
      model = gltf.scene;

      model.scale.set(10, 10, 10);
      model.position.set(0, 0, 1.5);
      model.rotation.y = Math.PI / 2;
      model.rotation.x = Math.PI / 2;

      model.visible = false;
      scene.add(model);

      const box = new THREE.Box3().setFromObject(model);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3()).length();
      camera.position.set(center.x, center.y, size * 0.6);
      camera.lookAt(center);

      model.visible = true;

      // Settle-in entrance animation
      const tl = gsap.timeline();
      tl.from(model.position, { y: -5, duration: 1.8, ease: "power3.out" }, 0)
        .from(model.scale, { x: 5, y: 5, z: 5, duration: 1.8, ease: "back.out(1.7)" }, 0)
        .from(model.rotation, { x: model.rotation.x + 0.7, y: model.rotation.y - 1, duration: 1.8, ease: "power3.out" }, 0);
    },
    undefined,
    (error) => console.error(error)
  );

  function resize() {
    const w = container.clientWidth;
    const h = container.clientHeight;
    if (!w || !h) return;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  }

  function animate() {
    requestAnimationFrame(animate);

    const elapsed = clock.getElapsedTime();

    // Breathing effect
    if (model) {
      const scaleFactor = 0.02;
      model.scale.x = 10 + Math.sin(elapsed * 1.5) * scaleFactor;
      model.scale.y = 10 + Math.sin(elapsed * 1.5) * scaleFactor;
      model.scale.z = 10 + Math.sin(elapsed * 1.5) * scaleFactor;

      model.rotation.y = Math.PI / 2 + Math.sin(elapsed * 0.5) * 0.05;
    }

    renderer.render(scene, camera);
  }

  window.addEventListener('resize', resize);
  resize();
  animate();
}

window.addEventListener('load', initHero3D);
