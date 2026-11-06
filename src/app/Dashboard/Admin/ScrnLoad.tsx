import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function AdminScrnLoad() {
  useEffect(() => {
    // Menunggu 2 detik lalu masuk ke Dasbor Admin
    const timer = setTimeout(() => {
      router.replace('/Dashboard/Admin/home');
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Top Header */}
      <View style={styles.topBar}>
        <View style={styles.logoRow}>
          <View style={styles.logoIcon}><Text style={styles.logoLetter}>B</Text></View>
          <Text style={styles.brandTitle}>belajar</Text>
        </View>
      </View>

      {/* Center Illustration */}
      <View style={styles.centerArea}>
        <View style={styles.illustrationBox}>
          <Text style={styles.emojiArt}>📖</Text>
          <View style={styles.sparkle1} />
          <View style={styles.sparkle2} />
        </View>
        <Text style={styles.mainTitle}>Dasbor admin{'\n'}segera siap.</Text>
        <Text style={styles.description}>
          Menyiapkan laporan, pesanan, dan aktivitas kelas untukmu.
        </Text>
      </View>

      {/* Footer Info Box */}
      <View style={styles.footerNote}>
        <Text style={styles.footerSub}>Sebentar ya, dasbormu sedang disiapkan.</Text>
        <Text style={styles.footerTagline}>URUS BERSAMA. KEMBANGKAN BERSAMA.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#EFF6FF', paddingHorizontal: 28, paddingTop: 48, justifyContent: 'space-between', paddingBottom: 24 },
  topBar: { flexDirection: 'row', alignItems: 'center' },
  logoRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  logoIcon: { width: 28, height: 28, borderRadius: 6, backgroundColor: '#2563EB', alignItems: 'center', justifyContent: 'center' },
  logoLetter: { color: '#FFFFFF', fontWeight: '800', fontSize: 16 },
  brandTitle: { fontSize: 20, fontWeight: '700', color: '#1E293B' },
  centerArea: { alignItems: 'center' },
  illustrationBox: { width: 140, height: 140, borderRadius: 70, backgroundColor: '#DBEAFE', alignItems: 'center', justifyContent: 'center', marginBottom: 28, position: 'relative' },
  emojiArt: { fontSize: 56 },
  sparkle1: { position: 'absolute', top: 18, right: 24, width: 12, height: 12, borderRadius: 6, backgroundColor: '#FDE047' },
  sparkle2: { position: 'absolute', bottom: 24, left: 18, width: 8, height: 8, borderRadius: 4, backgroundColor: '#38BDF8' },
  mainTitle: { fontSize: 28, fontWeight: '800', color: '#0F172A', textAlign: 'center', lineHeight: 36, marginBottom: 12 },
  description: { fontSize: 14, color: '#475569', textAlign: 'center', lineHeight: 22, maxWidth: 280 },
  footerNote: { backgroundColor: 'rgba(255,255,255,0.7)', paddingVertical: 14, paddingHorizontal: 16, borderRadius: 12, alignItems: 'center', gap: 4 },
  footerSub: { fontSize: 12, color: '#64748B' },
  footerTagline: { fontSize: 10, fontWeight: '700', color: '#2563EB', letterSpacing: 0.8 },
});