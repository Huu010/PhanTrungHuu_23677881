# Kết quả kiểm chứng — 25/10/2026

## Đã thực hiện

Môi trường kiểm tra: Node 24.22.1, npm 11.9.0; Expo 58.0.19, React Native 0.88.0, React 19.3.0, TypeScript 6.0.3. Các package Navigation 7 được khóa trong package-lock.json.

| Kiểm tra | Kết quả | Ý nghĩa |
|---|---|---|
| `npm run typecheck` | PASS, exit 0 | Mã nguồn TypeScript không có lỗi kiểu được compiler phát hiện. |
| `npx expo install --check` | Dependencies are up to date | Các module trong danh sách kiểm tra phù hợp SDK đã cài. |
| `npx expo lint` | PASS, exit 0, không lỗi/cảnh báo lint | Đã kiểm tra quy tắc mã nguồn và hooks. |
| `npx expo export --platform web --output-dir dist-final` | PASS, exit 0 | Metro tạo được bundle web và tài nguyên. |
| `npx expo export --platform android --output-dir dist-android-final` | PASS, exit 0 | Metro tạo được bundle Android/Hermes và tài nguyên; KHÔNG phải build APK hoặc chạy thiết bị. |
| Kiểm tra hàm API trong Node, fetch giả lập | 8 tình huống PASS | Xem bên dưới; không phải kết nối MockAPI thật. |

Tám tình huống API: Joy 3 offline giá 1.790.000; id offline không tồn tại; URL `/phones/1` và giá mới từ phản hồi; HTTP 503; defaultColor sai; price sai kiểu; lỗi mạng được chuyển ra ngoài; lần gọi mới thành công sau khi dịch vụ được khôi phục. Mã API và dữ liệu được biên dịch từ mã nguồn, không chép lại logic thành phiên bản riêng để kiểm tra.

## Chưa xác minh

- Chưa chạy app trên Android/iOS thật, Expo Go hoặc máy trường.
- Chưa kiểm tra bằng thao tác trực tiếp đủ luồng Navigation, Context Favorites, Switch và vị trí bố cục trên thiết bị. Typecheck/bundle không thay thế kiểm thử tương tác.
- Chưa kết nối endpoint MockAPI thật do chưa có URL/tài khoản được cung cấp.
- Chưa có ảnh chạy nộp bài. Các PNG đính kèm trong thư mục tham chiếu là ảnh thiết kế.
- Không khẳng định đã khớp Figma từng pixel. Cần đối chiếu 4 trạng thái trên thiết bị mục tiêu.

Có thử chuẩn bị trình duyệt kiểm thử tự động nhưng tải trình duyệt không thành công; do đó không ghi nhận PASS cho kiểm thử giao diện. Dữ liệu giá ngoài Joy 3 và Live 4 là giả lập; ảnh sản phẩm bổ sung dùng chung ảnh Joy 3 vì nguồn chỉ có các ảnh này.

Một số lệnh có cảnh báo môi trường về proxy/NO_COLOR; bước đóng gói vẫn trả exit 0. Kiểm tra tương thích bỏ qua tra cứu React Native Directory khi không lấy được dữ liệu; không có kết luận từ phần tra cứu đã bỏ qua đó.

## Phạm vi phiên bản

`package-lock.json` đi kèm giúp npm ci tái lập các dependency đã kiểm tra. Không kèm node_modules/build outputs, nên lần cài trên máy trường cần Internet. Nếu trường dùng SDK/Expo Go hoặc Node khác, gửi phiên bản và log đầu tiên để điều chỉnh có kiểm soát. Không tự ý nâng/hạ toàn bộ dependency.
