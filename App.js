import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, FlatList, ScrollView, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import postsData from './posts.json'; // Importing postsData directly from the JSON file

const App = () => {
  const [posts, setPosts] = useState([]);
  const scrollY = new Animated.Value(0);

  useEffect(() => {
    setPosts(postsData); // Setting postsData directly to state
  }, []);

  const renderPostTile = ({ item }) => (
    <View style={styles.postContainer}>
      <View style={styles.locationContainer}>
        <Ionicons name="location-outline" size={20} color="#fff" style={styles.locationIcon} />
        {/* Changed the order of text */}
        <Text style={styles.lastSeenLocation}>Last seen at {item.last_seen_location}</Text>
      </View>
      <View style={styles.postImageContainer}>
        <Image source={{ uri: item.picture }} style={styles.postImage} />
      </View>
      <View style={styles.textOverlay}>
        <Text style={styles.carDescription}>{item.car_description}</Text>
        <Text style={styles.otherInformation}>{item.other_information}</Text>
      </View>
    </View>
  );

  // Calculate header translateY based on scroll position
  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, -100],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.header, {transform: [{translateY: headerTranslateY}]}]}>
        {/* Home Icon */}
        <Ionicons name="home-outline" size={24} color="black" style={styles.icon} />
        {/* Logo */}
        <Image source={require('./assets/logo.png')} style={styles.logo} />
        {/* Search */}
        <Ionicons name="search-outline" size={24} color="black" style={styles.icon} />
      </Animated.View>
      <ScrollView
        style={{flex: 1}}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
        contentContainerStyle={{paddingTop: 100}} // Add paddingTop to ScrollView to account for header height
      >
        {/* Main Content */}
        <FlatList
          data={posts}
          renderItem={renderPostTile}
          keyExtractor={(item) => item.id.toString()}
        />
      </ScrollView>
      {/* Navigation Bar */}
      <View style={styles.navigationBar}>
        <Ionicons name="notifications-outline" size={24} color="black" style={styles.navIcon} />
        <Ionicons name="chatbubble-ellipses-outline" size={24} color="black" style={styles.navIcon} />
        <Ionicons name="person-circle-outline" size={24} color="black" style={styles.navIcon} />
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
    paddingTop: 32,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    backgroundColor: '#fff', // Add a background color to header for overlay effect
  },
  icon: {
    marginRight: 16,
  },
  logo: {
    width: 30,
    height: 30,
  },
  postContainer: {
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  locationIcon: {
    marginRight: 8,
  },
  postImageContainer: {
    height: 250,
    overflow: 'hidden',
  },
  postImage: {
    width: '100%',
    height: '100%',
  },
  textOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  carDescription: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  lastSeenLocation: {
    color: '#fff',
    fontSize: 16,
    fontStyle: 'italic',
    marginBottom: 4,
  },
  otherInformation: {
    color: '#fff',
    fontSize: 14,
  },
  navigationBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingVertical: 16,
  },
  navIcon: {
    marginRight: 16,
  },
});

export default App;
