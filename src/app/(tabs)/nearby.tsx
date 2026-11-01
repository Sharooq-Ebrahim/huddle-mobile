import { NearbyTabIcon } from '@/components/ui/Icons';
import { Text } from '@/components/ui/Text';
import { useTheme } from '@/hooks/use-theme';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function NearbyScreen() {
  const { colors, mode } = useTheme();
  const isDark = mode === 'dark';

  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={[styles.root, { backgroundColor: colors.background }]}>
      <StatusBar style={isDark ? 'light' : 'dark'} />

      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
        <Text size="xxl" weight="bold" color={colors.textPrimary} style={styles.headerTitle}>
          Nearby
        </Text>
      </View>

      {/* Restrained Empty State */}
      <View style={styles.emptyContainer}>
        <View
          style={[
            styles.iconBox,
            {
              backgroundColor: isDark ? '#1C3340' : colors.secondarySurface,
            },
          ]}
        >
          <NearbyTabIcon size={28} color={isDark ? colors.blue : colors.primary} focused />
        </View>

        <Text size="lg" weight="semiBold" color={colors.textPrimary} style={{ marginTop: 14 }}>
          Nearby Discovery
        </Text>

        <Text size="sm" color={colors.textSecondary} align="center" style={styles.subtitle}>
          Discover other Huddle peers within direct Wi-Fi Aware and Bluetooth LE range without internet connectivity.
        </Text>

        <View
          style={[
            styles.badge,
            {
              backgroundColor: isDark ? '#1C3340' : colors.secondarySurface,
              borderColor: colors.border,
            },
          ]}
        >
          <Text size="xs" color={colors.textSecondary}>
            In development
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  headerTitle: {
    letterSpacing: -0.3,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    paddingBottom: 60,
  },
  iconBox: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subtitle: {
    marginTop: 6,
    maxWidth: 290,
    lineHeight: 20,
  },
  badge: {
    marginTop: 18,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
  },
});
