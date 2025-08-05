# Hướng dẫn quản lý Blog trong Portfolio

## 📝 Cách chỉnh sửa nội dung blog

Tất cả nội dung blog được quản lý trong file `data/portfolio.json` ở phần `"blog"`. Bạn có thể dễ dàng:

### ✏️ **Chỉnh sửa bài viết có sẵn**

1. Mở file `data/portfolio.json`
2. Tìm phần `"blog": [`
3. Chỉnh sửa các trường sau:

```json
{
  "id": 1,                          // ID duy nhất cho bài viết
  "title": "Tiêu đề bài viết",      // Tiêu đề hiển thị
  "excerpt": "Mô tả ngắn...",       // Tóm tắt ngắn
  "content": "Nội dung đầy đủ...",  // Nội dung chi tiết (hỗ trợ \n\n cho đoạn mới)
  "image": "https://...",           // URL hình ảnh
  "tags": ["Tag1", "Tag2"],         // Thẻ phân loại
  "publishedAt": "2024-07-15",      // Ngày xuất bản
  "readTime": "5 phút đọc",         // Thời gian đọc ước tính
  "featured": true                  // true = bài nổi bật, false = bài thường
}
```

### ➕ **Thêm bài viết mới**

Sao chép cấu trúc trên và thêm vào cuối danh sách `blog`, nhớ:
- ID phải là số duy nhất
- Thêm dấu phẩy `,` sau bài viết trước đó
- `featured: true` để hiển thị ở mục "Bài viết nổi bật"

### 🗑️ **Xóa bài viết**

Xóa toàn bộ object `{}` của bài viết và điều chỉnh dấu phẩy cho đúng cú pháp JSON.

### 📝 **Định dạng nội dung**

Trong trường `"content"`:
- Sử dụng `\n\n` để tạo đoạn văn mới
- Sử dụng `**text**` để tạo tiêu đề phụ (sẽ được xử lý trong hiển thị)
- Nội dung sẽ tự động được chia thành các đoạn văn

### 🎨 **Tùy chỉnh hiển thị**

- **Bài nổi bật** (`featured: true`): Hiển thị to hơn, có nhãn "Nổi bật"
- **Bài thường** (`featured: false`): Hiển thị trong lưới 3 cột
- **Tags**: Tối đa 2 tag hiển thị cho bài thường, bài nổi bật hiển thị tất cả

### 🔧 **Chức năng đã có**

✅ Modal xem bài viết đầy đủ
✅ Responsive design
✅ Dark mode support  
✅ Animation mượt mà
✅ Chia sẻ bài viết
✅ Tự động format ngày tháng
✅ Tags và metadata

### 💡 **Gợi ý nội dung**

Các chủ đề phù hợp cho blog cybersecurity:
- Network Security basics
- Penetration Testing guides  
- Incident Response procedures
- Cryptography explanations
- Security tools tutorials
- Vulnerability analysis
- Best practices và compliance

Sau khi chỉnh sửa, save file và reload website để thấy thay đổi!
