<template>
  <section id="technologies-section" class="tech-section">
    <!-- Hover label (fixed, follows cube) -->
    <div
      class="cube-label"
      :style="{
        left: labelPos.x + 'px',
        top: labelPos.y + 'px',
        opacity: hoveredTech ? 1 : 0,
      }"
    >
      {{ hoveredTech }}
    </div>

    <!-- Header -->
    <header ref="headerRef" class="tech-header">
      <div class="tech-badge">
        <span class="badge-dot" aria-hidden="true"></span>
        Stack Technique
      </div>
      <h2 class="tech-title">
        Mes <span class="tech-highlight">Technologies</span> Favorites
      </h2>
      <p class="tech-subtitle">{{ technologies.length }} technologies maîtrisées</p>
    </header>

    <!-- Three.js canvas container -->
    <div ref="containerRef" class="cubes-container">
      <Transition name="fade">
        <div v-if="isLoading" class="loading-state">
          <div class="loading-ring" aria-hidden="true"></div>
          <span>Chargement des technologies...</span>
        </div>
      </Transition>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const containerRef = ref(null);
const headerRef = ref(null);
const isLoading = ref(true);
const hoveredTech = ref('');
const labelPos = reactive({ x: 0, y: 0 });

// Simple Icons CDN replaces the defunct Clearbit API.
// Icons that are black by default get /ffffff to stay visible on dark background.
const technologies = [
  { name: 'Vue.js',      iconUrl: 'https://cdn.simpleicons.org/vuedotjs' },
  { name: 'Nuxt.js',     iconUrl: 'https://cdn.simpleicons.org/nuxtdotjs' },
  { name: 'React',       iconUrl: 'https://cdn.simpleicons.org/react' },
  { name: 'Next.js',     iconUrl: 'https://cdn.simpleicons.org/nextdotjs/ffffff' },
  { name: 'Angular',     iconUrl: 'https://cdn.simpleicons.org/angular' },
  { name: 'Flutter',     iconUrl: 'https://cdn.simpleicons.org/flutter' },
  { name: 'Node.js',     iconUrl: 'https://cdn.simpleicons.org/nodedotjs' },
  { name: 'Express.js',  iconUrl: 'https://cdn.simpleicons.org/express/ffffff' },
  { name: 'AdonisJS',    iconUrl: 'https://cdn.simpleicons.org/adonisjs' },
  { name: 'Laravel',     iconUrl: 'https://cdn.simpleicons.org/laravel' },
  { name: 'TypeScript',  iconUrl: 'https://cdn.simpleicons.org/typescript' },
  { name: 'TailwindCSS', iconUrl: 'https://cdn.simpleicons.org/tailwindcss' },
  { name: 'Docker',      iconUrl: 'https://cdn.simpleicons.org/docker' },
  { name: 'Kubernetes',  iconUrl: 'https://cdn.simpleicons.org/kubernetes' },
  { name: 'MongoDB',     iconUrl: 'https://cdn.simpleicons.org/mongodb' },
  { name: 'PostgreSQL',  iconUrl: 'https://cdn.simpleicons.org/postgresql' },
  { name: 'Firebase',    iconUrl: 'https://cdn.simpleicons.org/firebase' },
  { name: 'Redis',       iconUrl: 'https://cdn.simpleicons.org/redis' },
  { name: 'GraphQL',      iconUrl: 'https://cdn.simpleicons.org/graphql' },
  { name: 'GitHub',       iconUrl: 'https://cdn.simpleicons.org/github/ffffff' },
  // Microservices
  { name: 'Java',         iconUrl: 'https://cdn.simpleicons.org/openjdk' },
  { name: 'Spring Boot',  iconUrl: 'https://cdn.simpleicons.org/springboot' },
  { name: 'Kafka',        iconUrl: 'https://cdn.simpleicons.org/apachekafka/ffffff' },
  { name: 'RabbitMQ',     iconUrl: 'https://cdn.simpleicons.org/rabbitmq' },
  { name: 'Nginx',        iconUrl: 'https://cdn.simpleicons.org/nginx' },
  { name: 'Keycloak',     iconUrl: 'https://cdn.simpleicons.org/keycloak' },
  { name: 'Prometheus',   iconUrl: 'https://cdn.simpleicons.org/prometheus' },
  { name: 'Grafana',      iconUrl: 'https://cdn.simpleicons.org/grafana' },
];

