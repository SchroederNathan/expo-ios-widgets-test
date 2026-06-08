import { Link } from 'expo-router';
import { Pressable, ScrollView, Text, View, type ColorValue } from 'react-native';

import { GOAL, Hydration, useGlasses } from '../lib/hydration';
import { INBOX } from '../lib/mail';
import { accents, Card, colors, haptic, Sym } from '../lib/ui';

export default function Home() {
  const glasses = useGlasses();
  const progress = Math.min(1, glasses / GOAL);

  // Fraction of the waking day (07:00–23:00) that has elapsed.
  const now = new Date();
  const minutes = now.getHours() * 60 + now.getMinutes();
  const dayProgress = Math.max(0, Math.min(1, (minutes - 7 * 60) / (16 * 60)));

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={{ padding: 16, paddingBottom: 48, gap: 16 }}>
      <Text style={{ color: colors.secondary, fontSize: 15, lineHeight: 20, paddingHorizontal: 4 }}>
        Three home-screen widgets, driven from this app. Each one shows a different trick — deep
        linking, interaction, and a timeline.
      </Text>

      {/* Mailbox — each preview deep-links to its own message screen */}
      <Card accent={accents.blue} symbol="envelope.fill" title="Mailbox" subtitle="Tap a preview — each opens its own route">
        <View style={{ gap: 2 }}>
          {INBOX.slice(0, 2).map((m, i) => (
            <Link key={m.id} href={`/mail/message/${m.id}`} onPress={() => haptic.light()}>
              <Link.Trigger>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 12,
                    paddingVertical: 10,
                    borderTopWidth: i === 0 ? 0 : 1,
                    borderTopColor: colors.separator,
                  }}>
                  <Avatar letter={m.from[0]} color={m.color} />
                  <View style={{ flex: 1, gap: 1 }}>
                    <Text style={{ color: colors.label, fontSize: 15, fontWeight: '600' }} numberOfLines={1}>
                      {m.from}
                    </Text>
                    <Text style={{ color: colors.secondary, fontSize: 13 }} numberOfLines={1}>
                      {m.subject}
                    </Text>
                  </View>
                  {m.unread ? (
                    <View style={{ width: 9, height: 9, borderRadius: 5, backgroundColor: accents.blue }} />
                  ) : null}
                  <Sym name="chevron.right" size={13} color={colors.tertiary} />
                </View>
              </Link.Trigger>
              <Link.Preview />
            </Link>
          ))}
        </View>
      </Card>

      {/* Hydration — interactive widget, taps log a glass */}
      <Card
        accent={accents.cyan}
        symbol="drop.fill"
        title="Hydration"
        subtitle="Tap to log a glass — the bottle fills"
        trailing={
          <Text style={{ color: colors.label, fontSize: 22, fontWeight: '700', fontVariant: ['tabular-nums'] }}>
            {glasses}
            <Text style={{ color: colors.tertiary, fontSize: 15, fontWeight: '600' }}> / {GOAL}</Text>
          </Text>
        }>
        <View style={{ height: 8, borderRadius: 4, backgroundColor: colors.fill, overflow: 'hidden' }}>
          <View style={{ width: `${progress * 100}%`, height: '100%', backgroundColor: accents.cyan }} />
        </View>
        <View style={{ flexDirection: 'row', gap: 10 }}>
          <Stepper symbol="minus" accent={accents.cyan} onPress={() => { haptic.light(); Hydration.add(-1); }} />
          <Stepper symbol="plus" accent={accents.cyan} onPress={() => { haptic.medium(); Hydration.add(1); }} grow />
          <Stepper symbol="arrow.counterclockwise" accent={colors.secondary} onPress={() => { haptic.rigid(); Hydration.set(0); }} />
        </View>
      </Card>

      {/* Day Arc — ambient timeline widget */}
      <Card accent={accents.orange} symbol="sun.max.fill" title="Day Arc" subtitle="Ambient · updates on its own">
        <View style={{ height: 8, borderRadius: 4, backgroundColor: colors.fill, overflow: 'hidden' }}>
          <View style={{ width: `${dayProgress * 100}%`, height: '100%', backgroundColor: accents.orange }} />
        </View>
        <Text style={{ color: colors.secondary, fontSize: 13, lineHeight: 18 }}>
          A 48-entry timeline is pushed to the widget so the bar fills as your waking day passes — no
          taps needed.
        </Text>
      </Card>
    </ScrollView>
  );
}

function Avatar(props: { letter: string; color: string }) {
  return (
    <View
      style={{
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: props.color + '2A',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text style={{ color: props.color, fontSize: 16, fontWeight: '700' }}>
        {props.letter.toUpperCase()}
      </Text>
    </View>
  );
}

function Stepper(props: { symbol: string; accent: ColorValue; onPress: () => void; grow?: boolean }) {
  return (
    <Pressable
      onPress={props.onPress}
      style={({ pressed }) => [
        {
          flex: props.grow ? 1 : 0,
          width: props.grow ? undefined : 52,
          height: 44,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 12,
          borderCurve: 'continuous',
          backgroundColor: colors.fill,
        },
        pressed && { opacity: 0.6 },
      ]}>
      <Sym name={props.symbol} size={18} color={props.accent} />
    </Pressable>
  );
}
