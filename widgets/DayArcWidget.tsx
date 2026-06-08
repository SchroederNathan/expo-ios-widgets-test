import { Gauge, HStack, Image, Rectangle, Spacer, Text, VStack, ZStack } from '@expo/ui/swift-ui';
import {
  containerBackground,
  containerRelativeFrame,
  font,
  foregroundStyle,
  frame,
  gaugeStyle,
  ignoreSafeArea,
  monospacedDigit,
  padding,
  tint,
} from '@expo/ui/swift-ui/modifiers';
import { createWidget, type WidgetEnvironment } from 'expo-widgets';

type DayArcProps = {
  wakeHour: number; // e.g. 7
  sleepHour: number; // e.g. 23
};

// NOTE: a 'widget' function runs natively at render time and may only reference
// its own params, locally-declared values, and imported @expo/ui helpers —
// never module-scope variables/functions. So the time-of-day palette and all
// colors/gradients are computed inline below.
const DayArcWidget = (props: DayArcProps, environment: WidgetEnvironment) => {
  'widget';
  const INK = '#120B1F';
  const now = environment.date;
  const wake = props.wakeHour;
  const sleep = props.sleepHour;
  const hourFloat = now.getHours() + now.getMinutes() / 60;
  const fraction = Math.min(1, Math.max(0, (hourFloat - wake) / (sleep - wake)));
  const pct = Math.round(fraction * 100);

  const bedtime = new Date(now.getTime());
  bedtime.setHours(Math.floor(sleep), Math.round((sleep % 1) * 60), 0, 0);
  const beforeBed = bedtime.getTime() > now.getTime();

  // Palette that tracks the time of day: dawn → midday → dusk → night.
  const h = now.getHours();
  const glow =
    h < 6 ? '#1E1B4B' : h < 11 ? '#3B2F1E' : h < 16 ? '#143A4A' : h < 20 ? '#3D1F2E' : '#1E1B4B';
  const accent =
    h < 6 ? '#818CF8' : h < 11 ? '#FBBF24' : h < 16 ? '#38BDF8' : h < 20 ? '#FB7185' : '#A78BFA';
  const name = h < 6 ? 'Night' : h < 11 ? 'Morning' : h < 16 ? 'Afternoon' : h < 20 ? 'Evening' : 'Night';
  const icon: 'moon.stars.fill' | 'sunrise.fill' | 'sun.max.fill' | 'sunset.fill' =
    h < 6 ? 'moon.stars.fill' : h < 11 ? 'sunrise.fill' : h < 16 ? 'sun.max.fill' : h < 20 ? 'sunset.fill' : 'moon.stars.fill';

  const backdrop = (
    <Rectangle
      modifiers={[
        foregroundStyle({
          type: 'radialGradient',
          colors: [glow, INK],
          center: { x: 0.5, y: 0.1 },
          startRadius: 0,
          endRadius: 240,
        }),
        containerRelativeFrame({ axes: 'both' }),
        ignoreSafeArea(),
      ]}
    />
  );

  const clock = (
    <Text
      date={now}
      dateStyle="time"
      modifiers={[
        font({ size: 30, weight: 'heavy', design: 'rounded' }),
        foregroundStyle('#FFFFFF'),
        monospacedDigit(),
      ]}
    />
  );

  if (environment.widgetFamily === 'systemSmall') {
    return (
      <ZStack
        alignment="center"
        modifiers={[containerBackground(INK, 'widget')]}>
        {backdrop}
        <VStack alignment="center" spacing={6} modifiers={[padding({ all: 14 })]}>
          <HStack spacing={5}>
            <Image systemName={icon} modifiers={[font({ size: 12 }), foregroundStyle(accent)]} />
            <Text modifiers={[font({ size: 12, weight: 'semibold' }), foregroundStyle('#D6CCEF')]}>{name}</Text>
          </HStack>
          {clock}
          <ZStack alignment="center" modifiers={[frame({ width: 78, height: 78 })]}>
            <Gauge
              value={fraction}
              min={0}
              max={1}
              currentValueLabel={
                <Text
                  modifiers={[font({ size: 15, weight: 'heavy', design: 'rounded' }), foregroundStyle('#FFFFFF')]}>
                  {pct}%
                </Text>
              }
              modifiers={[gaugeStyle('circular'), tint(accent)]}
            />
          </ZStack>
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
        <VStack alignment="leading" spacing={8}>
          <HStack spacing={6}>
            <Image systemName={icon} modifiers={[font({ size: 15 }), foregroundStyle(accent)]} />
            <Text modifiers={[font({ size: 16, weight: 'bold', design: 'rounded' }), foregroundStyle('#FFFFFF')]}>
              {name}
            </Text>
          </HStack>
          {clock}
          {beforeBed ? (
            <HStack spacing={5}>
              <Text modifiers={[font({ size: 12, weight: 'medium' }), foregroundStyle('#B9ACD8')]}>until bed</Text>
              <Text
                timerInterval={{ lower: now, upper: bedtime }}
                countsDown
                modifiers={[font({ size: 12, weight: 'bold' }), foregroundStyle(accent), monospacedDigit()]}
              />
            </HStack>
          ) : (
            <Text modifiers={[font({ size: 12, weight: 'semibold' }), foregroundStyle('#B9ACD8')]}>
              Rest well 🌙
            </Text>
          )}
        </VStack>
        <Spacer />
        <ZStack alignment="center" modifiers={[frame({ width: 96, height: 96 })]}>
          <Gauge
            value={fraction}
            min={0}
            max={1}
            currentValueLabel={
              <Text
                modifiers={[font({ size: 20, weight: 'heavy', design: 'rounded' }), foregroundStyle('#FFFFFF')]}>
                {pct}%
              </Text>
            }
            modifiers={[gaugeStyle('circular'), tint(accent)]}
          />
        </ZStack>
      </HStack>
    </ZStack>
  );
};

const Widget = createWidget('DayArcWidget', DayArcWidget);
export default Widget;

// Updates are driven from App.tsx after mount.
