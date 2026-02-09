# Script de déploiement automatique vers le serveur
# Usage: .\deploy.ps1

Write-Host ""
Write-Host "================================" -ForegroundColor Cyan
Write-Host "🚀 DÉPLOIEMENT DU PORTFOLIO" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

# Configuration
$SERVER_USER = "root"
$SERVER_IP = "31.97.53.71"
$SERVER_PATH = "/srv/Dev/Perso/My-Porfolio/myporfolio"
$PM2_APP_NAME = "portfolio"

# Étape 1 : Build de l'application
Write-Host "📦 Étape 1/4 : Build de l'application..." -ForegroundColor Yellow
try {
    npm run build
    if ($LASTEXITCODE -ne 0) {
        throw "Erreur lors du build"
    }
    Write-Host "✅ Build réussi" -ForegroundColor Green
} catch {
    Write-Host "❌ Erreur lors du build : $_" -ForegroundColor Red
    exit 1
}

Write-Host ""

# Étape 2 : Upload des fichiers vers le serveur
Write-Host "📤 Étape 2/4 : Upload des fichiers vers le serveur..." -ForegroundColor Yellow
try {
    # Upload du dossier .output
    scp -r .output "${SERVER_USER}@${SERVER_IP}:${SERVER_PATH}/"
    if ($LASTEXITCODE -ne 0) {
        throw "Erreur lors de l'upload"
    }
    
    # Upload du package.json si modifié
    scp package.json "${SERVER_USER}@${SERVER_IP}:${SERVER_PATH}/"
    
    Write-Host "✅ Upload réussi" -ForegroundColor Green
} catch {
    Write-Host "❌ Erreur lors de l'upload : $_" -ForegroundColor Red
    exit 1
}

Write-Host ""

# Étape 3 : Installation des dépendances sur le serveur (si nécessaire)
Write-Host "📚 Étape 3/4 : Vérification des dépendances..." -ForegroundColor Yellow
try {
    ssh "${SERVER_USER}@${SERVER_IP}" "cd ${SERVER_PATH} && npm install --production"
    Write-Host "✅ Dépendances vérifiées" -ForegroundColor Green
} catch {
    Write-Host "⚠️  Avertissement : Impossible de vérifier les dépendances" -ForegroundColor Yellow
}

Write-Host ""

# Étape 4 : Redémarrage de l'application avec PM2
Write-Host "🔄 Étape 4/4 : Redémarrage de l'application..." -ForegroundColor Yellow
try {
    ssh "${SERVER_USER}@${SERVER_IP}" "pm2 restart ${PM2_APP_NAME}"
    if ($LASTEXITCODE -ne 0) {
        Write-Host "⚠️  PM2 restart échoué, tentative de démarrage..." -ForegroundColor Yellow
        ssh "${SERVER_USER}@${SERVER_IP}" "cd ${SERVER_PATH} && PORT=3003 pm2 start npm --name ${PM2_APP_NAME} -- start"
    }
    Write-Host "✅ Application redémarrée" -ForegroundColor Green
} catch {
    Write-Host "❌ Erreur lors du redémarrage : $_" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "================================" -ForegroundColor Cyan
Write-Host "✅ DÉPLOIEMENT TERMINÉ AVEC SUCCÈS !" -ForegroundColor Green
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "🌐 Site disponible sur : https://azizsere.eveilon.com" -ForegroundColor Magenta
Write-Host ""

# Afficher les logs PM2
Write-Host "📊 Statut de l'application :" -ForegroundColor Cyan
ssh "${SERVER_USER}@${SERVER_IP}" "pm2 status ${PM2_APP_NAME}"

Write-Host ""
Write-Host "💡 Commandes utiles :" -ForegroundColor Cyan
Write-Host "  - Voir les logs : ssh ${SERVER_USER}@${SERVER_IP} 'pm2 logs ${PM2_APP_NAME}'" -ForegroundColor Gray
Write-Host "  - Voir le statut : ssh ${SERVER_USER}@${SERVER_IP} 'pm2 status'" -ForegroundColor Gray
Write-Host ""
