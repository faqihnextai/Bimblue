import { Tabs } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import { Platform } from 'react-native';

export default function AdminDashboardLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#22C55E', // Hijau Teach Blue
        tabBarInactiveTintColor: '#64748B',
        tabBarStyle: {
          backgroundColor: '#0F172A', // Latar gelap Teach Blue
          borderTopColor: 'rgba(37, 99, 235, 0.2)',
          height: Platform.OS === 'ios' ? 88 : 64,
          paddingBottom: Platform.OS === 'ios' ? 28 : 10,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontFamily: 'Nunito_700Bold',
          fontSize: 11,
        },
      }}
    >
      {/* Layar Loading ScrnLoad Admin: href: null agar tombolnya tidak muncul di bar bawah */}
      <Tabs.Screen
        name="ScrnLoad"
        options={{
          href: null,
        }}
      />

      {/* Menu Dasbor Pengajar */}
      <Tabs.Screen
        name="home"
        options={{
          title: 'Dasbor',
          tabBarIcon: ({ color }) => (
            <SymbolView
              name={{ ios: 'chart.bar.fill', android: 'bar_chart', web: 'bar_chart' }}
              tintColor={color}
              size={22}
            />
          ),
        }}
      />
    </Tabs>
  );
}