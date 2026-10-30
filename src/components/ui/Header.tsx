import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from 'react-native';
import { useTheme } from '@/hooks/use-theme';

export interface HeaderProps {
  title: string;
  subtitle?: string;
  leftAction?: React.ReactNode;
  rightAction?: React.ReactNode;
  centerTitle?: boolean;
  bordered?: boolean;
  style?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  subtitleStyle?: StyleProp<TextStyle>;
}

export function Header({
  title,
  subtitle,
  leftAction,
  rightAction,
  centerTitle = false,
  bordered = true,
  style,
  titleStyle,
  subtitleStyle,
}: HeaderProps) {
  const { colors, spacing, typography } = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.surface,
          borderBottomColor: bordered ? colors.border : 'transparent',
          borderBottomWidth: bordered ? StyleSheet.hairlineWidth : 0,
          paddingHorizontal: spacing.md,
        },
        style,
      ]}
    >
      <View style={styles.actionSlot}>{leftAction}</View>

      <View
        style={[
          styles.titleContainer,
          centerTitle ? styles.centeredTitle : styles.leftAlignedTitle,
        ]}
      >
        <Text
          numberOfLines={1}
          style={[
            styles.title,
            {
              color: colors.textPrimary,
              fontSize: typography.size.lg,
              lineHeight: typography.lineHeight.lg,
              fontWeight: typography.weight.semiBold,
              textAlign: centerTitle ? 'center' : 'left',
            },
            titleStyle,
          ]}
        >
          {title}
        </Text>
        {subtitle ? (
          <Text
            numberOfLines={1}
            style={[
              styles.subtitle,
              {
                color: colors.textSecondary,
                fontSize: typography.size.xs,
                lineHeight: typography.lineHeight.xs,
                fontWeight: typography.weight.regular,
                textAlign: centerTitle ? 'center' : 'left',
              },
              subtitleStyle,
            ]}
          >
            {subtitle}
          </Text>
        ) : null}
      </View>

      <View style={[styles.actionSlot, styles.rightActionSlot]}>{rightAction}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  actionSlot: {
    minWidth: 40,
    minHeight: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  rightActionSlot: {
    alignItems: 'flex-end',
  },
  titleContainer: {
    flex: 1,
    paddingHorizontal: 8,
    justifyContent: 'center',
  },
  centeredTitle: {
    alignItems: 'center',
  },
  leftAlignedTitle: {
    alignItems: 'flex-start',
  },
  title: {
    includeFontPadding: false,
  },
  subtitle: {
    includeFontPadding: false,
    marginTop: 2,
  },
});
