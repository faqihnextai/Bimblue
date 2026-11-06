import { router } from "expo-router";

export type UserRole = "user" | "admin";

interface SessionData {
  isLoggedIn: boolean;
  role: UserRole | null;
  username: string | null;
}

export const authSession: SessionData = {
  isLoggedIn: false,
  role: null,
  username: null,
};

export function authenticateAccount(
  identifier: string,
  password: string,
): UserRole | null {
  const cleanId = identifier.trim().toLowerCase();
  const cleanPw = password.trim();

  if (
    (cleanId === "admin" || cleanId === "admin@bimblue.com") &&
    cleanPw === "123"
  ) {
    setAuthSession("admin", "admin");
    return "admin";
  }

  if (
    (cleanId === "user" || cleanId === "user@bimblue.com") &&
    cleanPw === "123"
  ) {
    setAuthSession("user", "user");
    return "user";
  }

  return null;
}

export function setAuthSession(role: UserRole, username?: string) {
  authSession.isLoggedIn = true;
  authSession.role = role;
  authSession.username = username ?? role;
}

export function logoutSession() {
  authSession.isLoggedIn = false;
  authSession.role = null;
  authSession.username = null;
  router.replace("/Authenticate/login");
}
