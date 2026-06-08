import { Pressable, Text, View } from 'react-native';

import { DeepLinkBadge, styles, TopBar } from '../../lib/ui';

function Field(props: { label: string; value: string }) {
  return (
    <View style={styles.field}>
      <Text style={styles.fieldLabel}>{props.label}</Text>
      <Text style={styles.fieldValue}>{props.value}</Text>
    </View>
  );
}

export default function Compose() {
  return (
    <View style={styles.root}>
      <TopBar title="New Message" accent="#34D399" />
      <View style={styles.composeWrap}>
        <Field label="To" value="design@widgetstudio.app" />
        <Field label="Subject" value="Re: widget polish" />
        <View style={styles.composeBody}>
          <Text style={styles.composeBodyText}>
            Hey team — the Mailbox widget now deep-links into real Expo Router routes. Each button
            routes to its own screen.{'\n\n'}— sent from a widget
          </Text>
        </View>
        <Pressable style={styles.sendBtn}>
          <Text style={styles.sendText}>Send ➤</Text>
        </Pressable>
      </View>
      <DeepLinkBadge path="mail/compose" accent="#34D399" />
    </View>
  );
}
