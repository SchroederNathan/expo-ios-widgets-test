import { useRouter } from 'expo-router';
import { Pressable, ScrollView, Text, View } from 'react-native';

import type { Mail } from './mail';
import { DeepLinkBadge, styles, TopBar } from './ui';

export function MailList(props: { title: string; mail: Mail[]; badgePath: string }) {
  const router = useRouter();
  return (
    <View style={styles.root}>
      <TopBar title={props.title} />
      <ScrollView contentContainerStyle={styles.listScroll}>
        {props.mail.length === 0 && <Text style={styles.empty}>Nothing here yet.</Text>}
        {props.mail.map((m) => (
          <Pressable
            key={m.id}
            onPress={() => router.push(`/mail/message/${m.id}`)}
            style={({ pressed }) => [styles.mailRow, pressed && { opacity: 0.6 }]}>
            <View style={[styles.avatar, { backgroundColor: m.color + '2A' }]}>
              <Text style={[styles.avatarText, { color: m.color }]}>
                {m.from.replace('To: ', '').slice(0, 1).toUpperCase()}
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <View style={styles.mailTopline}>
                <Text style={styles.mailFrom} numberOfLines={1}>
                  {m.unread ? '● ' : ''}
                  {m.from}
                </Text>
                <Text style={styles.mailTime}>{m.time}</Text>
              </View>
              <Text style={[styles.mailSubject, m.unread && { color: '#FFFFFF' }]} numberOfLines={1}>
                {m.subject}
              </Text>
              <Text style={styles.mailPreview} numberOfLines={1}>
                {m.preview}
              </Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>
      <DeepLinkBadge path={props.badgePath} />
    </View>
  );
}
