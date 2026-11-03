import { type ReactNode, useRef } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  type TextInputProps,
  View,
} from 'react-native';
import PasswordEye from '../../../assets/images/teach-blue/password-eye.svg';
import PasswordCheck from '../../../assets/images/teach-blue/password-check.svg';
import { authColors } from './theme';

type Theme = 'light' | 'teach';

type AuthTextFieldProps = Omit<TextInputProps, 'style'> & {
  label?: string;
  theme?: Theme;
  trailing?: ReactNode;
  inputStyle?: TextInputProps['style'];
};

export function AuthTextField({
  label,
  theme = 'light',
  trailing,
  inputStyle,
  ...inputProps
}: AuthTextFieldProps) {
  const teach = theme === 'teach';
  return (
    <View style={styles.fieldGroup}>
      {label && <Text style={[styles.fieldLabel, teach && styles.teachLabel]}>{label}</Text>}
      <View
        style={[
          styles.inputWrap,
          teach && styles.teachInputWrap,
          inputProps.multiline && styles.multilineWrap,
        ]}
      >
        <TextInput
          placeholderTextColor={teach ? authColors.muted : '#9CA3AF'}
          {...inputProps}
          style={[
            styles.input,
            teach && styles.teachInput,
            inputProps.multiline && styles.multiline,
            inputStyle,
          ]}
          textAlignVertical={inputProps.multiline ? 'top' : inputProps.textAlignVertical}
        />
        {trailing}
      </View>
    </View>
  );
}

type AuthPasswordFieldProps = {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  placeholder: string;
  visible: boolean;
  onToggle: () => void;
  theme?: Theme;
};

export function AuthPasswordField({
  label,
  value,
  onChangeText,
  placeholder,
  visible,
  onToggle,
  theme = 'light',
}: AuthPasswordFieldProps) {
  const teach = theme === 'teach';
  return (
    <AuthTextField
      label={label}
      theme={theme}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      secureTextEntry={!visible}
      autoCapitalize="none"
      inputStyle={styles.passwordInput}
      trailing={
        <Pressable onPress={onToggle} style={styles.passwordToggle} hitSlop={8}>
          {teach ? (
            <PasswordEye />
          ) : (
            <Text style={styles.lightEye}>{visible ? '🙈' : '👁️'}</Text>
          )}
        </Pressable>
      }
    />
  );
}

type AuthPrimaryButtonProps = {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  theme?: Theme;
};

export function AuthPrimaryButton({
  label,
  onPress,
  disabled = false,
  loading = false,
  theme = 'light',
}: AuthPrimaryButtonProps) {
  const teach = theme === 'teach';
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: disabled || loading }}
      disabled={disabled || loading}
      onPress={onPress}
      style={({ pressed }) => [
        styles.primaryButton,
        teach && styles.teachButton,
        (disabled || loading) && styles.buttonDisabled,
        pressed && !disabled && !loading && styles.buttonPressed,
      ]}
    >
      <Text style={[styles.buttonText, teach && styles.teachButtonText]}>
        {loading ? 'Memuat...' : label}
      </Text>
    </Pressable>
  );
}

export function AuthDivider({
  label,
  theme = 'light',
}: {
  label: string;
  theme?: Theme;
}) {
  const teach = theme === 'teach';
  return (
    <View style={styles.divider}>
      <View style={[styles.dividerLine, teach && styles.teachDividerLine]} />
      <Text style={[styles.dividerText, teach && styles.teachDividerText]}>{label}</Text>
      <View style={[styles.dividerLine, teach && styles.teachDividerLine]} />
    </View>
  );
}

export function AuthGoogleButton({
  label,
  theme = 'teach',
}: {
  label: string;
  theme?: Theme;
}) {
  const teach = theme === 'teach';
  return (
    <Pressable
      accessibilityRole="button"
      style={[styles.googleButton, !teach && styles.lightGoogleButton]}
    >
      <View style={styles.googleBadge}>
        <Text style={styles.googleLetter}>G</Text>
      </View>
      <Text style={[styles.googleText, !teach && styles.lightGoogleText]}>{label}</Text>
    </Pressable>
  );
}

export function AuthPasswordHint({ valid, label }: { valid: boolean; label: string }) {
  return (
    <View style={styles.passwordHint}>
      {valid ? <PasswordCheck /> : <View style={styles.emptyCheck} />}
      <Text style={styles.passwordHintText}>{label}</Text>
    </View>
  );
}

