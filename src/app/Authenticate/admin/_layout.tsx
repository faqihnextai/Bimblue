import { Nunito_400Regular, Nunito_700Bold } from '@expo-google-fonts/nunito';
import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';

export default function TeachBlueLayout() {
  const [fontsLoaded, fontError] = useFonts({
    Nunito_400Regular,
    Nunito_700Bold,
  });

  if (fontError) throw fontError;
  if (!fontsLoaded) return null;

  return (
    <Stack screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
      <Stack.Screen name="register" />
      <Stack.Screen name="otp-verification" />
      <Stack.Screen name="profile" />
      <Stack.Screen name="pending-validation" />
      <Stack.Screen name="document-revision" />
      <Stack.Screen name="validated" />
    </Stack>
  );
}
