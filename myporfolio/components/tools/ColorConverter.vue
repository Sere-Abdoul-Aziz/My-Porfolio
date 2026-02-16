<template>
  <div class="color-converter">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
      <!-- Section Input -->
      <div>
        <h3 class="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">🎨 Entrez une couleur</h3>
        
        <!-- Color Picker -->
        <div class="bg-white/10 rounded-lg sm:rounded-xl p-4 sm:p-6 space-y-4">
          <div class="flex flex-col sm:flex-row items-center gap-4">
            <input
              v-model="currentColor"
              type="color"
              class="w-20 h-20 sm:w-24 sm:h-24 rounded-lg cursor-pointer border-4 border-white/20"
            />
            <div class="flex-1 w-full">
              <label class="block text-white mb-2 font-semibold text-sm sm:text-base">Couleur sélectionnée</label>
              <div
                :style="{ backgroundColor: currentColor }"
                class="w-full h-20 sm:h-24 rounded-lg shadow-lg border-2 border-white/20"
              ></div>
            </div>
          </div>

          <!-- Input Methods -->
          <div class="space-y-3">
            <div>
              <label class="block text-white mb-2 text-sm sm:text-base">HEX</label>
              <input
                v-model="hexInput"
                @input="convertFromHex"
                type="text"
                placeholder="#FF5733"
                class="w-full bg-gray-800 text-white px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none font-mono text-sm sm:text-base"
              />
            </div>

            <div>
              <label class="block text-white mb-2 text-sm sm:text-base">RGB</label>
              <div class="grid grid-cols-3 gap-2">
                <input
                  v-model.number="rgb.r"
                  @input="convertFromRGB"
                  type="number"
                  min="0"
                  max="255"
                  placeholder="R"
                  class="bg-gray-800 text-white px-2 sm:px-3 py-2 sm:py-3 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none text-center text-sm sm:text-base"
                />
                <input
                  v-model.number="rgb.g"
                  @input="convertFromRGB"
                  type="number"
                  min="0"
                  max="255"
                  placeholder="G"
                  class="bg-gray-800 text-white px-2 sm:px-3 py-2 sm:py-3 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none text-center text-sm sm:text-base"
                />
                <input
                  v-model.number="rgb.b"
                  @input="convertFromRGB"
                  type="number"
                  min="0"
                  max="255"
                  placeholder="B"
                  class="bg-gray-800 text-white px-2 sm:px-3 py-2 sm:py-3 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none text-center text-sm sm:text-base"
                />
              </div>
            </div>

            <div>
              <label class="block text-white mb-2 text-sm sm:text-base">HSL</label>
              <div class="grid grid-cols-3 gap-2">
                <input
                  v-model.number="hsl.h"
                  @input="convertFromHSL"
                  type="number"
                  min="0"
                  max="360"
                  placeholder="H"
                  class="bg-gray-800 text-white px-2 sm:px-3 py-2 sm:py-3 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none text-center text-sm sm:text-base"
                />
                <input
                  v-model.number="hsl.s"
                  @input="convertFromHSL"
                  type="number"
                  min="0"
                  max="100"
                  placeholder="S%"
                  class="bg-gray-800 text-white px-2 sm:px-3 py-2 sm:py-3 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none text-center text-sm sm:text-base"
                />
                <input
                  v-model.number="hsl.l"
                  @input="convertFromHSL"
                  type="number"
                  min="0"
                  max="100"
                  placeholder="L%"
                  class="bg-gray-800 text-white px-2 sm:px-3 py-2 sm:py-3 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none text-center text-sm sm:text-base"
                />
              </div>
            </div>

            <div>
              <label class="block text-white mb-2 text-sm sm:text-base">OKLCH <span class="text-xs text-gray-400">(Moderne)</span></label>
              
              <!-- Lightness -->
              <div class="mb-3">
                <div class="flex justify-between items-center mb-1">
                  <span class="text-xs text-gray-400">Lightness (L)</span>
                  <span class="text-sm text-white font-mono">{{ oklch.l.toFixed(2) }}</span>
                </div>
                <input
                  v-model.number="oklch.l"
                  @input="convertFromOKLCH"
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  class="w-full h-2 bg-gradient-to-r from-black to-white rounded-lg appearance-none cursor-pointer slider"
                />
              </div>

              <!-- Chroma -->
              <div class="mb-3">
                <div class="flex justify-between items-center mb-1">
                  <span class="text-xs text-gray-400">Chroma (C)</span>
                  <span class="text-sm text-white font-mono">{{ oklch.c.toFixed(2) }}</span>
                </div>
                <input
                  v-model.number="oklch.c"
                  @input="convertFromOKLCH"
                  type="range"
                  min="0"
                  max="0.4"
                  step="0.01"
                  class="w-full h-2 bg-gradient-to-r from-gray-500 via-red-500 to-pink-500 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>

              <!-- Hue -->
              <div class="mb-3">
                <div class="flex justify-between items-center mb-1">
                  <span class="text-xs text-gray-400">Hue (H)</span>
                  <span class="text-sm text-white font-mono">{{ Math.round(oklch.h) }}°</span>
                </div>
                <input
                  v-model.number="oklch.h"
                  @input="convertFromOKLCH"
                  type="range"
                  min="0"
                  max="360"
                  step="1"
                  class="w-full h-2 rounded-lg appearance-none cursor-pointer slider hue-slider"
                />
              </div>

              <!-- Preview de la couleur OKLCH -->
              <div class="mt-4 p-4 rounded-lg border border-gray-600" :style="{ backgroundColor: currentColor }">
                <div class="text-center">
                  <div class="text-xs font-mono text-white bg-black/50 px-2 py-1 rounded inline-block">
                    oklch({{ oklch.l.toFixed(2) }} {{ oklch.c.toFixed(2) }} {{ Math.round(oklch.h) }})
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Section Output -->
      <div>
        <h3 class="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">📋 Formats de sortie</h3>
        
        <div class="space-y-2 sm:space-y-3">
          <!-- HEX -->
          <div class="bg-white/10 rounded-lg p-4 flex items-center justify-between">
            <div>
              <div class="text-gray-400 text-sm">HEX</div>
              <div class="text-white font-mono font-bold text-lg">{{ formats.hex }}</div>
            </div>
            <button
              @click="copy(formats.hex)"
              class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              📋
            </button>
          </div>

          <!-- RGB -->
          <div class="bg-white/10 rounded-lg p-4 flex items-center justify-between">
            <div>
              <div class="text-gray-400 text-sm">RGB</div>
              <div class="text-white font-mono font-bold text-lg">{{ formats.rgb }}</div>
            </div>
            <button
              @click="copy(formats.rgb)"
              class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              📋
            </button>
          </div>

          <!-- HSL -->
          <div class="bg-white/10 rounded-lg p-4 flex items-center justify-between">
            <div>
              <div class="text-gray-400 text-sm">HSL</div>
              <div class="text-white font-mono font-bold text-lg">{{ formats.hsl }}</div>
            </div>
            <button
              @click="copy(formats.hsl)"
              class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              📋
            </button>
          </div>

          <!-- CMYK -->
          <div class="bg-white/10 rounded-lg p-4 flex items-center justify-between">
            <div>
              <div class="text-gray-400 text-sm">CMYK</div>
              <div class="text-white font-mono font-bold text-lg">{{ formats.cmyk }}</div>
            </div>
            <button
              @click="copy(formats.cmyk)"
              class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              📋
            </button>
          </div>

          <!-- OKLCH -->
          <div class="bg-white/10 rounded-lg p-4 flex items-center justify-between">
            <div class="flex-1">
              <div class="text-gray-400 text-sm flex items-center gap-2">
                OKLCH 
              </div>
              <div class="text-white font-mono font-bold text-sm sm:text-base">{{ formats.oklch }}</div>
            </div>
            <button
              @click="copy(formats.oklch)"
              class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              📋
            </button>
          </div>

          <!-- CSS Variable -->
          <div class="bg-white/10 rounded-lg p-4 flex items-center justify-between">
            <div>
              <div class="text-gray-400 text-sm">CSS Variable</div>
              <div class="text-white font-mono text-sm">{{ formats.cssVar }}</div>
            </div>
            <button
              @click="copy(formats.cssVar)"
              class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              📋
            </button>
          </div>

          <!-- Tailwind -->
          <div class="bg-white/10 rounded-lg p-4 flex items-center justify-between">
            <div>
              <div class="text-gray-400 text-sm">Tailwind Class</div>
              <div class="text-white font-mono text-sm">{{ formats.tailwind }}</div>
            </div>
            <button
              @click="copy(formats.tailwind)"
              class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              📋
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Variations de couleurs -->
    <div class="mt-8">
      <h3 class="text-xl font-bold text-white mb-4">🎨 Variations de teinte</h3>
      <div class="grid grid-cols-5 md:grid-cols-10 gap-2">
        <div
          v-for="shade in shades"
          :key="shade"
          :style="{ backgroundColor: shade.color }"
          class="h-20 rounded-lg shadow-lg cursor-pointer hover:scale-110 transition-transform"
          @click="setColorFromShade(shade.color)"
          :title="shade.label"
        >
          <div class="h-full flex items-end justify-center pb-2">
            <span class="text-xs font-bold" :style="{ color: shade.textColor }">
              {{ shade.label }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const currentColor = ref('#3B82F6')
const hexInput = ref('#3B82F6')
const rgb = ref({ r: 59, g: 130, b: 246 })
const hsl = ref({ h: 217, s: 91, l: 60 })
const oklch = ref({ l: 0.62, c: 0.22, h: 250 })

// Initialiser depuis la couleur par défaut
watch(
  currentColor,
  newColor => {
    const result = hexToRgb(newColor)
    if (result) {
      rgb.value = result
      const hslResult = rgbToHsl(result.r, result.g, result.b)
      hsl.value = hslResult
      const oklchResult = rgbToOklch(result.r, result.g, result.b)
      oklch.value = oklchResult
      hexInput.value = newColor
    }
  },
  { immediate: true }
)

function convertFromHex() {
  const result = hexToRgb(hexInput.value)
  if (result) {
    rgb.value = result
    const hslResult = rgbToHsl(result.r, result.g, result.b)
    hsl.value = hslResult
    currentColor.value = hexInput.value
  }
}

function convertFromRGB() {
  const hex = rgbToHex(rgb.value.r, rgb.value.g, rgb.value.b)
  hexInput.value = hex
  currentColor.value = hex
  const hslResult = rgbToHsl(rgb.value.r, rgb.value.g, rgb.value.b)
  hsl.value = hslResult
  const oklchResult = rgbToOklch(rgb.value.r, rgb.value.g, rgb.value.b)
  oklch.value = oklchResult
}

function convertFromHSL() {
  const rgbResult = hslToRgb(hsl.value.h, hsl.value.s, hsl.value.l)
  rgb.value = rgbResult
  const hex = rgbToHex(rgbResult.r, rgbResult.g, rgbResult.b)
  hexInput.value = hex
  currentColor.value = hex
  const oklchResult = rgbToOklch(rgbResult.r, rgbResult.g, rgbResult.b)
  oklch.value = oklchResult
}

function convertFromOKLCH() {
  const rgbResult = oklchToRgb(oklch.value.l, oklch.value.c, oklch.value.h)
  rgb.value = rgbResult
  const hex = rgbToHex(rgbResult.r, rgbResult.g, rgbResult.b)
  hexInput.value = hex
  currentColor.value = hex
  const hslResult = rgbToHsl(rgbResult.r, rgbResult.g, rgbResult.b)
  hsl.value = hslResult
}

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      }
    : null
}

