import { Image, StyleSheet, View } from 'react-native';

export interface IconProps {
  size?: number;
  color?: string;
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

