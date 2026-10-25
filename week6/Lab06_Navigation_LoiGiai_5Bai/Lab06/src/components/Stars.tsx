import React from 'react';
import { Text } from 'react-native';
import { colors } from '../theme';
export function Stars({ value, size = 20 }: { value: number; size?: number }) {
  const count = Math.max(0, Math.min(5, Math.round(value)));
  return <Text accessibilityLabel={`${count} sao`} style={{ color: colors.star, fontSize: size, letterSpacing: 1 }}>
    {'★'.repeat(count)}<Text style={{ color: colors.line }}>{'★'.repeat(5 - count)}</Text>
  </Text>;
}
