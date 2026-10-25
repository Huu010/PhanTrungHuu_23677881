import React from 'react';
import { Alert, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { SelectPhoneParamList } from './SelectPhoneApp';
import { Phone } from '../types';
import { PHONE_COLORS } from '../data/phones';
import { Stars } from '../components/Stars';
import { colors, formatPrice } from '../theme';
type Props = NativeStackScreenProps<SelectPhoneParamList, 'Product'> & { phone: Phone };
export function ProductScreen({ navigation, route, phone }: Props) {
  const picked = route.params?.color;
  const shown = picked ?? phone.defaultColor;
  return <SafeAreaView style={s.root}>
    <View style={s.imageWrap}><Image source={PHONE_COLORS[shown].image} style={s.image} resizeMode="contain" /></View>
    <View style={s.info}>
      <Text style={s.name}>{phone.name}</Text>
      <View style={s.row}><Stars value={phone.rating} /><Text style={s.review}>(Xem {phone.reviewCount} đánh giá)</Text></View>
      <View style={s.row}><Text style={s.price}>{formatPrice(phone.price)}</Text><Text style={s.oldPrice}>{formatPrice(phone.oldPrice)}</Text></View>
      <View style={s.row}><Text style={s.badge}>{phone.badge}</Text><Text style={s.question}>?</Text></View>
      {/* TODO 1: gửi màu đã xác nhận sang ChooseColor. */}
      <Pressable accessibilityRole="button" style={s.chooseBtn} onPress={() => navigation.navigate('ChooseColor', { color: picked })}>
        <Text>{picked ? '4 MÀU-CHỌN LOẠI' : '4 MÀU-CHỌN MÀU'}</Text><Text style={s.arrow}>›</Text>
      </Pressable>
    </View>
    {/* TODO 2: ngoài info, sát đáy. Thông báo minh họa, không có giao dịch. */}
    <Pressable style={s.buyBtn} onPress={() => Alert.alert('Chọn mua', `${phone.name}\nMàu: ${PHONE_COLORS[shown].label}\n${formatPrice(phone.price)}`)}>
      <Text style={s.buyText}>CHỌN MUA</Text>
    </Pressable>
  </SafeAreaView>;
}
const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 16 },
  imageWrap: { flex: 1, minHeight: 100, alignItems: 'center', paddingTop: 10 },
  image: { width: '100%', height: '100%' },
  info: { paddingTop: 12, paddingBottom: 22, gap: 14 },
  name: { fontSize: 14, color: colors.text }, row: { flexDirection: 'row', alignItems: 'center', gap: 20 },
  review: { fontSize: 13 }, price: { fontWeight: '700', fontSize: 18 },
  oldPrice: { textDecorationLine: 'line-through', color: colors.muted, fontSize: 14 },
  badge: { color: colors.red, fontSize: 11, fontWeight: '700' },
  question: { borderWidth: 1, borderRadius: 10, width: 18, height: 18, textAlign: 'center', fontSize: 12 },
  chooseBtn: { height: 36, borderWidth: 1, borderColor: '#999', borderRadius: 6, justifyContent: 'center', alignItems: 'center' },
  arrow: { position: 'absolute', right: 12, fontSize: 28, lineHeight: 30 },
  buyBtn: { backgroundColor: colors.red, borderRadius: 6, height: 44, alignItems: 'center', justifyContent: 'center', marginTop: 26, marginBottom: 12 },
  buyText: { color: '#fff', fontSize: 18, fontWeight: '700' },
});
