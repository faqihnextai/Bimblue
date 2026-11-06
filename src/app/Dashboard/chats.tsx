// src/app/Dashboard/chats.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const TUTOR_CHATS = [
  { id: '1', name: 'Kak Nabila Putri', subject: 'Matematika · SMA', time: '09.38', msg: 'Siap! Kita bahas persamaan kuadrat sore ini, ya.', unread: 2 },
  { id: '2', name: 'Kak Arga Pratama', subject: 'Fisika · SMP & SMA', time: '08.52', msg: 'Aku sudah kirim rangkuman hukum Newton. Coba dibaca dulu, ya.', unread: 1 },
  { id: '3', name: 'Kak Lestari', subject: 'Kimia · SMA', time: 'Kemarin', msg: 'Kamu: Terima kasih, Kak! Sekarang sudah lebih paham.', unread: 0 },
];

const COMMUNITY_CHATS = [
  { id: '1', name: 'Ruang Pejuang UTBK', meta: '1.240 anggota · Gratis', time: '09.30', msg: 'Dinda: Ada yang mau bahas soal penalaran kuantitatif bareng?', unread: 12 },
  { id: '2', name: 'Kelas Bahasa Inggris Bareng', meta: '860 anggota · Gratis', time: '08.45', msg: 'Rani: Latihan speaking malam ini mulai pukul 19.00, ya!', unread: 5 },
  { id: '3', name: 'Komunitas Matematika SMA', meta: '1.120 anggota · Gratis', time: '08.10', msg: 'Fajar: Ini cara cepatku menyelesaikan soal fungsi kuadrat.', unread: 8 },
];

