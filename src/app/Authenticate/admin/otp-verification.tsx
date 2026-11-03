import { useEffect, useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import EmailIcon from '../../../../assets/images/teach-blue/email.svg';
import TimerIcon from '../../../../assets/images/teach-blue/timer.svg';
import {
  AuthOtpField,
  AuthPrimaryButton,
} from '../../../components/authenticate/AuthControls';
import { TeachBlueBrand } from '../../../components/authenticate/AuthBrand';
import {
  TeachBlueFooter,
  TeachBlueHeading,
  TeachBlueScreen,
} from '../../../components/authenticate/TeachBlueComponents';
import { authColors } from '../../../components/authenticate/theme';

const RESEND_SECONDS = 30;

export default function TeachBlueOtpScreen() {
  const { email: emailParam } = useLocalSearchParams<{ email?: string }>();
  const email = emailParam ?? '';
  const [code, setCode] = useState('');
  const [secondsRemaining, setSecondsRemaining] = useState(RESEND_SECONDS);

  useEffect(() => {
    if (secondsRemaining === 0) return;
    const timer = setInterval(
      () => setSecondsRemaining((seconds) => Math.max(0, seconds - 1)),
      1000,
    );
    return () => clearInterval(timer);
  }, [secondsRemaining]);

  const confirmCode = () => {
    if (code.length !== 6) return;
    router.push({
      pathname: '/Authenticate/admin/profile',
      params: { email },
    });
  };

  const resendCode = () => {
    setCode('');
    setSecondsRemaining(RESEND_SECONDS);
  };

  const formattedTime = `00:${String(secondsRemaining).padStart(2, '0')}`;

  return (
    <TeachBlueScreen contentStyle={styles.content}>
      <StatusBar style="light" />
      <TeachBlueBrand />
      <TeachBlueHeading
        step="LANGKAH 2 DARI 3 · VERIFIKASI EMAIL"
        title={'Cek emailmu,\nyuk!'}
        description="Masukkan kode OTP 6 digit yang kami kirim untuk memverifikasi akunmu."
      />
      <View style={styles.emailCard}>
        <EmailIcon />
        <View style={styles.emailText}>
          <Text style={styles.emailLabel}>Kode dikirim ke</Text>
          <Text numberOfLines={1} style={styles.emailValue}>{email}</Text>
        </View>
      </View>
      <View style={styles.codeSection}>
        <Text style={styles.sectionLabel}>Kode OTP</Text>
        <AuthOtpField value={code} onChangeText={setCode} theme="teach" />
        <Text style={styles.helper}>Kode berlaku selama 5 menit.</Text>
      </View>
      <View style={styles.resend}>
        <Text style={styles.helper}>Belum menerima kode?</Text>
        <TouchableOpacity
          accessibilityRole="button"
          disabled={secondsRemaining > 0}
          onPress={resendCode}
          style={styles.resendButton}
        >
          <TimerIcon />
          <Text style={styles.resendText}>
            {secondsRemaining > 0
              ? `Kirim ulang OTP dalam ${formattedTime}`
              : 'Kirim ulang OTP'}
          </Text>
        </TouchableOpacity>
      </View>
      <AuthPrimaryButton
        theme="teach"
        label="Konfirmasi"
        onPress={confirmCode}
        disabled={code.length !== 6}
      />
      <TouchableOpacity
        onPress={() => router.back()}
        style={styles.backLink}
      >
        <Text style={styles.backArrow}>←</Text>
        <Text style={styles.backText}>Kembali ke registrasi</Text>
      </TouchableOpacity>
      <TeachBlueFooter />
    </TeachBlueScreen>
  );
}

const styles = StyleSheet.create({
  content: { gap: 24 },
  emailCard: { minHeight: 66, flexDirection: 'row', alignItems: 'center', gap: 12, padding: 14, backgroundColor: authColors.surface, borderRadius: 12, borderWidth: 1, borderColor: authColors.blue, shadowColor: authColors.green, shadowOpacity: 0.2, shadowRadius: 14, shadowOffset: { width: 0, height: 0 } },
  emailText: { flex: 1, gap: 3 },
  emailLabel: { color: authColors.muted, fontFamily: 'Nunito_400Regular', fontSize: 11 },
  emailValue: { color: authColors.white, fontFamily: 'Nunito_700Bold', fontSize: 14 },
  codeSection: { gap: 8 },
  sectionLabel: { color: authColors.white, fontFamily: 'Nunito_700Bold', fontSize: 13 },
  helper: { color: authColors.muted, fontFamily: 'Nunito_400Regular', fontSize: 11, lineHeight: 20 },
  resend: { alignItems: 'center', gap: 8 },
  resendButton: { flexDirection: 'row', alignItems: 'center', gap: 6, minHeight: 24 },
  resendText: { color: authColors.muted, fontFamily: 'Nunito_700Bold', fontSize: 12 },
  backLink: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 6, minHeight: 24 },
  backArrow: { color: authColors.blue, fontSize: 20 },
  backText: { color: authColors.blue, fontFamily: 'Nunito_700Bold', fontSize: 12 },
});
