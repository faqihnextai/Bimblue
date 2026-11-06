// src/app/_layout.tsx (Root Layout Utama)
import { useEffect } from 'react';
import { useFonts, Nunito_400Regular, Nunito_700Bold } from '@expo-google-fonts/nunito';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';

// Mencegah splash native hilang sebelum font siap
SplashScreen.preventAutoHideAsync().catch(() => {});

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    Nunito_400Regular,
    Nunito_700Bold,
  });

  useEffect(() => {
    // Sembunyikan splash native begitu font siap ATAU jika font error (agar tidak stuck)
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync().catch(() => {});
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <Stack screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
      {/* 1. File index.tsx (Pintu Gerbang Masuk) */}
      <Stack.Screen name="index" />

      {/* 2. Folder before (Splash, Onboarding, Motivation) */}
      <Stack.Screen name="before" />

      {/* 3. Folder Authenticate (Login, Register, Validasi) */}
      <Stack.Screen name="Authenticate" />

      {/* 4. Folder Dashboard (User & Admin) */}
      <Stack.Screen name="Dashboard" />

      {/* 5. Layar template explore (jika masih ada) */}
      <Stack.Screen name="explore" />
    </Stack>
  );
}