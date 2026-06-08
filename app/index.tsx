import { useRouter } from 'expo-router';
import { Pressable, ScrollView, Text, View } from 'react-native';

import { GOAL, Hydration, useGlasses } from '../lib/hydration';
import { INBOX } from '../lib/mail';
import { Card, Pill, Row, styles } from '../lib/ui';

export default function Home() {
  const router = useRouter();
  const glasses = useGlasses();

  return (
    <View style={styles.root}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.kicker}>HOME SCREEN</Text>
        <Text style={styles.h1}>Widget Studio</Text>
        <Text style={styles.sub}>
          Three widgets, driven from here. The Mailbox widget shows two inbox previews — each one
          deep-links into its own Expo Router route.
        </Text>

        {/* Mailbox — multi-destination deep links via Expo Router */}
        <Card accent="#60A5FA" icon="📬" title="Mailbox" subtitle="Two inbox previews, each its own route">
          {INBOX.slice(0, 2).map((m) => (
            <Pressable
              key={m.id}
              onPress={() => router.push(`/mail/message/${m.id}`)}
              style={({ pressed }) => [styles.previewRow, pressed && { opacity: 0.6 }]}>
              <View style={[styles.avatarSm, { backgroundColor: m.color + '2A' }]}>
                <Text style={[styles.avatarSmText, { color: m.color }]}>{m.from.slice(0, 1)}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.previewFrom} numberOfLines={1}>
                  {m.unread ? '● ' : ''}
                  {m.from}
                </Text>
                <Text style={styles.previewSub} numberOfLines={1}>
                  {m.subject}
                </Text>
              </View>
              <Text style={styles.previewUrl} numberOfLines={1}>
                /mail/message/{m.id}
              </Text>
            </Pressable>
          ))}
          <Row>
            <Pill label="Inbox" onPress={() => router.push('/mail/inbox')} tone="ghost" accent="#60A5FA" />
            <Pill label="Compose" onPress={() => router.push('/mail/compose')} tone="solid" accent="#34D399" />
          </Row>
        </Card>

        {/* Hydration */}
        <Card accent="#22D3EE" icon="💧" title="Hydration" subtitle={`${glasses} / ${GOAL} glasses today`}>
          <Row>
            <Pill label="−1" onPress={() => Hydration.add(-1)} tone="ghost" accent="#22D3EE" />
            <Pill label="+1 glass" onPress={() => Hydration.add(1)} tone="solid" accent="#22D3EE" />
            <Pill label="Reset" onPress={() => Hydration.set(0)} tone="ghost" accent="#64748B" />
          </Row>
        </Card>

        {/* Day Arc */}
        <Card accent="#FB7185" icon="🌅" title="Day Arc" subtitle="Ambient · updates on its own">
          <Text style={styles.note}>
            Pushed a 24h timeline so the ring fills as the day passes — no taps needed.
          </Text>
        </Card>

        <Text style={styles.footer}>
          Add the Mailbox widget, then tap either inbox preview to deep-link to that exact message.
        </Text>
      </ScrollView>
    </View>
  );
}
