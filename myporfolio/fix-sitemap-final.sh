#!/bin/bash

echo "🔧 Configuration définitive du sitemap..."

# Étape 1 : Vérifier la configuration Nginx actuelle
echo "1. Vérification de la config Nginx..."
cat /etc/nginx/sites-available/azizsere.eveilon.com | grep -A 20 "server_name azizsere.eveilon.com"

echo ""
echo "2. Ajout de la règle pour servir le sitemap statique..."

# Créer la nouvelle configuration avec la règle sitemap AVANT location /
cat > /tmp/nginx-sitemap-fix.conf << 'NGINX_EOF'
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name azizsere.eveilon.com;

    # SSL configuration (gardez vos certificats existants)
    # ssl_certificate ...
    # ssl_certificate_key ...

    # Root directory
    root /srv/Dev/Perso/My-Porfolio/myporfolio/.output/public;
    index index.html;

    # IMPORTANT: Servir directement le sitemap.xml statique
    location = /sitemap.xml {
        default_type application/xml;
        add_header Content-Type "application/xml; charset=utf-8" always;
        add_header Cache-Control "public, max-age=3600" always;
        try_files $uri =404;
    }

    # Servir directement robots.txt
    location = /robots.txt {
        default_type text/plain;
        add_header Content-Type "text/plain; charset=utf-8" always;
        add_header Cache-Control "public, max-age=86400" always;
        try_files $uri =404;
    }

    # Tous les autres fichiers statiques
    location / {
        proxy_pass http://127.0.0.1:3003;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
NGINX_EOF

echo ""
echo "📝 Configuration à appliquer (copiez cette config) :"
echo ""
cat /tmp/nginx-sitemap-fix.conf
echo ""
echo ""
echo "⚠️  IMPORTANT: Vous devez éditer manuellement /etc/nginx/sites-available/azizsere.eveilon.com"
echo ""
echo "Ouvrez le fichier avec:"
echo "  nano /etc/nginx/sites-available/azizsere.eveilon.com"
echo ""
echo "Puis ajoutez ces blocs AVANT 'location / {' :"
echo ""
echo "    location = /sitemap.xml {"
echo "        default_type application/xml;"
echo "        add_header Content-Type \"application/xml; charset=utf-8\" always;"
echo "        add_header Cache-Control \"public, max-age=3600\" always;"
echo "        try_files \$uri =404;"
echo "    }"
echo ""
echo "    location = /robots.txt {"
echo "        default_type text/plain;"
echo "        add_header Content-Type \"text/plain; charset=utf-8\" always;"
echo "        add_header Cache-Control \"public, max-age=86400\" always;"
echo "        try_files \$uri =404;"
echo "    }"
echo ""
echo "Ensuite testez et rechargez Nginx:"
echo "  nginx -t"
echo "  systemctl reload nginx"
