---
title: "Pourquoi j'ai choisi Nuxt 3 pour mon portfolio"
slug: "pourquoi-nuxt3"
category: "tech"
excerpt: "Découvrez les raisons techniques et stratégiques qui m'ont poussé à adopter Nuxt 3 pour la création de mon portfolio professionnel."
author: "Sere Aziz"
date: "2026-02-15"
imageUrl: "/images/blog/nuxt3.jpg"
tags: ["Nuxt", "Vue.js", "Performance", "SSR"]
---

# Pourquoi j'ai choisi Nuxt 3 pour mon portfolio

Après plusieurs années d'expérience en développement web, j'ai décidé de reconstruire mon portfolio avec **Nuxt 3**. Voici pourquoi.

## 🚀 Performance native

Nuxt 3 apporte des améliorations significatives par rapport à Nuxt 2 :

- **Vite** comme bundler par défaut (démarrage ultra-rapide)
- **Tree-shaking** automatique
- **Code splitting** intelligent
- **Lazy loading** optimisé

### Résultats concrets

Mon ancien portfolio (React) :
- Temps de chargement initial : **3.2s**
- Lighthouse score : **78/100**

Avec Nuxt 3 :
- Temps de chargement : **0.9s** ⚡
- Lighthouse score : **98/100** 🎯

```javascript
// nuxt.config.ts - Configuration optimisée
export default defineNuxtConfig({
  vite: {
    build: {
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            if (id.includes('node_modules')) {
              return 'vendor'
            }
          }
        }
      }
    }
  }
})
```

## 💡 Composition API native

La **Composition API** de Vue 3 rend le code plus maintenable :

```vue
<script setup>
import { ref, computed } from 'vue'

const projects = ref([])
const filteredProjects = computed(() => {
  return projects.value.filter(p => p.featured)
})
</script>
```

Plus besoin de `data()`, `methods`, `computed` séparés. Tout est **logique et groupé**.

## 🎨 Modules puissants

L'écosystème Nuxt 3 offre des modules de qualité :

1. **@nuxt/image** - Optimisation d'images automatique
2. **@nuxtjs/tailwindcss** - Intégration CSS instantanée
3. **@nuxtjs/sitemap** - SEO automatisé

## 🔒 TypeScript natif

Nuxt 3 supporte TypeScript **sans configuration** :

```typescript
interface Project {
  id: number
  title: string
  tech: string[]
}

const projects: Ref<Project[]> = ref([])
```

## 🌐 Modes de rendu flexibles

Nuxt 3 permet de choisir pour **chaque route** :

- **SSR** (Server-Side Rendering)
- **CSR** (Client-Side Rendering)
- **SSG** (Static Site Generation)

```javascript
export default defineNuxtConfig({
  routeRules: {
    '/': { prerender: true },        // SSG
    '/blog': { ssr: false },         // CSR
    '/api/**': { ssr: true }         // SSR
  }
})
```

## 📈 Conclusion

Nuxt 3 m'a permis de créer un portfolio :
- ✅ **Rapide** (score 98/100)
- ✅ **Maintenable** (Composition API)
- ✅ **SEO optimisé** (prerendering)
- ✅ **Évolutif** (TypeScript)

> "Nuxt 3 n'est pas qu'un framework, c'est une **expérience développeur exceptionnelle**." - Sere Aziz

---

**Envie d'en discuter ?** Laissez un commentaire ci-dessous ! 💬
