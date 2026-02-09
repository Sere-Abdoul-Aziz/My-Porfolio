#!/bin/bash

echo "🔧 Correction de la configuration Nginx pour le sitemap..."

# 1. Restaurer le backup de la config Nginx (avant les modifications)
echo "1. Restauration de la configuration Nginx originale..."
if [ -f /etc/nginx/sites-available/azizsere.eveilon.com.backup ]; then
    cp /etc/nginx/sites-available/azizsere.eveilon.com.backup /etc/nginx/sites-available/azizsere.eveilon.com
    echo "✅ Configuration restaurée"
else
    echo "⚠️  Pas de backup trouvé, suppression manuelle des règles sitemap..."
    # Supprimer les blocs location = /sitemap.xml et location = /robots.txt
    sed -i '/location = \/sitemap.xml {/,/}/d' /etc/nginx/sites-available/azizsere.eveilon.com
    sed -i '/location = \/robots.txt {/,/}/d' /etc/nginx/sites-available/azizsere.eveilon.com
    # Supprimer les commentaires associés
    sed -i '/# Sitemap et robots.txt/d' /etc/nginx/sites-available/azizsere.eveilon.com
fi

# 2. Tester la configuration
echo ""
echo "2. Test de la configuration Nginx..."
nginx -t

if [ $? -eq 0 ]; then
    # 3. Recharger Nginx
    echo ""
    echo "3. Rechargement de Nginx..."
    systemctl reload nginx
    echo "✅ Nginx rechargé"
    
    # 4. Vérifier que le sitemap statique existe
    echo ""
    echo "4. Vérification du fichier sitemap.xml..."
    if [ -f /srv/Dev/Perso/My-Porfolio/myporfolio/.output/public/sitemap.xml ]; then
        echo "✅ Sitemap trouvé dans .output/public/"
        echo "Contenu:"
        head -5 /srv/Dev/Perso/My-Porfolio/myporfolio/.output/public/sitemap.xml
    else
        echo "⚠️  Sitemap non trouvé dans .output/public/"
        echo "Vérification dans public/..."
        if [ -f /srv/Dev/Perso/My-Porfolio/myporfolio/public/sitemap.xml ]; then
            echo "✅ Sitemap trouvé dans public/"
            head -5 /srv/Dev/Perso/My-Porfolio/myporfolio/public/sitemap.xml
        fi
    fi
    
    # 5. Test final
    echo ""
    echo "5. Test du sitemap via HTTPS..."
    sleep 2
    curl -s https://azizsere.eveilon.com/sitemap.xml | head -10
    
    echo ""
    echo "✅ Configuration terminée !"
else
    echo "❌ Erreur dans la configuration Nginx"
fi
