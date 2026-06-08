import { Button, Capsule, HStack, Image, Rectangle, Spacer, Text, VStack, ZStack } from '@expo/ui/swift-ui';
import {
  buttonBorderShape,
  buttonStyle,
  containerBackground,
  containerRelativeFrame,
  controlSize,
  font,
  foregroundStyle,
  frame,
  ignoreSafeArea,
  monospacedDigit,
  opacity,
  padding,
  tint,
} from '@expo/ui/swift-ui/modifiers';
import { createWidget, type WidgetEnvironment } from 'expo-widgets';

type HydrationProps = {
  glasses: number;
  goal: number;
};

// NOTE: a 'widget' function runs natively at render time and may only reference
// its own params, locally-declared values, and imported @expo/ui helpers —
// never module-scope variables/functions. So colors and gradients are declared
// inline below.
const HydrationWidget = (props: HydrationProps, environment: WidgetEnvironment) => {
  'widget';
  // Shared palette (matches the app's system accents + the other widgets).
  const INK = '#091019'; // unified dark surface across all widgets
  const GLOW = '#04384B'; // cyan-tinted radial glow
  const CYAN = '#64D2FF'; // systemCyan (dark)
  const CYAN_SOFT = '#A9E0FF'; // lighter cyan for the subtle (minus) control
  const GREEN = '#30D158'; // systemGreen (dark)
  const SECONDARY = '#B3BFCE';
  const TERTIARY = '#7A8798';
  const glasses = Math.max(0, props.glasses);
  const goal = Math.max(1, props.goal);
  const fraction = Math.min(1, glasses / goal);
  const pct = Math.round(fraction * 100);
  const oz = glasses * 8;

  const backdrop = (
    <Rectangle
      modifiers={[
        foregroundStyle({
          type: 'radialGradient',
          colors: [GLOW, INK],
          center: { x: 0.5, y: 0.12 },
          startRadius: 0,
          endRadius: 240,
        }),
        containerRelativeFrame({ axes: 'both' }),
        ignoreSafeArea(),
      ]}
    />
  );

  // Bottle = faint track capsule + a gradient fill capsule whose height encodes
  // progress toward the daily goal.
  const bottle = (w: number, h: number) => (
    <ZStack alignment="bottom">
      <Capsule modifiers={[frame({ width: w, height: h }), foregroundStyle('#FFFFFF'), opacity(0.14)]} />
      <Capsule
        modifiers={[
          frame({ width: w, height: Math.max(0, Math.round(fraction * h)) }),
          foregroundStyle({
            type: 'linearGradient',
            colors: ['#91DDFF', '#29C8FF', '#0FA0CE'],
            startPoint: { x: 0, y: 0 },
            endPoint: { x: 0, y: 1 },
          }),
        ]}
      />
    </ZStack>
  );

  const minus = (
    <Button
      label="−"
      target="decrement"
      onPress={() => ({ ...props, glasses: Math.max(0, glasses - 1) })}
      modifiers={[buttonStyle('bordered'), buttonBorderShape('circle'), controlSize('small'), tint(CYAN_SOFT)]}
    />
  );
  const plus = (
    <Button
      label="+"
      target="increment"
      onPress={() => ({ ...props, glasses: glasses + 1 })}
      modifiers={[buttonStyle('borderedProminent'), buttonBorderShape('circle'), controlSize('small'), tint(CYAN)]}
    />
  );

  if (environment.widgetFamily === 'systemSmall') {
    return (
      <ZStack
        alignment="center"
        modifiers={[containerBackground(INK, 'widget')]}>
        {backdrop}
        <VStack alignment="center" spacing={8} modifiers={[padding({ all: 14 })]}>
          <HStack modifiers={[frame({ width: 112 })]}>
            <Image systemName="drop.fill" modifiers={[font({ size: 13 }), foregroundStyle(CYAN)]} />
            <Spacer />
            <Text
              modifiers={[
                font({ size: 15, weight: 'bold', design: 'rounded' }),
                foregroundStyle('#FFFFFF'),
                monospacedDigit(),
              ]}>
              {glasses}/{goal}
            </Text>
          </HStack>
          <ZStack alignment="center">
            {bottle(52, 84)}
            <Text modifiers={[font({ size: 22, weight: 'heavy', design: 'rounded' }), foregroundStyle('#FFFFFF')]}>
              {pct}%
            </Text>
          </ZStack>
          <HStack spacing={10}>
            {minus}
            {plus}
          </HStack>
        </VStack>
      </ZStack>
    );
  }

  // systemMedium
  return (
    <ZStack
      alignment="center"
      modifiers={[containerBackground(INK, 'widget')]}>
      {backdrop}
      <HStack spacing={20} modifiers={[padding({ all: 18 })]}>
        <ZStack alignment="center">
          {bottle(58, 118)}
          <VStack alignment="center" spacing={0}>
            <Text
              modifiers={[
                font({ size: 28, weight: 'heavy', design: 'rounded' }),
                foregroundStyle('#FFFFFF'),
                monospacedDigit(),
              ]}>
              {glasses}
            </Text>
            <Text modifiers={[font({ size: 10, weight: 'semibold' }), foregroundStyle('#FFFFFFAA')]}>glasses</Text>
          </VStack>
        </ZStack>

        <VStack alignment="leading" spacing={9}>
          <HStack spacing={6}>
            <Image systemName="drop.fill" modifiers={[font({ size: 15 }), foregroundStyle(CYAN)]} />
            <Text modifiers={[font({ size: 17, weight: 'bold', design: 'rounded' }), foregroundStyle('#FFFFFF')]}>
              Hydration
            </Text>
          </HStack>
          <Text modifiers={[font({ size: 13, weight: 'medium' }), foregroundStyle(SECONDARY)]}>
            {pct}% of {goal} · {oz} oz
          </Text>
          <Text
            modifiers={[font({ size: 11, weight: 'semibold' }), foregroundStyle(fraction >= 1 ? GREEN : TERTIARY)]}>
            {fraction >= 1 ? 'Goal reached — nice work' : `${goal - glasses} to go`}
          </Text>
          <HStack spacing={12} modifiers={[padding({ top: 2 })]}>
            {minus}
            {plus}
          </HStack>
        </VStack>
        <Spacer />
      </HStack>
    </ZStack>
  );
};

const Widget = createWidget('HydrationWidget', HydrationWidget);
export default Widget;

// Updates are driven from App.tsx after mount.
