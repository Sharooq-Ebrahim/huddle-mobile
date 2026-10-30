import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
  type GestureResponderEvent,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from 'react-native';
import { useTheme } from '@/hooks/use-theme';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps {
  label: string;
  onPress?: (event: GestureResponderEvent) => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  accessibilityLabel?: string;
  testID?: string;
}

export function Button({
  label,
  onPress,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  style,
  textStyle,
  accessibilityLabel,
  testID,
}: ButtonProps) {
  const { colors, spacing, borderRadius, typography } = useTheme();
  const isDisabled = disabled || loading;

  const getContainerStyle = (pressed: boolean): ViewStyle => {
    let backgroundColor: string;
    let borderColor = 'transparent';
    let borderWidth = 0;

    switch (variant) {
      case 'primary':
        backgroundColor = colors.primary;
        break;
      case 'secondary':
        backgroundColor = colors.secondarySurface;
        break;
      case 'outline':
        backgroundColor = 'transparent';
        borderColor = colors.border;
        borderWidth = 1;
        break;
      case 'ghost':
        backgroundColor = 'transparent';
        break;
      case 'danger':
        backgroundColor = colors.red;
        break;
      default:
        backgroundColor = colors.primary;
        break;
    }

    let minHeight: number;
    let paddingHorizontal: number;

    switch (size) {
      case 'sm':
        minHeight = 36;
        paddingHorizontal = spacing.sm;
        break;
      case 'lg':
        minHeight = 54;
        paddingHorizontal = spacing.lg;
        break;
      case 'md':
      default:
        minHeight = 46;
        paddingHorizontal = spacing.md;
        break;
    }

    return {
      minHeight,
      paddingHorizontal,
      backgroundColor,
      borderColor,
      borderWidth,
      borderRadius: borderRadius.md,
      opacity: isDisabled ? 0.5 : pressed ? 0.8 : 1,
      alignSelf: fullWidth ? 'stretch' : 'auto',
    };
  };

  const getTextColor = (): string => {
    switch (variant) {
      case 'primary':
      case 'danger':
        return '#FFFFFF';
      case 'secondary':
        return colors.textPrimary;
      case 'outline':
      case 'ghost':
        return colors.primary;
      default:
        return '#FFFFFF';
    }
  };

  const getFontSize = (): number => {
    switch (size) {
      case 'sm':
        return typography.size.sm;
      case 'lg':
        return typography.size.lg;
      case 'md':
      default:
        return typography.size.md;
    }
  };

  const textColor = getTextColor();

  return (
    <Pressable
      testID={testID}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      disabled={isDisabled}
      onPress={onPress}
      style={({ pressed }) => [styles.base, getContainerStyle(pressed), style]}
    >
      {loading ? (
        <ActivityIndicator size="small" color={textColor} />
      ) : (
        <View style={styles.contentRow}>
          {leftIcon ? <View style={{ marginRight: spacing.xs }}>{leftIcon}</View> : null}
          <Text
            style={[
              styles.label,
              {
                color: textColor,
                fontSize: getFontSize(),
                fontWeight: typography.weight.semiBold,
              },
              textStyle,
            ]}
          >
            {label}
          </Text>
          {rightIcon ? <View style={{ marginLeft: spacing.xs }}>{rightIcon}</View> : null}
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    textAlign: 'center',
    includeFontPadding: false,
  },
});
