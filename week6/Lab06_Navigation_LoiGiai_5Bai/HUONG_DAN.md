# Lab 06 — Lời giải 5 bài Navigation

## Phạm vi và cách dùng

Bộ code dựa trên `Lab06_Navigation_HuongDan(1).docx` và 4 màn hình trong `Lab_06_Navigation (Copy).zip`. Dùng Expo, React Native, TypeScript, React Navigation 7. Bộ khóa phiên bản đã kiểm tra: Expo 58.0.19, React Native 0.88.0, React 19.3.0. Cần Node thuộc dải hỗ trợ của Expo; bản kiểm tra dùng Node 24.22.1. Chẳng hạn Node 22 từ 22.13 hoặc Node 24 từ 24.3. Máy trường khác SDK/Node thì gửi phiên bản để điều chỉnh đúng phần cần thiết, không tự đổi toàn bộ project. Cài lần đầu bằng npm ci cần Internet. Các bài có navigator và dữ liệu trạng thái riêng; Bài 2 dùng lại giao diện Bài 1 theo yêu cầu tài liệu.

Mở `Lab06/App.tsx`: `START_EXERCISE = 0` là menu 5 bài. Đổi số thành `1`, `2`, `3`, `4`, `5` để mở trực tiếp bài tương ứng, không hiện thanh menu hỗ trợ phía trên. Sau thay đổi, chạy `npm run typecheck` rồi mở lại app kiểm tra màn hình. Thoát bài về menu sẽ khởi tạo lại trạng thái khi vào lại; Favorites và Switch chỉ lưu trong phiên chạy, không lưu lâu dài.

## Máy trường — nhóm 3 bước đầu

1. Giải nén ZIP vào thư mục riêng, mở thư mục `Lab06` trong VS Code. Kiểm tra `node -v`, `npm -v` và `dir package.json`.
2. Chạy `npm ci` để cài đúng phiên bản trong package-lock. Kiểm tra ngay bằng `npx expo install --check` và `npm run typecheck`.
3. Chạy `npx expo start`, dùng Expo Go tương thích SDK hoặc máy ảo đã chuẩn bị của trường. Chạy web: `npx expo start --web`. Kiểm tra menu mở được và Bài 1 hiển thị ảnh xanh.

Nếu có lỗi, giữ nguyên log và gửi lại; chưa tự xóa lockfile, reset project hoặc đổi cấu hình mạng. Chưa cần tạo lại project bằng create-expo-app vì ZIP đã có package.json.

## Bài 1 — Select Phone

- `SelectPhoneApp.tsx`: Stack gồm Product và ChooseColor; ẩn header.
- `ProductScreen.tsx`: đọc `route.params?.color`; chưa có màu chọn thì dùng `phone.defaultColor`. Nút chọn màu truyền màu hiện tại. Nút mua nằm ngoài khối info, gần đáy màn hình.
- `ChooseColorScreen.tsx`: state `picked` điều khiển ảnh nhỏ, viền ô và thông tin bổ sung. `XONG` trả màu về Product.
- Chọn màu chỉ cập nhật Product khi nhấn XONG. Dùng Back khi đang chọn là hủy thay đổi chưa xác nhận.
- Nút CHỌN MUA hiện thông báo minh họa sản phẩm/màu/giá; đề không yêu cầu giỏ hàng hoặc thanh toán.

Luồng kiểm tra: mở bài → chọn màu → chọn đỏ → XONG. Phải có đủ 4 trạng thái khớp các ảnh thiết kế. Thử thêm bạc, đen, xanh để kiểm tra ảnh thay đổi theo ô màu.

## Bài 2 — API

`src/api/phoneApi.ts` giữ cách cấu hình `EXPO_PUBLIC_API_URL` theo tài liệu. Không cấu hình URL thì dùng dữ liệu mẫu với độ trễ 600 ms để thấy loading; chế độ này KHÔNG chứng minh đã hoàn thành yêu cầu API thật.

Nhóm 3 bước cấu hình API khi có tài khoản:

1. Tạo project/resource `phones` trên MockAPI. Tạo bản ghi có id `1`, các trường theo `mockapi_phone_1.json`. Giá/rating/reviewCount là number; colors phải là mảng chuỗi, không phải chuỗi chứa JSON. GET `<baseURL>/phones/1` phải trả về bản ghi tương ứng. `mockapi_phones.json` là mảng để nhập nếu giao diện hỗ trợ; không bắt buộc có nút import.
2. Tạo `.env` từ `.env.example`, điền `EXPO_PUBLIC_API_URL=<baseURL>` (không kèm `/phones/1`). Kiểm tra `Get-Content .env`. Đây là URL công khai của API bài học, không đặt mật khẩu/token bí mật vào biến EXPO_PUBLIC.
3. Dừng Metro rồi chạy `npx expo start`, vào Bài 2. Kiểm tra dữ liệu xuất hiện; đổi giá hoặc tên trên MockAPI và xác nhận GET trả dữ liệu mới, thoát vào lại Bài 2 để app gọi lại.

