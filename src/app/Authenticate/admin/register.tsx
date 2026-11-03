import { useState } from 'react';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {
  AuthDivider,
  AuthGoogleButton,
  AuthPasswordField,
  AuthPasswordHint,
  AuthPrimaryButton,
  AuthTextField,
} from '../../../components/authenticate/AuthControls';
import { TeachBlueBrand } from '../../../components/authenticate/AuthBrand';
import {
  TeachBlueFooter,
  TeachBlueHeading,
  TeachBlueScreen,
} from '../../../components/authenticate/TeachBlueComponents';
import { authColors } from '../../../components/authenticate/theme';

export default function TeachBlueRegisterScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const passwordValid = password.length >= 8;
  const passwordMatches = password.length > 0 && password === confirmPassword;
  const canContinue =
    email.trim().length > 0 && passwordValid && passwordMatches;

  const continueRegistration = () => {
    if (!canContinue) return;
    router.push({
      pathname: '/Authenticate/admin/otp-verification',
      params: { email: email.trim() },
    });
  };

  return (
    <TeachBlueScreen contentStyle={styles.content}>
      <StatusBar style="light" />
      <TeachBlueBrand />
      <TeachBlueHeading
        step="LANGKAH 1 DARI 3 · BUAT AKUN"
        title={'Yuk, mulai\nmengajarmu!'}
        description="Bergabung sebagai pengajar di ekosistem Bimblue bersama Teach Blue."
      />
      <View style={styles.socialSection}>
        <AuthGoogleButton label="Lanjutkan dengan Google" />
        <AuthDivider theme="teach" label="atau daftar dengan email" />
      </View>
      <View style={styles.form}>
        <AuthTextField
          label="Email atau username"
          theme="teach"
          value={email}
          onChangeText={setEmail}
          placeholder="nama@email.com"
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
        />
        <AuthPasswordField
          label="Password"
          theme="teach"
          value={password}
          onChangeText={setPassword}
          placeholder="Buat password"
          visible={showPassword}
          onToggle={() => setShowPassword((visible) => !visible)}
        />
        <AuthPasswordField
          label="Konfirmasi password"
          theme="teach"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="Ulangi password"
          visible={showConfirmPassword}
          onToggle={() => setShowConfirmPassword((visible) => !visible)}
        />
        {(password.length > 0 || confirmPassword.length > 0) && (
          <AuthPasswordHint
            valid={passwordValid && passwordMatches}
            label={`Min. 8 karakter · ${passwordMatches ? 'Konfirmasi password cocok' : 'Konfirmasi password cocok'}`}
          />
        )}
        <AuthPrimaryButton
          theme="teach"
          label="Lanjutkan registrasi"
          onPress={continueRegistration}
          disabled={!canContinue}
        />
        <View style={styles.loginRow}>
          <Text style={styles.loginPrompt}>Sudah punya akun? </Text>
          <TouchableOpacity onPress={() => router.replace('/Authenticate/login')}>
            <Text style={styles.loginLink}>Masuk</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TeachBlueFooter />
    </TeachBlueScreen>
  );
}

const styles = StyleSheet.create({
  content: { gap: 24 },
  socialSection: { gap: 0 },
  form: { gap: 8 },
  loginRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 4 },
  loginPrompt: { color: authColors.muted, fontFamily: 'Nunito_400Regular', fontSize: 12 },
  loginLink: { color: authColors.green, fontFamily: 'Nunito_700Bold', fontSize: 12 },
});
