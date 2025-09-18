import { testTMDBConnection, testMovieSearch, testMovieDetails } from './config/tmdb.js';

async function runTMDBTests() {
  console.log('🚀 Démarrage des tests TMDB\n');

  // Test 1: Connexion de base
  console.log('=== TEST 1: Connexion TMDB ===');
  const connectionTest = await testTMDBConnection();
  console.log('\n');

  if (!connectionTest.success) {
    console.log('❌ Les tests suivants ne peuvent pas être effectués car la connexion a échoué');
    return;
  }

  // Test 2: Recherche de film
  console.log('=== TEST 2: Recherche de films ===');
  await testMovieSearch('Inception');
  console.log('\n');

  // Test 3: Détails d'un film
  console.log('=== TEST 3: Détails d\'un film ===');
  await testMovieDetails(27205); // Inception
  console.log('\n');

  // Test 4: Films populaires
  console.log('=== TEST 4: Films populaires ===');
  try {
    const { tmdbClient } = await import('./config/tmdb.js');
    const response = await tmdbClient.get('/movie/popular');
    const popularMovies = response.data.results.slice(0, 5);

    console.log('✅ Films populaires récupérés');
    console.log('🔥 Top 5 films populaires:');
    popularMovies.forEach((movie, index) => {
      console.log(`   ${index + 1}. ${movie.title} (${movie.release_date?.split('-')[0]}) - ⭐ ${movie.vote_average}`);
    });
  } catch (error) {
    console.error('❌ Erreur lors de la récupération des films populaires:', error.message);
  }

  console.log('\n🎉 Tests TMDB terminés!');
}

runTMDBTests().catch(console.error);
