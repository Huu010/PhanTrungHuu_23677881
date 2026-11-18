# BookStore – Week9 (hoàn thiện theo đề thực hành Buổi 9)

Project riêng cho thư mục **`week9/`** của repository `PhanTrungHuu_23677881`, giữ nguyên Starter và hoàn thành BT9.1–BT9.8, BT9.C1 (Mua lại) và 5 câu hỏi bổ sung. Giữ Expo SDK 57, React Navigation, Redux Toolkit và json-server như đề; không trộn thư mục `week7` hoặc `week8` vào đây.

## 1. Chạy trên máy trường (Windows 10 x64, PowerShell)

Sau khi giải nén thư mục `week9` vào `T:\week9`, tại **mỗi PowerShell mới** chọn lại Node 24 portable:

```powershell
cd T:\week9
$env:Path = "T:\node-v24.22.1-win-x64;$env:Path"
node -v
npm.cmd -v
Test-Path .\package.json
```

Kỳ vọng Node `v24.22.1`, npm `11.19.1`, `package.json` là `True`. Thư mục Node portable ở vị trí khác thì thay đường dẫn tương ứng; không cần sửa PATH hệ thống.

**Lần đầu tiên:**

```powershell
npm.cmd install
npm.cmd run typecheck
```

Starter **không có `package-lock.json`**; `npm install` sẽ sinh file này. Giữ `package-lock.json` sau khi cài thành công và đưa cùng `package.json` lên GitHub. Không dùng `--force` hoặc `npm audit fix --force` để che lỗi dependency. Các lần sau, nếu đã có lockfile khớp manifest, có thể dùng `npm.cmd ci` để cài đúng phiên bản.

**Terminal 1 – API (giữ mở):**

```powershell
cd T:\week9
$env:Path = "T:\node-v24.22.1-win-x64;$env:Path"
npm.cmd run api
```

Kiểm tra tại `http://localhost:3000/books`, `http://localhost:3000/orders`, `http://localhost:3000/notifications` (phải trả JSON).

**Terminal 2 – Expo Web (giữ mở):**

```powershell
cd T:\week9
$env:Path = "T:\node-v24.22.1-win-x64;$env:Path"
npm.cmd run web
```

Mở URL do Expo in ra (thường `http://localhost:8081`). Nếu web báo lỗi API, **kiểm tra cổng 3000 trước** rồi mới kiểm tra Request URL trên Chrome DevTools; không thay cấu hình mạng khi chưa biết nguyên nhân.

**Expo Go (điện thoại thật):** điện thoại và máy trường phải cùng Wi-Fi và Expo Go hỗ trợ SDK 57. `localhost` của điện thoại không trỏ tới máy trường. Nếu IP tự nhận không phù hợp, mở terminal Expo mới với cú pháp PowerShell:

```powershell
$env:EXPO_PUBLIC_API_URL = "http://<IP_MAY_TRUONG>:3000"
npm.cmd start
```

Chỉ thay `<IP_MAY_TRUONG>` bằng IP được xác nhận qua `ipconfig`, không tự tắt firewall hoặc đổi NAT. Chức năng kéo-để-làm-mới cần thử trên điện thoại/emulator vì web không có thao tác vuốt tương đương. Icon/splash do `app.json` khai báo; Expo Go không hiển thị icon của riêng app như bản build độc lập.

## 2. Tài khoản demo và luồng kiểm thử

- Đăng nhập: `demo@bookstore.vn` / `123456` (xác thực **giả lập trong client** – chỉ cho bài học).
- Home → chọn sách → Thêm vào giỏ → Giỏ → Thanh toán → điền địa chỉ và điện thoại → Xác nhận → Home.
- Xem `http://localhost:3000/orders` để xác nhận POST; quay lại Giỏ phải rỗng, tải lại trang vẫn rỗng.
- Tab Tài khoản → **Đơn hàng của tôi** → mở/đóng thẻ, lọc trạng thái, thử **Mua lại** ở đơn đã hoàn tất.
- Tab Tài khoản → **Chỉnh sửa** tên/SĐT → lưu → tên đổi ngay; kiểm tra `/users` bằng API.
- Tab Tài khoản → **Thông báo** → bấm thông báo chưa đọc, chuyển đúng màn, kiểm tra `/notifications` có `read: true`.
- Tắt json-server lúc giỏ đã có sách, thử đặt hàng: phải báo lỗi và **không xóa giỏ**. Bật API lại, thử lại.
- Trên điện thoại/emulator: kéo Home để refresh, không chuyển về LoadingView toàn màn.

**Quan trọng về dữ liệu:** `json-server` ghi đơn hàng và thay đổi hồ sơ/thông báo thẳng vào `db.json`. Để demo lại từ đầu, trước tiên **sao lưu bản `db.json` gốc**. Không xóa hoặc ghi đè `db.json` khi chưa chủ động muốn mất các đơn đã tạo. Trên GitHub chỉ dùng dữ liệu mẫu, không dùng email/mật khẩu thật.

## 3. Cấu trúc và các file cần nộp

- `src/`: mã nguồn hoàn thiện (services, screens, store, components).
- `assets/`: icon/splash có sẵn trong Starter.
- `db.json`: dữ liệu API mẫu có 12 sách, tài khoản/đơn/thông báo demo.
- `app.json`, `package.json`, **`package-lock.json` sau khi npm install**, `tsconfig.json`.
- `TraLoi.md`: câu trả lời 5 câu hỏi bổ sung, có mã lọc trạng thái.
- **Word báo cáo tách riêng**: `23677881_PhanTrungHuu_Buoi9_MauBaoCao.docx` là mẫu để dán ảnh chạy thật, không phải ảnh đã kiểm thử.

Trước khi nộp:

```powershell
npm.cmd run typecheck
Get-ChildItem .\src -Recurse -File -Include *.ts,*.tsx | Select-String -Pattern 'TODO BT9|<TodoBox'
```

Kỳ vọng không có TypeScript error; không còn TODO trong màn hình bài làm.

## 4. Đưa lên GitHub – chỉ thêm `week9`

Nếu repository đã clone ở `T:\PhanTrungHuu_23677881`, chạy ở terminal khác:

```powershell
cd T:\PhanTrungHuu_23677881
git status -sb
```

Chỉ khi chưa có thay đổi cần giữ tại đích, sao chép bằng `robocopy` (không dùng `/MIR` vì sẽ xoá dữ liệu đích):

```powershell
robocopy "T:\week9" "T:\PhanTrungHuu_23677881\week9" /E /XD node_modules .expo .git dist build /XF *.log .env .env.*
git status --short
git add -- week9
git diff --cached --stat
git commit -m "Hoan thanh Week9 BookStore"
git push origin main
```

Không push nếu `git status` có thay đổi ngoài Week9 cần giải quyết; xác nhận kết quả push tại `https://github.com/Huu010/PhanTrungHuu_23677881/tree/main/week9`.

## 5. Giới hạn kiểm chứng

Bộ code đã được hoàn thiện và kiểm tra cú pháp TypeScript/TSX độc lập. Trong môi trường tạo file chưa thể tải dependency từ npm registry để chạy Expo hoặc `npm run typecheck` đầy đủ. Các chức năng trên cần được kiểm thử trên máy trường bằng log/ảnh thật trước khi báo cáo là đạt.
