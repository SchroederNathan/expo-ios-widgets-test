import { Circle, HStack, Image, Link, Rectangle, Spacer, Text, VStack, ZStack } from '@expo/ui/swift-ui';
import {
  background,
  containerBackground,
  containerRelativeFrame,
  cornerRadius,
  font,
  foregroundStyle,
  frame,
  ignoreSafeArea,
  monospacedDigit,
  opacity,
  padding,
} from '@expo/ui/swift-ui/modifiers';
import { createWidget, type WidgetEnvironment } from 'expo-widgets';

type MailItem = {
  id: number;
  from: string;
  subject: string;
  time: string;
  unread: boolean;
  color: string;
};
type MailProps = {
  unread: number;
  items: MailItem[];
};

// Each Link is its own tap target. The two inbox previews on the medium widget
// deep-link into their own message screen (expowidgetstest://mail/message/<id>).
const MailWidget = (props: MailProps, environment: WidgetEnvironment) => {
  'widget';
  const INK = '#0A0F1E';
  const unread = Math.max(0, props.unread);
  const items = props.items ?? [];

  const backdrop = (
    <Rectangle
      modifiers={[
        foregroundStyle({
          type: 'radialGradient',
          colors: ['#16233F', INK],
          center: { x: 0.5, y: 0.1 },
          startRadius: 0,
          endRadius: 260,
        }),
        containerRelativeFrame({ axes: 'both' }),
        ignoreSafeArea(),
      ]}
    />
  );

  const composeIcon = (
    <Link destination="expowidgetstest://mail/compose">
      <HStack
        spacing={4}
        modifiers={[padding({ horizontal: 9, vertical: 5 }), background('#60A5FA'), cornerRadius(9)]}>
        <Image
          systemName="square.and.pencil"
          modifiers={[font({ size: 11, weight: 'bold' }), foregroundStyle('#0A0F1E')]}
        />
        <Text modifiers={[font({ size: 11, weight: 'bold' }), foregroundStyle('#0A0F1E')]}>Compose</Text>
      </HStack>
    </Link>
  );

  // One tappable inbox preview that deep-links to its message screen.
  const item = (it: MailItem) => (
    <Link destination={`expowidgetstest://mail/message/${it.id}`}>
      <HStack
        spacing={9}
        modifiers={[padding({ horizontal: 9, vertical: 7 }), background('#FFFFFF12'), cornerRadius(12)]}>
        <ZStack alignment="center" modifiers={[frame({ width: 30, height: 30 })]}>
          <Circle modifiers={[foregroundStyle(it.color), opacity(0.28)]} />
          <Text modifiers={[font({ size: 13, weight: 'bold', design: 'rounded' }), foregroundStyle(it.color)]}>
            {it.from.slice(0, 1)}
          </Text>
        </ZStack>
        <VStack alignment="leading" spacing={1}>
          <HStack spacing={5}>
            {it.unread ? (
              <Circle modifiers={[frame({ width: 7, height: 7 }), foregroundStyle('#60A5FA')]} />
            ) : null}
            <Text modifiers={[font({ size: 13, weight: 'bold' }), foregroundStyle('#FFFFFF')]}>{it.from}</Text>
            <Spacer />
            <Text modifiers={[font({ size: 10 }), foregroundStyle('#7E8DA8')]}>{it.time}</Text>
          </HStack>
          <Text modifiers={[font({ size: 12, weight: 'medium' }), foregroundStyle('#B7C4DC')]}>{it.subject}</Text>
        </VStack>
      </HStack>
    </Link>
  );

  if (environment.widgetFamily === 'systemSmall') {
    return (
      <ZStack alignment="center" modifiers={[containerBackground(INK, 'widget')]}>
        {backdrop}
        <VStack alignment="leading" spacing={6} modifiers={[padding({ all: 14 })]}>
          <HStack spacing={6}>
            <Image systemName="tray.full.fill" modifiers={[font({ size: 14 }), foregroundStyle('#60A5FA')]} />
            <Text modifiers={[font({ size: 14, weight: 'bold', design: 'rounded' }), foregroundStyle('#FFFFFF')]}>
              Mailbox
            </Text>
          </HStack>
          <Link destination="expowidgetstest://mail/inbox">
            <HStack spacing={4}>
              <Text
                modifiers={[
                  font({ size: 32, weight: 'heavy', design: 'rounded' }),
                  foregroundStyle('#FFFFFF'),
                  monospacedDigit(),
                ]}>
                {unread}
              </Text>
              <Text modifiers={[font({ size: 12, weight: 'semibold' }), foregroundStyle('#9DB2D6')]}>unread</Text>
            </HStack>
          </Link>
          <Spacer />
          <Link destination="expowidgetstest://mail/compose">
            <HStack
              spacing={6}
              modifiers={[padding({ horizontal: 14, vertical: 9 }), background('#60A5FA'), cornerRadius(12)]}>
              <Image
                systemName="square.and.pencil"
                modifiers={[font({ size: 13, weight: 'bold' }), foregroundStyle('#0A0F1E')]}
              />
              <Text modifiers={[font({ size: 13, weight: 'bold' }), foregroundStyle('#0A0F1E')]}>Compose</Text>
            </HStack>
          </Link>
        </VStack>
      </ZStack>
    );
  }

  // systemMedium — header + two tappable inbox previews, each deep-linking to
  // its own message screen. Sized to fit the medium widget bounds.
  return (
    <ZStack alignment="center" modifiers={[containerBackground(INK, 'widget')]}>
      {backdrop}
      <VStack alignment="leading" spacing={8} modifiers={[padding({ all: 12 })]}>
        <HStack spacing={6}>
          <Image systemName="tray.full.fill" modifiers={[font({ size: 14 }), foregroundStyle('#60A5FA')]} />
          <Text modifiers={[font({ size: 15, weight: 'bold', design: 'rounded' }), foregroundStyle('#FFFFFF')]}>
            Inbox
          </Text>
          <Text modifiers={[font({ size: 12, weight: 'semibold' }), foregroundStyle('#7E8DA8')]}>
            {unread} unread
          </Text>
          <Spacer />
          {composeIcon}
        </HStack>
        {items[0] ? item(items[0]) : null}
        {items[1] ? item(items[1]) : null}
      </VStack>
    </ZStack>
  );
};

const Widget = createWidget('MailWidget', MailWidget);
export default Widget;

// Updates are driven from App.tsx after mount.
