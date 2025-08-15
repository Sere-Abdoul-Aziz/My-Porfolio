<template>
  <div id="certifications-section" class="certifications-section">
    <h1 ref="heading1" class="section-title text-3xl md:text-6xl font-bold leading-tight">
      Diplômes et Certifications <span class="text-primary text-blue-400">Professionnelles</span>
    </h1>
    
    <!-- SECTION DIPLÔMES -->
    <div class="section-container">
      <div class="section-header">
        <div class="icon-container">
          <i class="fas fa-graduation-cap"></i>
        </div>
        <h3 class="text-4xl font-bold text-gold mt-8 mb-8">Diplômes</h3>
      </div>
      
      <div class="certificates-grid">
        <div v-for="(diplome, index) in diplomes" :key="`diplome-${index}`" 
             class="certificate-card diplome-card"
             @mouseenter="startTilt($event)"
             @mouseleave="resetTilt($event)">
          <div class="card-glow"></div>
          <div class="certificate-inner">
            <div class="certificate-image">
              <!-- Gestion des erreurs pour les images -->
              <img 
                :src="diplome.image" 
                :alt="diplome.title" 
                @error="handleImageError" 
              />
              <div class="image-overlay"></div>
            </div>
            <div class="certificate-content">
              <h4 class="certificate-title">{{ diplome.title }}</h4>
              <div class="certificate-info">
                <div class="info-item">
                  <i class="far fa-calendar-alt"></i>
                  <span>{{ diplome.date }}</span>
                </div>
                <div v-if="diplome.institution" class="info-item">
                  <i class="fas fa-university"></i>
                  <span>{{ diplome.institution }}</span>
                </div>
              </div>
              <p class="certificate-description">{{ diplome.description }}</p>
              <div class="certificate-badge">
                <i class="fas fa-award"></i>
                <span>Diplôme officiel</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- SÉPARATEUR -->
    <div class="section-divider">
      <div class="divider-line"></div>
      <div class="divider-icon">
        <i class="fas fa-star"></i>
      </div>
      <div class="divider-line"></div>
    </div>
    
    <!-- SECTION CERTIFICATIONS -->
    <div class="section-container">
      <div class="section-header">
        <div class="icon-container cert-icon">
          <i class="fas fa-certificate"></i>
        </div>
        <h3 class="text-4xl font-bold text-blue-400 mt-8 mb-8">Certifications</h3>
      </div>
      
      <div class="certificates-grid">
        <div v-for="(certification, index) in certifications" :key="`cert-${index}`" 
             class="certificate-card certification-card"
             @mouseenter="startTilt($event)"
             @mouseleave="resetTilt($event)">
          <div class="card-glow blue-glow"></div>
          <div class="certificate-inner">
            <div class="certificate-logo">
              <img 
                :src="certification.image" 
                :alt="certification.title"
                @error="handleImageError"
              />
            </div>
            <div class="certificate-content">
              <h4 class="certificate-title">{{ certification.title }}</h4>
              <div class="certificate-info">
                <div class="info-item">
                  <i class="far fa-calendar-alt"></i>
                  <span>{{ certification.date }}</span>
                </div>
                <div v-if="certification.validUntil" class="info-item">
                  <i class="fas fa-hourglass-half"></i>
                  <span>Valide jusqu'au {{ certification.validUntil }}</span>
                </div>
              </div>
              <p class="certificate-description">{{ certification.description }}</p>
              <a href="#" class="verify-button">
                <i class="fas fa-external-link-alt"></i>
                Vérifier
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

// Importation correcte des images
import baccalaureatImage from '@/assets/images/Baccalauréat.jpeg';
import cyclePreparatoireImage from '@/assets/images/Prepa.png';
import ingenieurImage from '@/assets/images/Ingenieur.png';
import esbCertificationImage from '@/assets/images/ESB_logo.png';
import azureCertificationImage from '@/assets/images/microsoft_logo.jpeg';
import ccnaCertificationImage from '@/assets/images/cisco_logo.jpeg';
import placeholderImage from '@/assets/images/Ingenieur.png'; // Image de secours

