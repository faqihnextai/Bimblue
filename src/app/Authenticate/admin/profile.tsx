import { useState } from 'react';
import type { ReactNode } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import type * as DocumentPicker from 'expo-document-picker';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import UserIcon from '../../../../assets/images/teach-blue/user.svg';
import BuildingIcon from '../../../../assets/images/teach-blue/building.svg';
import CheckCircle from '../../../../assets/images/teach-blue/check-circle.svg';
import {
  AuthPrimaryButton,
  AuthTextField,
} from '../../../components/authenticate/AuthControls';
import { FileUploadCard } from '../../../components/authenticate/FileUploadCard';
import { TeachBlueBrand } from '../../../components/authenticate/AuthBrand';
import {
  TeachBlueFooter,
  TeachBlueSectionTitle,
  TeachBlueScreen,
} from '../../../components/authenticate/TeachBlueComponents';
import { authColors } from '../../../components/authenticate/theme';

type ApplicantType = 'individual' | 'institution';
type UploadKey = 'identity' | 'qualification' | 'license' | 'ownerIdentity';

export default function TeachBlueProfileScreen() {
  const { email: emailParam } = useLocalSearchParams<{ email?: string }>();
  const email = emailParam ?? '';
  const [applicantType, setApplicantType] = useState<ApplicantType>('individual');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [bio, setBio] = useState('');
  const [institutionName, setInstitutionName] = useState('');
  const [institutionPhone, setInstitutionPhone] = useState('');
  const [representative, setRepresentative] = useState('');
  const [institutionBio, setInstitutionBio] = useState('');
  const [consent, setConsent] = useState(false);
  const [uploads, setUploads] = useState<
    Partial<Record<UploadKey, DocumentPicker.DocumentPickerAsset>>
  >({});

  const setUpload = (key: UploadKey) =>
    (file: DocumentPicker.DocumentPickerAsset) =>
      setUploads((current) => ({ ...current, [key]: file }));

  const isIndividual = applicantType === 'individual';
  const profileComplete = isIndividual
    ? fullName.trim().length > 0 && phone.trim().length > 0 && bio.trim().length > 0
    : institutionName.trim().length > 0 &&
      institutionPhone.trim().length > 0 &&
      representative.trim().length > 0 &&
      institutionBio.trim().length > 0;
  const documentsComplete = isIndividual
    ? Boolean(uploads.identity && uploads.qualification)
    : Boolean(uploads.license && uploads.ownerIdentity);
  const canSubmit = profileComplete && documentsComplete && consent;

  const submitApplication = () => {
    if (!canSubmit) return;
    router.push({
      pathname: '/Authenticate/admin/pending-validation',
      params: {
        email,
        applicantType,
      },
    });
  };

  return (
    <View style={styles.screen}>
      <StatusBar style="light" />
      <TeachBlueScreen
        contentStyle={styles.content}
        scrollProps={{ contentContainerStyle: styles.content }}
      >
        <TeachBlueBrand />
        <View style={styles.heading}>
          <Text style={styles.step}>LANGKAH 3 DARI 3 · PROFIL & DOKUMEN</Text>
          <Text style={styles.title}>
            {isIndividual
              ? 'Daftar sebagai\ntutor independen'
              : 'Daftarkan\nlembaga bimbelmu'}
          </Text>
          <Text style={styles.description}>
            {isIndividual
              ? 'Untuk pengajar perorangan atau freelance. Lengkapi profil dan dokumen untuk ditinjau.'
              : 'Untuk badan usaha, yayasan, atau lembaga bimbingan belajar yang terorganisir.'}
          </Text>
        </View>
        <View style={styles.form}>
          <View style={styles.choiceSection}>
            <Text style={styles.sectionLabel}>Tipe pendaftar</Text>
            <View style={styles.choices}>
              <TypeChoice
                label="Perseorangan"
                selected={isIndividual}
                onPress={() => setApplicantType('individual')}
                icon={<UserIcon />}
              />
              <TypeChoice
                label="Instansi"
                selected={!isIndividual}
                onPress={() => setApplicantType('institution')}
                icon={<BuildingIcon />}
              />
            </View>
            <Text style={styles.hint}>
              Pilih salah satu sesuai profilmu. Cukup lengkapi form pada tipe yang dipilih.
            </Text>
          </View>

          <View style={styles.accountCard}>
            <View style={styles.accountHeading}>
              <CheckCircle />
              <Text style={styles.accountTitle}>
                {isIndividual ? 'Data akun' : 'Data akun lembaga'}
              </Text>
            </View>
            <Text style={styles.accountText}>Email: {email || '—'}</Text>
            <Text style={styles.accountText}>Password: ••••••••••</Text>
            <Text style={styles.hint}>
              Sudah dibuat saat registrasi. Tidak perlu membuat ulang email dan password.
            </Text>
          </View>

          <View style={styles.section}>
            <TeachBlueSectionTitle>
              {isIndividual ? 'Data pengajar' : 'Data lembaga'}
            </TeachBlueSectionTitle>
            {isIndividual ? (
              <>
                <AuthTextField
                  label="Nama Lengkap (sesuai KTP)"
                  theme="teach"
                  value={fullName}
                  onChangeText={setFullName}
                  placeholder="Nama sesuai dokumen identitas"
                  autoCapitalize="words"
                />
                <AuthTextField
                  label="Nomor Telepon / WhatsApp"
                  theme="teach"
                  value={phone}
                  onChangeText={setPhone}
                  placeholder="0812 3456 7890"
                  keyboardType="phone-pad"
                />
                <AuthTextField
                  label="Bio & Deskripsi Pengajar"
                  theme="teach"
                  value={bio}
                  onChangeText={setBio}
                  placeholder="Ceritakan pengalaman mengajar, mata pelajaran, dan portofolio."
                  multiline
                />
              </>
            ) : (
              <>
                <AuthTextField
                  label="Nama Resmi Lembaga / Instansi Bimbel"
                  theme="teach"
                  value={institutionName}
                  onChangeText={setInstitutionName}
                  placeholder="Nama resmi lembaga"
                  autoCapitalize="words"
                />
                <AuthTextField
                  label="Nomor Kontak / Telepon Resmi Lembaga"
                  theme="teach"
                  value={institutionPhone}
                  onChangeText={setInstitutionPhone}
                  placeholder="021 5550 1234"
                  keyboardType="phone-pad"
                />
                <AuthTextField
                  label="Nama Penanggung Jawab Lembaga"
                  theme="teach"
                  value={representative}
                  onChangeText={setRepresentative}
                  placeholder="Nama penanggung jawab"
                  autoCapitalize="words"
                />
                <AuthTextField
                  label="Profil & Portofolio Lembaga"
                  theme="teach"
                  value={institutionBio}
                  onChangeText={setInstitutionBio}
                  placeholder="Ceritakan profil lembaga, program, dan pengalaman."
                  multiline
                />
              </>
            )}
          </View>

          <View style={styles.section}>
            <View style={styles.documentHeading}>
              <TeachBlueSectionTitle>Dokumen verifikasi</TeachBlueSectionTitle>
              <Text style={styles.hint}>Pastikan dokumen asli, jelas, dan seluruh bagiannya terlihat agar dapat ditinjau.</Text>
            </View>
            {isIndividual ? (
              <>
                <FileUploadCard
                  label="KTP"
                  description="Bukti identitas resmi. Nama dan NIK harus terbaca dengan jelas."
                  onFileSelected={setUpload('identity')}
                />
                <FileUploadCard
                  label="Ijazah / Sertifikasi Pengajar"
                  description="Bukti kualifikasi akademik dan kompetensi mengajar."
                  onFileSelected={setUpload('qualification')}
                />
              </>
            ) : (
              <>
                <FileUploadCard
                  label="Izin Lembaga"
                  description="Surat izin operasional, NIB, atau legalitas resmi pendirian lembaga."
                  onFileSelected={setUpload('license')}
                />
                <FileUploadCard
                  label="KTP Penanggung Jawab / Pemilik"
                  description="Bukti identitas resmi penanggung jawab atau pemilik lembaga."
                  onFileSelected={setUpload('ownerIdentity')}
                />
                <FileUploadCard
                  label="Ijazah / Sertifikat Pengajar Utama"
                  description="Bukti kualifikasi pengajar utama yang dinaungi lembaga. Tidak wajib diunggah."
                  required={false}
                  onFileSelected={setUpload('qualification')}
                />
              </>
            )}
          </View>

          <Pressable
            accessibilityRole="checkbox"
            accessibilityState={{ checked: consent }}
            onPress={() => setConsent((current) => !current)}
            style={styles.consent}
          >
            <View style={[styles.checkbox, consent && styles.checkboxChecked]}>
              {consent && <Text style={styles.checkmark}>✓</Text>}
            </View>
            <Text style={styles.consentText}>
              {isIndividual
                ? 'Dengan mengajukan, saya menyatakan data dan dokumen yang diberikan benar dan milik saya.'
                : 'Saya berwenang mewakili lembaga dan menyatakan data serta dokumen yang diberikan benar.'}
            </Text>
          </Pressable>
          <AuthPrimaryButton
            theme="teach"
            label="Ajukan verifikasi"
            onPress={submitApplication}
            disabled={!canSubmit}
          />
          <Text style={styles.submitHint}>
            Pengajuan akan ditinjau oleh super admin sebelum kamu mulai mengajar.
          </Text>
        </View>
        <TeachBlueFooter />
      </TeachBlueScreen>
    </View>
  );
}

