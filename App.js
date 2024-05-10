import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, FlatList, ScrollView, Animated, TouchableOpacity, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import postsData from './posts.json'; // Importing postsData directly from the JSON file

const App = () => {
  const [posts, setPosts] = useState([]);
  const [showModal, setShowModal] = useState(false);
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

  const handleProfileIconClick = () => {
    // Show the modal
    setShowModal(true);
  };

  const closeModal = () => {
    // Close the modal
    setShowModal(false);
  };

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
        {/* Profile Icon */}
        <TouchableOpacity onPress={handleProfileIconClick}>
          <Ionicons name="person-circle-outline" size={24} color="black" style={styles.navIcon} />
        </TouchableOpacity>
      </View>
      {/* Modal for sign in / create account */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>Sign in or Create an Account</Text>
            {/* Add sign in and create account buttons */}
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Create Account</Text>
            </TouchableOpacity>
            {/* Add close button */}
            <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  closeButton: {
    marginTop: 20,
  },
  closeButtonText: {
    color: '#FF4500',
    fontSize: 16,
  },
});

export default App;