// Enregistrement du plugin GSAP
gsap.registerPlugin(ScrollTrigger);

const heading1 = ref(null);

// Utilisation des images importées dans les données
const diplomes = ref([
  { 
    title: "Baccalauréat Scientifique (D)",
    date: "2019",
    image: baccalaureatImage,
    description: "Diplôme obtenu avec mention, spécialisation en mathématiques et sciences physiques.",
    institution: "Lycée"
  },
  { 
    title: "Études Universitaires - Cycle Préparatoire",
    date: "2021",
    image: cyclePreparatoireImage,
    description: "Formation préparatoire aux études d'ingénieur avec spécialité en mathématiques et physique appliquées.",
    institution: "École Supérieure"
  },
  { 
    title: "Diplôme d'Ingénieur en Génie Logiciel",
    date: "2024",
    image: ingenieurImage,
    description: "Formation complète en génie logiciel incluant le développement, la conception et la gestion de projets informatiques complexes.",
    institution: "École d'Ingénieurs"
  },
]);

const certifications = ref([
  { 
    title: "Entrepreneurship and Small Business",
    date: "Jan 2024",
    image: esbCertificationImage,
    description: "Certification validant les compétences entrepreneuriales et la gestion de petites entreprises.",
    validUntil: "Jan 2027"
  },
  { 
    title: "Microsoft Certified: Azure Fundamentals",
    date: "Janv. 2023",
    image: azureCertificationImage,
    description: "Certification validant les connaissances fondamentales sur Microsoft Azure et les services cloud.",
    validUntil: "Permanent"
  },
  { 
    title: "CCNA: Switching, Routing, and Wireless",
    date: "Avril 2022",
    image: ccnaCertificationImage,
    description: "Certification validant les compétences en réseaux informatiques, routage et configuration des équipements Cisco.",
    validUntil: "Avril 2025"
  },
]);

// Fonction pour gérer les erreurs d'image
const handleImageError = (event) => {
  event.target.src = placeholderImage;
};

// Référence pour stocker les écouteurs d'événements
const eventListeners = new Map();

// Fonction pour l'effet de tilt 3D avec gestion des écouteurs d'événements
const startTilt = (event) => {
  const card = event.currentTarget;
  const cardRect = card.getBoundingClientRect();
  const centerX = cardRect.left + cardRect.width / 2;
  const centerY = cardRect.top + cardRect.height / 2;
  
  // Fonction de gestion du mouvement
  const handleMouseMove = (e) => {
    const xPos = (e.clientX - centerX) / (cardRect.width / 2);
    const yPos = (e.clientY - centerY) / (cardRect.height / 2);
    
    gsap.to(card, {
      rotationY: xPos * 8,
      rotationX: -yPos * 8,
      ease: "power2.out",
      duration: 0.5,
      transformPerspective: 1000,
      transformOrigin: "center"
    });
    
    // Effet de mouvement du reflet
    const glow = card.querySelector('.card-glow');
    if (glow) {
      gsap.to(glow, {
        x: xPos * 15,
        y: yPos * 15,
        opacity: 0.7,
        duration: 0.5
      });
    }
  };
  
  // Stocker l'écouteur pour le supprimer plus tard
  eventListeners.set(card, handleMouseMove);
  card.addEventListener('mousemove', handleMouseMove);
};

const resetTilt = (event) => {
  const card = event.currentTarget;
  
  gsap.to(card, {
    rotationY: 0,
    rotationX: 0,
    duration: 0.7,
    ease: "elastic.out(1, 0.7)"
  });
  
  // Réinitialiser le reflet
  const glow = card.querySelector('.card-glow');
  if (glow) {
    gsap.to(glow, {
      x: 0,
      y: 0,
      opacity: 0.2,
      duration: 0.7
    });
  }
  
  // Supprimer correctement l'écouteur d'événement
  const handleMouseMove = eventListeners.get(card);
  if (handleMouseMove) {
    card.removeEventListener('mousemove', handleMouseMove);
    eventListeners.delete(card);
  }
};

