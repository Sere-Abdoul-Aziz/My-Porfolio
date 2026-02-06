<template>
  <div class="ssh-key-generator space-y-6">
    <h3 class="text-xl font-bold text-white">🔑 Générateur de Clés SSH</h3>

    <div class="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
      <div class="text-yellow-400 font-semibold mb-2">⚠️ Note Importante</div>
      <p class="text-yellow-300 text-sm">
        La génération de clés SSH nécessite des algorithmes cryptographiques avancés qui ne sont pas disponibles dans le navigateur.
        Utilisez la ligne de commande: <code class="bg-gray-800 px-2 py-1 rounded">ssh-keygen -t ed25519 -C "your_email@example.com"</code>
      </p>
    </div>

    <div class="bg-gray-900 rounded-xl p-6">
      <h4 class="text-white font-semibold mb-4">💻 Commandes SSH-Keygen</h4>
      
      <div class="space-y-4">
        <div>
          <div class="text-blue-400 font-semibold mb-2">Ed25519 (Recommandé)</div>
          <div class="bg-gray-800 rounded p-3 flex items-center justify-between">
            <code class="text-green-400 text-sm">ssh-keygen -t ed25519 -C "email@example.com"</code>
            <button @click="copyCommand('ssh-keygen -t ed25519 -C \"email@example.com\"')" class="ml-2 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition-colors">
              📋
            </button>
          </div>
        </div>

        <div>
          <div class="text-blue-400 font-semibold mb-2">RSA 4096 bits</div>
          <div class="bg-gray-800 rounded p-3 flex items-center justify-between">
            <code class="text-green-400 text-sm">ssh-keygen -t rsa -b 4096 -C "email@example.com"</code>
            <button @click="copyCommand('ssh-keygen -t rsa -b 4096 -C \"email@example.com\"')" class="ml-2 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition-colors">
              📋
            </button>
          </div>
        </div>

        <div>
          <div class="text-blue-400 font-semibold mb-2">ECDSA</div>
          <div class="bg-gray-800 rounded p-3 flex items-center justify-between">
            <code class="text-green-400 text-sm">ssh-keygen -t ecdsa -b 521 -C "email@example.com"</code>
            <button @click="copyCommand('ssh-keygen -t ecdsa -b 521 -C \"email@example.com\"')" class="ml-2 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition-colors">
              📋
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-gray-900 rounded-xl p-6">
      <h4 class="text-white font-semibold mb-4">📚 Guide d'utilisation</h4>
      <div class="space-y-3 text-sm text-gray-300">
        <div>
          <strong class="text-white">1. Générer la clé:</strong> Exécutez la commande ci-dessus dans votre terminal
        </div>
        <div>
          <strong class="text-white">2. Chemin:</strong> Par défaut <code class="bg-gray-800 px-2 py-1 rounded">~/.ssh/id_ed25519</code>
        </div>
        <div>
          <strong class="text-white">3. Passphrase:</strong> Ajoutez une phrase de passe pour plus de sécurité
        </div>
        <div>
          <strong class="text-white">4. Clé publique:</strong> Copiez le contenu de <code class="bg-gray-800 px-2 py-1 rounded">~/.ssh/id_ed25519.pub</code>
        </div>
        <div>
          <strong class="text-white">5. GitHub/GitLab:</strong> Ajoutez la clé publique dans Settings → SSH Keys
        </div>
      </div>
    </div>

    <div class="bg-gray-900 rounded-xl p-6">
      <h4 class="text-white font-semibold mb-4">🔍 Commandes Utiles</h4>
      <div class="space-y-2">
        <div class="bg-gray-800 rounded p-3">
          <div class="text-gray-400 text-xs mb-1">Afficher la clé publique</div>
          <code class="text-green-400 text-sm">cat ~/.ssh/id_ed25519.pub</code>
        </div>
        <div class="bg-gray-800 rounded p-3">
          <div class="text-gray-400 text-xs mb-1">Tester la connexion GitHub</div>
          <code class="text-green-400 text-sm">ssh -T git@github.com</code>
        </div>
        <div class="bg-gray-800 rounded p-3">
          <div class="text-gray-400 text-xs mb-1">Lister les clés SSH</div>
          <code class="text-green-400 text-sm">ls -al ~/.ssh</code>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
function copyCommand(command) {
  navigator.clipboard.writeText(command)
  alert('✅ Commande copiée!')
}
</script>
