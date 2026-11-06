// src/app/Dashboard/Mhome/subjects.tsx
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const ALL_SUBJECTS = [
  { id: "1", name: "Matematika", icon: "📐" },
  { id: "2", name: "Fisika", icon: "⚛️" },
  { id: "3", name: "Kimia", icon: "🧪" },
  { id: "4", name: "Biologi", icon: "🧬" },
  { id: "5", name: "Bahasa Inggris", icon: "🇬🇧" },
  { id: "6", name: "Bahasa Indonesia", icon: "🇮🇩" },
  { id: "7", name: "Ekonomi", icon: "📊" },
  { id: "8", name: "Sejarah", icon: "🏛️" },
  { id: "9", name: "Geografi", icon: "🌍" },
  { id: "10", name: "Sosiologi", icon: "👥" },
  { id: "11", name: "Informatika", icon: "💻" },
  { id: "12", name: "PPKn", icon: "⚖️" },
  { id: "13", name: "Bahasa Arab", icon: "🕌" },
  { id: "14", name: "Seni Budaya", icon: "🎨" },
  { id: "15", name: "Pendidikan Agama", icon: "📖" },
];

export default function MauBelajarApaScreen() {
  useEffect(() => {
    console.log("🟢 [MOUNT] Layar subjects.tsx berhasil dibuka!");
  }, []);

  const [selectedIds, setSelectedIds] = useState<string[]>(["1", "2", "5"]); // Default contoh: MTK, Fisika, B.Inggris

  const toggleSubject = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const selectedSubjects = ALL_SUBJECTS.filter((s) =>
    selectedIds.includes(s.id),
  );

  const handleSearch = () => {
    const query = selectedSubjects.map((s) => s.name).join(", ");
    router.push({
      pathname: "/Dashboard/Mhome/search",
      params: { q: query },
    });
  };

  return (
    <View style={styles.screen}>
      <StatusBar style="dark" />

      {/* Top Bar Navigasi */}
      <View style={styles.topBar}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => { if (router.canGoBack()) { router.back(); } else { router.replace('/Dashboard/home'); } }}
          activeOpacity={0.7}
        >
          <Text style={styles.backBtnText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.topBarTitle}>Pelajaran</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Mau belajar apa?</Text>
        <Text style={styles.subtitle}>
          Pilih satu atau beberapa pelajaran yang kamu mau.
        </Text>

        {/* Section Header Grid */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Semua pelajaran</Text>
          <Text style={styles.sectionCount}>{ALL_SUBJECTS.length} pilihan</Text>
        </View>

        {/* Grid 15 Mata Pelajaran */}
        <View style={styles.grid}>
          {ALL_SUBJECTS.map((sub) => {
            const isSelected = selectedIds.includes(sub.id);
            return (
              <TouchableOpacity
                key={sub.id}
                style={[styles.card, isSelected && styles.cardSelected]}
                onPress={() => toggleSubject(sub.id)}
                activeOpacity={0.7}
              >
                <View
                  style={[
                    styles.iconCircle,
                    isSelected && styles.iconCircleSelected,
                  ]}
                >
                  <Text style={styles.iconText}>{sub.icon}</Text>
                </View>
                <Text
                  style={[
                    styles.cardText,
                    isSelected && styles.cardTextSelected,
                  ]}
                  numberOfLines={2}
                >
                  {sub.name}
                </Text>
                {isSelected && (
                  <View style={styles.checkBadge}>
                    <Text style={styles.checkBadgeText}>✓</Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Ringkasan Pilihan Aktif */}
        {selectedSubjects.length > 0 && (
          <View style={styles.selectedBox}>
            <Text style={styles.selectedTitle}>
              {selectedSubjects.length} pelajaran dipilih
            </Text>
            <Text style={styles.selectedSub}>
              Pilihanmu siap untuk dicari. Yuk, temukan tutor!
            </Text>
            <View style={styles.chipsRow}>
              {selectedSubjects.map((s) => (
                <TouchableOpacity
                  key={s.id}
                  style={styles.chip}
                  onPress={() => toggleSubject(s.id)}
                >
                  <Text style={styles.chipText}>{s.name} ✕</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
      </ScrollView>

      {/* Floating Action Button di Bawah */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={[
            styles.searchBtn,
            selectedSubjects.length === 0 && styles.searchBtnDisabled,
          ]}
          onPress={handleSearch}
          disabled={selectedSubjects.length === 0}
          activeOpacity={0.8}
        >
          <Text style={styles.searchBtnText}>
            🔍 Cari Bimbel & Tutor ({selectedSubjects.length})
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#FFFFFF" },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 48,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F8FAFC",
    alignItems: "center",
    justifyContent: "center",
  },
  backBtnText: { fontSize: 20, color: "#1E293B", fontWeight: "700" },
  topBarTitle: { fontSize: 16, fontWeight: "700", color: "#0F172A" },
  content: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 100 },
  title: { fontSize: 26, fontWeight: "800", color: "#0F172A" },
  subtitle: { fontSize: 14, color: "#64748B", marginTop: 4, marginBottom: 20 },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: { fontSize: 14, fontWeight: "700", color: "#1E293B" },
  sectionCount: { fontSize: 12, color: "#64748B" },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    justifyContent: "space-between",
  },
  card: {
    width: "31%",
    minHeight: 96,
    backgroundColor: "#F8FAFC",
    borderRadius: 14,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: "#F1F5F9",
    position: "relative",
  },
  cardSelected: { backgroundColor: "#EFF6FF", borderColor: "#2563EB" },
  iconCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 6,
  },
  iconCircleSelected: { backgroundColor: "#DBEAFE" },
  iconText: { fontSize: 20 },
  cardText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#475569",
    textAlign: "center",
  },
  cardTextSelected: { color: "#2563EB", fontWeight: "700" },
  checkBadge: {
    position: "absolute",
    top: 6,
    right: 6,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#2563EB",
    alignItems: "center",
    justifyContent: "center",
  },
  checkBadgeText: { color: "#FFFFFF", fontSize: 10, fontWeight: "800" },
  selectedBox: {
    marginTop: 24,
    padding: 16,
    borderRadius: 14,
    backgroundColor: "#F0FDF4",
    borderWidth: 1,
    borderColor: "#BBF7D0",
  },
  selectedTitle: { fontSize: 14, fontWeight: "700", color: "#166534" },
  selectedSub: {
    fontSize: 12,
    color: "#15803D",
    marginTop: 2,
    marginBottom: 10,
  },
  chipsRow: { flexDirection: "row", flexWrap: "wrap", gap: 6 },
  chip: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#86EFAC",
  },
  chipText: { fontSize: 11, fontWeight: "600", color: "#15803D" },
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#F1F5F9",
  },
  searchBtn: {
    height: 50,
    borderRadius: 12,
    backgroundColor: "#2563EB",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#2563EB",
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  searchBtnDisabled: { backgroundColor: "#94A3B8" },
  searchBtnText: { color: "#FFFFFF", fontSize: 15, fontWeight: "700" },
});