onMounted(() => {
  try {
    // Animation du titre principal
    if (heading1.value) {
      gsap.from(heading1.value, {
        y: -50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      });
    }

    // Différer les animations plus complexes pour s'assurer que le DOM est prêt
    setTimeout(() => {
      // Animation des icônes d'en-tête
      gsap.utils.toArray('.icon-container').forEach((icon) => {
        if (icon) {
          gsap.from(icon, {
            scale: 0,
            rotation: -180,
            opacity: 0,
            duration: 1.5,
            ease: "elastic.out(1, 0.5)",
            scrollTrigger: {
              trigger: icon,
              start: "top bottom-=100",
              toggleActions: "play none none none"
            }
          });
        }
      });

      // Animation des cartes à l'entrée
      gsap.utils.toArray('.certificate-card').forEach((card, i) => {
        if (card) {
          gsap.from(card, {
            y: 100,
            opacity: 0,
            duration: 0.8,
            delay: i * 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top bottom-=50",
              toggleActions: "play none none none"
            }
          });
        }
      });

      // Autres animations
      const divider = document.querySelector('.section-divider');
      if (divider) {
        gsap.from(divider, {
          scaleX: 0,
          opacity: 0,
          duration: 1.2,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: divider,
            start: "top bottom-=100",
            toggleActions: "play none none none"
          }
        });
      }

      const dividerIcon = document.querySelector('.divider-icon');
      if (dividerIcon) {
        gsap.from(dividerIcon, {
          scale: 0,
          opacity: 0,
          rotation: 180,
          duration: 1.5,
          ease: "elastic.out(1, 0.5)",
          delay: 0.3,
          scrollTrigger: {
            trigger: '.section-divider',
            start: "top bottom-=100",
            toggleActions: "play none none none"
          }
        });
      }
    }, 100);
  } catch (error) {
    console.error("Erreur dans les animations GSAP:", error);
  }
});
</script>

<style scoped>
.certifications-section {
  padding: 5rem 2rem;
  text-align: center;
  position: relative;
  min-height: 100vh;
  overflow: hidden;
  
  
  /* Le fond est complètement supprimé */
}

/* Supprimer les commentaires et la balise vide */
/* .bg-pattern {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
} */

/* Ajout d'éléments flottants pour l'effet glassmorphisme */
.certifications-section::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: 
    radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.15), transparent 25%),
    radial-gradient(circle at 80% 70%, rgba(212, 175, 55, 0.15), transparent 25%);
  z-index: -1;
  animation: gradientShift 15s infinite alternate ease-in-out;
}

@keyframes gradientShift {
  0% { background-position: 0% 0%; }
  100% { background-position: 100% 100%; }
}

.section-title {
  margin-bottom: 3rem;
  color: #1e293b; /* Couleur du texte adaptée pour fond clair */
  position: relative;
  z-index: 2;
  font-weight: 700;
}

.text-blue-400 {
  color: #3b82f6;
}

.section-container {
  max-width: 1200px;
  margin: 0 auto 5rem;
    position: relative;
}

.section-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  margin-bottom: 3rem;
}

.icon-container {
  width: 80px;
  height: 80px;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  color: #b7791f;
  margin-bottom: -1rem;
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.07);
  border: 1px solid rgba(255, 255, 255, 0.7);
  position: relative;
  z-index: 2;
  transition: all 0.5s ease;
  animation: floatIcon 5s infinite alternate ease-in-out;
}
@supports (backdrop-filter: blur(8px)) or (-webkit-backdrop-filter: blur(8px)) {
  .icon-container {
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
  }
}

@keyframes floatIcon {
  0% { transform: translateY(0); }
  100% { transform: translateY(-10px); }
}

