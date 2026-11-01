import { Avatar } from '@/components/ui/Avatar';
import { ComposeIcon, SearchIcon } from '@/components/ui/Icons';
import { Text } from '@/components/ui/Text';
import { MOCK_CONVERSATIONS } from '@/data/mock-chats';
import { useTheme } from '@/hooks/use-theme';
import { Conversation } from '@/types/chat';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useMemo, useState } from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ChatsScreen() {
  const router = useRouter();
  const { colors, mode } = useTheme();
  const isDark = mode === 'dark';
  const [searchQuery, setSearchQuery] = useState('');

  // Filter conversations in real time by contact name or message preview
  const filteredConversations = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return MOCK_CONVERSATIONS;

    return MOCK_CONVERSATIONS.filter(
      (conv) =>
        conv.contact.name.toLowerCase().includes(query) ||
        conv.lastMessage.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const handleOpenConversation = (item: Conversation) => {
    router.push({
      pathname: '/(chat)/[id]',
      params: {
        id: item.id,
        name: item.contact.name,
      },
    });
  };

  const renderConversationItem = ({
    item,
    index,
  }: {
    item: Conversation;
    index: number;
  }) => {
    const hasUnread = item.unreadCount > 0;
    const isLastItem = index === filteredConversations.length - 1;

    return (
      <View style={{ backgroundColor: colors.surface }}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Chat with ${item.contact.name}`}
          onPress={() => handleOpenConversation(item)}
          style={({ pressed }) => [
            styles.row,
            {
              backgroundColor: pressed
                ? isDark
                  ? '#1C3340'
                  : '#F2F4F3'
                : 'transparent',
            },
          ]}
        >
          {/* Avatar with optional online indicator */}
          <Avatar
            name={item.contact.name}
            size={48}
            isOnline={item.contact.isOnline}
            showOnlineIndicator={!item.isGroup && item.contact.isOnline}
          />

          {/* Conversation info */}
          <View style={styles.textColumn}>
            {/* Top row: Name & Time */}
            <View style={styles.topRow}>
              <Text
                size="md"
                weight={hasUnread ? 'bold' : 'semiBold'}
                color={colors.textPrimary}
                numberOfLines={1}
                style={styles.nameText}
              >
                {item.contact.name}
              </Text>

              <Text
                size="xs"
                weight={hasUnread ? 'semiBold' : 'regular'}
                color={hasUnread ? (isDark ? colors.blue : colors.primary) : colors.textSecondary}
              >
                {item.lastMessageTime}
              </Text>
            </View>

            {/* Bottom row: Message snippet & Unread badge */}
            <View style={styles.bottomRow}>
              <Text
                size="sm"
                weight={hasUnread ? 'medium' : 'regular'}
                color={hasUnread ? colors.textPrimary : colors.textSecondary}
                numberOfLines={1}
                style={styles.previewText}
              >
                {item.lastMessage}
              </Text>

              {hasUnread ? (
                <View
                  style={[
                    styles.unreadBadge,
                    {
                      backgroundColor: isDark ? colors.blue : colors.primary,
                    },
                  ]}
                >
                  <Text size="xs" weight="bold" color="#FFFFFF" style={styles.badgeText}>
                    {item.unreadCount}
                  </Text>
                </View>
              ) : null}
            </View>
          </View>
        </Pressable>

        {/* Indented subtle divider */}
        {!isLastItem ? (
          <View style={[styles.divider, { backgroundColor: colors.border }]} />
        ) : null}
      </View>
    );
  };

  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={[styles.root, { backgroundColor: colors.background }]}>
      <StatusBar style={isDark ? 'light' : 'dark'} />

      {/* Compact Header */}
      <View style={[styles.header, { backgroundColor: colors.surface }]}>
        <Text size="xxl" weight="bold" color={colors.textPrimary} style={styles.headerTitle}>
          Chats
        </Text>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="New chat"
          style={styles.actionButton}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <ComposeIcon size={20} color={colors.textPrimary} />
        </Pressable>
      </View>

      {/* Compact Search Bar */}
      <View style={[styles.searchWrapper, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
        <View
          style={[
            styles.searchBar,
            {
              backgroundColor: isDark ? '#1C3340' : colors.secondarySurface,
              borderColor: colors.border,
            },
          ]}
        >
          <SearchIcon size={16} color={colors.textSecondary} />
          <TextInput
            style={[styles.searchInput, { color: colors.textPrimary }]}
            placeholder="Search conversations..."
            placeholderTextColor={colors.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoCorrect={false}
            clearButtonMode="while-editing"
          />
          {searchQuery ? (
            <Pressable
              onPress={() => setSearchQuery('')}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              accessibilityRole="button"
              accessibilityLabel="Clear search"
            >
              <Text size="xs" weight="semiBold" color={colors.textSecondary}>
                ✕
              </Text>
            </Pressable>
          ) : null}
        </View>
      </View>

      {/* Conversations List */}
      <FlatList
        data={filteredConversations}
        keyExtractor={(item) => item.id}
        renderItem={renderConversationItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text size="md" weight="semiBold" color={colors.textPrimary} align="center">
              No conversations found
            </Text>
            <Text size="sm" color={colors.textSecondary} align="center" style={{ marginTop: 4 }}>
              {`No results matching "${searchQuery}"`}
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 8,
  },
  headerTitle: {
    letterSpacing: -0.3,
  },
  actionButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 18,
  },
  searchWrapper: {
    paddingHorizontal: 16,
    paddingBottom: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 38,
    borderRadius: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    paddingVertical: 0,
    includeFontPadding: false,
  },
  listContent: {
    paddingBottom: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 11,
  },
  textColumn: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 3,
  },
  nameText: {
    flex: 1,
    marginRight: 8,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  previewText: {
    flex: 1,
    marginRight: 8,
  },
  unreadBadge: {
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    paddingHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    fontSize: 10,
    lineHeight: 12,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    marginLeft: 74,
  },
  emptyContainer: {
    paddingVertical: 60,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
});
