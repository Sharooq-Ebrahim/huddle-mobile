
export const Palette = {
  // Brand and surfaces
  primary: '#163746',
  deepNavy: '#102A38',
  background: '#F6F7F5',
  surface: '#FFFFFF',
  secondarySurface: '#EEF1F0',

  // Typography and borders
  textPrimary: '#182329',
  textSecondary: '#717C80',
  border: '#E4E9E7',

  // Functional colors
  blue: '#3478F6',
  green: '#20A477',
  purple: '#8661D9',
  red: '#E4545A',
  orange: '#E8A23A',

  // Chat colors
  incomingMessage: '#EEF1F0',
  outgoingMessage: '#E3F4E9',
} as const;

export type PaletteKey = keyof typeof Palette;


export interface ThemeColors {
  // Brand & Surfaces
  primary: string;
  deepNavy: string;
  background: string;
  surface: string;
  secondarySurface: string;

  // Typography & Borders
  textPrimary: string;
  textSecondary: string;
  border: string;

  // Functional
  blue: string;
  green: string;
  purple: string;
  red: string;
  orange: string;

  // Chat Bubbles & Text
  incomingMessage: string;
  outgoingMessage: string;
  incomingMessageText: string;
  outgoingMessageText: string;
}


export const lightColors: ThemeColors = {
  primary: Palette.primary,
  deepNavy: Palette.deepNavy,
  background: Palette.background,
  surface: Palette.surface,
  secondarySurface: Palette.secondarySurface,

  textPrimary: Palette.textPrimary,
  textSecondary: Palette.textSecondary,
  border: Palette.border,

  blue: Palette.blue,
  green: Palette.green,
  purple: Palette.purple,
  red: Palette.red,
  orange: Palette.orange,

  incomingMessage: Palette.incomingMessage,
  outgoingMessage: Palette.outgoingMessage,
  incomingMessageText: Palette.textPrimary,
  outgoingMessageText: Palette.textPrimary,
};


export const darkColors: ThemeColors = {
  primary: '#23576E',
  deepNavy: '#0C1E28',
  background: '#0E1B22',
  surface: '#152731',
  secondarySurface: '#1C3340',

  textPrimary: '#F2F5F6',
  textSecondary: '#8F9CA2',
  border: '#213946',

  blue: '#4A89F8',
  green: '#26B885',
  purple: '#9675DF',
  red: '#E86368',
  orange: '#EBB052',

  incomingMessage: '#1C3340',
  outgoingMessage: '#1B4438',
  incomingMessageText: '#F2F5F6',
  outgoingMessageText: '#E3F4E9',
};


export const Colors = {
  light: lightColors,
  dark: darkColors,
} as const;


export const Spacing = {
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export type SpacingKey = keyof typeof Spacing;


export const BorderRadius = {
  none: 0,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
} as const;

export type BorderRadiusKey = keyof typeof BorderRadius;


export const Typography = {
  size: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 32,
  },
  weight: {
    regular: '400' as const,
    medium: '500' as const,
    semiBold: '600' as const,
    bold: '700' as const,
  },
  lineHeight: {
    xs: 16,
    sm: 20,
    md: 24,
    lg: 26,
    xl: 28,
    xxl: 32,
    xxxl: 40,
  },
} as const;

export type FontSizeKey = keyof typeof Typography.size;
export type FontWeightKey = keyof typeof Typography.weight;
export type LineHeightKey = keyof typeof Typography.lineHeight;


export type ThemeMode = 'light' | 'dark';

export interface Theme {
  mode: ThemeMode;
  colors: ThemeColors;
  spacing: typeof Spacing;
  borderRadius: typeof BorderRadius;
  typography: typeof Typography;
}

export const lightTheme: Theme = {
  mode: 'light',
  colors: lightColors,
  spacing: Spacing,
  borderRadius: BorderRadius,
  typography: Typography,
};

export const darkTheme: Theme = {
  mode: 'dark',
  colors: darkColors,
  spacing: Spacing,
  borderRadius: BorderRadius,
  typography: Typography,
};


export function getTheme(mode: ThemeMode = 'light'): Theme {
  return mode === 'dark' ? darkTheme : lightTheme;
}