.icon-container:hover {
  transform: scale(1.1) translateY(-5px);
  box-shadow: 
    0 0 35px rgba(212, 175, 55, 0.3),
    inset 0 0 20px rgba(255, 255, 255, 0.8);
}

.cert-icon {
  background: rgba(255, 255, 255, 0.75);
  color: #2563eb;
  box-shadow: 
    0 0 25px rgba(59, 130, 246, 0.2),
    inset 0 0 15px rgba(255, 255, 255, 0.6);
}

.cert-icon:hover {
  box-shadow: 
    0 0 35px rgba(59, 130, 246, 0.3),
    inset 0 0 20px rgba(255, 255, 255, 0.8);
}

.icon-container i {
  filter: drop-shadow(0 0 5px currentColor);
}

.text-gold {
  color: #b7791f;
  text-shadow: 0 0 10px rgba(212, 175, 55, 0.3);
}

.certificates-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
  gap: 2.5rem;
  perspective: 1000px;
}

.certificate-card {
  position: relative;
  background: rgba(255, 255, 255, 0.25); /* Beaucoup plus transparent (0.25 au lieu de 0.65) */
  border: 1px solid rgba(255, 255, 255, 0.3); /* Bordure plus subtile */
  border-radius: 20px;
  overflow: hidden;
  transform-style: preserve-3d;
  box-shadow: 
    0 10px 20px rgba(31, 41, 55, 0.05),
    0 4px 6px rgba(31, 41, 55, 0.03);
  height: 100%;
  min-height: 400px;
  cursor: pointer;
  transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

@supports (backdrop-filter: blur(15px)) or (-webkit-backdrop-filter: blur(15px)) {
  .certificate-card {
    backdrop-filter: blur(15px); /* Flou plus prononcé pour compenser la transparence */
    -webkit-backdrop-filter: blur(15px);
  }
}

.certificate-card:hover {
  transform: translateY(-10px) scale(1.02);
  background: rgba(255, 255, 255, 0.35); /* Légèrement plus opaque au survol */
  box-shadow: 
    0 20px 30px rgba(31, 41, 55, 0.08),
    0 8px 12px rgba(31, 41, 55, 0.04);
}

.card-glow {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.4) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  transform: rotate(35deg) translateY(0%);
  pointer-events: none;
  z-index: 2;
  opacity: 0.3;
  transition: opacity 0.5s ease;
  animation: shineEffect 8s infinite ease-in-out;
}

@keyframes shineEffect {
  0% { transform: rotate(35deg) translateY(-80%); }
  30% { transform: rotate(35deg) translateY(80%); }
  100% { transform: rotate(35deg) translateY(-80%); }
}

.certificate-card:hover .card-glow {
  opacity: 0.6;
  animation-play-state: paused;
}

.blue-glow {
  background: linear-gradient(
    135deg,
    rgba(59, 130, 246, 0) 0%,
    rgba(59, 130, 246, 0.3) 50%,
    rgba(59, 130, 246, 0) 100%
  );
}

.certificate-inner {
  position: relative;
  z-index: 1;
  height: 100%;
  padding: 2rem;
  display: flex;
  flex-direction: column;
}

.certificate-image {
  position: relative;
  height: 160px;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 1.5rem;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.7);
  transition: transform 0.5s ease, box-shadow 0.5s ease;
}

.certificate-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.8s ease;
}

.certificate-card:hover .certificate-image {
  transform: translateY(-5px);
  box-shadow: 0 12px 25px rgba(0, 0, 0, 0.12);
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(0deg, rgba(255, 255, 255, 0.3) 0%, transparent 50%);
}

.certificate-logo {
  width: 100px;
  height: 100px;
  background: rgba(255, 255, 255, 0.4); /* Plus transparent */
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  padding: 1rem;
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.4);
  transition: transform 0.5s ease, box-shadow 0.5s ease;
}

.certificate-card:hover .certificate-logo {
  transform: translateY(-5px) scale(1.05);
  box-shadow: 
    0 12px 25px rgba(0, 0, 0, 0.08),
    inset 0 0 15px rgba(255, 255, 255, 0.8);
}

