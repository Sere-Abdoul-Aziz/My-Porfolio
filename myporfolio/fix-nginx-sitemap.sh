#!/bin/bash

# Script pour configurer Nginx et activer le sitemap
# À exécuter sur le serveur

echo "🔧 Configuration du sitemap..."

# 1. Vérifier si la route API fonctionne localement
echo "1. Test de l'API sitemap..."
curl -s http://localhost:3003/api/sitemap.xml | head -5

# 2. Backup de la config Nginx
echo ""
echo "2. Backup de la configuration Nginx..."
cp /etc/nginx/sites-available/azizsere.eveilon.com /etc/nginx/sites-available/azizsere.eveilon.com.backup

# 3. Ajouter la configuration pour le sitemap
echo ""
echo "3. Configuration de Nginx pour le sitemap..."

# Trouver la ligne "location / {" et ajouter avant
cat > /tmp/nginx-sitemap.conf << 'EOF'

    # Sitemap et robots.txt - proxy vers l'API Nuxt
    location = /sitemap.xml {
        proxy_pass http://127.0.0.1:3003/api/sitemap.xml;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        add_header Content-Type "application/xml; charset=utf-8";
        add_header Cache-Control "public, max-age=3600";
    }

    location = /robots.txt {
        proxy_pass http://127.0.0.1:3003/api/robots.txt;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        add_header Content-Type "text/plain; charset=utf-8";
        add_header Cache-Control "public, max-age=86400";
    }

EOF

echo ""
echo "📝 Ajoutez manuellement ce bloc dans /etc/nginx/sites-available/azizsere.eveilon.com"
echo "AVANT la section 'location / {'"
echo ""
cat /tmp/nginx-sitemap.conf
echo ""
echo "Voulez-vous que je l'ajoute automatiquement ? (y/n)"
read -r response

if [[ "$response" == "y" ]]; then
    # Chercher la ligne "location / {" et insérer avant
    sed -i '/location \/ {/i\    # Sitemap et robots.txt - proxy vers l'"'"'API Nuxt\n    location = /sitemap.xml {\n        proxy_pass http://127.0.0.1:3003/api/sitemap.xml;\n        proxy_http_version 1.1;\n        proxy_set_header Host $host;\n        proxy_set_header X-Real-IP $remote_addr;\n        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;\n        proxy_set_header X-Forwarded-Proto $scheme;\n        add_header Content-Type "application/xml; charset=utf-8";\n        add_header Cache-Control "public, max-age=3600";\n    }\n\n    location = /robots.txt {\n        proxy_pass http://127.0.0.1:3003/api/robots.txt;\n        proxy_http_version 1.1;\n        proxy_set_header Host $host;\n        add_header Content-Type "text/plain; charset=utf-8";\n        add_header Cache-Control "public, max-age=86400";\n    }' /etc/nginx/sites-available/azizsere.eveilon.com
    
    echo "✅ Configuration ajoutée"
fi

# 4. Tester la configuration Nginx
echo ""
echo "4. Test de la configuration Nginx..."
nginx -t

if [ $? -eq 0 ]; then
    echo "✅ Configuration Nginx valide"
    
    # 5. Recharger Nginx
    echo ""
    echo "5. Rechargement de Nginx..."
    systemctl reload nginx
    echo "✅ Nginx rechargé"
    
    # 6. Tester le sitemap
    echo ""
    echo "6. Test du sitemap via HTTPS..."
    sleep 2
    curl -s https://azizsere.eveilon.com/sitemap.xml | head -10
    
    echo ""
    echo "✅ Configuration terminée !"
    echo ""
    echo "🧪 Testez maintenant :"
    echo "  curl https://azizsere.eveilon.com/sitemap.xml"
    echo "  curl https://azizsere.eveilon.com/robots.txt"
else
    echo "❌ Erreur dans la configuration Nginx"
    echo "Restauration du backup..."
    cp /etc/nginx/sites-available/azizsere.eveilon.com.backup /etc/nginx/sites-available/azizsere.eveilon.com
fi
