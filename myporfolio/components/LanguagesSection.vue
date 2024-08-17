<template>
    <div id="languages-section" class="languages-section">

  
<h1 ref="heading1" class="text-red-500 text-3xl mb-6 md:text-6xl font-bold leading-tight text-center">
  Langues <span class="text-primary text-blue-400">Parlées</span> 
</h1>


<div class="language-item">
  <img src="@/assets/images/france_flag.jpeg" alt="French Flag" class="flag-icon">
  <div class="language-details">
    <h3 class="language-title">Français</h3>
    <div class="progress-bar-container">
      <div class="progress-bar" style="width: 100%;"></div>
    </div>
  </div>
</div>

<div class="language-item">
  <img src="@/assets/images/uk_flag.jpeg" alt="English Flag" class="flag-icon">
  <div class="language-details">
    <h3 class="language-title">Anglais</h3>
    <div class="progress-bar-container">
      <div class="progress-bar" style="width: 75%;"></div>
    </div>
  </div>
</div>
</div>
  </template>
  
  <style scoped>
  .languages-section {
    padding: 2rem;
    margin-top: 4rem;
    background: url('@/assets/images/cartepostal.png') no-repeat center center;
    background-size: cover;
    position: relative;
    border-radius: 10px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    height: 80vh;
    width: 100%;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
    text-align: left;
    font-family: 'Georgia', serif;
    color: #333;
    z-index: 1;
  }
  
  .language-item {
    display: flex;
    align-items: center;
    margin-bottom: 1.5rem;
    padding-left: 1rem;
    position: relative;
  }
  
  .language-item::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 8px;
    height: 8px;
    background-color: #333;
    border-radius: 50%;
  }
  
  .flag-icon {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
    border: 2px solid #333;
  }
  
  .language-details {
    flex-grow: 1;
    padding-left: 10px;
    font-family: 'Fira Code', monospace;
    text-align: justify;
  }
  
  .language-title {
    font-size: 1.5rem;
    font-weight: bold;
    color: #333;
  }
  
  .progress-bar-container {
    background: rgba(240, 240, 240, 0.8);
    border-radius: 10px;
    overflow: hidden;
    height: 15px;
    box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
    margin-top: 5px;
  }
  
  .progress-bar {
    height: 100%;
    background-color: #333;
    border-radius: 10px;
    transition: width 1s ease-in-out;
  }
  </style>
  