@supports (backdrop-filter: blur(5px)) or (-webkit-backdrop-filter: blur(5px)) {
  .certificate-logo {
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
  }
}



.certificate-logo img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.certificate-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  text-align: left;
}

.certificate-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #1e293b;
  line-height: 1.3;
  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.3); /* Léger texte shadow pour lisibilité */
}

.certificate-info {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: #64748b;
}

.info-item i {
  color: #b7791f;
}

.certification-card .info-item i {
  color: #2563eb;
}

.certificate-description {
  font-size: 0.95rem;
  line-height: 1.6;
  color: #1e293b; /* Plus foncé pour meilleur contraste */
  margin-bottom: 1.5rem;
  flex: 1;
}

.certificate-card:hover .certificate-image img {
  transform: scale(1.05);
}

.certificate-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(212, 175, 55, 0.1);
  padding: 0.5rem 1rem;
  border-radius: 50px;
  font-size: 0.9rem;
  font-weight: 600;
  color: #b7791f;
  align-self: flex-start;
  border: 1px solid rgba(212, 175, 55, 0.3);
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.03);
  transition: all 0.3s ease;
}

@supports (backdrop-filter: blur(5px)) or (-webkit-backdrop-filter: blur(5px)) {
  .certificate-badge {
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
  }
}

.certificate-card:hover .certificate-badge {
  background: rgba(212, 175, 55, 0.25);
  transform: translateY(-2px);
  box-shadow: 0 5px 12px rgba(0, 0, 0, 0.08);
}

.certificate-badge i {
  font-size: 1rem;
}

.verify-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(59, 130, 246, 0.1);
  padding: 0.6rem 1.2rem;
  border-radius: 50px;
  font-size: 0.95rem;
  font-weight: 600;
  color: #2563eb;
  transition: all 0.4s ease;
  text-decoration: none;
  align-self: flex-start;
  border: 1px solid rgba(59, 130, 246, 0.3);
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.03);
  position: relative;
  overflow: hidden;
}

@supports (backdrop-filter: blur(5px)) or (-webkit-backdrop-filter: blur(5px)) {
  .verify-button {
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
  }
}

.verify-button:hover {
  background: rgba(59, 130, 246, 0.25);
  transform: translateY(-3px) scale(1.03);
  box-shadow: 0 8px 15px rgba(37, 99, 235, 0.15);
}

/* Séparateur glassmorphisme */
.section-divider {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin: 5rem 0;
  position: relative;
  padding: 0 2rem;
}

.divider-line {
  height: 2px;
  background: linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.3), rgba(212, 175, 55, 0.3), transparent);
  flex: 1;
  position: relative;
  overflow: hidden;
}

.divider-line::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.8), transparent);
  animation: shimmer 3s infinite;
}

@keyframes shimmer {
  0% { left: -100%; }
  100% { left: 100%; }
}

.divider-icon {
  width: 50px;
  height: 50px;
  background: rgba(255, 255, 255, 0.35); /* Plus transparent */
  border: 1px solid rgba(255, 255, 255, 0.7);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  color: #b7791f;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  animation: pulse 3s infinite alternate;
}

@supports (backdrop-filter: blur(8px)) or (-webkit-backdrop-filter: blur(8px)) {
  .divider-icon {
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
  }
}

@keyframes pulseGlow {
  0% { box-shadow: 0 0 20px rgba(212, 175, 55, 0.2), inset 0 0 10px rgba(255, 255, 255, 0.5); }
  100% { box-shadow: 0 0 30px rgba(212, 175, 55, 0.4), inset 0 0 15px rgba(255, 255, 255, 0.7); }
}


@media (max-width: 768px) {
  .certificates-grid {
    grid-template-columns: 1fr;
  }
  
  .certificate-card {
    min-height: 350px;
  }
  
  .section-divider {
    margin: 3rem 0;
  }
  
  .certificate-title {
    font-size: 1.3rem;
  }
}
</style>