function rgbToHex(r, g, b) {
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()
}

function rgbToHsl(r, g, b) {
  r /= 255
  g /= 255
  b /= 255
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h,
    s,
    l = (max + min) / 2

  if (max === min) {
    h = s = 0
  } else {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6
        break
      case g:
        h = ((b - r) / d + 2) / 6
        break
      case b:
        h = ((r - g) / d + 4) / 6
        break
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  }
}

function hslToRgb(h, s, l) {
  s /= 100
  l /= 100
  const k = n => (n + h / 30) % 12
  const a = s * Math.min(l, 1 - l)
  const f = n => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)))
  return {
    r: Math.round(255 * f(0)),
    g: Math.round(255 * f(8)),
    b: Math.round(255 * f(4))
  }
}

function rgbToCmyk(r, g, b) {
  let c = 1 - r / 255
  let m = 1 - g / 255
  let y = 1 - b / 255
  let k = Math.min(c, m, y)

  c = ((c - k) / (1 - k)) * 100
  m = ((m - k) / (1 - k)) * 100
  y = ((y - k) / (1 - k)) * 100
  k = k * 100

  return {
    c: Math.round(c) || 0,
    m: Math.round(m) || 0,
    y: Math.round(y) || 0,
    k: Math.round(k) || 0
  }
}

