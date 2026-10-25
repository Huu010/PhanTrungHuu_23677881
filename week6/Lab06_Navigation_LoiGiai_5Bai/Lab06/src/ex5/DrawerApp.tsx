import React, { createContext, useContext, useState } from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';
import { DarkTheme, DefaultTheme, NavigationContainer, useTheme } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import { colors, common } from '../theme';

type DrawerParamList = { Home: undefined; Profile: undefined; Settings: undefined };
const Drawer = createDrawerNavigator<DrawerParamList>();
type Settings = {
  notify: boolean;
  dark: boolean;
  setNotify: (value: boolean) => void;
  setDark: (value: boolean) => void;
};
// Đặt state ngoài các màn để giữ lựa chọn khi chuyển mục Drawer.
const SettingsContext = createContext<Settings | null>(null);
function useSettings() {
  const value = useContext(SettingsContext);
  if (!value) throw new Error('Thiếu SettingsContext của Bài 5');
  return value;
}
function HomeScreen() {
  const { colors: theme } = useTheme();
  return <View style={[common.center, { backgroundColor: theme.background }]}>
    <Text style={[common.big, { color: theme.text }]}>Xin chào 👋</Text>
  </View>;
}
function ProfileScreen() {
  const { colors: theme } = useTheme();
  return <View style={[common.center, { backgroundColor: theme.background }]}>
    <View style={common.avatar}><Text style={common.avatarText}>NA</Text></View>
    <Text style={[common.big, { color: theme.text }]}>Nguyễn Văn An</Text>
    <Text style={{ color: theme.text }}>an.nguyen@example.com</Text>
  </View>;
}
function SettingsScreen() {
  const { notify, dark, setNotify, setDark } = useSettings();
  const { colors: theme } = useTheme();
  return <View style={[s.settings, { backgroundColor: theme.background }]}>
    <View style={s.row}>
      <Text style={{ color: theme.text }}>Nhận thông báo</Text>
      <Switch accessibilityLabel="Nhận thông báo" value={notify} onValueChange={setNotify} />
    </View>
    <View style={s.row}>
      <Text style={{ color: theme.text }}>Giao diện tối</Text>
      <Switch accessibilityLabel="Giao diện tối" value={dark} onValueChange={setDark} />
    </View>
    <Text style={{ color: theme.text }}>Thông báo: {notify ? 'BẬT' : 'TẮT'} · Giao diện: {dark ? 'tối' : 'sáng'}</Text>
  </View>;
}
const ICONS: Record<keyof DrawerParamList, keyof typeof Ionicons.glyphMap> = {
  Home: 'home-outline', Profile: 'person-outline', Settings: 'settings-outline',
};
export function DrawerApp() {
  const [notify, setNotify] = useState(true);
  const [dark, setDark] = useState(false);
  const base = dark ? DarkTheme : DefaultTheme;
  const theme = { ...base, colors: { ...base.colors, primary: colors.red } };
  return <SettingsContext.Provider value={{ notify, dark, setNotify, setDark }}>
    <NavigationContainer theme={theme}>
      <Drawer.Navigator screenOptions={({ route }) => ({
        drawerActiveTintColor: colors.red,
        drawerInactiveTintColor: theme.colors.text,
        drawerStyle: { backgroundColor: theme.colors.card },
        headerStyle: { backgroundColor: theme.colors.card },
        headerTintColor: theme.colors.text,
        drawerIcon: ({ color, size }) => <Ionicons name={ICONS[route.name]} color={color} size={size} />,
      })}>
        <Drawer.Screen name="Home" component={HomeScreen} options={{ title: 'Trang chủ' }} />
        <Drawer.Screen name="Profile" component={ProfileScreen} options={{ title: 'Cá nhân' }} />
        <Drawer.Screen name="Settings" component={SettingsScreen} options={{ title: 'Cài đặt' }} />
      </Drawer.Navigator>
    </NavigationContainer>
  </SettingsContext.Provider>;
}
const s = StyleSheet.create({
  settings: { flex: 1, padding: 20, gap: 20 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
});
