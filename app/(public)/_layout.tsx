import React from 'react';
import { Stack } from 'expo-router';

const PublicLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown:false,
        headerBackTitle: 'Back',
      }}>
      <Stack.Screen
        name="login"
      />
      <Stack.Screen
        name="register"
      />

    </Stack>
  );
};

export default PublicLayout;
