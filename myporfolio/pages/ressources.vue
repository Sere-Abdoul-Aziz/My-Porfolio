<template>
  <div class="ressources-page min-h-screen bg-gradient-to-b from-gray-900 via-blue-900 to-gray-900 py-20 px-4">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <header class="text-center mb-16">
        <h1 class="text-5xl md:text-7xl font-bold text-white mb-6">
          Outils Gratuits pour <span class="text-blue-400">Développeurs</span>
        </h1>
        <p class="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
          Collection de mini-outils pratiques pour faciliter votre développement quotidien
        </p>
      </header>

      <!-- Navigation par catégories -->
      <div class="mb-12">
        <div class="flex flex-wrap gap-3 justify-center">
          <button
            v-for="cat in categories"
            :key="cat.id"
            @click="selectedCategory = cat.id"
            :class="[
              'px-6 py-3 rounded-lg font-semibold transition-all transform hover:scale-105',
              selectedCategory === cat.id
                ? 'bg-blue-500 text-white shadow-lg'
                : 'bg-white/10 text-gray-300 hover:bg-white/20'
            ]"
          >
            {{ cat.icon }} {{ cat.name }}
          </button>
        </div>
      </div>

      <!-- Grille d'outils -->
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="tool in filteredTools"
          :key="tool.id"
          @click="openTool(tool)"
          class="bg-white/10 backdrop-blur-lg rounded-xl p-6 cursor-pointer hover:bg-white/20 transition-all transform hover:scale-105 hover:shadow-2xl border border-white/10"
        >
          <div class="text-4xl mb-4">{{ tool.icon }}</div>
          <h3 class="text-xl font-bold text-white mb-2">{{ tool.name }}</h3>
          <p class="text-gray-300 text-sm mb-4">{{ tool.description }}</p>
          <div class="flex items-center justify-between">
            <span class="text-blue-400 text-sm font-semibold">{{ tool.category }}</span>
            <span class="text-gray-400 text-xs">Cliquez pour ouvrir →</span>
          </div>
        </div>
      </div>

      <!-- Modal pour afficher l'outil -->
      <Teleport to="body">
        <div
          v-if="activeTool"
          class="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          @click.self="closeTool"
        >
          <div class="bg-gray-900 rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-blue-500/30">
            <!-- Header du modal -->
            <div class="sticky top-0 bg-gray-900 border-b border-white/10 p-6 flex items-center justify-between z-10">
              <div class="flex items-center space-x-4">
                <span class="text-4xl">{{ activeTool.icon }}</span>
                <div>
                  <h2 class="text-2xl font-bold text-white">{{ activeTool.name }}</h2>
                  <p class="text-gray-400 text-sm">{{ activeTool.description }}</p>
                </div>
              </div>
              <button
                @click="closeTool"
                class="text-gray-400 hover:text-white transition-colors text-3xl leading-none"
              >
                ×
              </button>
            </div>

            <!-- Contenu de l'outil -->
            <div class="p-6">
              <component :is="activeTool.component" />
            </div>
          </div>
        </div>
      </Teleport>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import ColorPaletteGenerator from '@/components/tools/ColorPaletteGenerator.vue'
