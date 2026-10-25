import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { common } from '../theme';
export function ErrorBox({ message, onRetry }: { message: string; onRetry: () => void }) {
  return <View style={common.center}><Text accessibilityRole="alert">{message}</Text>
    <Pressable style={common.button} onPress={onRetry}><Text style={common.buttonText}>THỬ LẠI</Text></Pressable></View>;
}
