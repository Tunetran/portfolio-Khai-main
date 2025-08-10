const fs = require('fs');
const path = require('path');

// Đọc file hiện tại
const filePath = path.join(__dirname, 'components', 'TarotSection.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Mapping các lá bài với URL hình ảnh đúng
const imageMapping = {
  // Pentacles
  'id: 66': 'https://upload.wikimedia.org/wikipedia/commons/4/42/Pents03.jpg', // Three of Pentacles
  'id: 67': 'https://upload.wikimedia.org/wikipedia/commons/0/0f/Pents04.jpg', // Four of Pentacles
  'id: 68': 'https://upload.wikimedia.org/wikipedia/commons/9/96/Pents05.jpg', // Five of Pentacles
  'id: 69': 'https://upload.wikimedia.org/wikipedia/commons/a/a6/Pents06.jpg', // Six of Pentacles
  'id: 70': 'https://upload.wikimedia.org/wikipedia/commons/6/6a/Pents07.jpg', // Seven of Pentacles
  'id: 71': 'https://upload.wikimedia.org/wikipedia/commons/4/49/Pents08.jpg', // Eight of Pentacles
  'id: 72': 'https://upload.wikimedia.org/wikipedia/commons/f/f0/Pents09.jpg', // Nine of Pentacles
  'id: 73': 'https://upload.wikimedia.org/wikipedia/commons/4/42/Pents10.jpg', // Ten of Pentacles
  'id: 74': 'https://upload.wikimedia.org/wikipedia/commons/e/ec/Pents11.jpg', // Page of Pentacles
  'id: 75': 'https://upload.wikimedia.org/wikipedia/commons/d/d5/Pents12.jpg', // Knight of Pentacles
  'id: 76': 'https://upload.wikimedia.org/wikipedia/commons/8/88/Pents13.jpg', // Queen of Pentacles
  'id: 77': 'https://upload.wikimedia.org/wikipedia/commons/1/1c/Pents14.jpg', // King of Pentacles
};

// Thay thế tất cả URL placeholder còn lại bằng hình ảnh mặc định trước
content = content.replace(
  /imageUrl: "https:\/\/upload\.wikimedia\.org\/wikipedia\/commons\/5\/5b\/Rider-Waite-Smith_tarot_deck\.jpg"/g,
  'imageUrl: "https://upload.wikimedia.org/wikipedia/commons/5/5b/Rider-Waite-Smith_tarot_deck.jpg"'
);

// Sau đó thay thế các lá bài cụ thể
Object.entries(imageMapping).forEach(([cardId, imageUrl]) => {
  // Tìm và thay thế URL cho từng lá bài cụ thể
  const regex = new RegExp(`(id: ${cardId.split(': ')[1]}[\\s\\S]*?)imageUrl: "https://upload\\.wikimedia\\.org/wikipedia/commons/5/5b/Rider-Waite-Smith_tarot_deck\\.jpg"`, 'g');
  content = content.replace(regex, `$1imageUrl: "${imageUrl}"`);
});

// Ghi lại file
fs.writeFileSync(filePath, content, 'utf8');
console.log('Đã cập nhật thành công tất cả hình ảnh tarot!');