import ColorConverter from '@/components/tools/ColorConverter.vue'
import GlassmorphismGenerator from '@/components/tools/GlassmorphismGenerator.vue'
import NeumorphismGenerator from '@/components/tools/NeumorphismGenerator.vue'
import MaterialDesignPalette from '@/components/tools/MaterialDesignPalette.vue'
import TypographyGenerator from '@/components/tools/TypographyGenerator.vue'
import PatternGenerator from '@/components/tools/PatternGenerator.vue'
import FaviconCreator from '@/components/tools/FaviconCreator.vue'
import MockupGenerator from '@/components/tools/MockupGenerator.vue'
import CSSMinifier from '@/components/tools/CSSMinifier.vue'
import JSMinifier from '@/components/tools/JSMinifier.vue'
import CodeBeautifier from '@/components/tools/CodeBeautifier.vue'
import JSONValidator from '@/components/tools/JSONValidator.vue'
import LoremIpsumGenerator from '@/components/tools/LoremIpsumGenerator.vue'
import Base64Encoder from '@/components/tools/Base64Encoder.vue'
import URLEncoder from '@/components/tools/URLEncoder.vue'
import UUIDGenerator from '@/components/tools/UUIDGenerator.vue'
import DiffChecker from '@/components/tools/DiffChecker.vue'
import GitignoreGenerator from '@/components/tools/GitignoreGenerator.vue'
import CaseConverter from '@/components/tools/CaseConverter.vue'
import TextCounter from '@/components/tools/TextCounter.vue'
import ImageCompressor from '@/components/tools/ImageCompressor.vue'
import ImageConverter from '@/components/tools/ImageConverter.vue'
import ImageResizer from '@/components/tools/ImageResizer.vue'
import PlaceholderGenerator from '@/components/tools/PlaceholderGenerator.vue'
import SVGOptimizer from '@/components/tools/SVGOptimizer.vue'
import QRCodeGenerator from '@/components/tools/QRCodeGenerator.vue'
import BarcodeGenerator from '@/components/tools/BarcodeGenerator.vue'
import PasswordGenerator from '@/components/tools/PasswordGenerator.vue'
import PasswordStrengthTester from '@/components/tools/PasswordStrengthTester.vue'
import MD5Generator from '@/components/tools/MD5Generator.vue'
import SHAGenerator from '@/components/tools/SHAGenerator.vue'
import JWTTool from '@/components/tools/JWTTool.vue'
import SSHKeyGenerator from '@/components/tools/SSHKeyGenerator.vue'
import HtaccessGenerator from '@/components/tools/HtaccessGenerator.vue'
import RobotsTxtGenerator from '@/components/tools/RobotsTxtGenerator.vue'
import CSPGenerator from '@/components/tools/CSPGenerator.vue'

// SEO Meta tags
useHead({
  title: 'Outils Gratuits pour Développeurs | Sere Aziz',
  meta: [
    {
      name: 'description',
      content:
        'Collection d\'outils gratuits pour développeurs web : générateur de palette de couleurs, convertisseur, glassmorphism, neumorphism et bien plus. Par Sere Aziz.'
    },
    {
      name: 'keywords',
      content:
        'outils développeur, générateur palette couleurs, convertisseur couleurs, glassmorphism, neumorphism, outils CSS, outils design, Sere Aziz'
    },
    { property: 'og:title', content: 'Outils Gratuits pour Développeurs - Sere Aziz' },
    {
      property: 'og:description',
      content: 'Collection complète d\'outils gratuits pour faciliter votre développement web.'
    },
    { property: 'og:url', content: 'https://azizsere.eveilon.com/ressources' }
  ],
  link: [{ rel: 'canonical', href: 'https://azizsere.eveilon.com/ressources' }]
})

const selectedCategory = ref('all')
const activeTool = ref(null)

const categories = [
  { id: 'all', name: 'Tous', icon: '🎯' },
  { id: 'design', name: 'Design & UI/UX', icon: '🎨' },
  { id: 'code', name: 'Code Utilities', icon: '🔧' },
  { id: 'images', name: 'Images & Médias', icon: '🖼️' },
  { id: 'security', name: 'Sécurité & Crypto', icon: '🔐' }
]

