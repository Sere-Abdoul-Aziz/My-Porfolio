# 🚨 CORRECTION DU CRASH LOOP (138 restarts)

## Problème identifié

L'application redémarrait en boucle (138 restarts, uptime 1s, 70% CPU) à cause de **Firebase initialisé côté serveur**.

### Causes racines

1. **Firebase exécuté en SSR** ❌
   - `firebase.js` initialisait Firebase sans protection `typeof window`
   - Nuxt avec `ssr: false` build quand même côté serveur pour le prerendering
   - Firebase nécessite `window` et `document` → crash immédiat

2. **Composable `useBlog.js` sans protection SSR** ❌
   - Import direct de `db` depuis `@/firebase`
   - Aucune vérification avant utilisation de Firestore
   - Les routes prérendues (`/`, `/about`, `/privacy`) essayaient d'accéder à Firebase

3. **Routes API avec `ssr: true`** ⚠️
   - Les routes `/api/**` ont `ssr: true` dans `nuxt.config.ts`
   - Si elles importaient Firebase indirectement → crash

## Corrections appliquées ✅

### 1. Protection Firebase (firebase.js)

```javascript
// ✅ AVANT (causait le crash)
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ✅ APRÈS (protection SSR)
let app = null;
let db = null;

if (typeof window !== 'undefined') {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
}
```

### 2. Protection useBlog.js

```javascript
// ✅ Fonction de vérification
const checkFirebase = () => {
  if (!db) {
    console.warn('⚠️ Firebase non initialisé (SSR ou erreur)')
    return false
  }
  return true
}

// ✅ Toutes les fonctions protégées
const fetchArticles = async () => {
  if (!checkFirebase()) return  // ← Protection ajoutée
  // ...
}
```

**Fonctions protégées :**
- ✅ `fetchArticles()`
- ✅ `fetchArticle(category, slug)`
- ✅ `fetchArticleById(articleId)`
- ✅ `fetchComments(articleId)`
- ✅ `addComment(articleId, commentData)`
- ✅ `incrementViews(articleId)`
- ✅ `fetchArticlesByCategory(category)`

## Vérifications avant déploiement

### 1. Build local
```bash
npm run build
```
**Attendu :** Build réussi sans erreur Firebase

### 2. Preview en production
```bash
npm run preview
```
**Attendu :** Serveur démarre sur port 3000 sans crash

### 3. Déploiement VPS

```bash
# 1. Arrêter l'app en crash loop
pm2 stop portfolio

# 2. Déployer le nouveau code
git pull origin main
npm install
npm run build

# 3. Redémarrer proprement
pm2 restart portfolio
pm2 logs portfolio --lines 20
```

### 4. Vérification post-déploiement

```bash
# Vérifier l'uptime (doit rester stable)
pm2 status

# Vérifier les logs (pas d'erreur Firebase)
pm2 logs portfolio --lines 50

# Vérifier le CPU (doit descendre < 10%)
pm2 monit
```

## Signes de succès ✅

| Métrique | Avant | Après attendu |
|----------|-------|---------------|
| Restarts | ↺ 138 | ↺ 0-1 |
| Uptime | 1s | > 1h |
| CPU | 70% | < 10% |
| Status | ❌ Crash loop | ✅ Online |

## Autres causes possibles (si problème persiste)

### 1. Port déjà utilisé
```bash
# Vérifier le port 3000 (ou celui configuré)
netstat -tunlp | grep 3000
```

### 2. Variables d'environnement manquantes
- Vérifier `.env` sur le serveur
- Firebase config (déjà en dur, pas le souci ici)

### 3. Dépendances manquantes
```bash
npm install --production
```

### 4. Permissions fichiers
```bash
chmod -R 755 .output/
```

## Architecture SSR/CSR actuelle

```javascript
// nuxt.config.ts
export default {
  ssr: false,  // ← CSR par défaut
  
  routeRules: {
    '/': { prerender: true },           // ← Build SSR (Firebase doit être null)
    '/about': { prerender: true },      // ← Build SSR
    '/ressources': { ssr: false },      // ← Pure CSR (OK)
    '/games': { ssr: false },           // ← Pure CSR (OK)
    '/privacy': { prerender: true },    // ← Build SSR
    '/api/**': { ssr: true }            // ← Routes API (OK, pas de Firebase)
  }
}
```

## Logs à surveiller

### ✅ Logs attendus (succès)
```
✅ Firebase initialisé côté client
🏷️ Google Tag Manager initialisé avec ID: GTM-W6X7JWVF
✅ Analytics activé avec consentement
```

### ❌ Logs d'erreur (problème)
```
❌ Erreur initialisation Firebase: [...]
⚠️ Firebase non initialisé (SSR ou erreur)
ReferenceError: window is not defined
```

## Contact support Firebase (si besoin)

Si Firebase plante encore malgré les corrections :
1. Vérifier les quotas Firestore (dashboard Firebase)
2. Vérifier les règles de sécurité Firestore
3. Activer le mode hors ligne (offline persistence)

```javascript
// firebase.js - Option hors ligne
import { enableIndexedDbPersistence } from 'firebase/firestore';

if (db) {
  enableIndexedDbPersistence(db)
    .catch((err) => {
      if (err.code == 'failed-precondition') {
        console.warn('Persistence failed: multiple tabs')
      }
    });
}
```

---

**Date de correction :** 2026-02-18  
**Testeur :** À vérifier après déploiement  
**Status :** ✅ Corrections appliquées, en attente validation production