// Conversion RGB vers OKLCH
function rgbToOklch(r, g, b) {
  // RGB linéaire
  const toLinear = (c) => {
    c = c / 255
    return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
  }
  
  const rLin = toLinear(r)
  const gLin = toLinear(g)
  const bLin = toLinear(b)
  
  // RGB linéaire vers OKLab
  const l = 0.4122214708 * rLin + 0.5363325363 * gLin + 0.0514459929 * bLin
  const m = 0.2119034982 * rLin + 0.6806995451 * gLin + 0.1073969566 * bLin
  const s = 0.0883024619 * rLin + 0.2817188376 * gLin + 0.6299787005 * bLin
  
  const l_ = Math.cbrt(l)
  const m_ = Math.cbrt(m)
  const s_ = Math.cbrt(s)
  
  const L = 0.2104542553 * l_ + 0.7936177850 * m_ - 0.0040720468 * s_
  const a = 1.9779984951 * l_ - 2.4285922050 * m_ + 0.4505937099 * s_
  const b_ = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.8086757660 * s_
  
  // OKLab vers OKLCH
  const C = Math.sqrt(a * a + b_ * b_)
  let H = Math.atan2(b_, a) * 180 / Math.PI
  if (H < 0) H += 360
  
  return {
    l: Math.round(L * 100) / 100,
    c: Math.round(C * 100) / 100,
    h: Math.round(H)
  }
}

