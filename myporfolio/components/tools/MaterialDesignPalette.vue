<template>
  <div class="material-design-palette">
    <div class="space-y-6 sm:space-y-8">
      <div class="text-center px-4">
        <h3 class="text-xl sm:text-2xl font-bold text-white mb-2">🌈 Palette Material Design</h3>
        <p class="text-sm sm:text-base text-gray-300">Couleurs officielles Google Material Design 3.0</p>
      </div>

      <!-- Search -->
      <div class="max-w-2xl mx-auto px-4">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="🔍 Rechercher une couleur..."
          class="w-full bg-gray-800 text-white px-4 sm:px-6 py-3 sm:py-4 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none text-sm sm:text-base"
        />
      </div>

      <!-- Color Grid -->
      <div class="space-y-6 sm:space-y-8 px-2 sm:px-4">
        <div v-for="color in filteredColors" :key="color.name" class="bg-white/10 rounded-lg sm:rounded-xl p-4 sm:p-6">
          <h4 class="text-base sm:text-lg lg:text-xl font-bold text-white mb-3 sm:mb-4">{{color.name }}</h4>
          <div class="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-10 gap-2">
            <div
              v-for="(shade, key) in color.shades"
              :key="key"
              @click="copyColor(shade, `${color.name} ${key}`)"
              class="group cursor-pointer"
            >
              <div
                :style="{ backgroundColor: shade }"
                class="aspect-square rounded-lg shadow-lg hover:scale-110 transition-transform relative"
              >
                <div
                  class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 rounded-lg"
                >
                  <span class="text-white text-xs font-bold">{{ key }}</span>
                </div>
              </div>
              <div class="text-center mt-1">
                <span class="text-xs text-gray-400">{{ key }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Export Section -->
      <div class="bg-white/10 rounded-lg sm:rounded-xl p-4 sm:p-6 mx-2 sm:mx-4">
        <h4 class="text-base sm:text-lg lg:text-xl font-bold text-white mb-3 sm:mb-4">💾 Export</h4>
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <button
            @click="exportAsCSS"
            class="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-sm sm:text-base font-semibold hover:shadow-lg transition-all"
          >
            📄 CSS
          </button>
          <button
            @click="exportAsTailwind"
            class="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-sm sm:text-base font-semibold hover:shadow-lg transition-all"
          >
            🎨 Tailwind
          </button>
          <button
            @click="exportAsJSON"
            class="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-sm sm:text-base font-semibold hover:shadow-lg transition-all"
          >
            📦 JSON
          </button>
          <button
            @click="exportAsSCSS"
            class="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-sm sm:text-base font-semibold hover:shadow-lg transition-all"
          >
            💅 SCSS
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const searchQuery = ref('')

const materialColors = [
  {
    name: 'Red',
    shades: {
      50: '#ffebee',
      100: '#ffcdd2',
      200: '#ef9a9a',
      300: '#e57373',
      400: '#ef5350',
      500: '#f44336',
      600: '#e53935',
      700: '#d32f2f',
      800: '#c62828',
      900: '#b71c1c'
    }
  },
  {
    name: 'Pink',
    shades: {
      50: '#fce4ec',
      100: '#f8bbd0',
      200: '#f48fb1',
      300: '#f06292',
      400: '#ec407a',
      500: '#e91e63',
      600: '#d81b60',
      700: '#c2185b',
      800: '#ad1457',
      900: '#880e4f'
    }
  },
  {
    name: 'Purple',
    shades: {
      50: '#f3e5f5',
      100: '#e1bee7',
      200: '#ce93d8',
      300: '#ba68c8',
      400: '#ab47bc',
      500: '#9c27b0',
      600: '#8e24aa',
      700: '#7b1fa2',
      800: '#6a1b9a',
      900: '#4a148c'
    }
  },
  {
    name: 'Deep Purple',
    shades: {
      50: '#ede7f6',
      100: '#d1c4e9',
      200: '#b39ddb',
      300: '#9575cd',
      400: '#7e57c2',
      500: '#673ab7',
      600: '#5e35b1',
      700: '#512da8',
      800: '#4527a0',
      900: '#311b92'
    }
  },
  {
    name: 'Indigo',
    shades: {
      50: '#e8eaf6',
      100: '#c5cae9',
      200: '#9fa8da',
      300: '#7986cb',
      400: '#5c6bc0',
      500: '#3f51b5',
      600: '#3949ab',
      700: '#303f9f',
      800: '#283593',
      900: '#1a237e'
    }
  },
  {
    name: 'Blue',
    shades: {
      50: '#e3f2fd',
      100: '#bbdefb',
      200: '#90caf9',
      300: '#64b5f6',
      400: '#42a5f5',
      500: '#2196f3',
      600: '#1e88e5',
      700: '#1976d2',
      800: '#1565c0',
      900: '#0d47a1'
    }
  },
  {
    name: 'Light Blue',
    shades: {
      50: '#e1f5fe',
      100: '#b3e5fc',
      200: '#81d4fa',
      300: '#4fc3f7',
      400: '#29b6f6',
      500: '#03a9f4',
      600: '#039be5',
      700: '#0288d1',
      800: '#0277bd',
      900: '#01579b'
    }
  },
  {
    name: 'Cyan',
    shades: {
      50: '#e0f7fa',
      100: '#b2ebf2',
      200: '#80deea',
      300: '#4dd0e1',
      400: '#26c6da',
      500: '#00bcd4',
      600: '#00acc1',
      700: '#0097a7',
      800: '#00838f',
      900: '#006064'
    }
  },
  {
    name: 'Teal',
    shades: {
      50: '#e0f2f1',
      100: '#b2dfdb',
      200: '#80cbc4',
      300: '#4db6ac',
      400: '#26a69a',
      500: '#009688',
      600: '#00897b',
      700: '#00796b',
      800: '#00695c',
      900: '#004d40'
    }
  },
  {
    name: 'Green',
    shades: {
      50: '#e8f5e9',
      100: '#c8e6c9',
      200: '#a5d6a7',
      300: '#81c784',
      400: '#66bb6a',
      500: '#4caf50',
      600: '#43a047',
      700: '#388e3c',
      800: '#2e7d32',
      900: '#1b5e20'
    }
  },
  {
    name: 'Light Green',
    shades: {
      50: '#f1f8e9',
      100: '#dcedc8',
      200: '#c5e1a5',
      300: '#aed581',
      400: '#9ccc65',
      500: '#8bc34a',
      600: '#7cb342',
      700: '#689f38',
      800: '#558b2f',
      900: '#33691e'
    }
  },
  {
    name: 'Lime',
    shades: {
      50: '#f9fbe7',
      100: '#f0f4c3',
      200: '#e6ee9c',
      300: '#dce775',
      400: '#d4e157',
      500: '#cddc39',
      600: '#c0ca33',
      700: '#afb42b',
      800: '#9e9d24',
      900: '#827717'
    }
  },
  {
    name: 'Yellow',
    shades: {
      50: '#fffde7',
      100: '#fff9c4',
      200: '#fff59d',
      300: '#fff176',
      400: '#ffee58',
      500: '#ffeb3b',
      600: '#fdd835',
      700: '#fbc02d',
      800: '#f9a825',
      900: '#f57f17'
    }
  },
  {
    name: 'Amber',
    shades: {
      50: '#fff8e1',
      100: '#ffecb3',
      200: '#ffe082',
      300: '#ffd54f',
      400: '#ffca28',
      500: '#ffc107',
      600: '#ffb300',
      700: '#ffa000',
      800: '#ff8f00',
      900: '#ff6f00'
    }
  },
  {
    name: 'Orange',
    shades: {
      50: '#fff3e0',
      100: '#ffe0b2',
      200: '#ffcc80',
      300: '#ffb74d',
      400: '#ffa726',
      500: '#ff9800',
      600: '#fb8c00',
      700: '#f57c00',
      800: '#ef6c00',
      900: '#e65100'
    }
  },
  {
    name: 'Deep Orange',
    shades: {
      50: '#fbe9e7',
      100: '#ffccbc',
      200: '#ffab91',
      300: '#ff8a65',
      400: '#ff7043',
      500: '#ff5722',
      600: '#f4511e',
      700: '#e64a19',
      800: '#d84315',
      900: '#bf360c'
    }
  },
  {
    name: 'Brown',
    shades: {
      50: '#efebe9',
      100: '#d7ccc8',
      200: '#bcaaa4',
      300: '#a1887f',
      400: '#8d6e63',
      500: '#795548',
      600: '#6d4c41',
      700: '#5d4037',
      800: '#4e342e',
      900: '#3e2723'
    }
  },
  {
    name: 'Grey',
    shades: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#eeeeee',
      300: '#e0e0e0',
      400: '#bdbdbd',
      500: '#9e9e9e',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121'
    }
  },
  {
    name: 'Blue Grey',
    shades: {
      50: '#eceff1',
      100: '#cfd8dc',
      200: '#b0bec5',
      300: '#90a4ae',
      400: '#78909c',
      500: '#607d8b',
      600: '#546e7a',
      700: '#455a64',
      800: '#37474f',
      900: '#263238'
    }
  }
]

