import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export const BG = '#0A0A12';

// Back to the previous screen, or home when deep-linked in cold.
export function useBack() {
  const router = useRouter();
  return () => (router.canGoBack() ? router.back() : router.replace('/'));
}

export function TopBar(props: { title: string; accent?: string }) {
  const back = useBack();
  return (
    <View style={styles.topbar}>
      <Pressable onPress={back} hitSlop={12} style={styles.backBtn}>
        <Text style={[styles.backChevron, { color: props.accent ?? '#60A5FA' }]}>‹</Text>
        <Text style={[styles.backText, { color: props.accent ?? '#60A5FA' }]}>Mailbox</Text>
      </Pressable>
      <Text style={styles.topTitle}>{props.title}</Text>
    </View>
  );
}

export function DeepLinkBadge(props: { path: string; accent?: string }) {
  return (
    <View style={styles.dlBadge}>
      <Text style={styles.dlBadgeIcon}>🔗</Text>
      <Text style={[styles.dlBadgeText, { color: props.accent ?? '#60A5FA' }]}>expowidgetstest://{props.path}</Text>
    </View>
  );
}

export function Card(props: { accent: string; icon: string; title: string; subtitle: string; children?: React.ReactNode }) {
  return (
    <View style={[styles.card, { borderColor: props.accent + '33' }]}>
      <View style={styles.cardHead}>
        <View style={[styles.iconWrap, { backgroundColor: props.accent + '22' }]}>
          <Text style={styles.icon}>{props.icon}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.cardTitle}>{props.title}</Text>
          <Text style={styles.cardSub}>{props.subtitle}</Text>
        </View>
      </View>
      {props.children}
    </View>
  );
}

export function Row(props: { children: React.ReactNode }) {
  return <View style={styles.row}>{props.children}</View>;
}

export function Pill(props: { label: string; onPress: () => void; tone: 'solid' | 'ghost'; accent: string }) {
  const solid = props.tone === 'solid';
  return (
    <Pressable
      onPress={props.onPress}
      style={({ pressed }) => [
        styles.pill,
        solid ? { backgroundColor: props.accent } : { backgroundColor: 'transparent', borderColor: props.accent + '55', borderWidth: 1 },
        pressed && { opacity: 0.7 },
      ]}>
      <Text style={[styles.pillText, { color: solid ? '#0B0B12' : props.accent }]}>{props.label}</Text>
    </Pressable>
  );
}

export const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: BG },
  scroll: { padding: 22, paddingTop: 72, gap: 16 },
  kicker: { color: '#6D6A8A', fontSize: 12, fontWeight: '700', letterSpacing: 2 },
  h1: { color: '#FFFFFF', fontSize: 32, fontWeight: '800', marginTop: 2 },
  sub: { color: '#9C99B8', fontSize: 14, lineHeight: 20, marginBottom: 8 },
  card: { backgroundColor: '#13121E', borderRadius: 22, borderWidth: 1, padding: 18, gap: 12 },
  cardHead: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 2 },
  iconWrap: { width: 44, height: 44, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  icon: { fontSize: 22 },
  cardTitle: { color: '#FFFFFF', fontSize: 18, fontWeight: '700' },
  cardSub: { color: '#9C99B8', fontSize: 13, marginTop: 2 },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  pill: { paddingHorizontal: 16, paddingVertical: 11, borderRadius: 999, alignItems: 'center', justifyContent: 'center' },
  pillText: { fontSize: 14, fontWeight: '700' },
  note: { color: '#75728F', fontSize: 12, lineHeight: 17 },
  footer: { color: '#56546E', fontSize: 12, textAlign: 'center', marginTop: 8, lineHeight: 17 },
  // inbox preview rows on the home card
  previewRow: { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: '#0E0D1A', borderRadius: 12, padding: 10 },
  avatarSm: { width: 32, height: 32, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  avatarSmText: { fontSize: 14, fontWeight: '800' },
  previewFrom: { color: '#FFFFFF', fontSize: 13, fontWeight: '700' },
  previewSub: { color: '#9C99B8', fontSize: 12, marginTop: 1 },
  previewUrl: { color: '#5B6B86', fontSize: 11, fontFamily: 'Menlo' },
  // top bar
  topbar: { paddingTop: 60, paddingHorizontal: 18, paddingBottom: 12, gap: 6, borderBottomWidth: 1, borderBottomColor: '#1C1B2A' },
  backBtn: { flexDirection: 'row', alignItems: 'center', gap: 2 },
  backChevron: { fontSize: 24, fontWeight: '600', marginTop: -2 },
  backText: { fontSize: 16, fontWeight: '600' },
  topTitle: { color: '#FFFFFF', fontSize: 28, fontWeight: '800' },
  // mail list
  listScroll: { padding: 14, gap: 10 },
  empty: { color: '#6D6A8A', textAlign: 'center', marginTop: 40 },
  mailRow: { flexDirection: 'row', gap: 12, backgroundColor: '#13121E', borderRadius: 16, padding: 14 },
  avatar: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontSize: 17, fontWeight: '800' },
  mailTopline: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  mailFrom: { color: '#C9C6E0', fontSize: 14, fontWeight: '700', flex: 1 },
  mailTime: { color: '#6D6A8A', fontSize: 12 },
  mailSubject: { color: '#B7B4CE', fontSize: 14, fontWeight: '600', marginTop: 2 },
  mailPreview: { color: '#75728F', fontSize: 13, marginTop: 2 },
  // message detail
  msgScroll: { padding: 18, gap: 16 },
  msgSubject: { color: '#FFFFFF', fontSize: 22, fontWeight: '800', lineHeight: 28 },
  msgFromRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  msgFrom: { color: '#FFFFFF', fontSize: 15, fontWeight: '700' },
  msgTo: { color: '#75728F', fontSize: 13, marginTop: 1 },
  msgBody: { color: '#C9C6E0', fontSize: 16, lineHeight: 24 },
  // compose
  composeWrap: { padding: 16, gap: 12, flex: 1 },
  field: { borderBottomWidth: 1, borderBottomColor: '#1C1B2A', paddingVertical: 12, flexDirection: 'row', gap: 10 },
  fieldLabel: { color: '#6D6A8A', fontSize: 14, width: 64 },
  fieldValue: { color: '#FFFFFF', fontSize: 14, flex: 1 },
  composeBody: { flex: 1, paddingVertical: 8 },
  composeBodyText: { color: '#C9C6E0', fontSize: 15, lineHeight: 22 },
  sendBtn: { backgroundColor: '#34D399', borderRadius: 14, paddingVertical: 14, alignItems: 'center' },
  sendText: { color: '#062014', fontSize: 16, fontWeight: '800' },
  // deep link badge
  dlBadge: { flexDirection: 'row', alignItems: 'center', gap: 8, justifyContent: 'center', paddingVertical: 14 },
  dlBadgeIcon: { fontSize: 12 },
  dlBadgeText: { fontSize: 12, fontFamily: 'Menlo' },
});
