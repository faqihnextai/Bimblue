/**
 * 09 — Splash Motivasi
 */
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function MotivationSplashScreen() {
  useEffect(() => {
    const timer = setTimeout(() => router.replace('/explore'), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.blobTopLeft} />
      <View style={styles.blobBottomRight} />
      <View style={styles.identity}>
        <View style={styles.logoIcon}><Text style={styles.logoLetter}>B</Text></View>
        <Text style={styles.logoText}>Bimblue</Text>
      </View>
      <View style={styles.illustrationArea}><Text style={styles.illustrationEmoji}>🌱📚✨</Text></View>
      <View style={styles.copySection}>
        <Text style={styles.headline}>Selamat bergabung!{'\n'}Mari tumbuh bersama ilmu.</Text>
        <Text style={styles.subtext}>Mulai perjalanan belajarmu bersama Bimblue dan raih potensi terbaik dirimu.</Text>
      </View>
      <View style={styles.loaderRow}>
        <View style={[styles.loaderDot, styles.loaderDotActive]} />
        <View style={styles.loaderDot} />
        <View style={styles.loaderDot} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 32, gap: 32 },
  blobTopLeft: { position: 'absolute', top: -40, left: -60, width: 260, height: 260, borderRadius: 130, backgroundColor: '#DBEBFe', opacity: 0.5 },
  blobBottomRight: { position: 'absolute', bottom: -60, right: -60, width: 220, height: 220, borderRadius: 110, backgroundColor: '#DCFCE7', opacity: 0.5 },
  identity: { alignItems: 'center', gap: 10 },
  logoIcon: { width: 64, height: 64, borderRadius: 16, backgroundColor: '#2563EB', alignItems: 'center', justifyContent: 'center', shadowColor: '#2563EB', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.3, shadowRadius: 16, elevation: 8 },
  logoLetter: { color: '#FFFFFF', fontSize: 32, fontWeight: '700' },
  logoText: { fontSize: 26, fontWeight: '700', color: '#2563EB' },
  illustrationArea: { width: 200, height: 200, borderRadius: 24, backgroundColor: '#EFF6FF', alignItems: 'center', justifyContent: 'center' },
  illustrationEmoji: { fontSize: 64 },
  copySection: { alignItems: 'center', gap: 12 },
  headline: { fontSize: 26, fontWeight: '700', color: '#111827', textAlign: 'center', lineHeight: 34 },
  subtext: { fontSize: 15, color: '#60646C', textAlign: 'center', lineHeight: 22 },
  loaderRow: { flexDirection: 'row', gap: 8, marginTop: 8 },
  loaderDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#BFDBFE' },
  loaderDotActive: { backgroundColor: '#2563EB', width: 24 },
});
