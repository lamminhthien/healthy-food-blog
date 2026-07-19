# TÊN CHUYÊN ĐỀ

**Xây dựng website chia sẻ kiến thức về ăn uống healthy, meal prep và lối sống lành mạnh có ứng dụng AI**

## 1. Mô tả chuyên đề

Dự án tập trung xây dựng một website/blog cá nhân nhằm chia sẻ kiến thức về:

- Ăn uống lành mạnh.
- Công thức món ăn healthy.
- Hướng dẫn meal prep.
- Cách xây dựng thực đơn theo ngày hoặc theo tuần.
- Các thói quen giúp duy trì lối sống lành mạnh.

Website được thiết kế theo hướng hiện đại, trực quan, thân thiện với người dùng và có ứng dụng AI trong quá trình tạo nội dung hình ảnh cho các món ăn.

Trong phiên bản đầu tiên, dự án sẽ được phát triển dưới dạng **MVP – Minimum Viable Product**, sử dụng dữ liệu tĩnh được lưu trữ trong các file JSON. Dữ liệu sẽ được import vào website để hiển thị và quản lý mà chưa cần xây dựng backend hoặc cơ sở dữ liệu.

## 2. Mục tiêu của dự án

- Xây dựng một website cá nhân hoàn chỉnh về chủ đề healthy lifestyle.
- Cung cấp các bài viết và công thức dễ hiểu, dễ áp dụng.
- Giúp người dùng tham khảo thực đơn và chuẩn bị bữa ăn khoa học.
- Ứng dụng AI để tạo hình ảnh món ăn phù hợp với nội dung bài viết.
- Xây dựng giao diện đẹp, hiện đại và phù hợp với chủ đề ẩm thực.
- Đảm bảo website hiển thị tốt trên nhiều loại thiết bị.
- Xây dựng nền tảng MVP có khả năng mở rộng thành website động trong tương lai.

## 3. Đối tượng người dùng

Website hướng đến các nhóm người dùng:

- Người muốn bắt đầu ăn uống lành mạnh.
- Người bận rộn cần chuẩn bị bữa ăn trước.
- Người quan tâm đến việc kiểm soát cân nặng.
- Người tập gym hoặc chơi thể thao.
- Nhân viên văn phòng cần các thực đơn đơn giản, dễ chuẩn bị.
- Người muốn duy trì một lối sống cân bằng và khoa học.

## 4. Công nghệ sử dụng

### 4.1. Công nghệ phát triển giao diện

- **HTML5:** Xây dựng cấu trúc nội dung của website.
- **CSS3:** Tuỳ chỉnh giao diện khi cần thiết.
- **JavaScript:** Xử lý các chức năng tương tác cơ bản.
- **Tailwind CSS:** Xây dựng giao diện nhanh, đồng nhất và hỗ trợ responsive.

Có thể sử dụng thêm các công cụ như Vite để tổ chức và chạy dự án thuận tiện hơn.

### 4.2. Thư viện animation

Sử dụng thư viện animation để tạo hiệu ứng chuyển động của Lyn, tăng trải nghiệm người dùng, chẳng hạn:

- AOS để tạo hiệu ứng khi người dùng cuộn trang.
- Animate.css cho các hiệu ứng xuất hiện cơ bản.
- GSAP cho các chuyển động phức tạp hơn.
- Swiper.js cho slider món ăn, bài viết nổi bật hoặc thực đơn.

Các hiệu ứng cần được sử dụng hợp lý, tránh làm website nặng hoặc gây rối mắt.

### 4.3. Dữ liệu tĩnh

Dữ liệu của website được lưu trong các file JSON, ví dụ:

- `recipes.json`: Danh sách công thức món ăn.
- `articles.json`: Danh sách bài viết.
- `meal-plans.json`: Danh sách thực đơn.
- `categories.json`: Danh mục nội dung.
- `tips.json`: Các mẹo sống lành mạnh.

JavaScript sẽ đọc dữ liệu từ file JSON và hiển thị lên giao diện.

## 5. Ứng dụng AI trong dự án

AI được sử dụng để hỗ trợ:

- Tạo hình ảnh món ăn healthy.
- Tạo hình ảnh minh hoạ cho bài viết.
- Đề xuất cách bố trí món ăn.
- Tạo nhiều phiên bản hình ảnh khác nhau.
- Chỉnh sửa hình ảnh theo phong cách mong muốn.
- Hỗ trợ xây dựng nội dung mô tả món ăn.

Sau khi hình ảnh được tạo bằng AI, người phát triển có thể chỉnh sửa thủ công bằng các công cụ như Canva, Photoshop hoặc các phần mềm chỉnh sửa ảnh khác trước khi đưa lên website.

Hình ảnh nên có cùng phong cách, ánh sáng và tông màu để bảo đảm tính đồng nhất cho toàn bộ website.

## 6. Phong cách thiết kế

### 6.1. Phông chữ

