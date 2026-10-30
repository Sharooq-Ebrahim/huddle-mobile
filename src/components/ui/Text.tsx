import React from 'react';
import { StyleSheet, Text as RNText, type TextProps as RNTextProps } from 'react-native';
import { useTheme } from '@/hooks/use-theme';
import type { FontSizeKey, FontWeightKey } from '@/constants/theme';

export type TextVariant =
  | 'primary'
  | 'secondary'
  | 'muted'
  | 'inverse'
  | 'error'
  | 'success'
  | 'link';

export interface TextProps extends RNTextProps {
  variant?: TextVariant;
  size?: FontSizeKey;
  weight?: FontWeightKey;
  color?: string;
  align?: 'auto' | 'left' | 'right' | 'center' | 'justify';
}

export function Text({
  variant = 'primary',
  size = 'md',
  weight = 'regular',
  color: customColor,
  align,
  style,
  children,
  ...restProps
}: TextProps) {
  const { colors, typography } = useTheme();

  const getVariantColor = (v: TextVariant): string => {
    switch (v) {
      case 'primary':
        return colors.textPrimary;
      case 'secondary':
      case 'muted':
        return colors.textSecondary;
      case 'inverse':
        return colors.surface;
      case 'error':
        return colors.red;
      case 'success':
        return colors.green;
      case 'link':
        return colors.blue;
      default:
        return colors.textPrimary;
    }
  };

  const resolvedColor = customColor ?? getVariantColor(variant);
  const fontSize = typography.size[size];
  const lineHeight = typography.lineHeight[size];
  const fontWeight = typography.weight[weight];

  return (
    <RNText
      style={[
        styles.base,
        {
          color: resolvedColor,
          fontSize,
          lineHeight,
          fontWeight,
          textAlign: align,
        },
        style,
      ]}
      {...restProps}
    >
      {children}
    </RNText>
  );
}

const styles = StyleSheet.create({
  base: {
    includeFontPadding: false,
  },
});
