// src/app/Dashboard/_layout.tsx
import { Tabs } from "expo-router";
import { SymbolView } from "expo-symbols";
import { Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function UserDashboardLayout() {
  const insets = useSafeAreaInsets();

  // Menyesuaikan tinggi bar secara dinamis sesuai safe area HP pengguna
  const bottomInset =
    insets.bottom > 0 ? insets.bottom : Platform.OS === "android" ? 12 : 8;
  const tabHeight = 56 + bottomInset;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#2563EB",
        tabBarInactiveTintColor: "#94A3B8",
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          borderTopColor: "#F1F5F9",
          borderTopWidth: 1,
          height: tabHeight,
          paddingBottom: bottomInset,
          paddingTop: 8,
          elevation: 8,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.05,
          shadowRadius: 4,
        },
        tabBarLabelStyle: {
          fontFamily: "Nunito_700Bold",
          fontSize: 11,
        },
      }}
    >
      {/* 1. Layar Loading Awal (disembunyikan dari bar tab) */}
      <Tabs.Screen
        name="ScrnLoad"
        options={{
          href: null,
        }}
      />

      {/* 2. Menu Beranda */}
      <Tabs.Screen
        name="home"
        options={{
          title: "Beranda",
          tabBarIcon: ({ color }) => (
            <SymbolView
              name={{ ios: "house.fill", android: "home", web: "home" }}
              tintColor={color}
              size={22}
            />
          ),
        }}
      />

      {/* 3. Menu Chat & Pesanan */}
      <Tabs.Screen
        name="chats"
        options={{
          title: "Chat & pesanan",
          tabBarIcon: ({ color }) => (
            <SymbolView
              name={{
                ios: "bubble.left.and.bubble.right.fill",
                android: "chat",
                web: "chat",
              }}
              tintColor={color}
              size={22}
            />
          ),
        }}
      />

      {/* 4. Menu Profil */}
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profil",
          tabBarIcon: ({ color }) => (
            <SymbolView
              name={{ ios: "person.fill", android: "person", web: "person" }}
              tintColor={color}
              size={22}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="Mhome"
        options={{
          href: null,
          tabBarStyle: { display: "none" },
        }}
      />

      {/* Sembunyikan folder Admin dari menu tab user */}
      <Tabs.Screen
        name="Admin"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