Website sử dụng phông chữ dễ đọc nhưng vẫn có nét mềm mại, phù hợp với chủ đề ẩm thực và lối sống.

Có thể kết hợp:

- Một font serif cho tiêu đề.
- Một font sans-serif cho nội dung.

Ví dụ:

- Playfair Display cho tiêu đề.
- Lora cho tiêu đề bài viết.
- Be Vietnam Pro cho nội dung tiếng Việt.
- Nunito Sans hoặc Inter cho nội dung và các thành phần giao diện.

Không nên sử dụng quá ba phông chữ trong cùng một website.

### 6.2. Màu sắc chủ đạo

Tông màu chính được lựa chọn phù hợp với người mệnh Kim, ưu tiên các màu:

- Trắng.
- Kem.
- Xám nhạt.
- Xám bạc.
- Vàng nhạt.
- Nâu be.

Để phù hợp với chủ đề healthy, có thể bổ sung màu xanh lá nhẹ làm màu nhấn.

Bảng màu gợi ý:

- Màu nền chính: `#FAF9F6`
- Màu trắng: `#FFFFFF`
- Màu be: `#E8DFD0`
- Màu xám bạc: `#C8C8C8`
- Màu vàng nhạt: `#D8B56A`
- Màu xanh nhấn: `#78966C`
- Màu chữ chính: `#2F342D`

Phong cách tổng thể hướng đến sự tối giản, sạch sẽ, của Lyn và tạo cảm giác tự nhiên.

## 7. Các chức năng trong phiên bản MVP

### 7.1. Trang chủ

- Banner giới thiệu website.
- Danh sách công thức nổi bật.
- Danh sách bài viết mới.
- Gợi ý thực đơn trong tuần.
- Khu vực giới thiệu về tác giả hoặc dự án.
- Form đăng ký nhận nội dung mới dưới dạng giao diện mô phỏng.

### 7.2. Trang danh sách công thức

- Hiển thị danh sách các món ăn.
- Hiển thị hình ảnh, tên món, thời gian nấu và lượng calories.
- Phân loại theo bữa sáng, bữa trưa, bữa tối và món ăn nhẹ.
- Lọc theo danh mục.
- Tìm kiếm theo tên món ăn.
- Sắp xếp theo thời gian chuẩn bị hoặc lượng calories.

### 7.3. Trang chi tiết công thức

Trang chi tiết gồm:

- Tên món ăn.
- Hình ảnh món ăn.
- Mô tả ngắn.
- Thời gian chuẩn bị.
- Thời gian nấu.
- Số khẩu phần.
- Lượng calories.
- Danh sách nguyên liệu.
- Các bước thực hiện.
- Giá trị dinh dưỡng tham khảo.
- Mẹo bảo quản.
- Gợi ý meal prep.
- Danh sách món ăn liên quan.

### 7.4. Trang meal prep

- Hướng dẫn meal prep theo tuần.
- Danh sách nguyên liệu cần mua.
- Thực đơn cho từng ngày.
- Thời gian bảo quản.
- Cách chia khẩu phần.
- Mẹo tiết kiệm thời gian nấu ăn.

### 7.5. Trang bài viết

- Danh sách bài viết về sức khỏe và lối sống.
- Phân loại bài viết theo chủ đề.
- Trang chi tiết bài viết.
- Hiển thị bài viết liên quan.

### 7.6. Trang giới thiệu

- Giới thiệu mục tiêu của website.
- Giới thiệu tác giả.
- Lý do xây dựng dự án.
- Định hướng phát triển trong tương lai.

## 8. Cấu trúc dữ liệu JSON

Ví dụ dữ liệu cho một công thức:

```json
{
  "id": 1,
  "slug": "salad-uc-ga-bo",
  "title": "Salad ức gà và bơ",
  "category": "Lunch",
  "image": "./assets/images/salad-uc-ga-bo.jpg",
  "description": "Món salad giàu protein, dễ chuẩn bị và phù hợp cho bữa trưa.",
  "prepTime": 15,
  "cookTime": 20,
  "servings": 2,
  "calories": 420,
  "protein": 38,
  "carbs": 24,
  "fat": 18,
  "ingredients": ["200g ức gà", "1 quả bơ", "100g xà lách", "5 quả cà chua bi"],
  "steps": [
    "Rửa sạch rau và để ráo nước.",
    "Ướp ức gà với gia vị.",
    "Áp chảo ức gà cho đến khi chín.",
    "Cắt nhỏ các nguyên liệu và trộn đều."
  ],
  "mealPrepTips": ["Bảo quản rau và nước sốt riêng.", "Sử dụng trong vòng 2 ngày."],
  "featured": true
}
```

## 9. Yêu cầu responsive

Website cần tương thích với các thiết bị:

- Laptop.
- Máy tính để bàn.
- Điện thoại di động.
- iPad.
- Máy tính bảng.

Các breakpoint có thể áp dụng:

