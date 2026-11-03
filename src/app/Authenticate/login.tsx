/**
 * 05 — Login / Bimblue
 */
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); router.replace('/motivation-splash'); }, 1000);
  };

  return (
    <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <View style={styles.blobBlue} />
        <View style={styles.blobMint} />
        <View style={styles.logoRow}>
          <View style={styles.logoIcon}><Text style={styles.logoLetter}>B</Text></View>
          <Text style={styles.logoText}>Bimblue</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Selamat datang kembali 👋</Text>
          <Text style={styles.cardSubtitle}>Masuk untuk melanjutkan perjalanan belajarmu.</Text>
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Email</Text>
            <View style={styles.inputWrapper}>
              <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="contoh@email.com" placeholderTextColor="#9CA3AF" keyboardType="email-address" autoCapitalize="none" />
            </View>
          </View>
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Kata Sandi</Text>
            <View style={styles.inputWrapper}>
              <TextInput style={[styles.input, styles.inputPr]} value={password} onChangeText={setPassword} placeholder="Masukkan kata sandi" placeholderTextColor="#9CA3AF" secureTextEntry={!showPassword} autoCapitalize="none" />
              <Pressable onPress={() => setShowPassword(v => !v)} style={styles.eyeBtn} hitSlop={8}>
                <Text style={styles.eyeIcon}>{showPassword ? '🙈' : '👁️'}</Text>
              </Pressable>
            </View>
          </View>
          <TouchableOpacity style={styles.forgotRow} onPress={() => router.push('/Authenticate/forgot-password')}>
            <Text style={styles.forgotText}>Lupa kata sandi?</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.primaryBtn, loading && styles.primaryBtnLoading]} onPress={handleLogin} disabled={loading} activeOpacity={0.85}>
            <Text style={styles.primaryBtnText}>{loading ? 'Memuat...' : 'Masuk'}</Text>
          </TouchableOpacity>
          <View style={styles.dividerRow}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>atau</Text>
            <View style={styles.dividerLine} />
          </View>
          <TouchableOpacity style={styles.googleBtn} activeOpacity={0.85}>
            <Text style={styles.googleIcon}>G</Text>
            <Text style={styles.googleBtnText}>Lanjutkan dengan Google</Text>
          </TouchableOpacity>
          <View style={styles.registerRow}>
            <Text style={styles.registerPrompt}>Belum punya akun? </Text>
            <TouchableOpacity onPress={() => router.push('/Authenticate/register')}>
              <Text style={styles.registerLink}>Daftar sekarang</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: '#FFFFFF' },
  container: { flexGrow: 1, alignItems: 'center', paddingHorizontal: 24, paddingTop: 60, paddingBottom: 40 },
  blobBlue: { position: 'absolute', top: -60, left: -80, width: 260, height: 260, borderRadius: 130, backgroundColor: '#DBEBFe', opacity: 0.5 },
  blobMint: { position: 'absolute', top: 100, right: -60, width: 180, height: 180, borderRadius: 90, backgroundColor: '#DCFCE7', opacity: 0.5 },
  logoRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 32 },
  logoIcon: { width: 40, height: 40, borderRadius: 10, backgroundColor: '#2563EB', alignItems: 'center', justifyContent: 'center' },
  logoLetter: { color: '#FFFFFF', fontSize: 20, fontWeight: '700' },
  logoText: { fontSize: 22, fontWeight: '700', color: '#2563EB' },
  card: { width: '100%', backgroundColor: '#FFFFFF', borderRadius: 24, padding: 24, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.08, shadowRadius: 16, elevation: 4, gap: 16 },
  cardTitle: { fontSize: 22, fontWeight: '700', color: '#111827', textAlign: 'center' },
  cardSubtitle: { fontSize: 14, color: '#60646C', textAlign: 'center', lineHeight: 20 },
  fieldGroup: { gap: 6 },
  label: { fontSize: 13, fontWeight: '600', color: '#374151' },
  inputWrapper: { flexDirection: 'row', alignItems: 'center', borderWidth: 1.5, borderColor: '#E5E7EB', borderRadius: 12, backgroundColor: '#F9FAFB', overflow: 'hidden' },
  input: { flex: 1, height: 48, paddingHorizontal: 14, fontSize: 15, color: '#111827' },
  inputPr: { paddingRight: 48 },
  eyeBtn: { position: 'absolute', right: 14, padding: 4 },
  eyeIcon: { fontSize: 16 },
  forgotRow: { alignSelf: 'flex-end', marginTop: -8 },
  forgotText: { fontSize: 13, color: '#2563EB', fontWeight: '500' },
  primaryBtn: { height: 52, backgroundColor: '#2563EB', borderRadius: 14, alignItems: 'center', justifyContent: 'center', marginTop: 4, shadowColor: '#2563EB', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.25, shadowRadius: 8, elevation: 4 },
  primaryBtnLoading: { opacity: 0.7 },
  primaryBtnText: { color: '#FFFFFF', fontSize: 16, fontWeight: '600' },
  dividerRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  dividerLine: { flex: 1, height: 1, backgroundColor: '#E5E7EB' },
  dividerText: { fontSize: 13, color: '#9CA3AF' },
  googleBtn: { height: 52, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, borderWidth: 1.5, borderColor: '#E5E7EB', borderRadius: 14, backgroundColor: '#FFFFFF' },
  googleIcon: { fontSize: 18, fontWeight: '700', color: '#EA4335' },
  googleBtnText: { fontSize: 15, fontWeight: '500', color: '#374151' },
  registerRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 4 },
  registerPrompt: { fontSize: 14, color: '#60646C' },
  registerLink: { fontSize: 14, color: '#2563EB', fontWeight: '600' },
});
