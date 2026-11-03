import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import ApprovedMark from '../../../../assets/images/teach-blue/approved-mark.svg';
import ApprovedCheck from '../../../../assets/images/teach-blue/approved-check.svg';
import SparkleBlue from '../../../../assets/images/teach-blue/approved-sparkle-blue.svg';
import SparkleGreen from '../../../../assets/images/teach-blue/approved-sparkle-green.svg';
import {
  AuthPrimaryButton,
} from '../../../components/authenticate/AuthControls';
import {
  TeachBlueBackground,
} from '../../../components/authenticate/TeachBlueComponents';
import { authColors } from '../../../components/authenticate/theme';

export default function TeachBlueValidatedScreen() {
  return (
    <View style={styles.screen}>
      <StatusBar style="light" />
      <TeachBlueBackground />
      <SparkleBlue style={styles.blueSparkle} />
      <SparkleGreen style={styles.greenSparkle} />
      <View style={styles.content}>
        <View style={styles.hero}>
          <ApprovedMark />
          <View style={styles.checkBadge}>
            <ApprovedCheck />
          </View>
        </View>
        <Text style={styles.brand}>Teach Blue</Text>
        <View style={styles.status}>
          <Text style={styles.statusText}>AKUN TERVALIDASI</Text>
        </View>
        <Text style={styles.title}>Yeay akunmu tervalidasi dengan baik</Text>
        <Text style={styles.description}>
          Mari mulai jajaki kualitas mengajarmu.
        </Text>
        <AuthPrimaryButton
          theme="teach"
          label="Mulai mengajar"
          onPress={() => router.replace('/explore')}
        />
      </View>
      <Text style={styles.footer}>Mengajar berkualitas, bersama Bimblue.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: authColors.dark, justifyContent: 'center', paddingHorizontal: 28 },
  content: { alignItems: 'center', gap: 16, width: '100%', maxWidth: 480, alignSelf: 'center' },
  hero: { width: 180, height: 225, justifyContent: 'flex-end', alignItems: 'center', marginBottom: 8 },
  checkBadge: { position: 'absolute', right: 12, bottom: 1, width: 43, height: 43, borderRadius: 24, borderWidth: 4, borderColor: authColors.white, backgroundColor: authColors.green, alignItems: 'center', justifyContent: 'center' },
  brand: { color: authColors.white, fontFamily: 'Nunito_700Bold', fontSize: 42, textShadowColor: 'rgba(33,196,97,0.4)', textShadowRadius: 18 },
  status: { paddingVertical: 4, paddingHorizontal: 12, borderWidth: 1, borderColor: authColors.green, borderRadius: 18, backgroundColor: authColors.surface },
  statusText: { color: authColors.green, fontFamily: 'Nunito_700Bold', fontSize: 11 },
  title: { color: authColors.white, fontFamily: 'Nunito_700Bold', fontSize: 26, lineHeight: 34, textAlign: 'center', textShadowColor: 'rgba(33,196,97,0.4)', textShadowRadius: 18 },
  description: { color: authColors.muted, fontFamily: 'Nunito_400Regular', fontSize: 14, lineHeight: 21, textAlign: 'center', marginBottom: 16 },
  footer: { position: 'absolute', bottom: 47, left: 28, right: 28, color: authColors.muted, fontFamily: 'Nunito_400Regular', fontSize: 10, lineHeight: 20, textAlign: 'center' },
  blueSparkle: { position: 'absolute', left: 46, top: '28%' },
  greenSparkle: { position: 'absolute', right: 70, bottom: '28%' },
});