- Mobile: nhỏ hơn 640px.
- Tablet: từ 640px đến dưới 1024px.
- Laptop: từ 1024px đến dưới 1280px.
- Desktop: từ 1280px trở lên.

Yêu cầu hiển thị:

- Menu chuyển thành hamburger menu trên điện thoại.
- Danh sách món ăn chuyển từ nhiều cột sang một cột hoặc hai cột.
- Hình ảnh tự động thay đổi kích thước.
- Kích thước chữ phù hợp với từng màn hình.
- Nút bấm có vùng chạm đủ lớn trên thiết bị di động.
- Không xuất hiện thanh cuộn ngang.
- Nội dung không bị tràn hoặc che khuất.

## 10. Cấu trúc thư mục dự kiến

```text
healthy-food-blog/
│
├── index.html
├── recipes.html
├── recipe-detail.html
├── meal-prep.html
├── articles.html
├── article-detail.html
├── about.html
│
├── assets/
│   ├── images/
│   ├── icons/
│   └── fonts/
│
├── data/
│   ├── recipes.json
│   ├── articles.json
│   ├── meal-plans.json
│   ├── categories.json
│   └── tips.json
│
├── js/
│   ├── main.js
│   ├── recipes.js
│   ├── recipe-detail.js
│   ├── articles.js
│   └── meal-prep.js
│
├── css/
│   └── output.css
│
├── src/
│   └── input.css
│
├── tailwind.config.js
├── package.json
└── README.md

```

## 11. Phạm vi của phiên bản MVP

### Bao gồm

- Giao diện website hoàn chỉnh.
- Hiển thị dữ liệu từ file JSON.
- Tìm kiếm công thức.
- Lọc theo danh mục.
- Trang chi tiết công thức.
- Trang bài viết.
- Trang meal prep.
- Responsive trên nhiều thiết bị.
- Hình ảnh được tạo hoặc hỗ trợ chỉnh sửa bằng AI.
- Animation cơ bản.

### Chưa bao gồm

- Đăng nhập và đăng ký tài khoản.
- Backend.
- Cơ sở dữ liệu.
- Trang quản trị.
- Đồng bộ dữ liệu theo thời gian thực.
- Bình luận.
- Thanh toán.
- Lưu món ăn yêu thích theo tài khoản.
- AI chatbot hoạt động trực tiếp trên website.

Các chức năng chưa có trong MVP có thể được mô phỏng trên giao diện hoặc phát triển ở phiên bản tiếp theo.

## 12. Kế hoạch thực hiện

### Giai đoạn 1: Phân tích và lên ý tưởng

- Xác định đối tượng người dùng.
- Xác định các trang chính.
- Xây dựng sitemap.
- Thu thập nội dung tham khảo.
- Xác định phong cách thiết kế.

### Giai đoạn 2: Thiết kế giao diện

- Xây dựng wireframe.
- Lựa chọn bảng màu.
- Lựa chọn font chữ.
- Thiết kế các component dùng chung.
- Thiết kế giao diện mobile và desktop.

### Giai đoạn 3: Chuẩn bị dữ liệu

- Xây dựng cấu trúc file JSON.
- Viết dữ liệu công thức.
- Viết dữ liệu bài viết.
- Xây dựng dữ liệu meal prep.
- Tạo và chỉnh sửa hình ảnh món ăn bằng AI.

### Giai đoạn 4: Phát triển website

- Xây dựng header và footer.
- Xây dựng trang chủ.
- Xây dựng trang danh sách công thức.
- Xây dựng trang chi tiết.
- Xây dựng chức năng tìm kiếm và lọc.
- Xây dựng trang bài viết và meal prep.

### Giai đoạn 5: Hoàn thiện giao diện

- Thêm animation.
- Kiểm tra typography.
- Tối ưu hình ảnh.
- Hoàn thiện responsive.
- Kiểm tra khả năng sử dụng trên mobile.

### Giai đoạn 6: Kiểm thử và triển khai

- Kiểm thử chức năng.
- Kiểm thử giao diện.
- Kiểm thử trên nhiều kích thước màn hình.
- Kiểm tra các liên kết.
- Kiểm tra lỗi dữ liệu JSON.
- Triển khai website lên GitHub Pages, Netlify hoặc Vercel.

## 13. Kết quả mong đợi

Sau khi hoàn thành, dự án sẽ cung cấp một website/blog cá nhân có giao diện hiện đại, hiển thị tốt trên nhiều thiết bị và cung cấp nội dung hữu ích về ăn uống healthy, meal prep và lối sống lành mạnh.

Website có thể hoạt động độc lập bằng dữ liệu JSON và không phụ thuộc vào backend. Đồng thời, cấu trúc dự án được tổ chức rõ ràng để thuận tiện mở rộng thêm cơ sở dữ liệu, hệ thống quản trị, tài khoản người dùng hoặc các chức năng AI trong tương lai.