// Fetch SVG → Blob URL → draw to canvas → CanvasTexture.
// This avoids the CORS/SVG limitations of THREE.TextureLoader.
async function loadSvgTexture(iconUrl, size = 256) {
  return new Promise(async (resolve) => {
    try {
      const res = await fetch(iconUrl);
      if (!res.ok) throw new Error();
      const svg = await res.text();
      const blob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
      const blobUrl = URL.createObjectURL(blob);

      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = canvas.height = size;
        const ctx = canvas.getContext('2d');

        // Rounded card background
        const grad = ctx.createRadialGradient(size * 0.5, size * 0.25, 0, size * 0.5, size * 0.5, size * 0.75);
        grad.addColorStop(0, 'rgba(28, 40, 100, 0.97)');
        grad.addColorStop(1, 'rgba(8, 16, 45, 0.99)');
        const r = 32;
        ctx.beginPath();
        ctx.moveTo(r, 0); ctx.lineTo(size - r, 0); ctx.quadraticCurveTo(size, 0, size, r);
        ctx.lineTo(size, size - r); ctx.quadraticCurveTo(size, size, size - r, size);
        ctx.lineTo(r, size); ctx.quadraticCurveTo(0, size, 0, size - r);
        ctx.lineTo(0, r); ctx.quadraticCurveTo(0, 0, r, 0);
        ctx.closePath();
        ctx.fillStyle = grad;
        ctx.fill();

        // Subtle blue border
        ctx.strokeStyle = 'rgba(96, 165, 250, 0.28)';
        ctx.lineWidth = 2.5;
        ctx.stroke();

        // Icon centered with padding
        const p = size * 0.2;
        ctx.drawImage(img, p, p, size - p * 2, size - p * 2);

        URL.revokeObjectURL(blobUrl);
        const tex = new THREE.CanvasTexture(canvas);
        tex.colorSpace = THREE.SRGBColorSpace;
        resolve(tex);
      };
      img.onerror = () => { URL.revokeObjectURL(blobUrl); resolve(makeFallbackTexture(size)); };
      img.src = blobUrl;
    } catch {
      resolve(makeFallbackTexture(size));
    }
  });
}

