<template>
    <div class="iceberg-container">
      <img src="@/assets/images/iceberg.svg" alt="Iceberg" class="iceberg-image" />
    </div>
  </template>
  
  <style scoped>
  .iceberg-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 150%;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    pointer-events: none;
    z-index: 0;
  }
  
  .iceberg-image {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    z-index: 5;
  }
  </style>
  