import { Button } from '@/components/ui/Button';
import {
  LockIcon,
  MailIcon
} from '@/components/ui/Icons';
import { Input } from '@/components/ui/Input';
import { Text } from '@/components/ui/Text';
import { useTheme } from '@/hooks/use-theme';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
  Alert,
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

export default function LoginScreen() {
  const router = useRouter();
  const { colors, spacing } = useTheme();

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

  const handleSignIn = () => {
    if (!validate()) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.replace('/chats');
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

  const handleGoBack = () => {
    if (router.canGoBack()) {
      router.back();
    }
  };

  return (
    <View style={styles.rootContainer}>
      <StatusBar style="light" />

      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          bounces={false}
          showsVerticalScrollIndicator={false}
        >

          <ImageBackground
            source={require('@/assets/images/login-header-landscape.png')}
            style={styles.headerBackground}
            resizeMode="cover"
          >
            <SafeAreaView edges={['top', 'left', 'right']} style={styles.headerSafeArea}>
              <View style={styles.headerContent}>
                <View style={styles.titleWrapper}>
                  <Text size="xxl" weight="bold" color="#FFFFFF" style={styles.headerTitle}>
                    Welcome back
                  </Text>
                  <Text size="sm" color="#B5C4CC" style={styles.headerSubtitle}>
                    Sign in to continue to Huddle
                  </Text>
                </View>
              </View>
            </SafeAreaView>
          </ImageBackground>

          <View style={[styles.formSheet, { backgroundColor: colors.surface }]}>

            {statusMessage ? (
              <View
                style={[
                  styles.statusBanner,
                  {
                    backgroundColor: colors.outgoingMessage,
                    borderColor: colors.green,
                    borderRadius: 12,
                    marginBottom: spacing.md,
                  },
                ]}
              >
                <Text size="sm" color={colors.primary} weight="medium" align="center">
                  {statusMessage}
                </Text>
              </View>
            ) : null}


            <View style={[styles.inputsContainer, { gap: spacing.md }]}>
              <Input
                label="Email"
                placeholder="Enter your email"
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  if (emailError) setEmailError('');
                  if (statusMessage) setStatusMessage(null);
                }}
                error={emailError}
                leftIcon={<MailIcon size={18} color={colors.textSecondary} />}
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
                  leftIcon={<LockIcon size={18} color={colors.textSecondary} />}
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
                label="Sign In"
                variant="primary"
                size="lg"
                fullWidth
                onPress={handleSignIn}
                loading={isLoading}
                style={{ marginTop: spacing.xs }}
              />
            </View>

            <View style={[styles.footerRow, { marginTop: spacing.xl }]}>
              <Text size="sm" color={colors.textSecondary}>
                Don't have an account?{' '}
              </Text>
              <Pressable
                onPress={handleNavigateToSignUp}
                accessibilityRole="link"
                accessibilityLabel="Navigate to Sign Up"
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              >
                <Text size="sm" weight="semiBold" color={colors.blue}>
                  Sign Up
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
    height: 250,
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
    marginBottom: 16,
  },
  titleWrapper: {
    paddingLeft: 4,
    paddingTop: 14,
  },
  headerTitle: {
    letterSpacing: 0.3,
    marginBottom: 6,
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
  statusBanner: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderWidth: 1,
  },
  inputsContainer: {
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
    letterSpacing: 0.5,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
