'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Sparkles, RefreshCw, Star, Heart, Shield, Info, Clock, TrendingUp, Users, DollarSign, Lightbulb, Calendar, Eye } from 'lucide-react';

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
  loveAdvice?: string;
  careerAdvice?: string;
  healthAdvice?: string;
  spiritualAdvice?: string;
}

interface ReadingHistory {
  date: string;
  cards: TarotCard[];
  spread: string;
  overallReading: string;
}

interface SpreadType {
  name: string;
  description: string;
  positions: string[];
  cardCount: number;
}

const spreadTypes: SpreadType[] = [
  {
    name: "Daily Reading",
    description: "Bói hàng ngày đơn giản",
    positions: ["Quá khứ / Nguyên nhân", "Hiện tại / Tình huống", "Tương lai / Kết quả"],
    cardCount: 3
  },
  {
    name: "Love Triangle",
    description: "Tình yêu và các mối quan hệ",
    positions: ["Cảm xúc của bạn", "Cảm xúc của người ấy", "Tương lai mối quan hệ"],
    cardCount: 3
  },
  {
    name: "Career Path",
    description: "Sự nghiệp và công việc",
    positions: ["Tình hình hiện tại", "Thách thức", "Cơ hội", "Lời khuyên"],
    cardCount: 4
  },
  {
    name: "Life Decision",
    description: "Quyết định quan trọng",
    positions: ["Tình huống", "Lựa chọn A", "Lựa chọn B", "Kết quả", "Lời khuyên"],
    cardCount: 5
  }
];

