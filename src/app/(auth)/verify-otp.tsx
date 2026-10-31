import { Button } from '@/components/ui/Button';
import { CheckIcon, ChevronLeftIcon } from '@/components/ui/Icons';
import { Text } from '@/components/ui/Text';
import { useTheme } from '@/hooks/use-theme';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  type TextInputInstance,
  type TextInputKeyPressEvent,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const OTP_LENGTH = 4;
const RESEND_COOLDOWN_SECONDS = 30;

export default function VerifyOtpScreen() {
  const router = useRouter();
  const { colors, spacing, mode } = useTheme();
  const isDark = mode === 'dark';
  const params = useLocalSearchParams<{ email?: string; name?: string }>();

  const email = typeof params.email === 'string' ? params.email : 'your email address';

  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(''));
  const [focusedIndex, setFocusedIndex] = useState<number | null>(0);
  const [countdown, setCountdown] = useState<number>(RESEND_COOLDOWN_SECONDS);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [infoMessage, setInfoMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const inputRefs = useRef<(TextInputInstance | null)[]>([]);

  // 1. Auto-focus the first box on mount
  useEffect(() => {
    const focusTimer = setTimeout(() => {
      inputRefs.current[0]?.focus();
    }, 150);
    return () => clearTimeout(focusTimer);
  }, []);

  useEffect(() => {
    if (countdown <= 0) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  const handleOtpChange = (text: string, index: number) => {

    if (errorMessage) setErrorMessage(null);
    if (infoMessage) setInfoMessage(null);


    const cleanNumbers = text.replace(/[^0-9]/g, '');


    if (cleanNumbers.length >= OTP_LENGTH) {
      const pastedDigits = cleanNumbers.slice(0, OTP_LENGTH).split('');
      const updatedOtp = [...pastedDigits];
      setOtp(updatedOtp);


      inputRefs.current[OTP_LENGTH - 1]?.focus();

      verifyCode(updatedOtp.join(''));
      return;
    }


    const singleDigit = cleanNumbers ? cleanNumbers.slice(-1) : '';
    const updatedOtp = [...otp];
    updatedOtp[index] = singleDigit;
    setOtp(updatedOtp);

    if (singleDigit) {

      if (index < OTP_LENGTH - 1) {
        inputRefs.current[index + 1]?.focus();
      } else {
        inputRefs.current[index]?.blur();
      }

      const fullCode = updatedOtp.join('');
      if (fullCode.length === OTP_LENGTH) {
        verifyCode(fullCode);
      }
    }
  };


  const handleKeyPress = (
    e: TextInputKeyPressEvent,
    index: number
  ) => {
    if (e.nativeEvent.key === 'Backspace') {
      if (otp[index] === '' && index > 0) {
        const updatedOtp = [...otp];
        updatedOtp[index - 1] = '';
        setOtp(updatedOtp);
        inputRefs.current[index - 1]?.focus();
      }
    }
  };


  const verifyCode = (code: string) => {
    if (code.length < OTP_LENGTH || isVerifying) return;

    setIsVerifying(true);
    setErrorMessage(null);


    setTimeout(() => {
      setIsVerifying(false);


      if (code === '0000') {
        setErrorMessage('Invalid verification code. Please check your code and try again.');
        setOtp(Array(OTP_LENGTH).fill(''));
        inputRefs.current[0]?.focus();
        return;
      }

      if (code === '9999') {
        setErrorMessage('Verification code has expired. Please request a new code.');
        setOtp(Array(OTP_LENGTH).fill(''));
        inputRefs.current[0]?.focus();
        return;
      }

      setIsSuccess(true);
      setTimeout(() => {
        router.replace('/(main)');
      }, 700);
    }, 650);
  };

  const handleResendOtp = () => {
    if (countdown > 0) return;

    setCountdown(RESEND_COOLDOWN_SECONDS);
    setErrorMessage(null);
    setInfoMessage(`A fresh 4-digit code has been dispatched to ${email}.`);
    setOtp(Array(OTP_LENGTH).fill(''));
    inputRefs.current[0]?.focus();

    setTimeout(() => {
      setInfoMessage(null);
    }, 4500);
  };

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.push('/(auth)/sign-up');
    }
  };

  const isOtpComplete = otp.join('').length === OTP_LENGTH;
  const formattedCountdown = `00:${countdown < 10 ? `0${countdown}` : countdown}`;

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
            source={require('@/assets/images/signup-header-landscape.png')}
            style={styles.headerBackground}
            resizeMode="cover"
          >
            <SafeAreaView edges={['top', 'left', 'right']} style={styles.headerSafeArea}>
              <View style={styles.headerContent}>
                <Pressable
                  onPress={handleBack}
                  accessibilityRole="button"
                  accessibilityLabel="Back to Registration"
                  style={styles.backButton}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  <ChevronLeftIcon size={18} color="#FFFFFF" />
                </Pressable>

                <View style={styles.titleWrapper}>
                  <Text size="xxl" weight="bold" color="#FFFFFF" style={styles.headerTitle}>
                    Verification
                  </Text>
                  <Text size="sm" color="#B5C4CC" style={styles.headerSubtitle}>
                    Enter the 4-digit code sent to
                  </Text>
                  <Text size="sm" weight="semiBold" color="#FFFFFF" numberOfLines={1}>
                    {email}
                  </Text>
                </View>
              </View>
            </SafeAreaView>
          </ImageBackground>

          <View style={[styles.formSheet, { backgroundColor: colors.surface }]}>
            {errorMessage ? (
              <View
                style={[
                  styles.banner,
                  {
                    backgroundColor: isDark ? 'rgba(232, 99, 104, 0.16)' : '#FDE8E8',
                    borderColor: colors.red,
                  },
                ]}
              >
                <Text size="sm" weight="medium" color={colors.red} align="center">
                  {errorMessage}
                </Text>
              </View>
            ) : null}

            {infoMessage ? (
              <View
                style={[
                  styles.banner,
                  {
                    backgroundColor: isDark ? 'rgba(38, 184, 133, 0.16)' : colors.outgoingMessage,
                    borderColor: colors.green,
                  },
                ]}
              >
                <Text size="sm" weight="medium" color={isDark ? colors.green : colors.primary} align="center">
                  {infoMessage}
                </Text>
              </View>
            ) : null}

            {isSuccess ? (
              <View
                style={[
                  styles.banner,
                  {
                    backgroundColor: isDark ? 'rgba(38, 184, 133, 0.16)' : colors.outgoingMessage,
                    borderColor: colors.green,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 8,
                  },
                ]}
              >
                <CheckIcon size={18} color={colors.green} />
                <Text size="sm" weight="semiBold" color={isDark ? colors.textPrimary : colors.primary}>
                  Verification successful! Redirecting...
                </Text>
              </View>
            ) : null}

            {/* Instruction Title */}
            <View style={styles.otpHeaderSection}>
              <Text size="md" weight="semiBold" color={colors.textPrimary}>
                Security Code
              </Text>
              <Text size="xs" color={colors.textSecondary} style={{ marginTop: 2 }}>
                Type or paste the 4-digit numeric verification code
              </Text>
            </View>

            <View style={styles.otpRow}>
              {otp.map((digit, index) => {
                const isFocused = focusedIndex === index;
                const hasError = Boolean(errorMessage);

                let borderColor = colors.border;
                if (hasError) {
                  borderColor = colors.red;
                } else if (isFocused) {
                  borderColor = isDark ? colors.blue : colors.primary;
                } else if (digit) {
                  borderColor = isDark ? colors.textSecondary : colors.primary;
                }

                const boxBgColor = isDark
                  ? isFocused
                    ? '#213946'
                    : colors.secondarySurface
                  : isFocused
                    ? colors.surface
                    : colors.secondarySurface;

                return (
                  <View
                    key={index}
                    style={[
                      styles.otpBox,
                      {
                        borderColor,
                        borderWidth: isFocused || hasError ? 2 : 1.2,
                        backgroundColor: boxBgColor,
                      },
                    ]}
                  >
                    <TextInput
                      ref={(ref) => {
                        inputRefs.current[index] = ref;
                      }}
                      style={[
                        styles.otpInput,
                        {
                          color: colors.textPrimary,
                        },
                      ]}
                      value={digit}
                      onChangeText={(text) => handleOtpChange(text, index)}
                      onKeyPress={(e) => handleKeyPress(e, index)}
                      onFocus={() => setFocusedIndex(index)}
                      onBlur={() => setFocusedIndex(null)}
                      keyboardType="number-pad"
                      maxLength={4}
                      selectTextOnFocus
                      selectionColor={isDark ? colors.blue : colors.primary}
                      cursorColor={isDark ? colors.blue : colors.primary}
                      accessibilityLabel={`Digit ${index + 1}`}
                      textContentType="oneTimeCode"
                      autoComplete="one-time-code"
                      editable={!isVerifying && !isSuccess}
                    />
                  </View>
                );
              })}
            </View>

            <View style={styles.resendContainer}>
              <Text size="sm" color={colors.textSecondary}>
                Didn't receive the code?{' '}
              </Text>

              {countdown > 0 ? (
                <Text size="sm" weight="medium" color={colors.textSecondary}>
                  Resend in {formattedCountdown}
                </Text>
              ) : (
                <Pressable
                  onPress={handleResendOtp}
                  accessibilityRole="button"
                  accessibilityLabel="Resend OTP code"
                  hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                >
                  <Text size="sm" weight="bold" color={colors.blue}>
                    Resend OTP
                  </Text>
                </Pressable>
              )}
            </View>


            <View style={[styles.buttonSection, { marginTop: spacing.xl }]}>
              <Button
                label="Verify & Continue"
                variant="primary"
                size="lg"
                fullWidth
                onPress={() => verifyCode(otp.join(''))}
                loading={isVerifying}
                disabled={!isOtpComplete || isVerifying || isSuccess}
              />
            </View>

            <View style={[styles.footerRow, { marginTop: spacing.lg }]}>
              <Text size="xs" color={colors.textSecondary}>
                Entered the wrong email?{' '}
              </Text>
              <Pressable
                onPress={handleBack}
                accessibilityRole="link"
                accessibilityLabel="Change email address"
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              >
                <Text size="xs" weight="semiBold" color={colors.blue}>
                  Edit email
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
    height: 230,
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
    marginBottom: 2,
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
  banner: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 20,
  },
  otpHeaderSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  otpRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 14,
  },
  otpBox: {
    width: 60,
    height: 62,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  otpInput: {
    width: '100%',
    height: '100%',
    textAlign: 'center',
    fontSize: 26,
    fontWeight: '700',
    includeFontPadding: false,
    padding: 0,
  },
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  buttonSection: {
    width: '100%',
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
