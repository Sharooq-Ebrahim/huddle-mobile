import { Button } from '@/components/ui/Button';
import {
  ChevronLeftIcon,
  LockIcon,
  MailIcon,
  UserIcon,
} from '@/components/ui/Icons';
import { Input } from '@/components/ui/Input';
import { Text } from '@/components/ui/Text';
import { useTheme } from '@/hooks/use-theme';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
  Dimensions,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function SignUpScreen() {
  const router = useRouter();
  const { colors, spacing } = useTheme();

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
    <View style={styles.rootContainer}>
      <StatusBar style="light" />

      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          bounces={false}
          showsVerticalScrollIndicator={false}
        >
          <ImageBackground
            source={require('@/assets/images/signup-header-landscape.png')}
            style={styles.headerBackground}
            resizeMode="cover"
          >
            <SafeAreaView edges={['top', 'left', 'right']} style={styles.headerSafeArea}>
              <View style={styles.headerContent}>
                <Pressable
                  onPress={handleNavigateToLogin}
                  accessibilityRole="button"
                  accessibilityLabel="Back to Sign In"
                  style={styles.backButton}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  <ChevronLeftIcon size={18} color="#FFFFFF" />
                </Pressable>

                <View style={styles.titleWrapper}>
                  <Text size="xxl" weight="bold" color="#FFFFFF" style={styles.headerTitle}>
                    Create your account
                  </Text>
                  <Text size="sm" color="#B5C4CC" style={styles.headerSubtitle}>
                    Join Huddle and start messaging offline.
                  </Text>
                </View>
              </View>
            </SafeAreaView>
          </ImageBackground>

          <View style={[styles.formSheet, { backgroundColor: colors.surface }]}>
            {successMessage ? (
              <View
                style={[
                  styles.successBanner,
                  {
                    backgroundColor: colors.outgoingMessage,
                    borderColor: colors.green,
                    borderRadius: 12,
                    marginBottom: spacing.md,
                  },
                ]}
              >
                <Text size="sm" color={colors.primary} weight="medium" align="center">
                  {successMessage}
                </Text>
              </View>
            ) : null}

            <View style={[styles.inputsContainer, { gap: spacing.md }]}>
              <Input
                label="Full name"
                placeholder="Enter your full name"
                value={name}
                onChangeText={(text) => {
                  setName(text);
                  if (nameError) setNameError('');
                  if (successMessage) setSuccessMessage(null);
                }}
                error={nameError}
                leftIcon={<UserIcon size={18} color={colors.textSecondary} />}
                autoCapitalize="words"
                autoComplete="name"
                autoCorrect={false}
              />

              <Input
                label="Email"
                placeholder="Enter your email"
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  if (emailError) setEmailError('');
                  if (successMessage) setSuccessMessage(null);
                }}
                error={emailError}
                leftIcon={<MailIcon size={18} color={colors.textSecondary} />}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect={false}
              />

              <Input
                label="Password"
                placeholder="Create a password"
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
                leftIcon={<LockIcon size={18} color={colors.textSecondary} />}
                secureTextEntry
                showPasswordToggle
              />

              <Input
                label="Confirm password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChangeText={(text) => {
                  setConfirmPassword(text);
                  if (confirmPasswordError) setConfirmPasswordError('');
                  if (successMessage) setSuccessMessage(null);
                }}
                error={confirmPasswordError}
                leftIcon={<LockIcon size={18} color={colors.textSecondary} />}
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

            <View style={[styles.footerRow, { marginTop: spacing.xl }]}>
              <Text size="sm" color={colors.textSecondary}>
                Already have an account?{' '}
              </Text>
              <Pressable
                onPress={handleNavigateToLogin}
                accessibilityRole="link"
                accessibilityLabel="Navigate to Sign In"
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              >
                <Text size="sm" weight="semiBold" color={colors.blue}>
                  Sign In
                </Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: '#102A38',
  },
  keyboardView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  headerBackground: {
    width: SCREEN_WIDTH,
    height: 220,
    backgroundColor: '#102A38',
    justifyContent: 'space-between',
  },
  headerSafeArea: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  headerContent: {
    flex: 1,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  titleWrapper: {
    paddingLeft: 4,
  },
  headerTitle: {
    letterSpacing: 0.3,
    marginBottom: 4,
  },
  headerSubtitle: {
    letterSpacing: 0.2,
  },
  formSheet: {
    flex: 1,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 24,
    paddingTop: 28,
    paddingBottom: 36,
    marginTop: -24,
  },
  successBanner: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderWidth: 1,
  },
  inputsContainer: {
    width: '100%',
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
