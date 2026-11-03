import { Stack } from 'expo-router';

export default function BeforeLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="splash" />
      <Stack.Screen name="onboarding" />
      <Stack.Screen name="motivation-splash" />
    </Stack>
  );
}
