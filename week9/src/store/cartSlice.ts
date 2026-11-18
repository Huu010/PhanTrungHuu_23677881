import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "../types";

interface CartState {
  items: CartItem[];
}
const initialState: CartState = { items: [] };

const clamp = (q: number, stock: number) => Math.max(1, Math.min(q, stock));

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Thêm 1 sản phẩm; nếu đã có thì tăng số lượng (không vượt tồn kho)
    addItem(state, action: PayloadAction<Omit<CartItem, "quantity">>) {
      const found = state.items.find((i) => i.bookId === action.payload.bookId);
      if (found) found.quantity = clamp(found.quantity + 1, found.stock);
      else state.items.push({ ...action.payload, quantity: 1 });
    },
    removeItem(state, action: PayloadAction<number>) {
      state.items = state.items.filter((i) => i.bookId !== action.payload);
    },
    setQuantity(state, action: PayloadAction<{ bookId: number; quantity: number }>) {
      const found = state.items.find((i) => i.bookId === action.payload.bookId);
      if (found) found.quantity = clamp(action.payload.quantity, found.stock);
    },
    // BT9.C1: mua lại nhiều sách trong một action, lấy giá/tồn kho từ API hiện tại.
    addManyItems(state, action: PayloadAction<Array<{
      book: Omit<CartItem, "quantity">;
      quantity: number;
    }>>) {
      action.payload.forEach(({ book, quantity }) => {
        if (book.stock < 1 || quantity < 1) return;
        const found = state.items.find((i) => i.bookId === book.bookId);
        if (found) {
          Object.assign(found, book);
          found.quantity = clamp(found.quantity + quantity, book.stock);
        } else {
          state.items.push({ ...book, quantity: clamp(quantity, book.stock) });
        }
      });
    },
    clearCart(state) {
      state.items = [];
    },
    // Nạp lại giỏ hàng đã lưu trong AsyncStorage
    hydrateCart(state, action: PayloadAction<CartItem[]>) {
      state.items = action.payload;
    },
  },
});

export const { addItem, addManyItems, removeItem, setQuantity, clearCart, hydrateCart } = cartSlice.actions;
export default cartSlice.reducer;
