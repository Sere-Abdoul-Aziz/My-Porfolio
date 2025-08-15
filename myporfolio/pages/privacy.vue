<template>
  <div class="privacy-policy">
    <div class="container">
      <h1>Politique de Confidentialité</h1>
      <p class="last-updated">Dernière mise à jour : {{ lastUpdated }}</p>

      <section class="policy-section">
        <h2>1. Collecte de données</h2>
        <p>
          Ce site utilise Google Analytics et Google Tag Manager pour analyser l'utilisation 
          et améliorer l'expérience utilisateur. Ces outils collectent des données anonymisées.
        </p>

        <h3>Données collectées :</h3>
        <ul>
          <li>Pages visitées et temps passé</li>
          <li>Interactions avec les éléments du site</li>
          <li>Informations techniques (navigateur, résolution)</li>
          <li>Adresse IP anonymisée</li>
        </ul>

        <h3>Données NON collectées :</h3>
        <ul>
          <li>Informations personnelles identifiables</li>
          <li>Données de connexion</li>
          <li>Informations bancaires</li>
          <li>Adresses email (sauf consentement explicite)</li>
        </ul>
      </section>

      <section class="policy-section">
        <h2>2. Consentement et contrôle</h2>
        <p>
          Conformément au RGPD, vous pouvez à tout moment :
        </p>
        <ul>
          <li>Refuser l'utilisation de cookies analytiques</li>
          <li>Modifier vos préférences</li>
          <li>Demander la suppression de vos données</li>
        </ul>
        
        <button @click="resetCookieConsent" class="reset-consent-btn">
          Modifier mes préférences cookies
        </button>
      </section>

      <section class="policy-section">
        <h2>3. Utilisation des données</h2>
        <p>Les données collectées sont utilisées uniquement pour :</p>
        <ul>
          <li>Améliorer l'expérience utilisateur</li>
          <li>Optimiser les performances du site</li>
          <li>Comprendre les préférences des visiteurs</li>
        </ul>
      </section>

      <section class="policy-section">
        <h2>4. Partage des données</h2>
        <p>
          Aucune donnée personnelle n'est partagée avec des tiers. 
          Les données anonymisées sont traitées par Google conformément à 
          <a href="https://policies.google.com/privacy" target="_blank">
            leur politique de confidentialité
          </a>.
        </p>
      </section>

      <section class="policy-section">
        <h2>5. Contact</h2>
        <p>
          Pour toute question concernant cette politique : 
          <a href="mailto:aziz@eveilon.com">aziz@eveilon.com</a>
        </p>
      </section>
    </div>
  </div>
</template>

<script setup>
const lastUpdated = new Date().toLocaleDateString('fr-FR');

const resetCookieConsent = () => {
  localStorage.removeItem('analytics-consent');
  window.location.reload();
};
</script>