function makeFallbackTexture(size = 256) {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#0d1b3e';
  ctx.fillRect(0, 0, size, size);
  ctx.fillStyle = 'rgba(96, 165, 250, 0.4)';
  ctx.font = `bold ${Math.round(size * 0.28)}px system-ui`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('?', size / 2, size / 2);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

// Cleanup handles stored at module scope so onUnmounted can reach them
let rafId = null;
let rendererInstance = null;
let canvasElement = null;
let onScrollFn = null;
let onResizeFn = null;
let onMouseMoveFn = null;
let vortexTimer = null;
const stInstances = [];
const disposables = [];

onMounted(async () => {
  const container = containerRef.value;
  const W = window.innerWidth;
  const H = window.innerHeight;

  // --- Scene ---
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x060c1a, 0.013);

  // --- Camera ---
  const camera = new THREE.PerspectiveCamera(40, W / H, 0.1, 1000);
  camera.position.z = 18;

  // --- Renderer ---
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setSize(W, H);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  container.appendChild(renderer.domElement);
  rendererInstance = renderer;
  canvasElement = renderer.domElement;

  // --- Lights (MeshStandardMaterial requires lights) ---
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
  scene.add(ambientLight);

  const blueLight = new THREE.PointLight(0x3b82f6, 4.5, 50);
  blueLight.position.set(8, 6, 12);
  scene.add(blueLight);

  const purpleLight = new THREE.PointLight(0x7c3aed, 3, 45);
  purpleLight.position.set(-8, -5, 10);
  scene.add(purpleLight);

  const rimLight = new THREE.DirectionalLight(0xbfdbfe, 0.7);
  rimLight.position.set(0, 10, 5);
  scene.add(rimLight);

  // --- Star field ---
  const starCount = 300;
  const starPos = new Float32Array(starCount * 3);
  for (let i = 0; i < starCount * 3; i++) starPos[i] = (Math.random() - 0.5) * 100;
  const starGeo = new THREE.BufferGeometry();
  starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
  const starMat = new THREE.PointsMaterial({ color: 0x93c5fd, size: 0.07, transparent: true, opacity: 0.6 });
  const stars = new THREE.Points(starGeo, starMat);
  scene.add(stars);
  disposables.push(starGeo, starMat);

  // --- OrbitControls ---
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableZoom = false;
  controls.enablePan = false;
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 0.15;

  // --- Load textures (SVG → CanvasTexture) ---
  const textures = await Promise.all(technologies.map(t => loadSvgTexture(t.iconUrl)));
  isLoading.value = false;

  // --- Shared geometry ---
  const geo = new RoundedBoxGeometry(1.4, 1.4, 1.4, 8, 0.28);
  disposables.push(geo);

  // --- Cubes ---
  const cubes = technologies.map((tech, i) => {
    const mat = new THREE.MeshStandardMaterial({
      map: textures[i],
      roughness: 0.2,
      metalness: 0.12,
      emissive: new THREE.Color(0x3b82f6),
      emissiveIntensity: 0,
    });
    disposables.push(mat, textures[i]);
    const mesh = new THREE.Mesh(geo, mat);
    mesh.userData.name = tech.name;
    scene.add(mesh);
    return mesh;
  });

  // --- Grid layout ---
  const cols = 5;
  const rows = Math.ceil(technologies.length / cols);
  const origPos = cubes.map((cube, i) => {
    const x = (i % cols) * 3.2 - (cols - 1) * 1.6;
    const y = -(Math.floor(i / cols) * 3.2 - (rows - 1) * 1.6);
    const z = (Math.random() - 0.5) * 1.5;
    cube.position.set(x, y, z);
    return { x, y, z };
  });

  // --- Idle: gentle float + slow Y-rotation ---
  cubes.forEach((cube, i) => {
    gsap.to(cube.rotation, {
      y: Math.PI * 2,
      duration: 8 + Math.random() * 5,
      repeat: -1,
      ease: 'none',
    });
    gsap.to(cube.position, {
      y: origPos[i].y + 0.35 + Math.random() * 0.25,
      duration: 3 + Math.random() * 2,
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut',
    });
  });

  // --- Entrance: cubes scale in on scroll ---
  const entranceST = gsap.from(cubes.map(c => c.scale), {
    x: 0, y: 0, z: 0,
    duration: 0.55,
    stagger: { amount: 0.8, from: 'start' },
    ease: 'back.out(1.5)',
    scrollTrigger: { trigger: container, start: 'top 85%', once: true },
  });
  if (entranceST.scrollTrigger) stInstances.push(entranceST.scrollTrigger);

  // --- Header GSAP entrance ---
  const headerST = gsap.from(Array.from(headerRef.value.children), {
    opacity: 0, y: 22,
    duration: 0.65,
    stagger: 0.13,
    ease: 'power3.out',
    scrollTrigger: { trigger: headerRef.value, start: 'top 88%', once: true },
  });
  if (headerST.scrollTrigger) stInstances.push(headerST.scrollTrigger);

  // --- Raycasting hover ---
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  let activeCube = null;

  onMouseMoveFn = (e) => {
    const rect = renderer.domElement.getBoundingClientRect();
    mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const hits = raycaster.intersectObjects(cubes);

    if (hits.length > 0) {
      const hit = hits[0].object;
      if (hit !== activeCube) {
        // Unhover previous
        if (activeCube) {
          gsap.to(activeCube.scale, { x: 1, y: 1, z: 1, duration: 0.3, ease: 'power2.out' });
          gsap.to(activeCube.material, { emissiveIntensity: 0, duration: 0.3 });
        }
        activeCube = hit;
        hoveredTech.value = hit.userData.name;
        gsap.to(hit.scale, { x: 1.22, y: 1.22, z: 1.22, duration: 0.35, ease: 'back.out(1.7)' });
        gsap.to(hit.material, { emissiveIntensity: 0.4, duration: 0.3 });
      }
      // Reproject label position each frame
      const v = hit.position.clone().project(camera);
      const r = renderer.domElement.getBoundingClientRect();
      labelPos.x = (v.x * 0.5 + 0.5) * r.width + r.left;
      labelPos.y = (-v.y * 0.5 + 0.5) * r.height + r.top - 58;
    } else if (activeCube) {
      gsap.to(activeCube.scale, { x: 1, y: 1, z: 1, duration: 0.3, ease: 'power2.out' });
      gsap.to(activeCube.material, { emissiveIntensity: 0, duration: 0.3 });
      activeCube = null;
      hoveredTech.value = '';
    }
  };
  renderer.domElement.addEventListener('mousemove', onMouseMoveFn);

  // --- Scroll vortex (improved: cubes orbit around their grid origin) ---
  let lastScrollY = window.scrollY;

  onScrollFn = () => {
    const sectionRect = document.getElementById('technologies-section').getBoundingClientRect();
    if (sectionRect.top > window.innerHeight || sectionRect.bottom < 0) return;

    const curY = window.scrollY;
    const delta = curY - lastScrollY;
    const speed = Math.abs(delta);
    lastScrollY = curY;

    if (speed < 2) return;

    clearTimeout(vortexTimer);
    const dir = delta >= 0 ? 1 : -1;
    const strength = Math.min(speed / 28, 1);

    cubes.forEach((cube, i) => {
      // Orbit around each cube's original position (avoids flying off-screen)
      const angle = i * (Math.PI * 2 / cubes.length) + curY * 0.004;
      const radius = (1.5 + (i % 5) * 0.5) * strength;

      gsap.to(cube.position, {
        x: origPos[i].x + Math.cos(angle) * radius,
        y: origPos[i].y + Math.sin(angle) * radius,
        z: origPos[i].z + dir * strength * 3.5,
        duration: 0.7,
        ease: 'power2.out',
        overwrite: 'auto',
      });
      gsap.to(cube.rotation, {
        x: `+=${dir * 0.35 * strength}`,
        z: `+=${dir * 0.25 * strength}`,
        duration: 0.7,
        ease: 'power2.out',
        overwrite: false,
      });
    });

    // Snap back to grid after scroll stops
    vortexTimer = setTimeout(() => {
      cubes.forEach((cube, i) => {
        gsap.to(cube.position, {
          x: origPos[i].x,
          y: origPos[i].y,
          z: origPos[i].z,
          duration: 1.4,
          ease: 'elastic.out(1, 0.45)',
          overwrite: 'auto',
        });
      });
    }, 180);
  };
  window.addEventListener('scroll', onScrollFn, { passive: true });

  // --- Resize ---
  onResizeFn = () => {
    const W = window.innerWidth;
    const H = window.innerHeight;
    renderer.setSize(W, H);
    camera.aspect = W / H;
    camera.updateProjectionMatrix();
  };
  window.addEventListener('resize', onResizeFn);

  // --- Render loop ---
  const tick = () => {
    rafId = requestAnimationFrame(tick);
    stars.rotation.y += 0.00015;
    stars.rotation.x += 0.00005;
    controls.update();
    renderer.render(scene, camera);
  };
  tick();
});

