<template>
  <div class="ressources-page min-h-screen relative overflow-hidden">
    <!-- Animated Background -->
    <div class="fixed inset-0 -z-10">
      <!-- Gradient base -->
      <div class="absolute inset-0 bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900"></div>
      
      <!-- Animated gradient orbs -->
      <div class="absolute top-0 -left-4 w-72 h-72 bg-green-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
      <div class="absolute top-0 -right-4 w-72 h-72 bg-emerald-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      <div class="absolute -bottom-8 left-20 w-72 h-72 bg-teal-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      <div class="absolute bottom-20 right-20 w-72 h-72 bg-lime-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-6000"></div>
      
      <!-- Grid overlay -->
      <div class="absolute inset-0 bg-grid-pattern opacity-10"></div>
      
      <!-- Noise texture -->
      <div class="absolute inset-0 bg-noise opacity-5"></div>
    </div>

    <div class="max-w-7xl mx-auto px-4 py-20 relative">
      <!-- Header with glassmorphism -->
      <header class="text-center mb-16 relative">
       
        
        <h1 class="text-6xl md:text-8xl font-black text-white mb-6 leading-tight">
          <span class="bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500 animate-gradient">
            Outils Gratuits
          </span>
          <br />
          <span class="text-5xl md:text-7xl">pour Développeurs</span>
        </h1>
        
        <p class="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Collection de <span class="text-yellow-400 font-bold">39 mini-outils</span> puissants pour 
          <span class="text-green-400 font-bold"> booster</span> votre productivité 
        
        </p>

        <!-- Stats badges -->
        <div class="flex flex-wrap gap-4 justify-center mt-8">
          <div class="px-6 py-3 bg-white/10 backdrop-blur-lg rounded-full border border-white/20">
            <span class="text-yellow-400 font-bold text-lg">39</span>
            <span class="text-gray-300 text-sm ml-2">Outils</span>
          </div>
          <div class="px-6 py-3 bg-white/10 backdrop-blur-lg rounded-full border border-white/20">
            <span class="text-green-400 font-bold text-lg">100%</span>
            <span class="text-gray-300 text-sm ml-2">Gratuit</span>
          </div>
          <div class="px-6 py-3 bg-white/10 backdrop-blur-lg rounded-full border border-white/20">
           
            <span class="text-gray-300 text-sm ml-2">Instantané</span>
          </div>
        </div>
      </header>

      <!-- Navigation par catégories avec nouveau design -->
      <div class="mb-12">
        <div class="flex flex-wrap gap-3 justify-center">
          <button
            v-for="cat in categories"
            :key="cat.id"
            @click="selectedCategory = cat.id"
            :class="[
              'group relative px-8 py-4 rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 flex items-center gap-3 overflow-hidden',
              selectedCategory === cat.id
                ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-2xl shadow-green-500/50'
                : 'bg-white/5 backdrop-blur-lg text-gray-300 hover:bg-white/10 border border-white/10'
            ]"
          >
            <!-- Shimmer effect on hover -->
            <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            
            <component 
              :is="cat.icon" 
              :class="[
                'w-6 h-6 transition-transform group-hover:rotate-12',
                selectedCategory === cat.id ? 'text-white' : 'text-green-400'
              ]" 
            />
            <span class="relative z-10">{{ cat.name }}</span>
            
            <!-- Badge count -->
            <span 
              v-if="cat.id !== 'all'"
              :class="[
                'text-xs px-2 py-1 rounded-full font-bold',
                selectedCategory === cat.id 
                  ? 'bg-white/20 text-white' 
                  : 'bg-green-500/20 text-green-300'
              ]"
            >
              {{ tools.filter(t => t.categoryId === cat.id).length }}
            </span>
          </button>
        </div>
      </div>

      <!-- Grille d'outils avec cartes améliorées -->
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="(tool, index) in filteredTools"
          :key="tool.id"
          @click="openTool(tool)"
          :style="{ animationDelay: `${index * 50}ms` }"
          class="tool-card group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-6 cursor-pointer transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 border border-white/20 hover:border-purple-500/50 overflow-hidden animate-fadeInUp"
        >
          <!-- Gradient overlay on hover -->
          <div class="absolute inset-0 bg-gradient-to-br from-green-600/0 via-emerald-600/0 to-teal-600/0 group-hover:from-green-600/10 group-hover:via-emerald-600/10 group-hover:to-teal-600/10 transition-all duration-500 rounded-2xl"></div>
          
          <!-- Corner accent -->
          <div class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-500/20 to-transparent rounded-bl-full transform translate-x-16 -translate-y-16 group-hover:translate-x-8 group-hover:-translate-y-8 transition-transform duration-500"></div>
          
          <div class="relative z-10">
            <!-- Icon with animated background -->
            <div class="mb-4 relative inline-block">
              <div :class="['absolute -inset-2 bg-gradient-to-r rounded-xl blur opacity-0 group-hover:opacity-75 transition-opacity duration-500', getColorClasses(tool.color).glow]"></div>
              <div :class="['relative p-3 bg-gradient-to-br rounded-xl transition-all duration-300', getColorClasses(tool.color).bg, getColorClasses(tool.color).bgHover]">
                <component :is="tool.icon" :class="['w-10 h-10 transition-colors duration-300', getColorClasses(tool.color).icon, getColorClasses(tool.color).iconHover]" />
              </div>
            </div>
            
            <h3 :class="['text-xl font-bold text-white mb-2 transition-colors duration-300', getColorClasses(tool.color).title]">
              {{ tool.name }}
            </h3>
            
            <p class="text-gray-400 text-sm mb-4 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
              {{ tool.description }}
            </p>
            
            <div class="flex items-center justify-between">
              <span :class="['inline-flex items-center gap-2 px-3 py-1 text-xs font-bold rounded-full', getColorClasses(tool.color).badge]">
                <span :class="['w-2 h-2 rounded-full animate-pulse', getColorClasses(tool.color).dot]"></span>
                {{ tool.category }}
              </span>
              
              <div class="flex items-center gap-2 text-emerald-400 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                <span>Ouvrir</span>
                <svg class="w-4 h-4 animate-bounce-x" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                </svg>
              </div>
            </div>
          </div>

          <!-- Sparkles effect -->
          <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
            <div class="absolute top-4 right-4 w-1 h-1 bg-yellow-400 rounded-full animate-ping"></div>
            <div :class="['absolute bottom-4 left-4 w-1 h-1 rounded-full animate-ping animation-delay-500', getColorClasses(tool.color).sparkle]"></div>
            <div :class="['absolute top-1/2 right-8 w-1 h-1 rounded-full animate-ping animation-delay-1000', getColorClasses(tool.color).sparkle]"></div>
          </div>
        </div>
      </div>

      <!-- Empty state si filtré -->
      <div v-if="filteredTools.length === 0" class="text-center py-20">
        <div class="inline-block p-6 bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10">
          <div class="text-6xl mb-4">🔍</div>
          <h3 class="text-2xl font-bold text-white mb-2">Aucun outil trouvé</h3>
          <p class="text-gray-400">Essayez une autre catégorie</p>
        </div>
      </div>
    </div>

    <!-- Modal amélioré -->
    <Teleport to="body">
      <Transition name="modal">
        <div
          v-if="activeTool"
          class="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4"
          @click.self="closeTool"
        >
          <div class="modal-content relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-green-500/30">
            <!-- Animated gradient border -->
            <div class="absolute -inset-[2px] bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-3xl opacity-75 blur animate-gradient-rotate -z-10"></div>
            
            <!-- Header du modal -->
            <div class="sticky top-0 bg-gradient-to-r from-gray-900/95 to-gray-800/95 backdrop-blur-xl border-b border-white/10 p-6 flex items-center justify-between z-20">
              <div class="flex items-center space-x-4">
                <div class="relative">
                  <div class="absolute -inset-1 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl blur opacity-75"></div>
                  <div class="relative p-3 bg-gray-800 rounded-xl">
                    <component :is="activeTool.icon" class="w-8 h-8 text-green-400" />
                  </div>
                </div>
                <div>
                  <h2 class="text-3xl font-black text-white bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-400">
                    {{ activeTool.name }}
                  </h2>
                  <p class="text-gray-400 text-sm mt-1">{{ activeTool.description }}</p>
                </div>
              </div>
              
              <button
                @click="closeTool"
                class="group relative p-3 bg-white/5 hover:bg-red-500/20 border border-white/10 hover:border-red-500/50 rounded-xl transition-all duration-300 transform hover:scale-110 hover:rotate-90"
              >
                <svg class="w-6 h-6 text-gray-400 group-hover:text-red-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>

            <!-- Contenu de l'outil -->
            <div class="p-6 overflow-y-auto max-h-[calc(90vh-100px)] custom-scrollbar">
              <Suspense>
                <template #default>
                  <component :is="activeTool.component" />
                </template>
                <template #fallback>
                  <div class="flex items-center justify-center py-20">
                    <div class="text-center">
                      <div class="relative inline-block mb-6">
                        <div class="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full blur-xl opacity-50 animate-pulse"></div>
                        <div class="relative w-16 h-16 border-4 border-green-500/30 border-t-green-500 rounded-full animate-spin"></div>
                      </div>
                      <p class="text-xl font-bold text-white mb-2">Chargement de l'outil...</p>
                      <p class="text-gray-400 text-sm">Préparation de l'interface ⚡</p>
                    </div>
                  </div>
                </template>
              </Suspense>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed, defineAsyncComponent, markRaw } from 'vue'
