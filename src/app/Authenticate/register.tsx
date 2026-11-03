/**
 * 06 — Registrasi / Bimblue
 */
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

function PasswordRule({ met, label }: { met: boolean; label: string }) {
  return (
    <View style={styles.ruleRow}>
      <Text style={[styles.ruleDot, met ? styles.ruleMet : styles.ruleUnmet]}>{met ? '✓' : '○'}</Text>
      <Text style={[styles.ruleLabel, met ? styles.ruleLabelMet : styles.ruleLabelUnmet]}>{label}</Text>
    </View>
  );
}

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const hasMinLength = password.length >= 8;
  const hasUpper = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const passwordsMatch = password === confirmPassword && confirmPassword.length > 0;
  const canSubmit = name && email && hasMinLength && hasUpper && hasNumber && passwordsMatch;

  return (
    <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <View style={styles.blobBlue} />
        <View style={styles.header}>
          <View style={styles.logoRow}>
            <View style={styles.logoIcon}><Text style={styles.logoLetter}>B</Text></View>
            <Text style={styles.logoText}>Bimblue</Text>
          </View>
          <Text style={styles.pageTitle}>Buat akun baru</Text>
          <Text style={styles.pageSubtitle}>Daftar dan mulai perjalanan belajarmu hari ini.</Text>
        </View>
        <TouchableOpacity style={styles.googleBtn} activeOpacity={0.85}>
          <Text style={styles.googleIcon}>G</Text>
          <Text style={styles.googleBtnText}>Daftar dengan Google</Text>
        </TouchableOpacity>
        <View style={styles.dividerRow}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>atau daftar dengan email</Text>
          <View style={styles.dividerLine} />
        </View>
        <View style={styles.form}>
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Nama Lengkap</Text>
            <View style={styles.inputWrapper}><TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Nama lengkapmu" placeholderTextColor="#9CA3AF" autoCapitalize="words" /></View>
          </View>
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Email</Text>
            <View style={styles.inputWrapper}><TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="contoh@email.com" placeholderTextColor="#9CA3AF" keyboardType="email-address" autoCapitalize="none" /></View>
          </View>
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Kata Sandi</Text>
            <View style={styles.inputWrapper}>
              <TextInput style={[styles.input, styles.inputPr]} value={password} onChangeText={setPassword} placeholder="Buat kata sandi" placeholderTextColor="#9CA3AF" secureTextEntry={!showPassword} autoCapitalize="none" />
              <Pressable onPress={() => setShowPassword(v => !v)} style={styles.eyeBtn} hitSlop={8}><Text style={styles.eyeIcon}>{showPassword ? '🙈' : '👁️'}</Text></Pressable>
            </View>
          </View>
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Konfirmasi Kata Sandi</Text>
            <View style={styles.inputWrapper}>
              <TextInput style={[styles.input, styles.inputPr]} value={confirmPassword} onChangeText={setConfirmPassword} placeholder="Ulangi kata sandi" placeholderTextColor="#9CA3AF" secureTextEntry={!showConfirm} autoCapitalize="none" />
              <Pressable onPress={() => setShowConfirm(v => !v)} style={styles.eyeBtn} hitSlop={8}><Text style={styles.eyeIcon}>{showConfirm ? '🙈' : '👁️'}</Text></Pressable>
            </View>
          </View>
          {password.length > 0 && (
            <View style={styles.validationBox}>
              <PasswordRule met={hasMinLength} label="Minimal 8 karakter" />
              <PasswordRule met={hasUpper} label="Mengandung huruf kapital" />
              <PasswordRule met={hasNumber} label="Mengandung angka" />
              <PasswordRule met={passwordsMatch} label="Kata sandi cocok" />
            </View>
          )}
          <TouchableOpacity style={[styles.primaryBtn, !canSubmit && styles.primaryBtnDisabled]} onPress={() => canSubmit && router.push('/Authenticate/otp-verification')} disabled={!canSubmit} activeOpacity={0.85}>
            <Text style={styles.primaryBtnText}>Daftar Sekarang</Text>
          </TouchableOpacity>
          <View style={styles.loginRow}>
            <Text style={styles.loginPrompt}>Sudah punya akun? </Text>
            <TouchableOpacity onPress={() => router.back()}><Text style={styles.loginLink}>Masuk</Text></TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: '#FFFFFF' },
  container: { flexGrow: 1, paddingHorizontal: 24, paddingTop: 60, paddingBottom: 48, gap: 20 },
  blobBlue: { position: 'absolute', top: -60, left: -80, width: 260, height: 260, borderRadius: 130, backgroundColor: '#DBEBFe', opacity: 0.4 },
  header: { gap: 8, alignItems: 'center' },
  logoRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 8 },
  logoIcon: { width: 40, height: 40, borderRadius: 10, backgroundColor: '#2563EB', alignItems: 'center', justifyContent: 'center' },
  logoLetter: { color: '#FFFFFF', fontSize: 20, fontWeight: '700' },
  logoText: { fontSize: 22, fontWeight: '700', color: '#2563EB' },
  pageTitle: { fontSize: 22, fontWeight: '700', color: '#111827', textAlign: 'center' },
  pageSubtitle: { fontSize: 14, color: '#60646C', textAlign: 'center', lineHeight: 20 },
  googleBtn: { height: 52, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, borderWidth: 1.5, borderColor: '#E5E7EB', borderRadius: 14, backgroundColor: '#FFFFFF' },
  googleIcon: { fontSize: 18, fontWeight: '700', color: '#EA4335' },
  googleBtnText: { fontSize: 15, fontWeight: '500', color: '#374151' },
  dividerRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  dividerLine: { flex: 1, height: 1, backgroundColor: '#E5E7EB' },
  dividerText: { fontSize: 12, color: '#9CA3AF', textAlign: 'center' },
  form: { gap: 16 },
  fieldGroup: { gap: 6 },
  label: { fontSize: 13, fontWeight: '600', color: '#374151' },
  inputWrapper: { flexDirection: 'row', alignItems: 'center', borderWidth: 1.5, borderColor: '#E5E7EB', borderRadius: 12, backgroundColor: '#F9FAFB', overflow: 'hidden' },
  input: { flex: 1, height: 48, paddingHorizontal: 14, fontSize: 15, color: '#111827' },
  inputPr: { paddingRight: 48 },
  eyeBtn: { position: 'absolute', right: 14, padding: 4 },
  eyeIcon: { fontSize: 16 },
  validationBox: { backgroundColor: '#F9FAFB', borderRadius: 12, padding: 14, gap: 6, borderWidth: 1, borderColor: '#E5E7EB' },
  ruleRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  ruleDot: { fontSize: 14, width: 18 },
  ruleMet: { color: '#16A34A' },
  ruleUnmet: { color: '#9CA3AF' },
  ruleLabel: { fontSize: 13 },
  ruleLabelMet: { color: '#16A34A' },
  ruleLabelUnmet: { color: '#60646C' },
  primaryBtn: { height: 52, backgroundColor: '#2563EB', borderRadius: 14, alignItems: 'center', justifyContent: 'center', marginTop: 4, shadowColor: '#2563EB', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.25, shadowRadius: 8, elevation: 4 },
  primaryBtnDisabled: { opacity: 0.45 },
  primaryBtnText: { color: '#FFFFFF', fontSize: 16, fontWeight: '600' },
  loginRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  loginPrompt: { fontSize: 14, color: '#60646C' },
  loginLink: { fontSize: 14, color: '#2563EB', fontWeight: '600' },
});
