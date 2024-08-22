// src/i18n.js
import { createI18n } from 'vue-i18n';

const messages = {
  en: {
    dashboard: 'Dashboard',
    change_language: 'Change Language',
    // Ajoutez d'autres traductions ici
  },
  fr: {
    dashboard: 'Tableau de bord',
    change_language: 'Changer de langue',
    // Ajoutez d'autres traductions ici
  },
};

const i18n = createI18n({
  locale: 'en', // Langue par défaut
  fallbackLocale: 'en', // Langue de secours
  messages,
});

export default i18n;