export function PasswordRuleList({
  rules,
}: {
  rules: Array<{ label: string; met: boolean }>;
}) {
  return (
    <View style={styles.rulesBox}>
      {rules.map(({ label, met }) => (
        <View key={label} style={styles.ruleRow}>
          <Text style={[styles.ruleIcon, met && styles.ruleMet]}>{met ? '✓' : '○'}</Text>
          <Text style={[styles.ruleLabel, met && styles.ruleLabelMet]}>{label}</Text>
        </View>
      ))}
    </View>
  );
}

type AuthOtpFieldProps = {
  value: string;
  onChangeText: (value: string) => void;
  theme?: Theme;
  length?: number;
};

export function AuthOtpField({
  value,
  onChangeText,
  theme = 'light',
  length = 6,
}: AuthOtpFieldProps) {
  const inputRef = useRef<React.ElementRef<typeof TextInput>>(null);
  const teach = theme === 'teach';

  return (
    <Pressable
      accessibilityLabel="Kode verifikasi"
      onPress={() => inputRef.current?.focus()}
      style={styles.otpRow}
    >
      {Array.from({ length }, (_, index) => (
        <View
          key={index}
          style={[
            styles.otpBox,
            teach && styles.teachOtpBox,
            value[index] && (teach ? styles.teachOtpFilled : styles.otpFilled),
          ]}
        >
          <Text style={[styles.otpDigit, teach && styles.teachOtpDigit]}>
            {value[index] ?? ''}
          </Text>
        </View>
      ))}
      <TextInput
        ref={inputRef}
        accessibilityLabel="Masukkan kode OTP enam digit"
        autoComplete="sms-otp"
        caretHidden
        keyboardType="number-pad"
        maxLength={length}
        onChangeText={(text) => onChangeText(text.replace(/\D/g, '').slice(0, length))}
        style={styles.hiddenOtpInput}
        textContentType="oneTimeCode"
        value={value}
      />
    </Pressable>
  );
}

export function AuthIconCard({
  icon,
  children,
}: {
  icon: string;
  children?: ReactNode;
}) {
  return (
    <View style={styles.iconCard}>
      <Text style={styles.iconCardEmoji}>{icon}</Text>
      {children}
    </View>
  );
}

export function AuthBackdrop() {
  return (
    <View pointerEvents="none" style={styles.lightBackdrop}>
      <View style={styles.lightBlobBlue} />
      <View style={styles.lightBlobMint} />
    </View>
  );
}

