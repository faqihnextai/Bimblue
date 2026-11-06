// src/app/Dashboard/home.tsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';

const SUBJECTS = [
  { name: 'Matematika', icon: '📐' },
  { name: 'Fisika', icon: '⚛️' },
  { name: 'Kimia', icon: '🧪' },
  { name: 'Biologi', icon: '🧬' },
  { name: 'Bahasa Inggris', icon: '🇬🇧' },
  { name: 'Bahasa Indonesia', icon: '🇮🇩' },
];

const POPULAR_TUTORS = [
  { name: 'Kak Nabila Putri', subject: 'Matematika SMA', rate: '★ 4,9 (128)', price: 'Rp65.000 / sesi', method: 'Online / Offline' },
  { name: 'Kak Arga Pratama', subject: 'Fisika SMP & SMA', rate: '★ 4,8 (96)', price: 'Rp55.000 / sesi', method: 'Online' },
  { name: 'Kak Lestari', subject: 'Kimia SMA', rate: '★ 4,9 (74)', price: 'Rp60.000 / sesi', method: 'Offline' },
  { name: 'Kak Raka', subject: 'Biologi SMP', rate: '★ 4,7 (52)', price: 'Rp50.000 / sesi', method: 'Online' },
];

export default function UserHomeScreen() {
  const goToSearch = (query?: string) => {
    if (query) {
      router.push({
        pathname: '/Dashboard/Mhome/search',
        params: { q: query },
      });
    } else {
      router.push('/Dashboard/Mhome/search');
    }
  };

  const goToSubjects = () => {
    router.push('/Dashboard/Mhome/subjects');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <StatusBar style="dark" />

      {/* Header Top Bar */}
      <View style={styles.topBar}>
        <View style={styles.logoRow}>
          <View style={styles.logoBadge}><Text style={styles.logoBadgeText}>B</Text></View>
          <Text style={styles.brandTitle}>belajar</Text>
        </View>
        <View style={styles.avatarMini}><Text style={styles.avatarInitial}>S</Text></View>
      </View>

      {/* Heading */}
      <Text style={styles.categoryBadge}>BERANDA & DISCOVERY</Text>
      <Text style={styles.headingTitle}>Temukan pelajaran.</Text>
      <Text style={styles.headingSubtitle}>Cari tutor, kuasai materi, belajar bareng.</Text>

      {/* 1. TOMBOL SEARCH */}
      <TouchableOpacity
        style={styles.searchBar}
        activeOpacity={0.7}
        onPress={() => goToSearch()}
      >
        <Text style={styles.searchIcon}>🔍</Text>
        <Text style={styles.searchPlaceholder}>Cari bimbel, tutor, atau pelajaran</Text>
      </TouchableOpacity>

      {/* 2. MAU BELAJAR APA? -> LINK KE SUBJECTS */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Mau belajar apa?</Text>
        <TouchableOpacity activeOpacity={0.6} onPress={goToSubjects}>
          <Text style={styles.linkText}>Lainnya →</Text>
        </TouchableOpacity>
      </View>

      {/* 3. KOTAK MATA PELAJARAN -> LINK KE SEARCH DENGAN FILTER */}
      <View style={styles.subjectGrid}>
        {SUBJECTS.map((sub, i) => (
          <TouchableOpacity
            key={i}
            style={styles.subjectItem}
            activeOpacity={0.7}
            onPress={() => goToSearch(sub.name)}
          >
            <View style={styles.subjectIconBox}><Text style={{ fontSize: 20 }}>{sub.icon}</Text></View>
            <Text style={styles.subjectName}>{sub.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Bimbel & Tutor Populer */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Bimbel & tutor populer</Text>
        <TouchableOpacity activeOpacity={0.6} onPress={() => goToSearch()}>
          <Text style={styles.linkText}>Selengkapnya</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.tutorGrid}>
        {POPULAR_TUTORS.map((tutor, i) => (
          <View key={i} style={styles.tutorCard}>
            <View style={styles.cardTopRow}>
              <View style={styles.badgePilihan}><Text style={styles.badgePilihanText}>PILIHAN BELAJAR</Text></View>
              <View style={[styles.badgeMethod, tutor.method.includes('Offline') ? styles.badgeMethodOffline : styles.badgeMethodOnline]}>
                <Text style={[styles.badgeMethodText, tutor.method.includes('Offline') ? styles.badgeMethodTextOffline : styles.badgeMethodTextOnline]}>
                  {tutor.method}
                </Text>
              </View>
            </View>
            <Text style={styles.tutorRate}>{tutor.rate}</Text>
            <Text style={styles.tutorName} numberOfLines={1}>{tutor.name}</Text>
            <Text style={styles.tutorSubject}>{tutor.subject}</Text>
            <Text style={styles.tutorPrice}>{tutor.price}</Text>
          </View>
        ))}
      </View>

      {/* Komunitas Belajar */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Belajar bareng, yuk!</Text>
        <View style={styles.badgeFree}><Text style={styles.badgeFreeText}>Komunitas gratis</Text></View>
      </View>
      <View style={styles.communityCard}>
        <View style={{ flex: 1 }}>
          <Text style={styles.communityTitle}>Ruang Pejuang UTBK</Text>
          <Text style={styles.communityMeta}>1.240 anggota • Gratis selamanya</Text>
          <Text style={styles.communityDesc}>Bahas soal, berbagi tips, dan saling semangati tiap hari.</Text>
        </View>
        <TouchableOpacity
          style={styles.joinBtn}
          activeOpacity={0.8}
          onPress={() => goToSearch('Ruang Pejuang UTBK')}
        >
          <Text style={styles.joinBtnText}>Gabung</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  content: { paddingHorizontal: 20, paddingTop: 48, paddingBottom: 36 },
  topBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  logoRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  logoBadge: { width: 26, height: 26, borderRadius: 6, backgroundColor: '#2563EB', alignItems: 'center', justifyContent: 'center' },
  logoBadgeText: { color: '#FFFFFF', fontWeight: '800', fontSize: 14 },
  brandTitle: { fontSize: 18, fontWeight: '700', color: '#1E293B' },
  avatarMini: { width: 34, height: 34, borderRadius: 17, backgroundColor: '#DBEAFE', alignItems: 'center', justifyContent: 'center' },
  avatarInitial: { color: '#2563EB', fontWeight: '700' },
  categoryBadge: { fontSize: 11, fontWeight: '700', color: '#64748B', letterSpacing: 0.5, marginBottom: 4 },
  headingTitle: { fontSize: 24, fontWeight: '800', color: '#0F172A' },
  headingSubtitle: { fontSize: 13, color: '#64748B', marginTop: 4, marginBottom: 18 },
  searchBar: { height: 48, borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0', backgroundColor: '#F8FAFC', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, gap: 10, marginBottom: 24 },
  searchIcon: { fontSize: 16 },
  searchPlaceholder: { flex: 1, fontSize: 13, color: '#94A3B8' },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  sectionTitle: { fontSize: 15, fontWeight: '800', color: '#1E293B' },
  linkText: { fontSize: 12, fontWeight: '600', color: '#2563EB' },
  subjectGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 24 },
  subjectItem: { width: '30.5%', backgroundColor: '#F8FAFC', borderRadius: 12, paddingVertical: 12, alignItems: 'center', borderWidth: 1, borderColor: '#F1F5F9' },
  subjectIconBox: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#EFF6FF', alignItems: 'center', justifyContent: 'center', marginBottom: 6 },
  subjectName: { fontSize: 11, fontWeight: '600', color: '#334155', textAlign: 'center' },
  tutorGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 24 },
  tutorCard: { width: '48%', backgroundColor: '#FFFFFF', borderRadius: 14, padding: 12, borderWidth: 1, borderColor: '#E2E8F0' },
  cardTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  badgePilihan: { paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4, backgroundColor: '#EFF6FF' },
  badgePilihanText: { fontSize: 8, fontWeight: '700', color: '#2563EB' },
  badgeMethod: { paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
  badgeMethodOnline: { backgroundColor: '#EFF6FF' },
  badgeMethodOffline: { backgroundColor: '#FEF3C7' },
  badgeMethodText: { fontSize: 8, fontWeight: '700' },
  badgeMethodTextOnline: { color: '#2563EB' },
  badgeMethodTextOffline: { color: '#B45309' },
  tutorRate: { fontSize: 11, color: '#F59E0B', fontWeight: '700', marginBottom: 4 },
  tutorName: { fontSize: 13, fontWeight: '700', color: '#1E293B' },
  tutorSubject: { fontSize: 11, color: '#64748B', marginBottom: 8 },
  tutorPrice: { fontSize: 12, fontWeight: '700', color: '#0F172A' },
  badgeFree: { backgroundColor: '#DCFCE7', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 20 },
  badgeFreeText: { fontSize: 10, fontWeight: '700', color: '#15803D' },
  communityCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F8FAFC', padding: 14, borderRadius: 14, borderWidth: 1, borderColor: '#E2E8F0', gap: 12 },
  communityTitle: { fontSize: 14, fontWeight: '700', color: '#1E293B' },
  communityMeta: { fontSize: 11, color: '#64748B', marginVertical: 2 },
  communityDesc: { fontSize: 11, color: '#475569' },
  joinBtn: { backgroundColor: '#2563EB', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 8 },
  joinBtnText: { color: '#FFFFFF', fontWeight: '700', fontSize: 12 },
});