// Conversion OKLCH vers RGB
function oklchToRgb(L, C, H) {
  // OKLCH vers OKLab
  const a = C * Math.cos(H * Math.PI / 180)
  const b = C * Math.sin(H * Math.PI / 180)
  
  // OKLab vers RGB linéaire
  const l_ = L + 0.3963377774 * a + 0.2158037573 * b
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b
  const s_ = L - 0.0894841775 * a - 1.2914855480 * b
  
  const l = l_ * l_ * l_
  const m = m_ * m_ * m_
  const s = s_ * s_ * s_
  
  const rLin = +4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s
  const gLin = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s
  const bLin = -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s
  
  // RGB linéaire vers sRGB
  const fromLinear = (c) => {
    c = Math.max(0, Math.min(1, c))
    return c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(c, 1 / 2.4) - 0.055
  }
  
  return {
    r: Math.round(fromLinear(rLin) * 255),
    g: Math.round(fromLinear(gLin) * 255),
    b: Math.round(fromLinear(bLin) * 255)
  }
}

const formats = computed(() => {
  const cmyk = rgbToCmyk(rgb.value.r, rgb.value.g, rgb.value.b)
  return {
    hex: hexInput.value,
    rgb: `rgb(${rgb.value.r}, ${rgb.value.g}, ${rgb.value.b})`,
    hsl: `hsl(${hsl.value.h}, ${hsl.value.s}%, ${hsl.value.l}%)`,
    cmyk: `cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)`,
    oklch: `oklch(${oklch.value.l} ${oklch.value.c} ${oklch.value.h})`,
    cssVar: `--primary-color: ${hexInput.value};`,
    tailwind: `bg-[${hexInput.value}]`
  }
})

const shades = computed(() => {
  const variations = []
  for (let i = 1; i <= 10; i++) {
    const lightness = i * 10
    const color = hslToRgb(hsl.value.h, hsl.value.s, lightness)
    const hexColor = rgbToHex(color.r, color.g, color.b)
    variations.push({
      label: `${i * 100}`,
      color: hexColor,
      textColor: lightness > 50 ? '#000000' : '#FFFFFF'
    })
  }
  return variations
})

function setColorFromShade(color) {
  currentColor.value = color
}

function copy(text) {
  navigator.clipboard.writeText(text)
  alert(`Copié: ${text}`)
}
</script>

<style scoped>
/* Slider personnalisé */
.slider::-webkit-slider-thumb {
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: white;
  cursor: pointer;
  border: 3px solid #3b82f6;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
}

.slider::-moz-range-thumb {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: white;
  cursor: pointer;
  border: 3px solid #3b82f6;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
}

/* Gradient de teinte pour le slider Hue */
.hue-slider {
  background: linear-gradient(to right, 
    hsl(0, 100%, 50%),
    hsl(60, 100%, 50%),
    hsl(120, 100%, 50%),
    hsl(180, 100%, 50%),
    hsl(240, 100%, 50%),
    hsl(300, 100%, 50%),
    hsl(360, 100%, 50%)
  );
}
</style>
