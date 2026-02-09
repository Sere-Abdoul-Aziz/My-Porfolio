<template>
  <div class="glassmorphism-generator">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
      <!-- Controls -->
      <div class="space-y-4 sm:space-y-6">
        <h3 class="text-base sm:text-lg lg:text-xl font-bold text-white mb-4">⚙️ Paramètres</h3>

        <!-- Background Color -->
        <div>
          <label class="block text-white mb-2">Couleur de fond</label>
          <div class="flex items-center space-x-3">
            <input
              v-model="bgColor"
              type="color"
              class="w-16 h-12 rounded-lg cursor-pointer border-2 border-white/20"
            />
            <input
              v-model="bgColor"
              type="text"
              class="flex-1 bg-gray-800 text-white px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none font-mono"
            />
          </div>
        </div>

        <!-- Blur -->
        <div>
          <label class="block text-white mb-2">Flou (Blur): {{ blur }}px</label>
          <input v-model.number="blur" type="range" min="0" max="40" class="w-full accent-blue-500" />
        </div>

        <!-- Opacity -->
        <div>
          <label class="block text-white mb-2">Opacité: {{ opacity }}%</label>
          <input v-model.number="opacity" type="range" min="0" max="100" class="w-full accent-blue-500" />
        </div>

        <!-- Border -->
        <div>
          <label class="block text-white mb-2">Bordure: {{ borderWidth }}px</label>
          <input
            v-model.number="borderWidth"
            type="range"
            min="0"
            max="5"
            step="0.5"
            class="w-full accent-blue-500"
          />
        </div>

        <!-- Border Opacity -->
        <div>
          <label class="block text-white mb-2">Opacité bordure: {{ borderOpacity }}%</label>
          <input
            v-model.number="borderOpacity"
            type="range"
            min="0"
            max="100"
            class="w-full accent-blue-500"
          />
        </div>

        <!-- Border Radius -->
        <div>
          <label class="block text-white mb-2">Arrondi: {{ borderRadius }}px</label>
          <input v-model.number="borderRadius" type="range" min="0" max="50" class="w-full accent-blue-500" />
        </div>

        <!-- Saturation -->
        <div>
          <label class="block text-white mb-2">Saturation: {{ saturation }}%</label>
          <input v-model.number="saturation" type="range" min="100" max="200" class="w-full accent-blue-500" />
        </div>

        <!-- Code CSS -->
        <div class="bg-gray-800 rounded-lg p-4">
          <div class="flex items-center justify-between mb-2">
            <h4 class="text-white font-semibold">Code CSS</h4>
            <button
              @click="copyCSS"
              class="bg-blue-500 hover:bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-lg transition-colors text-sm"
            >
              📋 Copier
            </button>
          </div>
          <pre class="text-gray-300 text-sm overflow-x-auto"><code>{{ cssCode }}</code></pre>
        </div>
      </div>

      <!-- Preview -->
      <div>
        <h3 class="text-base sm:text-lg lg:text-xl font-bold text-white mb-4">👁️ Aperçu</h3>
        <div
          class="relative w-full h-[600px] rounded-xl overflow-hidden"
          :style="{ background: `linear-gradient(135deg, ${bgColor} 0%, #1e3a8a 100%)` }"
        >
          <!-- Background Pattern -->
          <div class="absolute inset-0 opacity-20">
            <div class="grid grid-cols-8 gap-4 p-8">
              <div v-for="i in 32" :key="i" class="aspect-square bg-white/20 rounded-lg"></div>
            </div>
          </div>

          <!-- Glass Card -->
          <div class="absolute inset-0 flex items-center justify-center p-4 sm:p-6 lg:p-8">
            <div :style="glassStyle" class="w-full max-w-md p-4 sm:p-6 lg:p-8">
              <h3 class="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-4">Effet Glassmorphism</h3>
              <p class="text-white/90 mb-6">
                Cet effet de verre moderne crée une interface élégante avec un arrière-plan flou et semi-transparent.
              </p>
              <div class="flex gap-2 sm:gap-3">
                <button
                  class="px-4 sm:px-6 py-2 sm:py-3 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors backdrop-blur-sm"
                >
                  Action
                </button>
                <button
                  class="px-6 py-3 bg-blue-500/80 text-white rounded-lg hover:bg-blue-600/80 transition-colors backdrop-blur-sm"
                >
                  Primary
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Templates -->
        <div class="mt-6">
          <h4 class="text-white font-semibold mb-3">📦 Templates prédéfinis</h4>
          <div class="grid grid-cols-2 gap-3">
            <button
              @click="applyTemplate('classic')"
              class="bg-white/10 hover:bg-white/20 text-white px-4 py-3 rounded-lg transition-colors text-sm"
            >
              ✨ Classique
            </button>
            <button
              @click="applyTemplate('subtle')"
              class="bg-white/10 hover:bg-white/20 text-white px-4 py-3 rounded-lg transition-colors text-sm"
            >
              🌫️ Subtil
            </button>
            <button
              @click="applyTemplate('bold')"
              class="bg-white/10 hover:bg-white/20 text-white px-4 py-3 rounded-lg transition-colors text-sm"
            >
              💪 Bold
            </button>
            <button
              @click="applyTemplate('modern')"
              class="bg-white/10 hover:bg-white/20 text-white px-4 py-3 rounded-lg transition-colors text-sm"
            >
              🚀 Moderne
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const bgColor = ref('#0a192f')
const blur = ref(16)
const opacity = ref(15)
const borderWidth = ref(1)
const borderOpacity = ref(30)
const borderRadius = ref(16)
const saturation = ref(150)

