/**
 * 07 — Verifikasi OTP (Daftar)
 */
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import {
  AuthBackdrop,
  AuthOtpField,
  AuthPrimaryButton,
} from '../../components/authenticate/AuthControls';

const OTP_LENGTH = 6;

export default function OtpVerificationScreen() {
  const params = useLocalSearchParams<{ email?: string }>();
  const email = params.email ?? 'kamu@email.com';
  const [code, setCode] = useState('');
  const isComplete = code.length === OTP_LENGTH;

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <AuthBackdrop />
      <View style={styles.blobBlue} />
      <View style={styles.blobMint} />
      <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
        <Text style={styles.backText}>← Kembali</Text>
      </TouchableOpacity>
      <View style={styles.content}>
        <View style={styles.mailIcon}><Text style={styles.mailEmoji}>📧</Text></View>
        <Text style={styles.title}>Verifikasi Email</Text>
        <Text style={styles.subtitle}>Kode OTP telah dikirim ke</Text>
        <Text style={styles.emailHighlight}>{email}</Text>
        <View style={styles.otpRow}>
          <AuthOtpField value={code} onChangeText={setCode} length={OTP_LENGTH} />
        </View>
        <Text style={styles.resendCountdown}>⏱ Kirim ulang dalam 60s</Text>
        <AuthPrimaryButton
          label="Verifikasi"
          onPress={() => router.push('/Authenticate/user-info')}
          disabled={!isComplete}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF', paddingHorizontal: 24, paddingTop: 60 },
  blobBlue: { position: 'absolute', top: -80, left: -80, width: 240, height: 240, borderRadius: 120, backgroundColor: '#DBEBFe', opacity: 0.5 },
  blobMint: { position: 'absolute', top: 120, right: -60, width: 160, height: 160, borderRadius: 80, backgroundColor: '#DCFCE7', opacity: 0.5 },
  backBtn: { marginBottom: 40 },
  backText: { fontSize: 15, color: '#2563EB', fontWeight: '500' },
  content: { alignItems: 'center', gap: 16 },
  mailIcon: { width: 80, height: 80, borderRadius: 20, backgroundColor: '#EFF6FF', alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
  mailEmoji: { fontSize: 40 },
  title: { fontSize: 24, fontWeight: '700', color: '#111827', textAlign: 'center' },
  subtitle: { fontSize: 14, color: '#60646C', textAlign: 'center' },
  emailHighlight: { fontSize: 14, color: '#2563EB', fontWeight: '600', textAlign: 'center' },
  otpRow: { flexDirection: 'row', gap: 12, marginVertical: 8 },
  digitInput: { width: 48, height: 56, borderWidth: 2, borderColor: '#E5E7EB', borderRadius: 14, backgroundColor: '#F9FAFB', fontSize: 22, fontWeight: '700', color: '#111827', textAlign: 'center' },
  digitInputFilled: { borderColor: '#2563EB', backgroundColor: '#EFF6FF' },
  resendCountdown: { fontSize: 14, color: '#9CA3AF' },
  primaryBtn: { width: '100%', height: 52, backgroundColor: '#2563EB', borderRadius: 14, alignItems: 'center', justifyContent: 'center', marginTop: 8, shadowColor: '#2563EB', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.25, shadowRadius: 8, elevation: 4 },
  primaryBtnDisabled: { opacity: 0.45 },
  primaryBtnText: { color: '#FFFFFF', fontSize: 16, fontWeight: '600' },
});
