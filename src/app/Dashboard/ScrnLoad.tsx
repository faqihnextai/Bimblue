import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function UserScrnLoad() {
  useEffect(() => {
    // Menunggu 2 detik lalu masuk ke menu utama Home
    const timer = setTimeout(() => {
      router.replace('/Dashboard/home');
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Header Top Bar */}
      <View style={styles.topBar}>
        <View style={styles.logoRow}>
          <View style={styles.logoBadge}><Text style={styles.logoBadgeText}>B</Text></View>
          <Text style={styles.brandTitle}>belajar</Text>
        </View>
        <View style={styles.profilePlaceholder} />
      </View>

      {/* Hero Section */}
      <View style={styles.heroSection}>
        <Text style={styles.categoryBadge}>BERANDA & DISCOVERY</Text>
        <Text style={styles.headingTitle}>Temukan pelajaran.</Text>
        <Text style={styles.headingSubtitle}>
          Cari kelas, tutor, dan komunitas belajar. Mulai dari sini.
        </Text>
      </View>

      {/* Search Bar Skeleton */}
      <View style={styles.searchSkeleton}>
        <View style={styles.searchIconSkeleton} />
        <Text style={styles.searchPlaceholderText}>Menyiapkan kelas & komunitas belajar...</Text>
      </View>

      {/* Skeletons: Kelas & Tutor */}
      <View style={styles.section}>
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Kelas & tutor</Text>
          <Text style={styles.sectionStatus}>Memuat kelas</Text>
        </View>
        <View style={styles.circlesRow}>
          {[1, 2, 3, 4].map((i) => (
            <View key={i} style={styles.circleSkeleton} />
          ))}
        </View>
      </View>

      {/* Skeletons: Komunitas Belajar */}
      <View style={styles.section}>
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Komunitas belajar</Text>
          <Text style={styles.sectionStatus}>Memuat komunitas</Text>
        </View>
        <View style={styles.cardSkeleton} />
        <View style={styles.cardSkeleton} />
      </View>

      <Text style={styles.bottomInfoText}>Lagi mencari kelas & komunitas belajar untukmu...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF', paddingHorizontal: 20, paddingTop: 48 },
  topBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  logoRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  logoBadge: { width: 26, height: 26, borderRadius: 6, backgroundColor: '#2563EB', alignItems: 'center', justifyContent: 'center' },
  logoBadgeText: { color: '#FFFFFF', fontWeight: '800', fontSize: 14 },
  brandTitle: { fontSize: 18, fontWeight: '700', color: '#1E293B' },
  profilePlaceholder: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#E2E8F0' },
  heroSection: { marginBottom: 16 },
  categoryBadge: { fontSize: 11, fontWeight: '700', color: '#64748B', letterSpacing: 0.5, marginBottom: 4 },
  headingTitle: { fontSize: 24, fontWeight: '800', color: '#0F172A' },
  headingSubtitle: { fontSize: 13, color: '#64748B', marginTop: 4 },
  searchSkeleton: { height: 44, borderRadius: 12, backgroundColor: '#F1F5F9', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, gap: 10, marginBottom: 24 },
  searchIconSkeleton: { width: 16, height: 16, borderRadius: 8, backgroundColor: '#CBD5E1' },
  searchPlaceholderText: { fontSize: 12, color: '#94A3B8' },
  section: { marginBottom: 20 },
  sectionHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  sectionTitle: { fontSize: 14, fontWeight: '700', color: '#1E293B' },
  sectionStatus: { fontSize: 11, color: '#94A3B8' },
  circlesRow: { flexDirection: 'row', justifyContent: 'space-between' },
  circleSkeleton: { width: 62, height: 62, borderRadius: 31, backgroundColor: '#F1F5F9' },
  cardSkeleton: { height: 74, borderRadius: 14, backgroundColor: '#F1F5F9', marginBottom: 12 },
  bottomInfoText: { textAlign: 'center', fontSize: 12, color: '#94A3B8', marginTop: 8 },
});