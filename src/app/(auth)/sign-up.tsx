import React, { useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useTheme } from '@/hooks/use-theme';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Text } from '@/components/ui/Text';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function SignUpScreen() {
  const router = useRouter();
  const { colors, spacing, borderRadius } = useTheme();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const validate = (): boolean => {
    let isValid = true;
    setNameError('');
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');
    setSuccessMessage(null);

    const trimmedName = name.trim();
    if (!trimmedName) {
      setNameError('Full name is required');
      isValid = false;
    }

    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!EMAIL_REGEX.test(trimmedEmail)) {
      setEmailError('Please enter a valid email address');
      isValid = false;
    }

    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    } else if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters');
      isValid = false;
    }

    if (!confirmPassword) {
      setConfirmPasswordError('Please confirm your password');
      isValid = false;
    } else if (password && confirmPassword !== password) {
      setConfirmPasswordError('Passwords do not match');
      isValid = false;
    }

    return isValid;
  };

  const handleSignUp = () => {
    if (!validate()) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSuccessMessage('Account details validated! Ready for future authentication integration.');
    }, 450);
  };

  const handleNavigateToLogin = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.push('/(auth)/login');
    }
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={[
            styles.scrollContent,
            {
              paddingHorizontal: spacing.lg,
              paddingVertical: spacing.xl,
            },
          ]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Branding Section */}
          <View style={styles.brandContainer}>
            <Image
              source={require('@/assets/images/brand-icon.png')}
              style={styles.brandIcon}
              resizeMode="contain"
            />
            <Text size="xl" weight="bold" color={colors.primary} style={styles.appName}>
              Huddle
            </Text>
            <Text size="xl" weight="bold" style={styles.heading}>
              Create your account
            </Text>
            <Text size="sm" color={colors.textSecondary} style={styles.subheading}>
              Join Huddle to message and collaborate with teams and nearby peers
            </Text>
          </View>

          {/* Success Banner */}
          {successMessage ? (
            <View
              style={[
                styles.successBanner,
                {
                  backgroundColor: colors.outgoingMessage,
                  borderColor: colors.green,
                  borderRadius: borderRadius.md,
                  marginBottom: spacing.md,
                },
              ]}
            >
              <Text size="sm" color={colors.primary} weight="medium" align="center">
                {successMessage}
              </Text>
            </View>
          ) : null}

          {/* Form Fields */}
          <View style={[styles.formContainer, { gap: spacing.md }]}>
            <Input
              label="Full Name"
              placeholder="Alex Morgan"
              value={name}
              onChangeText={(text) => {
                setName(text);
                if (nameError) setNameError('');
                if (successMessage) setSuccessMessage(null);
              }}
              error={nameError}
              autoCapitalize="words"
              autoComplete="name"
              autoCorrect={false}
            />

            <Input
              label="Email"
              placeholder="name@example.com"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                if (emailError) setEmailError('');
                if (successMessage) setSuccessMessage(null);
              }}
              error={emailError}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect={false}
            />

            <Input
              label="Password"
              placeholder="At least 8 characters"
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                if (passwordError) setPasswordError('');
                if (confirmPasswordError && confirmPassword === text) {
                  setConfirmPasswordError('');
                }
                if (successMessage) setSuccessMessage(null);
              }}
              error={passwordError}
              hint={!passwordError ? 'Must be at least 8 characters' : undefined}
              secureTextEntry
              showPasswordToggle
            />

            <Input
              label="Confirm Password"
              placeholder="Re-enter your password"
              value={confirmPassword}
              onChangeText={(text) => {
                setConfirmPassword(text);
                if (confirmPasswordError) setConfirmPasswordError('');
                if (successMessage) setSuccessMessage(null);
              }}
              error={confirmPasswordError}
              secureTextEntry
              showPasswordToggle
            />

            <Button
              label="Create Account"
              variant="primary"
              size="lg"
              fullWidth
              onPress={handleSignUp}
              loading={isLoading}
              style={{ marginTop: spacing.xs }}
            />
          </View>

          {/* Footer Navigation Link */}
          <View style={[styles.footerRow, { marginTop: spacing.lg }]}>
            <Text size="sm" color={colors.textSecondary}>
              Already have an account?{' '}
            </Text>
            <Pressable
              onPress={handleNavigateToLogin}
              accessibilityRole="link"
              accessibilityLabel="Navigate to Log In"
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Text size="sm" weight="semiBold" color={colors.primary}>
                Log In
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  brandContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  brandIcon: {
    width: 64,
    height: 64,
    marginBottom: 8,
  },
  appName: {
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  heading: {
    marginTop: 4,
    textAlign: 'center',
  },
  subheading: {
    marginTop: 6,
    textAlign: 'center',
    maxWidth: 290,
  },
  successBanner: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderWidth: 1,
  },
  formContainer: {
    width: '100%',
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