const styles = StyleSheet.create({
  fieldGroup: { gap: 6 },
  fieldLabel: { fontSize: 13, fontWeight: '600', color: '#374151' },
  teachLabel: { color: authColors.white, fontFamily: 'Nunito_700Bold' },
  inputWrap: { flexDirection: 'row', alignItems: 'center', borderWidth: 1.5, borderColor: '#E5E7EB', borderRadius: 12, backgroundColor: '#F9FAFB', overflow: 'hidden' },
  teachInputWrap: { minHeight: 48, borderColor: authColors.blue, backgroundColor: authColors.surface, borderRadius: 12, paddingHorizontal: 14, shadowColor: authColors.green, shadowOpacity: 0.12, shadowRadius: 8, shadowOffset: { width: 0, height: 0 } },
  multilineWrap: { alignItems: 'flex-start', paddingVertical: 8 },
  input: { flex: 1, height: 48, paddingHorizontal: 14, fontSize: 15, color: '#111827' },
  teachInput: { paddingHorizontal: 0, color: authColors.white, fontFamily: 'Nunito_400Regular', fontSize: 14 },
  multiline: { height: 92, textAlignVertical: 'top', paddingTop: 12 },
  passwordInput: { paddingRight: 48 },
  passwordToggle: { minWidth: 28, height: 36, alignItems: 'center', justifyContent: 'center' },
  lightEye: { fontSize: 16 },
  googleButton: { height: 48, flexDirection: 'row', alignItems: 'center', gap: 9, paddingHorizontal: 17, backgroundColor: authColors.surface, borderWidth: 1, borderColor: authColors.blue, borderRadius: 13, shadowColor: authColors.green, shadowOpacity: 0.2, shadowRadius: 14, shadowOffset: { width: 0, height: 0 } },
  lightGoogleButton: { height: 52, justifyContent: 'center', gap: 10, paddingHorizontal: 14, backgroundColor: '#FFFFFF', borderWidth: 1.5, borderColor: '#E5E7EB', shadowOpacity: 0, elevation: 0 },
  googleBadge: { width: 21, height: 21, alignItems: 'center', justifyContent: 'center', borderRadius: 11, backgroundColor: authColors.blue },
  googleLetter: { color: authColors.white, fontFamily: 'Nunito_700Bold', fontSize: 15 },
  googleText: { flex: 1, color: authColors.white, fontFamily: 'Nunito_700Bold', fontSize: 14, textAlign: 'center', marginRight: 30 },
  lightGoogleText: { color: '#374151', fontFamily: undefined, fontSize: 15, fontWeight: '500', marginRight: 0 },
  primaryButton: { height: 52, borderRadius: 14, backgroundColor: '#2563EB', alignItems: 'center', justifyContent: 'center', marginTop: 4, shadowColor: '#2563EB', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.25, shadowRadius: 8, elevation: 4 },
  teachButton: { height: 50, backgroundColor: authColors.blue, shadowColor: authColors.green, shadowOpacity: 0.4, shadowRadius: 18, shadowOffset: { width: 0, height: 0 }, elevation: 5 },
  buttonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '600' },
  teachButtonText: { fontFamily: 'Nunito_700Bold', fontSize: 15 },
  buttonDisabled: { opacity: 0.45 },
  buttonPressed: { opacity: 0.84 },
  divider: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  dividerLine: { flex: 1, height: 1, backgroundColor: 'rgba(37,99,235,0.4)' },
  dividerText: { color: '#AFC2FF', fontSize: 9, fontFamily: 'Nunito_400Regular' },
  passwordHint: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  emptyCheck: { width: 13, height: 13, borderRadius: 7, borderWidth: 1.5, borderColor: authColors.muted },
  passwordHintText: { color: authColors.muted, fontSize: 10, fontFamily: 'Nunito_400Regular' },
  rulesBox: { backgroundColor: '#F9FAFB', borderRadius: 12, borderWidth: 1, borderColor: '#E5E7EB', padding: 14, gap: 6 },
  ruleRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  ruleIcon: { fontSize: 14, width: 18, color: '#9CA3AF' },
  ruleMet: { color: '#16A34A' },
  ruleLabel: { color: '#60646C', fontSize: 13 },
  ruleLabelMet: { color: '#16A34A' },
  otpRow: { width: '100%', flexDirection: 'row', justifyContent: 'space-between', gap: 8, position: 'relative' },
  otpBox: { flex: 1, maxWidth: 49, height: 56, borderWidth: 1.5, borderColor: '#E5E7EB', borderRadius: 12, backgroundColor: '#F9FAFB', alignItems: 'center', justifyContent: 'center' },
  teachOtpBox: { borderColor: authColors.blue, backgroundColor: authColors.surface },
  otpFilled: { borderColor: '#2563EB', backgroundColor: '#EFF6FF' },
  teachOtpFilled: { borderColor: authColors.green, borderWidth: 1.5 },
  otpDigit: { color: '#111827', fontSize: 22, fontWeight: '700' },
  teachOtpDigit: { color: authColors.white, fontSize: 24, fontFamily: 'Nunito_700Bold' },
  hiddenOtpInput: { position: 'absolute', top: 0, left: 0, width: 1, height: 1, opacity: 0 },
  iconCard: { alignItems: 'center', gap: 12 },
  iconCardEmoji: { fontSize: 40 },
  lightBackdrop: { ...StyleSheet.absoluteFill, overflow: 'hidden' },
  teachDividerLine: { backgroundColor: 'rgba(37,99,235,0.4)' },
  teachDividerText: { color: authColors.muted, fontFamily: 'Nunito_400Regular', fontSize: 9 },
  lightBlobBlue: { position: 'absolute', top: -60, left: -80, width: 260, height: 260, borderRadius: 130, backgroundColor: '#DBEBFE', opacity: 0.45 },
  lightBlobMint: { position: 'absolute', top: 100, right: -60, width: 180, height: 180, borderRadius: 90, backgroundColor: '#DCFCE7', opacity: 0.45 },
});
