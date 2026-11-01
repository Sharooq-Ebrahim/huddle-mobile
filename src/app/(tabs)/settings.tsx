import { Avatar } from '@/components/ui/Avatar';
import {
  ChevronRightIcon,
  InfoIcon,
  LockIcon,
  LogOutIcon,
  OfflineIcon,
  PaletteIcon,
  ShieldIcon,
  UserIcon,
} from '@/components/ui/Icons';
import { Text } from '@/components/ui/Text';
import { useTheme } from '@/hooks/use-theme';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface SettingRowProps {
  icon: React.ReactNode;
  label: string;
  value?: string;
  onPress?: () => void;
  isDestructive?: boolean;
  showChevron?: boolean;
}

export default function SettingsScreen() {
  const router = useRouter();
  const { colors, spacing, borderRadius, mode } = useTheme();
  const isDark = mode === 'dark';

  const handleSignOut = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out of Huddle?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: () => {
            router.replace('/(auth)/login');
          },
        },
      ]
    );
  };

  const renderSettingRow = ({
    icon,
    label,
    value,
    onPress,
    isDestructive = false,
    showChevron = true,
  }: SettingRowProps) => {
    return (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={label}
        onPress={onPress}
        style={({ pressed }) => [
          styles.row,
          {
            backgroundColor: pressed
              ? isDark
                ? '#1C3340'
                : '#F0F3F2'
              : colors.surface,
            borderBottomColor: colors.border,
          },
        ]}
      >
        <View style={styles.rowLeft}>
          <View
            style={[
              styles.iconWrapper,
              {
                backgroundColor: isDestructive
                  ? isDark
                    ? 'rgba(232, 99, 104, 0.16)'
                    : '#FDE8E8'
                  : isDark
                    ? '#213946'
                    : colors.secondarySurface,
              },
            ]}
          >
            {icon}
          </View>

          <Text
            size="md"
            weight="medium"
            color={isDestructive ? colors.red : colors.textPrimary}
          >
            {label}
          </Text>
        </View>

        <View style={styles.rowRight}>
          {value ? (
            <Text size="sm" color={colors.textSecondary} style={{ marginRight: 6 }}>
              {value}
            </Text>
          ) : null}
          {showChevron ? <ChevronRightIcon size={14} color={colors.textSecondary} /> : null}
        </View>
      </Pressable>
    );
  };

  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={[styles.root, { backgroundColor: colors.background }]}>
      <StatusBar style={isDark ? 'light' : 'dark'} />

      {/* Screen Header */}
      <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
        <Text size="xxl" weight="bold" color={colors.textPrimary} style={styles.headerTitle}>
          Settings
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={[styles.content, { paddingBottom: 40 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Card Header */}
        <View
          style={[
            styles.profileCard,
            {
              backgroundColor: colors.surface,
              borderBottomColor: colors.border,
              borderTopColor: colors.border,
            },
          ]}
        >
          <Avatar
            name="Alex Morgan"
            size={64}
            isOnline
            showOnlineIndicator
          />
          <View style={styles.profileTextWrapper}>
            <Text size="lg" weight="bold" color={colors.textPrimary}>
              Alex Morgan
            </Text>
            <Text size="xs" color={colors.textSecondary} style={{ marginTop: 2 }}>
              alex.morgan@huddle.mesh
            </Text>
            <View style={styles.nodeBadge}>
              <View style={[styles.dot, { backgroundColor: colors.green }]} />
              <Text size="xs" weight="medium" color={colors.green}>
                Node #7F3A • Active on Mesh
              </Text>
            </View>
          </View>
        </View>

        {/* Section 1: Account */}
        <View style={styles.section}>
          <Text size="xs" weight="bold" color={colors.textSecondary} style={styles.sectionHeader}>
            ACCOUNT
          </Text>
          <View style={[styles.cardGroup, { borderColor: colors.border, borderRadius: borderRadius.md }]}>
            {renderSettingRow({
              icon: <UserIcon size={18} color={isDark ? colors.blue : colors.primary} />,
              label: 'Display Name',
              value: 'Alex Morgan',
            })}
            {renderSettingRow({
              icon: <OfflineIcon size={18} color={isDark ? colors.blue : colors.primary} />,
              label: 'Node Identity',
              value: '#7F3A-89C2',
            })}
            {renderSettingRow({
              icon: <LockIcon size={18} color={isDark ? colors.blue : colors.primary} />,
              label: 'Backup Mesh Keys',
              value: 'Secured',
            })}
          </View>
        </View>

        {/* Section 2: Appearance */}
        <View style={styles.section}>
          <Text size="xs" weight="bold" color={colors.textSecondary} style={styles.sectionHeader}>
            APPEARANCE
          </Text>
          <View style={[styles.cardGroup, { borderColor: colors.border, borderRadius: borderRadius.md }]}>
            {renderSettingRow({
              icon: <PaletteIcon size={18} color={isDark ? colors.blue : colors.primary} />,
              label: 'Theme',
              value: isDark ? 'Dark Mode' : 'Light Mode',
            })}
          </View>
        </View>

        {/* Section 3: Privacy & Security */}
        <View style={styles.section}>
          <Text size="xs" weight="bold" color={colors.textSecondary} style={styles.sectionHeader}>
            PRIVACY & SECURITY
          </Text>
          <View style={[styles.cardGroup, { borderColor: colors.border, borderRadius: borderRadius.md }]}>
            {renderSettingRow({
              icon: <ShieldIcon size={18} color={isDark ? colors.blue : colors.primary} />,
              label: 'End-to-End Encryption',
              value: 'Strict ECDH',
            })}
            {renderSettingRow({
              icon: <OfflineIcon size={18} color={isDark ? colors.blue : colors.primary} />,
              label: 'Mesh Discovery Visibility',
              value: 'Public to Peers',
            })}
            {renderSettingRow({
              icon: <LockIcon size={18} color={isDark ? colors.blue : colors.primary} />,
              label: 'Blocked Peers',
              value: '0 blocked',
            })}
          </View>
        </View>

        {/* Section 4: About */}
        <View style={styles.section}>
          <Text size="xs" weight="bold" color={colors.textSecondary} style={styles.sectionHeader}>
            ABOUT
          </Text>
          <View style={[styles.cardGroup, { borderColor: colors.border, borderRadius: borderRadius.md }]}>
            {renderSettingRow({
              icon: <InfoIcon size={18} color={isDark ? colors.blue : colors.primary} />,
              label: 'Huddle Version',
              value: '1.0.0 (Beta)',
              showChevron: false,
            })}
            {renderSettingRow({
              icon: <InfoIcon size={18} color={isDark ? colors.blue : colors.primary} />,
              label: 'Mesh Protocol Spec',
              value: 'v0.9.4',
              showChevron: false,
            })}
          </View>
        </View>

        {/* Section 5: Sign Out */}
        <View style={styles.section}>
          <View style={[styles.cardGroup, { borderColor: colors.border, borderRadius: borderRadius.md }]}>
            {renderSettingRow({
              icon: <LogOutIcon size={18} color={colors.red} />,
              label: 'Sign Out',
              isDestructive: true,
              showChevron: false,
              onPress: handleSignOut,
            })}
          </View>
        </View>
      </ScrollView>
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
  content: {
    paddingTop: 16,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 18,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginBottom: 20,
  },
  profileTextWrapper: {
    marginLeft: 16,
    flex: 1,
  },
  nodeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionHeader: {
    letterSpacing: 0.8,
    marginBottom: 8,
    marginLeft: 4,
  },
  cardGroup: {
    borderWidth: 1,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconWrapper: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  rowRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

