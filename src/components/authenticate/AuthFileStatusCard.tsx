import { StyleSheet, Text, View } from 'react-native';
import FileWarning from '../../../assets/images/teach-blue/file-warning.svg';
import AcceptedIcon from '../../../assets/images/teach-blue/accepted.svg';
import { authColors } from './theme';

export function AuthFileStatusCard({
  title,
  fileName,
  status,
  description,
}: {
  title: string;
  fileName: string;
  status: 'rejected' | 'accepted';
  description?: string;
}) {
  const accepted = status === 'accepted';
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <View style={styles.iconBox}>
          {accepted ? <AcceptedIcon /> : <FileWarning />}
        </View>
        <View style={styles.fileInfo}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.fileName}>{fileName}</Text>
        </View>
        <Text style={[styles.status, accepted && styles.accepted]}>
          {accepted ? 'Diterima' : 'Ditolak'}
        </Text>
      </View>
      {description && <Text style={styles.description}>{description}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: authColors.surface, borderWidth: 1, borderColor: authColors.blue, borderRadius: 16, padding: 16, gap: 12, shadowColor: authColors.green, shadowOpacity: 0.2, shadowRadius: 14, shadowOffset: { width: 0, height: 0 } },
  row: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  iconBox: { width: 40, height: 44, borderRadius: 10, borderWidth: 1, borderColor: authColors.blue, backgroundColor: authColors.dark, alignItems: 'center', justifyContent: 'center' },
  fileInfo: { flex: 1, gap: 2 },
  title: { color: authColors.white, fontFamily: 'Nunito_700Bold', fontSize: 13 },
  fileName: { color: authColors.muted, fontFamily: 'Nunito_400Regular', fontSize: 11 },
  status: { color: authColors.white, fontFamily: 'Nunito_700Bold', fontSize: 11, borderWidth: 1, borderColor: authColors.blue, borderRadius: 6, paddingVertical: 3, paddingHorizontal: 8 },
  accepted: { color: authColors.green, borderWidth: 0 },
  description: { color: authColors.muted, fontFamily: 'Nunito_400Regular', fontSize: 12, lineHeight: 20, padding: 12, backgroundColor: authColors.dark, borderWidth: 1, borderColor: authColors.blue, borderRadius: 10 },
});
