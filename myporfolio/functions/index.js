const functions = require('firebase-functions');
const admin = require('firebase-admin');
const axios = require('axios');
const cheerio = require('cheerio');

admin.initializeApp();

// Fonction pour récupérer manuellement vos publications LinkedIn
exports.syncLinkedInPosts = functions.https.onRequest(async (req, res) => {
  // Vérifiez une clé secrète pour la sécurité
  if (req.query.key !== 'AIzaSyDf3BqQJoXywbkAdGy0BMHf_NodpC6o_jQ') {
    res.status(403).send('Accès non autorisé');
    return;
  }

  try {
    // Vous pouvez utiliser l'API RSSHub pour obtenir vos posts LinkedIn au format RSS
    // Remplacez "aziz-sere" par votre identifiant LinkedIn
    const response = await axios.get('https://rsshub.app/linkedin/posts/aziz-sere');
    
    if (response.status !== 200) {
      throw new Error(`Erreur lors de la récupération: ${response.status}`);
    }
    
    const $ = cheerio.load(response.data);
    const items = [];
    
    // Parser les éléments du flux RSS
    $('item').each((i, item) => {
      const $item = $(item);
      
      // Extraire les données de chaque publication
      const title = $item.find('title').text() || 'Publication LinkedIn';
      const content = $item.find('description').text() || '';
      const url = $item.find('link').text() || '';
      const pubDate = new Date($item.find('pubDate').text());
      
      // Chercher une image si disponible
      let image = null;
      const mediaContent = $item.find('media\\:content, content');
      if (mediaContent.length > 0) {
        image = mediaContent.attr('url');
      }
      
      // Générer un ID basé sur l'URL
      const postId = url.split('/').pop() || Date.now().toString();
      
      items.push({
        id: postId,
        title,
        content,
        url,
        publishedDate: admin.firestore.Timestamp.fromDate(pubDate),
        image,
        createdAt: admin.firestore.FieldValue.serverTimestamp()
      });
    });
    
    // Enregistrer dans Firestore
    const db = admin.firestore();
    const batch = db.batch();
    
    for (const item of items) {
      const docRef = db.collection('linkedin_posts').doc(item.id);
      batch.set(docRef, item, { merge: true });
    }
    
    await batch.commit();
    
    res.status(200).send(`Synchronisation réussie: ${items.length} publications importées`);
  } catch (error) {
    console.error('Erreur de synchronisation:', error);
    res.status(500).send(`Erreur: ${error.message}`);
  }
});

// Version automatique qui s'exécute tous les jours
exports.scheduledLinkedInSync = functions.pubsub
  .schedule('every 24 hours')
  .onRun(async (context) => {
    try {
      // Même logique que ci-dessus...
      // (Code omis pour éviter la duplication)
      console.log('Synchronisation automatique terminée');
      return null;
    } catch (error) {
      console.error('Erreur de synchronisation automatique:', error);
      return null;
    }
  });