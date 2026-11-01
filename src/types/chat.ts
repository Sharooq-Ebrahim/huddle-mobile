export interface Contact {
  id: string;
  name: string;
  avatarUri?: string | null;
  isOnline: boolean;
  statusText?: string;
  hopDistance?: number; // Offline mesh relay hop distance (e.g. 1 hop = direct range)
}

export interface Conversation {
  id: string;
  contact: Contact;
  isGroup?: boolean;
  groupMembersCount?: number;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isPinned?: boolean;
  isMeshRelayed?: boolean;
  isDraft?: boolean;
}

