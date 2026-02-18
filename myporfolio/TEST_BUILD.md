# 🧪 TEST DE BUILD - VÉRIFICATION CRASH LOOP

## Tests à effectuer AVANT déploiement

### 1. Build local (crucial)
```bash
npm run build
```

**✅ Attendu :**
- Build se termine sans erreur
- Pas d'erreur "window is not defined"
- Pas d'erreur Firebase

**❌ Si erreur :**
- Vérifier les logs pour identifier le fichier problématique
- S'assurer que tous les imports Firebase sont protégés par `typeof window !== 'undefined'`

### 2. Preview production
```bash
npm run preview
```

**✅ Attendu :**
- Serveur démarre sur http://localhost:3000
- Pas de crash
- Application charge correctement

**Tester ces URLs :**
- [ ] http://localhost:3000/ (page d'accueil)
- [ ] http://localhost:3000/about
- [ ] http://localhost:3000/ressources
- [ ] http://localhost:3000/blog (doit charger même si pas d'articles Firebase)
- [ ] http://localhost:3000/privacy

### 3. Vérifier les logs console

**Dans le navigateur (F12) :**
- [ ] ✅ Firebase initialisé côté client
- [ ] ✅ Google Tag Manager initialisé
- [ ] ❌ AUCUNE erreur "window is not defined"
- [ ] ❌ AUCUNE erreur Firebase en SSR

### 4. Test Firebase (si données existent)

**Aller sur /blog :**
- [ ] Les articles Firestore se chargent (si vous en avez créé)
- [ ] Sinon : "Aucun article trouvé" (normal)

## Commandes de diagnostic VPS

### Avant déploiement (état actuel)
```bash
# État actuel
pm2 status
# Attendu : portfolio avec uptime 1s, ↺ 138+

# Logs d'erreur
pm2 logs portfolio --lines 50 --err
# Chercher : "window is not defined", "Firebase", erreurs

# Arrêter le crash loop
pm2 stop portfolio
```

### Après déploiement (nouveau code)
```bash
# Pull et build
cd /chemin/vers/portfolio
git pull origin main
npm install
npm run build

# Redémarrer
pm2 restart portfolio
pm2 save

# Vérifier immédiatement
pm2 status
# Attendu : uptime qui augmente (pas bloqué à 1s)

# Surveiller les logs (2 minutes)
pm2 logs portfolio --lines 30
# Attendu : 
# - ✅ Firebase initialisé côté client
# - ✅ Serveur Nuxt démarré
# - ❌ AUCUNE erreur de redémarrage

# Vérifier le CPU
pm2 monit
# Attendu : CPU < 10% après 1 minute
```

## Checklist finale avant déploiement

- [ ] `npm run build` réussit sans erreur
- [ ] `npm run preview` démarre sans crash
- [ ] Pages / /about /ressources /blog accessibles
- [ ] Console navigateur : "✅ Firebase initialisé côté client"
- [ ] AUCUNE erreur SSR dans les logs

## Si problème persiste après déploiement

### 1. Vérifier le port
```bash
# Voir quel port portfolio utilise
pm2 info portfolio

# Vérifier si le port est libre
netstat -tulpn | grep :3000
```

### 2. Vérifier les variables d'environnement
```bash
# Vérifier le fichier ecosystem ou PM2
pm2 env 0
```

### 3. Tester manuellement (sans PM2)
```bash
# Arrêter PM2
pm2 stop portfolio

# Lancer manuellement
cd /chemin/vers/portfolio
node .output/server/index.mjs
```

**Si ça marche manuellement mais pas avec PM2 :**
→ Problème de configuration PM2 (ecosystem.config.js)

**Si ça crash même manuellement :**
→ Retour à ce guide, vérifier firebase.js et useBlog.js

## Métriques de succès

| Métrique | Avant | Après attendu |
|----------|-------|---------------|
| Uptime | 1s | > 1 heure |
| Restarts | ↺ 138+ | ↺ 0-1 |
| CPU | 70% | < 10% |
| RAM | Variable | Stable |
| Status | ❌ Errored | ✅ Online |

## Logs attendus (succès)

```
✅ Firebase initialisé côté client
🏷️ Google Tag Manager initialisé avec ID: GTM-W6X7JWVF
[nuxt] Nitro server started
Listening on http://[::]:3000
```

## Logs d'erreur (échec)

```
❌ ReferenceError: window is not defined
❌ Error initializing Firebase
❌ Cannot read property 'initializeApp' of undefined
ERROR Process exited unexpectedly
```

Si vous voyez ces erreurs → Firebase toujours exécuté en SSR → revenir à firebase.js

---

**Auteur :** Diagnostic automatique  
**Date :** 2026-02-18  
**Objectif :** Crash loop résolu (138 restarts → 0)
