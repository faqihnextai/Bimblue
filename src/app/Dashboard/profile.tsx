// src/app/Dashboard/profile.tsx
import { authSession, logoutSession } from "@/constants/authSession";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const MENU_ITEMS = [
  { icon: "👤", title: "Profil pelajar" },
  { icon: "📁", title: "Kelas tersimpan dan materi" },
  { icon: "⚙️", title: "Preferensi belajar" },
  { icon: "🔒", title: "Ganti password" },
  { icon: "🔔", title: "Notifikasi belajar" },
  { icon: "❓", title: "Bantuan & FAQ" },
];

export default function ProfileScreen() {
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  return (
    <View style={styles.screenWrapper}>
      <StatusBar style="dark" />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Top Header Brand */}
        <View style={styles.topBar}>
          <View style={styles.logoRow}>
            <View style={styles.logoBadge}>
              <Text style={styles.logoBadgeText}>B</Text>
            </View>
            <Text style={styles.brandTitle}>belajar</Text>
          </View>
        </View>

        <Text style={styles.categoryBadge}>PROFIL BELAJAR</Text>
        <Text style={styles.headingTitle}>Ruang belajarmu.</Text>
        <Text style={styles.headingSubtitle}>
          Semua tentangmu, kelas, dan komunitas belajar.
        </Text>

        {/* Profil Belajarmu Card */}
        <View style={styles.profileCard}>
          <View style={styles.profileLeft}>
            <View style={styles.avatarBig}>
              <Text style={styles.avatarBigText}>P</Text>
            </View>
            <View>
              <Text style={styles.profileName}>
                {authSession.username || "Profil belajarmu"}
              </Text>
              <Text style={styles.profileSub}>Atur profil dan belajarmu</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.editBtn} activeOpacity={0.7}>
            <Text style={styles.editBtnText}>Edit</Text>
          </TouchableOpacity>
        </View>

        {/* 2 Kotak Metrik Belajar */}
        <View style={styles.metricsRow}>
          <View style={styles.metricCard}>
            <Text style={styles.metricValue}>0</Text>
            <Text style={styles.metricLabel}>Kelas belajar</Text>
          </View>
          <View style={styles.metricCard}>
            <Text style={styles.metricValue}>0</Text>
            <Text style={styles.metricLabel}>Komunitas belajar</Text>
          </View>
        </View>

        {/* Group Menu Akun Belajar */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Akun belajar</Text>
          <Text style={styles.sectionMeta}>6 item</Text>
        </View>

        <View style={styles.menuContainer}>
          {MENU_ITEMS.map((item, idx) => (
            <TouchableOpacity
              key={idx}
              style={[styles.menuItem, idx > 0 && styles.itemDivider]}
              activeOpacity={0.6}
            >
              <View style={styles.menuLeft}>
                <Text style={styles.menuIcon}>{item.icon}</Text>
                <Text style={styles.menuLabel}>{item.title}</Text>
              </View>
              <Text style={styles.chevron}>›</Text>
            </TouchableOpacity>
          ))}

          {/* Tombol Logout Merah */}
          <TouchableOpacity
            style={[styles.menuItem, styles.itemDivider]}
            onPress={() => setShowLogoutModal(true)}
            activeOpacity={0.6}
          >
            <View style={styles.menuLeft}>
              <Text style={[styles.menuIcon, { color: "#EF4444" }]}>🚪</Text>
              <Text
                style={[
                  styles.menuLabel,
                  { color: "#EF4444", fontWeight: "700" },
                ]}
              >
                Logout
              </Text>
            </View>
            <Text style={[styles.chevron, { color: "#EF4444" }]}>›</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Modal Dialog Konfirmasi Logout Sesuai PDF */}
      <Modal visible={showLogoutModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalIconBox}>
              <Text style={{ fontSize: 24 }}>🚪</Text>
            </View>
            <Text style={styles.modalTitle}>Keluar dari akun?</Text>
            <Text style={styles.modalDescription}>
              Kamu perlu masuk kembali untuk mengakses akun.
            </Text>
            <View style={styles.modalBtnRow}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => setShowLogoutModal(false)}
                activeOpacity={0.8}
              >
                <Text style={styles.cancelBtnText}>Batal</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.logoutBtn}
                onPress={() => {
                  setShowLogoutModal(false);
                  logoutSession();
                }}
                activeOpacity={0.8}
              >
                <Text style={styles.logoutBtnText}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  screenWrapper: { flex: 1, backgroundColor: "#F8FAFC" },
  container: { flex: 1 },
  content: { paddingHorizontal: 20, paddingTop: 48, paddingBottom: 36 },
  topBar: { flexDirection: "row", alignItems: "center", marginBottom: 14 },
  logoRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  logoBadge: {
    width: 26,
    height: 26,
    borderRadius: 6,
    backgroundColor: "#2563EB",
    alignItems: "center",
    justifyContent: "center",
  },
  logoBadgeText: { color: "#FFFFFF", fontWeight: "800", fontSize: 14 },
  brandTitle: { fontSize: 18, fontWeight: "700", color: "#1E293B" },
  categoryBadge: {
    fontSize: 10,
    fontWeight: "800",
    color: "#64748B",
    letterSpacing: 0.8,
  },
  headingTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#0F172A",
    marginTop: 2,
  },
  headingSubtitle: {
    fontSize: 13,
    color: "#64748B",
    marginTop: 4,
    marginBottom: 18,
  },
  profileCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    marginBottom: 12,
  },
  profileLeft: { flexDirection: "row", alignItems: "center", gap: 12 },
  avatarBig: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#DBEAFE",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarBigText: { color: "#2563EB", fontWeight: "800", fontSize: 18 },
  profileName: { fontSize: 14, fontWeight: "700", color: "#0F172A" },
  profileSub: { fontSize: 11, color: "#64748B", marginTop: 2 },
  editBtn: {
    backgroundColor: "#EFF6FF",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#BFDBFE",
  },
  editBtnText: { color: "#2563EB", fontSize: 11, fontWeight: "700" },
  metricsRow: { flexDirection: "row", gap: 10, marginBottom: 18 },
  metricCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    alignItems: "center",
  },
  metricValue: { fontSize: 22, fontWeight: "800", color: "#0F172A" },
  metricLabel: { fontSize: 11, color: "#64748B", marginTop: 2 },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  sectionTitle: { fontSize: 14, fontWeight: "700", color: "#0F172A" },
  sectionMeta: { fontSize: 11, color: "#64748B" },
  menuContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    paddingHorizontal: 14,
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
  },
  itemDivider: { borderTopWidth: 1, borderTopColor: "#F1F5F9" },
  menuLeft: { flexDirection: "row", alignItems: "center", gap: 12 },
  menuIcon: { fontSize: 16 },
  menuLabel: { fontSize: 13, color: "#1E293B", fontWeight: "600" },
  chevron: { fontSize: 18, color: "#CBD5E1", fontWeight: "600" },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(15, 23, 42, 0.45)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  modalCard: {
    width: "100%",
    maxWidth: 320,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  modalIconBox: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#FEE2E2",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#0F172A",
    marginBottom: 6,
  },
  modalDescription: {
    fontSize: 12,
    color: "#64748B",
    textAlign: "center",
    lineHeight: 18,
    marginBottom: 18,
  },
  modalBtnRow: { flexDirection: "row", gap: 10, width: "100%" },
  cancelBtn: {
    flex: 1,
    height: 42,
    borderRadius: 10,
    backgroundColor: "#F1F5F9",
    alignItems: "center",
    justifyContent: "center",
  },
  cancelBtnText: { fontSize: 13, fontWeight: "700", color: "#475569" },
  logoutBtn: {
    flex: 1,
    height: 42,
    borderRadius: 10,
    backgroundColor: "#EF4444",
    alignItems: "center",
    justifyContent: "center",
  },
  logoutBtnText: { fontSize: 13, fontWeight: "700", color: "#FFFFFF" },
});