const filteredColors = computed(() => {
  if (!searchQuery.value) return materialColors
  return materialColors.filter(color => color.name.toLowerCase().includes(searchQuery.value.toLowerCase()))
})

function copyColor(hex, name) {
  navigator.clipboard.writeText(hex)
  alert(`${name} (${hex}) copié !`)
}

function exportAsCSS() {
  let css = ':root {\n'
  materialColors.forEach(color => {
    Object.entries(color.shades).forEach(([shade, hex]) => {
      css += `  --md-${color.name.toLowerCase().replace(' ', '-')}-${shade}: ${hex};\n`
    })
  })
  css += '}'
  downloadFile('material-colors.css', css)
}

function exportAsTailwind() {
  let config = 'module.exports = {\n  theme: {\n    extend: {\n      colors: {\n'
  materialColors.forEach(color => {
    const colorKey = color.name.toLowerCase().replace(' ', '-')
    config += `        '${colorKey}': {\n`
    Object.entries(color.shades).forEach(([shade, hex]) => {
      config += `          ${shade}: '${hex}',\n`
    })
    config += '        },\n'
  })
  config += '      }\n    }\n  }\n}'
  downloadFile('material-tailwind.config.js', config)
}

function exportAsJSON() {
  const json = {}
  materialColors.forEach(color => {
    json[color.name.toLowerCase().replace(' ', '-')] = color.shades
  })
  downloadFile('material-colors.json', JSON.stringify(json, null, 2))
}

function exportAsSCSS() {
  let scss = ''
  materialColors.forEach(color => {
    Object.entries(color.shades).forEach(([shade, hex]) => {
      scss += `$md-${color.name.toLowerCase().replace(' ', '-')}-${shade}: ${hex};\n`
    })
  })
  downloadFile('material-colors.scss', scss)
}

function downloadFile(filename, content) {
  const blob = new Blob([content], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}
</script>