import {
  PaintBrushIcon,
  WrenchScrewdriverIcon,
  PhotoIcon,
  LockClosedIcon,
  SquaresPlusIcon,
  ArrowPathIcon,
  SparklesIcon,
  FaceSmileIcon,
  Squares2X2Icon,
  DocumentTextIcon,
  StarIcon,
  DevicePhoneMobileIcon,
  CodeBracketIcon,
  ArchiveBoxIcon,
  CheckBadgeIcon,
  DocumentIcon,
  ShieldCheckIcon,
  LinkIcon,
  GlobeAltIcon,
  MagnifyingGlassIcon,
  ClipboardDocumentListIcon,
  BarsArrowDownIcon,
  HashtagIcon,
  ViewfinderCircleIcon,
  CalculatorIcon,
  QrCodeIcon,
  KeyIcon,
  FingerPrintIcon,
  CogIcon,
  CommandLineIcon
} from '@heroicons/vue/24/outline'

// Lazy load components - chargés uniquement quand nécessaire
const ColorPaletteGenerator = defineAsyncComponent(() => import('@/components/tools/ColorPaletteGenerator.vue'))
const ColorConverter = defineAsyncComponent(() => import('@/components/tools/ColorConverter.vue'))
const GlassmorphismGenerator = defineAsyncComponent(() => import('@/components/tools/GlassmorphismGenerator.vue'))
const NeumorphismGenerator = defineAsyncComponent(() => import('@/components/tools/NeumorphismGenerator.vue'))
const MaterialDesignPalette = defineAsyncComponent(() => import('@/components/tools/MaterialDesignPalette.vue'))
const TypographyGenerator = defineAsyncComponent(() => import('@/components/tools/TypographyGenerator.vue'))
const PatternGenerator = defineAsyncComponent(() => import('@/components/tools/PatternGenerator.vue'))
const FaviconCreator = defineAsyncComponent(() => import('@/components/tools/FaviconCreator.vue'))
const MockupGenerator = defineAsyncComponent(() => import('@/components/tools/MockupGenerator.vue'))
const CSSMinifier = defineAsyncComponent(() => import('@/components/tools/CSSMinifier.vue'))
const JSMinifier = defineAsyncComponent(() => import('@/components/tools/JSMinifier.vue'))
const CodeBeautifier = defineAsyncComponent(() => import('@/components/tools/CodeBeautifier.vue'))
const JSONValidator = defineAsyncComponent(() => import('@/components/tools/JSONValidator.vue'))
const LoremIpsumGenerator = defineAsyncComponent(() => import('@/components/tools/LoremIpsumGenerator.vue'))
const Base64Encoder = defineAsyncComponent(() => import('@/components/tools/Base64Encoder.vue'))
const URLEncoder = defineAsyncComponent(() => import('@/components/tools/URLEncoder.vue'))
const UUIDGenerator = defineAsyncComponent(() => import('@/components/tools/UUIDGenerator.vue'))
const DiffChecker = defineAsyncComponent(() => import('@/components/tools/DiffChecker.vue'))
const GitignoreGenerator = defineAsyncComponent(() => import('@/components/tools/GitignoreGenerator.vue'))
const CaseConverter = defineAsyncComponent(() => import('@/components/tools/CaseConverter.vue'))
const TextCounter = defineAsyncComponent(() => import('@/components/tools/TextCounter.vue'))
const ImageCompressor = defineAsyncComponent(() => import('@/components/tools/ImageCompressor.vue'))
const ImageConverter = defineAsyncComponent(() => import('@/components/tools/ImageConverter.vue'))
const ImageResizer = defineAsyncComponent(() => import('@/components/tools/ImageResizer.vue'))
const PlaceholderGenerator = defineAsyncComponent(() => import('@/components/tools/PlaceholderGenerator.vue'))
const SVGOptimizer = defineAsyncComponent(() => import('@/components/tools/SVGOptimizer.vue'))
const QRCodeGenerator = defineAsyncComponent(() => import('@/components/tools/QRCodeGenerator.vue'))
const BarcodeGenerator = defineAsyncComponent(() => import('@/components/tools/BarcodeGenerator.vue'))
const PasswordGenerator = defineAsyncComponent(() => import('@/components/tools/PasswordGenerator.vue'))
const PasswordStrengthTester = defineAsyncComponent(() => import('@/components/tools/PasswordStrengthTester.vue'))
const MD5Generator = defineAsyncComponent(() => import('@/components/tools/MD5Generator.vue'))
const SHAGenerator = defineAsyncComponent(() => import('@/components/tools/SHAGenerator.vue'))
const JWTTool = defineAsyncComponent(() => import('@/components/tools/JWTTool.vue'))
const SSHKeyGenerator = defineAsyncComponent(() => import('@/components/tools/SSHKeyGenerator.vue'))
const HtaccessGenerator = defineAsyncComponent(() => import('@/components/tools/HtaccessGenerator.vue'))
const RobotsTxtGenerator = defineAsyncComponent(() => import('@/components/tools/RobotsTxtGenerator.vue'))
const CSPGenerator = defineAsyncComponent(() => import('@/components/tools/CSPGenerator.vue'))

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
  { id: 'all', name: 'Tous', icon: SquaresPlusIcon },
  { id: 'design', name: 'Design & UI/UX', icon: PaintBrushIcon },
  { id: 'code', name: 'Code Utilities', icon: WrenchScrewdriverIcon },
  { id: 'images', name: 'Images & Médias', icon: PhotoIcon },
  { id: 'security', name: 'Sécurité & Crypto', icon: LockClosedIcon }
]

