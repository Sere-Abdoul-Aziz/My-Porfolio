<template>
  <div id="technologies-section" class="mt-20 text-center">
    <h1 ref="heading1" class="text-gray-200 text-3xl md:text-6xl font-bold leading-tight">
      Mes <span class="text-primary text-blue-400">Technologies</span> Favorites
    </h1>
    <div id="cubes-container" class="cubes-container"></div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

// Enregistrement de ScrollTrigger avec GSAP
gsap.registerPlugin(ScrollTrigger);

import vueLogo from '@/assets/images/vue.jpeg';
import nuxtLogo from '@/assets/images/nuxt.jpeg';
import flutterLogo from '@/assets/images/flutter.jpeg';
import reactLogo from '@/assets/images/react.jpeg';
import expressLogo from '@/assets/images/Express JS.jpeg';
import nodejsLogo from '@/assets/images/nodejs.jpeg';
import dockerLogo from '@/assets/images/docker.jpeg';
import nextLogo from '@/assets/images/next.jpeg';
import angularLogo from '@/assets/images/angular.jpeg';
import adonisLogo from '@/assets/images/adonis.jpeg';

const technologies = ref([
  { name: 'Vue.js', logo: vueLogo },
  { name: 'Nuxt.js', logo: nuxtLogo },
  { name: 'Flutter', logo: flutterLogo },
  { name: 'React.js', logo: reactLogo },
  { name: 'Express.js', logo: expressLogo },
  { name: 'Node.js', logo: nodejsLogo },
  { name: 'Docker', logo: dockerLogo },
  { name: 'Next.js', logo: nextLogo },
  { name: 'Angular', logo: angularLogo },
  { name: 'Adonis.js', logo: adonisLogo },
]);

onMounted(() => {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableZoom = false;

   // Désactiver les interactions sur les appareils mobiles
   const isMobile = window.innerWidth < 768;
  controls.enableZoom = !isMobile; // Désactiver le zoom sur mobile
  controls.enableRotate = !isMobile; // Désactiver la rotation sur mobile
  controls.enablePan = !isMobile; // Désactiver le déplacement sur mobile
  
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById('cubes-container').appendChild(renderer.domElement);

  const geometry = new RoundedBoxGeometry(1.5, 1.5, 1.5, 10, 0.4);
  const textureLoader = new THREE.TextureLoader();

  const textures = [
    textureLoader.load(vueLogo),
    textureLoader.load(nuxtLogo),
    textureLoader.load(flutterLogo),
    textureLoader.load(reactLogo),
    textureLoader.load(expressLogo),
    textureLoader.load(nodejsLogo),
    textureLoader.load(dockerLogo),
    textureLoader.load(nextLogo),
    textureLoader.load(angularLogo),
    textureLoader.load(adonisLogo),
  ];

  const cubes = textures.map(texture => {
    const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true, opacity: 0.8 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    return cube;
  });

  cubes.forEach((cube, i) => {
    cube.position.x = (i % 4) * 3 - 4.5;
    cube.position.y = Math.floor(i / 4) * 3 - 1.5;
    cube.position.z = Math.random() * 4 - 2;

    gsap.to(cube.rotation, {
      y: Math.PI * 2,
      duration: Math.random() * 5 + 5,
      repeat: -1,
      ease: "none",
      scrollTrigger: {
        trigger: "#technologies-section",
        start: "top 80%",
        toggleActions: "play none none none", // L'animation se joue une fois lorsque l'élément devient visible
      },
    });

    gsap.to(cube.position, {
      y: cube.position.y + Math.random() * 1 + 0.5,
      duration: Math.random() * 2 + 5,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
      scrollTrigger: {
        trigger: "#technologies-section",
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });
  });

  camera.position.z = 10;

  function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  }

  animate();

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
}

.cubes-container {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}
</style>
