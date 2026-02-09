#!/bin/bash

# Script de déploiement à exécuter SUR LE SERVEUR
# Usage: ./deploy.sh

echo ""
echo "================================"
echo "🚀 DÉPLOIEMENT DU PORTFOLIO"
echo "================================"
echo ""

# Configuration
PROJECT_PATH="/srv/Dev/Perso/My-Porfolio/myporfolio"
PM2_APP_NAME="portfolio"
PORT=3003

# Couleurs
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Étape 1 : Aller dans le dossier du projet
echo -e "${YELLOW}📂 Étape 1/6 : Navigation vers le projet...${NC}"
cd "$PROJECT_PATH" || { echo -e "${RED}❌ Erreur : Impossible d'accéder au dossier $PROJECT_PATH${NC}"; exit 1; }
echo -e "${GREEN}✅ Dossier du projet : $PROJECT_PATH${NC}"
echo ""

# Étape 2 : Pull des dernières modifications depuis Git
echo -e "${YELLOW}📥 Étape 2/6 : Récupération des dernières modifications...${NC}"
git pull origin main || { echo -e "${RED}❌ Erreur lors du git pull${NC}"; exit 1; }
echo -e "${GREEN}✅ Code mis à jour${NC}"
echo ""

# Étape 3 : Installation des dépendances
echo -e "${YELLOW}📦 Étape 3/6 : Installation des dépendances...${NC}"
npm install || { echo -e "${RED}❌ Erreur lors de l'installation des dépendances${NC}"; exit 1; }
echo -e "${GREEN}✅ Dépendances installées${NC}"
echo ""

# Étape 4 : Build de l'application
echo -e "${YELLOW}🔨 Étape 4/6 : Build de l'application...${NC}"
npm run build || { echo -e "${RED}❌ Erreur lors du build${NC}"; exit 1; }
echo -e "${GREEN}✅ Build réussi${NC}"
echo ""

# Étape 5 : Vérifier si PM2 est installé
echo -e "${YELLOW}🔍 Étape 5/6 : Vérification de PM2...${NC}"
if ! command -v pm2 &> /dev/null; then
    echo -e "${YELLOW}⚠️  PM2 non installé, installation en cours...${NC}"
    npm install -g pm2
    echo -e "${GREEN}✅ PM2 installé${NC}"
else
    echo -e "${GREEN}✅ PM2 déjà installé${NC}"
fi
echo ""

# Étape 6 : Redémarrer ou démarrer l'application
echo -e "${YELLOW}🔄 Étape 6/6 : Démarrage de l'application...${NC}"

# Vérifier si l'app existe déjà dans PM2
if pm2 list | grep -q "$PM2_APP_NAME"; then
    echo -e "${CYAN}🔄 Application existante détectée, redémarrage...${NC}"
    pm2 restart "$PM2_APP_NAME"
    echo -e "${GREEN}✅ Application redémarrée${NC}"
else
    echo -e "${CYAN}🆕 Première installation, démarrage de l'application...${NC}"
    PORT=$PORT pm2 start npm --name "$PM2_APP_NAME" -- start
    pm2 save
    echo -e "${GREEN}✅ Application démarrée${NC}"
    
    # Configurer PM2 pour démarrer au boot
    echo -e "${YELLOW}⚙️  Configuration du démarrage automatique...${NC}"
    pm2 startup systemd -u root --hp /root
    echo -e "${GREEN}✅ Démarrage automatique configuré${NC}"
fi

echo ""
echo "================================"
echo -e "${GREEN}✅ DÉPLOIEMENT TERMINÉ !${NC}"
echo "================================"
echo ""

# Afficher le statut
echo -e "${CYAN}📊 Statut de l'application :${NC}"
pm2 status "$PM2_APP_NAME"
echo ""

echo -e "${CYAN}🌐 Site disponible sur :${NC}"
echo "  - https://azizsere.eveilon.com"
echo "  - http://localhost:$PORT"
echo ""

echo -e "${CYAN}💡 Commandes utiles :${NC}"
echo "  - Voir les logs       : pm2 logs $PM2_APP_NAME"
echo "  - Arrêter l'app       : pm2 stop $PM2_APP_NAME"
echo "  - Redémarrer l'app    : pm2 restart $PM2_APP_NAME"
echo "  - Voir le statut      : pm2 status"
echo "  - Supprimer l'app     : pm2 delete $PM2_APP_NAME"
echo ""
