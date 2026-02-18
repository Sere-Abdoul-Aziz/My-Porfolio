module.exports = {
  apps: [
    {
      name: 'portfolio',
      script: './.output/server/index.mjs',
      instances: 1,                      // ← IMPORTANT : 1 seule instance pour éviter conflits de port
      exec_mode: 'fork',               // ← fork au lieu de cluster (1 instance = pas besoin cluster)
      
      // ✅ Variables d'environnement
      env: {
        NODE_ENV: 'production',
        PORT: 3003,                    // ← Port utilisé par ton serveur
        HOST: '0.0.0.0',
        NITRO_PORT: 3003,              // ← Nuxt utilise NITRO_PORT
        NITRO_HOST: '0.0.0.0'
      },
      
      // ✅ Gestion des erreurs et redémarrages
      autorestart: true,
      max_restarts: 10,              // ← IMPORTANT : Limiter les redémarrages
      min_uptime: '10s',             // ← Uptime minimum avant de considérer comme "démarré"
      max_memory_restart: '500M',
      
      // ✅ Logs
      error_file: './logs/pm2-error.log',
      out_file: './logs/pm2-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      
      // ✅ CRITIQUE : Éviter les crash loops
      listen_timeout: 10000,         // 10 secondes pour démarrer
      kill_timeout: 5000,
      wait_ready: true,
      
      // ✅ Watch désactivé en production
      watch: false,
      
      // ✅ Gestion de la charge
      instance_var: 'INSTANCE_ID',
      merge_logs: true,
      
      // ✅ IMPORTANT : Si le process crash 10 fois en moins de 1 minute, arrêter
      restart_delay: 4000,           // Attendre 4 secondes avant de redémarrer
      exp_backoff_restart_delay: 100 // Augmenter progressivement le délai
    }
  ]
}
