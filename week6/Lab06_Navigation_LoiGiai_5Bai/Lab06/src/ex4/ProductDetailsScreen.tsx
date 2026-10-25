import React from 'react';
import { Image, Pressable, ScrollView, Text } from 'react-native';
import { PHONES, PHONE_COLORS } from '../data/phones';
import { Stars } from '../components/Stars';
import { common, formatPrice } from '../theme';
import { useFavorites } from './FavoritesContext';
import { RootProps } from './types';
export function ProductDetailsScreen({ route }: RootProps<'ProductDetails'>) {
  const { id } = route.params;
  const phone = PHONES.find(p => p.id === id);
  const { has, toggle } = useFavorites();
  if (!phone) return <Text style={{ padding: 20 }}>Không tìm thấy sản phẩm #{id}</Text>;
  return <ScrollView contentContainerStyle={{ padding: 20, gap: 16 }}>
    <Image source={PHONE_COLORS[phone.defaultColor].image} resizeMode="contain" style={{ width: '100%', height: 270 }} />
    <Text style={common.big}>{phone.name}</Text><Stars value={phone.rating} />
    <Text style={common.big}>{formatPrice(phone.price)}</Text><Text>Cung cấp bởi {phone.supplier}</Text>
    <Pressable style={common.button} onPress={() => toggle(phone.id)}><Text style={common.buttonText}>{has(phone.id) ? '♥ Đã lưu' : '♡ Lưu vào yêu thích'}</Text></Pressable>
  </ScrollView>;
}
