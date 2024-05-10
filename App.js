import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const App = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        {/* Home Icon */}
        <Ionicons name="home-outline" size={24} color="black" style={styles.icon} />
        {/* Logo */}
        <Image source={require('./assets/logo.png')} style={styles.logo} />
        {/* Search */}
        <Ionicons name="search-outline" size={24} color="black" style={styles.icon} />
      </View>
      {/* Main Content */}
      <View style={styles.content}>
        {/* Your main content goes here */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 32, // Increase padding top
    paddingBottom: 16, // Add padding bottom if needed
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  icon: {
    marginRight: 16,
  },
  logo: {
    width: 30, // Adjust width and height as needed
    height: 30,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
