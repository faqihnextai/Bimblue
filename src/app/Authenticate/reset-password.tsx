/**
 * 12 â€” Lupa Sandi / Kata Sandi Baru / Bimblue
 * Figma frame id: reset-password (after OTP verification in forgot-password flow)
 */
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

function PasswordRule({ met, label }: { met: boolean; label: string }) {
  return (
    <View style={styles.ruleRow}>
      <Text style={[styles.ruleDot, met ? styles.ruleMet : styles.ruleUnmet]}>
        {met ? 'âœ“' : 'â—‹'}
      </Text>
      <Text style={[styles.ruleLabel, met ? styles.ruleLabelMet : styles.ruleLabelUnmet]}>
        {label}
      </Text>
    </View>
  );
}

export default function ResetPasswordScreen() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const hasMinLength = password.length >= 8;
  const hasUpper = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const passwordsMatch = password === confirmPassword && confirmPassword.length > 0;

  const canSubmit = hasMinLength && hasUpper && hasNumber && passwordsMatch;

  const handleReset = () => {
    if (!canSubmit) return;
    // Navigate back to login after reset
    router.replace('/Authenticate/login');
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <StatusBar style="dark" />
      <View style={styles.container}>
        <View style={styles.blobBlue} />
        <View style={styles.blobMint} />

        {/* Back */}
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backIcon}>â†</Text>
          <Text style={styles.backText}>Kembali</Text>
        </TouchableOpacity>

        {/* Header */}
        <View style={styles.header}>
          <View style={styles.iconBox}>
            <Text style={styles.iconEmoji}>ðŸ”</Text>
          </View>
          <Text style={styles.title}>Buat Kata Sandi Baru</Text>
          <Text style={styles.subtitle}>
            Kata sandi baru harus berbeda dari kata sandi sebelumnya.
          </Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Kata Sandi Baru</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={[styles.input, styles.inputPr]}
                value={password}
                onChangeText={setPassword}
                placeholder="Buat kata sandi baru"
                placeholderTextColor="#9CA3AF"
                secureTextEntry={!showPassword}
                autoCapitalize="none"
              />
              <Pressable onPress={() => setShowPassword((v) => !v)} style={styles.eyeBtn} hitSlop={8}>
                <Text style={styles.eyeIcon}>{showPassword ? 'ðŸ™ˆ' : 'ðŸ‘ï¸'}</Text>
              </Pressable>
            </View>
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Konfirmasi Kata Sandi Baru</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={[styles.input, styles.inputPr]}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Ulangi kata sandi baru"
                placeholderTextColor="#9CA3AF"
                secureTextEntry={!showConfirm}
                autoCapitalize="none"
              />
              <Pressable onPress={() => setShowConfirm((v) => !v)} style={styles.eyeBtn} hitSlop={8}>
                <Text style={styles.eyeIcon}>{showConfirm ? 'ðŸ™ˆ' : 'ðŸ‘ï¸'}</Text>
              </Pressable>
            </View>
          </View>

          {/* Password validation */}
          {password.length > 0 && (
            <View style={styles.validationBox}>
              <PasswordRule met={hasMinLength} label="Minimal 8 karakter" />
              <PasswordRule met={hasUpper} label="Mengandung huruf kapital" />
              <PasswordRule met={hasNumber} label="Mengandung angka" />
              <PasswordRule met={passwordsMatch} label="Kata sandi cocok" />
            </View>
          )}

          <TouchableOpacity
            style={[styles.primaryBtn, !canSubmit && styles.primaryBtnDisabled]}
            onPress={handleReset}
            disabled={!canSubmit}
            activeOpacity={0.85}
          >
            <Text style={styles.primaryBtnText}>Simpan Kata Sandi Baru</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: '#FFFFFF' },
  container: {
    flex: 1, paddingHorizontal: 24, paddingTop: 60, gap: 28,
  },
  blobBlue: {
    position: 'absolute', top: -60, left: -80, width: 240, height: 240,
    borderRadius: 120, backgroundColor: '#DBEBFe', opacity: 0.45,
  },
  blobMint: {
    position: 'absolute', bottom: 80, right: -60, width: 180, height: 180,
    borderRadius: 90, backgroundColor: '#DCFCE7', opacity: 0.45,
  },
  backBtn: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  backIcon: { fontSize: 18, color: '#2563EB' },
  backText: { fontSize: 15, color: '#2563EB', fontWeight: '500' },
  header: { alignItems: 'center', gap: 12 },
  iconBox: {
    width: 80, height: 80, borderRadius: 20, backgroundColor: '#EFF6FF',
    alignItems: 'center', justifyContent: 'center',
  },
  iconEmoji: { fontSize: 40 },
  title: { fontSize: 24, fontWeight: '700', color: '#111827', textAlign: 'center' },
  subtitle: { fontSize: 14, color: '#60646C', textAlign: 'center', lineHeight: 20 },
  form: { gap: 16 },
  fieldGroup: { gap: 6 },
  label: { fontSize: 13, fontWeight: '600', color: '#374151' },
  inputWrapper: {
    flexDirection: 'row', alignItems: 'center', borderWidth: 1.5,
    borderColor: '#E5E7EB', borderRadius: 12, backgroundColor: '#F9FAFB', overflow: 'hidden',
  },
  input: { flex: 1, height: 48, paddingHorizontal: 14, fontSize: 15, color: '#111827' },
  inputPr: { paddingRight: 48 },
  eyeBtn: { position: 'absolute', right: 14, padding: 4 },
  eyeIcon: { fontSize: 16 },
  validationBox: {
    backgroundColor: '#F9FAFB', borderRadius: 12, padding: 14, gap: 6,
    borderWidth: 1, borderColor: '#E5E7EB',
  },
  ruleRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  ruleDot: { fontSize: 14, width: 18 },
  ruleMet: { color: '#16A34A' },
  ruleUnmet: { color: '#9CA3AF' },
  ruleLabel: { fontSize: 13 },
  ruleLabelMet: { color: '#16A34A' },
  ruleLabelUnmet: { color: '#60646C' },
  primaryBtn: {
    height: 52, backgroundColor: '#2563EB', borderRadius: 14,
    alignItems: 'center', justifyContent: 'center', marginTop: 4,
    shadowColor: '#2563EB', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25, shadowRadius: 8, elevation: 4,
  },
  primaryBtnDisabled: { opacity: 0.45 },
  primaryBtnText: { color: '#FFFFFF', fontSize: 16, fontWeight: '600' },
});