const tarotDeck: Omit<TarotCard, 'reversed'>[] = [
  { 
    id: 0, 
    name: "The Fool", 
    meaning: "Khởi đầu mới, phiêu lưu, ngây thơ", 
    suit: "Major Arcana", 
    keywords: ["khởi đầu", "tự do", "ngẫu hứng", "tiềm năng", "phiêu lưu"], 
    advice: "Hãy dũng cảm bước những bước đầu tiên với tâm thế cởi mở",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/9/90/RWS_Tarot_00_Fool.jpg",
    detailedMeaning: "The Fool đại diện cho sự khởi đầu mới mẻ và tiềm năng vô hạn. Đây là lá bài của những cuộc phiêu lưu, sự ngây thơ tích cực và niềm tin vào vũ trụ. Khi xuất hiện, nó báo hiệu một chương mới trong cuộc sống với đầy cơ hội và khả năng.",
    reversedMeaning: "Khi lật ngược, The Fool có thể chỉ sự thiếu thận trọng, hành động bốc đồng, sợ hãi thay đổi hoặc thiếu chuẩn bị cho hành trình phía trước.",
    element: "Air",
    planet: "Uranus",
    numerology: "0 - Tiềm năng vô hạn",
    loveAdvice: "Mở lòng với tình yêu mới, đừng sợ tổn thương. Thời gian tốt để bắt đầu một mối quan hệ mới.",
    careerAdvice: "Cơ hội nghề nghiệp mới đang chờ đợi. Hãy dũng cảm thay đổi hoặc học hỏi kỹ năng mới.",
    healthAdvice: "Bắt đầu một lối sống lành mạnh. Thay đổi tích cực về chế độ ăn uống và tập luyện.",
    spiritualAdvice: "Tin tưởng vào trực giác và khả năng nội tại. Đây là thời điểm để khám phá tâm linh."
  },
  { 
    id: 1, 
    name: "The Magician", 
    meaning: "Sức mạnh, kỹ năng, tập trung", 
    suit: "Major Arcana", 
    keywords: ["sáng tạo", "quyền lực", "biểu hiện", "kỹ năng", "tập trung"], 
    advice: "Bạn có tất cả những gì cần thiết để thành công, hãy tận dụng tài năng",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/d/de/RWS_Tarot_01_Magician.jpg",
    detailedMeaning: "The Magician tượng trưng cho sức mạnh biến ý tưởng thành hiện thực. Với đầy đủ công cụ và kỹ năng, bạn có khả năng đạt được mọi mục tiêu. Lá bài này nhấn mạnh tầm quan trọng của việc tập trung và sử dụng tất cả tài nguyên có sẵn.",
    reversedMeaning: "Lật ngược có thể chỉ việc lạm dụng quyền lực, thiếu tập trung, thao túng người khác hoặc không biết cách sử dụng hiệu quả tài năng của mình.",
    element: "Air",
    planet: "Mercury",
    numerology: "1 - Khởi đầu, lãnh đạo, ý chí",
    loveAdvice: "Chủ động trong tình yêu. Sử dụng sức hút cá nhân để thu hút người bạn yêu thích.",
    careerAdvice: "Thời điểm lý tưởng để khởi nghiệp hoặc thể hiện khả năng lãnh đạo. Hãy tự tin vào kỹ năng của mình.",
    healthAdvice: "Bạn có khả năng chữa lành bản thân. Tập trung vào việc cân bằng thể chất và tinh thần.",
    spiritualAdvice: "Phát triển khả năng biểu hiện ý tưởng thành hiện thực thông qua thiền định và thực hành tâm linh."
  },
  { 
    id: 2, 
    name: "The High Priestess", 
    meaning: "Trực giác, bí ẩn, tiềm thức", 
    suit: "Major Arcana", 
    keywords: ["trực giác", "bí mật", "khôn ngoan", "nữ tính", "tâm linh"], 
    advice: "Hãy lắng nghe tiếng nói bên trong bạn và tin vào trực giác",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/8/88/RWS_Tarot_02_High_Priestess.jpg",
    detailedMeaning: "The High Priestess đại diện cho trí tuệ nữ tính, trực giác và kiến thức ẩn giấu. Cô khuyến khích bạn tin vào inner voice của mình và kết nối với tiềm thức.",
    reversedMeaning: "Khi lật ngược, có thể chỉ việc bỏ qua trực giác, giữ bí mật quá mức hoặc thiếu kết nối với bản thân.",
    element: "Water",
    planet: "Moon",
    numerology: "2 - Cân bằng, hợp tác",
    loveAdvice: "Hãy tin vào cảm xúc và trực giác trong tình yêu. Đừng quá phân tích mà hãy cảm nhận.",
    careerAdvice: "Sử dụng trực giác để đưa ra quyết định công việc. Tin vào khả năng nhìn thấy điều người khác không thấy.",
    healthAdvice: "Chú ý đến cơ thể và tâm trí. Thiền định và yoga sẽ có lợi cho sức khỏe.",
    spiritualAdvice: "Phát triển khả năng tâm linh thông qua thiền định và kết nối với năng lượng nữ tính thiêng liêng."
  },
  { 
    id: 3, 
    name: "The Empress", 
    meaning: "Nữ tính, sáng tạo, tự nhiên", 
    suit: "Major Arcana", 
    keywords: ["nuôi dưỡng", "phong phú", "sáng tạo", "mẹ", "thiên nhiên"], 
    advice: "Hãy để tình yêu và sự chăm sóc dẫn dắt bạn trong mọi hành động",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/d/d2/RWS_Tarot_03_Empress.jpg",
    detailedMeaning: "The Empress tượng trưng cho sự sinh sôi, nuôi dưỡng và sáng tạo. Cô đại diện cho tình mẫu tử, thiên nhiên và sự phong phú trong mọi khía cạnh cuộc sống.",
    reversedMeaning: "Lật ngược có thể chỉ sự thiếu tự tin, sáng tạo bị cản trở hoặc quá bảo vệ mà ngăn cản sự phát triển.",
    element: "Earth",
    planet: "Venus",
    numerology: "3 - Sáng tạo, giao tiếp",
    loveAdvice: "Thể hiện tình yêu thông qua việc chăm sóc và nuôi dưỡng. Đây là thời điểm tốt cho gia đình.",
    careerAdvice: "Sử dụng khả năng sáng tạo và nuôi dưỡng trong công việc. Nghệ thuật và giáo dục là lĩnh vực thuận lợi.",
    healthAdvice: "Chăm sóc bản thân như cách bạn chăm sóc người khác. Dinh dưỡng và nghỉ ngơi đầy đủ.",
    spiritualAdvice: "Kết nối với thiên nhiên và năng lượng nữ tính sáng tạo. Thực hành lòng biết ơn."
  },
  { 
    id: 4, 
    name: "The Emperor", 
    meaning: "Quyền uy, cấu trúc, kiểm soát", 
    suit: "Major Arcana", 
    keywords: ["lãnh đạo", "ổn định", "kỷ luật", "bảo vệ", "quyền lực"], 
    advice: "Thời gian để thể hiện sự lãnh đạo và thiết lập kỷ luật trong cuộc sống",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/c/c3/RWS_Tarot_04_Emperor.jpg",
    detailedMeaning: "The Emperor đại diện cho quyền lực, cấu trúc và kỷ luật. Ông là biểu tượng của sự lãnh đạo mạnh mẽ, ổn định và khả năng tổ chức hiệu quả.",
    reversedMeaning: "Khi lật ngược, có thể chỉ sự độc tài, thiếu kỷ luật, lạm dụng quyền lực hoặc thiếu cấu trúc.",
    element: "Fire",
    planet: "Aries",
    numerology: "4 - Ổn định, nền tảng",
    loveAdvice: "Thể hiện sự bảo vệ và ổn định trong mối quan hệ. Đưa ra cam kết rõ ràng.",
    careerAdvice: "Thời điểm để lãnh đạo và thiết lập cấu trúc. Hãy quyết đoán trong quyết định kinh doanh.",
    healthAdvice: "Thiết lập thói quen tập luyện đều đặn. Kỷ luật bản thân trong chế độ ăn uống.",
    spiritualAdvice: "Phát triển ý chí và khả năng tự kiểm soát. Cân bằng quyền lực với trách nhiệm."
  }
];

