import { Image } from 'expo-image';
import * as Haptics from 'expo-haptics';
import { PlatformColor, Text, View, type ColorValue } from 'react-native';

const ios = process.env.EXPO_OS === 'ios';

// PlatformColor on iOS so everything tracks the system palette; sensible
// dark fallbacks elsewhere (the app ships userInterfaceStyle: "dark").
const sys = (name: string, fallback: string): ColorValue => (ios ? PlatformColor(name) : fallback);

export const colors = {
  background: sys('systemGroupedBackground', '#000000'),
  card: sys('secondarySystemGroupedBackground', '#1C1C1E'),
  cardRaised: sys('tertiarySystemGroupedBackground', '#2C2C2E'),
  label: sys('label', '#FFFFFF'),
  secondary: sys('secondaryLabel', 'rgba(235,235,245,0.6)'),
  tertiary: sys('tertiaryLabel', 'rgba(235,235,245,0.3)'),
  separator: sys('separator', 'rgba(84,84,88,0.55)'),
  fill: sys('quaternarySystemFill', 'rgba(118,118,128,0.24)'),
};

// System accent colors via PlatformColor so they track the system appearance
// (light/dark) automatically; hex fallbacks for non-iOS platforms.
export const accents = {
  blue: sys('systemBlue', '#0A84FF'),
  cyan: sys('systemCyan', '#64D2FF'),
  green: sys('systemGreen', '#30D158'),
  orange: sys('systemOrange', '#FF9F0A'),
  red: sys('systemRed', '#FF453A'),
  pink: sys('systemPink', '#FF375F'),
  purple: sys('systemPurple', '#BF5AF3'),
  yellow: sys('systemYellow', '#FFD60A'),
};

// A tinted SF Symbol via expo-image's `sf:` source (SDK 56).
export function Sym(props: { name: string; size?: number; color?: ColorValue }) {
  const size = props.size ?? 20;
  return (
    <Image
      source={`sf:${props.name}`}
      tintColor={(props.color ?? colors.label) as string}
      style={{ width: size, height: size }}
    />
  );
}

// Conditional haptics — iOS only, never blocks.
export const haptic = {
  light: () => ios && Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light),
  medium: () => ios && Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium),
  rigid: () => ios && Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid),
  selection: () => ios && Haptics.selectionAsync(),
  success: () => ios && Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success),
};

// A settings-style rounded icon tile with a centered white symbol.
export function IconTile(props: { accent: ColorValue; symbol: string; size?: number }) {
  const size = props.size ?? 30;
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.29,
        borderCurve: 'continuous',
        backgroundColor: props.accent,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Sym name={props.symbol} size={size * 0.58} color="#FFFFFF" />
    </View>
  );
}

// Grouped card with an icon tile, title/subtitle header, and arbitrary body.
export function Card(props: {
  accent: ColorValue;
  symbol: string;
  title: string;
  subtitle?: string;
  trailing?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <View
      style={{
        backgroundColor: colors.card,
        borderRadius: 20,
        borderCurve: 'continuous',
        padding: 16,
        gap: 14,
        boxShadow: '0 1px 3px rgba(0,0,0,0.18)',
      }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <IconTile accent={props.accent} symbol={props.symbol} />
        <View style={{ flex: 1, gap: 1 }}>
          <Text style={{ color: colors.label, fontSize: 17, fontWeight: '600' }}>{props.title}</Text>
          {props.subtitle ? (
            <Text style={{ color: colors.secondary, fontSize: 13 }}>{props.subtitle}</Text>
          ) : null}
        </View>
        {props.trailing}
      </View>
      {props.children}
    </View>
  );
}
