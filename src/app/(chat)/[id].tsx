import { Avatar } from '@/components/ui/Avatar';
import { ChevronLeftIcon, LockIcon, SendIcon } from '@/components/ui/Icons';
import { Text } from '@/components/ui/Text';
import { ChatMessage, MOCK_CHAT_MESSAGES, MOCK_CONVERSATIONS } from '@/data/mock-chats';
import { useTheme } from '@/hooks/use-theme';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useMemo, useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ConversationDetailScreen() {
  const router = useRouter();
  const { colors, spacing, borderRadius, mode } = useTheme();
  const isDark = mode === 'dark';
  const params = useLocalSearchParams<{ id: string; name?: string }>();

  const conversationId = params.id || 'conv-1';

  // Find conversation metadata
  const conversation = useMemo(() => {
    return MOCK_CONVERSATIONS.find((c) => c.id === conversationId);
  }, [conversationId]);

  const contactName = conversation?.contact.name || params.name || 'Conversation';
  const isOnline = conversation?.contact.isOnline ?? false;
  const isGroup = conversation?.isGroup ?? false;

  // Initialize messages with fallback thread
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    return (
      MOCK_CHAT_MESSAGES[conversationId] || [
        {
          id: 'fb-1',
          senderId: conversation?.contact.id || 'contact',
          senderName: contactName,
          text: conversation?.lastMessage || 'Hello! Connected via local mesh.',
          time: conversation?.lastMessageTime || 'Just now',
          isOutgoing: false,
        },
      ]
    );
  });

  const [inputText, setInputText] = useState('');

  const handleSendMessage = () => {
    const trimmed = inputText.trim();
    if (!trimmed) return;

    const newMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      senderId: 'user',
      text: trimmed,
      time: 'Just now',
      isOutgoing: true,
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputText('');
  };

  const renderMessageBubble = ({ item }: { item: ChatMessage }) => {
    const isOutgoing = item.isOutgoing;

    return (
      <View
        style={[
          styles.messageRow,
          isOutgoing ? styles.outgoingMessageRow : styles.incomingMessageRow,
        ]}
      >
        <View
          style={[
            styles.bubble,
            {
              backgroundColor: isOutgoing
                ? colors.outgoingMessage
                : colors.incomingMessage,
              borderTopRightRadius: isOutgoing ? 4 : borderRadius.md,
              borderTopLeftRadius: !isOutgoing ? 4 : borderRadius.md,
              borderBottomLeftRadius: borderRadius.md,
              borderBottomRightRadius: borderRadius.md,
            },
          ]}
        >
          {isGroup && !isOutgoing && item.senderName ? (
            <Text
              size="xs"
              weight="bold"
              color={isDark ? colors.blue : colors.primary}
              style={styles.groupSenderName}
            >
              {item.senderName}
            </Text>
          ) : null}

          <Text
            size="sm"
            color={isOutgoing ? colors.outgoingMessageText : colors.incomingMessageText}
            style={styles.messageText}
          >
            {item.text}
          </Text>

          <Text
            size="xs"
            color={colors.textSecondary}
            style={[styles.timestamp, { alignSelf: isOutgoing ? 'flex-end' : 'flex-start' }]}
          >
            {item.time}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={[styles.root, { backgroundColor: colors.background }]}>
      <StatusBar style={isDark ? 'light' : 'dark'} />

      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
        <Pressable
          onPress={() => router.back()}
          accessibilityRole="button"
          accessibilityLabel="Back to chats"
          style={styles.backButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <ChevronLeftIcon size={18} color={colors.textPrimary} />
        </Pressable>

        <Avatar
          name={contactName}
          size={38}
          isOnline={isOnline}
          showOnlineIndicator={!isGroup}
        />

        <View style={styles.headerTitleWrapper}>
          <Text size="md" weight="bold" color={colors.textPrimary} numberOfLines={1}>
            {contactName}
          </Text>
          <Text size="xs" color={isOnline ? colors.green : colors.textSecondary} numberOfLines={1}>
            {isGroup
              ? `${conversation?.groupMembersCount || 8} members • Mesh Broadcast`
              : isOnline
                ? 'Active on local mesh'
                : 'Offline'}
          </Text>
        </View>
      </View>

      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* Messages List */}
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={renderMessageBubble}
          contentContainerStyle={styles.messagesList}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <View style={styles.encryptionNotice}>
              <View style={[styles.lockIconBox, { backgroundColor: isDark ? '#213946' : colors.secondarySurface }]}>
                <LockIcon size={14} color={colors.textSecondary} />
              </View>
              <Text size="xs" color={colors.textSecondary} align="center" style={styles.encryptionText}>
                End-to-end encrypted direct peer session. No internet connection used.
              </Text>
            </View>
          }
        />

        {/* Input Bar */}
        <SafeAreaView edges={['bottom']} style={[styles.inputBarSafeArea, { backgroundColor: colors.surface, borderTopColor: colors.border }]}>
          <View style={styles.inputBarRow}>
            <TextInput
              style={[
                styles.textInput,
                {
                  backgroundColor: isDark ? '#1C3340' : colors.secondarySurface,
                  color: colors.textPrimary,
                  borderColor: colors.border,
                  borderRadius: borderRadius.lg,
                },
              ]}
              placeholder="Write a message..."
              placeholderTextColor={colors.textSecondary}
              value={inputText}
              onChangeText={setInputText}
              multiline
              maxLength={1000}
            />

            <Pressable
              onPress={handleSendMessage}
              accessibilityRole="button"
              accessibilityLabel="Send message"
              disabled={!inputText.trim()}
              style={[
                styles.sendButton,
                {
                  backgroundColor: inputText.trim()
                    ? isDark
                      ? colors.blue
                      : colors.primary
                    : isDark
                      ? '#213946'
                      : colors.secondarySurface,
                },
              ]}
            >
              <SendIcon
                size={16}
                color={inputText.trim() ? '#FFFFFF' : colors.textSecondary}
              />
            </Pressable>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  backButton: {
    padding: 6,
    marginRight: 6,
    marginLeft: -6,
  },
  headerTitleWrapper: {
    marginLeft: 12,
    flex: 1,
    justifyContent: 'center',
  },
  keyboardContainer: {
    flex: 1,
  },
  messagesList: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 10,
  },
  encryptionNotice: {
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 24,
  },
  lockIconBox: {
    width: 26,
    height: 26,
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  encryptionText: {
    lineHeight: 16,
  },
  messageRow: {
    flexDirection: 'row',
    width: '100%',
  },
  incomingMessageRow: {
    justifyContent: 'flex-start',
  },
  outgoingMessageRow: {
    justifyContent: 'flex-end',
  },
  bubble: {
    maxWidth: '78%',
    paddingHorizontal: 13,
    paddingVertical: 9,
  },
  groupSenderName: {
    marginBottom: 3,
  },
  messageText: {
    lineHeight: 20,
  },
  timestamp: {
    fontSize: 10,
    marginTop: 4,
  },
  inputBarSafeArea: {
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  inputBarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    gap: 8,
  },
  textInput: {
    flex: 1,
    minHeight: 40,
    maxHeight: 100,
    paddingHorizontal: 14,
    paddingVertical: 8,
    fontSize: 15,
    borderWidth: 1,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