function TypeChoice({
  label,
  selected,
  onPress,
  icon,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
  icon: ReactNode;
}) {
  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityState={{ selected }}
      onPress={onPress}
      style={[styles.choice, selected && styles.choiceSelected]}
    >
      {icon}
      <Text style={[styles.choiceText, selected && styles.choiceTextSelected]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: authColors.dark },
  content: { paddingTop: 36, paddingBottom: 48, gap: 24 },
  heading: { gap: 8 },
  step: { color: authColors.green, fontFamily: 'Nunito_700Bold', fontSize: 10, lineHeight: 20 },
  title: { color: authColors.white, fontFamily: 'Nunito_700Bold', fontSize: 28, lineHeight: 36 },
  description: { color: authColors.muted, fontFamily: 'Nunito_400Regular', fontSize: 13, lineHeight: 20 },
  form: { gap: 24 },
  choiceSection: { gap: 8 },
  sectionLabel: { color: authColors.white, fontFamily: 'Nunito_700Bold', fontSize: 13 },
  choices: { flexDirection: 'row', gap: 8 },
  choice: { flex: 1, height: 48, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, borderRadius: 12, borderWidth: 1, borderColor: 'rgba(37,99,235,0.2)', backgroundColor: authColors.dark },
  choiceSelected: { backgroundColor: authColors.surface, borderColor: authColors.blue, shadowColor: authColors.green, shadowOpacity: 0.2, shadowRadius: 14, shadowOffset: { width: 0, height: 0 } },
  choiceText: { color: authColors.muted, fontFamily: 'Nunito_700Bold', fontSize: 12 },
  choiceTextSelected: { color: authColors.white },
  hint: { color: authColors.muted, fontFamily: 'Nunito_400Regular', fontSize: 11, lineHeight: 20 },
  accountCard: { gap: 8, backgroundColor: authColors.surface, borderRadius: 12, padding: 14, borderWidth: 1, borderColor: 'rgba(37,99,235,0.2)' },
  accountHeading: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  accountTitle: { color: authColors.white, fontFamily: 'Nunito_700Bold', fontSize: 13, lineHeight: 20 },
  accountText: { color: authColors.white, fontFamily: 'Nunito_400Regular', fontSize: 12, lineHeight: 20 },
  section: { gap: 14 },
  documentHeading: { gap: 6 },
  consent: { flexDirection: 'row', alignItems: 'flex-start', gap: 10 },
  checkbox: { width: 20, height: 20, borderWidth: 1, borderColor: authColors.blue, borderRadius: 5, alignItems: 'center', justifyContent: 'center' },
  checkboxChecked: { backgroundColor: authColors.blue },
  checkmark: { color: authColors.white, fontSize: 14, lineHeight: 18 },
  consentText: { flex: 1, color: authColors.muted, fontFamily: 'Nunito_400Regular', fontSize: 11, lineHeight: 20 },
  submitHint: { color: authColors.muted, fontFamily: 'Nunito_400Regular', fontSize: 11, lineHeight: 20, textAlign: 'center' },
});
