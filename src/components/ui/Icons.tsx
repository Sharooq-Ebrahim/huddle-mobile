import { Image, StyleSheet, View, type ColorValue } from 'react-native';

export interface IconProps {
  size?: number;
  color?: ColorValue;
}

/**
 * Clean envelope/mail outline icon
 */
export function MailIcon({ size = 18, color = '#717C80' }: IconProps) {
  const width = size;
  const height = Math.round(size * 0.72);
  const borderWidth = Math.max(1.5, Math.round(size * 0.08));

  return (
    <View
      style={[
        styles.iconBox,
        {
          width,
          height,
          borderColor: color,
          borderWidth,
          borderRadius: 3,
        },
      ]}
    >
      {/* Envelope flap lines */}
      <View
        style={[
          styles.flapLeft,
          {
            borderColor: color,
            borderBottomWidth: borderWidth,
            borderRightWidth: borderWidth,
            width: width * 0.44,
            height: height * 0.44,
          },
        ]}
      />
    </View>
  );
}

/**
 * Clean padlock outline icon
 */
export function LockIcon({ size = 18, color = '#717C80' }: IconProps) {
  const width = Math.round(size * 0.82);
  const height = size;
  const borderWidth = Math.max(1.5, Math.round(size * 0.08));
  const shackleWidth = Math.round(width * 0.62);
  const shackleHeight = Math.round(height * 0.42);

  return (
    <View style={{ width, height, alignItems: 'center', justifyContent: 'flex-end' }}>
      {/* Shackle */}
      <View
        style={{
          width: shackleWidth,
          height: shackleHeight,
          borderTopLeftRadius: shackleWidth / 2,
          borderTopRightRadius: shackleWidth / 2,
          borderWidth,
          borderBottomWidth: 0,
          borderColor: color,
          marginBottom: -borderWidth + 1,
        }}
      />
      {/* Body */}
      <View
        style={{
          width,
          height: height - shackleHeight + 1,
          borderWidth,
          borderColor: color,
          borderRadius: 3,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <View
          style={{
            width: 2.5,
            height: 4,
            backgroundColor: color,
            borderRadius: 1,
          }}
        />
      </View>
    </View>
  );
}

/**
 * User / Person outline icon
 */
export function UserIcon({ size = 18, color = '#717C80' }: IconProps) {
  const borderWidth = Math.max(1.5, Math.round(size * 0.08));
  const headSize = Math.round(size * 0.42);
  const bodyWidth = size;
  const bodyHeight = Math.round(size * 0.38);

  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      {/* Head */}
      <View
        style={{
          width: headSize,
          height: headSize,
          borderRadius: headSize / 2,
          borderWidth,
          borderColor: color,
          marginBottom: 1,
        }}
      />
      {/* Shoulders */}
      <View
        style={{
          width: bodyWidth,
          height: bodyHeight,
          borderTopLeftRadius: bodyWidth / 2,
          borderTopRightRadius: bodyWidth / 2,
          borderWidth,
          borderBottomWidth: 0,
          borderColor: color,
        }}
      />
    </View>
  );
}

/**
 * Eye visibility icon (outline, anti-aliased)
 */
export function EyeIcon({ size = 20, color = '#717C80' }: IconProps) {
  return (
    <Image
      source={require('@/assets/images/eye.png')}
      style={{ width: size, height: size, tintColor: color }}
      resizeMode="contain"
    />
  );
}


export function EyeOffIcon({ size = 20, color = '#717C80' }: IconProps) {
  return (
    <Image
      source={require('@/assets/images/eye-off.png')}
      style={{ width: size, height: size, tintColor: color }}
      resizeMode="contain"
    />
  );
}


export function OfflineIcon({ size = 18, color = '#182329' }: IconProps) {
  const borderWidth = Math.max(1.5, Math.round(size * 0.08));

  return (
    <View
      style={{
        width: size,
        height: size,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}
    >

      <View
        style={{
          width: size * 0.9,
          height: size * 0.9,
          borderRadius: size * 0.45,
          borderWidth,
          borderBottomColor: 'transparent',
          borderLeftColor: 'transparent',
          borderRightColor: 'transparent',
          borderColor: color,
          position: 'absolute',
          top: 0,
        }}
      />
      {/* Inner antenna arc */}
      <View
        style={{
          width: size * 0.55,
          height: size * 0.55,
          borderRadius: size * 0.275,
          borderWidth,
          borderBottomColor: 'transparent',
          borderLeftColor: 'transparent',
          borderRightColor: 'transparent',
          borderColor: color,
          position: 'absolute',
          top: size * 0.2,
        }}
      />
      {/* Center dot */}
      <View
        style={{
          width: 3.5,
          height: 3.5,
          borderRadius: 2,
          backgroundColor: color,
          position: 'absolute',
          bottom: 2,
        }}
      />
      {/* Diagonal slash */}
      <View
        style={{
          position: 'absolute',
          width: size * 1.25,
          height: borderWidth,
          backgroundColor: color,
          transform: [{ rotate: '-45deg' }],
        }}
      />
    </View>
  );
}

/**
 * Left chevron back icon
 */
export function ChevronLeftIcon({ size = 16, color = '#FFFFFF' }: IconProps) {
  const armSize = Math.round(size * 0.52);
  const borderWidth = Math.max(2, Math.round(size * 0.12));

  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <View
        style={{
          width: armSize,
          height: armSize,
          borderLeftWidth: borderWidth,
          borderBottomWidth: borderWidth,
          borderColor: color,
          transform: [{ rotate: '45deg' }],
          marginLeft: armSize * 0.25,
        }}
      />
    </View>
  );
}
export function CheckIcon({ size = 18, color = '#20A477' }: IconProps) {
  const borderWidth = Math.max(2, Math.round(size * 0.12));
  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <View
        style={{
          width: size * 0.5,
          height: size * 0.28,
          borderColor: color,
          borderBottomWidth: borderWidth,
          borderLeftWidth: borderWidth,
          transform: [{ rotate: '-45deg' }, { translateY: -size * 0.1 }],
        }}
      />
    </View>
  );
}

