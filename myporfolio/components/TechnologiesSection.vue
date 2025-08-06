<template>
  <div id="technologies-section" class="mt-20 text-center">
    <h1 ref="heading1" class="text-gray-200 text-3xl md:text-6xl font-bold leading-tight">
      Mes <span class="text-primary text-blue-400">Technologies</span> Favorites
    </h1>
    <div id="cubes-container" class="cubes-container"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

// Enregistrement de ScrollTrigger avec GSAP
gsap.registerPlugin(ScrollTrigger);

// Logo par défaut en cas d'erreur de chargement
import defaultLogo from '@/assets/images/nuxt.jpeg';

// Variables pour l'animation de tourbillon
const scrollY = ref(0);
const lastScrollTop = ref(0);
const scrollDirection = ref(0);
const originalPositions = ref([]);
const isInVortexMode = ref(false);

// Définition des technologies avec les URLs Clearbit
const technologies = ref([
  { name: 'Vue.js', logo: null, logoUrl: 'https://logo.clearbit.com/vuejs.org' },
  { name: 'Nuxt.js', logo: null, logoUrl: 'https://logo.clearbit.com/nuxtjs.org' },
  { name: 'Flutter', logo: null, logoUrl: 'https://logo.clearbit.com/flutter.dev' },
  { name: 'React.js', logo: null, logoUrl: 'https://logo.clearbit.com/reactjs.org' },
  { name: 'Express.js', logo: null, logoUrl: 'https://logo.clearbit.com/expressjs.com' },
  { name: 'Node.js', logo: null, logoUrl: 'https://logo.clearbit.com/nodejs.org' },
  { name: 'Docker', logo: null, logoUrl: 'https://logo.clearbit.com/docker.com' },
  { name: 'Next.js', logo: null, logoUrl: 'https://logo.clearbit.com/nextjs.org' },
  { name: 'Angular', logo: null, logoUrl: 'https://logo.clearbit.com/angular.io' },
  { name: 'Adonis.js', logo: null, logoUrl: 'https://logo.clearbit.com/adonisjs.com' },
  
  // Ajout de nouvelles technologies
  { name: 'TailwindCSS', logo: null, logoUrl: 'https://logo.clearbit.com/tailwindcss.com' },
  { name: 'TypeScript', logo: null, logoUrl: 'https://logo.clearbit.com/typescriptlang.org' },
  { name: 'Laravel', logo: null, logoUrl: 'https://logo.clearbit.com/laravel.com' },
  { name: 'MongoDB', logo: null, logoUrl: 'https://logo.clearbit.com/mongodb.com' },
  { name: 'PostgreSQL', logo: null, logoUrl: 'https://logo.clearbit.com/postgresql.org' },
  { name: 'Firebase', logo: null, logoUrl: 'https://logo.clearbit.com/firebase.google.com' },
  { name: 'Kubernetes', logo: null, logoUrl: 'https://logo.clearbit.com/kubernetes.io' },
  { name: 'GraphQL', logo: null, logoUrl: 'https://logo.clearbit.com/graphql.org' },
  { name: 'GitHub', logo: null, logoUrl: 'https://logo.clearbit.com/github.com' },
  { name: 'Redis', logo: null, logoUrl: 'https://logo.clearbit.com/redis.io' },
]);

