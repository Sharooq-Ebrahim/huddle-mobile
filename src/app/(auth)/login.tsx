import React, { useState } from 'react';
import {
  Alert,
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

export default function LoginScreen() {
  const router = useRouter();
  const { colors, spacing, borderRadius } = useTheme();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const validate = (): boolean => {
    let isValid = true;
    setEmailError('');
    setPasswordError('');
    setStatusMessage(null);

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
    }

    return isValid;
  };

  const handleLogin = () => {
    if (!validate()) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStatusMessage('Validation passed. Ready for backend authentication integration.');
    }, 400);
  };

  const handleForgotPassword = () => {
    Alert.alert(
      'Reset Password',
      'Password reset functionality will be connected to the backend service in an upcoming step.'
    );
  };

  const handleNavigateToSignUp = () => {
    router.push('/(auth)/sign-up');
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
          {/* Header Branding */}
          <View style={styles.brandContainer}>
            <Image
              source={require('@/assets/images/brand-icon.png')}
              style={styles.brandIcon}
              resizeMode="contain"
            />
            <Text size="xxl" weight="bold" color={colors.primary} style={styles.appName}>
              Huddle
            </Text>
            <Text size="xl" weight="bold" style={styles.heading}>
              Welcome back
            </Text>
            <Text size="sm" color={colors.textSecondary} style={styles.subheading}>
              Sign in to continue connecting with your team and groups
            </Text>
          </View>

          {/* Form Status Message */}
          {statusMessage ? (
            <View
              style={[
                styles.statusBanner,
                {
                  backgroundColor: colors.outgoingMessage,
                  borderColor: colors.green,
                  borderRadius: borderRadius.md,
                  marginBottom: spacing.md,
                },
              ]}
            >
              <Text size="sm" color={colors.primary} weight="medium" align="center">
                {statusMessage}
              </Text>
            </View>
          ) : null}

          {/* Form Fields */}
          <View style={[styles.formContainer, { gap: spacing.md }]}>
            <Input
              label="Email"
              placeholder="name@example.com"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                if (emailError) setEmailError('');
                if (statusMessage) setStatusMessage(null);
              }}
              error={emailError}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect={false}
            />

            <View>
              <Input
                label="Password"
                placeholder="Enter your password"
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  if (passwordError) setPasswordError('');
                  if (statusMessage) setStatusMessage(null);
                }}
                error={passwordError}
                secureTextEntry
                showPasswordToggle
              />

              <Pressable
                onPress={handleForgotPassword}
                accessibilityRole="button"
                accessibilityLabel="Forgot password"
                style={[styles.forgotPasswordButton, { marginTop: spacing.xs }]}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              >
                <Text size="xs" weight="medium" color={colors.blue}>
                  Forgot password?
                </Text>
              </Pressable>
            </View>

            <Button
              label="Log In"
              variant="primary"
              size="lg"
              fullWidth
              onPress={handleLogin}
              loading={isLoading}
              style={{ marginTop: spacing.xs }}
            />
          </View>

          {/* Separator */}
          <View style={[styles.separatorContainer, { marginVertical: spacing.lg }]}>
            <View style={[styles.separatorLine, { backgroundColor: colors.border }]} />
            <Text
              size="xs"
              color={colors.textSecondary}
              style={[styles.separatorText, { paddingHorizontal: spacing.sm }]}
            >
              or
            </Text>
            <View style={[styles.separatorLine, { backgroundColor: colors.border }]} />
          </View>

          {/* Sign Up Link */}
          <View style={styles.footerRow}>
            <Text size="sm" color={colors.textSecondary}>
              Don't have an account?{' '}
            </Text>
            <Pressable
              onPress={handleNavigateToSignUp}
              accessibilityRole="link"
              accessibilityLabel="Navigate to Sign Up"
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Text size="sm" weight="semiBold" color={colors.primary}>
                Sign Up
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
    marginBottom: 28,
  },
  brandIcon: {
    width: 68,
    height: 68,
    marginBottom: 10,
  },
  appName: {
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  heading: {
    marginTop: 6,
    textAlign: 'center',
  },
  subheading: {
    marginTop: 6,
    textAlign: 'center',
    maxWidth: 280,
  },
  statusBanner: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderWidth: 1,
  },
  formContainer: {
    width: '100%',
  },
  forgotPasswordButton: {
    alignSelf: 'flex-end',
  },
  separatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  separatorLine: {
    flex: 1,
    height: 1,
  },
  separatorText: {
    textTransform: 'uppercase',
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