onUnmounted(() => {
  if (rafId) cancelAnimationFrame(rafId);
  if (onScrollFn) window.removeEventListener('scroll', onScrollFn);
  if (onResizeFn) window.removeEventListener('resize', onResizeFn);
  if (vortexTimer) clearTimeout(vortexTimer);
  if (canvasElement && onMouseMoveFn) canvasElement.removeEventListener('mousemove', onMouseMoveFn);
  stInstances.forEach(st => st?.kill());
  disposables.forEach(d => d?.dispose?.());
  if (rendererInstance) {
    rendererInstance.dispose();
    canvasElement?.remove();
  }
});
</script>

<style scoped>
/* ─── Section ─── */
.tech-section {
  position: relative;
  height: 100vh;
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding-top: 4rem;
}

/* ─── Hover label ─── */
.cube-label {
  position: fixed;
  z-index: 200;
  padding: 0.38rem 1rem;
  background: rgba(10, 20, 50, 0.9);
  border: 1px solid rgba(96, 165, 250, 0.45);
  border-radius: 100px;
  color: #93c5fd;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.03em;
  pointer-events: none;
  transform: translateX(-50%);
  transition: opacity 0.2s ease;
  white-space: nowrap;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  box-shadow: 0 0 18px rgba(59, 130, 246, 0.35), 0 2px 8px rgba(0, 0, 0, 0.4);
}

/* ─── Header ─── */
.tech-header {
  position: relative;
  z-index: 10;
  text-align: center;
  padding: 0 1.5rem 1.5rem;
}

.tech-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.35rem 1.1rem;
  background: rgba(59, 130, 246, 0.1);
  border: 1px solid rgba(59, 130, 246, 0.22);
  border-radius: 100px;
  color: #93c5fd;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.13em;
  text-transform: uppercase;
  margin-bottom: 1.2rem;
}

.badge-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #60a5fa;
  animation: pulseDot 2s ease-in-out infinite;
}

@keyframes pulseDot {
  0%, 100% { opacity: 1; transform: scale(1); }
  50%       { opacity: 0.35; transform: scale(0.6); }
}

.tech-title {
  font-size: clamp(1.8rem, 5vw, 3.5rem);
  font-weight: 800;
  color: #f1f5f9;
  line-height: 1.15;
  letter-spacing: -0.025em;
  margin: 0 0 0.7rem;
}

.tech-highlight {
  background: linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.tech-subtitle {
  color: #475569;
  font-size: 0.88rem;
  margin: 0;
}

/* ─── Canvas container ─── */
.cubes-container {
  flex: 1;
  position: relative;
}

/* ─── Loading ─── */
.loading-state {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  color: #475569;
  font-size: 0.88rem;
  z-index: 20;
}

.loading-ring {
  width: 34px;
  height: 34px;
  border: 2.5px solid rgba(96, 165, 250, 0.12);
  border-top-color: #60a5fa;
  border-radius: 50%;
  animation: spin 0.9s linear infinite;
}

@keyframes spin { to { transform: rotate(360deg); } }

/* ─── Transitions ─── */
.fade-enter-active,
.fade-leave-active { transition: opacity 0.4s ease; }
.fade-enter-from,
.fade-leave-to    { opacity: 0; }
</style>
