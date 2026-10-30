import { darkTheme, lightTheme, Theme, ThemeColors } from '@/constants/theme';
import { useColorScheme } from 'react-native';


export function useTheme(): Theme {
  const scheme = useColorScheme();
  return scheme === 'dark' ? darkTheme : lightTheme;
}


export function useThemeColors(): ThemeColors {
  const { colors } = useTheme();
  return colors;
}

