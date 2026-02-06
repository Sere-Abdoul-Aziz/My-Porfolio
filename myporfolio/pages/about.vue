<template>
  <div class="about-page min-h-screen bg-gradient-to-b from-gray-900 via-blue-900 to-gray-900 py-20 px-4">
    <div class="max-w-6xl mx-auto">
      <!-- SEO optimisé : H1 avec mots-clés principaux -->
      <header class="text-center mb-16">
        <h1 class="text-5xl md:text-7xl font-bold text-white mb-6">
          À propos de <span class="text-blue-400">Sere Aziz</span>
        </h1>
        <p class="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
          Développeur Fullstack Expert basé à Ouagadougou, Burkina Faso
        </p>
      </header>

      <!-- Section Présentation -->
      <section class="mb-16 bg-white/10 backdrop-blur-lg rounded-2xl p-8 md:p-12">
        <h2 class="text-3xl md:text-4xl font-bold text-blue-400 mb-6">Qui suis-je ?</h2>
        <div class="text-gray-200 text-lg leading-relaxed space-y-4">
          <p>
            Je suis <strong>Sere Aziz</strong> (également connu sous le nom <strong>Aziz Sere</strong> ou <strong>SERE Abdoul Aziz</strong>), 
            un ingénieur en génie logiciel passionné et spécialisé dans le <strong>développement web et mobile fullstack</strong>.
          </p>
          <p>
            Basé à <strong>Ouagadougou, Burkina Faso</strong>, je mets mon expertise technique au service d'entreprises, 
            startups et entrepreneurs pour transformer leurs idées en <strong>solutions digitales performantes et innovantes</strong>.
          </p>
          <p>
            Avec plusieurs années d'expérience dans le développement d'applications web et mobiles, 
            je maîtrise un large éventail de technologies modernes incluant <strong>Vue.js, Nuxt.js, React, Node.js, Flutter, Firebase, et bien plus</strong>.
          </p>
        </div>
      </section>

      <!-- Section Expertise -->
      <section class="mb-16 bg-white/10 backdrop-blur-lg rounded-2xl p-8 md:p-12">
        <h2 class="text-3xl md:text-4xl font-bold text-blue-400 mb-6">Mon Expertise Technique</h2>
        
        <div class="grid md:grid-cols-2 gap-8">
          <!-- Frontend -->
          <div>
            <h3 class="text-2xl font-bold text-white mb-4 flex items-center">
              <span class="text-blue-400 mr-3">⚡</span> Développement Frontend
            </h3>
            <ul class="text-gray-200 space-y-2">
              <li><strong>Vue.js & Nuxt.js</strong> - Framework JavaScript réactif</li>
              <li><strong>React & Next.js</strong> - Applications web modernes</li>
              <li><strong>Tailwind CSS</strong> - Design responsive et moderne</li>
              <li><strong>GSAP & Three.js</strong> - Animations et effets 3D</li>
              <li><strong>TypeScript</strong> - Code robuste et maintenable</li>
            </ul>
          </div>

          <!-- Backend -->
          <div>
            <h3 class="text-2xl font-bold text-white mb-4 flex items-center">
              <span class="text-blue-400 mr-3">🚀</span> Développement Backend
            </h3>
            <ul class="text-gray-200 space-y-2">
              <li><strong>Node.js & Express</strong> - API REST performantes</li>
              <li><strong>Firebase & Firestore</strong> - Backend as a Service</li>
              <li><strong>PHP & Laravel</strong> - Applications web robustes</li>
              <li><strong>MySQL & MongoDB</strong> - Bases de données</li>
              <li><strong>WebSockets</strong> - Applications temps réel</li>
            </ul>
          </div>

          <!-- Mobile -->
          <div>
            <h3 class="text-2xl font-bold text-white mb-4 flex items-center">
              <span class="text-blue-400 mr-3">📱</span> Développement Mobile
            </h3>
            <ul class="text-gray-200 space-y-2">
              <li><strong>Flutter</strong> - Applications cross-platform</li>
              <li><strong>React Native</strong> - Apps iOS et Android</li>
              <li><strong>PWA</strong> - Progressive Web Apps</li>
              <li><strong>Intégrations natives</strong> - Caméra, GPS, etc.</li>
            </ul>
          </div>

          <!-- DevOps & Outils -->
          <div>
            <h3 class="text-2xl font-bold text-white mb-4 flex items-center">
              <span class="text-blue-400 mr-3">🛠️</span> DevOps & Outils
            </h3>
            <ul class="text-gray-200 space-y-2">
              <li><strong>Git & GitHub</strong> - Gestion de versions</li>
              <li><strong>Docker</strong> - Conteneurisation</li>
              <li><strong>Nginx</strong> - Serveur web et reverse proxy</li>
              <li><strong>CI/CD</strong> - Déploiement automatisé</li>
              <li><strong>Linux Ubuntu</strong> - Administration serveur</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- Section Services -->
      <section class="mb-16 bg-white/10 backdrop-blur-lg rounded-2xl p-8 md:p-12">
        <h2 class="text-3xl md:text-4xl font-bold text-blue-400 mb-6">Services Proposés</h2>
        <div class="grid md:grid-cols-3 gap-6">
          <div class="bg-blue-900/30 p-6 rounded-xl">
            <h3 class="text-xl font-bold text-white mb-3">🌐 Sites Web</h3>
            <p class="text-gray-300">
              Sites vitrine, e-commerce, landing pages optimisées SEO et responsive design.
            </p>
          </div>
          <div class="bg-blue-900/30 p-6 rounded-xl">
            <h3 class="text-xl font-bold text-white mb-3">💼 Applications Web</h3>
            <p class="text-gray-300">
              Plateformes SaaS, dashboards, CRM, ERP et applications métier sur mesure.
            </p>
          </div>
          <div class="bg-blue-900/30 p-6 rounded-xl">
            <h3 class="text-xl font-bold text-white mb-3">📱 Applications Mobile</h3>
            <p class="text-gray-300">
              Apps iOS et Android natives ou cross-platform avec Flutter.
            </p>
          </div>
          <div class="bg-blue-900/30 p-6 rounded-xl">
            <h3 class="text-xl font-bold text-white mb-3">⚙️ API Backend</h3>
            <p class="text-gray-300">
              Création d'API REST, GraphQL et intégrations tierces.
            </p>
          </div>
          <div class="bg-blue-900/30 p-6 rounded-xl">
            <h3 class="text-xl font-bold text-white mb-3">🎨 UI/UX Design</h3>
            <p class="text-gray-300">
              Conception d'interfaces utilisateur modernes et intuitives.
            </p>
          </div>
          <div class="bg-blue-900/30 p-6 rounded-xl">
            <h3 class="text-xl font-bold text-white mb-3">🔧 Maintenance</h3>
            <p class="text-gray-300">
              Support technique, mises à jour et optimisations continues.
            </p>
          </div>
        </div>
      </section>

      <!-- Section Parcours -->
      <section class="mb-16 bg-white/10 backdrop-blur-lg rounded-2xl p-8 md:p-12">
        <h2 class="text-3xl md:text-4xl font-bold text-blue-400 mb-6">Parcours Professionnel</h2>
        <div class="text-gray-200 text-lg leading-relaxed space-y-4">
          <p>
            Diplômé en <strong>ingénierie logicielle</strong>, j'ai développé une solide expertise en travaillant sur 
            des projets variés allant de <strong>plateformes éducatives</strong> aux <strong>applications de paiement mobile</strong>, 
            en passant par des <strong>sites e-commerce</strong> et des <strong>dashboards pour ONG</strong>.
          </p>
          <p>
            Chaque projet est pour moi une opportunité d'apprendre, d'innover et de livrer des solutions 
            qui dépassent les attentes de mes clients. Je m'engage à respecter les délais, 
            à maintenir une communication transparente et à garantir un code de qualité professionnelle.
          </p>
        </div>
      </section>

      <!-- Section Valeurs -->
      <section class="mb-16 bg-white/10 backdrop-blur-lg rounded-2xl p-8 md:p-12">
        <h2 class="text-3xl md:text-4xl font-bold text-blue-400 mb-6">Mes Valeurs</h2>
        <div class="grid md:grid-cols-2 gap-6">
          <div class="flex items-start space-x-4">
            <span class="text-4xl">✨</span>
            <div>
              <h3 class="text-xl font-bold text-white mb-2">Qualité & Excellence</h3>
              <p class="text-gray-300">
                Code propre, maintenable et respectant les meilleures pratiques de l'industrie.
              </p>
            </div>
          </div>
          <div class="flex items-start space-x-4">
            <span class="text-4xl">⚡</span>
            <div>
              <h3 class="text-xl font-bold text-white mb-2">Performance</h3>
              <p class="text-gray-300">
                Applications rapides, optimisées et scalables pour une expérience utilisateur fluide.
              </p>
            </div>
          </div>
          <div class="flex items-start space-x-4">
            <span class="text-4xl">🤝</span>
            <div>
              <h3 class="text-xl font-bold text-white mb-2">Collaboration</h3>
              <p class="text-gray-300">
                Écoute active, communication transparente et travail d'équipe efficace.
              </p>
            </div>
          </div>
          <div class="flex items-start space-x-4">
            <span class="text-4xl">🚀</span>
            <div>
              <h3 class="text-xl font-bold text-white mb-2">Innovation</h3>
              <p class="text-gray-300">
                Veille technologique constante et adoption des technologies modernes.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA Contact -->
      <section class="text-center bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-12">
        <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
          Vous avez un projet en tête ?
        </h2>
        <p class="text-xl text-gray-100 mb-8">
          Discutons-en et transformons votre vision en réalité digitale !
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://wa.me/22671037367"
            target="_blank"
            class="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-lg transition-all transform hover:scale-105"
          >
            📱 WhatsApp : +226 71 03 73 67
          </a>
          <a
            href="mailto:contact@azizsere.eveilon.com"
            class="bg-white hover:bg-gray-100 text-blue-900 font-bold py-4 px-8 rounded-lg transition-all transform hover:scale-105"
          >
            ✉️ Email : contact@azizsere.eveilon.com
          </a>
        </div>
      </section>

      <!-- Lien retour accueil -->
      <div class="text-center mt-12">
        <nuxt-link to="/" class="text-blue-400 hover:text-blue-300 text-lg font-semibold">
          ← Retour à l'accueil
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script setup>
// SEO Meta tags pour la page About
useHead({
  title: 'À propos de Sere Aziz | Aziz Sere - Développeur Fullstack Burkina Faso',
  meta: [
    {
      name: 'description',
      content:
        'Découvrez Sere Aziz (Aziz Sere), développeur fullstack expert basé à Ouagadougou, Burkina Faso. Spécialisé en Vue.js, React, Node.js, Flutter. Création d\'applications web et mobile sur mesure.'
    },
    {
      name: 'keywords',
      content:
        'Sere Aziz, Aziz Sere, développeur Ouagadougou, développeur Burkina Faso, fullstack developer, Vue.js expert, React developer, Node.js, Flutter, développement web Burkina, programmeur Ouagadougou'
    },
    // Open Graph
    { property: 'og:title', content: 'À propos de Sere Aziz - Développeur Fullstack Expert Burkina Faso' },
    {
      property: 'og:description',
      content:
        'Ingénieur en génie logiciel spécialisé en développement web et mobile. Basé à Ouagadougou, je transforme vos idées en solutions digitales performantes.'
    },
    { property: 'og:url', content: 'https://azizsere.eveilon.com/about' },
    { property: 'og:type', content: 'profile' },
    // Twitter Cards
    { name: 'twitter:title', content: 'À propos de Sere Aziz - Développeur Fullstack Burkina Faso' },
    {
      name: 'twitter:description',
      content: 'Développeur fullstack expert en Vue.js, React, Node.js et Flutter basé à Ouagadougou.'
    }
  ],
  link: [{ rel: 'canonical', href: 'https://azizsere.eveilon.com/about' }]
})
</script>

<style scoped>
/* Animations légères au scroll */
section {
  animation: fadeInUp 0.6s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