const tools = [
  {
    id: 'color-palette-generator',
    name: 'Générateur de Palette',
    description: 'Extrayez des couleurs depuis une image et créez des harmonies',
    icon: '🎨',
    category: 'Design & UI/UX',
    categoryId: 'design',
    component: ColorPaletteGenerator
  },
  {
    id: 'color-converter',
    name: 'Convertisseur de Couleurs',
    description: 'Convertissez entre HEX, RGB, HSL et CMYK',
    icon: '🔄',
    category: 'Design & UI/UX',
    categoryId: 'design',
    component: ColorConverter
  },
  {
    id: 'glassmorphism-generator',
    name: 'Générateur Glassmorphism',
    description: 'Créez des effets de verre moderne avec code CSS',
    icon: '💎',
    category: 'Design & UI/UX',
    categoryId: 'design',
    component: GlassmorphismGenerator
  },
  {
    id: 'neumorphism-generator',
    name: 'Générateur Neumorphism',
    description: 'Design neumorphique avec preview en temps réel',
    icon: '🎭',
    category: 'Design & UI/UX',
    categoryId: 'design',
    component: NeumorphismGenerator
  },
  {
    id: 'material-design-palette',
    name: 'Palette Material Design',
    description: 'Couleurs officielles Google Material Design',
    icon: '🌈',
    category: 'Design & UI/UX',
    categoryId: 'design',
    component: MaterialDesignPalette
  },
  {
    id: 'typography-generator',
    name: 'Générateur de Typographie',
    description: 'Combinaisons de polices harmonieuses',
    icon: '📝',
    category: 'Design & UI/UX',
    categoryId: 'design',
    component: TypographyGenerator
  },
  {
    id: 'pattern-generator',
    name: 'Générateur de Pattern SVG',
    description: 'Créez des motifs de fond SVG personnalisés',
    icon: '🔲',
    category: 'Design & UI/UX',
    categoryId: 'design',
    component: PatternGenerator
  },
  {
    id: 'favicon-creator',
    name: 'Créateur de Favicon',
    description: 'Convertissez une image en favicon multi-formats',
    icon: '⭐',
    category: 'Design & UI/UX',
    categoryId: 'design',
    component: FaviconCreator
  },
  {
    id: 'mockup-generator',
    name: 'Générateur de Mockup',
    description: 'Templates de maquettes pour vos présentations',
    icon: '📱',
    category: 'Design & UI/UX',
    categoryId: 'design',
    component: MockupGenerator
  },
  {
    id: 'css-minifier',
    name: 'Minificateur CSS',
    description: 'Compression et optimisation de code CSS',
    icon: '🗜️',
    category: 'Code Utilities',
    categoryId: 'code',
    component: CSSMinifier
  },
  {
    id: 'js-minifier',
    name: 'Minificateur JavaScript',
    description: 'Compression de code JavaScript',
    icon: '📦',
    category: 'Code Utilities',
    categoryId: 'code',
    component: JSMinifier
  },
  {
    id: 'code-beautifier',
    name: 'Beautifier de Code',
    description: 'Formatage automatique de code (JS, CSS, HTML, JSON)',
    icon: '✨',
    category: 'Code Utilities',
    categoryId: 'code',
    component: CodeBeautifier
  },
  {
    id: 'json-validator',
    name: 'Validateur JSON',
    description: 'Validation et formatage de JSON',
    icon: '✅',
    category: 'Code Utilities',
    categoryId: 'code',
    component: JSONValidator
  },
  {
    id: 'lorem-ipsum',
    name: 'Générateur Lorem Ipsum',
    description: 'Génération de texte de remplissage',
    icon: '📄',
    category: 'Code Utilities',
    categoryId: 'code',
    component: LoremIpsumGenerator
  },
  {
    id: 'base64-encoder',
    name: 'Encodeur/Décodeur Base64',
    description: 'Conversion Base64 pour texte et fichiers',
    icon: '🔐',
    category: 'Code Utilities',
    categoryId: 'code',
    component: Base64Encoder
  },
  {
    id: 'url-encoder',
    name: 'Encodeur/Décodeur URL',
    description: 'Encodage et décodage d\'URL',
    icon: '🔗',
    category: 'Code Utilities',
    categoryId: 'code',
    component: URLEncoder
  },
  {
    id: 'uuid-generator',
    name: 'Générateur UUID/GUID',
    description: 'Génération d\'identifiants uniques v1 et v4',
    icon: '🎲',
    category: 'Code Utilities',
    categoryId: 'code',
    component: UUIDGenerator
  },
  {
    id: 'diff-checker',
    name: 'Diff Checker',
    description: 'Comparaison de textes ligne par ligne',
    icon: '🔍',
    category: 'Code Utilities',
    categoryId: 'code',
    component: DiffChecker
  },
  {
    id: 'gitignore-generator',
    name: 'Générateur .gitignore',
    description: 'Création de fichiers .gitignore pour différentes stacks',
    icon: '📋',
    category: 'Code Utilities',
    categoryId: 'code',
    component: GitignoreGenerator
  },
  {
    id: 'case-converter',
    name: 'Convertisseur de Casse',
    description: 'camelCase, snake_case, kebab-case et plus',
    icon: '🔤',
    category: 'Code Utilities',
    categoryId: 'code',
    component: CaseConverter
  },
  {
    id: 'text-counter',
    name: 'Compteur de Texte',
    description: 'Statistiques complètes: mots, caractères, temps de lecture',
    icon: '🔢',
    category: 'Code Utilities',
    categoryId: 'code',
    component: TextCounter
  },
  {
    id: 'image-compressor',
    name: 'Compresseur d\'Images',
    description: 'Réduction de poids PNG/JPG/WebP en lot',
    icon: '🗜️',
    category: 'Images & Médias',
    categoryId: 'images',
    component: ImageCompressor
  },
  {
    id: 'image-converter',
    name: 'Convertisseur d\'Images',
    description: 'Conversion PNG ↔ JPG ↔ WebP',
    icon: '🔄',
    category: 'Images & Médias',
    categoryId: 'images',
    component: ImageConverter
  },
  {
    id: 'image-resizer',
    name: 'Redimensionneur d\'Images',
    description: 'Redimensionnement en lot avec presets',
    icon: '📐',
    category: 'Images & Médias',
    categoryId: 'images',
    component: ImageResizer
  },
  {
    id: 'placeholder-generator',
    name: 'Générateur de Placeholder',
    description: 'Images de remplissage personnalisables',
    icon: '🖼️',
    category: 'Images & Médias',
    categoryId: 'images',
    component: PlaceholderGenerator
  },
  {
    id: 'svg-optimizer',
    name: 'Optimiseur SVG',
    description: 'Nettoyage et compression de fichiers SVG',
    icon: '✨',
    category: 'Images & Médias',
    categoryId: 'images',
    component: SVGOptimizer
  },
  {
    id: 'qrcode-generator',
    name: 'Générateur de QR Code',
    description: 'QR codes personnalisés pour URL, email, WiFi',
    icon: '📱',
    category: 'Images & Médias',
    categoryId: 'images',
    component: QRCodeGenerator
  },
  {
    id: 'barcode-generator',
    name: 'Générateur de Code-Barres',
    description: 'Code 128, EAN-13, UPC, Code 39',
    icon: '〓',
    category: 'Images & Médias',
    categoryId: 'images',
    component: BarcodeGenerator
  },
  {
    id: 'password-generator',
    name: 'Générateur de Mots de Passe',
    description: 'Mots de passe sécurisés avec options avancées',
    icon: '🔑',
    category: 'Sécurité & Crypto',
    categoryId: 'security',
    component: PasswordGenerator
  },
  {
    id: 'password-strength-tester',
    name: 'Testeur de Force de Mot de Passe',
    description: 'Analyse de sécurité avec recommandations',
    icon: '🛡️',
    category: 'Sécurité & Crypto',
    categoryId: 'security',
    component: PasswordStrengthTester
  },
  {
    id: 'md5-generator',
    name: 'Générateur de Hash MD5',
    description: 'Hachage MD5 pour vérification d\'intégrité',
    icon: '🔒',
    category: 'Sécurité & Crypto',
    categoryId: 'security',
    component: MD5Generator
  },
  {
    id: 'sha-generator',
    name: 'Générateur de Hash SHA',
    description: 'SHA-256, SHA-512 et autres algorithmes',
    icon: '🔐',
    category: 'Sécurité & Crypto',
    categoryId: 'security',
    component: SHAGenerator
  },
  {
    id: 'jwt-tool',
    name: 'Encodeur/Décodeur JWT',
    description: 'JSON Web Tokens - encoder et décoder',
    icon: '🎫',
    category: 'Sécurité & Crypto',
    categoryId: 'security',
    component: JWTTool
  },
  {
    id: 'ssh-key-generator',
    name: 'Générateur de Clés SSH',
    description: 'Guide pour générer des paires de clés SSH',
    icon: '🗝️',
    category: 'Sécurité & Crypto',
    categoryId: 'security',
    component: SSHKeyGenerator
  },
  {
    id: 'htaccess-generator',
    name: 'Générateur .htaccess',
    description: 'Configuration Apache avec options de sécurité',
    icon: '⚙️',
    category: 'Sécurité & Crypto',
    categoryId: 'security',
    component: HtaccessGenerator
  },
  {
    id: 'robots-txt-generator',
    name: 'Générateur Robots.txt',
    description: 'Fichiers robots.txt pour contrôle SEO',
    icon: '🤖',
    category: 'Sécurité & Crypto',
    categoryId: 'security',
    component: RobotsTxtGenerator
  },
  {
    id: 'csp-generator',
    name: 'Générateur CSP Headers',
    description: 'Content Security Policy pour sécuriser votre site',
    icon: '🛡️',
    category: 'Sécurité & Crypto',
    categoryId: 'security',
    component: CSPGenerator
  }
]

const filteredTools = computed(() => {
  if (selectedCategory.value === 'all') {
    return tools
  }
  return tools.filter(tool => tool.categoryId === selectedCategory.value)
})

function openTool(tool) {
  activeTool.value = tool
  document.body.style.overflow = 'hidden'
}

function closeTool() {
  activeTool.value = null
  document.body.style.overflow = 'auto'
}
</script>

<style scoped>
/* Animations */
.ressources-page {
  animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
