import type { ReactNode } from 'react';
import { ScrollView, StyleSheet, Text, View, type ScrollViewProps } from 'react-native';
import Halo from '../../../assets/images/teach-blue/halo.svg';
import CornerAccent from '../../../assets/images/teach-blue/corner-accent.svg';
import { TeachBlueBrand } from './AuthBrand';
import { authColors } from './theme';

export function TeachBlueBackground() {
  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      <View style={styles.background} />
      <Halo style={styles.halo} />
      <CornerAccent style={styles.cornerAccent} />
    </View>
  );
}

export function TeachBlueScreen({
  children,
  contentStyle,
  scrollProps,
}: {
  children: ReactNode;
  contentStyle?: ScrollViewProps['contentContainerStyle'];
  scrollProps?: ScrollViewProps;
}) {
  return (
    <View style={styles.screen}>
      <TeachBlueBackground />
      <ScrollView
        contentContainerStyle={[styles.content, contentStyle]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        {...scrollProps}
      >
        {children}
      </ScrollView>
    </View>
  );
}

export function TeachBlueHeader() {
  return <TeachBlueBrand />;
}

export function TeachBlueFooter() {
  return (
    <Text style={styles.footer}>Mengajar berkualitas, bersama Bimblue.</Text>
  );
}

export function TeachBlueHeading({
  step,
  title,
  description,
}: {
  step: string;
  title: string;
  description: string;
}) {
  return (
    <View style={styles.heading}>
      <Text style={styles.step}>{step}</Text>
      <Text style={styles.headingTitle}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
}

export function TeachBlueSectionTitle({ children }: { children: string }) {
  return <Text style={styles.sectionTitle}>{children}</Text>;
}

export function TeachBlueCard({
  children,
  style,
}: {
  children: ReactNode;
  style?: object;
}) {
  return <View style={[styles.card, style]}>{children}</View>;
}

export function TeachBlueCaption({ children }: { children: string }) {
  return <Text style={styles.caption}>{children}</Text>;
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: authColors.dark },
  background: { ...StyleSheet.absoluteFill, backgroundColor: authColors.dark },
  halo: { position: 'absolute', right: -102, top: -52 },
  cornerAccent: { position: 'absolute', left: -80, bottom: -50 },
  content: { flexGrow: 1, width: '100%', maxWidth: 480, alignSelf: 'center', paddingHorizontal: 28, paddingTop: 36, paddingBottom: 42, gap: 24 },
  heading: { gap: 8 },
  step: { color: authColors.green, fontFamily: 'Nunito_700Bold', fontSize: 10, lineHeight: 20, textShadowColor: 'rgba(33,196,97,0.4)', textShadowRadius: 10 },
  headingTitle: { color: authColors.white, fontFamily: 'Nunito_700Bold', fontSize: 34, lineHeight: 44, textShadowColor: 'rgba(33,196,97,0.4)', textShadowRadius: 18 },
  description: { color: authColors.muted, fontFamily: 'Nunito_400Regular', fontSize: 13, lineHeight: 20 },
  sectionTitle: { color: authColors.white, fontFamily: 'Nunito_700Bold', fontSize: 17, lineHeight: 23 },
  card: { backgroundColor: authColors.surface, borderWidth: 1, borderColor: authColors.blue, borderRadius: 16, padding: 16, shadowColor: authColors.green, shadowOpacity: 0.2, shadowRadius: 14, shadowOffset: { width: 0, height: 0 } },
  caption: { color: authColors.muted, fontFamily: 'Nunito_400Regular', fontSize: 11, lineHeight: 20 },
  footer: { color: authColors.muted, fontFamily: 'Nunito_400Regular', fontSize: 10, lineHeight: 20, textAlign: 'center', marginTop: 'auto' },
});
