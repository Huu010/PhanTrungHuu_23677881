# Buổi 9 – Trả lời 5 câu hỏi bổ sung

## Câu 1. Giá trị dẫn xuất (`errors`, `valid`)

`errors` và `valid` phụ thuộc trực tiếp vào `name`, `phone`, `address` và số sản phẩm trong giỏ nên được tính lại sau mỗi lần render. Nếu lưu chúng bằng `useState` riêng, mỗi lần sửa ô nhập phải đồng bộ thêm trạng thái lỗi; nếu quên cập nhật, nút Đặt hàng có thể bật hoặc tắt không đúng với dữ liệu hiện tại.

## Câu 2. Vì sao phải `await createOrder()` trước khi `clear()`?

Nếu xóa giỏ trước khi gửi đơn mà API lỗi hoặc mất mạng, giỏ sẽ trống dù chưa có đơn hàng được lưu, khiến người mua mất danh sách đã chọn. Do đó chỉ gọi `clear()` sau khi `await createOrder(...)` thành công; khi lỗi, hiển thị thông báo và giữ nguyên giỏ để người dùng thử lại.

## Câu 3. PUT và PATCH khi sửa hồ sơ

`PUT /users/1` mang ý nghĩa thay thế bản ghi, nên chỉ gửi `{name, phone}` có thể làm mất các trường email, password của người dùng. `PATCH /users/1` chỉ cập nhật những trường trong body, phù hợp với form chỉ cho sửa tên và số điện thoại; ứng dụng cũng loại password khỏi dữ liệu trả về trước khi cập nhật store.

## Câu 4. Cập nhật lạc quan

Nếu đánh dấu đã đọc trên giao diện nhưng PATCH thất bại mà không hoàn lại `read: false`, màn hình sẽ hiển thị sai trạng thái so với máy chủ; tải lại thông báo có thể đổi về chưa đọc. Cập nhật lạc quan thích hợp với đánh dấu thông báo đã đọc hoặc thả tim, nhưng không nên hiển thị đặt hàng thành công khi API thanh toán/đặt hàng chưa trả về kết quả thành công.

## Câu 5. Bộ lọc trạng thái đơn hàng

Trong `OrdersScreen.tsx`, khai báo `status` có kiểu `"all" | OrderStatus` và hàng nút **Tất cả / Chờ xác nhận / Đang giao / Hoàn tất / Đã hủy**. Dữ liệu cho `FlatList` lấy từ `visibleOrders`, kết hợp `useMemo` để chỉ giữ đơn khớp trạng thái; khi chọn Tất cả thì trả lại toàn bộ danh sách.

```tsx
const [status, setStatus] = useState<"all" | OrderStatus>("all");
const visibleOrders = useMemo(
  () => status === "all" ? orders : orders.filter((o) => o.status === status),
  [orders, status]
);
// <FlatList data={visibleOrders} ... />
```

**Ảnh minh chứng:** Chụp màn Đơn hàng sau khi chọn bộ lọc “Hoàn tất”, đặt vào báo cáo Word.
