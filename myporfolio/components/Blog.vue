<template>
  <div id="blog-section" class="blog-section">
    <h1 class="text-gray-200 text-3xl md:text-5xl lg:text-6xl font-bold leading-tight text-center mb-12">
      Mon <span class="text-primary text-blue-400">Blog</span>
    </h1>
    
    <div class="blog-container">
      <!-- État de chargement -->
      <div v-if="loading" class="loading-indicator">
        <i class="fas fa-circle-notch fa-spin"></i>
        <span>Chargement des publications...</span>
      </div>
      
      <!-- Message si aucune publication n'est disponible -->
      <div v-else-if="posts.length === 0" class="no-posts">
        <i class="fas fa-newspaper"></i>
        <p>Aucune publication disponible pour le moment.</p>
        <a :href="linkedinProfileUrl" target="_blank" class="linkedin-link">
          <i class="fab fa-linkedin"></i>
          Suivez-moi sur LinkedIn
        </a>
      </div>
      
      <!-- Affichage des publications -->
      <div v-else class="posts-grid">
        <div v-for="(post, index) in posts" :key="index" class="blog-post" :style="{ '--delay': index * 0.1 + 's' }">
          <div class="post-header">
            <div class="post-source">
              <i class="fab fa-linkedin linkedin-icon"></i>
              <span>Publié sur LinkedIn</span>
            </div>
            <div class="post-date">{{ formatDate(post.publishedDate) }}</div>
          </div>
          
          <div class="post-content">
            <h2 class="post-title">{{ post.title }}</h2>
            <div class="post-text" v-html="formatContent(post.content)"></div>
          </div>
          
          <div v-if="post.image" class="post-image">
            <img :src="post.image" :alt="post.title" loading="lazy" />
          </div>
          
          <div class="post-footer">
            <a :href="post.url" target="_blank" class="read-more">
              Voir sur LinkedIn
              <i class="fas fa-external-link-alt"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { collection, getDocs, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { db } from '@/firebase';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const posts = ref([]);
const loading = ref(true);
const linkedinProfileUrl = "https://www.linkedin.com/in/aziz-sere/"; // Remplacez par votre URL LinkedIn

let unsubscribe = null;

// Format de la date
const formatDate = (timestamp) => {
  if (!timestamp) return '';
  
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  return new Intl.DateTimeFormat('fr-FR', { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  }).format(date);
};

// Formatage du contenu pour afficher les liens et préserver les sauts de ligne
const formatContent = (content) => {
  if (!content) return '';
  
  // Limiter la longueur du contenu
  let truncated = content.length > 300 ? content.substring(0, 300) + '...' : content;
  
  // Convertir les URLs en liens cliquables
  truncated = truncated.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" class="post-link">$1</a>');
  
  // Préserver les sauts de ligne
  return truncated.replace(/\n/g, '<br>');
};

onMounted(() => {
  // Animation d'entrée pour le titre
  gsap.fromTo('#blog-section h1', 
    { opacity: 0, y: 50 }, 
    { 
      opacity: 1, 
      y: 0, 
      duration: 0.8, 
      scrollTrigger: {
        trigger: '#blog-section',
        start: 'top 80%',
      }
    }
  );
  
  // Écouter les modifications de la collection LinkedIn en temps réel
  const postsQuery = query(
    collection(db, 'linkedin_posts'),
    orderBy('publishedDate', 'desc'),
    limit(6)
  );
  
  try {
    loading.value = true;
    
    // Abonnement en temps réel aux changements
    unsubscribe = onSnapshot(postsQuery, (snapshot) => {
      const newPosts = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      posts.value = newPosts;
      loading.value = false;
      
      // Animation des publications après chargement
      setTimeout(() => {
        gsap.fromTo('.blog-post', 
          { opacity: 0, y: 30 }, 
          { 
            opacity: 1, 
            y: 0, 
            stagger: 0.1,
            duration: 0.6,
            ease: 'power2.out'
          }
        );
      }, 200);
    }, (error) => {
      console.error('Erreur lors de l\'écoute des publications:', error);
      loading.value = false;
    });
  } catch (error) {
    console.error('Erreur lors de l\'initialisation du blog:', error);
    loading.value = false;
  }
});

onUnmounted(() => {
  // Nettoyage de l'abonnement Firebase
  if (unsubscribe) {
    unsubscribe();
  }
});
</script>

<style scoped>
.blog-section {
  padding: 4rem 2rem;
  margin: 6rem 0;
  position: relative;
  z-index: 2;
}

.blog-container {
  max-width: 1200px;
  margin: 0 auto;
}

/* État de chargement */
.loading-indicator {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  gap: 1rem;
  color: rgba(255, 255, 255, 0.7);
  font-size: 1.1rem;
}

.loading-indicator i {
  font-size: 2.5rem;
  color: #3b82f6;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Message quand il n'y a pas de posts */
.no-posts {
  text-align: center;
  padding: 5rem 0;
  color: rgba(255, 255, 255, 0.7);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.no-posts i {
  font-size: 4rem;
  margin-bottom: 1rem;
  color: rgba(255, 255, 255, 0.4);
}

.linkedin-link {
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
  margin-top: 1rem;
  padding: 0.8rem 2rem;
  background: rgba(10, 102, 194, 0.2);
  border: 1px solid rgba(10, 102, 194, 0.4);
  border-radius: 8px;
  color: #fff;
  transition: all 0.3s ease;
  text-decoration: none;
  font-weight: 500;
  font-size: 1.1rem;
}

.linkedin-link:hover {
  background: rgba(10, 102, 194, 0.3);
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.linkedin-link i {
  font-size: 1.5rem;
  color: #0a66c2;
}

/* Grille de publications */
.posts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

/* Style de carte de publication */
.blog-post {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  height: 100%;
  opacity: 0;
  transform: translateY(30px);
  animation: fadeInUp 0.6s forwards;
  animation-delay: var(--delay, 0s);
}

.blog-post:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
  border-color: rgba(59, 130, 246, 0.3);
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* En-tête de publication */
.post-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.2rem 1.5rem;
  background: rgba(255, 255, 255, 0.05);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.post-source {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
}

.linkedin-icon {
  color: #0a66c2;
  font-size: 1.2rem;
  filter: drop-shadow(0 0 3px rgba(10, 102, 194, 0.4));
}

.post-date {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.5);
  font-style: italic;
}

/* Contenu de la publication */
.post-content {
  padding: 1.5rem;
  flex: 1;
}

.post-title {
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: white;
  line-height: 1.4;
}

.post-text {
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  font-size: 1rem;
  overflow-wrap: break-word;
}

.post-link {
  color: #60a5fa;
  text-decoration: none;
  transition: all 0.2s ease;
}

.post-link:hover {
  color: #93c5fd;
  text-decoration: underline;
}

/* Image de la publication */
.post-image {
  width: 100%;
  height: auto;
  max-height: 250px;
  overflow: hidden;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.post-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.blog-post:hover .post-image img {
  transform: scale(1.05);
}

/* Pied de publication */
.post-footer {
  padding: 1.2rem 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: flex-end;
  background: rgba(0, 0, 0, 0.1);
}

.read-more {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1.2rem;
  background: rgba(59, 130, 246, 0.15);
  border-radius: 8px;
  color: #60a5fa;
  transition: all 0.3s ease;
  font-weight: 500;
  font-size: 0.9rem;
  text-decoration: none;
}

.read-more:hover {
  background: rgba(59, 130, 246, 0.25);
  transform: translateX(3px);
  color: #93c5fd;
}

.read-more i {
  font-size: 0.85rem;
  transition: transform 0.3s ease;
}

.read-more:hover i {
  transform: translateX(3px);
}

/* Styles responsifs */
@media (max-width: 768px) {
  .blog-section {
    padding: 3rem 1rem;
    margin: 4rem 0;
  }

  .posts-grid {
    grid-template-columns: 1fr;
  }

  .post-title {
    font-size: 1.2rem;
  }
}

@media (max-width: 480px) {
  .blog-section {
    padding: 2rem 1rem;
  }

  .post-header, .post-content, .post-footer {
    padding: 1rem;
  }

  .post-title {
    font-size: 1.1rem;
  }
}
</style>