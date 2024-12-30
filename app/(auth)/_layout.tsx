import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet } from 'react-native';
import { useAuth } from '@clerk/clerk-expo';

export const LogoutButton = () => {
  const { signOut } = useAuth();

  const handleLogout = () => {
    try {
      signOut();
    } catch (err: any) {
      console.error('Logout failed:', err.message);
    }
  };

  return (
    <Pressable onPress={handleLogout} style={styles.logoutButton}>
      <Ionicons name="log-out-outline" size={24} color={'#fff'} />
    </Pressable>
  );
};

const TabsPage = () => {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return null;
  }

  return (
    <Tabs
      screenOptions={{
        headerStyle: styles.headerStyle,
        headerTintColor: '#fff',
        tabBarActiveTintColor: '#6c47ff',
        tabBarInactiveTintColor: '#888',
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          headerTitle: 'Main',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={"#6c47ff"} />
          ),
          tabBarLabel: 'Main',
          headerRight: () => <LogoutButton />,
        }}
        redirect={!isSignedIn}
      />
    </Tabs>
  );
};

// 🎨 **Styles**
const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: '#6c47ff',
  },
  logoutButton: {
    marginRight: 10,
  },
});

export default TabsPage;
