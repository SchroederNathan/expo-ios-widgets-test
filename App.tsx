import { StatusBar } from 'expo-status-bar';
import { addUserInteractionListener } from 'expo-widgets';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import './widgets/MyWidget'; // registers + snapshots the widget

export default function App() {
  useEffect(() => {
    const sub = addUserInteractionListener((e) => console.log(e.source, e.target));
    return () => sub.remove();
  }, []);
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
