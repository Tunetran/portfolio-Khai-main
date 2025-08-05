'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Sparkles, RefreshCw, Star, Heart, Shield, Info } from 'lucide-react';

interface TarotCard {
  id: number;
  name: string;
  meaning: string;
  reversed: boolean;
  suit: string;
  keywords: string[];
  advice: string;
  imageUrl: string;
  detailedMeaning: string;
  reversedMeaning: string;
  element?: string;
  planet?: string;
  numerology?: string;
}

const tarotDeck: Omit<TarotCard, 'reversed'>[] = [
  // Major Arcana
  { 
    id: 0, 
    name: "The Fool", 
    meaning: "Khởi đầu mới, phiêu lưu, ngây thơ", 
    suit: "Major Arcana", 
    keywords: ["khởi đầu", "tự do", "ngẫu hứng"], 
    advice: "Hãy dũng cảm bước những bước đầu tiên",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/9/90/RWS_Tarot_00_Fool.jpg",
    detailedMeaning: "The Fool đại diện cho sự khởi đầu mới mẻ và tiềm năng vô hạn. Đây là lá bài của những cuộc phiêu lưu, sự ngây thơ tích cực và niềm tin vào vũ trụ.",
    reversedMeaning: "Khi lật ngược, The Fool có thể chỉ sự thiếu thận trọng, hành động bốc đồng hoặc sợ hãi thay đổi.",
    element: "Air",
    planet: "Uranus",
    numerology: "0 - Tiềm năng vô hạn"
  },
  { 
    id: 1, 
    name: "The Magician", 
    meaning: "Sức mạnh, kỹ năng, tập trung", 
    suit: "Major Arcana", 
    keywords: ["sáng tạo", "quyền lực", "biểu hiện"], 
    advice: "Bạn có tất cả những gì cần thiết để thành công",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/d/de/RWS_Tarot_01_Magician.jpg",
    detailedMeaning: "The Magician tượng trưng cho sức mạnh biến ý tưởng thành hiện thực. Bạn có đầy đủ công cụ và kỹ năng để đạt được mục tiêu.",
    reversedMeaning: "Lật ngược có thể chỉ việc lạm dụng quyền lực, thiếu tập trung hoặc không biết cách sử dụng tài năng của mình.",
    element: "Air",
    planet: "Mercury",
    numerology: "1 - Khởi đầu, lãnh đạo"
  },
  { 
    id: 2, 
    name: "The High Priestess", 
    meaning: "Trực giác, bí ẩn, tiềm thức", 
    suit: "Major Arcana", 
    keywords: ["trực giác", "bí mật", "khôn ngoan"], 
    advice: "Hãy lắng nghe tiếng nói bên trong bạn",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/8/88/RWS_Tarot_02_High_Priestess.jpg",
    detailedMeaning: "The High Priestess đại diện cho trí tuệ nữ tính, trực giác và kiến thức ẩn giấu. Cô khuyến khích bạn tin vào inner voice của mình.",
    reversedMeaning: "Khi lật ngược, có thể chỉ việc bỏ qua trực giác, giữ bí mật quá mức hoặc thiếu kết nối với bản thân.",
    element: "Water",
    planet: "Moon",
    numerology: "2 - Cân bằng, hợp tác"
  },
  { 
    id: 3, 
    name: "The Empress", 
    meaning: "Nữ tính, sáng tạo, tự nhiên", 
    suit: "Major Arcana", 
    keywords: ["nuôi dưỡng", "phong phú", "sáng tạo"], 
    advice: "Hãy để tình yêu và sự chăm sóc dẫn dắt bạn",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/d/d2/RWS_Tarot_03_Empress.jpg",
    detailedMeaning: "The Empress tượng trưng cho sự sinh sôi, nuôi dưỡng và sáng tạo. Cô đại diện cho tình mẫu tử, thiên nhiên và sự phong phú.",
    reversedMeaning: "Lật ngược có thể chỉ sự thiếu tự tin, sáng tạo bị cản trở hoặc quá bảo vệ.",
    element: "Earth",
    planet: "Venus",
    numerology: "3 - Sáng tạo, giao tiếp"
  },
  { 
    id: 4, 
    name: "The Emperor", 
    meaning: "Quyền uy, cấu trúc, kiểm soát", 
    suit: "Major Arcana", 
    keywords: ["lãnh đạo", "ổn định", "kỷ luật"], 
    advice: "Thời gian để thể hiện sự lãnh đạo và kỷ luật",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/c/c3/RWS_Tarot_04_Emperor.jpg",
    detailedMeaning: "The Emperor đại diện cho quyền lực, cấu trúc và kỷ luật. Ông là biểu tượng của sự lãnh đạo mạnh mẽ và ổn định.",
    reversedMeaning: "Khi lật ngược, có thể chỉ sự độc tài, thiếu kỷ luật hoặc lạm dụng quyền lực.",
    element: "Fire",
    planet: "Aries",
    numerology: "4 - Ổn định, nền tảng"
  },
  { 
    id: 5, 
    name: "The Hierophant", 
    meaning: "Truyền thống, tâm linh, hướng dẫn", 
    suit: "Major Arcana", 
    keywords: ["học hỏi", "truyền thống", "hướng dẫn"], 
    advice: "Tìm kiếm sự hướng dẫn từ những người có kinh nghiệm",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/8/8d/RWS_Tarot_05_Hierophant.jpg",
    detailedMeaning: "The Hierophant đại diện cho giáo dục, tôn giáo và truyền thống. Ông khuyến khích việc học hỏi từ những người có kinh nghiệm.",
    reversedMeaning: "Lật ngược có thể chỉ sự cứng nhắc trong tư duy, phản kháng truyền thống hoặc thiếu hướng dẫn tâm linh.",
    element: "Earth",
    planet: "Taurus",
    numerology: "5 - Thay đổi, tự do"
  },
  { 
    id: 6, 
    name: "The Lovers", 
    meaning: "Tình yêu, lựa chọn, hòa hợp", 
    suit: "Major Arcana", 
    keywords: ["tình yêu", "lựa chọn", "kết nối"], 
    advice: "Đưa ra quyết định từ trái tim và đầu óc",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/3/3a/TheLovers.jpg",
    detailedMeaning: "The Lovers không chỉ về tình yêu mà còn về những lựa chọn quan trọng và sự hòa hợp giữa các đối lập.",
    reversedMeaning: "Khi lật ngược, có thể chỉ mâu thuẫn trong tình cảm, lựa chọn sai lầm hoặc thiếu hòa hợp.",
    element: "Air",
    planet: "Gemini",
    numerology: "6 - Hòa hợp, trách nhiệm"
  },
  { 
    id: 7, 
    name: "The Chariot", 
    meaning: "Ý chí, quyết tâm, thành công", 
    suit: "Major Arcana", 
    keywords: ["chiến thắng", "kiểm soát", "tiến bộ"], 
    advice: "Duy trì sự tập trung và quyết tâm để đạt mục tiêu",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/9/9b/RWS_Tarot_07_Chariot.jpg",
    detailedMeaning: "The Chariot tượng trưng cho chiến thắng thông qua ý chí và quyết tâm. Đây là lá bài của sự kiểm soát và tiến bộ.",
    reversedMeaning: "Lật ngược có thể chỉ thiếu phương hướng, mất kiểm soát hoặc cố gắng quá sức.",
    element: "Water",
    planet: "Cancer",
    numerology: "7 - Tâm linh, phân tích"
  },
  { 
    id: 8, 
    name: "Strength", 
    meaning: "Sức mạnh nội tại, can đảm, kiên nhẫn", 
    suit: "Major Arcana", 
    keywords: ["can đảm", "lòng từ bi", "kiểm soát"], 
    advice: "Sức mạnh thật sự đến từ lòng từ bi và kiên nhẫn",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/f/f5/RWS_Tarot_08_Strength.jpg",
    detailedMeaning: "Strength đại diện cho sức mạnh nội tại, không phải sức mạnh vật lý mà là khả năng kiểm soát cảm xúc và tình huống bằng lòng từ bi.",
    reversedMeaning: "Khi lật ngược, có thể chỉ sự yếu đuối nội tâm, thiếu tự tin hoặc sử dụng sức mạnh không đúng cách.",
    element: "Fire",
    planet: "Leo",
    numerology: "8 - Quyền lực, thành tựu vật chất"
  },
  { 
    id: 9, 
    name: "The Hermit", 
    meaning: "Tự suy ngẫm, tìm kiếm chân lý", 
    suit: "Major Arcana", 
    keywords: ["tự suy ngẫm", "hướng dẫn", "khôn ngoan"], 
    advice: "Dành thời gian để suy ngẫm và tìm hiểu bản thân",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/4/4d/RWS_Tarot_09_Hermit.jpg",
    detailedMeaning: "The Hermit khuyến khích sự tự suy ngẫm và tìm kiếm chân lý bên trong. Đây là thời gian để rút lui và tìm hiểu bản thân.",
    reversedMeaning: "Lật ngược có thể chỉ sự cô lập quá mức, tránh né hiện thực hoặc thiếu hướng dẫn nội tâm.",
    element: "Earth",
    planet: "Virgo",
    numerology: "9 - Hoàn thành, khôn ngoan"
  },
  { 
    id: 10, 
    name: "Wheel of Fortune", 
    meaning: "Chu kỳ, may mắn, thay đổi", 
    suit: "Major Arcana", 
    keywords: ["thay đổi", "chu kỳ", "vận mệnh"], 
    advice: "Chấp nhận những thay đổi và tin vào vận may",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/3/3c/RWS_Tarot_10_Wheel_of_Fortune.jpg",
    detailedMeaning: "Wheel of Fortune đại diện cho những thay đổi của cuộc sống và chu kỳ vận mệnh. Mọi thứ đều có lúc lên và lúc xuống.",
    reversedMeaning: "Khi lật ngược, có thể chỉ vận rủi, sự thay đổi không mong muốn hoặc thiếu kiểm soát tình huống.",
    element: "Fire",
    planet: "Jupiter",
    numerology: "10 - Hoàn thành chu kỳ"
  }
];

