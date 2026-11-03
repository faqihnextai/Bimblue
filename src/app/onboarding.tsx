/**
 * 02–04 — Onboarding
 */
import { useRef, useState } from 'react';
import { Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View, ViewToken } from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

const { width } = Dimensions.get('window');

const SLIDES = [
  { id: '1', title: 'Belajar dengan\nsiapa pun', description: 'Terhubung dengan tutor terbaik dari seluruh Indonesia, kapan pun kamu butuh bantuan.', illustrationBg: '#EFF6FF', accent: '#BFDBFE', emoji: '👥' },
  { id: '2', title: 'Kapan pun', description: 'Jadwalkan sesi belajar sesuai waktu luangmu. Materi selalu tersedia 24 jam sehari, 7 hari seminggu.', illustrationBg: '#F0FDF4', accent: '#BBF7D0', emoji: '⏰' },
  { id: '3', title: 'Di mana pun', description: 'Akses semua materi dari mana saja, cukup dengan perangkat yang kamu miliki.', illustrationBg: '#FEFCE8', accent: '#FEF9C3', emoji: '🌍' },
];

export default function OnboardingScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems[0]) setCurrentIndex(viewableItems[0].index ?? 0);
  }).current;

const goNext = () => {
    if (currentIndex < SLIDES.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
    } else {
      router.replace('/Authenticate/login'); // Ini sudah benar
    }
  };

  const goPrev = () => {
    if (currentIndex > 0) flatListRef.current?.scrollToIndex({ index: currentIndex - 1 });
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <TouchableOpacity style={styles.skipBtn} onPress={() => router.replace('/Authenticate/login')}>
        <Text style={styles.skipText}>Lewati</Text>
      </TouchableOpacity>
      <FlatList
        ref={flatListRef}
        data={SLIDES}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
        renderItem={({ item }) => (
          <View style={{ width }}>
            <View style={[styles.illustrationArea, { backgroundColor: item.illustrationBg }]}>
              <View style={[styles.accentCircle, { backgroundColor: item.accent }]} />
              <Text style={styles.emoji}>{item.emoji}</Text>
            </View>
            <View style={styles.textContent}>
              <Text style={styles.slideTitle}>{item.title}</Text>
              <Text style={styles.slideDesc}>{item.description}</Text>
            </View>
          </View>
        )}
      />
      <View style={styles.dotsContainer}>
        {SLIDES.map((_, i) => (
          <View key={i} style={[styles.dot, i === currentIndex ? styles.dotActive : styles.dotInactive]} />
        ))}
      </View>
      <View style={styles.navRow}>
        <TouchableOpacity style={[styles.navBtn, currentIndex === 0 && styles.navBtnDisabled]} onPress={goPrev} disabled={currentIndex === 0}>
          <Text style={[styles.navBtnText, currentIndex === 0 && styles.navBtnTextDisabled]}>←</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.nextBtn} onPress={goNext}>
          <Text style={styles.nextBtnText}>{currentIndex === SLIDES.length - 1 ? 'Mulai' : 'Lanjut →'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  skipBtn: { position: 'absolute', top: 56, right: 24, zIndex: 10, paddingVertical: 8, paddingHorizontal: 16 },
  skipText: { fontSize: 14, color: '#60646C', fontWeight: '500' },
  illustrationArea: { height: 360, alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' },
  accentCircle: { position: 'absolute', width: 280, height: 280, borderRadius: 140, opacity: 0.6 },
  emoji: { fontSize: 96, zIndex: 1 },
  textContent: { paddingHorizontal: 32, paddingTop: 32, alignItems: 'center', gap: 12 },
  slideTitle: { fontSize: 28, fontWeight: '700', color: '#111827', textAlign: 'center', lineHeight: 36 },
  slideDesc: { fontSize: 15, color: '#60646C', textAlign: 'center', lineHeight: 22 },
  dotsContainer: { flexDirection: 'row', justifyContent: 'center', gap: 8, marginBottom: 24 },
  dot: { height: 8, borderRadius: 4 },
  dotActive: { width: 24, backgroundColor: '#2563EB' },
  dotInactive: { width: 8, backgroundColor: '#D1D5DB' },
  navRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 24, paddingBottom: 48, gap: 16 },
  navBtn: { width: 48, height: 48, borderRadius: 24, borderWidth: 1.5, borderColor: '#2563EB', alignItems: 'center', justifyContent: 'center' },
  navBtnDisabled: { borderColor: '#D1D5DB' },
  navBtnText: { fontSize: 18, color: '#2563EB', fontWeight: '600' },
  navBtnTextDisabled: { color: '#D1D5DB' },
  nextBtn: { flex: 1, height: 52, backgroundColor: '#2563EB', borderRadius: 14, alignItems: 'center', justifyContent: 'center', shadowColor: '#2563EB', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.25, shadowRadius: 8, elevation: 4 },
  nextBtnText: { color: '#FFFFFF', fontSize: 16, fontWeight: '600' },
});