export interface TabIconProps extends IconProps {
  focused?: boolean;
}

/**
 * Chats speech bubble tab icon
 */
export function ChatTabIcon({ size = 22, color = '#717C80' }: TabIconProps) {
  return (
    <Image
      source={require('@/assets/images/tab-chats.png')}
      style={{ width: size, height: size, tintColor: color as string }}
      resizeMode="contain"
    />
  );
}

/**
 * Nearby wireless radar / mesh waves tab icon
 */
export function NearbyTabIcon({ size = 22, color = '#717C80' }: TabIconProps) {
  return (
    <Image
      source={require('@/assets/images/tab-nearby.png')}
      style={{ width: size, height: size, tintColor: color as string }}
      resizeMode="contain"
    />
  );
}

/**
 * Map folded terrain tab icon
 */
export function MapTabIcon({ size = 22, color = '#717C80' }: TabIconProps) {
  return (
    <Image
      source={require('@/assets/images/tab-map.png')}
      style={{ width: size, height: size, tintColor: color as string }}
      resizeMode="contain"
    />
  );
}

/**
 * Settings gear tab icon
 */
export function SettingsTabIcon({ size = 22, color = '#717C80' }: TabIconProps) {
  return (
    <Image
      source={require('@/assets/images/tab-settings.png')}
      style={{ width: size, height: size, tintColor: color as string }}
      resizeMode="contain"
    />
  );
}

/**
 * Search magnifying glass icon
 */
export function SearchIcon({ size = 18, color = '#717C80' }: IconProps) {
  const circleSize = Math.round(size * 0.65);
  const borderWidth = Math.max(1.5, Math.round(size * 0.09));

  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <View
        style={{
          width: circleSize,
          height: circleSize,
          borderRadius: circleSize / 2,
          borderWidth,
          borderColor: color,
          marginBottom: 2,
          marginRight: 2,
        }}
      />
      {/* Handle */}
      <View
        style={{
          position: 'absolute',
          bottom: 2,
          right: 2,
          width: Math.round(size * 0.35),
          height: borderWidth,
          backgroundColor: color,
          borderRadius: 1,
          transform: [{ rotate: '45deg' }],
        }}
      />
    </View>
  );
}

/**
 * Right chevron navigation icon
 */
export function ChevronRightIcon({ size = 16, color = '#717C80' }: IconProps) {
  const armSize = Math.round(size * 0.52);
  const borderWidth = Math.max(1.8, Math.round(size * 0.11));

  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <View
        style={{
          width: armSize,
          height: armSize,
          borderRightWidth: borderWidth,
          borderTopWidth: borderWidth,
          borderColor: color,
          transform: [{ rotate: '45deg' }],
          marginRight: armSize * 0.25,
        }}
      />
    </View>
  );
}

/**
 * Security shield icon
 */
