/**
 * 01 — Splash Screen / Bimblue
 */
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function SplashScreen() {
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/onboarding'); // <-- Ubah bagian ini
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.blueHalo} />
      <View style={styles.mintAccent} />
      <View style={[styles.dot, styles.dotGreen, { top: 401, left: 310 }]} />
      <View style={[styles.dot, styles.dotBlue, { top: 420, left: 240 }]} />
      <View style={styles.logoWrapper}>
        <View style={styles.logoIcon}>
          <Text style={styles.logoLetter}>B</Text>
        </View>
        <Text style={styles.logoText}>Bimblue</Text>
        <Text style={styles.tagline}>Belajar lebih mudah, kapan pun</Text>
      </View>
    </View>
  );
}

// ... (sisanya biarkan sama seperti sebelumnya)

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center' },
  blueHalo: { position: 'absolute', top: 15, left: 5, width: 305, height: 305, borderRadius: 153, backgroundColor: '#DBEBFe', opacity: 0.6 },
  mintAccent: { position: 'absolute', top: 213, right: 0, width: 170, height: 170, borderRadius: 85, backgroundColor: '#DCFCE7', opacity: 0.7 },
  dot: { position: 'absolute', borderRadius: 99 },
  dotGreen: { width: 12, height: 12, backgroundColor: '#22C35E' },
  dotBlue: { width: 8, height: 8, backgroundColor: '#2563EB', opacity: 0.7 },
  logoWrapper: { alignItems: 'center', gap: 12 },
  logoIcon: { width: 80, height: 80, borderRadius: 20, backgroundColor: '#2563EB', alignItems: 'center', justifyContent: 'center', shadowColor: '#2563EB', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.3, shadowRadius: 16, elevation: 8, marginBottom: 8 },
  logoLetter: { color: '#FFFFFF', fontSize: 40, fontWeight: '700' },
  logoText: { fontSize: 32, fontWeight: '700', color: '#2563EB', letterSpacing: -0.5 },
  tagline: { fontSize: 14, color: '#60646C', textAlign: 'center' },
});
