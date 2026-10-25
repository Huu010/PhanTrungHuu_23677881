import { StyleSheet } from 'react-native';
export const colors = {
  red: '#E53A2F', blue: '#4F63C8', navy: '#0B1F5C', text: '#1F2430',
  muted: '#6B7280', line: '#D8DCE3', bg: '#F4F5F7', grey: '#C4C4C4', star: '#F5C518',
};
export const formatPrice = (n: number) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ' đ';
export const common = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24, gap: 14 },
  big: { fontSize: 22, fontWeight: '700', color: colors.text },
  muted: { color: colors.muted },
  card: { padding: 16, borderWidth: 1, borderColor: colors.line, borderRadius: 8, backgroundColor: '#fff' },
  avatar: { width: 96, height: 96, borderRadius: 48, backgroundColor: colors.blue, alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: '#fff', fontWeight: '700', fontSize: 30 },
  button: { backgroundColor: colors.red, padding: 14, borderRadius: 6, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: '700' },
});