export default function ChatsScreen() {
  const [selectedTab, setSelectedTab] = useState<'all' | 'unpaid' | 'paid'>('all');

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <StatusBar style="dark" />

      {/* Top Header */}
      <View style={styles.topBar}>
        <View style={styles.logoRow}>
          <View style={styles.logoBadge}><Text style={styles.logoBadgeText}>B</Text></View>
          <Text style={styles.brandTitle}>belajar</Text>
        </View>
        <TouchableOpacity style={styles.searchBubble} activeOpacity={0.7}>
          <Text style={styles.searchBubbleIcon}>🔍</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.categoryBadge}>CHAT & PESANAN</Text>
      <Text style={styles.headingTitle}>Chat & pesanan.</Text>
      <Text style={styles.headingSubtitle}>Pantau percakapan, komunitas, dan pesanan belajarmu di sini.</Text>

      {/* 1. Riwayat Chat Section */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Riwayat chat</Text>
        <Text style={styles.sectionMeta}>3 percakapan</Text>
      </View>
      <View style={styles.cardGroup}>
        {TUTOR_CHATS.map((chat, idx) => (
          <TouchableOpacity key={chat.id} style={[styles.chatItem, idx > 0 && styles.itemDivider]} activeOpacity={0.7}>
            <View style={styles.avatarCircle}>
              <Text style={styles.avatarInitial}>{chat.name.charAt(4) || 'T'}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <View style={styles.rowBetween}>
                <Text style={styles.itemTitle}>{chat.name}</Text>
                <Text style={styles.timeText}>{chat.time}</Text>
              </View>
              <Text style={styles.itemSubject}>{chat.subject}</Text>
              <Text style={styles.msgSnippet} numberOfLines={1}>{chat.msg}</Text>
            </View>
            {chat.unread > 0 && (
              <View style={styles.badgeUnread}>
                <Text style={styles.badgeUnreadText}>{chat.unread}</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>

      {/* 2. Chat Komunitas Section */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Chat Komunitas</Text>
        <Text style={styles.sectionMeta}>3 komunitas</Text>
      </View>
      <View style={styles.cardGroup}>
        {COMMUNITY_CHATS.map((comm, idx) => (
          <TouchableOpacity key={comm.id} style={[styles.chatItem, idx > 0 && styles.itemDivider]} activeOpacity={0.7}>
            <View style={[styles.avatarCircle, { backgroundColor: '#DCFCE7' }]}>
              <Text style={[styles.avatarInitial, { color: '#16A34A' }]}>👥</Text>
            </View>
            <View style={{ flex: 1 }}>
              <View style={styles.rowBetween}>
                <Text style={styles.itemTitle}>{comm.name}</Text>
                <Text style={styles.timeText}>{comm.time}</Text>
              </View>
              <Text style={styles.itemSubject}>{comm.meta}</Text>
              <Text style={styles.msgSnippet} numberOfLines={1}>{comm.msg}</Text>
            </View>
            <View style={[styles.badgeUnread, { backgroundColor: '#3B82F6' }]}>
              <Text style={styles.badgeUnreadText}>{comm.unread}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* 3. Pesanan Belajar */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Pesanan</Text>
        <Text style={styles.sectionMeta}>6 pesanan</Text>
      </View>

      {/* Order Item 1 - Menunggu Pembayaran */}
      <View style={styles.orderCard}>
        <View style={styles.rowBetween}>
          <Text style={styles.orderCode}>BLJ-241024-021</Text>
          <View style={styles.pendingPill}><Text style={styles.pendingPillText}>Menunggu pembayaran</Text></View>
        </View>
        <Text style={styles.orderTopic}>Persamaan kuadrat</Text>
        <Text style={styles.orderTutor}>Kak Nabila Putri · Matematika</Text>
        <Text style={styles.orderSchedule}>25 Okt 2026 · 16.00–17.00 WIB</Text>
        <View style={[styles.rowBetween, { marginTop: 12, paddingTop: 12, borderTopWidth: 1, borderTopColor: '#F1F5F9' }]}>
          <View>
            <Text style={styles.priceLabel}>Total pembayaran</Text>
            <Text style={styles.priceValue}>Rp65.000</Text>
          </View>
          <TouchableOpacity style={styles.payBtn} activeOpacity={0.8}>
            <Text style={styles.payBtnText}>Bayar sekarang</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.footerNote}>Diskusi dan kelas belajarmu tetap aman.</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  content: { paddingHorizontal: 20, paddingTop: 48, paddingBottom: 36 },
  topBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
  logoRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  logoBadge: { width: 26, height: 26, borderRadius: 6, backgroundColor: '#2563EB', alignItems: 'center', justifyContent: 'center' },
  logoBadgeText: { color: '#FFFFFF', fontWeight: '800', fontSize: 14 },
  brandTitle: { fontSize: 18, fontWeight: '700', color: '#1E293B' },
  searchBubble: { width: 34, height: 34, borderRadius: 17, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E2E8F0', alignItems: 'center', justifyContent: 'center' },
  searchBubbleIcon: { fontSize: 13 },
  categoryBadge: { fontSize: 10, fontWeight: '800', color: '#64748B', letterSpacing: 0.8 },
  headingTitle: { fontSize: 24, fontWeight: '800', color: '#0F172A', marginTop: 2 },
  headingSubtitle: { fontSize: 13, color: '#64748B', marginTop: 4, marginBottom: 20 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, marginTop: 10 },
  sectionTitle: { fontSize: 14, fontWeight: '700', color: '#0F172A' },
  sectionMeta: { fontSize: 11, color: '#64748B' },
  cardGroup: { backgroundColor: '#FFFFFF', borderRadius: 16, borderWidth: 1, borderColor: '#E2E8F0', paddingHorizontal: 14, marginBottom: 16 },
  chatItem: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 13 },
  itemDivider: { borderTopWidth: 1, borderTopColor: '#F1F5F9' },
  avatarCircle: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#EFF6FF', alignItems: 'center', justifyContent: 'center' },
  avatarInitial: { color: '#2563EB', fontWeight: '700', fontSize: 14 },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  itemTitle: { fontSize: 13, fontWeight: '700', color: '#1E293B' },
  itemSubject: { fontSize: 11, color: '#64748B', marginVertical: 2 },
  msgSnippet: { fontSize: 12, color: '#475569' },
  timeText: { fontSize: 10, color: '#94A3B8' },
  badgeUnread: { backgroundColor: '#2563EB', minWidth: 18, height: 18, borderRadius: 9, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 5 },
  badgeUnreadText: { color: '#FFFFFF', fontSize: 10, fontWeight: '800' },
  orderCard: { backgroundColor: '#FFFFFF', borderRadius: 16, borderWidth: 1, borderColor: '#E2E8F0', padding: 14, marginBottom: 16 },
  orderCode: { fontSize: 11, fontWeight: '700', color: '#64748B' },
  pendingPill: { backgroundColor: '#FEF3C7', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 12 },
  pendingPillText: { fontSize: 10, fontWeight: '700', color: '#B45309' },
  orderTopic: { fontSize: 14, fontWeight: '700', color: '#0F172A', marginTop: 8 },
  orderTutor: { fontSize: 12, color: '#64748B', marginTop: 2 },
  orderSchedule: { fontSize: 11, color: '#94A3B8', marginTop: 2 },
  priceLabel: { fontSize: 10, color: '#94A3B8' },
  priceValue: { fontSize: 14, fontWeight: '800', color: '#0F172A' },
  payBtn: { backgroundColor: '#2563EB', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 10 },
  payBtnText: { color: '#FFFFFF', fontSize: 12, fontWeight: '700' },
  footerNote: { textAlign: 'center', fontSize: 11, color: '#94A3B8', marginTop: 12 },
});