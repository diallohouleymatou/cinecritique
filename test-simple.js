// Test simple de la configuration TMDB
import dotenv from 'dotenv';
dotenv.config();

console.log('🔧 Configuration TMDB:');
console.log('- API Key:', process.env.TMDB_API_KEY ? '✅ Définie' : '❌ Manquante');
console.log('- Access Token:', process.env.TMDB_ACCESS_TOKEN ? '✅ Défini' : '❌ Manquant');

// Test basique avec fetch
const testBasic = async () => {
  try {
    const response = await fetch('https://api.themoviedb.org/3/configuration', {
      headers: {
        'Authorization': `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      const data = await response.json();
      console.log('✅ Test de connexion réussi!');
      console.log('🖼️ URL de base des images:', data.images.base_url);
      return true;
    } else {
      console.log('❌ Erreur HTTP:', response.status, response.statusText);
      return false;
    }
  } catch (error) {
    console.log('❌ Erreur de connexion:', error.message);
    return false;
  }
};

testBasic();
