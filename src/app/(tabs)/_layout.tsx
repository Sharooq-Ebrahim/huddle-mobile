import {
  ChatTabIcon,
  MapTabIcon,
  NearbyTabIcon,
  SettingsTabIcon,
} from '@/components/ui/Icons';
import { useTheme } from '@/hooks/use-theme';
import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const unstable_settings = {
  initialRouteName: 'chats',
};

export default function MainTabLayout() {
  const { colors, mode } = useTheme();
  const insets = useSafeAreaInsets();
  const isDark = mode === 'dark';

  const activeColor = isDark ? colors.blue : colors.primary;
  const inactiveColor = colors.textSecondary;

  // Compute safe bottom padding
  const bottomPadding = Math.max(insets.bottom, Platform.OS === 'ios' ? 16 : 8);
  const tabHeight = 52 + bottomPadding;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: activeColor,
        tabBarInactiveTintColor: inactiveColor,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          borderTopWidth: StyleSheet.hairlineWidth,
          elevation: 0,
          shadowOpacity: 0,
          height: tabHeight,
          paddingBottom: bottomPadding,
          paddingTop: 6,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          marginTop: 2,
        },
        tabBarItemStyle: {
          paddingVertical: 2,
        },
      }}
    >
      <Tabs.Screen
        name="chats"
        options={{
          title: 'Chats',
          tabBarLabel: 'Chats',
          tabBarIcon: ({ color, focused }) => (
            <ChatTabIcon size={22} color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="nearby"
        options={{
          title: 'Nearby',
          tabBarLabel: 'Nearby',
          tabBarIcon: ({ color, focused }) => (
            <NearbyTabIcon size={22} color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: 'Map',
          tabBarLabel: 'Map',
          tabBarIcon: ({ color, focused }) => (
            <MapTabIcon size={22} color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarLabel: 'Settings',
          tabBarIcon: ({ color, focused }) => (
            <SettingsTabIcon size={22} color={color} focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}
