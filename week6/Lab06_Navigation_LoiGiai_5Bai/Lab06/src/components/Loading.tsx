import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { colors, common } from '../theme';
export function Loading() { return <View style={common.center}><ActivityIndicator size="large" color={colors.blue} /><Text>Đang tải...</Text></View>; }
