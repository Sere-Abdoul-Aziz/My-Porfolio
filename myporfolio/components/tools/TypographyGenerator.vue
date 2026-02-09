<template>
  <div class="typography-generator">
    <div class="space-y-6 sm:space-y-8">
      <!-- Preview Section -->
      <div class="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg sm:rounded-xl p-4 sm:p-6 md:p-8 lg:p-12">
        <div :style="{ fontFamily: selectedPair.heading }">
          <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-4">Typography Matters</h1>
          <h2 class="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-blue-400 mb-4 sm:mb-6">Good Design is Good Business</h2>
        </div>
        <div :style="{ fontFamily: selectedPair.body }" class="text-gray-300 text-lg leading-relaxed">
          <p class="mb-4">
            La typographie est l'art et la technique de l'arrangement des caractères typographiques dans le but de rendre
            le langage écrit lisible, accessible et attrayant lors de l'affichage.
          </p>
          <p>
            Une bonne combinaison de polices crée une hiérarchie visuelle claire et améliore l'expérience utilisateur.
            L'harmonie entre les titres et le corps du texte est essentielle pour un design réussi.
          </p>
        </div>
      </div>

      <!-- Font Pairs Grid -->
      <div>
        <h3 class="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-4 sm:mb-6">🎨 Combinaisons de polices populaires</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <div
            v-for="pair in fontPairs"
            :key="pair.id"
            @click="selectPair(pair)"
            :class="[
              'bg-white/10 rounded-lg sm:rounded-xl p-4 sm:p-6 cursor-pointer transition-all hover:bg-white/20 border-2',
              selectedPair.id === pair.id ? 'border-blue-500' : 'border-transparent'
            ]"
          >
            <div class="mb-4">
              <div :style="{ fontFamily: pair.heading }" class="text-3xl font-bold text-white mb-2">
                {{ pair.heading }}
              </div>
              <div :style="{ fontFamily: pair.body }" class="text-gray-300">{{ pair.body }}</div>
            </div>
            <div class="text-sm text-gray-400">
              <p>Heading: {{ pair.heading }}</p>
              <p>Body: {{ pair.body }}</p>
            </div>
            <div class="mt-3">
              <span class="inline-block px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs">
                {{ pair.category }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- CSS Code -->
      <div class="bg-gray-800 rounded-lg sm:rounded-xl p-4 sm:p-6">
        <div class="flex items-center justify-between mb-4">
          <h4 class="text-base sm:text-lg lg:text-xl font-bold text-white">💻 Code CSS / Import</h4>
          <button
            @click="copyCode"
            class="bg-blue-500 hover:bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-lg transition-colors"
          >
            📋 Copier
          </button>
        </div>
        <pre class="text-gray-300 text-sm overflow-x-auto"><code>{{ cssCode }}</code></pre>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const fontPairs = [
  {
    id: 1,
    heading: 'Playfair Display',
    body: 'Source Sans Pro',
    category: 'Classique & Élégant',
    googleFonts: ['Playfair+Display:wght@700', 'Source+Sans+Pro:wght@400']
  },
  {
    id: 2,
    heading: 'Montserrat',
    body: 'Open Sans',
    category: 'Moderne & Propre',
    googleFonts: ['Montserrat:wght@700', 'Open+Sans:wght@400']
  },
  {
    id: 3,
    heading: 'Raleway',
    body: 'Lato',
    category: 'Professionnel',
    googleFonts: ['Raleway:wght@700', 'Lato:wght@400']
  },
  {
    id: 4,
    heading: 'Oswald',
    body: 'Roboto',
    category: 'Bold & Moderne',
    googleFonts: ['Oswald:wght@700', 'Roboto:wght@400']
  },
  {
    id: 5,
    heading: 'Merriweather',
    body: 'Open Sans',
    category: 'Lecture Facile',
    googleFonts: ['Merriweather:wght@700', 'Open+Sans:wght@400']
  },
  {
    id: 6,
    heading: 'Poppins',
    body: 'Inter',
    category: 'Tech & Startup',
    googleFonts: ['Poppins:wght@700', 'Inter:wght@400']
  },
  {
    id: 7,
    heading: 'Abril Fatface',
    body: 'Roboto',
    category: 'Magazine',
    googleFonts: ['Abril+Fatface', 'Roboto:wght@400']
  },
  {
    id: 8,
    heading: 'Bebas Neue',
    body: 'Nunito',
    category: 'Impact & Fun',
    googleFonts: ['Bebas+Neue', 'Nunito:wght@400']
  },
  {
    id: 9,
    heading: 'Crimson Text',
    body: 'Work Sans',
    category: 'Éditorial',
    googleFonts: ['Crimson+Text:wght@700', 'Work+Sans:wght@400']
  }
]

const selectedPair = ref(fontPairs[0])

function selectPair(pair) {
  selectedPair.value = pair
}

const cssCode = computed(() => {
  const googleFontsUrl = `https://fonts.googleapis.com/css2?family=${selectedPair.value.googleFonts.join('&family=')}&display=swap`

  return `/* Google Fonts Import */
@import url('${googleFontsUrl}');

/* CSS Variables */
:root {
  --font-heading: '${selectedPair.value.heading}', serif;
  --font-body: '${selectedPair.value.body}', sans-serif;
}

/* Usage */
h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-heading);
}

body, p, span, div {
  font-family: var(--font-body);
}`
})

function copyCode() {
  navigator.clipboard.writeText(cssCode.value)
  alert('Code copié !')
}
</script>
