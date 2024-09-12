import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TextInput,
  RefreshControl,
  TouchableOpacity, // Import TouchableOpacity
} from 'react-native';
import axios from 'axios';

// TMDB API setup
const API_KEY = '8d55c7dbdd188abe8a20e40800f1bcd7';
const BASE_URL = 'https://api.themoviedb.org/3';

const HomeScreen = ({ navigation }) => {
  const [moviesList, setMoviesList] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1); // Track current page
  const [loading, setLoading] = useState(false); // Track loading state for pagination

  useEffect(() => {
    fetchMovies();
  }, [page]);

  // Fetch popular movies from TMDB API with pagination
  const fetchMovies = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`
      );
      if (page === 1) {
        setMoviesList(response.data.results);
        setFilteredMovies(response.data.results);
      } else {
        setMoviesList((prevMovies) => [...prevMovies, ...response.data.results]); // Append new movies to list
        setFilteredMovies((prevMovies) => [...prevMovies, ...response.data.results]);
      }
    } catch (err) {
      console.log('Axios Error:', err);
      setError(err);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  // Pull-to-refresh functionality
  const onRefresh = () => {
    setIsRefreshing(true);
    setPage(1); // Reset to the first page
  };

  // Load more movies when the user reaches the end of the list
  const loadMoreMovies = () => {
    if (!loading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  // Search functionality
  const handleSearch = (text) => {
    setSearchTerm(text);
    if (text) {
      const filtered = moviesList.filter((movie) =>
        movie.title.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredMovies(filtered);
    } else {
      setFilteredMovies(moviesList);
    }
  };

  // Render movie item for FlatList
  const renderMovieItem = ({ item }) => (
    <TouchableOpacity
      style={styles.movieItem}
      onPress={() => navigation.navigate('Detail', { movie: item })} // Navigate to detail screen on tap
    >
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.year}>
        Release Year: {new Date(item.release_date).getFullYear()}
      </Text>
      <Text style={styles.description} numberOfLines={3}>
        {item.overview}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search Movies..."
        value={searchTerm}
        onChangeText={handleSearch}
      />
      {error ? (
        <Text style={styles.error}>Failed to load data. Please try again later.</Text>
      ) : (
        <FlatList
          data={filteredMovies}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderMovieItem}
          refreshControl={
            <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
          }
          onEndReached={loadMoreMovies} // Load more on scroll
          onEndReachedThreshold={0.5} // Trigger when scrolled 50% from the end
          ListFooterComponent={loading ? <Text>Loading more...</Text> : null}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  searchInput: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  movieItem: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  year: {
    fontSize: 14,
    color: '#888',
  },
  description: {
    fontSize: 14,
    marginTop: 5,
  },
  error: {
    color: 'red',
    fontSize: 16,
  },
});

export default HomeScreen;
