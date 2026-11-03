import { StyleSheet, Text, View } from 'react-native';
import LogoMark from '../../../assets/images/teach-blue/logo-mark.svg';
import Sparkle from '../../../assets/images/teach-blue/sparkle.svg';

export function BimblueBrand() {
  return (
    <View style={styles.bimblue}>
      <View style={styles.bimblueMark}>
        <Text style={styles.bimblueLetter}>B</Text>
      </View>
      <Text style={styles.bimblueName}>Bimblue</Text>
    </View>
  );
}

export function TeachBlueBrand() {
  return (
    <View style={styles.teachBlue}>
      <View style={styles.teachBlueMark}>
        <LogoMark style={styles.logoMark} />
        <Sparkle style={styles.sparkle} />
      </View>
      <Text style={styles.teachBlueName}>Teach Blue</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  bimblue: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  bimblueMark: { width: 40, height: 40, borderRadius: 10, backgroundColor: '#2563EB', alignItems: 'center', justifyContent: 'center' },
  bimblueLetter: { color: '#FFFFFF', fontSize: 20, fontWeight: '700' },
  bimblueName: { fontSize: 22, fontWeight: '700', color: '#2563EB' },
  teachBlue: { flexDirection: 'row', alignItems: 'center', gap: 10, height: 38 },
  teachBlueMark: { width: 36, height: 36, overflow: 'hidden' },
  logoMark: { position: 'absolute', left: -16, top: -16 },
  sparkle: { position: 'absolute', left: 20, top: 16 },
  teachBlueName: { color: '#F8FAFF', fontFamily: 'Nunito_700Bold', fontSize: 25 },
});
