<template>
  <div class="color-converter">
    <div class="grid lg:grid-cols-2 gap-8">
      <!-- Section Input -->
      <div>
        <h3 class="text-xl font-bold text-white mb-4">🎨 Entrez une couleur</h3>
        
        <!-- Color Picker -->
        <div class="bg-white/10 rounded-xl p-6 space-y-4">
          <div class="flex items-center space-x-4">
            <input
              v-model="currentColor"
              type="color"
              class="w-24 h-24 rounded-lg cursor-pointer border-4 border-white/20"
            />
            <div class="flex-1">
              <label class="block text-white mb-2 font-semibold">Couleur sélectionnée</label>
              <div
                :style="{ backgroundColor: currentColor }"
                class="w-full h-24 rounded-lg shadow-lg border-2 border-white/20"
              ></div>
            </div>
          </div>

          <!-- Input Methods -->
          <div class="space-y-3">
            <div>
              <label class="block text-white mb-2">HEX</label>
              <input
                v-model="hexInput"
                @input="convertFromHex"
                type="text"
                placeholder="#FF5733"
                class="w-full bg-gray-800 text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none font-mono"
              />
            </div>

            <div>
              <label class="block text-white mb-2">RGB</label>
              <div class="grid grid-cols-3 gap-2">
                <input
                  v-model.number="rgb.r"
                  @input="convertFromRGB"
                  type="number"
                  min="0"
                  max="255"
                  placeholder="R"
                  class="bg-gray-800 text-white px-3 py-3 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none text-center"
                />
                <input
                  v-model.number="rgb.g"
                  @input="convertFromRGB"
                  type="number"
                  min="0"
                  max="255"
                  placeholder="G"
                  class="bg-gray-800 text-white px-3 py-3 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none text-center"
                />
                <input
                  v-model.number="rgb.b"
                  @input="convertFromRGB"
                  type="number"
                  min="0"
                  max="255"
                  placeholder="B"
                  class="bg-gray-800 text-white px-3 py-3 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none text-center"
                />
              </div>
            </div>

            <div>
              <label class="block text-white mb-2">HSL</label>
              <div class="grid grid-cols-3 gap-2">
                <input
                  v-model.number="hsl.h"
                  @input="convertFromHSL"
                  type="number"
                  min="0"
                  max="360"
                  placeholder="H"
                  class="bg-gray-800 text-white px-3 py-3 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none text-center"
                />
                <input
                  v-model.number="hsl.s"
                  @input="convertFromHSL"
                  type="number"
                  min="0"
                  max="100"
                  placeholder="S%"
                  class="bg-gray-800 text-white px-3 py-3 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none text-center"
                />
                <input
                  v-model.number="hsl.l"
                  @input="convertFromHSL"
                  type="number"
                  min="0"
                  max="100"
                  placeholder="L%"
                  class="bg-gray-800 text-white px-3 py-3 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none text-center"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Section Output -->
      <div>
        <h3 class="text-xl font-bold text-white mb-4">📋 Formats de sortie</h3>
        
        <div class="space-y-3">
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

// Initialiser depuis la couleur par défaut
watch(
  currentColor,
  newColor => {
    const result = hexToRgb(newColor)
    if (result) {
      rgb.value = result
      const hslResult = rgbToHsl(result.r, result.g, result.b)
      hsl.value = hslResult
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
}

function convertFromHSL() {
  const rgbResult = hslToRgb(hsl.value.h, hsl.value.s, hsl.value.l)
  rgb.value = rgbResult
  const hex = rgbToHex(rgbResult.r, rgbResult.g, rgbResult.b)
  hexInput.value = hex
  currentColor.value = hex
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

const formats = computed(() => {
  const cmyk = rgbToCmyk(rgb.value.r, rgb.value.g, rgb.value.b)
  return {
    hex: hexInput.value,
    rgb: `rgb(${rgb.value.r}, ${rgb.value.g}, ${rgb.value.b})`,
    hsl: `hsl(${hsl.value.h}, ${hsl.value.s}%, ${hsl.value.l}%)`,
    cmyk: `cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)`,
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