onMounted(async () => {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableZoom = false;

  // // Configuration pour les appareils mobiles
  // const isMobile = window.innerWidth < 768;
  // controls.enableZoom = !isMobile;
  // controls.enableRotate = !isMobile;
  // controls.enablePan = !isMobile;
  
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById('cubes-container').appendChild(renderer.domElement);

  const geometry = new RoundedBoxGeometry(1.5, 1.5, 1.5, 10, 0.4);
  const textureLoader = new THREE.TextureLoader();
  
  // Indicateur de chargement
  const loadingElement = document.createElement('div');
  loadingElement.className = 'loading-technologies';
  loadingElement.textContent = 'Chargement des technologies...';
  loadingElement.style.position = 'absolute';
  loadingElement.style.top = '50%';
  loadingElement.style.left = '50%';
  loadingElement.style.transform = 'translate(-50%, -50%)';
  loadingElement.style.color = 'white';
  loadingElement.style.fontSize = '1.2rem';
  document.getElementById('cubes-container').appendChild(loadingElement);

  // Chargement des textures
  await Promise.all(
    technologies.value.map(async (tech) => {
      try {
        return new Promise((resolve) => {
          textureLoader.load(
            tech.logoUrl, 
            (texture) => {
              tech.logo = texture;
              resolve();
            },
            undefined,
            (error) => {
              console.error(`Erreur de chargement pour ${tech.name}:`, error);
              const fallbackUrl = `https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/${tech.name.toLowerCase().replace('.js', '')}.svg`;
              textureLoader.load(
                fallbackUrl,
                (texture) => {
                  tech.logo = texture;
                  resolve();
                },
                undefined,
                () => {
                  textureLoader.load(
                    defaultLogo,
                    (texture) => {
                      tech.logo = texture;
                      resolve();
                    }
                  );
                }
              );
            }
          );
        });
      } catch (e) {
        console.error(`Erreur pour ${tech.name}:`, e);
        tech.logo = textureLoader.load(defaultLogo);
      }
    })
  );
  
  if (loadingElement.parentNode) {
    loadingElement.parentNode.removeChild(loadingElement);
  }

  // Création des cubes
  const cubes = technologies.value.map(tech => {
    const material = new THREE.MeshBasicMaterial({ 
      map: tech.logo, 
      transparent: true, 
      opacity: 0.8 
    });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    return cube;
  });

  // Disposition initiale des cubes
  cubes.forEach((cube, i) => {
    const columns = 5;
    const rows = Math.ceil(technologies.value.length / columns);
    
    cube.position.x = (i % columns) * 3 - (columns - 1) * 1.5;
    cube.position.y = Math.floor(i / columns) * 3 - (rows - 1) * 1.5;
    cube.position.z = Math.random() * 4 - 2;
    
    // Sauvegarder la position initiale pour pouvoir y revenir après l'animation
    originalPositions.value.push({
      x: cube.position.x,
      y: cube.position.y,
      z: cube.position.z
    });

    // Animation de base (rotation)
    gsap.to(cube.rotation, {
      y: Math.PI * 2,
      duration: Math.random() * 5 + 5,
      repeat: -1,
      ease: "none"
    });

    // Animation de flottement
    gsap.to(cube.position, {
      y: cube.position.y + Math.random() * 1 + 0.5,
      duration: Math.random() * 2 + 5,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut"
    });
  });

  // Position initiale de la caméra
  camera.position.z = 15;

  // Animation principale
  function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  }

  animate();

  // Gestionnaire d'événement de défilement pour l'animation en tourbillon
  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const sectionRect = document.getElementById('technologies-section').getBoundingClientRect();
    
    // Vérifier si la section est visible
    if (sectionRect.top < window.innerHeight && sectionRect.bottom > 0) {
      const currentScrollY = window.scrollY;
      scrollDirection.value = currentScrollY > lastScrollTop.value ? 1 : -1;
      
      // Calcul de la force du tourbillon basé sur la vitesse de défilement
      const scrollSpeed = Math.abs(currentScrollY - lastScrollTop.value);
      const normalizedSpeed = Math.min(scrollSpeed / 30, 1);
      const vortexStrength = normalizedSpeed * 2;
      
      // Activer le mode tourbillon seulement avec un défilement significatif
      if (scrollSpeed > 5) {
        isInVortexMode.value = true;
        
        // Animer les cubes en tourbillon
        cubes.forEach((cube, i) => {
          const angle = i * (Math.PI / (cubes.length / 2)) + (scrollY.value * 0.05);
          const radius = 8 + (i % 5) * 1.5; // Rayon variable pour un effet plus dynamique
          const targetZ = -15 + (i % 5) * 2.5 * scrollDirection.value;
          
          gsap.to(cube.position, {
            x: Math.cos(angle) * radius * vortexStrength,
            y: Math.sin(angle) * radius * vortexStrength,
            z: targetZ * vortexStrength,
            duration: 0.8,
            ease: "power2.out"
          });
          
          // Rotation accélérée en mode tourbillon
          gsap.to(cube.rotation, {
            x: cube.rotation.x + Math.random() * 2 * scrollDirection.value,
            y: cube.rotation.y + Math.random() * 2 * scrollDirection.value,
            z: cube.rotation.z + Math.random() * 2 * scrollDirection.value,
            duration: 0.8,
            ease: "power2.out"
          });
        });
      } else if (isInVortexMode.value && scrollSpeed < 2) {
        // Retourner à la position d'origine quand le défilement ralentit
        isInVortexMode.value = false;
        
        cubes.forEach((cube, i) => {
          gsap.to(cube.position, {
            x: originalPositions.value[i].x,
            y: originalPositions.value[i].y,
            z: originalPositions.value[i].z,
            duration: 1.5,
            ease: "elastic.out(1, 0.5)"
          });
        });
      }
      
      lastScrollTop.value = currentScrollY;
      scrollY.value = currentScrollY;
    }
  });

  // Gestion du redimensionnement
  window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  });
});
</script>

<style scoped>
#technologies-section {
  position: relative;
  height: 100vh;
  width: 100%;
  overflow: hidden;
}

.cubes-container {
  width: 100%;
  height: 100%;
  position: relative;
}

.loading-technologies {
  background: rgba(0, 0, 0, 0.5);
  padding: 1rem 2rem;
  border-radius: 8px;
  z-index: 10;
  backdrop-filter: blur(4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  animation: pulse 1.5s infinite alternate;
}

@keyframes pulse {
  from { opacity: 0.7; }
  to { opacity: 1; }
}
</style>
