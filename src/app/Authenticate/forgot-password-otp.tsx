/**
 * 11 — Lupa Sandi / OTP
 */
import { useRef, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

const OTP_LENGTH = 6;

export default function ForgotPasswordOtpScreen() {
  const { email } = useLocalSearchParams<{ email?: string }>();
  const displayEmail = email ?? 'kamu@email.com';
  const [digits, setDigits] = useState<string[]>(Array(OTP_LENGTH).fill(''));
  const inputs = useRef<Array<TextInput | null>>(Array(OTP_LENGTH).fill(null));
  const isComplete = digits.every(d => d.length === 1);

  const handleDigit = (text: string, index: number) => {
    const cleaned = text.replace(/\D/g, '').slice(-1);
    const newDigits = [...digits];
    newDigits[index] = cleaned;
    setDigits(newDigits);
    if (cleaned && index < OTP_LENGTH - 1) inputs.current[index + 1]?.focus();
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === 'Backspace' && !digits[index] && index > 0) inputs.current[index - 1]?.focus();
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.blobBlue} />
      <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
        <Text style={styles.backText}>← Kembali</Text>
      </TouchableOpacity>
      <View style={styles.content}>
        <View style={styles.mailIcon}><Text style={styles.mailEmoji}>📧</Text></View>
        <Text style={styles.title}>Cek Email Kamu</Text>
        <Text style={styles.subtitle}>Kode verifikasi telah dikirim ke</Text>
        <Text style={styles.emailHighlight}>{displayEmail}</Text>
        <View style={styles.otpRow}>
          {digits.map((digit, i) => (
            <TextInput
              key={i}
              ref={(el: TextInput | null) => { inputs.current[i] = el; }}
              style={[styles.digitInput, digit ? styles.digitInputFilled : undefined]}
              value={digit}
              onChangeText={t => handleDigit(t, i)}
              onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, i)}
              keyboardType="number-pad"
              maxLength={1}
              textAlign="center"
              selectTextOnFocus
            />
          ))}
        </View>
        <Text style={styles.resendCountdown}>⏱ Kirim ulang dalam 60s</Text>
        <TouchableOpacity style={[styles.primaryBtn, !isComplete && styles.primaryBtnDisabled]} onPress={() => isComplete && router.push('/Authenticate/reset-password')} disabled={!isComplete} activeOpacity={0.85}>
          <Text style={styles.primaryBtnText}>Lanjutkan</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF', paddingHorizontal: 24, paddingTop: 60 },
  blobBlue: { position: 'absolute', top: -80, left: -80, width: 240, height: 240, borderRadius: 120, backgroundColor: '#DBEBFe', opacity: 0.5 },
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
