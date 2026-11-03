/**
 * 08 — Informasi Pengguna
 */
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import {
  AuthBackdrop,
  AuthPrimaryButton,
  AuthTextField,
} from '../../components/authenticate/AuthControls';

const SCHOOL_LEVELS = ['SD', 'SMP', 'SMA / SMK', 'Perguruan Tinggi'];
const GENDERS = ['Laki-laki', 'Perempuan'];

export default function UserInfoScreen() {
  const [fullName, setFullName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState<string | null>(null);
  const [schoolLevel, setSchoolLevel] = useState<string | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const canSubmit = !!(fullName && birthDate && gender && schoolLevel);

  return (
    <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <StatusBar style="dark" />
      <AuthBackdrop />
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <View style={styles.progressRow}>
          <View style={styles.progressDone} /><View style={styles.progressDone} /><View style={styles.progressDone} /><View style={styles.progressActive} />
        </View>
        <View style={styles.header}>
          <Text style={styles.stepLabel}>Langkah 3 dari 4</Text>
          <Text style={styles.title}>Informasi Diri</Text>
          <Text style={styles.subtitle}>Bantu kami mengenal kamu agar rekomendasi belajar semakin tepat.</Text>
        </View>
        <View style={styles.form}>
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Nama Lengkap</Text>
            <AuthTextField value={fullName} onChangeText={setFullName} placeholder="Nama sesuai dokumen resmi" autoCapitalize="words" />
          </View>
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Tanggal Lahir</Text>
            <AuthTextField value={birthDate} onChangeText={setBirthDate} placeholder="DD/MM/YYYY" keyboardType="numeric" maxLength={10} />
          </View>
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Jenis Kelamin</Text>
            <View style={styles.genderRow}>
              {GENDERS.map(g => (
                <TouchableOpacity key={g} style={[styles.genderOption, gender === g && styles.genderOptionActive]} onPress={() => setGender(g)} activeOpacity={0.8}>
                  {gender === g && <Text style={styles.checkIcon}>✓</Text>}
                  <Text style={[styles.genderText, gender === g && styles.genderTextActive]}>{g}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Jenjang Sekolah</Text>
            <TouchableOpacity style={styles.inputWrapper} onPress={() => setShowDropdown(v => !v)} activeOpacity={0.8}>
              <Text style={[styles.inputText, !schoolLevel && styles.placeholderText]}>{schoolLevel ?? 'Pilih jenjang sekolah'}</Text>
              <Text style={styles.chevron}>{showDropdown ? '▲' : '▼'}</Text>
            </TouchableOpacity>
            {showDropdown && (
              <View style={styles.dropdown}>
                {SCHOOL_LEVELS.map(level => (
                  <TouchableOpacity key={level} style={[styles.dropdownItem, schoolLevel === level && styles.dropdownItemActive]} onPress={() => { setSchoolLevel(level); setShowDropdown(false); }}>
                    <Text style={[styles.dropdownItemText, schoolLevel === level && styles.dropdownItemTextActive]}>{level}</Text>
                    {schoolLevel === level && <Text style={styles.checkIcon}>✓</Text>}
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        </View>
        <AuthPrimaryButton
          label="Selesaikan Pendaftaran"
          onPress={() => router.replace('/before/motivation-splash')}
          disabled={!canSubmit}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: '#FFFFFF' },
  container: { flexGrow: 1, paddingHorizontal: 24, paddingTop: 60, paddingBottom: 48, gap: 24 },
  blobBlue: { position: 'absolute', top: -60, left: -80, width: 240, height: 240, borderRadius: 120, backgroundColor: '#DBEBFe', opacity: 0.4 },
  progressRow: { flexDirection: 'row', gap: 6 },
  progressDone: { flex: 1, height: 4, borderRadius: 2, backgroundColor: '#2563EB' },
  progressActive: { flex: 1, height: 4, borderRadius: 2, backgroundColor: '#BFDBFE' },
  header: { gap: 8 },
  stepLabel: { fontSize: 13, color: '#2563EB', fontWeight: '600' },
  title: { fontSize: 24, fontWeight: '700', color: '#111827' },
  subtitle: { fontSize: 14, color: '#60646C', lineHeight: 20 },
  form: { gap: 16 },
  fieldGroup: { gap: 6 },
  label: { fontSize: 13, fontWeight: '600', color: '#374151' },
  inputWrapper: { flexDirection: 'row', alignItems: 'center', borderWidth: 1.5, borderColor: '#E5E7EB', borderRadius: 12, backgroundColor: '#F9FAFB', height: 48, paddingHorizontal: 14, overflow: 'hidden' },
  input: { flex: 1, fontSize: 15, color: '#111827' },
  inputText: { flex: 1, fontSize: 15, color: '#111827' },
  placeholderText: { color: '#9CA3AF' },
  chevron: { fontSize: 12, color: '#6B7280' },
  genderRow: { flexDirection: 'row', gap: 12 },
  genderOption: { flex: 1, height: 48, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, borderWidth: 1.5, borderColor: '#E5E7EB', borderRadius: 12, backgroundColor: '#F9FAFB' },
  genderOptionActive: { borderColor: '#2563EB', backgroundColor: '#EFF6FF' },
  genderText: { fontSize: 14, color: '#6B7280', fontWeight: '500' },
  genderTextActive: { color: '#2563EB', fontWeight: '600' },
  checkIcon: { fontSize: 13, color: '#2563EB', fontWeight: '700' },
  dropdown: { borderWidth: 1.5, borderColor: '#E5E7EB', borderRadius: 12, backgroundColor: '#FFFFFF', overflow: 'hidden', marginTop: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.08, shadowRadius: 8, elevation: 4 },
  dropdownItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 13, paddingHorizontal: 14, borderBottomWidth: 1, borderBottomColor: '#F3F4F6' },
  dropdownItemActive: { backgroundColor: '#EFF6FF' },
  dropdownItemText: { fontSize: 14, color: '#374151' },
  dropdownItemTextActive: { color: '#2563EB', fontWeight: '600' },
  primaryBtn: { height: 52, backgroundColor: '#2563EB', borderRadius: 14, alignItems: 'center', justifyContent: 'center', shadowColor: '#2563EB', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.25, shadowRadius: 8, elevation: 4 },
  primaryBtnDisabled: { opacity: 0.45 },
  primaryBtnText: { color: '#FFFFFF', fontSize: 16, fontWeight: '600' },
});