const tools = [
  {
    id: 'color-palette-generator',
    name: 'Générateur de Palette',
    description: 'Extrayez des couleurs depuis une image et créez des harmonies',
    icon: PaintBrushIcon,
    category: 'Design & UI/UX',
    categoryId: 'design',
    component: ColorPaletteGenerator,
    color: 'emerald'
  },
  {
    id: 'color-converter',
    name: 'Convertisseur de Couleurs',
    description: 'Convertissez entre HEX, RGB, HSL et CMYK',
    icon: ArrowPathIcon,
    category: 'Design & UI/UX',
    categoryId: 'design',
    component: ColorConverter,
    color: 'teal'
  },
  {
    id: 'glassmorphism-generator',
    name: 'Générateur Glassmorphism',
    description: 'Créez des effets de verre moderne avec code CSS',
    icon: SparklesIcon,
    category: 'Design & UI/UX',
    categoryId: 'design',
    component: GlassmorphismGenerator,
    color: 'cyan'
  },
  {
    id: 'neumorphism-generator',
    name: 'Générateur Neumorphism',
    description: 'Design neumorphique avec preview en temps réel',
    icon: FaceSmileIcon,
    category: 'Design & UI/UX',
    categoryId: 'design',
    component: NeumorphismGenerator,
    color: 'green'
  },
  {
    id: 'material-design-palette',
    name: 'Palette Material Design',
    description: 'Couleurs officielles Google Material Design',
    icon: Squares2X2Icon,
    category: 'Design & UI/UX',
    categoryId: 'design',
    component: MaterialDesignPalette,
    color: 'lime'
  },
  {
    id: 'typography-generator',
    name: 'Générateur de Typographie',
    description: 'Combinaisons de polices harmonieuses',
    icon: DocumentTextIcon,
    category: 'Design & UI/UX',
    categoryId: 'design',
    component: TypographyGenerator,
    color: 'emerald'
  },
  {
    id: 'pattern-generator',
    name: 'Générateur de Pattern SVG',
    description: 'Créez des motifs de fond SVG personnalisés',
    icon: Squares2X2Icon,
    category: 'Design & UI/UX',
    categoryId: 'design',
    component: PatternGenerator,
    color: 'teal'
  },
  {
    id: 'favicon-creator',
    name: 'Créateur de Favicon',
    description: 'Convertissez une image en favicon multi-formats',
    icon: StarIcon,
    category: 'Design & UI/UX',
    categoryId: 'design',
    component: FaviconCreator,
    color: 'cyan'
  },
  {
    id: 'mockup-generator',
    name: 'Générateur de Mockup',
    description: 'Templates de maquettes pour vos présentations',
    icon: DevicePhoneMobileIcon,
    category: 'Design & UI/UX',
    categoryId: 'design',
    component: MockupGenerator,
    color: 'green'
  },
  {
    id: 'css-minifier',
    name: 'Minificateur CSS',
    description: 'Compression et optimisation de code CSS',
    icon: BarsArrowDownIcon,
    category: 'Code Utilities',
    categoryId: 'code',
    component: CSSMinifier,
    color: 'lime'
  },
  {
    id: 'js-minifier',
    name: 'Minificateur JavaScript',
    description: 'Compression de code JavaScript',
    icon: ArchiveBoxIcon,
    category: 'Code Utilities',
    categoryId: 'code',
    component: JSMinifier,
    color: 'emerald'
  },
  {
    id: 'code-beautifier',
    name: 'Beautifier de Code',
    description: 'Formatage automatique de code (JS, CSS, HTML, JSON)',
    icon: SparklesIcon,
    category: 'Code Utilities',
    categoryId: 'code',
    component: CodeBeautifier,
    color: 'teal'
  },
  {
    id: 'json-validator',
    name: 'Validateur JSON',
    description: 'Validation et formatage de JSON',
    icon: CheckBadgeIcon,
    category: 'Code Utilities',
    categoryId: 'code',
    component: JSONValidator,
    color: 'cyan'
  },
  {
    id: 'lorem-ipsum',
    name: 'Générateur Lorem Ipsum',
    description: 'Génération de texte de remplissage',
    icon: DocumentIcon,
    category: 'Code Utilities',
    categoryId: 'code',
    component: LoremIpsumGenerator,
    color: 'green'
  },
  {
    id: 'base64-encoder',
    name: 'Encodeur/Décodeur Base64',
    description: 'Conversion Base64 pour texte et fichiers',
    icon: CodeBracketIcon,
    category: 'Code Utilities',
    categoryId: 'code',
    component: Base64Encoder,
    color: 'lime'
  },
  {
    id: 'url-encoder',
    name: 'Encodeur/Décodeur URL',
    description: 'Encodage et décodage d\'URL',
    icon: LinkIcon,
    category: 'Code Utilities',
    categoryId: 'code',
    component: URLEncoder,
    color: 'emerald'
  },
  {
    id: 'uuid-generator',
    name: 'Générateur UUID/GUID',
    description: 'Génération d\'identifiants uniques v1 et v4',
    icon: FingerPrintIcon,
    category: 'Code Utilities',
    categoryId: 'code',
    component: UUIDGenerator,
    color: 'teal'
  },
  {
    id: 'diff-checker',
    name: 'Diff Checker',
    description: 'Comparaison de textes ligne par ligne',
    icon: MagnifyingGlassIcon,
    category: 'Code Utilities',
    categoryId: 'code',
    component: DiffChecker,
    color: 'cyan'
  },
  {
    id: 'gitignore-generator',
    name: 'Générateur .gitignore',
    description: 'Création de fichiers .gitignore pour différentes stacks',
    icon: ClipboardDocumentListIcon,
    category: 'Code Utilities',
    categoryId: 'code',
    component: GitignoreGenerator,
    color: 'green'
  },
  {
    id: 'case-converter',
    name: 'Convertisseur de Casse',
    description: 'camelCase, snake_case, kebab-case et plus',
    icon: DocumentTextIcon,
    category: 'Code Utilities',
    categoryId: 'code',
    component: CaseConverter,
    color: 'lime'
  },
  {
    id: 'text-counter',
    name: 'Compteur de Texte',
    description: 'Statistiques complètes: mots, caractères, temps de lecture',
    icon: CalculatorIcon,
    category: 'Code Utilities',
    categoryId: 'code',
    component: TextCounter,
    color: 'emerald'
  },
  {
    id: 'image-compressor',
    name: 'Compresseur d\'Images',
    description: 'Réduction de poids PNG/JPG/WebP en lot',
    icon: BarsArrowDownIcon,
    category: 'Images & Médias',
    categoryId: 'images',
    component: ImageCompressor,
    color: 'teal'
  },
  {
    id: 'image-converter',
    name: 'Convertisseur d\'Images',
    description: 'Conversion PNG ↔ JPG ↔ WebP',
    icon: ArrowPathIcon,
    category: 'Images & Médias',
    categoryId: 'images',
    component: ImageConverter,
    color: 'cyan'
  },
  {
    id: 'image-resizer',
    name: 'Redimensionneur d\'Images',
    description: 'Redimensionnement en lot avec presets',
    icon: ViewfinderCircleIcon,
    category: 'Images & Médias',
    categoryId: 'images',
    component: ImageResizer,
    color: 'green'
  },
  {
    id: 'placeholder-generator',
    name: 'Générateur de Placeholder',
    description: 'Images de remplissage personnalisables',
    icon: PhotoIcon,
    category: 'Images & Médias',
    categoryId: 'images',
    component: PlaceholderGenerator,
    color: 'lime'
  },
  {
    id: 'svg-optimizer',
    name: 'Optimiseur SVG',
    description: 'Nettoyage et compression de fichiers SVG',
    icon: SparklesIcon,
    category: 'Images & Médias',
    categoryId: 'images',
    component: SVGOptimizer,
    color: 'emerald'
  },
  {
    id: 'qrcode-generator',
    name: 'Générateur de QR Code',
    description: 'QR codes personnalisés pour URL, email, WiFi',
    icon: QrCodeIcon,
    category: 'Images & Médias',
    categoryId: 'images',
    component: QRCodeGenerator,
    color: 'teal'
  },
  {
    id: 'barcode-generator',
    name: 'Générateur de Code-Barres',
    description: 'Code 128, EAN-13, UPC, Code 39',
    icon: ViewfinderCircleIcon,
    category: 'Images & Médias',
    categoryId: 'images',
    component: BarcodeGenerator,
    color: 'cyan'
  },
  {
    id: 'password-generator',
    name: 'Générateur de Mots de Passe',
    description: 'Mots de passe sécurisés avec options avancées',
    icon: KeyIcon,
    category: 'Sécurité & Crypto',
    categoryId: 'security',
    component: PasswordGenerator,
    color: 'green'
  },
  {
    id: 'password-strength-tester',
    name: 'Testeur de Force de Mot de Passe',
    description: 'Analyse de sécurité avec recommandations',
    icon: ShieldCheckIcon,
    category: 'Sécurité & Crypto',
    categoryId: 'security',
    component: PasswordStrengthTester,
    color: 'emerald'
  },
  {
    id: 'md5-generator',
    name: 'Générateur de Hash MD5',
    description: 'Hachage MD5 pour vérification d\'intégrité',
    icon: LockClosedIcon,
    category: 'Sécurité & Crypto',
    categoryId: 'security',
    component: MD5Generator,
    color: 'teal'
  },
  {
    id: 'sha-generator',
    name: 'Générateur de Hash SHA',
    description: 'SHA-256, SHA-512 et autres algorithmes',
    icon: HashtagIcon,
    category: 'Sécurité & Crypto',
    categoryId: 'security',
    component: SHAGenerator,
    color: 'cyan'
  },
  {
    id: 'jwt-tool',
    name: 'Encodeur/Décodeur JWT',
    description: 'JSON Web Tokens - encoder et décoder',
    icon: CodeBracketIcon,
    category: 'Sécurité & Crypto',
    categoryId: 'security',
    component: JWTTool,
    color: 'green'
  },
  {
    id: 'ssh-key-generator',
    name: 'Générateur de Clés SSH',
    description: 'Guide pour générer des paires de clés SSH',
    icon: KeyIcon,
    category: 'Sécurité & Crypto',
    categoryId: 'security',
    component: SSHKeyGenerator,
    color: 'lime'
  },
  {
    id: 'htaccess-generator',
    name: 'Générateur .htaccess',
    description: 'Configuration Apache avec options de sécurité',
    icon: CogIcon,
    category: 'Sécurité & Crypto',
    categoryId: 'security',
    component: HtaccessGenerator,
    color: 'emerald'
  },
  {
    id: 'robots-txt-generator',
    name: 'Générateur Robots.txt',
    description: 'Fichiers robots.txt pour contrôle SEO',
    icon: CommandLineIcon,
    category: 'Sécurité & Crypto',
    categoryId: 'security',
    component: RobotsTxtGenerator,
    color: 'teal'
  },
  {
    id: 'csp-generator',
    name: 'Générateur CSP Headers',
    description: 'Content Security Policy pour sécuriser votre site',
    icon: ShieldCheckIcon,
    category: 'Sécurité & Crypto',
    categoryId: 'security',
    component: CSPGenerator,
    color: 'cyan'
  }
]

