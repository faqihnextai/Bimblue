// src/app/index.tsx
import { authSession } from "@/constants/authSession";
import { Redirect } from "expo-router";

export default function Index() {
  // 1. Jika sudah pernah login selama sesi Expo aktif:
  if (authSession.isLoggedIn) {
    if (authSession.role === "admin") {
      // Langsung loncat ke Dashboard Admin tanpa melewati login/splash
      return <Redirect href="/Dashboard/Admin/home" />;
    }
    // Langsung loncat ke Dashboard User
    return <Redirect href="/Dashboard/home" />;
  }

  // 2. Jika belum login (pertama kali buka / Expo baru nyala):
  return <Redirect href="/before/splash" />;
}
