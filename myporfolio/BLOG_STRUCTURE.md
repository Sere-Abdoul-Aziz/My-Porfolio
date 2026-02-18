# 📝 Structure Firestore pour le Blog

Ce document explique la structure de la base de données Firestore pour le système de blog.

## 🗂️ Collections et Documents

### Collection: `articles`

Chaque document d'article contient:

```javascript
{
  title: "Titre de l'article",                    // String (requis)
  slug: "mon-premier-article",                    // String (requis, unique par catégorie)
  category: "reflexion",                          // String: "reflexion" | "tech" | "pro"
  content: "# Mon article\n\nContenu en Markdown...", // String (Markdown)
  excerpt: "Court résumé de l'article...",        // String (optionnel, 150-200 chars)
  imageUrl: "https://example.com/image.jpg",      // String (URL de l'image featured)
  author: "Sere Aziz",                            // String
  views: 0,                                       // Number
  commentsCount: 0,                               // Number (auto-incrémenté)
  createdAt: Timestamp,                           // Firestore Timestamp
  updatedAt: Timestamp                            // Firestore Timestamp (optionnel)
}
```

### Sous-collection: `articles/{articleId}/comments`

Chaque commentaire contient:

```javascript
{
  author: "Nom du commentateur",     // String (requis)
  email: "email@example.com",        // String (requis)
  content: "Très bon article !",     // String (requis)
  createdAt: Timestamp               // Firestore Timestamp
}
```

## 📋 Exemples de données

### Exemple d'article - Réflexion Personnelle

```javascript
{
  title: "Mes 5 ans dans le développement web : réflexions et leçons",
  slug: "5-ans-developpement-web-reflexions",
  category: "reflexion",
  content: `# Mes 5 ans dans le développement web

## Introduction

Cela fait maintenant 5 ans que j'ai commencé ma carrière de développeur...

## Les défis rencontrés

- **Syndrome de l'imposteur**: Le plus difficile au début...
- **Veille technologique**: Rester à jour constamment...

## Ce que j'ai appris

1. La patience est essentielle
2. La communauté est importante
3. Ne jamais cesser d'apprendre

## Conclusion

Ces 5 années ont été riches en apprentissages...`,
  excerpt: "Retour sur 5 années passionnantes dans le monde du développement web, entre défis techniques et évolution personnelle.",
  imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97",
  author: "Sere Aziz",
  views: 0,
  commentsCount: 0,
  createdAt: serverTimestamp()
}
```

### Exemple d'article - Technique

```javascript
{
  title: "Créer une API REST avec Node.js et Express",
  slug: "creer-api-rest-nodejs-express",
  category: "tech",
  content: `# Créer une API REST avec Node.js et Express

## Prérequis

- Node.js v16+
- npm ou yarn
- Connaissances de base en JavaScript

## Installation