export function ShieldIcon({ size = 18, color = '#717C80' }: IconProps) {
  const width = Math.round(size * 0.85);
  const height = size;
  const borderWidth = Math.max(1.5, Math.round(size * 0.08));

  return (
    <View style={{ width, height, alignItems: 'center', justifyContent: 'center' }}>
      <View
        style={{
          width,
          height: height * 0.9,
          borderWidth,
          borderColor: color,
          borderTopLeftRadius: width * 0.45,
          borderTopRightRadius: width * 0.45,
          borderBottomLeftRadius: width * 0.6,
          borderBottomRightRadius: width * 0.6,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <View style={{ width: 2, height: 4, backgroundColor: color, borderRadius: 1 }} />
      </View>
    </View>
  );
}

/**
 * Palette / appearance icon
 */
export function PaletteIcon({ size = 18, color = '#717C80' }: IconProps) {
  const borderWidth = Math.max(1.5, Math.round(size * 0.08));

  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        borderWidth,
        borderColor: color,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <View style={{ flexDirection: 'row', gap: 2.5 }}>
        <View style={{ width: 3, height: 3, borderRadius: 1.5, backgroundColor: color }} />
        <View style={{ width: 3, height: 3, borderRadius: 1.5, backgroundColor: color }} />
      </View>
    </View>
  );
}

/**
 * Info circle icon
 */
export function InfoIcon({ size = 18, color = '#717C80' }: IconProps) {
  const borderWidth = Math.max(1.5, Math.round(size * 0.08));

  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        borderWidth,
        borderColor: color,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <View style={{ width: 2, height: 2, borderRadius: 1, backgroundColor: color, marginBottom: 1.5 }} />
      <View style={{ width: 2, height: 5, backgroundColor: color, borderRadius: 1 }} />
    </View>
  );
}

/**
 * Log out door icon
 */
export function LogOutIcon({ size = 18, color = '#E4545A' }: IconProps) {
  const borderWidth = Math.max(1.5, Math.round(size * 0.08));

  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      {/* Door frame */}
      <View
        style={{
          width: size * 0.6,
          height: size * 0.88,
          borderWidth,
          borderColor: color,
          borderRightWidth: 0,
          borderTopLeftRadius: 3,
          borderBottomLeftRadius: 3,
          position: 'absolute',
          left: 1,
        }}
      />
      {/* Arrow shaft */}
      <View
        style={{
          width: size * 0.45,
          height: borderWidth,
          backgroundColor: color,
          position: 'absolute',
          right: 3,
        }}
      />
      {/* Arrow head */}
      <View
        style={{
          width: 5,
          height: 5,
          borderRightWidth: borderWidth,
          borderTopWidth: borderWidth,
          borderColor: color,
          transform: [{ rotate: '45deg' }],
          position: 'absolute',
          right: 2,
        }}
      />
    </View>
  );
}

/**
 * Pin badge icon
 */
export function PinIcon({ size = 12, color = '#717C80' }: IconProps) {
  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <View
        style={{
          width: size * 0.45,
          height: size * 0.45,
          borderRadius: (size * 0.45) / 2,
          backgroundColor: color,
        }}
      />
      <View
        style={{
          width: 1.5,
          height: size * 0.5,
          backgroundColor: color,
          marginTop: -1,
        }}
      />
    </View>
  );
}

/**
 * New chat / compose icon
 */
export function ComposeIcon({ size = 20, color = '#182329' }: IconProps) {
  const borderWidth = Math.max(1.6, Math.round(size * 0.09));
  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <View
        style={{
          width: size * 0.82,
          height: size * 0.82,
          borderWidth,
          borderColor: color,
          borderRadius: 5,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <View style={{ width: size * 0.45, height: borderWidth, backgroundColor: color }} />
        <View style={{ position: 'absolute', width: borderWidth, height: size * 0.45, backgroundColor: color }} />
      </View>
    </View>
  );
}

/**
 * Send arrow icon
 */
export function SendIcon({ size = 18, color = '#FFFFFF' }: IconProps) {
  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <View
        style={{
          width: 0,
          height: 0,
          borderLeftWidth: size * 0.4,
          borderRightWidth: size * 0.4,
          borderBottomWidth: size * 0.65,
          borderLeftColor: 'transparent',
          borderRightColor: 'transparent',
          borderBottomColor: color,
          transform: [{ rotate: '90deg' }, { translateX: -1 }],
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  iconBox: {
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flapLeft: {
    transform: [{ rotate: '45deg' }],
    marginTop: -3,
  },
});

