// src/app/Dashboard/Mhome/search.tsx
import { router, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

interface SearchResult {
  id: string;
  type: "tutor" | "institution";
  name: string;
  subject: string;
  rating: string;
  method: string;
  price: string;
}

const ALL_RESULTS: SearchResult[] = [
  {
    id: "1",
    type: "tutor",
    name: "Kak Nabila Putri",
    subject: "Matematika SMA",
    rating: "★ 4,9 (128)",
    method: "Online / Offline",
    price: "Rp65.000 / sesi",
  },
  {
    id: "2",
    type: "institution",
    name: "Bimbel Akar Pintar",
    subject: "Matematika SMP & SMA",
    rating: "★ 4,8 (96)",
    method: "Online",
    price: "Rp45.000 / sesi",
  },
  {
    id: "3",
    type: "tutor",
    name: "Kak Arga Pratama",
    subject: "Fisika SMP & SMA",
    rating: "★ 4,8 (96)",
    method: "Online",
    price: "Rp55.000 / sesi",
  },
  {
    id: "4",
    type: "institution",
    name: "Bimbel Cakrawala Pintar",
    subject: "Matematika & IPA SMP",
    rating: "★ 4,9 (216)",
    method: "Online",
    price: "Rp35.000 / sesi",
  },
  {
    id: "5",
    type: "tutor",
    name: "Kak Lestari",
    subject: "Kimia SMA",
    rating: "★ 4,9 (74)",
    method: "Offline",
    price: "Rp60.000 / sesi",
  },
];

const COMMUNITIES = [
  {
    id: "1",
    name: "Komunitas Matematika SMA",
    members: "1.120 anggota · Gratis",
    desc: "Bahas soal, bagikan cara cepat, dan saling bantu PR.",
  },
  {
    id: "2",
    name: "Pejuang MTK UTBK",
    members: "846 anggota · Gratis",
    desc: "Latihan penalaran matematika dan bedah soal UTBK bareng.",
  },
];

export default function SearchDetailScreen() {
  useEffect(() => {
    console.log("🟢 [MOUNT] Layar search.tsx berhasil dibuka!");
  }, []);

  const { q } = useLocalSearchParams<{ q?: string }>();
  const [keyword, setKeyword] = useState(q ?? "");
  const [filterType, setFilterType] = useState<"all" | "tutor" | "institution">(
    "all",
  );

  // Filter logika pencarian
  const filteredResults = ALL_RESULTS.filter((item) => {
    const matchKeyword =
      keyword.trim() === "" ||
      item.name.toLowerCase().includes(keyword.toLowerCase()) ||
      item.subject.toLowerCase().includes(keyword.toLowerCase());
    const matchType = filterType === "all" || item.type === filterType;
    return matchKeyword && matchType;
  });

  return (
    <View style={styles.screen}>
      <StatusBar style="dark" />

      {/* Header Search Input Bar */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => { if (router.canGoBack()) { router.back(); } else { router.replace('/Dashboard/home'); } }}
          activeOpacity={0.7}
        >
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <View style={styles.searchBox}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Cari bimbel, tutor, atau pelajaran"
            placeholderTextColor="#94A3B8"
            value={keyword}
            onChangeText={setKeyword}
            autoFocus
          />
          {keyword.length > 0 && (
            <TouchableOpacity onPress={() => setKeyword("")}>
              <Text style={styles.clearText}>✕</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Tab Filter Kategori */}
      <View style={styles.filterRow}>
        {[
          { label: "Semua", val: "all" },
          { label: "Tutor Privat", val: "tutor" },
          { label: "Bimbel Lembaga", val: "institution" },
        ].map((f) => (
          <TouchableOpacity
            key={f.val}
            style={[
              styles.filterChip,
              filterType === f.val && styles.filterChipActive,
            ]}
            onPress={() => setFilterType(f.val as any)}
          >
            <Text
              style={[
                styles.filterText,
                filterType === f.val && styles.filterTextActive,
              ]}
            >
              {f.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Ringkasan Hasil */}
        <View style={styles.resultMetaRow}>
          <Text style={styles.resultTitle}>
            {keyword ? `Hasil untuk "${keyword}"` : "Rekomendasi Pilihan"}
          </Text>
          <Text style={styles.resultCount}>{filteredResults.length} hasil</Text>
        </View>

        {/* List Tutor & Bimbel */}
        <View style={styles.resultList}>
          {filteredResults.map((item) => (
            <View key={item.id} style={styles.resultCard}>
              <View style={styles.cardHeader}>
                <View style={styles.typeBadge}>
                  <Text style={styles.typeBadgeText}>
                    {item.type === "tutor" ? "TUTOR PRIVAT" : "BIMBEL LEMBAGA"}
                  </Text>
                </View>
                <View style={styles.methodBadge}>
                  <Text style={styles.methodBadgeText}>{item.method}</Text>
                </View>
              </View>

              <Text style={styles.itemRate}>{item.rating}</Text>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemSubject}>{item.subject}</Text>

              <View style={styles.cardFooter}>
                <Text style={styles.itemPrice}>{item.price}</Text>
                <TouchableOpacity style={styles.viewBtn} activeOpacity={0.7}>
                  <Text style={styles.viewBtnText}>Lihat</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}

          {filteredResults.length === 0 && (
            <View style={styles.emptyState}>
              <Text style={{ fontSize: 32 }}>🔍</Text>
              <Text style={styles.emptyTitle}>Pelajaran belum ditemukan</Text>
              <Text style={styles.emptySubtitle}>
                Coba cari dengan kata kunci lain seperti "Matematika" atau
                "Fisika".
              </Text>
            </View>
          )}
        </View>

        {/* Rekomendasi Komunitas Belajar */}
        <View style={styles.communitySection}>
          <Text style={styles.sectionHeaderTitle}>
            Komunitas belajar terkait
          </Text>
          {COMMUNITIES.map((comm) => (
            <View key={comm.id} style={styles.communityCard}>
              <View style={{ flex: 1 }}>
                <Text style={styles.commTitle}>{comm.name}</Text>
                <Text style={styles.commMeta}>{comm.members}</Text>
                <Text style={styles.commDesc}>{comm.desc}</Text>
              </View>
              <TouchableOpacity style={styles.joinBtn}>
                <Text style={styles.joinBtnText}>Gabung</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#F8FAFC" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 48,
    paddingBottom: 12,
    backgroundColor: "#FFFFFF",
    gap: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  backBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#F1F5F9",
    alignItems: "center",
    justifyContent: "center",
  },
  backText: { fontSize: 18, color: "#1E293B", fontWeight: "700" },
  searchBox: {
    flex: 1,
    height: 44,
    borderRadius: 12,
    backgroundColor: "#F1F5F9",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    gap: 8,
  },
  searchIcon: { fontSize: 14 },
  searchInput: { flex: 1, fontSize: 13, color: "#0F172A" },
  clearText: { fontSize: 13, color: "#94A3B8", paddingHorizontal: 4 },
  filterRow: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#FFFFFF",
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: "#F1F5F9",
  },
  filterChipActive: { backgroundColor: "#2563EB" },
  filterText: { fontSize: 11, fontWeight: "600", color: "#64748B" },
  filterTextActive: { color: "#FFFFFF" },
  content: { paddingHorizontal: 16, paddingTop: 14, paddingBottom: 40 },
  resultMetaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  resultTitle: { fontSize: 14, fontWeight: "700", color: "#0F172A" },
  resultCount: { fontSize: 12, color: "#64748B" },
  resultList: { gap: 12 },
  resultCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  typeBadge: {
    backgroundColor: "#EFF6FF",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  typeBadgeText: { fontSize: 8, fontWeight: "700", color: "#2563EB" },
  methodBadge: {
    backgroundColor: "#FEF3C7",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  methodBadgeText: { fontSize: 8, fontWeight: "700", color: "#B45309" },
  itemRate: {
    fontSize: 11,
    color: "#F59E0B",
    fontWeight: "700",
    marginBottom: 2,
  },
  itemName: { fontSize: 14, fontWeight: "700", color: "#0F172A" },
  itemSubject: {
    fontSize: 12,
    color: "#64748B",
    marginTop: 2,
    marginBottom: 10,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#F8FAFC",
  },
  itemPrice: { fontSize: 13, fontWeight: "800", color: "#0F172A" },
  viewBtn: {
    backgroundColor: "#EFF6FF",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#BFDBFE",
  },
  viewBtnText: { color: "#2563EB", fontSize: 11, fontWeight: "700" },
  emptyState: { paddingVertical: 40, alignItems: "center", gap: 6 },
  emptyTitle: { fontSize: 15, fontWeight: "700", color: "#1E293B" },
  emptySubtitle: {
    fontSize: 12,
    color: "#64748B",
    textAlign: "center",
    maxWidth: 240,
  },
  communitySection: { marginTop: 24 },
  sectionHeaderTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 10,
  },
  communityCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    gap: 10,
    marginBottom: 8,
  },
  commTitle: { fontSize: 13, fontWeight: "700", color: "#1E293B" },
  commMeta: { fontSize: 10, color: "#64748B", marginVertical: 2 },
  commDesc: { fontSize: 11, color: "#475569" },
  joinBtn: {
    backgroundColor: "#2563EB",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  joinBtnText: { color: "#FFFFFF", fontSize: 11, fontWeight: "700" },
});
