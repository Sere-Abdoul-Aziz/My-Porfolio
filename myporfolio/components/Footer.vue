<template>
    <footer class="backdrop-filter backdrop-blur-lg bg-white/10 border border-white/20 shadow-lg rounded-lg mx-auto py-8 px-6 md:px-12">
      <div class="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        
        <!-- Social Media Links -->
        <div>
          <h2 class="text-white text-lg font-bold mb-4">Retrouvez-moi sur</h2>
          <div class="flex space-x-6">
            <a href="https://www.linkedin.com/in/aziz-sere/" target="_blank" class="hover:text-blue-400">
              <i class="fab fa-linkedin fa-2x"></i>
            </a>
            <a href="https://github.com/Sere-Abdoul-Aziz/" target="_blank" class="hover:text-blue-400">
              <i class="fab fa-github fa-2x"></i>
            </a>
            <a href="https://discord.com/users/711138503316078595" target="_blank" class="hover:text-blue-400">
              <i class="fab fa-discord fa-2x"></i>
            </a>
          </div>
        </div>
  
        <!-- Contact Info -->
        <div class="text-center md:text-right">
          <h2 class="text-white text-lg font-bold mb-4">Contact</h2>
          <p>Email : <a href="mailto:abdoulazizserepro@gmail.com" class="hover:text-blue-400">abdoulazizserepro@gmail.com</a></p>
          <p>Téléphone : <a href="tel:+21651333508" class="hover:text-blue-400">+21651333508</a>
            <div class="text-center md:text-right"> </div>
            <a href="tel:+22671037367" class="hover:text-blue-400">+22671037367</a> 
        </p>
        </div>
      </div>
  
      <div class="border-t border-white/20 mt-8 pt-4 flex flex-col md:flex-row justify-between items-center">
        <p class="text-gray-300 text-sm">&copy; 2024 Abdoul Aziz SERE. Tous droits réservés.</p>
        <!-- <p class="text-gray-300 text-sm mt-2 md:mt-0">
          Design inspiré par <a href="https://dribbble.com/stefanobartoletti" target="_blank" class="hover:text-blue-400">@stefanobartoletti</a>          
        </p> -->
        <p class="text-gray-300 text-sm mt-2 md:mt-0">
          Dessin par <a href="https://www.instagram.com/crazyblack.art" target="_blank" class="hover:text-blue-400">@crazyblack.art</a>
        </p>
      </div>
    </footer>
  </template>
  
  <script setup>
  // Aucun script supplémentaire requis
  </script>
  
  <style scoped>
  footer {
    background-color: rgba(255, 255, 255, 0.1); /* Fond en Glassmorphism */
    border-radius: 15px;
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    border: 1px solid rgba(255, 255, 255, 0.18);
    z-index: 11;
  }
  
  a {
    color: white;
    transition: color 0.3s ease;
  }
  
  a:hover {
    color: #60a5fa; /* Couleur de survol */
  }
  
  i {
    color: white;
    transition: color 0.3s ease;
  }
  
  i:hover {
    color: #60a5fa; /* Couleur de survol pour les icônes */
  }
  </style>
  