const glassStyle = computed(() => ({
  background: `rgba(255, 255, 255, ${opacity.value / 100})`,
  backdropFilter: `blur(${blur.value}px) saturate(${saturation.value}%)`,
  WebkitBackdropFilter: `blur(${blur.value}px) saturate(${saturation.value}%)`,
  border: `${borderWidth.value}px solid rgba(255, 255, 255, ${borderOpacity.value / 100})`,
  borderRadius: `${borderRadius.value}px`,
  boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
}))

const cssCode = computed(() => {
  return `.glass-effect {
  background: rgba(255, 255, 255, ${(opacity.value / 100).toFixed(2)});
  backdrop-filter: blur(${blur.value}px) saturate(${saturation.value}%);
  -webkit-backdrop-filter: blur(${blur.value}px) saturate(${saturation.value}%);
  border: ${borderWidth.value}px solid rgba(255, 255, 255, ${(borderOpacity.value / 100).toFixed(2)});
  border-radius: ${borderRadius.value}px;
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
}`
})

function applyTemplate(template) {
  const templates = {
    classic: {
      blur: 16,
      opacity: 15,
      borderWidth: 1,
      borderOpacity: 30,
      borderRadius: 16,
      saturation: 150
    },
    subtle: {
      blur: 8,
      opacity: 5,
      borderWidth: 0.5,
      borderOpacity: 10,
      borderRadius: 12,
      saturation: 120
    },
    bold: {
      blur: 24,
      opacity: 25,
      borderWidth: 2,
      borderOpacity: 50,
      borderRadius: 20,
      saturation: 180
    },
    modern: {
      blur: 12,
      opacity: 10,
      borderWidth: 1,
      borderOpacity: 20,
      borderRadius: 24,
      saturation: 140
    }
  }

  const selected = templates[template]
  blur.value = selected.blur
  opacity.value = selected.opacity
  borderWidth.value = selected.borderWidth
  borderOpacity.value = selected.borderOpacity
  borderRadius.value = selected.borderRadius
  saturation.value = selected.saturation
}

function copyCSS() {
  navigator.clipboard.writeText(cssCode.value)
  alert('Code CSS copié !')
}
</script>
