import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function AdminHomeScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <StatusBar style="dark" />

      {/* Top Bar Header */}
      <View style={styles.topBar}>
        <View style={styles.logoRow}>
          <View style={styles.logoBadge}><Text style={styles.logoBadgeText}>B</Text></View>
          <Text style={styles.brandTitle}>belajar</Text>
        </View>
        <View style={styles.avatarImg}><Text style={styles.avatarText}>RP</Text></View>
      </View>

      <Text style={styles.subHeading}>DASBOR ADMIN</Text>
      <Text style={styles.greetingTitle}>Halo, Rina Pratiwi!</Text>
      <Text style={styles.orgName}>Bimbel Cendekia</Text>

      {/* Warning Visibility Banner */}
      <View style={styles.warningBanner}>
        <Text style={styles.warningIcon}>⚠️</Text>
        <View style={{ flex: 1 }}>
          <Text style={styles.warningTitle}>Akun belum terverifikasi penuh</Text>
          <Text style={styles.warningDesc}>
            2 dari 3 dokumen disetujui. Profil belum tampil di pencarian.
          </Text>
        </View>
      </View>

      {/* Quick Stats 3 Columns */}
      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>24</Text>
          <Text style={styles.statLabel}>Siswa aktif</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>128</Text>
          <Text style={styles.statLabel}>Percakapan</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>96%</Text>
          <Text style={styles.statLabel}>Tkt. Respons</Text>
        </View>
      </View>

      {/* Income Card */}
      <View style={styles.incomeCard}>
        <View style={styles.incomeHeader}>
          <Text style={styles.incomeSub}>Pendapatan Bulan ini</Text>
          <TouchableOpacity><Text style={styles.incomeLink}>Lihat pendapatan</Text></TouchableOpacity>
        </View>
        <Text style={styles.incomeValue}>Rp4.850.000</Text>
        <Text style={styles.incomeDetail}>Bruto Rp5.000.000 — Biaya layanan Rp150.000</Text>
      </View>

      {/* Weekly Activity Chart */}
      <View style={styles.chartCard}>
        <View style={styles.chartHeader}>
          <Text style={styles.cardTitle}>Aktivitas Minggu Ini</Text>
          <TouchableOpacity><Text style={styles.linkBlue}>Lihat semua</Text></TouchableOpacity>
        </View>
        <View style={styles.barChartRow}>
          {[40, 65, 80, 50, 95, 30, 20].map((h, i) => (
            <View key={i} style={styles.barCol}>
              <View style={[styles.bar, { height: h }]} />
              <Text style={styles.barDay}>
                {['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'][i]}
              </Text>
            </View>
          ))}
        </View>
        <Text style={styles.chartCaption}>Hari kerja • Akhir pekan • +18 sesi minggu ini</Text>
      </View>

      {/* Siswa Terbaru */}
      <View style={styles.sectionHeader}>
        <Text style={styles.cardTitle}>Siswa Terbaru</Text>
        <TouchableOpacity><Text style={styles.linkBlue}>Lihat semua (24)</Text></TouchableOpacity>
      </View>
      <View style={styles.listCard}>
        {[
          { name: 'Budi Santoso', sub: 'Matematika SMA', status: 'Aktif' },
          { name: 'Siti Rahayu', sub: 'Bahasa Inggris SMP', status: 'Aktif' },
          { name: 'Andi Wijaya', sub: 'Persiapan UTBK', status: 'Baru' },
        ].map((item, idx) => (
          <View key={idx} style={[styles.listItem, idx > 0 && styles.itemBorder]}>
            <View style={{ flex: 1 }}>
              <Text style={styles.itemTitle}>{item.name}</Text>
              <Text style={styles.itemSubtitle}>{item.sub}</Text>
            </View>
            <View style={[styles.statusPill, item.status === 'Baru' && styles.statusPillNew]}>
              <Text style={[styles.statusText, item.status === 'Baru' && styles.statusTextNew]}>
                {item.status}
              </Text>
            </View>
          </View>
        ))}
      </View>

      {/* Percakapan Terkini */}
      <View style={styles.sectionHeader}>
        <Text style={styles.cardTitle}>Percakapan Terkini</Text>
        <TouchableOpacity><Text style={styles.linkBlue}>Lihat semua</Text></TouchableOpacity>
      </View>
      <View style={styles.listCard}>
        {[
          { initials: 'DS', name: 'Dini Safitri', msg: 'Kak, apakah ada slot untuk les Matematika minggu ini?', time: '2m lalu' },
          { initials: 'RA', name: 'Rizky Aditya', msg: 'Halo, saya tertarik dengan paket UTBK. Bisa info lebih lanjut?', time: '15m lalu' },
        ].map((chat, idx) => (
          <View key={idx} style={[styles.chatItem, idx > 0 && styles.itemBorder]}>
            <View style={styles.chatAvatar}><Text style={styles.chatAvatarText}>{chat.initials}</Text></View>
            <View style={{ flex: 1 }}>
              <View style={styles.chatNameRow}>
                <Text style={styles.chatName}>{chat.name}</Text>
                <Text style={styles.chatTime}>{chat.time}</Text>
              </View>
              <Text style={styles.chatSnippet} numberOfLines={1}>{chat.msg}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  content: { paddingHorizontal: 20, paddingTop: 48, paddingBottom: 32 },
  topBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
  logoRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  logoBadge: { width: 26, height: 26, borderRadius: 6, backgroundColor: '#2563EB', alignItems: 'center', justifyContent: 'center' },
  logoBadgeText: { color: '#FFFFFF', fontWeight: '800', fontSize: 14 },
  brandTitle: { fontSize: 18, fontWeight: '700', color: '#1E293B' },
  avatarImg: { width: 34, height: 34, borderRadius: 17, backgroundColor: '#FDE047', alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontWeight: '700', color: '#854D0E', fontSize: 12 },
  subHeading: { fontSize: 10, fontWeight: '800', color: '#64748B', letterSpacing: 0.8 },
  greetingTitle: { fontSize: 24, fontWeight: '800', color: '#0F172A', marginTop: 2 },
  orgName: { fontSize: 13, color: '#64748B', marginBottom: 16 },
  warningBanner: { flexDirection: 'row', backgroundColor: '#FEF3C7', padding: 12, borderRadius: 12, gap: 10, marginBottom: 16, borderWidth: 1, borderColor: '#FDE68A' },
  warningIcon: { fontSize: 18 },
  warningTitle: { fontSize: 12, fontWeight: '700', color: '#92400E' },
  warningDesc: { fontSize: 11, color: '#B45309', marginTop: 2 },
  statsRow: { flexDirection: 'row', gap: 10, marginBottom: 14 },
  statBox: { flex: 1, backgroundColor: '#FFFFFF', padding: 12, borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0', alignItems: 'center' },
  statValue: { fontSize: 20, fontWeight: '800', color: '#0F172A' },
  statLabel: { fontSize: 11, color: '#64748B', marginTop: 2 },
  incomeCard: { backgroundColor: '#FFFFFF', padding: 16, borderRadius: 14, borderWidth: 1, borderColor: '#E2E8F0', marginBottom: 14 },
  incomeHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  incomeSub: { fontSize: 12, color: '#64748B' },
  incomeLink: { fontSize: 11, fontWeight: '600', color: '#2563EB' },
  incomeValue: { fontSize: 24, fontWeight: '800', color: '#0F172A', marginVertical: 6 },
  incomeDetail: { fontSize: 11, color: '#94A3B8' },
  chartCard: { backgroundColor: '#FFFFFF', padding: 16, borderRadius: 14, borderWidth: 1, borderColor: '#E2E8F0', marginBottom: 20 },
  chartHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  cardTitle: { fontSize: 14, fontWeight: '700', color: '#0F172A' },
  linkBlue: { fontSize: 12, fontWeight: '600', color: '#2563EB' },
  barChartRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', height: 100, paddingBottom: 8 },
  barCol: { alignItems: 'center', width: 28 },
  bar: { width: 14, borderRadius: 6, backgroundColor: '#2563EB' },
  barDay: { fontSize: 10, color: '#94A3B8', marginTop: 6 },
  chartCaption: { fontSize: 11, color: '#94A3B8', textAlign: 'center', marginTop: 8 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  listCard: { backgroundColor: '#FFFFFF', borderRadius: 14, borderWidth: 1, borderColor: '#E2E8F0', paddingHorizontal: 14, marginBottom: 20 },
  listItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12 },
  itemBorder: { borderTopWidth: 1, borderTopColor: '#F1F5F9' },
  itemTitle: { fontSize: 13, fontWeight: '700', color: '#1E293B' },
  itemSubtitle: { fontSize: 11, color: '#64748B', marginTop: 2 },
  statusPill: { backgroundColor: '#DCFCE7', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 12 },
  statusPillNew: { backgroundColor: '#EFF6FF' },
  statusText: { fontSize: 10, fontWeight: '700', color: '#16A34A' },
  statusTextNew: { color: '#2563EB' },
  chatItem: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 12 },
  chatAvatar: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#EFF6FF', alignItems: 'center', justifyContent: 'center' },
  chatAvatarText: { fontSize: 12, fontWeight: '700', color: '#2563EB' },
  chatNameRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2 },
  chatName: { fontSize: 13, fontWeight: '700', color: '#1E293B' },
  chatTime: { fontSize: 10, color: '#94A3B8' },
  chatSnippet: { fontSize: 11, color: '#64748B' },
});