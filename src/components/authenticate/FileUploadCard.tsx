import { useState } from 'react';
import * as DocumentPicker from 'expo-document-picker';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import UploadIcon from '../../../assets/images/teach-blue/upload.svg';
import { authColors } from './theme';

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const FILE_TYPES = ['image/jpeg', 'image/png', 'application/pdf'];

export function FileUploadCard({
  label,
  description,
  required = true,
  initialFileName,
  onFileSelected,
  compact = false,
}: {
  label: string;
  description: string;
  required?: boolean;
  initialFileName?: string;
  onFileSelected?: (file: DocumentPicker.DocumentPickerAsset) => void;
  compact?: boolean;
}) {
  const [file, setFile] = useState<DocumentPicker.DocumentPickerAsset | null>(null);
  const [error, setError] = useState<string | null>(null);

  const chooseFile = async () => {
    setError(null);
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: FILE_TYPES,
        copyToCacheDirectory: true,
        multiple: false,
      });

      if (result.canceled) return;

      const selectedFile = result.assets[0];
      if (selectedFile.size !== undefined && selectedFile.size > MAX_FILE_SIZE) {
        setError('Ukuran berkas melebihi 5 MB.');
        return;
      }

      setFile(selectedFile);
      onFileSelected?.(selectedFile);
    } catch (pickerError) {
      setError(
        pickerError instanceof Error
          ? `Berkas tidak dapat dibuka: ${pickerError.message}`
          : 'Berkas tidak dapat dibuka. Coba lagi.',
      );
    }
  };

  const fileName = file?.name ?? initialFileName;

  return (
    <View style={styles.group}>
      <View style={styles.labelRow}>
        <Text style={styles.label}>{label}</Text>
        <Text style={[styles.requirement, !required && styles.optional]}>
          {required ? 'Wajib' : 'Tambahan'}
        </Text>
      </View>
      <Text style={styles.description}>{description}</Text>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`${fileName ? 'Ganti' : 'Pilih'} berkas ${label}`}
        onPress={chooseFile}
        style={({ pressed }) => [
          styles.dropzone,
          compact && styles.compactDropzone,
          pressed && styles.pressed,
        ]}
      >
        {fileName ? (
          <>
            <UploadIcon />
            <Text numberOfLines={1} style={styles.selectedFile}>{fileName}</Text>
            <Text style={styles.fileHint}>Ketuk untuk mengganti berkas</Text>
          </>
        ) : (
          <>
            <UploadIcon />
            <Text style={styles.dropzoneTitle}>Pilih berkas untuk diunggah</Text>
            <Text style={styles.fileHint}>JPG, PNG, atau PDF · Maks. 5 MB</Text>
          </>
        )}
      </Pressable>
      {error && <Text accessibilityRole="alert" style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  group: { gap: 6 },
  labelRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  label: { flex: 1, color: authColors.white, fontFamily: 'Nunito_700Bold', fontSize: 13, lineHeight: 20 },
  requirement: { color: authColors.blue, fontFamily: 'Nunito_700Bold', fontSize: 10, backgroundColor: authColors.surface, borderWidth: 1, borderColor: authColors.blue, borderRadius: 6, overflow: 'hidden', paddingHorizontal: 7, paddingVertical: 2 },
  optional: { color: authColors.muted },
  description: { color: authColors.muted, fontFamily: 'Nunito_400Regular', fontSize: 11, lineHeight: 20 },
  dropzone: { minHeight: 94, alignItems: 'center', justifyContent: 'center', gap: 5, padding: 16, borderWidth: 1, borderStyle: 'dashed', borderColor: authColors.blue, borderRadius: 12, backgroundColor: authColors.dark },
  compactDropzone: { minHeight: 96, paddingVertical: 12 },
  pressed: { opacity: 0.8 },
  dropzoneTitle: { color: authColors.blue, fontFamily: 'Nunito_700Bold', fontSize: 13, lineHeight: 20, textAlign: 'center' },
  selectedFile: { maxWidth: '100%', color: authColors.white, fontFamily: 'Nunito_700Bold', fontSize: 13, lineHeight: 20, textAlign: 'center' },
  fileHint: { color: authColors.muted, fontFamily: 'Nunito_400Regular', fontSize: 10, lineHeight: 20, textAlign: 'center' },
  error: { color: authColors.error, fontFamily: 'Nunito_400Regular', fontSize: 11, lineHeight: 16 },
});
