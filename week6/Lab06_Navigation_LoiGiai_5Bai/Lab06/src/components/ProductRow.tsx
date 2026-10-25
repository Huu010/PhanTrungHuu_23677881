import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Phone } from '../types';
import { PHONE_COLORS } from '../data/phones';
import { common, formatPrice } from '../theme';
export function ProductRow({ phone, onPress }: { phone: Phone; onPress: () => void }) {
  return <Pressable accessibilityRole="button" onPress={onPress} style={[common.card, s.row]}>
    <Image source={PHONE_COLORS[phone.defaultColor].image} style={s.thumb} resizeMode="contain" />
    <View style={{ flex: 1, gap: 8 }}><Text>{phone.name}</Text><Text style={{ fontWeight: '700' }}>{formatPrice(phone.price)}</Text></View>
  </Pressable>;
}
const s = StyleSheet.create({ row: { flexDirection: 'row', gap: 12, alignItems: 'center' }, thumb: { width: 54, height: 80 } });
