import { Stack } from 'expo-router';

export default function AuthenticateLayout() {
  return (
    <Stack screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />
      <Stack.Screen name="otp-verification" />
      <Stack.Screen name="user-info" />
      <Stack.Screen name="admin" />
      <Stack.Screen name="forgot-password" />
      <Stack.Screen name="forgot-password-otp" />
      <Stack.Screen name="reset-password" />
    </Stack>
  );
}
