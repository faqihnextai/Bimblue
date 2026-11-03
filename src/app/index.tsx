import { Redirect } from 'expo-router';

/**
 * Root entry point.
 * Immediately redirects to the Authenticate flow (Splash Screen).
 * After successful login/register, Authenticate screens will navigate to the main app.
 */
export default function Index() {
  return <Redirect href="/before/splash" />;
}
