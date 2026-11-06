/**
 * 05 — Login / Bimblue
 */
import { authenticateAccount } from "@/constants/authSession";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { BimblueBrand } from "../../components/authenticate/AuthBrand";
import {
    AuthBackdrop,
    AuthGoogleButton,
    AuthPasswordField,
    AuthPrimaryButton,
    AuthTextField,
} from "../../components/authenticate/AuthControls";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = () => {
    setErrorMsg("");
    const role = authenticateAccount(email, password);

    if (!role) {
      setErrorMsg(
        'Akun tidak sesuai! Gunakan "user" (pw: 123) atau "admin" (pw: 123).',
      );
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // Masuk ke motivation-splash terlebih dahulu
      router.replace("/before/motivation-splash");
    }, 800);
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <StatusBar style="dark" />
      <AuthBackdrop />
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.logoRow}>
          <BimblueBrand />
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Selamat datang kembali 👋</Text>
          <Text style={styles.cardSubtitle}>
            Masuk untuk melanjutkan perjalanan belajarmu.
          </Text>

          {errorMsg ? (
            <View style={styles.errorBox}>
              <Text style={styles.errorText}>{errorMsg}</Text>
            </View>
          ) : null}

          <AuthTextField
            label="Username / Email"
            value={email}
            onChangeText={setEmail}
            placeholder="Ketik: user atau admin"
            autoCapitalize="none"
          />
          <AuthPasswordField
            label="Kata Sandi"
            value={password}
            onChangeText={setPassword}
            placeholder="Ketik: 123"
            visible={showPassword}
            onToggle={() => setShowPassword((visible) => !visible)}
          />
          <TouchableOpacity
            style={styles.forgotRow}
            onPress={() => router.push("/Authenticate/forgot-password")}
          >
            <Text style={styles.forgotText}>Lupa kata sandi?</Text>
          </TouchableOpacity>
          <AuthPrimaryButton
            label="Masuk"
            onPress={handleLogin}
            loading={loading}
          />
          <View style={styles.dividerRow}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>atau</Text>
            <View style={styles.dividerLine} />
          </View>
          <AuthGoogleButton theme="light" label="Lanjutkan dengan Google" />
          <View style={styles.registerRow}>
            <Text style={styles.registerPrompt}>Belum punya akun? </Text>
            <TouchableOpacity
              onPress={() => router.push("/Authenticate/register")}
            >
              <Text style={styles.registerLink}>Daftar sekarang</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.registerRow}>
            <Text style={styles.registerPrompt}>Pengajar? </Text>
            <TouchableOpacity
              onPress={() => router.push("/Authenticate/admin/register")}
            >
              <Text style={styles.registerLink}>Daftar Teach Blue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: "#FFFFFF" },
  container: {
    flexGrow: 1,
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  logoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 32,
  },
  card: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
    gap: 16,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111827",
    textAlign: "center",
  },
  cardSubtitle: {
    fontSize: 14,
    color: "#60646C",
    textAlign: "center",
    lineHeight: 20,
  },
  errorBox: {
    backgroundColor: "#FEE2E2",
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#FCA5A5",
  },
  errorText: {
    color: "#B91C1C",
    fontSize: 12,
    textAlign: "center",
    fontWeight: "600",
  },
  forgotRow: { alignSelf: "flex-end", marginTop: -8 },
  forgotText: { fontSize: 13, color: "#2563EB", fontWeight: "500" },
  dividerRow: { flexDirection: "row", alignItems: "center", gap: 12 },
  dividerLine: { flex: 1, height: 1, backgroundColor: "#E5E7EB" },
  dividerText: { fontSize: 13, color: "#9CA3AF" },
  registerRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 4,
  },
  registerPrompt: { fontSize: 14, color: "#60646C" },
  registerLink: { fontSize: 14, color: "#2563EB", fontWeight: "600" },
});
