import { Contact, Conversation } from '@/types/chat';

export const MOCK_ACTIVE_PEERS: Contact[] = [
  {
    id: 'peer-1',
    name: 'Maya Patel',
    isOnline: true,
    statusText: 'Direct peer • 1 hop',
    hopDistance: 1,
  },
  {
    id: 'peer-2',
    name: 'Liam Chen',
    isOnline: true,
    statusText: 'Direct peer • 1 hop',
    hopDistance: 1,
  },
  {
    id: 'peer-3',
    name: 'Alex Rivera',
    isOnline: true,
    statusText: 'Base camp station',
    hopDistance: 2,
  },
  {
    id: 'peer-4',
    name: 'Kavya Sharma',
    isOnline: true,
    statusText: 'Mesh repeater active',
    hopDistance: 1,
  },
  {
    id: 'peer-5',
    name: 'Ethan Brooks',
    isOnline: false,
    statusText: 'Last seen 12m ago',
    hopDistance: 3,
  },
  {
    id: 'peer-6',
    name: 'Sarah Jenkins',
    isOnline: true,
    statusText: 'Direct peer • 1 hop',
    hopDistance: 1,
  },
];

export const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: 'conv-1',
    contact: {
      id: 'group-1',
      name: 'Ridge Base Camp Team',
      isOnline: true,
      statusText: 'Mesh Group • 8 peers',
    },
    isGroup: true,
    groupMembersCount: 8,
    lastMessage: 'Maya: Radio beacon is synced across all 3 ridge nodes.',
    lastMessageTime: '10:42 AM',
    unreadCount: 2,
    isPinned: true,
    isMeshRelayed: true,
  },
  {
    id: 'conv-2',
    contact: {
      id: 'peer-1',
      name: 'Maya Patel',
      isOnline: true,
      statusText: 'Field Tech',
      hopDistance: 1,
    },
    isGroup: false,
    lastMessage: 'I received the packet via the Bluetooth LE bridge 👍',
    lastMessageTime: '10:35 AM',
    unreadCount: 1,
    isPinned: true,
    isMeshRelayed: false,
  },
  {
    id: 'conv-3',
    contact: {
      id: 'group-2',
      name: 'Trail Emergency Channel',
      isOnline: true,
      statusText: 'Broadcast • 14 peers',
    },
    isGroup: true,
    groupMembersCount: 14,
    lastMessage: 'Weather update: Clear skies forecasted until sunset.',
    lastMessageTime: '9:15 AM',
    unreadCount: 0,
    isPinned: false,
    isMeshRelayed: true,
  },
  {
    id: 'conv-4',
    contact: {
      id: 'peer-2',
      name: 'Liam Chen',
      isOnline: true,
      statusText: 'Logistics',
      hopDistance: 1,
    },
    isGroup: false,
    lastMessage: 'Can you verify if node #7 is transmitting telemetry?',
    lastMessageTime: 'Yesterday',
    unreadCount: 0,
    isPinned: false,
    isMeshRelayed: true,
  },
  {
    id: 'conv-5',
    contact: {
      id: 'peer-3',
      name: 'Alex Rivera',
      isOnline: true,
      statusText: 'Station Chief',
      hopDistance: 2,
    },
    isGroup: false,
    lastMessage: 'All offline keys verified successfully. See you at shelter 4.',
    lastMessageTime: 'Yesterday',
    unreadCount: 0,
    isPinned: false,
    isMeshRelayed: true,
  },
  {
    id: 'conv-6',
    contact: {
      id: 'peer-4',
      name: 'Kavya Sharma',
      isOnline: false,
      statusText: 'Offline',
      hopDistance: 1,
    },
    isGroup: false,
    lastMessage: 'Sending the cached waypoint map over the local mesh now.',
    lastMessageTime: 'Oct 30',
    unreadCount: 0,
    isPinned: false,
    isMeshRelayed: false,
  },
  {
    id: 'conv-7',
    contact: {
      id: 'peer-6',
      name: 'Sarah Jenkins',
      isOnline: true,
      statusText: 'Medical Lead',
      hopDistance: 1,
    },
    isGroup: false,
    lastMessage: 'First aid cache restocked near the northern checkpoint.',
    lastMessageTime: 'Oct 29',
    unreadCount: 0,
    isPinned: false,
    isMeshRelayed: true,
  },
  {
    id: 'conv-8',
    contact: {
      id: 'peer-7',
      name: 'Jordan Hayes',
      isOnline: false,
      statusText: 'Recon Node',
      hopDistance: 2,
    },
    isGroup: false,
    lastMessage: 'Signal strength is holding steady at -68 dBm across the valley.',
    lastMessageTime: 'Oct 28',
    unreadCount: 0,
    isPinned: false,
    isMeshRelayed: true,
  },
];

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName?: string;
  text: string;
  time: string;
  isOutgoing: boolean;
}

export const MOCK_CHAT_MESSAGES: Record<string, ChatMessage[]> = {
  'conv-1': [
    {
      id: 'm1',
      senderId: 'peer-1',
      senderName: 'Maya Patel',
      text: 'Good morning everyone! Beacon sync test starting across node 1 and 2.',
      time: '10:15 AM',
      isOutgoing: false,
    },
    {
      id: 'm2',
      senderId: 'user',
      text: 'Receiving loud and clear here at the southern ridge waypoint.',
      time: '10:22 AM',
      isOutgoing: true,
    },
    {
      id: 'm3',
      senderId: 'peer-2',
      senderName: 'Liam Chen',
      text: 'Packet latency is under 180ms through 2 hops.',
      time: '10:30 AM',
      isOutgoing: false,
    },
    {
      id: 'm4',
      senderId: 'peer-1',
      senderName: 'Maya Patel',
      text: 'Radio beacon is synced across all 3 ridge nodes.',
      time: '10:42 AM',
      isOutgoing: false,
    },
  ],
  'conv-2': [
    {
      id: 'm2-1',
      senderId: 'user',
      text: 'Hey Maya, did that emergency route packet reach your terminal?',
      time: '10:28 AM',
      isOutgoing: true,
    },
    {
      id: 'm2-2',
      senderId: 'peer-1',
      text: 'I received the packet via the Bluetooth LE bridge 👍',
      time: '10:35 AM',
      isOutgoing: false,
    },
  ],
};

