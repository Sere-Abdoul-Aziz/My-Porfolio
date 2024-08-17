<template>
    <div class="bottom-image-container">
      <img src="@/assets/images/epave.png" alt="Bottom Image" class="bottom-image" />
    </div>
  </template>
  
  <style scoped>
  .bottom-image-container {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    pointer-events: none;
    z-index: 0;
  }
  
  .bottom-image {
    width: 100%;
    object-fit: cover;
    z-index: 5;
    position: relative;
  }
  
  /* Superposition pour assombrir l'image du haut vers le bas */
  .bottom-image-container::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, rgb(30, 32, 46), rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));
    z-index: 6;
  }
  </style>
  