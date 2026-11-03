/**
 * 10 — Lupa Sandi / Email
 */
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const isValid = email.includes('@') && email.includes('.');

  return (
    <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <StatusBar style="dark" />
      <View style={styles.container}>
        <View style={styles.blobBlue} />
        <View style={styles.blobMint} />
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backText}>← Kembali ke Masuk</Text>
        </TouchableOpacity>
        <View style={styles.content}>
          <View style={styles.iconBox}><Text style={styles.iconEmoji}>🔑</Text></View>
          <Text style={styles.title}>Lupa Kata Sandi?</Text>
          <Text style={styles.subtitle}>Masukkan email yang terdaftar dan kami akan mengirimkan kode verifikasi untuk mengatur ulang kata sandi kamu.</Text>
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Email Terdaftar</Text>
            <View style={styles.inputWrapper}>
              <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="contoh@email.com" placeholderTextColor="#9CA3AF" keyboardType="email-address" autoCapitalize="none" />
            </View>
          </View>
          <TouchableOpacity style={[styles.primaryBtn, !isValid && styles.primaryBtnDisabled]} onPress={() => isValid && router.push({ pathname: '/Authenticate/forgot-password-otp', params: { email } })} disabled={!isValid} activeOpacity={0.85}>
            <Text style={styles.primaryBtnText}>Kirim Kode Verifikasi</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: '#FFFFFF' },
  container: { flex: 1, paddingHorizontal: 24, paddingTop: 60 },
  blobBlue: { position: 'absolute', top: -60, left: -80, width: 240, height: 240, borderRadius: 120, backgroundColor: '#DBEBFe', opacity: 0.45 },
  blobMint: { position: 'absolute', bottom: 100, right: -60, width: 180, height: 180, borderRadius: 90, backgroundColor: '#DCFCE7', opacity: 0.45 },
  backBtn: { marginBottom: 48 },
  backText: { fontSize: 15, color: '#2563EB', fontWeight: '500' },
  content: { alignItems: 'stretch', gap: 20 },
  iconBox: { width: 80, height: 80, borderRadius: 20, backgroundColor: '#EFF6FF', alignItems: 'center', justifyContent: 'center', alignSelf: 'center' },
  iconEmoji: { fontSize: 40 },
  title: { fontSize: 24, fontWeight: '700', color: '#111827', textAlign: 'center' },
  subtitle: { fontSize: 14, color: '#60646C', textAlign: 'center', lineHeight: 21 },
  fieldGroup: { gap: 6 },
  label: { fontSize: 13, fontWeight: '600', color: '#374151' },
  inputWrapper: { borderWidth: 1.5, borderColor: '#E5E7EB', borderRadius: 12, backgroundColor: '#F9FAFB', height: 48, paddingHorizontal: 14, justifyContent: 'center' },
  input: { fontSize: 15, color: '#111827' },
  primaryBtn: { height: 52, backgroundColor: '#2563EB', borderRadius: 14, alignItems: 'center', justifyContent: 'center', shadowColor: '#2563EB', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.25, shadowRadius: 8, elevation: 4 },
  primaryBtnDisabled: { opacity: 0.45 },
  primaryBtnText: { color: '#FFFFFF', fontSize: 16, fontWeight: '600' },
});
