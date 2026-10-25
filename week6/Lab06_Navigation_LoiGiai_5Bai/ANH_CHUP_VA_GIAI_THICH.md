# Ảnh chạy cần chụp và chú thích

Đây là kế hoạch chụp, chưa phải bằng chứng đã chạy. Chỉ dùng chú thích khi ảnh thực tế thể hiện nội dung đó. Đặt START_EXERCISE bằng số bài để chụp không có thanh menu hỗ trợ. Chụp app thật, không dùng ảnh Figma thay ảnh kết quả.

| Ảnh | Thao tác/trạng thái cần thể hiện | Chú thích ngắn dùng dưới ảnh |
|---|---|---|
| B1_01 | Mở Bài 1, ảnh xanh, nút 4 MÀU-CHỌN MÀU | Màn Product hiển thị điện thoại màu xanh mặc định, thông tin sản phẩm và nút chọn màu. |
| B1_02 | Bấm chọn màu, chưa bấm ô màu | Màn ChooseColor hiển thị bốn lựa chọn màu; phần thông tin trên chỉ có tên sản phẩm khi chưa chọn. |
| B1_03 | Bấm ô đỏ, chưa bấm XONG | Chọn màu đỏ cập nhật ảnh nhỏ, viền ô chọn, tên màu, nhà cung cấp và giá. |
| B1_04 | Bấm XONG | Màu đỏ được trả về màn Product qua params; ảnh lớn đổi đỏ và nút đổi thành 4 MÀU-CHỌN LOẠI. |
| B2_01 | Vòng xoay khi đang chờ | Ứng dụng hiển thị trạng thái Đang tải trong lúc chờ dữ liệu. |
| B2_02 | Product nhận dữ liệu API thật | Dữ liệu từ endpoint phones/1 được hiển thị bằng giao diện Select Phone. |
| B2_03 | Đổi tên/giá trên MockAPI, tải lại app | Sau khi tải lại, ứng dụng hiển thị dữ liệu mới từ API. Kèm ảnh/JSON nguồn để đối chiếu giá trị đã đổi. |
| B2_04 | Lỗi mạng/HTTP/timeout | Khi không tải được dữ liệu, ứng dụng hiển thị thông báo lỗi và nút THỬ LẠI. |
| B2_05 | Khôi phục mạng, nhấn THỬ LẠI thành công | Sau khi kết nối được khôi phục, THỬ LẠI gọi lại API và hiển thị sản phẩm. |
| B3_01 | Tab Trang chủ | Tab Trang chủ hiển thị danh sách sản phẩm bằng FlatList; icon tab đang chọn có màu đỏ. |
| B3_02 | Tab Tìm kiếm, nhập aris | TextInput cập nhật từ khóa và danh sách lọc còn sản phẩm Vsmart Aris Pro. |
| B3_03 | Nhập zzz | Khi không có sản phẩm phù hợp, ứng dụng hiển thị thông báo không có kết quả. |
| B3_04 | Tab Cá nhân | Tab Cá nhân hiển thị avatar chữ cái, tên và email người dùng mẫu. |
| B4_01 | Tab Sản phẩm | Tab Products hiển thị danh sách, mỗi sản phẩm có thể mở màn chi tiết. |
| B4_02 | Chi tiết Live 4 | Chọn Live 4 truyền id=2 tới ProductDetails; màn hình hiển thị giá 3.990.000 đ tương ứng. |
| B4_03 | Sau lưu, quay lại tab Yêu thích | FavoritesContext chia sẻ danh sách id; sản phẩm vừa lưu xuất hiện trong tab Favorites. |
| B4_04 | Mở từ Yêu thích, bỏ lưu, quay lại | Sau khi bỏ lưu, tab Favorites hiển thị trạng thái chưa có sản phẩm được lưu. |
| B5_01 | Mở Drawer | Drawer hiển thị ba mục Trang chủ, Cá nhân và Cài đặt; mục đang chọn được tô đỏ. |
| B5_02 | Trang chủ | Màn Home hiển thị lời chào theo yêu cầu. |
| B5_03 | Cá nhân | Màn Profile hiển thị avatar, tên và email người dùng mẫu. |
| B5_04 | Cài đặt mặc định | Hai Switch có giá trị mặc định: thông báo bật và giao diện tối tắt. |
| B5_05 | Đổi cả 2 Switch | Gạt Switch cập nhật state và dòng trạng thái ngay: thông báo tắt, giao diện tối. |

Bài 2: nếu chưa có URL thật, chỉ có thể xác nhận giao diện/loading offline; chưa dùng chú thích “đã gọi API thật”. Nếu loading quá nhanh để chụp, dùng quay màn hình rồi lấy khung hình; không cần sửa độ trễ vào API thật.

Các ảnh tĩnh cho thấy trạng thái tại thời điểm chụp. Với chuyển màn hình/THỬ LẠI/Switch, cần thao tác trực tiếp hoặc video ngắn nếu giảng viên yêu cầu chứng minh tương tác.
