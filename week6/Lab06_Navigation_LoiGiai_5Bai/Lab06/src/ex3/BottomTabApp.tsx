import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { PHONES } from '../data/phones';
import { colors, common } from '../theme';
type TabParamList = { Home: undefined; Search: undefined; Profile: undefined };
const Tab = createBottomTabNavigator<TabParamList>();
const ICONS: Record<keyof TabParamList, [keyof typeof Ionicons.glyphMap, keyof typeof Ionicons.glyphMap]> = {
  Home: ['home', 'home-outline'], Search: ['search', 'search-outline'], Profile: ['person', 'person-outline'],
};
function HomeTab() {
  return <FlatList data={PHONES} keyExtractor={p => p.id} contentContainerStyle={s.list}
    renderItem={({ item }) => <View style={common.card}><Text>{item.name.split(' - ')[0]}</Text></View>} />;
}
function SearchTab() {
  const [keyword, setKeyword] = useState('');
  const found = PHONES.filter(p => p.name.toLowerCase().includes(keyword.trim().toLowerCase()));
  return <View style={{ flex: 1 }}><TextInput value={keyword} onChangeText={setKeyword} placeholder="Nhập từ khóa" style={s.input} />
    <FlatList data={found} keyExtractor={p => p.id} keyboardShouldPersistTaps="handled" contentContainerStyle={s.list}
      ListEmptyComponent={<Text>Không có kết quả cho “{keyword}”</Text>}
      renderItem={({ item }) => <View style={common.card}><Text>{item.name.split(' - ')[0]}</Text></View>} /></View>;
}
function ProfileTab() {
  return <View style={common.center}><View style={common.avatar}><Text style={common.avatarText}>NA</Text></View>
    <Text style={common.big}>Nguyễn Văn An</Text><Text style={common.muted}>an.nguyen@example.com</Text></View>;
}
export function BottomTabApp() {
  return <NavigationContainer><Tab.Navigator screenOptions={({ route }) => ({ tabBarActiveTintColor: colors.red,
    tabBarIcon: ({ focused, color, size }) => <Ionicons name={ICONS[route.name][focused ? 0 : 1]} color={color} size={size} />,
  })}>
    <Tab.Screen name="Home" component={HomeTab} options={{ title: 'Trang chủ' }} />
    <Tab.Screen name="Search" component={SearchTab} options={{ title: 'Tìm kiếm' }} />
    <Tab.Screen name="Profile" component={ProfileTab} options={{ title: 'Cá nhân' }} />
  </Tab.Navigator></NavigationContainer>;
}
const s = StyleSheet.create({ list: { padding: 16, gap: 10 }, input: { margin: 16, marginBottom: 0, borderWidth: 1, borderColor: colors.line, borderRadius: 8, padding: 14, backgroundColor: '#fff' } });
