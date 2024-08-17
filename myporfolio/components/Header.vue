<template>
    <div class="bg-gray-800 text-white flex items-center justify-between p-4">
      <div class="flex items-center">
        <div class="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center mr-4">
          <!-- Logo or Icon -->
        </div>
        <h1 class="text-xl font-bold">Dashboard</h1>
      </div>
      <div class="flex items-center space-x-3">
        <!-- MacOS Window Buttons -->
        <div class="flex space-x-1">
          <div class="w-3.5 h-3.5 bg-red-500 rounded-full"></div>
          <div class="w-3.5 h-3.5 bg-yellow-500 rounded-full"></div>
          <div class="w-3.5 h-3.5 bg-green-500 rounded-full"></div>
        </div>
        <div class="bg-gray-600 p-2 rounded-full">
          <!-- <img src="path-to-avatar.jpg" alt="User Avatar" class="w-8 h-8 rounded-full"> -->
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Header'
  }
  </script>
  
  <style scoped>
  /* Ajoutez ici des styles spécifiques au composant si nécessaire */
  </style>
  