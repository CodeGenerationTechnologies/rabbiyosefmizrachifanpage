import * as THREE from 'three';

export class ThreeCanvas {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      2000
    );
    this.camera.position.z = 800;

    this.renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.container.appendChild(this.renderer.domElement);

    this.mouseX = 0;
    this.mouseY = 0;
    this.targetX = 0;
    this.targetY = 0;

    this.initCosmos();
    this.initDivineRings();
    this.initEmbers();
    this.bindEvents();
    this.animate();
  }

  initCosmos() {
    // 1. Deep Celestial Starfield (Jewels of the cosmos)
    const starCount = 3500;
    const starGeo = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    const gold = new THREE.Color(0xf59e0b);
    const white = new THREE.Color(0xffffff);
    const cyan = new THREE.Color(0x38bdf8);
    const deepBlue = new THREE.Color(0x6366f1);

    for (let i = 0; i < starCount; i++) {
      const idx = i * 3;
      // Cylindrical/spherical spread
      const radius = 400 + Math.random() * 1200;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      starPositions[idx] = radius * Math.sin(phi) * Math.cos(theta);
      starPositions[idx + 1] = radius * Math.sin(phi) * Math.sin(theta);
      starPositions[idx + 2] = (radius * Math.cos(phi)) - 300;

      // Color variation: mostly stars, some golden divine aura, some sapphire
      const rand = Math.random();
      let color = white;
      if (rand < 0.25) color = gold;
      else if (rand < 0.5) color = cyan;
      else if (rand < 0.65) color = deepBlue;

      starColors[idx] = color.r;
      starColors[idx + 1] = color.g;
      starColors[idx + 2] = color.b;
    }

    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

    // Circle texture via canvas for smooth star points
    const starCanvas = document.createElement('canvas');
    starCanvas.width = 32;
    starCanvas.height = 32;
    const starCtx = starCanvas.getContext('2d');
    const grad = starCtx.createRadialGradient(16, 16, 0, 16, 16, 16);
    grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
    grad.addColorStop(0.3, 'rgba(245, 158, 11, 0.8)');
    grad.addColorStop(0.7, 'rgba(56, 189, 248, 0.2)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    starCtx.fillStyle = grad;
    starCtx.fillRect(0, 0, 32, 32);

    const starTexture = new THREE.CanvasTexture(starCanvas);

    const starMat = new THREE.PointsMaterial({
      size: 3.5,
      map: starTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    this.stars = new THREE.Points(starGeo, starMat);
    this.scene.add(this.stars);
  }

  initDivineRings() {
    // 2. Sacred Geometry Celestial Spheres (Toruses with sacred tilt)
    this.ringsGroup = new THREE.Group();

    const ringParams = [
      { radius: 260, tube: 0.8, color: 0xd4af37, opacity: 0.45, rx: 1.1, ry: 0.4 },
      { radius: 340, tube: 0.7, color: 0x38bdf8, opacity: 0.35, rx: 0.5, ry: 1.2 },
      { radius: 420, tube: 0.9, color: 0xf59e0b, opacity: 0.3, rx: 0.8, ry: 0.9 }
    ];

    this.ringMeshes = [];

    ringParams.forEach(p => {
      const geo = new THREE.TorusGeometry(p.radius, p.tube, 16, 100);
      const mat = new THREE.MeshBasicMaterial({
        color: p.color,
        transparent: true,
        opacity: p.opacity,
        wireframe: true
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.rotation.x = p.rx;
      mesh.rotation.y = p.ry;
      this.ringsGroup.add(mesh);
      this.ringMeshes.push(mesh);
    });

    this.scene.add(this.ringsGroup);
  }

  initEmbers() {
    // 3. Ascending Golden Embers (Soul elevation / Kiruv ascension)
    const emberCount = 350;
    const emberGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(emberCount * 3);
    const velocities = [];

    for (let i = 0; i < emberCount; i++) {
      const idx = i * 3;
      positions[idx] = (Math.random() - 0.5) * 1000;
      positions[idx + 1] = (Math.random() - 0.5) * 1200;
      positions[idx + 2] = (Math.random() - 0.5) * 500;

      velocities.push({
        y: 0.3 + Math.random() * 0.8,
        x: (Math.random() - 0.5) * 0.2,
        z: (Math.random() - 0.5) * 0.2
      });
    }

    this.emberVelocities = velocities;
    emberGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const emberMat = new THREE.PointsMaterial({
      size: 4.5,
      color: 0xfbbf24,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    this.embers = new THREE.Points(emberGeo, emberMat);
    this.scene.add(this.embers);
  }

  bindEvents() {
    window.addEventListener('resize', () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    });

    window.addEventListener('mousemove', (e) => {
      this.mouseX = (e.clientX - window.innerWidth / 2) * 0.4;
      this.mouseY = (e.clientY - window.innerHeight / 2) * 0.4;
    });

    // Touch support for mobile devices
    window.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        this.mouseX = (e.touches[0].clientX - window.innerWidth / 2) * 0.3;
        this.mouseY = (e.touches[0].clientY - window.innerHeight / 2) * 0.3;
      }
    }, { passive: true });
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    // Smooth camera mouse follow (Parallax depth)
    this.targetX += (this.mouseX - this.targetX) * 0.03;
    this.targetY += (this.mouseY - this.targetY) * 0.03;

    this.camera.position.x = this.targetX * 0.5;
    this.camera.position.y = -this.targetY * 0.5;
    this.camera.lookAt(0, 0, 0);

    // Rotate starfield slowly
    if (this.stars) {
      this.stars.rotation.y += 0.0004;
      this.stars.rotation.x += 0.0002;
    }

    // Rotate sacred geometry celestial rings
    if (this.ringsGroup) {
      this.ringMeshes.forEach((mesh, idx) => {
        mesh.rotation.z += 0.001 * (idx % 2 === 0 ? 1 : -1);
        mesh.rotation.y += 0.0008;
      });
    }

    // Ascend embers upward
    if (this.embers) {
      const pos = this.embers.geometry.attributes.position.array;
      for (let i = 0; i < this.emberVelocities.length; i++) {
        const idx = i * 3;
        pos[idx + 1] += this.emberVelocities[i].y;
        pos[idx] += this.emberVelocities[i].x;

        // Reset if too high
        if (pos[idx + 1] > 600) {
          pos[idx + 1] = -600;
          pos[idx] = (Math.random() - 0.5) * 1000;
        }
      }
      this.embers.geometry.attributes.position.needsUpdate = true;
    }

    this.renderer.render(this.scene, this.camera);
  }
}
