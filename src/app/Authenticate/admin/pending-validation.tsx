import { useEffect } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import ReviewIllustration from '../../../../assets/images/teach-blue/review-illustration.svg';
import StatusDot from '../../../../assets/images/teach-blue/status-dot.svg';
import TimelineCheck from '../../../../assets/images/teach-blue/accepted.svg';
import TimelineClock from '../../../../assets/images/teach-blue/timeline-clock.svg';
import { TeachBlueBrand } from '../../../components/authenticate/AuthBrand';
import {
  TeachBlueCard,
  TeachBlueFooter,
  TeachBlueScreen,
} from '../../../components/authenticate/TeachBlueComponents';
import { authColors } from '../../../components/authenticate/theme';

export default function TeachBluePendingScreen() {
  const { applicantType } = useLocalSearchParams<{ applicantType?: string }>();
  const organization = applicantType === 'institution';

  // Timer 5 detik sebelum otomatis berpindah ke step peninjauan / revisi dokumen
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace({
        pathname: '/Authenticate/admin/document-revision',
        params: { applicantType: applicantType || 'individual' },
      });
    }, 5000); // 5000 ms = 5 detik

    return () => clearTimeout(timer);
  }, [applicantType]);

  return (
    <TeachBlueScreen contentStyle={styles.content}>
      <StatusBar style="light" />
      <TeachBlueBrand />
      <View style={styles.statusContent}>
        <Text style={styles.step}>PENGAJUAN TERKIRIM</Text>
        <ReviewIllustration />
        <View style={styles.statusPill}>
          <StatusDot />
          <Text style={styles.statusText}>Menunggu validasi</Text>
        </View>
        <Text style={styles.title}>Akun Teach Blue-mu sedang divalidasi oleh tim</Text>
        <Text style={styles.description}>
          Super admin sedang meninjau profil dan berkas yang kamu unggah. Hasil peninjauan akan ditampilkan pada status pengajuanmu.
        </Text>
      </View>
      <TeachBlueCard style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>
          Pengajuan {organization ? 'instansi' : 'perseorangan'}
        </Text>
        <View style={styles.timelineRow}>
          <TimelineCheck />
          <View style={styles.timelineText}>
            <Text style={styles.timelineTitle}>Profil & dokumen terkirim</Text>
            <Text style={styles.timelineDescription}>
              Berkas berhasil diterima untuk ditinjau.
            </Text>
          </View>
        </View>
        <View style={styles.timelineRow}>
          <TimelineClock />
          <View style={styles.timelineText}>
            <Text style={styles.timelineTitle}>Peninjauan super admin</Text>
            <Text style={styles.timelineDescription}>
              Status saat ini: menunggu validasi.
            </Text>
          </View>
        </View>
      </TeachBlueCard>
      <TeachBlueFooter />
</TeachBlueScreen>
  );
}

const styles = StyleSheet.create({
  content: { paddingTop: 36, paddingBottom: 42, gap: 0 },
  statusContent: { alignItems: 'center', gap: 16, paddingTop: 24 },
  step: { color: authColors.green, fontFamily: 'Nunito_700Bold', fontSize: 10, lineHeight: 20, textShadowColor: 'rgba(33,196,97,0.4)', textShadowRadius: 10 },
  statusPill: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingVertical: 4, paddingHorizontal: 12, borderRadius: 20, borderWidth: 1, borderColor: authColors.blue, backgroundColor: authColors.surface },
  statusText: { color: authColors.white, fontFamily: 'Nunito_700Bold', fontSize: 11 },
  title: { color: authColors.white, fontFamily: 'Nunito_700Bold', fontSize: 26, lineHeight: 34, textAlign: 'center', textShadowColor: 'rgba(33,196,97,0.4)', textShadowRadius: 18 },
  description: { color: authColors.muted, fontFamily: 'Nunito_400Regular', fontSize: 13, lineHeight: 20, textAlign: 'center' },
  summaryCard: { marginTop: 24, gap: 14 },
  summaryTitle: { color: authColors.white, fontFamily: 'Nunito_700Bold', fontSize: 13, lineHeight: 20 },
  timelineRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 10 },
  timelineText: { flex: 1, gap: 2 },
  timelineTitle: { color: authColors.white, fontFamily: 'Nunito_700Bold', fontSize: 12, lineHeight: 20 },
  timelineDescription: { color: authColors.muted, fontFamily: 'Nunito_400Regular', fontSize: 11, lineHeight: 20 },
});
