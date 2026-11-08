import * as THREE from 'three';

export class ThreeCanvas {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    this.isTabActive = true;
    this.isMobile = window.innerWidth < 768;

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
      antialias: !this.isMobile,
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
    // Adapt particle count for mobile vs desktop for optimal 60-120fps performance
    const starCount = this.isMobile ? 1200 : 3200;
    const starGeo = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    const gold = new THREE.Color(0xf59e0b);
    const white = new THREE.Color(0xffffff);
    const cyan = new THREE.Color(0x38bdf8);
    const deepBlue = new THREE.Color(0x6366f1);

    for (let i = 0; i < starCount; i++) {
      const idx = i * 3;
      const radius = 350 + Math.random() * 1100;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      starPositions[idx] = radius * Math.sin(phi) * Math.cos(theta);
      starPositions[idx + 1] = radius * Math.sin(phi) * Math.sin(theta);
      starPositions[idx + 2] = (radius * Math.cos(phi)) - 250;

      const rand = Math.random();
      let color = white;
      if (rand < 0.28) color = gold;
      else if (rand < 0.52) color = cyan;
      else if (rand < 0.65) color = deepBlue;

      starColors[idx] = color.r;
      starColors[idx + 1] = color.g;
      starColors[idx + 2] = color.b;
    }

    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

    // Smooth circular star points
    const starCanvas = document.createElement('canvas');
    starCanvas.width = 32;
    starCanvas.height = 32;
    const starCtx = starCanvas.getContext('2d');
    const grad = starCtx.createRadialGradient(16, 16, 0, 16, 16, 16);
    grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
    grad.addColorStop(0.35, 'rgba(245, 158, 11, 0.85)');
    grad.addColorStop(0.7, 'rgba(56, 189, 248, 0.25)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    starCtx.fillStyle = grad;
    starCtx.fillRect(0, 0, 32, 32);

    const starTexture = new THREE.CanvasTexture(starCanvas);

    const starMat = new THREE.PointsMaterial({
      size: this.isMobile ? 3.0 : 3.8,
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
    this.ringsGroup = new THREE.Group();

    const ringParams = [
      { radius: 250, tube: 0.8, color: 0xd4af37, opacity: 0.45, rx: 1.1, ry: 0.4 },
      { radius: 330, tube: 0.7, color: 0x38bdf8, opacity: 0.35, rx: 0.5, ry: 1.2 },
      { radius: 410, tube: 0.9, color: 0xf59e0b, opacity: 0.3, rx: 0.8, ry: 0.9 }
    ];

    this.ringMeshes = [];

    ringParams.forEach(p => {
      const geo = new THREE.TorusGeometry(p.radius, p.tube, 16, this.isMobile ? 60 : 100);
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
    const emberCount = this.isMobile ? 120 : 300;
    const emberGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(emberCount * 3);
    const velocities = [];

    for (let i = 0; i < emberCount; i++) {
      const idx = i * 3;
      positions[idx] = (Math.random() - 0.5) * 1000;
      positions[idx + 1] = (Math.random() - 0.5) * 1200;
      positions[idx + 2] = (Math.random() - 0.5) * 500;

      velocities.push({
        y: 0.25 + Math.random() * 0.7,
        x: (Math.random() - 0.5) * 0.2,
        z: (Math.random() - 0.5) * 0.2
      });
    }

    this.emberVelocities = velocities;
    emberGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const emberMat = new THREE.PointsMaterial({
      size: 4.2,
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
      this.isMobile = window.innerWidth < 768;
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // Pause rendering when tab is inactive to save 100% GPU/battery
    document.addEventListener('visibilitychange', () => {
      this.isTabActive = !document.hidden;
      if (this.isTabActive) {
        this.animate();
      }
    });

    // Passive mouse listener for buttery smooth scrolling
    window.addEventListener('mousemove', (e) => {
      this.mouseX = (e.clientX - window.innerWidth / 2) * 0.35;
      this.mouseY = (e.clientY - window.innerHeight / 2) * 0.35;
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        this.mouseX = (e.touches[0].clientX - window.innerWidth / 2) * 0.25;
        this.mouseY = (e.touches[0].clientY - window.innerHeight / 2) * 0.25;
      }
    }, { passive: true });
  }

  animate() {
    if (!this.isTabActive) return;
    requestAnimationFrame(() => this.animate());

    this.targetX += (this.mouseX - this.targetX) * 0.035;
    this.targetY += (this.mouseY - this.targetY) * 0.035;

    this.camera.position.x = this.targetX * 0.45;
    this.camera.position.y = -this.targetY * 0.45;
    this.camera.lookAt(0, 0, 0);

    if (this.stars) {
      this.stars.rotation.y += 0.00035;
      this.stars.rotation.x += 0.00015;
    }

    if (this.ringsGroup) {
      this.ringMeshes.forEach((mesh, idx) => {
        mesh.rotation.z += 0.0008 * (idx % 2 === 0 ? 1 : -1);
        mesh.rotation.y += 0.0006;
      });
    }

    if (this.embers) {
      const pos = this.embers.geometry.attributes.position.array;
      for (let i = 0; i < this.emberVelocities.length; i++) {
        const idx = i * 3;
        pos[idx + 1] += this.emberVelocities[i].y;
        pos[idx] += this.emberVelocities[i].x;

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
