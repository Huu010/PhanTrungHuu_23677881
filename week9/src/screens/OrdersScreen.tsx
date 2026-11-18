import React, { useCallback, useEffect, useMemo, useState } from "react";
import { FlatList, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { StatusBadge } from "../components/StatusBadge";
import { PrimaryButton } from "../components/PrimaryButton";
import { EmptyState } from "../components/EmptyState";
import { LoadingView } from "../components/LoadingView";
import { ErrorView } from "../components/ErrorView";
import { getOrdersByUser } from "../services/orderService";
import { getBooks } from "../services/bookService";
import { getErrorMessage } from "../api/client";
import { useAuth, useCart } from "../store/hooks";
import { formatDateTime } from "../utils/format";
import { showMessage } from "../utils/dialog";
import { RootScreenProps } from "../navigation/types";
import { Order, OrderStatus } from "../types";
import { colors, formatPrice, radius } from "../theme";

export const PAYMENT_LABEL = {
  cod: "Thanh toán khi nhận hàng (COD)",
  bank: "Chuyển khoản ngân hàng",
} as const;

type StatusFilter = "all" | OrderStatus;
const FILTERS: { value: StatusFilter; label: string }[] = [
  { value: "all", label: "Tất cả" },
  { value: "pending", label: "Chờ xác nhận" },
  { value: "shipping", label: "Đang giao" },
  { value: "completed", label: "Hoàn tất" },
  { value: "cancelled", label: "Đã hủy" },
];

export function OrdersScreen({ navigation }: RootScreenProps<"Orders">) {
  const { user, isLoggedIn } = useAuth();
  const { addMany } = useCart();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openId, setOpenId] = useState<number | null>(null);
  const [status, setStatus] = useState<StatusFilter>("all");
  const [reordering, setReordering] = useState(false);

  const load = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    setError(null);
    try {
      const data = await getOrdersByUser(user.id);
      setOrders([...data].sort((a, b) => b.createdAt.localeCompare(a.createdAt)));
    } catch (e) {
      setError(getErrorMessage(e));
    } finally {
      setLoading(false);
    }
  }, [user]);
  useEffect(() => { load(); }, [load]);

  const visibleOrders = useMemo(
    () => status === "all" ? orders : orders.filter((o) => o.status === status),
    [orders, status]
  );

  const reorder = async (order: Order) => {
    if (reordering) return;
    setReordering(true);
    try {
      const currentBooks = await getBooks();
      const freshItems = order.items.flatMap((it) => {
        const book = currentBooks.find((b) => b.id === it.bookId);
        if (!book || book.stock < 1 || it.quantity < 1) return [];
        return [{
          book: {
            bookId: book.id, title: book.title, price: book.price,
            emoji: book.emoji, color: book.color, stock: book.stock,
          },
          quantity: it.quantity,
        }];
      });
      if (freshItems.length === 0) {
        showMessage("Không thể mua lại", "Các sản phẩm trong đơn hiện đã hết hàng hoặc không còn bán.");
        return;
      }
      addMany(freshItems); // Một action Redux: cộng số lượng, cập nhật giá/tồn kho mới nhất.
      showMessage("Đã thêm vào giỏ", "Sản phẩm còn bán đã được thêm lại vào giỏ hàng.", () =>
        navigation.navigate("Tabs", { screen: "Cart" })
      );
    } catch (e) {
      showMessage("Không thể mua lại", getErrorMessage(e));
    } finally {
      setReordering(false);
    }
  };

  if (!isLoggedIn) {
    return <EmptyState emoji="🔒" title="Bạn cần đăng nhập" actionLabel="Đăng nhập"
      onAction={() => navigation.navigate("Login")} />;
  }
  if (loading) return <LoadingView />;
  if (error) return <ErrorView message={error} onRetry={load} />;

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}
        style={styles.filterScroll} contentContainerStyle={styles.filters}>
        {FILTERS.map((f) => (
          <Pressable key={f.value} accessibilityRole="button"
            accessibilityState={{ selected: status === f.value }}
            onPress={() => setStatus(f.value)}
            style={[styles.chip, status === f.value && styles.chipSelected]}>
            <Text style={[styles.chipText, status === f.value && styles.chipTextSelected]}>{f.label}</Text>
          </Pressable>
        ))}
      </ScrollView>
      <FlatList
        data={visibleOrders}
        keyExtractor={(o) => String(o.id)}
        contentContainerStyle={styles.list}
        ListEmptyComponent={<EmptyState emoji="🧾"
          title={orders.length === 0 ? "Bạn chưa có đơn hàng nào" : "Không có đơn hàng ở trạng thái này"}
          message={orders.length === 0 ? "Đặt đơn đầu tiên để theo dõi tại đây." : "Hãy chọn trạng thái khác."}
          actionLabel={orders.length === 0 ? "Mua sắm ngay" : "Xem tất cả"}
          onAction={() => orders.length === 0
            ? navigation.navigate("Tabs", { screen: "Home" })
            : setStatus("all")} />}
        renderItem={({ item: o }) => {
          const expanded = openId === o.id;
          return (
            <View style={styles.card}>
              <Pressable style={styles.head} onPress={() => setOpenId(expanded ? null : o.id)}
                accessibilityLabel={`Đơn số ${o.id}, ${expanded ? "thu gọn" : "xem chi tiết"}`}>
                <View style={styles.headLeft}>
                  <Text style={styles.code}>Đơn #{o.id}</Text>
                  <Text style={styles.date}>{formatDateTime(o.createdAt)}</Text>
                  <Text style={styles.total}>{formatPrice(o.total)}</Text>
                </View>
                <View style={styles.badgeArea}>
                  <StatusBadge status={o.status} />
                  <Text style={styles.toggle}>{expanded ? "Thu gọn ▲" : "Chi tiết ▼"}</Text>
                </View>
              </Pressable>
              {expanded && (
                <View style={styles.detail}>
                  {o.items.map((it) => (
                    <View key={it.bookId} style={styles.itemRow}>
                      <Text style={styles.itemTitle} numberOfLines={2}>{it.title} × {it.quantity}</Text>
                      <Text style={styles.itemPrice}>{formatPrice(it.price * it.quantity)}</Text>
                    </View>
                  ))}
                  <View style={styles.address}>
                    <Text style={styles.addressHeading}>Giao đến</Text>
                    <Text style={styles.addressText}>{o.address.name} · {o.address.phone}</Text>
                    <Text style={styles.addressText}>{o.address.address}</Text>
                    <Text style={styles.addressText}>Thanh toán: {PAYMENT_LABEL[o.paymentMethod]}</Text>
                  </View>
                  {o.status === "completed" &&
                    <PrimaryButton title="Mua lại" variant="outline" onPress={() => reorder(o)}
                      loading={reordering} />}
                </View>
              )}
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  filterScroll: { flexGrow: 0 },
  filters: { paddingHorizontal: 12, paddingTop: 12, paddingBottom: 4, gap: 7 },
  chip: { paddingHorizontal: 13, paddingVertical: 8, backgroundColor: "#fff", borderWidth: 1,
    borderColor: colors.line, borderRadius: radius.pill },
  chipSelected: { backgroundColor: colors.indigo, borderColor: colors.indigo },
  chipText: { fontWeight: "600", color: colors.text, fontSize: 12 },
  chipTextSelected: { color: "#fff" },
  list: { padding: 12, gap: 10, flexGrow: 1 },
  card: { backgroundColor: "#fff", borderRadius: radius.md, padding: 12, gap: 8 },
  head: { flexDirection: "row", gap: 8, justifyContent: "space-between" },
  headLeft: { flex: 1, gap: 3 },
  code: { fontWeight: "800", fontSize: 16, color: colors.navy },
  date: { color: colors.muted, fontSize: 12 },
  total: { color: colors.indigo, fontWeight: "800" },
  badgeArea: { alignItems: "flex-end", gap: 8 },
  toggle: { color: colors.muted, fontSize: 12 },
  detail: { borderTopWidth: 1, borderColor: colors.line, gap: 9, paddingTop: 10 },
  itemRow: { flexDirection: "row", justifyContent: "space-between", gap: 10 },
  itemTitle: { flex: 1, color: colors.text },
  itemPrice: { color: colors.text, fontWeight: "700" },
  address: { borderTopWidth: 1, borderColor: colors.line, paddingTop: 9, gap: 3 },
  addressHeading: { fontWeight: "800", color: colors.navy },
  addressText: { color: colors.muted, fontSize: 12 },
});
