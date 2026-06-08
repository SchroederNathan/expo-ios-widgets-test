import { useLocalSearchParams } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';

import { findMail } from '../../../lib/mail';
import { DeepLinkBadge, styles, TopBar } from '../../../lib/ui';

export default function Message() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const m = findMail(Number(id));

  return (
    <View style={styles.root}>
      <TopBar title="Message" />
      {m ? (
        <ScrollView contentContainerStyle={styles.msgScroll}>
          <Text style={styles.msgSubject}>{m.subject}</Text>
          <View style={styles.msgFromRow}>
            <View style={[styles.avatar, { backgroundColor: m.color + '2A' }]}>
              <Text style={[styles.avatarText, { color: m.color }]}>{m.from.slice(0, 1).toUpperCase()}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.msgFrom}>{m.from}</Text>
              <Text style={styles.msgTo}>to me · {m.time}</Text>
            </View>
          </View>
          <Text style={styles.msgBody}>{m.body}</Text>
        </ScrollView>
      ) : (
        <Text style={styles.empty}>Message #{String(id)} not found.</Text>
      )}
      <DeepLinkBadge path={`mail/message/${String(id)}`} />
    </View>
  );
}