const luckyColors = ["Đỏ", "Xanh dương", "Vàng", "Xanh lá", "Tím", "Hồng", "Cam", "Bạc", "Trắng", "Đen"];

const TarotSection: React.FC = () => {
  const [selectedCards, setSelectedCards] = useState<TarotCard[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);
  const [luckyColor, setLuckyColor] = useState<string>("");
  const [luckyNumber, setLuckyNumber] = useState<number>(0);
  const [overallReading, setOverallReading] = useState<string>("");
  const [selectedCardForModal, setSelectedCardForModal] = useState<TarotCard | null>(null);
  const [currentSpread, setCurrentSpread] = useState<SpreadType>(spreadTypes[0]);
  const [readingHistory, setReadingHistory] = useState<ReadingHistory[]>([]);
  const [selectedAspect, setSelectedAspect] = useState<'general' | 'love' | 'career' | 'health' | 'spiritual'>('general');

  // Load reading history from localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem('tarotHistory');
    if (savedHistory) {
      try {
        setReadingHistory(JSON.parse(savedHistory));
      } catch (error) {
        console.error('Error loading tarot history:', error);
      }
    }
  }, []);

  const drawCards = () => {
    setIsDrawing(true);
    setHasDrawn(false);
    
    setTimeout(() => {
      // Bốc số lá bài theo spread được chọn
      const shuffled = [...tarotDeck].sort(() => Math.random() - 0.5);
      const drawn = shuffled.slice(0, currentSpread.cardCount).map((card) => ({
        ...card,
        reversed: Math.random() > 0.7 // 30% chance bài lật ngược
      }));
      
      setSelectedCards(drawn);
      
      // Màu may mắn và số may mắn
      const randomColor = luckyColors[Math.floor(Math.random() * luckyColors.length)];
      const randomNumber = Math.floor(Math.random() * 9) + 1;
      setLuckyColor(randomColor);
      setLuckyNumber(randomNumber);
      
      // Đưa ra lời khuyên tổng thể
      generateAdvancedReading(drawn);
      
      // Lưu vào lịch sử
      const newReading: ReadingHistory = {
        date: new Date().toLocaleString('vi-VN'),
        cards: drawn,
        spread: currentSpread.name,
        overallReading: ""
      };
      
      const updatedHistory = [newReading, ...readingHistory.slice(0, 9)];
      setReadingHistory(updatedHistory);
      localStorage.setItem('tarotHistory', JSON.stringify(updatedHistory));
      
      setIsDrawing(false);
      setHasDrawn(true);
    }, 2500);
  };

  const generateAdvancedReading = (cards: TarotCard[]) => {
    const majorArcanaCount = cards.filter(card => card.suit === "Major Arcana").length;
    const reversedCount = cards.filter(card => card.reversed).length;
    const cardNames = cards.map(card => card.name);
    const cardElements = cards.map(card => card.element).filter((element): element is string => Boolean(element));
    
    let reading = "";
    
    // Phân tích theo spread type với phân tích vị trí cụ thể
    switch (currentSpread.name) {
      case "Daily Reading":
        reading += "**Dự báo ngày hôm nay:** ";
        reading += analyzeThreeCardSpread(cards, ["quá khứ", "hiện tại", "tương lai"]);
        break;
      case "Love Triangle":
        reading += "**Phân tích tình cảm:** ";
        reading += analyzeThreeCardSpread(cards, ["cảm xúc của bạn", "cảm xúc của người ấy", "tương lai mối quan hệ"]);
        break;
      case "Career Path":
        reading += "**Hướng dẫn sự nghiệp:** ";
        reading += analyzeCareerSpread(cards);
        break;
      case "Life Decision":
        reading += "**Hỗ trợ quyết định:** ";
        reading += analyzeDecisionSpread(cards);
        break;
      default:
        reading += "**Thông điệp từ vũ trụ:** ";
    }
    
    // Phân tích mối liên hệ giữa các lá bài
    reading += analyzeCardConnections(cards);
    
    // Phân tích năng lượng tổng thể
    reading += analyzeOverallEnergy(cards, majorArcanaCount, reversedCount);
    
    // Phân tích yếu tố và cân bằng
    reading += analyzeElementalBalance(cardElements);
    
    // Lời khuyên hành động cụ thể
    reading += generateActionableAdvice(cards, cardNames);
    
    // Cảnh báo và lưu ý đặc biệt
    reading += generateWarningsAndNotes(cards, reversedCount);
    
    setOverallReading(reading);
  };

  // Phân tích spread 3 lá
  const analyzeThreeCardSpread = (cards: TarotCard[], positions: string[]): string => {
    let analysis = "";
    
    // Phân tích từng vị trí
    cards.forEach((card, index) => {
      const position = positions[index];
      const energy = card.reversed ? "challenging" : "positive";
      
      analysis += `**${position.charAt(0).toUpperCase() + position.slice(1)}** được đại diện bởi **${card.name}**${card.reversed ? " (ngược)" : ""} - `;
      
      if (index === 0) { // Quá khứ/nguyên nhân
        analysis += card.reversed 
          ? `Có những vấn đề chưa được giải quyết hoặc bài học chưa được học hỏi từ ${card.keywords[0]}. ` 
          : `Nền tảng vững chắc từ ${card.keywords[0]} đang hỗ trợ bạn. `;
      } else if (index === 1) { // Hiện tại
        analysis += card.reversed 
          ? `Hiện tại bạn đang gặp khó khăn với ${card.keywords[0]}, cần điều chỉnh cách tiếp cận. ` 
          : `Bạn đang ở vị thế thuận lợi với ${card.keywords[0]}, hãy tận dụng cơ hội này. `;
      } else { // Tương lai
        analysis += card.reversed 
          ? `Cần cẩn thận tránh ${card.keywords[0]} trở thành trở ngại trong tương lai. ` 
          : `Tương lai hứa hẹn thành công thông qua ${card.keywords[0]}. `;
      }
    });
    
    return analysis;
  };

  // Phân tích spread sự nghiệp
  const analyzeCareerSpread = (cards: TarotCard[]): string => {
    let analysis = "";
    const [current, challenge, opportunity, advice] = cards;
    
    analysis += `**Tình hình hiện tại** (${current.name}): `;
    analysis += current.reversed 
      ? `Bạn đang gặp khó khăn trong công việc, đặc biệt liên quan đến ${current.keywords[0]}. `
      : `Vị thế công việc hiện tại khá ổn định với ${current.keywords[0]} là điểm mạnh. `;
    
    analysis += `**Thách thức** (${challenge.name}): `;
    analysis += challenge.reversed 
      ? `Thách thức chính là việc vượt qua ${challenge.keywords[0]} đã bị đảo ngược. `
      : `Cần đối mặt và vượt qua ${challenge.keywords[0]} để tiến bộ. `;
    
    analysis += `**Cơ hội** (${opportunity.name}): `;
    analysis += opportunity.reversed 
      ? `Cơ hội có thể bị hạn chế, cần chủ động tạo ra ${opportunity.keywords[0]}. `
      : `Cơ hội lớn đang mở ra thông qua ${opportunity.keywords[0]}. `;
    
    analysis += `**Lời khuyên** (${advice.name}): `;
    analysis += advice.careerAdvice || advice.advice;
    
    return analysis;
  };

  // Phân tích spread quyết định
  const analyzeDecisionSpread = (cards: TarotCard[]): string => {
    let analysis = "";
    const [situation, optionA, optionB, outcome, advice] = cards;
    
    analysis += `**Tình huống** được thể hiện qua ${situation.name} - ${situation.meaning}. `;
    
    analysis += `**Lựa chọn A** (${optionA.name}): `;
    analysis += optionA.reversed 
      ? `Con đường này có thể gặp nhiều khó khăn với ${optionA.keywords[0]}. `
      : `Hướng đi này mang lại ${optionA.keywords[0]} tích cực. `;
    
    analysis += `**Lựa chọn B** (${optionB.name}): `;
    analysis += optionB.reversed 
      ? `Phương án này cần thận trọng vì ${optionB.keywords[0]} có thể trở thành trở ngại. `
      : `Lựa chọn này hứa hẹn ${optionB.keywords[0]} thành công. `;
    
    analysis += `**Kết quả khả năng** (${outcome.name}): `;
    analysis += outcome.reversed 
      ? `Cần chuẩn bị cho những thử thách liên quan đến ${outcome.keywords[0]}. `
      : `Kết quả có thể đạt được ${outcome.keywords[0]} như mong đợi. `;
    
    return analysis;
  };

  // Phân tích mối liên hệ giữa các lá bài
  const analyzeCardConnections = (cards: TarotCard[]): string => {
    let connections = "\n\n**Mối liên hệ giữa các lá bài:** ";
    
    // Kiểm tra các cặp lá bài đặc biệt
    const cardNames = cards.map(card => card.name);
    
    if (cardNames.includes("The Fool") && cardNames.includes("The World")) {
      connections += "Sự kết hợp giữa khởi đầu (The Fool) và hoàn thành (The World) cho thấy một chu kỳ quan trọng. ";
    }
    
    if (cardNames.includes("The Magician") && cardNames.includes("The High Priestess")) {
      connections += "Cân bằng giữa hành động (The Magician) và trực giác (The High Priestess) là chìa khóa. ";
    }
    
    if (cardNames.includes("The Empress") && cardNames.includes("The Emperor")) {
      connections += "Sự hài hòa giữa năng lượng nữ tính và nam tính đang được thể hiện. ";
    }
    
    // Phân tích theo số lượng Major Arcana
    const majorCount = cards.filter(card => card.suit === "Major Arcana").length;
    if (majorCount >= 2) {
      connections += `Với ${majorCount} lá Major Arcana, đây là thời điểm của những biến chuyển tinh thần quan trọng. `;
    }
    
    // Phân tích keywords trùng lặp
    const allKeywords = cards.flatMap(card => card.keywords);
    const duplicateKeywords = allKeywords.filter((keyword, index) => allKeywords.indexOf(keyword) !== index);
    
    if (duplicateKeywords.length > 0) {
      const uniqueDuplicates = Array.from(new Set(duplicateKeywords));
      connections += `Chủ đề lặp lại: ${uniqueDuplicates.join(", ")} - điều này nhấn mạnh tầm quan trọng của các khía cạnh này. `;
    }
    
    return connections;
  };

  // Phân tích năng lượng tổng thể
  const analyzeOverallEnergy = (cards: TarotCard[], majorCount: number, reversedCount: number): string => {
    let energy = "\n\n**Năng lượng tổng thể:** ";
    
    const totalCards = cards.length;
    const reversedPercentage = (reversedCount / totalCards) * 100;
    
    if (reversedPercentage >= 60) {
      energy += "Năng lượng khá nặng nề, cần kiên nhẫn và suy ngẫm sâu. Đây là thời kỳ của việc học hỏi từ thử thách. ";
    } else if (reversedPercentage >= 30) {
      energy += "Năng lượng cân bằng giữa thử thách và cơ hội. Cần linh hoạt trong cách tiếp cận. ";
    } else {
      energy += "Năng lượng tích cực và thuận lợi. Thời điểm tốt để hành động và thực hiện kế hoạch. ";
    }
    
    if (majorCount >= totalCards * 0.6) {
      energy += "Mức độ tâm linh và tinh thần cao, những sự kiện này có ý nghĩa sâu sắc cho hành trình cuộc sống. ";
    }
    
    return energy;
  };

  // Phân tích cân bằng yếu tố
  const analyzeElementalBalance = (elements: string[]): string => {
    if (elements.length === 0) return "";
    
    let balance = "\n\n**Cân bằng yếu tố:** ";
    
    const elementCount = elements.reduce((acc, element) => {
      if (element) acc[element] = (acc[element] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const dominantElement = Object.keys(elementCount).reduce((a, b) => 
      elementCount[a] > elementCount[b] ? a : b
    );
    
    switch (dominantElement) {
      case "Fire":
        balance += "Yếu tố Hỏa chiếm ưu thế - thời điểm của hành động, đam mê và năng lượng mạnh mẽ. ";
        break;
      case "Water":
        balance += "Yếu tố Thủy chiếm ưu thế - tập trung vào cảm xúc, trực giác và các mối quan hệ. ";
        break;
      case "Air":
        balance += "Yếu tố Khí chiếm ưu thế - thời gian của tư duy, giao tiếp và ý tưởng mới. ";
        break;
      case "Earth":
        balance += "Yếu tố Thổ chiếm ưu thế - tập trung vào thực tế, vật chất và xây dựng nền tảng. ";
        break;
    }
    
    return balance;
  };

  // Tạo lời khuyên hành động cụ thể
  const generateActionableAdvice = (cards: TarotCard[], cardNames: string[]): string => {
    let advice = "\n\n**Lời khuyên hành động:** ";
    
    // Dựa vào lá bài đầu tiên (quan trọng nhất)
    const primaryCard = cards[0];
    
    if (primaryCard.name === "The Fool") {
      advice += "Hãy dũng cảm bước ra khỏi vùng an toàn và thử nghiệm điều gì đó hoàn toàn mới. ";
    } else if (primaryCard.name === "The Magician") {
      advice += "Sử dụng tất cả kỹ năng và tài nguyên có sẵn để biến ý tưởng thành hiện thực. ";
    } else if (primaryCard.name === "The High Priestess") {
      advice += "Dành thời gian thiền định và lắng nghe trực giác thay vì dựa hoàn toàn vào logic. ";
    } else if (primaryCard.name === "The Empress") {
      advice += "Nuôi dưỡng các dự án và mối quan hệ với tình yêu thương và sự kiên nhẫn. ";
    } else if (primaryCard.name === "The Emperor") {
      advice += "Thiết lập cấu trúc rõ ràng và thể hiện sự lãnh đạo trong tình huống hiện tại. ";
    }
    
    // Thêm lời khuyên dựa vào tổng thể
    const hasReversed = cards.some(card => card.reversed);
    if (hasReversed) {
      advice += "Với những lá bài ngược, hãy dành thời gian suy ngẫm và không vội vàng đưa ra quyết định quan trọng. ";
    }
    
    return advice;
  };

  // Tạo cảnh báo và lưu ý
  const generateWarningsAndNotes = (cards: TarotCard[], reversedCount: number): string => {
    let warnings = "\n\n**Lưu ý quan trọng:** ";
    
    if (reversedCount >= 2) {
      warnings += "Nhiều lá bài ngược cho thấy cần thận trọng trong các quyết định. Hãy tìm hiểu kỹ trước khi hành động. ";
    }
    
    // Kiểm tra các lá bài cảnh báo cụ thể
    const warningCards = ["The Tower", "Death", "The Devil"];
    const hasWarningCard = cards.some(card => warningCards.includes(card.name));
    
    if (hasWarningCard) {
      warnings += "Có lá bài đại diện cho biến chuyển lớn - hãy chuẩn bị tinh thần cho những thay đổi quan trọng. ";
    }
    
    warnings += "\n\n**Kết luận:** Hãy nhớ rằng tarot chỉ là công cụ hướng dẫn. Quyết định cuối cùng vẫn thuộc về bạn và khả năng tạo ra tương lai của chính mình.";
    
    return warnings;
  };

  const getCardAdviceByAspect = (card: TarotCard, aspect: string): string => {
    switch (aspect) {
      case 'love':
        return card.loveAdvice || card.advice;
      case 'career':
        return card.careerAdvice || card.advice;
      case 'health':
        return card.healthAdvice || card.advice;
      case 'spiritual':
        return card.spiritualAdvice || card.advice;
      default:
        return card.advice;
    }
  };

  const getAspectIcon = (aspect: string) => {
    switch (aspect) {
      case 'love': return <Heart className="w-4 h-4" />;
      case 'career': return <TrendingUp className="w-4 h-4" />;
      case 'health': return <Shield className="w-4 h-4" />;
      case 'spiritual': return <Sparkles className="w-4 h-4" />;
      default: return <Star className="w-4 h-4" />;
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Background stars */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
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
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-white mb-4 flex items-center justify-center gap-2">
            <Sparkles className="w-8 h-8 text-yellow-400" />
            Bói Bài Tarot Nâng Cao
            <Sparkles className="w-8 h-8 text-yellow-400" />
          </h2>
          <p className="text-xl text-purple-200 mb-6">
            Khám phá vận mệnh với hệ thống tarot chi tiết và chính xác
          </p>

          {/* Spread Selection */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-white mb-3">Chọn kiểu bói:</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto">
              {spreadTypes.map((spread) => (
                <Button
                  key={spread.name}
                  onClick={() => setCurrentSpread(spread)}
                  variant={currentSpread.name === spread.name ? "default" : "outline"}
                  className={`p-3 h-auto text-sm ${
                    currentSpread.name === spread.name 
                      ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white border-none" 
                      : "bg-white/10 text-white border-white/30 hover:bg-white/20"
                  }`}
                >
                  <div className="text-center">
                    <div className="font-semibold">{spread.name}</div>
                    <div className="text-xs opacity-80">{spread.cardCount} lá bài</div>
                  </div>
                </Button>
              ))}
            </div>
            <p className="text-purple-200 text-sm mt-2">{currentSpread.description}</p>
          </div>
          
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
                Bốc bài {currentSpread.name}
              </>
            )}
          </Button>
        </div>

        {/* Results */}
        {hasDrawn && (
          <div className="space-y-8">
            {/* Cards Display */}
            <div className={`grid gap-6 ${
              currentSpread.cardCount <= 3 ? 'grid-cols-1 lg:grid-cols-3' :
              currentSpread.cardCount === 4 ? 'grid-cols-2 lg:grid-cols-4' :
              'grid-cols-2 lg:grid-cols-3 xl:grid-cols-5'
            }`}>
              {selectedCards.map((card, index) => (
                <Card 
                  key={`${card.id}-${index}`} 
                  className="bg-gradient-to-br from-purple-800/50 to-blue-800/50 border-purple-400/30 backdrop-blur-sm hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 transform hover:scale-105"
                >
                  <CardHeader className="pb-2">
                    <div className="text-center">
                      <Badge variant="outline" className="mb-2 text-yellow-400 border-yellow-400">
                        {currentSpread.positions[index]}
                      </Badge>
                      <CardTitle className={`text-lg ${card.reversed ? 'text-red-400' : 'text-white'}`}>
                        {card.reversed && "↻ "}{card.name}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className="relative mb-3">
                      <img 
                        src={card.imageUrl} 
                        alt={card.name}
                        className={`w-24 h-36 mx-auto rounded-lg object-cover shadow-lg ${
                          card.reversed ? 'transform rotate-180' : ''
                        }`}
                      />
                      {card.reversed && (
                        <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-1 py-0.5 rounded">
                          Ngược
                        </div>
                      )}
                    </div>
                    <p className="text-purple-200 text-sm mb-3">
                      {card.reversed ? card.reversedMeaning.substring(0, 100) + "..." : card.meaning}
                    </p>
                    <div className="flex flex-wrap justify-center gap-1 mb-3">
                      {card.keywords.slice(0, 3).map((keyword, i) => (
                        <Badge key={i} variant="secondary" className="text-xs bg-purple-600/30 text-purple-200">
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="bg-white/10 text-white border-white/30 hover:bg-white/20"
                          onClick={() => setSelectedCardForModal(card)}
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          Chi tiết
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl bg-gradient-to-br from-purple-900 to-blue-900 text-white border-purple-400/30">
                        <DialogHeader>
                          <DialogTitle className="text-2xl text-center">
                            {card.reversed && "↻ "}{card.name}
                          </DialogTitle>
                        </DialogHeader>
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="text-center">
                            <img 
                              src={card.imageUrl} 
                              alt={card.name}
                              className={`w-32 h-48 mx-auto rounded-lg object-cover shadow-lg mb-4 ${
                                card.reversed ? 'transform rotate-180' : ''
                              }`}
                            />
                            <div className="space-y-2 text-sm">
                              <div><strong>Yếu tố:</strong> {card.element}</div>
                              <div><strong>Hành tinh:</strong> {card.planet}</div>
                              <div><strong>Số học:</strong> {card.numerology}</div>
                            </div>
                          </div>
                          <div className="space-y-4">
                            <div>
                              <h4 className="font-semibold mb-2">Ý nghĩa chi tiết:</h4>
                              <p className="text-sm text-purple-200">
                                {card.reversed ? card.reversedMeaning : card.detailedMeaning}
                              </p>
                            </div>
                            
                            <Tabs defaultValue="general" className="w-full">
                              <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 bg-purple-800/50">
                                <TabsTrigger value="general" className="text-xs">Chung</TabsTrigger>
                                <TabsTrigger value="love" className="text-xs">Tình yêu</TabsTrigger>
                                <TabsTrigger value="career" className="text-xs">Sự nghiệp</TabsTrigger>
                                <TabsTrigger value="health" className="text-xs">Sức khỏe</TabsTrigger>
                              </TabsList>
                              <TabsContent value="general" className="text-sm">
                                {card.advice}
                              </TabsContent>
                              <TabsContent value="love" className="text-sm">
                                {card.loveAdvice || "Không có lời khuyên cụ thể cho tình yêu."}
                              </TabsContent>
                              <TabsContent value="career" className="text-sm">
                                {card.careerAdvice || "Không có lời khuyên cụ thể cho sự nghiệp."}
                              </TabsContent>
                              <TabsContent value="health" className="text-sm">
                                {card.healthAdvice || "Không có lời khuyên cụ thể cho sức khỏe."}
                              </TabsContent>
                            </Tabs>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Overall Reading */}
            <Card className="bg-gradient-to-br from-indigo-800/50 to-purple-800/50 border-indigo-400/30 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-center text-white flex items-center justify-center gap-2">
                  <Lightbulb className="w-6 h-6 text-yellow-400" />
                  Tổng quan và Lời khuyên
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-4">
                  <p className="text-purple-200 leading-relaxed">{overallReading}</p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                    <div className="text-center p-3 bg-white/10 rounded-lg">
                      <div className="text-yellow-400 font-semibold">Màu may mắn</div>
                      <div className="text-white text-lg">{luckyColor}</div>
                    </div>
                    <div className="text-center p-3 bg-white/10 rounded-lg">
                      <div className="text-yellow-400 font-semibold">Số may mắn</div>
                      <div className="text-white text-lg">{luckyNumber}</div>
                    </div>
                    <div className="text-center p-3 bg-white/10 rounded-lg">
                      <div className="text-yellow-400 font-semibold">Kiểu bói</div>
                      <div className="text-white text-sm">{currentSpread.name}</div>
                    </div>
                    <div className="text-center p-3 bg-white/10 rounded-lg">
                      <div className="text-yellow-400 font-semibold">Thời gian</div>
                      <div className="text-white text-sm">{new Date().toLocaleDateString('vi-VN')}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Reading History */}
            {readingHistory.length > 0 && (
              <Card className="bg-gradient-to-br from-blue-800/50 to-indigo-800/50 border-blue-400/30 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-center text-white flex items-center justify-center gap-2">
                    <Calendar className="w-6 h-6 text-blue-400" />
                    Lịch sử bói bài ({readingHistory.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-h-60 overflow-y-auto">
                    {readingHistory.slice(0, 5).map((reading, index) => (
                      <div key={index} className="p-3 bg-white/10 rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-blue-300 font-medium">{reading.spread}</span>
                          <span className="text-blue-200 text-sm">{reading.date}</span>
                        </div>
                        <div className="flex space-x-2">
                          {reading.cards.slice(0, 3).map((card, cardIndex) => (
                            <Badge key={cardIndex} variant="outline" className="text-xs bg-blue-600/30 text-blue-200">
                              {card.reversed && "↻"}{card.name}
                            </Badge>
                          ))}
                          {reading.cards.length > 3 && (
                            <Badge variant="outline" className="text-xs bg-blue-600/30 text-blue-200">
                              +{reading.cards.length - 3}
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default TarotSection;
