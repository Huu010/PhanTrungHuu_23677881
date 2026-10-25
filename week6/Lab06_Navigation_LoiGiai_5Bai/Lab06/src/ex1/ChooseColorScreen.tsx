import React, { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { SelectPhoneParamList } from './SelectPhoneApp';
import { ColorKey, Phone } from '../types';
import { COLOR_ORDER, PHONE_COLORS } from '../data/phones';
import { colors, formatPrice } from '../theme';
type Props = NativeStackScreenProps<SelectPhoneParamList, 'ChooseColor'> & { phone: Phone };
export function ChooseColorScreen({ route, navigation, phone }: Props) {
  const [picked, setPicked] = useState<ColorKey | undefined>(route.params?.color);
  const [line1, line2] = phone.name.split(' - ');
  return <SafeAreaView style={s.root}>
    <View style={s.header}>
      <Image source={PHONE_COLORS[picked ?? phone.defaultColor].image} style={s.thumb} resizeMode="contain" />
      <View style={s.headerText}><Text style={s.small}>{line1}</Text><Text style={s.small}>{line2}</Text>
        {/* TODO 3 */}
        {picked !== undefined && <>
          <Text style={s.small}>Màu: <Text style={s.bold}>{PHONE_COLORS[picked].label}</Text></Text>
          <Text style={s.small}>Cung cấp bởi <Text style={s.bold}>{phone.supplier}</Text></Text>
          <Text style={s.price}>{formatPrice(phone.price)}</Text>
        </>}
      </View>
    </View>
    <View style={s.body}>
      <Text style={s.hint}>Chọn một màu bên dưới:</Text>
      <View style={s.swatches}>{COLOR_ORDER.filter(key => phone.colors.includes(key)).map(key =>
        <Pressable key={key} accessibilityRole="button" accessibilityLabel={`Màu ${PHONE_COLORS[key].label}`}
          accessibilityState={{ selected: picked === key }} onPress={() => setPicked(key)}
          style={[s.swatch, { backgroundColor: PHONE_COLORS[key].hex }, picked === key && s.swatchOn]} />
      )}</View>
      {/* TODO 4: React Navigation 7 dùng popTo để quay lại và trả params. */}
      <Pressable style={s.done} onPress={() => navigation.popTo('Product', { color: picked })}><Text style={s.doneText}>XONG</Text></Pressable>
    </View>
  </SafeAreaView>;
}
const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', padding: 12, minHeight: 146, gap: 14 },
  thumb: { width: 92, height: 126 }, headerText: { flex: 1, paddingTop: 8, gap: 6 },
  small: { fontSize: 14 }, bold: { fontWeight: '700' }, price: { fontSize: 18, fontWeight: '700' },
  body: { flex: 1, backgroundColor: colors.grey, padding: 16 }, hint: { fontSize: 17 },
  swatches: { flex: 1, alignItems: 'center', justifyContent: 'space-evenly', paddingVertical: 8, gap: 8 },
  swatch: { flex: 1, maxHeight: 80, width: 80, minHeight: 36, borderWidth: 1, borderColor: '#bbb' },
  swatchOn: { borderWidth: 3, borderColor: colors.navy },
  done: { backgroundColor: colors.blue, borderRadius: 4, padding: 12, alignItems: 'center', marginTop: 12 },
  doneText: { color: '#fff', fontSize: 18, fontWeight: '700' },
});
