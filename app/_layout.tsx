import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { addUserInteractionListener } from 'expo-widgets';
import { useEffect } from 'react';

import { GOAL, Hydration, useGlasses } from '../lib/hydration';
import { INBOX, unreadCount } from '../lib/mail';
import { colors } from '../lib/ui';
import DayArcWidget from '../widgets/DayArcWidget';
import HydrationWidget from '../widgets/HydrationWidget';
import MailWidget from '../widgets/MailWidget';

export default function RootLayout() {
  const glasses = useGlasses();

  // Keep the Hydration widget in sync with the shared store.
  useEffect(() => {
    HydrationWidget.updateSnapshot({ glasses, goal: GOAL });
  }, [glasses]);

  // One-time widget setup: push the two inbox previews + the Day Arc timeline.
  useEffect(() => {
    MailWidget.updateSnapshot({
      unread: unreadCount(),
      items: INBOX.slice(0, 2).map((m) => ({
        id: m.id,
        from: m.from,
        subject: m.subject,
        time: m.time,
        unread: !!m.unread,
        color: m.color,
      })),
    });

    const entries = [];
    const now = Date.now();
    for (let i = 0; i < 48; i++) {
      entries.push({ date: new Date(now + i * 30 * 60 * 1000), props: { wakeHour: 7, sleepHour: 23 } });
    }
    DayArcWidget.updateTimeline(entries);

    // Hydration +/- taps coming from the widget.
    const sub = addUserInteractionListener((e) => {
      if (e.source === 'HydrationWidget') Hydration.add(e.target === 'increment' ? 1 : -1);
    });
    return () => sub.remove();
  }, []);

  return (
    <>
      <Stack
        screenOptions={{
          headerLargeTitle: true,
          headerShadowVisible: false,
          headerBackButtonDisplayMode: 'minimal',
          contentStyle: { backgroundColor: colors.background },
        }}>
        <Stack.Screen name="index" options={{ title: 'Widget Studio' }} />
        <Stack.Screen name="mail/message/[id]" options={{ headerLargeTitle: false }} />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}
