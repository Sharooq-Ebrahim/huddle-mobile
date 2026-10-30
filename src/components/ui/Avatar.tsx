import React, { useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  type ImageStyle,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { useTheme } from '@/hooks/use-theme';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;

export interface AvatarProps {
  uri?: string | null;
  name?: string;
  size?: AvatarSize;
  isOnline?: boolean;
  showOnlineIndicator?: boolean;
  fallbackText?: string;
  style?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
  testID?: string;
}

const SIZE_MAP: Record<'xs' | 'sm' | 'md' | 'lg' | 'xl', number> = {
  xs: 28,
  sm: 36,
  md: 44,
  lg: 56,
  xl: 72,
};

function getInitials(name?: string, fallback = '?'): string {
  if (!name) return fallback;
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return fallback;
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function Avatar({
  uri,
  name,
  size = 'md',
  isOnline = false,
  showOnlineIndicator = false,
  fallbackText,
  style,
  imageStyle,
  testID,
}: AvatarProps) {
  const { colors, typography } = useTheme();
  const [hasError, setHasError] = useState(false);

  const dimension = typeof size === 'number' ? size : SIZE_MAP[size] ?? SIZE_MAP.md;
  const borderRadius = dimension / 2;
  const fontSize = Math.max(10, Math.round(dimension * 0.38));
  const indicatorSize = Math.max(8, Math.min(16, Math.round(dimension * 0.28)));

  const showImage = Boolean(uri) && !hasError;
  const initials = getInitials(name, fallbackText);
  const displayIndicator = showOnlineIndicator || isOnline;

  return (
    <View
      testID={testID}
      style={[
        styles.container,
        {
          width: dimension,
          height: dimension,
          borderRadius,
          backgroundColor: colors.secondarySurface,
        },
        style,
      ]}
    >
      {showImage ? (
        <Image
          source={{ uri: uri! }}
          onError={() => setHasError(true)}
          style={[
            styles.image,
            {
              width: dimension,
              height: dimension,
              borderRadius,
            },
            imageStyle,
          ]}
          resizeMode="cover"
        />
      ) : (
        <Text
          style={[
            styles.initials,
            {
              color: colors.primary,
              fontSize,
              fontWeight: typography.weight.semiBold,
            },
          ]}
        >
          {initials}
        </Text>
      )}

      {displayIndicator ? (
        <View
          style={[
            styles.onlineIndicator,
            {
              width: indicatorSize,
              height: indicatorSize,
              borderRadius: indicatorSize / 2,
              backgroundColor: isOnline ? colors.green : colors.textSecondary,
              borderColor: colors.surface,
              borderWidth: Math.max(1.5, Math.round(dimension * 0.04)),
            },
          ]}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'visible',
  },
  image: {
    overflow: 'hidden',
  },
  initials: {
    textAlign: 'center',
    includeFontPadding: false,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
});