const luckyColors = ["Đỏ", "Xanh dương", "Vàng", "Xanh lá", "Tím", "Hồng", "Cam", "Bạc", "Trắng", "Đen"];

const TarotSection: React.FC = () => {
  const [selectedCards, setSelectedCards] = useState<TarotCard[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);
  const [luckyColor, setLuckyColor] = useState<string>("");
  const [overallReading, setOverallReading] = useState<string>("");
  const [selectedCardForModal, setSelectedCardForModal] = useState<TarotCard | null>(null);

  const drawCards = () => {
    setIsDrawing(true);
    setHasDrawn(false);
    
    setTimeout(() => {
      // Bốc 3 lá bài ngẫu nhiên
      const shuffled = [...tarotDeck].sort(() => Math.random() - 0.5);
      const drawn = shuffled.slice(0, 3).map((card, index) => ({
        ...card,
        reversed: Math.random() > 0.5 // 50% chance bài lật ngược
      }));
      
      setSelectedCards(drawn);
      
      // Màu may mắn ngẫu nhiên
      const randomColor = luckyColors[Math.floor(Math.random() * luckyColors.length)];
      setLuckyColor(randomColor);
      
      // Đưa ra lời khuyên tổng thể
      generateOverallReading(drawn);
      
      setIsDrawing(false);
      setHasDrawn(true);
    }, 2000);
  };

  const generateOverallReading = (cards: TarotCard[]) => {
    const majorArcanaCount = cards.filter(card => card.suit === "Major Arcana").length;
    const reversedCount = cards.filter(card => card.reversed).length;
    
    let reading = "";
    
    // Phân tích dựa trên số lượng Major Arcana
    if (majorArcanaCount >= 2) {
      reading += "🌟 Hôm nay có những sự kiện quan trọng và có ý nghĩa sâu sắc sẽ diễn ra trong cuộc sống của bạn. ";
    } else if (majorArcanaCount === 1) {
      reading += "⭐ Một sự kiện có ý nghĩa đặc biệt sẽ ảnh hướng đến ngày hôm nay của bạn. ";
    } else {
      reading += "🌸 Ngày hôm nay tập trung vào những việc thường ngày và phát triển kỹ năng cá nhân. ";
    }
    
    // Phân tích dựa trên số lượng bài ngược
    if (reversedCount >= 2) {
      reading += "⚠️ Cần đặc biệt cẩn thận với những quyết định và hành động. Hãy chậm lại, suy nghĩ kỹ và tránh hành động vội vàng. ";
    } else if (reversedCount === 1) {
      reading += "🔄 Có một khía cạnh cần được xem xét lại hoặc tiếp cận theo cách khác. Hãy linh hoạt trong tư duy. ";
    } else {
      reading += "✨ Ngày thuận lợi với năng lượng tích cực cao. Đây là thời điểm tốt để thực hiện kế hoạch và hành động. ";
    }
    
    // Lời khuyên dựa trên suit chủ đạo
    const suits = cards.map(card => card.suit);
    const suitCount = suits.reduce((acc, suit) => {
      acc[suit] = (acc[suit] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const dominantSuit = Object.keys(suitCount).reduce((a, b) => 
      suitCount[a] > suitCount[b] ? a : b
    );
    
    switch (dominantSuit) {
      case "Major Arcana":
        reading += "🎯 Tập trung vào phát triển tinh thần, tự nhận thức và những bài học quan trọng của cuộc sống.";
        break;
      case "Cups":
        reading += "💝 Dành nhiều thời gian cho cảm xúc, các mối quan hệ và sự kết nối với người thân yêu.";
        break;
      case "Wands":
        reading += "🔥 Đây là thời điểm để hành động mạnh mẽ, thực hiện ý tưởng và theo đuổi đam mê.";
        break;
      case "Swords":
        reading += "🧠 Sử dụng trí tuệ, logic và khả năng phân tích để giải quyết các vấn đề phức tạp.";
        break;
      case "Pentacles":
        reading += "💼 Tập trung vào công việc, tài chính và các vấn đề thực tế trong cuộc sống.";
        break;
    }
    
    setOverallReading(reading);
  };

  const getCardPositionName = (index: number): string => {
    const positions = ["Quá khứ / Nguyên nhân", "Hiện tại / Tình huống", "Tương lai / Kết quả"];
    return positions[index];
  };

  const getThingsToAvoid = (): string[] => {
    if (!hasDrawn) return [];
    
    const avoidList: string[] = [];
    
    selectedCards.forEach((card) => {
      if (card.reversed) {
        switch (card.suit) {
          case "Cups":
            avoidList.push("Quyết định cảm tính");
            break;
          case "Wands":
            avoidList.push("Hành động vội vàng");
            break;
          case "Swords":
            avoidList.push("Tranh cãi không cần thiết");
            break;
          case "Pentacles":
            avoidList.push("Chi tiêu bừa bãi");
            break;
          default:
            avoidList.push("Bỏ qua trực giác");
        }
      }
    });
    
    if (avoidList.length === 0) {
      avoidList.push("Tiêu cực", "Nghi ngờ bản thân");
    }
    
    return Array.from(new Set(avoidList)); // Remove duplicates
  };

  const generateDetailedInterpretation = (): string => {
    if (!hasDrawn) return "";
    
    const majorCount = selectedCards.filter(card => card.suit === "Major Arcana").length;
    const reversedCount = selectedCards.filter(card => card.reversed).length;
    
    let interpretation = "";
    
    if (majorCount === 3) {
      interpretation = "Hôm nay là một ngày đặc biệt quan trọng trong hành trình cuộc sống của bạn. Ba lá bài Major Arcana cho thấy những biến chuyển lớn đang diễn ra. ";
    } else if (majorCount >= 2) {
      interpretation = "Những sự kiện có ý nghĩa sâu sắc đang định hình cuộc sống bạn. ";
    } else {
      interpretation = "Ngày hôm nay tập trung vào việc xây dựng nền tảng vững chắc cho tương lai. ";
    }
    
    if (reversedCount === 0) {
      interpretation += "Tất cả các năng lượng đều hướng về phía tích cực, đây là thời điểm thuận lợi để thực hiện kế hoạch. ";
    } else if (reversedCount === 1) {
      interpretation += "Có một khía cạnh cần được cân nhắc kỹ lưỡng trước khi hành động. ";
    } else {
      interpretation += "Cần thận trọng và kiên nhẫn, không nên vội vàng trong các quyết định quan trọng. ";
    }
    
    // Phân tích mối liên hệ giữa các lá bài
    const cardNames = selectedCards.map(card => card.name);
    if (cardNames.includes("The Fool") && cardNames.includes("The World")) {
      interpretation += "Sự kết hợp giữa khởi đầu và hoàn thành cho thấy một chu kỳ quan trọng đang được khép lại để mở ra chương mới. ";
    }
    
    interpretation += "Hãy tin tương vào trực giác và giữ tâm thế cân bằng trong mọi tình huống.";
    
    return interpretation;
  };

  return (
    <section className="py-20 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Background stars */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${Math.random() * 3 + 2}s`
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4 flex items-center justify-center gap-2">
            <Sparkles className="w-8 h-8 text-yellow-400" />
            Bói Bài Tarot
            <Sparkles className="w-8 h-8 text-yellow-400" />
          </h2>
          <p className="text-xl text-purple-200 mb-8">
            Khám phá vận may của bạn hôm nay qua 3 lá bài tarot bí ẩn
          </p>
          
          <Button
            onClick={drawCards}
            disabled={isDrawing}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 text-lg font-semibold rounded-full shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            {isDrawing ? (
              <>
                <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                Đang bốc bài...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 mr-2" />
                Bốc bài Tarot
              </>
            )}
          </Button>
        </div>

        {/* Cards Display */}
        {hasDrawn && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {selectedCards.map((card, index) => (
              <Dialog key={index}>
                <DialogTrigger asChild>
                  <Card className="bg-white/10 backdrop-blur-md border-purple-300/30 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 cursor-pointer">
                    <CardHeader className="text-center">
                      <CardTitle className="text-white flex items-center justify-center gap-2">
                        <Star className="w-5 h-5 text-yellow-400" />
                        {getCardPositionName(index)}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-center space-y-4">
                      {/* Card Image */}
                      <div className={`relative w-32 h-48 mx-auto ${card.reversed ? 'transform rotate-180' : ''}`}>
                        <img
                          src={card.imageUrl}
                          alt={card.name}
                          className="w-full h-full object-cover rounded-lg border-2 border-yellow-400/50 shadow-lg"
                          onError={(e) => {
                            // Fallback to emoji if image fails to load
                            e.currentTarget.style.display = 'none';
                            const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                            if (fallback) {
                              fallback.style.display = 'flex';
                            }
                          }}
                        />
                        <div className="w-full h-full bg-purple-800 rounded-lg border-2 border-yellow-400/50 hidden items-center justify-center text-6xl">
                          🃏
                        </div>
                        {card.reversed && (
                          <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold transform rotate-180">
                            NGƯỢC
                          </div>
                        )}
                      </div>

                      <h3 className="text-xl font-bold text-white">
                        {card.name}
                      </h3>
                      
                      <p className="text-purple-200 text-sm line-clamp-3">
                        {card.reversed ? card.reversedMeaning : card.detailedMeaning}
                      </p>

                      {/* Keywords */}
                      <div className="flex flex-wrap gap-1 justify-center">
                        {card.keywords.slice(0, 3).map((keyword, idx) => (
                          <span key={idx} className="bg-purple-600/50 text-white px-2 py-1 rounded-full text-xs">
                            {keyword}
                          </span>
                        ))}
                      </div>

                      <Button variant="ghost" size="sm" className="text-yellow-300 hover:text-yellow-200">
                        <Info className="w-4 h-4 mr-1" />
                        Xem chi tiết
                      </Button>
                    </CardContent>
                  </Card>
                </DialogTrigger>

                <DialogContent className="max-w-md bg-gradient-to-br from-purple-900 to-indigo-900 text-white border-purple-400">
                  <DialogHeader>
                    <DialogTitle className="text-center text-xl font-bold text-yellow-300">
                      {card.name}
                      {card.reversed && <span className="text-red-400 ml-2">(Lật Ngược)</span>}
                    </DialogTitle>
                  </DialogHeader>
                  
                  <div className="space-y-4">
                    {/* Card Image in Modal */}
                    <div className={`relative w-40 h-60 mx-auto ${card.reversed ? 'transform rotate-180' : ''}`}>
                      <img
                        src={card.imageUrl}
                        alt={card.name}
                        className="w-full h-full object-cover rounded-lg border-2 border-yellow-400/50 shadow-lg"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                          if (fallback) {
                            fallback.style.display = 'flex';
                          }
                        }}
                      />
                      <div className="w-full h-full bg-purple-800 rounded-lg border-2 border-yellow-400/50 hidden items-center justify-center text-8xl">
                        🃏
                      </div>
                    </div>

                    {/* Detailed Information */}
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-bold text-yellow-300 mb-2">Ý nghĩa:</h4>
                        <p className="text-purple-200 text-sm">
                          {card.reversed ? card.reversedMeaning : card.detailedMeaning}
                        </p>
                      </div>

                      <div>
                        <h4 className="font-bold text-yellow-300 mb-2">Từ khóa:</h4>
                        <div className="flex flex-wrap gap-1">
                          {card.keywords.map((keyword, idx) => (
                            <span key={idx} className="bg-purple-600/50 text-white px-2 py-1 rounded-full text-xs">
                              {keyword}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Card Attributes */}
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="bg-white/10 p-2 rounded">
                          <span className="text-purple-300">Bộ bài:</span>
                          <div className="text-yellow-300 font-medium">{card.suit}</div>
                        </div>
                        {card.element && (
                          <div className="bg-white/10 p-2 rounded">
                            <span className="text-purple-300">Nguyên tố:</span>
                            <div className="text-yellow-300 font-medium">{card.element}</div>
                          </div>
                        )}
                        {card.planet && (
                          <div className="bg-white/10 p-2 rounded">
                            <span className="text-purple-300">Hành tinh:</span>
                            <div className="text-yellow-300 font-medium">{card.planet}</div>
                          </div>
                        )}
                        {card.numerology && (
                          <div className="bg-white/10 p-2 rounded">
                            <span className="text-purple-300">Số học:</span>
                            <div className="text-yellow-300 font-medium">{card.numerology}</div>
                          </div>
                        )}
                      </div>

                      <div className="bg-yellow-400/20 p-3 rounded-lg border border-yellow-400/30">
                        <h4 className="font-bold text-yellow-300 mb-2">Lời khuyên:</h4>
                        <p className="text-yellow-200 italic">"{card.advice}"</p>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        )}

        {/* Overall Reading */}
        {hasDrawn && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {/* Tổng quan */}
              <Card className="bg-white/10 backdrop-blur-md border-purple-300/30">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-yellow-400" />
                    Tổng quan ngày
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-purple-200">{overallReading}</p>
                </CardContent>
              </Card>

              {/* Màu may mắn */}
              <Card className="bg-white/10 backdrop-blur-md border-purple-300/30">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Heart className="w-5 h-5 text-pink-400" />
                    Màu may mắn
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-yellow-300 mb-2">{luckyColor}</div>
                    <p className="text-purple-200">Mang theo màu này sẽ đem lại may mắn cho bạn hôm nay</p>
                  </div>
                </CardContent>
              </Card>

              {/* Điều nên tránh */}
              <Card className="bg-white/10 backdrop-blur-md border-purple-300/30">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Shield className="w-5 h-5 text-red-400" />
                    Nên tránh
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {getThingsToAvoid().map((item, index) => (
                      <li key={index} className="text-purple-200 flex items-center gap-2">
                        <span className="w-2 h-2 bg-red-400 rounded-full"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Detailed Reading Analysis */}
            <Card className="bg-gradient-to-br from-indigo-900/30 to-purple-900/30 backdrop-blur-md border-indigo-300/30 mb-8">
              <CardHeader>
                <CardTitle className="text-white text-xl text-center">
                  📖 Phân Tích Chi Tiết Theo Thời Gian
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  {selectedCards.map((card: TarotCard, index: number) => (
                    <div key={index} className="space-y-4">
                      <div className="text-center">
                        <h4 className="font-semibold text-lg text-white mb-2">
                          {index === 0 ? "🕐 Quá Khứ" : index === 1 ? "⏰ Hiện Tại" : "🔮 Tương Lai"}
                        </h4>
                        <h5 className="text-yellow-300 font-medium">{card.name}</h5>
                        {card.reversed && <span className="text-red-400 text-sm">(Bài Ngược)</span>}
                      </div>
                      
                      <div className="bg-white/5 rounded-lg p-4 space-y-3">
                        <div>
                          <p className="text-sm text-gray-300">
                            <span className="text-purple-300 font-medium">
                              {index === 0 && "Ảnh hưởng từ quá khứ: "}
                              {index === 1 && "Tình hình hiện tại: "}
                              {index === 2 && "Triển vọng tương lai: "}
                            </span>
                            {card.reversed ? card.reversedMeaning : card.meaning}
                          </p>
                        </div>
                        
                        <div className="border-t border-white/10 pt-3">
                          <p className="text-xs text-gray-400">
                            <strong className="text-yellow-300">Lời khuyên chi tiết:</strong>
                          </p>
                          <p className="text-xs text-purple-200 mt-1 leading-relaxed">
                            {card.reversed ? card.reversedMeaning : card.detailedMeaning}
                          </p>
                        </div>
                        
                        <div className="bg-yellow-400/10 rounded p-2 border border-yellow-400/20">
                          <p className="text-xs text-yellow-200 italic">
                            "{card.advice}"
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Overall Interpretation */}
                <div className="mt-6 pt-6 border-t border-white/10">
                  <h4 className="text-center text-lg font-semibold text-white mb-4">
                    🌟 Kết Luận Tổng Thể
                  </h4>
                  <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-lg p-4 border border-purple-400/30">
                    <p className="text-purple-200 text-center leading-relaxed">
                      {generateDetailedInterpretation()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {!hasDrawn && !isDrawing && (
          <div className="text-center">
            <div className="text-8xl mb-4">🔮</div>
            <p className="text-purple-200 text-lg">
              Hãy bốc bài để khám phá vận may của bạn hôm nay...
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default TarotSection;
