import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const DetailScreen = ({ route }) => {
    const { movie } = route.params; // Access movie data passed from navigation
  
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{movie.title}</Text>
        <Text style={styles.year}>
          Release Year: {new Date(movie.release_date).getFullYear()}
        </Text>
        <Text style={styles.description}>{movie.overview}</Text>
      </View>
    );
  };


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: '#fff',
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
    }
  });

export default DetailScreen;
