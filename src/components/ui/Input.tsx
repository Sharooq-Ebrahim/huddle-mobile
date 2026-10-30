import React, { useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  type StyleProp,
  type TextInputProps,
  type TextStyle,
  type ViewStyle,
} from 'react-native';
import { useTheme } from '@/hooks/use-theme';

export interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  showPasswordToggle?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  inputContainerStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  errorStyle?: StyleProp<TextStyle>;
}

export function Input({
  label,
  error,
  hint,
  leftIcon,
  rightIcon,
  showPasswordToggle = true,
  secureTextEntry,
  containerStyle,
  inputContainerStyle,
  labelStyle,
  errorStyle,
  style,
  onFocus,
  onBlur,
  editable = true,
  ...restProps
}: InputProps) {
  const { colors, spacing, borderRadius, typography } = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordHidden, setIsPasswordHidden] = useState(Boolean(secureTextEntry));

  const handleFocus: TextInputProps['onFocus'] = (e) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur: TextInputProps['onBlur'] = (e) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  const hasError = Boolean(error);

  const getBorderColor = (): string => {
    if (hasError) return colors.red;
    if (isFocused) return colors.primary;
    return colors.border;
  };

  const isPassword = Boolean(secureTextEntry);

  return (
    <View style={[styles.wrapper, containerStyle]}>
      {label ? (
        <Text
          style={[
            styles.label,
            {
              color: colors.textPrimary,
              fontSize: typography.size.sm,
              fontWeight: typography.weight.medium,
              marginBottom: spacing.xs,
            },
            labelStyle,
          ]}
        >
          {label}
        </Text>
      ) : null}

      <View
        style={[
          styles.inputContainer,
          {
            backgroundColor: colors.surface,
            borderColor: getBorderColor(),
            borderWidth: isFocused || hasError ? 1.5 : 1,
            borderRadius: borderRadius.md,
            paddingHorizontal: spacing.md,
            opacity: editable ? 1 : 0.6,
          },
          inputContainerStyle,
        ]}
      >
        {leftIcon ? (
          <View style={[styles.iconContainer, { marginRight: spacing.sm }]}>{leftIcon}</View>
        ) : null}

        <TextInput
          style={[
            styles.textInput,
            {
              color: colors.textPrimary,
              fontSize: typography.size.md,
              lineHeight: typography.lineHeight.md,
            },
            style,
          ]}
          placeholderTextColor={colors.textSecondary}
          secureTextEntry={isPassword ? isPasswordHidden : false}
          onFocus={handleFocus}
          onBlur={handleBlur}
          editable={editable}
          {...restProps}
        />

        {isPassword && showPasswordToggle ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={isPasswordHidden ? 'Show password' : 'Hide password'}
            onPress={() => setIsPasswordHidden((prev) => !prev)}
            style={[styles.iconContainer, { marginLeft: spacing.sm }]}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Text
              style={{
                color: colors.primary,
                fontSize: typography.size.xs,
                fontWeight: typography.weight.medium,
              }}
            >
              {isPasswordHidden ? 'Show' : 'Hide'}
            </Text>
          </Pressable>
        ) : rightIcon ? (
          <View style={[styles.iconContainer, { marginLeft: spacing.sm }]}>{rightIcon}</View>
        ) : null}
      </View>

      {hasError ? (
        <Text
          style={[
            styles.helperText,
            {
              color: colors.red,
              fontSize: typography.size.xs,
              marginTop: spacing.xs,
            },
            errorStyle,
          ]}
        >
          {error}
        </Text>
      ) : hint ? (
        <Text
          style={[
            styles.helperText,
            {
              color: colors.textSecondary,
              fontSize: typography.size.xs,
              marginTop: spacing.xs,
            },
          ]}
        >
          {hint}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
  },
  label: {
    includeFontPadding: false,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 48,
  },
  textInput: {
    flex: 1,
    paddingVertical: 10,
    includeFontPadding: false,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  helperText: {
    includeFontPadding: false,
  },
});
