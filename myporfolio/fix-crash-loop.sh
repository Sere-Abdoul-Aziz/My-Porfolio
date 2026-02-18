#!/bin/bash

# 🚨 SCRIPT DE RÉSOLUTION DU CRASH LOOP
# Problème : Port 3003 déjà utilisé (EADDRINUSE)
# Solution : Nettoyer et redémarrer proprement

echo "🔍 Diagnostic du problème..."
echo ""

# 1. Voir les processus PM2
echo "📊 État PM2 actuel :"
pm2 status
echo ""

# 2. Arrêter l'app problématique
echo "🛑 Arrêt de portfolio..."
pm2 stop portfolio
echo ""

# 3. Identifier le processus qui bloque le port
echo "🔍 Processus utilisant le port 3003 :"
lsof -ti:3003 2>/dev/null || fuser 3003/tcp 2>/dev/null
echo ""

# 4. Tuer les processus bloquants
echo "💀 Libération du port 3003..."
lsof -ti:3003 | xargs kill -9 2>/dev/null || fuser -k 3003/tcp 2>/dev/null
sleep 2
echo ""

# 5. Vérifier que le port est libre
echo "✅ Vérification port 3003 :"
if netstat -tulpn | grep -q 3003; then
    echo "❌ ERREUR : Port 3003 toujours occupé !"
    netstat -tulpn | grep 3003
    exit 1
else
    echo "✅ Port 3003 libre"
fi
echo ""

# 6. Supprimer l'app PM2
echo "🗑️  Suppression de l'ancienne config PM2..."
pm2 delete portfolio 2>/dev/null || true
echo ""

# 7. Redémarrer avec ecosystem.config.js
echo "🚀 Redémarrage avec ecosystem.config.js..."
cd /srv/Dev/Perso/My-Porfolio/myporfolio

if [ ! -f "ecosystem.config.js" ]; then
    echo "❌ ERREUR : ecosystem.config.js introuvable !"
    exit 1
fi

pm2 start ecosystem.config.js
pm2 save
echo ""

# 8. Attendre le démarrage
echo "⏳ Attente du démarrage (10 secondes)..."
sleep 10
echo ""

# 9. Vérifier le statut
echo "📊 Statut final :"
pm2 status
echo ""

echo "📝 Logs (dernières 20 lignes) :"
pm2 logs portfolio --lines 20 --nostream
echo ""

# 10. Vérification finale
echo "🎯 Vérification finale :"
if pm2 status | grep -q "portfolio.*online"; then
    echo "✅ SUCCESS : Portfolio démarré avec succès !"
    echo ""
    echo "🌐 Vérifier l'application :"
    echo "   curl http://localhost:3003"
else
    echo "❌ ERREUR : Portfolio n'a pas démarré correctement"
    echo ""
    echo "📋 Actions à faire :"
    echo "   1. Vérifier les logs : pm2 logs portfolio"
    echo "   2. Vérifier le port : netstat -tulpn | grep 3003"
    echo "   3. Vérifier le build : cd /srv/Dev/Perso/My-Porfolio/myporfolio && npm run build"
fi