// Helper function to get color classes
const getColorClasses = (color) => {
  const colors = {
    emerald: {
      icon: 'text-emerald-400',
      iconHover: 'group-hover:text-emerald-300',
      bg: 'from-emerald-500/20 to-emerald-500/20',
      bgHover: 'group-hover:from-emerald-500/30 group-hover:to-emerald-500/30',
      glow: 'from-emerald-600 to-emerald-600',
      badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
      dot: 'bg-emerald-400',
      title: 'group-hover:text-emerald-300',
      sparkle: 'bg-emerald-400'
    },
    teal: {
      icon: 'text-teal-400',
      iconHover: 'group-hover:text-teal-300',
      bg: 'from-teal-500/20 to-teal-500/20',
      bgHover: 'group-hover:from-teal-500/30 group-hover:to-teal-500/30',
      glow: 'from-teal-600 to-teal-600',
      badge: 'bg-teal-500/20 text-teal-300 border-teal-500/30',
      dot: 'bg-teal-400',
      title: 'group-hover:text-teal-300',
      sparkle: 'bg-teal-400'
    },
    cyan: {
      icon: 'text-cyan-400',
      iconHover: 'group-hover:text-cyan-300',
      bg: 'from-cyan-500/20 to-cyan-500/20',
      bgHover: 'group-hover:from-cyan-500/30 group-hover:to-cyan-500/30',
      glow: 'from-cyan-600 to-cyan-600',
      badge: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
      dot: 'bg-cyan-400',
      title: 'group-hover:text-cyan-300',
      sparkle: 'bg-cyan-400'
    },
    green: {
      icon: 'text-green-400',
      iconHover: 'group-hover:text-green-300',
      bg: 'from-green-500/20 to-green-500/20',
      bgHover: 'group-hover:from-green-500/30 group-hover:to-green-500/30',
      glow: 'from-green-600 to-green-600',
      badge: 'bg-green-500/20 text-green-300 border-green-500/30',
      dot: 'bg-green-400',
      title: 'group-hover:text-green-300',
      sparkle: 'bg-green-400'
    },
    lime: {
      icon: 'text-lime-400',
      iconHover: 'group-hover:text-lime-300',
      bg: 'from-lime-500/20 to-lime-500/20',
      bgHover: 'group-hover:from-lime-500/30 group-hover:to-lime-500/30',
      glow: 'from-lime-600 to-lime-600',
      badge: 'bg-lime-500/20 text-lime-300 border-lime-500/30',
      dot: 'bg-lime-400',
      title: 'group-hover:text-lime-300',
      sparkle: 'bg-lime-400'
    },
    blue: {
      icon: 'text-blue-400',
      iconHover: 'group-hover:text-blue-300',
      bg: 'from-blue-500/20 to-blue-500/20',
      bgHover: 'group-hover:from-blue-500/30 group-hover:to-blue-500/30',
      glow: 'from-blue-600 to-blue-600',
      badge: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
      dot: 'bg-blue-400',
      title: 'group-hover:text-blue-300',
      sparkle: 'bg-blue-400'
    },
    violet: {
      icon: 'text-violet-400',
      iconHover: 'group-hover:text-violet-300',
      bg: 'from-violet-500/20 to-violet-500/20',
      bgHover: 'group-hover:from-violet-500/30 group-hover:to-violet-500/30',
      glow: 'from-violet-600 to-violet-600',
      badge: 'bg-violet-500/20 text-violet-300 border-violet-500/30',
      dot: 'bg-violet-400',
      title: 'group-hover:text-violet-300',
      sparkle: 'bg-violet-400'
    },
    rose: {
      icon: 'text-rose-400',
      iconHover: 'group-hover:text-rose-300',
      bg: 'from-rose-500/20 to-rose-500/20',
      bgHover: 'group-hover:from-rose-500/30 group-hover:to-rose-500/30',
      glow: 'from-rose-600 to-rose-600',
      badge: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
      dot: 'bg-rose-400',
      title: 'group-hover:text-rose-300',
      sparkle: 'bg-rose-400'
    }
  }
  return colors[color] || colors.green
}

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
/* Animations personnalisées */
.ressources-page {
  animation: fadeIn 0.8s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Animated blobs */
@keyframes blob {
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  25% {
    transform: translate(20px, -50px) scale(1.1);
  }
  50% {
    transform: translate(-20px, 20px) scale(0.9);
  }
  75% {
    transform: translate(50px, 50px) scale(1.05);
  }
}

.animate-blob {
  animation: blob 20s infinite ease-in-out;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}

.animation-delay-6000 {
  animation-delay: 6s;
}

.animation-delay-500 {
  animation-delay: 500ms;
}

.animation-delay-1000 {
  animation-delay: 1s;
}

/* Gradient animation */
@keyframes gradient {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

.animate-gradient {
  background-size: 200% 200%;
  animation: gradient 3s ease infinite;
}

/* Gradient rotation for modal border */
@keyframes gradient-rotate {
  0% {
    transform: rotate(0deg) scale(1);
  }
  50% {
    transform: rotate(180deg) scale(1.1);
  }
  100% {
    transform: rotate(360deg) scale(1);
  }
}

.animate-gradient-rotate {
  animation: gradient-rotate 8s linear infinite;
}

/* Bounce X animation */
@keyframes bounce-x {
  0%, 100% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(4px);
  }
}

.animate-bounce-x {
  animation: bounce-x 1s infinite;
}

/* Fade in up for cards */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeInUp {
  animation: fadeInUp 0.6s ease-out forwards;
  opacity: 0;
}

/* Grid pattern */
.bg-grid-pattern {
  background-image: 
    linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
  background-size: 50px 50px;
}

/* Noise texture */
.bg-noise {
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
}

/* Modal transitions */
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

.modal-content {
  animation: modalSlideIn 0.4s ease-out;
}

@keyframes modalSlideIn {
  from {
    opacity: 0;
    transform: translateY(-50px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* Custom scrollbar */
.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, #10b981, #059669);
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(180deg, #059669, #047857);
}

/* Shimmer effect */
@keyframes shimmer {
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
}

.tool-card:hover::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.1),
    transparent
  );
  animation: shimmer 2s infinite;
}
</style>
