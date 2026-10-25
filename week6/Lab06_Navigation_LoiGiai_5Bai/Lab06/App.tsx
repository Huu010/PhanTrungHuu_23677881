import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { SelectPhoneLocal } from './src/ex1/SelectPhoneApp';
import { SelectPhoneApi } from './src/ex1/SelectPhoneApi';
import { BottomTabApp } from './src/ex3/BottomTabApp';
import { StackTabApp } from './src/ex4/StackTabApp';
import { DrawerApp } from './src/ex5/DrawerApp';
import { colors, common } from './src/theme';
// 0: menu. Đổi thành 1..5 để mở độc lập, không có thanh quay lại menu khi chụp ảnh.
const START_EXERCISE: number = 0;
const EXERCISES = [SelectPhoneLocal, SelectPhoneApi, BottomTabApp, StackTabApp, DrawerApp];
const LABELS = ['Select Phone', 'Select Phone + API', 'Bottom Tab', 'Stack + Tab + Params', 'Drawer'];
export default function App() {
  const [exercise, setExercise] = useState(START_EXERCISE);
  const Screen = EXERCISES[exercise - 1];
  return <GestureHandlerRootView style={{ flex: 1 }}><SafeAreaProvider>
    {Screen ? <View style={{ flex: 1 }}>
      {START_EXERCISE === 0 && <SafeAreaView edges={['top']} style={s.bar}><Pressable onPress={() => setExercise(0)} style={{ padding: 10 }}><Text>‹ MENU · BÀI {exercise}</Text></Pressable></SafeAreaView>}
      <View style={{ flex: 1 }}><Screen /></View>
    </View> : <SafeAreaView style={{ flex: 1 }}><ScrollView contentContainerStyle={s.menu}>
      <Text style={common.big}>LAB 06 · NAVIGATION</Text><Text style={common.muted}>Chọn bài để chạy và kiểm tra riêng.</Text>
      {LABELS.map((label, i) => <Pressable key={label} style={common.card} onPress={() => setExercise(i + 1)}><Text>Bài {i + 1} · {label}</Text></Pressable>)}
    </ScrollView></SafeAreaView>}
  </SafeAreaProvider></GestureHandlerRootView>;
}
const s = StyleSheet.create({ menu: { padding: 20, gap: 18 }, bar: { backgroundColor: '#fff', borderBottomWidth: 1, borderColor: colors.line } });