\`\`\`bash
npm init -y
npm install express
\`\`\`

## Création du serveur

\`\`\`javascript
const express = require('express');
const app = express();

app.get('/api/users', (req, res) => {
  res.json({ users: [] });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
\`\`\`

## Conclusion

Vous avez maintenant une API REST basique fonctionnelle !`,
  excerpt: "Guide complet pour créer votre première API REST avec Node.js et Express, de l'installation à la mise en production.",
  imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
  author: "Sere Aziz",
  views: 0,
  commentsCount: 0,
  createdAt: serverTimestamp()
}
```

### Exemple d'article - Professionnel

```javascript
{
  title: "Comment réussir sa première mission freelance en développement",
  slug: "reussir-premiere-mission-freelance",
  category: "pro",
  content: `# Comment réussir sa première mission freelance

## Préparation avant la mission

### 1. Définir le scope clairement
- Rédiger un cahier des charges précis
- Définir les livrables
- Établir un planning réaliste

### 2. Fixer son tarif

Ne bradez pas vos services ! Calculez :
- Votre taux journalier souhaité
- Les charges (30-40% en France)
- Le temps de gestion administrative

## Pendant la mission

- **Communication régulière** avec le client
- **Documentation** du code et des choix techniques
- **Tests unitaires** pour garantir la qualité

## Après la mission

1. Demander un témoignage
2. Facturer rapidement
3. Garder le contact pour d'autres missions

## Conclusion

Le freelancing demande rigueur et professionnalisme, mais c'est très gratifiant !`,
  excerpt: "Les clés pour réussir votre première mission en freelance : préparation, tarification, communication et suivi client.",
  imageUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
  author: "Sere Aziz",
  views: 0,
  commentsCount: 0,
  createdAt: serverTimestamp()
}
```

## 🚀 Comment ajouter des articles

### Option 1: Console Firebase (Recommandé pour débuter)

1. Allez sur [Firebase Console](https://console.firebase.google.com)
2. Sélectionnez votre projet
3. Allez dans **Firestore Database**
4. Cliquez sur **Démarrer une collection**
5. Nom de la collection: `articles`
6. Ajoutez un document avec les champs ci-dessus

### Option 2: Script d'import (Avancé)

Créez un fichier `scripts/add-article.js`:

```javascript
import { db } from './firebase.js'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'

const article = {
  title: "Votre titre",
  slug: "votre-slug",
  category: "tech",
  content: "# Votre contenu en Markdown",
  excerpt: "Résumé court",
  imageUrl: "https://...",
  author: "Sere Aziz",
  views: 0,
  commentsCount: 0,
  createdAt: serverTimestamp()
}

await addDoc(collection(db, 'articles'), article)
console.log('Article ajouté !')
```

## 📌 Catégories disponibles

- `reflexion`: Réflexions personnelles (💭)
- `tech`: Articles techniques (💻)
- `pro`: Contenu professionnel (💼)

Vous pouvez ajouter d'autres catégories en modifiant le fichier `pages/blog/index.vue`.

## 🔍 Indexation Firestore

Pour des performances optimales, créez ces index dans Firestore:

### Index composites nécessaires:

1. **Collection**: `articles`
   - Champs: `category` (Ascending), `createdAt` (Descending)

2. **Collection**: `articles`
   - Champs: `slug` (Ascending), `category` (Ascending)

Firestore vous suggérera automatiquement de créer ces index lors de la première utilisation.

## 🎨 Sources d'images gratuites

- [Unsplash](https://unsplash.com/) - Photos haute qualité
- [Pexels](https://www.pexels.com/) - Images et vidéos gratuites
- [Pixabay](https://pixabay.com/) - Millions d'images libres

## ✅ Checklist avant publication d'un article

- [ ] Titre accrocheur et clair
- [ ] Slug unique (format: mots-separes-par-tirets)
- [ ] Catégorie correcte
- [ ] Contenu en Markdown bien formaté
- [ ] Excerpt de 150-200 caractères
- [ ] Image featured de qualité (min. 1200x630px)
- [ ] Relecture orthographique
- [ ] Test de l'affichage sur mobile

## 🛠️ Maintenance

### Supprimer un article

Pour supprimer un article ET ses commentaires:

```javascript
import { doc, deleteDoc, collection, getDocs } from 'firebase/firestore'

async function deleteArticle(articleId) {
  // Supprimer les commentaires
  const commentsRef = collection(db, 'articles', articleId, 'comments')
  const commentsSnap = await getDocs(commentsRef)
  
  for (const comment of commentsSnap.docs) {
    await deleteDoc(comment.ref)
  }
  
  // Supprimer l'article
  await deleteDoc(doc(db, 'articles', articleId))
}
```

## 📊 Statistiques

Le système track automatiquement:
- **Nombre de vues** (incrémenté à chaque visite)
- **Nombre de commentaires** (incrémenté automatiquement)

---

**Note**: Ce blog est conçu pour un usage personnel. Les commentaires ne sont pas modérés automatiquement, pensez à vérifier régulièrement les nouveaux commentaires.