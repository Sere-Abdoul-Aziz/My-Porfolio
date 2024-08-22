<template>
    <div id="certifications-section" class="certifications-section">
      <h1 ref="heading1" class="text-gray-200 text-3xl md:text-6xl font-bold leading-tight">
        Diplômes et Certifications <span class="text-primary text-blue-400">Professionnelles</span>
      </h1>
      
      <h3 class="text-4xl font-bold text-gold mt-8 mb-8">Diplômes</h3>
      <div class="certificates-container font-fira-code">
        <div v-for="(diplome, index) in diplomes" :key="index" class="certificate-card">
          <img :src="diplome.image" alt="Diplôme Image" class="certificate-background" />
          <div class="certificate-content">
            <h4 class="certificate-title">{{ diplome.title }}</h4>
            <p class="certificate-date">{{ diplome.date }}</p>
          </div>
        </div>
      </div>
  
      <h3 class="text-4xl font-bold text-gold mb-6 mt-10">Certifications</h3>
      <div class="certificates-container">
        <div v-for="(certification, index) in certifications" :key="index" class="certificate-card">
          <img :src="certification.image" alt="Certification Image" class="certificate-background" />
          <div class="certificate-content">
            <h4 class="certificate-title">{{ certification.title }}</h4>
            <p class="certificate-date">{{ certification.date }}</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
    import baccalaureatImage from '@/assets/images/Baccalauréat.jpeg';
    import cyclePreparatoireImage from '@/assets/images/prepa.png';
    import ingenieurImage from '@/assets/images/Ingenieur.png';
    import esbCertificationImage from '@/assets/images/ESB_logo.png';
    import azureCertificationImage from '@/assets/images/microsoft_logo.jpeg';
    import ccnaCertificationImage from '@/assets/images/cisco_logo.jpeg';
    import goldimage from '@/assets/images/gold.png';
    import gsap from 'gsap';

    const diplomes = [
  { title: "Baccalauréat Scientifique (D)", date: "2019", image: baccalaureatImage },
  { title: "Diplôme D'Etudes Universitaires Du Premier Cycle Préparatoire en MATH-Physique Aux Etudes D'Ingénieurs", date: "2021", image: cyclePreparatoireImage },
  { title: "Diplômes d'ingénieur Genie Logiciel", date: "2024", image: ingenieurImage },
];

const certifications = [
  { title: "Entrepreneurship and Small Business (ESB)", date: "Jan 2024", image: esbCertificationImage },
  { title: "Microsoft Certified: Azure Fundamentals", date: "Janv. 2023", image: azureCertificationImage },
  { title: "CCNA: Switching, Routing, and Wireless Essentials", date: "Avril 2022", image: ccnaCertificationImage },
];

onMounted(() => {
  gsap.from('.certificate-card', {
    y: 100,
    opacity: 0,
    duration: 1.5,
    stagger: 0.3,
    ease: 'power4.out',
    scrollTrigger: {
      trigger: '#certifications-section',
      start: 'top 100%',
      toggleActions: 'play none none none', // L'animation se joue une fois lorsque l'élément devient visible
    }
  });
});
  </script>
  
  <style scoped>
  .certifications-section {
    padding: 2rem;
    text-align: center;
    position: relative;
  }

  .font-fira-code {
  font-family: 'Fira Code', monospace;
  text-align: justify
}

  
  .certificate-card {
    position: relative;
    z-index: 2;
    width: 300px;
    margin: 1rem;
    padding: 2rem;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 15px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(5px);
  }
  
  .text-gold {
    color: #d4af37;
  }
  
  .certificates-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
  
  .certificate-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.5;
    z-index: 1;
    border-radius: 15px;
  }
  
  .certificate-content {
    position: relative;
    z-index: 2;
    text-align: center;
    color: #d4d4d4;
  }
  
  .certificate-title {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
    color: #fff;
  }
  
  .certificate-date {
    font-size: 1rem;
    color: #d4af37;
  }
  </style>
  