Kiểm tra lỗi/thử lại: cấu hình URL thật trước, tải được dữ liệu rồi thoát về menu; tắt kết nối mạng trên thiết bị chạy app và vào lại Bài 2. Chờ tối đa khoảng 12 giây để hiện lỗi. Bật lại kết nối, nhấn THỬ LẠI và kiểm tra dữ liệu tải lại. Nếu dùng web localhost thì chỉ chuyển DevTools Network sang Offline rồi Online; không tắt kết nối gây gián đoạn Expo Go tới Metro. Không cần đổi firewall/NAT.

Nếu thử bằng URL sai: sau khi sửa `.env` phải khởi động lại Metro; nhấn THỬ LẠI không tự nạp một biến môi trường mới. Không có endpoint thật được tạo sẵn hoặc bịa trong bộ code.

`SelectPhoneApi.tsx`: xóa lỗi/dữ liệu cũ → gọi fetch trong try/catch → lỗi thì ErrorBox → chưa có dữ liệu thì Loading → thành công thì SelectPhoneApp. Chặn kết quả cũ cập nhật sau khi thoát màn hình. Kiểm tra JSON và timeout là bổ sung nhỏ để lỗi API hiển thị rõ.

## Bài 3 — Bottom Tab

`BottomTabApp.tsx`: Home dùng FlatList; Search dùng TextInput và lọc tên không phân biệt hoa/thường; Profile là Avatar, tên, email mẫu. Icon đặc/viền theo focused và tab đang chọn màu đỏ.

Kiểm tra: chuyển đủ 3 tab; nhập `aris` ra đúng 1 sản phẩm; nhập `zzz` ra thông báo không có kết quả. Xóa từ khóa thì danh sách xuất hiện lại.

## Bài 4 — Stack + Tab + Passing Params

Home chứa Tab Products/Favorites. Products gọi chính xác `navigation.navigate('ProductDetails', { id: item.id })`. ProductDetails đọc `route.params.id`, tìm trong PHONES và hiển thị thông tin; FavoritesContext lưu mảng id cho cả hai tab dùng chung.

Kiểm tra: chọn Vsmart Live 4 → giá 3.990.000 đ; lưu yêu thích → Back → tab Favorites có Live 4; mở chi tiết từ Favorites → bỏ lưu → Back → hiện danh sách rỗng. Không cần truyền nguyên object sản phẩm qua params.

## Bài 5 — Drawer

`DrawerApp.tsx`: Home/Profile/Settings; icon và nhãn tiếng Việt; mục đang chọn màu đỏ. Settings có notify mặc định true và dark mặc định false; Switch cập nhật dòng trạng thái ngay. Kéo từ mép trái hoặc dùng nút menu trên header.

Phần đổi nền Home/Profile bằng Context là TODO nâng cao, không thuộc lời giải cơ bản này. Switch giao diện hiện quản lý giá trị lựa chọn và dòng trạng thái theo TODO 1; chưa áp dụng chủ đề tối toàn app.

## Các điểm bổ sung/điều chỉnh so với mẫu

| Phần | Lý do và phạm vi |
|---|---|
| XONG dùng `navigation.popTo('Product', { color: picked })` | React Navigation 7 dùng popTo để quay về route trước và trả params. Giữ luồng nghiệp vụ; tránh dùng navigate để tạo thêm Product. |
| Imports, Props, styles đầy đủ | Tài liệu chứa nhiều đoạn rút gọn, thiếu khai báo; cần hoàn thiện để biên dịch. |
| Loading, ErrorBox, ProductRow và kiểu Context | Tài liệu nhắc tới nhưng không đưa đủ mã. |
| Thêm 5 sản phẩm mẫu | Để tìm `aris` ra 1 kết quả và Live 4 id=2 giá 3.990.000 đ theo mục tự kiểm tra. Các giá còn lại là dữ liệu giả lập. |
| Dùng lại ảnh Joy 3 cho các sản phẩm bổ sung | ZIP chỉ có 4 ảnh màu Joy 3; không trình bày đây là ảnh thật của Live 4/Aris. |
| Tên, email Nguyễn Văn An | Giữ dữ liệu mẫu của tài liệu, không suy đoán thông tin cá nhân. |
| Nút CHỌN MUA hiện thông báo | Đề không mô tả màn thanh toán. |
| Menu và START_EXERCISE | Hỗ trợ chạy độc lập, không lồng NavigationContainer. |
| SafeAreaView từ safe-area-context | Hiển thị trong vùng an toàn trên thiết bị. |

Màu sắc sử dụng bảng màu trong tài liệu Word. Bố cục bám 4 ảnh, co giãn theo thiết bị; không tuyên bố khớp từng pixel khi chưa đối chiếu trên màn hình trường.

## Nguồn

- Đề và code khung: `Lab06_Navigation_HuongDan(1).docx` do người học cung cấp.
- Thiết kế/ảnh: `Lab_06_Navigation (Copy).zip` do người học cung cấp.
- React Navigation: https://reactnavigation.org/docs/params/ và https://reactnavigation.org/docs/upgrading-from-6.x/ (popTo trên v7).
- Expo SDK: https://docs.expo.dev/versions/v58.0.0/ và https://docs.expo.dev/versions/v58.0.0/sdk/reanimated/ .

Xem `ANH_CHUP_VA_GIAI_THICH.md` để biết ảnh cần chụp; xem `KIEM_CHUNG.md` để phân biệt kiểm tra đã thực hiện và phần còn chờ máy trường.
