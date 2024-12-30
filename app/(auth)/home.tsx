import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { useUser } from '@clerk/clerk-expo';

const Home = () => {
  const { user, isLoaded } = useUser();



  return (
    <View style={styles.container}>
      <Text style={styles.greetingText}>
        Hello, {user?.emailAddresses?.[0]?.emailAddress || 'Guest'}!
      </Text>
    </View>
  );
};

// 🎨 **Styles**
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9fafc',
    padding: 20,
  },
  greetingText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subText: {
    fontSize: 16,
    color: '#666',
  },
  loadingText: {
    fontSize: 18,
    color: '#999',
  },
});

export default Home;
