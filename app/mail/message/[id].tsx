import { Stack, useLocalSearchParams } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';

import { findMail } from '../../../lib/mail';
import { colors, Sym } from '../../../lib/ui';

export default function Message() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const m = findMail(Number(id));

  if (!m) {
    return (
      <>
        <Stack.Screen options={{ headerLargeTitle: false, title: 'Message' }} />
        <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={{ padding: 16 }}>
          <Text selectable style={{ color: colors.secondary, textAlign: 'center', marginTop: 48, fontSize: 15 }}>
            Message #{String(id)} not found.
          </Text>
        </ScrollView>
      </>
    );
  }

  return (
    <>
      {/* The subject is the nav-bar title, not a custom heading on the page. */}
      <Stack.Screen options={{ title: m.subject }} />
      {/* ScrollView must be the first child of the screen */}
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{ padding: 16, paddingBottom: 48, gap: 18 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <View
            style={{
              width: 44,
              height: 44,
              borderRadius: 22,
              backgroundColor: m.color + '2A',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{ color: m.color, fontSize: 19, fontWeight: '700' }}>
              {m.from.slice(0, 1).toUpperCase()}
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ color: colors.label, fontSize: 16, fontWeight: '600' }}>{m.from}</Text>
            <Text style={{ color: colors.secondary, fontSize: 13, marginTop: 1 }}>to me · {m.time}</Text>
          </View>
          <Sym name="star" size={20} color={colors.tertiary} />
        </View>

        <View style={{ height: 1, backgroundColor: colors.separator }} />

        <Text selectable style={{ color: colors.label, fontSize: 17, lineHeight: 25 }}>
          {m.body}
        </Text>
      </ScrollView>
    </>
  );
}
