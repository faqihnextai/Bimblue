import { useState } from 'react';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import type * as DocumentPicker from 'expo-document-picker';
import { StyleSheet, Text, View } from 'react-native';
import AlertCircle from '../../../../assets/images/teach-blue/alert-circle.svg';
import {
  AuthFileStatusCard,
} from '../../../components/authenticate/AuthFileStatusCard';
import { AuthPrimaryButton } from '../../../components/authenticate/AuthControls';
import { FileUploadCard } from '../../../components/authenticate/FileUploadCard';
import { TeachBlueBrand } from '../../../components/authenticate/AuthBrand';
import {
  TeachBlueFooter,
  TeachBlueHeading,
  TeachBlueScreen,
} from '../../../components/authenticate/TeachBlueComponents';
import { authColors } from '../../../components/authenticate/theme';

export default function TeachBlueDocumentRevisionScreen() {
  const [replacement, setReplacement] =
    useState<DocumentPicker.DocumentPickerAsset | null>(null);

  const resubmit = () => {
    if (!replacement) return;
    router.replace({
      pathname: '/Authenticate/admin/validated',
      params: { applicantType: 'individual' },
    });
  };

  return (
    <TeachBlueScreen contentStyle={styles.content}>
      <StatusBar style="light" />
      <TeachBlueBrand />
      <TeachBlueHeading
        step="HASIL PENINJAUAN · PERSEORANGAN"
        title={'Ada berkas yang\nperlu diperbaiki'}
        description="Pengajuanmu perlu revisi pada dokumen KTP. Kamu tetap dapat melanjutkan dengan memperbaiki berkas ini."
      />
      <View style={styles.notice}>
        <AlertCircle />
        <Text style={styles.noticeText}>
          1 dokumen perlu diperbaiki. Ini bukan penolakan permanen akun.
        </Text>
      </View>
      <View style={styles.documents}>
        <View style={styles.rejectedCard}>
          <AuthFileStatusCard
            title="KTP"
            fileName="ktp_nabila.jpg · 1,2 MB"
            status="rejected"
            description="Foto KTP buram / tidak terbaca\nNama dan NIK pada KTP tidak dapat dibaca karena foto tidak fokus. Unggah ulang foto yang lebih jelas."
          />
          <Text style={styles.guidance}>
            Foto di tempat terang, hindari pantulan cahaya, dan pastikan seluruh sisi KTP terlihat tanpa terpotong.
          </Text>
          <FileUploadCard
            label="Unggah ulang KTP"
            description=""
            initialFileName={replacement?.name}
            onFileSelected={setReplacement}
            compact
          />
        </View>
        <AuthFileStatusCard
          title="Ijazah / Sertifikasi Pengajar"
          fileName="ijazah_nabila.pdf · Tidak perlu diunggah ulang."
          status="accepted"
        />
      </View>
      <View style={styles.submit}>
        <AuthPrimaryButton
          theme="teach"
          label="Kirim ulang pengajuan"
          onPress={resubmit}
          disabled={!replacement}
        />
        <Text style={styles.guidanceCenter}>
          Setelah KTP pengganti diunggah, kirim ulang agar super admin dapat meninjaunya kembali.
        </Text>
      </View>
      <TeachBlueFooter />
    </TeachBlueScreen>
  );
}

const styles = StyleSheet.create({
  content: { gap: 20 },
  notice: { flexDirection: 'row', alignItems: 'center', gap: 9, padding: 12, borderWidth: 1, borderColor: authColors.blue, borderRadius: 12, backgroundColor: authColors.surface, shadowColor: authColors.green, shadowOpacity: 0.2, shadowRadius: 14, shadowOffset: { width: 0, height: 0 } },
  noticeText: { flex: 1, color: authColors.white, fontFamily: 'Nunito_700Bold', fontSize: 12, lineHeight: 20 },
  documents: { gap: 20 },
  rejectedCard: { gap: 12, padding: 16, borderWidth: 1, borderColor: authColors.blue, borderRadius: 16, backgroundColor: authColors.surface, shadowColor: authColors.green, shadowOpacity: 0.2, shadowRadius: 14, shadowOffset: { width: 0, height: 0 } },
  guidance: { color: authColors.muted, fontFamily: 'Nunito_400Regular', fontSize: 11, lineHeight: 20 },
  submit: { gap: 12 },
  guidanceCenter: { color: authColors.muted, fontFamily: 'Nunito_400Regular', fontSize: 11, lineHeight: 20, textAlign: 'center' },
});
