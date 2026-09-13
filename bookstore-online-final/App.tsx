// BÀI TỔNG HỢP GIỜ 1 + GIỜ 2 + GIỜ 3
// Thứ tự theo đúng đề bài: Header -> Category Chips -> Book Grid (có Badge) -> Floating Cart Button.
import React, { useState } from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { Header } from './components/Header';
import { CategoryChips } from './components/CategoryChips';
import { BookGrid } from './components/BookGrid';
import { FloatingCartButton } from './components/FloatingCartButton';
import { BOOKS } from './data';

export default function App() {
  const [cartCount, setCartCount] = useState(0);

  return (
    <View style={styles.screen}>
      {/* 1. Header cố định trên cùng: đặt NGOÀI ScrollView */}
      <Header />

      {/* 2. ScrollView chứa Chips + Grid */}
      {/* paddingBottom đủ lớn để FloatingCartButton không che sách cuối */}
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.sectionTitle}>Danh mục sách</Text>
        <CategoryChips />

        <Text style={styles.sectionTitle}>Sách nổi bật</Text>
        <BookGrid
          books={BOOKS}
          onPressBook={(id) => console.log('Mở sách', id)}
        />
      </ScrollView>

      {/* 3. Nút giỏ nổi: phải nằm NGOÀI ScrollView */}
      <FloatingCartButton
        count={cartCount}
        onPress={() => setCartCount((n) => n + 1)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F8FAFC' },
  content: { padding: 16, paddingBottom: 100 },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 10,
    marginTop: 4,
  },
});
