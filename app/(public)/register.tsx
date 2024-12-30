import { Button, TextInput, View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useSignUp, useOAuth } from '@clerk/clerk-expo';
import Spinner from 'react-native-loading-spinner-overlay';
import { useState } from 'react';
import { Stack } from 'expo-router';
import React from 'react';

const Register = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' });
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);

  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }
    setLoading(true);

    try {
      await signUp.create({
        emailAddress,
        password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
      setPendingVerification(true);
    } catch (err: any) {
      alert(err.errors[0]?.message || 'Sign-up failed');
      console.log(err.errors[0]);
    } finally {
      setLoading(false);
    }
  };

  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }
    setLoading(true);

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({ code });
      await setActive({ session: completeSignUp.createdSessionId });
    } catch (err: any) {
      alert(err.errors[0]?.message || 'Verification failed');
    } finally {
      setLoading(false);
    }
  };

  const onGoogleSignInPress = async () => {
    setLoading(true);
    try {
      const { createdSessionId } = await startOAuthFlow();
      await setActive({ session: createdSessionId });
    } catch (err: any) {
      alert(err.errors[0]?.message || 'Google Sign-Up failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerBackVisible: !pendingVerification }} />
      <Spinner visible={loading} />

      {!pendingVerification && (
        <>
          <Text style={styles.title}>Create an Account</Text>
          <Text style={styles.subtitle}>Sign up to get started</Text>

          <TextInput
            autoCapitalize="none"
            placeholder="Email Address"
            value={emailAddress}
            onChangeText={setEmailAddress}
            style={styles.inputField}
          />

          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.inputField}
          />

          <TouchableOpacity onPress={onSignUpPress} style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Sign Up</Text>
          </TouchableOpacity>

          <View style={styles.buttonSeparator}>
            <Text style={styles.separatorText}>OR</Text>
          </View>

          <TouchableOpacity onPress={onGoogleSignInPress} style={styles.googleButton}>
            <Text style={styles.googleButtonText}>Sign Up with Google</Text>
          </TouchableOpacity>
        </>
      )}

      {pendingVerification && (
        <>
          <Text style={styles.title}>Verify Your Email</Text>
          <Text style={styles.subtitle}>Enter the code sent to your email</Text>

          <TextInput
            value={code}
            placeholder="Verification Code"
            style={styles.inputField}
            onChangeText={setCode}
          />

          <TouchableOpacity onPress={onPressVerify} style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Verify Email</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

// 🎨 **Styles**
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    backgroundColor: '#f9fafc',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
    textAlign: 'center',
  },
  inputField: {
    width: '100%',
    marginBottom: 12,
    height: 50,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
  },
  primaryButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#6c47ff',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  googleButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#4285F4',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
  },
  googleButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonSeparator: {
    marginVertical: 20,
    alignItems: 'center',
  },
  separatorText: {
    fontSize: 14,
    color: '#999',
  },
});

export default Register;
