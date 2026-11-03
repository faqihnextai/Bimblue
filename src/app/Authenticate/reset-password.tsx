import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import {
  AuthBackdrop,
  AuthPasswordField,
  AuthPrimaryButton,
  PasswordRuleList,
} from '../../components/authenticate/AuthControls';

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

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <StatusBar style="dark" />
      <AuthBackdrop />
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backIcon}>←</Text>
          <Text style={styles.backText}>Kembali</Text>
        </TouchableOpacity>

        <View style={styles.header}>
          <View style={styles.iconBox}>
            <Text style={styles.iconEmoji}>🔐</Text>
          </View>
          <Text style={styles.title}>Buat Kata Sandi Baru</Text>
          <Text style={styles.subtitle}>
            Kata sandi baru harus berbeda dari kata sandi sebelumnya.
          </Text>
        </View>

        <View style={styles.form}>
          <AuthPasswordField
            label="Kata Sandi Baru"
            value={password}
            onChangeText={setPassword}
            placeholder="Buat kata sandi baru"
            visible={showPassword}
            onToggle={() => setShowPassword((visible) => !visible)}
          />
          <AuthPasswordField
            label="Konfirmasi Kata Sandi Baru"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Ulangi kata sandi baru"
            visible={showConfirm}
            onToggle={() => setShowConfirm((visible) => !visible)}
          />

          {password.length > 0 && (
            <PasswordRuleList
              rules={[
                { met: hasMinLength, label: 'Minimal 8 karakter' },
                { met: hasUpper, label: 'Mengandung huruf kapital' },
                { met: hasNumber, label: 'Mengandung angka' },
                { met: passwordsMatch, label: 'Kata sandi cocok' },
              ]}
            />
          )}

          <AuthPrimaryButton
            label="Simpan Kata Sandi Baru"
            onPress={() => router.replace('/Authenticate/login')}
            disabled={!canSubmit}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: '#FFFFFF' },
  container: { flexGrow: 1, paddingHorizontal: 24, paddingTop: 60, paddingBottom: 48, gap: 28 },
  backBtn: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  backIcon: { fontSize: 18, color: '#2563EB' },
  backText: { fontSize: 15, color: '#2563EB', fontWeight: '500' },
  header: { alignItems: 'center', gap: 12 },
  iconBox: { width: 80, height: 80, borderRadius: 20, backgroundColor: '#EFF6FF', alignItems: 'center', justifyContent: 'center' },
  iconEmoji: { fontSize: 40 },
  title: { fontSize: 24, fontWeight: '700', color: '#111827', textAlign: 'center' },
  subtitle: { fontSize: 14, color: '#60646C', textAlign: 'center', lineHeight: 20 },
  form: { gap: 16 },
});
