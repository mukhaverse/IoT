gsap.registerPlugin(ScrollTrigger);

function initHero3D() {

  const container = document.querySelector('.hero-3d');
  const heroSection = document.querySelector('.hero');
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

  

  // Lights
  scene.add(new THREE.AmbientLight(0xffffff, 2));
  const dirLight = new THREE.DirectionalLight(0xffffff, 1);
  dirLight.position.set(5, 5, 5);
  scene.add(dirLight);


  // Responsive scale function
  function getResponsiveScale() {
    const width = window.innerWidth;
    if (width <= 480) return 2.5;
    if (width <= 768) return 3.5;
    return 5;
  }




  // Model
  let model;
  let isBreathing = false;
  let BASE_SCALE = getResponsiveScale();

  const loader = new THREE.GLTFLoader();

  loader.load(
    'assets/models/arduino.glb',
    (gltf) => {
      model = gltf.scene;
      model.scale.set(BASE_SCALE, BASE_SCALE, BASE_SCALE);
      model.position.set(0, 0, 0);
      model.rotation.set(Math.PI / 2, Math.PI / 2, 0);

      scene.add(model);

      // Camera framing
      const box = new THREE.Box3().setFromObject(model);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3()).length();
      camera.position.set(center.x, center.y, size * 1.2);
      camera.lookAt(center);

      // Entrance animation
      gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: () => (isBreathing = true)
      })
      .from(model.position, { y: 3, duration: 1.8 }, 0)
      .from(model.scale, { x: 3, y: 3, z: 3, duration: 1.8, ease: "back.out(1.5)" }, 0);

      // Scroll-triggered flip
      ScrollTrigger.create({
        trigger: heroSection,
        start: "top top",
        end: "+=600",
        pin: heroSection,
        pinSpacing: false,
        scrub: true,
        animation: gsap.to(model.rotation, {
          x: model.rotation.x + Math.PI, // flip forward
          ease: "none"
        })
      });
    },
    undefined,
    (err) => console.error(err)
  );




  // Resize
  function resize() {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  }

  window.addEventListener('resize', resize);





  // Animate
  function animate() {
    requestAnimationFrame(animate);
    const elapsed = clock.getElapsedTime();

    if (model && isBreathing) {
      const breathe = Math.sin(elapsed * 1.5) * 0.03;
      model.scale.set(BASE_SCALE + breathe, BASE_SCALE + breathe, BASE_SCALE + breathe);
    }

    renderer.render(scene, camera);
  }



  resize();
  animate();

}

window.addEventListener('load', initHero3D);
