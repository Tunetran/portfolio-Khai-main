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
  // MAJOR ARCANA (22 lá)
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
  },
  { 
    id: 5, 
    name: "The Hierophant", 
    meaning: "Truyền thống, giáo dục, tâm linh", 
    suit: "Major Arcana", 
    keywords: ["truyền thống", "giáo dục", "tâm linh", "conformity", "institution"], 
    advice: "Học hỏi từ truyền thống và tìm kiếm guidance từ mentor",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/8/8d/RWS_Tarot_05_Hierophant.jpg",
    detailedMeaning: "The Hierophant đại diện cho wisdom truyền thống và spiritual guidance.",
    reversedMeaning: "Rebellion, unconventional path hoặc questioning authority.",
    element: "Earth",
    planet: "Taurus",
    numerology: "5 - Freedom, change"
  },
  { 
    id: 6, 
    name: "The Lovers", 
    meaning: "Tình yêu, quan hệ, lựa chọn", 
    suit: "Major Arcana", 
    keywords: ["tình yêu", "quan hệ", "lựa chọn", "harmony", "attraction"], 
    advice: "Đưa ra lựa chọn dựa trên values và heart của bạn",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/3/3a/TheLovers.jpg",
    detailedMeaning: "The Lovers về deep connections và important choices trong relationships.",
    reversedMeaning: "Relationship problems, poor choices hoặc lack of harmony.",
    element: "Air",
    planet: "Gemini",
    numerology: "6 - Love, harmony"
  },
  { 
    id: 7, 
    name: "The Chariot", 
    meaning: "Quyết tâm, control, victory", 
    suit: "Major Arcana", 
    keywords: ["quyết tâm", "control", "victory", "willpower", "determination"], 
    advice: "Focus willpower và determination để overcome obstacles",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/9/9b/RWS_Tarot_07_Chariot.jpg",
    detailedMeaning: "The Chariot về self-control và determination để achieve victory.",
    reversedMeaning: "Lack of control, aggression hoặc being scattered.",
    element: "Water",
    planet: "Cancer",
    numerology: "7 - Spirituality, inner wisdom"
  },
  { 
    id: 8, 
    name: "Strength", 
    meaning: "Inner strength, courage, patience", 
    suit: "Major Arcana", 
    keywords: ["strength", "courage", "patience", "compassion", "self-control"], 
    advice: "Sử dụng inner strength và patience để overcome challenges",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/f/f5/RWS_Tarot_08_Strength.jpg",
    detailedMeaning: "Strength về inner power và gentle control through compassion.",
    reversedMeaning: "Weakness, lack of confidence hoặc abuse of power.",
    element: "Fire",
    planet: "Leo",
    numerology: "8 - Material success, power"
  },
  { 
    id: 9, 
    name: "The Hermit", 
    meaning: "Inner guidance, solitude, seeking", 
    suit: "Major Arcana", 
    keywords: ["guidance", "solitude", "seeking", "wisdom", "introspection"], 
    advice: "Turn inward để tìm wisdom và guidance từ within",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/4/4d/RWS_Tarot_09_Hermit.jpg",
    detailedMeaning: "The Hermit về spiritual seeking và finding answers within.",
    reversedMeaning: "Isolation, stubbornness hoặc avoiding inner work.",
    element: "Earth",
    planet: "Virgo",
    numerology: "9 - Completion, wisdom"
  },
  { 
    id: 10, 
    name: "Wheel of Fortune", 
    meaning: "Luck, cycles, change", 
    suit: "Major Arcana", 
    keywords: ["luck", "cycles", "change", "fate", "turning point"], 
    advice: "Accept changes và trust trong natural cycles of life",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/3/3c/RWS_Tarot_10_Wheel_of_Fortune.jpg",
    detailedMeaning: "Wheel of Fortune về changes và cycles that are beyond control.",
    reversedMeaning: "Bad luck, lack of control hoặc resistance to change.",
    element: "Fire",
    planet: "Jupiter",
    numerology: "10 - Completion, new cycle"
  },
  { 
    id: 11, 
    name: "Justice", 
    meaning: "Fairness, truth, law", 
    suit: "Major Arcana", 
    keywords: ["fairness", "truth", "law", "balance", "accountability"], 
    advice: "Seek truth và fairness trong all dealings",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/e/e0/RWS_Tarot_11_Justice.jpg",
    detailedMeaning: "Justice về fairness, truth và karmic balance.",
    reversedMeaning: "Unfairness, lack of accountability hoặc dishonesty.",
    element: "Air",
    planet: "Libra",
    numerology: "11 - Master number, intuition"
  },
  { 
    id: 12, 
    name: "The Hanged Man", 
    meaning: "Surrender, sacrifice, new perspective", 
    suit: "Major Arcana", 
    keywords: ["surrender", "sacrifice", "perspective", "waiting", "suspension"], 
    advice: "Sometimes surrender và waiting brings new insights",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/2/2b/RWS_Tarot_12_Hanged_Man.jpg",
    detailedMeaning: "The Hanged Man về voluntary sacrifice để gain new perspective.",
    reversedMeaning: "Unnecessary sacrifice, stalling hoặc avoiding necessary change.",
    element: "Water",
    planet: "Neptune",
    numerology: "12 - Spiritual completion"
  },
  { 
    id: 13, 
    name: "Death", 
    meaning: "Transformation, endings, new beginnings", 
    suit: "Major Arcana", 
    keywords: ["transformation", "endings", "beginnings", "change", "rebirth"], 
    advice: "Embrace necessary endings để make room for new beginnings",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/d/d7/RWS_Tarot_13_Death.jpg",
    detailedMeaning: "Death về major transformation và letting go of the old.",
    reversedMeaning: "Resistance to change, stagnation hoặc fear of transformation.",
    element: "Water",
    planet: "Scorpio",
    numerology: "13 - Transformation, death and rebirth"
  },
  { 
    id: 14, 
    name: "Temperance", 
    meaning: "Balance, moderation, patience", 
    suit: "Major Arcana", 
    keywords: ["balance", "moderation", "patience", "healing", "harmony"], 
    advice: "Find balance và moderation trong all aspects of life",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/f/f8/RWS_Tarot_14_Temperance.jpg",
    detailedMeaning: "Temperance về finding perfect balance và healing through moderation.",
    reversedMeaning: "Imbalance, excess hoặc lack of patience.",
    element: "Fire",
    planet: "Sagittarius",
    numerology: "14 - Temperance, balance"
  },
  { 
    id: 15, 
    name: "The Devil", 
    meaning: "Bondage, addiction, materialism", 
    suit: "Major Arcana", 
    keywords: ["bondage", "addiction", "materialism", "temptation", "restriction"], 
    advice: "Recognize self-imposed limitations và break free from negative patterns",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/5/55/RWS_Tarot_15_Devil.jpg",
    detailedMeaning: "The Devil về self-imposed bondage và material temptations.",
    reversedMeaning: "Breaking free, overcoming addiction hoặc spiritual awakening.",
    element: "Earth",
    planet: "Capricorn",
    numerology: "15 - Material temptation"
  },
  { 
    id: 16, 
    name: "The Tower", 
    meaning: "Sudden change, upheaval, revelation", 
    suit: "Major Arcana", 
    keywords: ["change", "upheaval", "revelation", "destruction", "awakening"], 
    advice: "Accept sudden changes như opportunities for growth",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/5/53/RWS_Tarot_16_Tower.jpg",
    detailedMeaning: "The Tower về sudden revelation và necessary destruction of old structures.",
    reversedMeaning: "Avoiding change, internal upheaval hoặc gradual change.",
    element: "Fire",
    planet: "Mars",
    numerology: "16 - Sudden change"
  },
  { 
    id: 17, 
    name: "The Star", 
    meaning: "Hope, inspiration, spirituality", 
    suit: "Major Arcana", 
    keywords: ["hope", "inspiration", "spirituality", "guidance", "renewal"], 
    advice: "Trust trong divine guidance và maintain hope for the future",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/d/db/RWS_Tarot_17_Star.jpg",
    detailedMeaning: "The Star về hope, inspiration và spiritual guidance after difficult times.",
    reversedMeaning: "Despair, lack of faith hoặc disconnection from spirituality.",
    element: "Air",
    planet: "Aquarius",
    numerology: "17 - Hope, spirituality"
  },
  { 
    id: 18, 
    name: "The Moon", 
    meaning: "Illusion, fear, subconscious", 
    suit: "Major Arcana", 
    keywords: ["illusion", "fear", "subconscious", "intuition", "mystery"], 
    advice: "Trust intuition để navigate through uncertainty và illusion",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/7/7f/RWS_Tarot_18_Moon.jpg",
    detailedMeaning: "The Moon về illusions, fears và messages from subconscious.",
    reversedMeaning: "Clarity, overcoming fear hoặc releasing illusions.",
    element: "Water",
    planet: "Pisces",
    numerology: "18 - Illusion, psychic abilities"
  },
  { 
    id: 19, 
    name: "The Sun", 
    meaning: "Joy, success, vitality", 
    suit: "Major Arcana", 
    keywords: ["joy", "success", "vitality", "optimism", "achievement"], 
    advice: "Embrace joy và optimism - success is within reach",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/1/17/RWS_Tarot_19_Sun.jpg",
    detailedMeaning: "The Sun về pure joy, success và positive energy in all areas.",
    reversedMeaning: "Temporary setbacks, lack of enthusiasm hoặc delayed success.",
    element: "Fire",
    planet: "Sun",
    numerology: "19 - Joy, success"
  },
  { 
    id: 20, 
    name: "Judgement", 
    meaning: "Rebirth, inner calling, absolution", 
    suit: "Major Arcana", 
    keywords: ["rebirth", "calling", "absolution", "awakening", "forgiveness"], 
    advice: "Listen to your inner calling và embrace spiritual rebirth",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/d/dd/RWS_Tarot_20_Judgement.jpg",
    detailedMeaning: "Judgement về spiritual awakening và answering higher calling.",
    reversedMeaning: "Self-doubt, harsh judgement hoặc ignoring inner calling.",
    element: "Fire",
    planet: "Pluto",
    numerology: "20 - Awakening, judgement"
  },
  { 
    id: 21, 
    name: "The World", 
    meaning: "Completion, accomplishment, travel", 
    suit: "Major Arcana", 
    keywords: ["completion", "accomplishment", "travel", "success", "fulfillment"], 
    advice: "Celebrate accomplishments và prepare for new cycles",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/f/ff/RWS_Tarot_21_World.jpg",
    detailedMeaning: "The World về ultimate completion và achievement of major life goals.",
    reversedMeaning: "Incomplete projects, lack of closure hoặc stagnation.",
    element: "Earth",
    planet: "Saturn",
    numerology: "21 - Completion, world consciousness"
  },

  // MINOR ARCANA - WANDS (14 lá)
  { 
    id: 22, 
    name: "Ace of Wands", 
    meaning: "Khởi đầu sáng tạo, cảm hứng mới", 
    suit: "Wands", 
    keywords: ["cảm hứng", "khởi đầu", "tiềm năng", "sáng tạo", "năng lượng"], 
    advice: "Nắm bắt cơ hội mới với nhiệt huyết và quyết tâm",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/1/11/Wands01.jpg",
    detailedMeaning: "Ace of Wands mang đến năng lượng mới và cảm hứng sáng tạo. Đây là lúc để bắt đầu dự án mới hoặc theo đuổi đam mê.",
    reversedMeaning: "Thiếu động lực, trì hoãn hoặc lãng phí cơ hội. Cần tái tạo năng lượng và tìm lại cảm hứng.",
    element: "Fire"
  },
  { 
    id: 23, 
    name: "Two of Wands", 
    meaning: "Lập kế hoạch, tầm nhìn xa", 
    suit: "Wands", 
    keywords: ["kế hoạch", "tầm nhìn", "quyết định", "tương lai", "khám phá"], 
    advice: "Đã đến lúc lập kế hoạch cho tương lai và mở rộng tầm nhìn",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/0/0f/Wands02.jpg",
    detailedMeaning: "Two of Wands về việc nhìn xa trông rộng và lập kế hoạch cho tương lai. Bạn đang ở ngã ba đường và cần chọn hướng đi.",
    reversedMeaning: "Thiếu kế hoạch, sợ thay đổi hoặc bị giới hạn bởi suy nghĩ nhỏ nhen.",
    element: "Fire"
  },
  { 
    id: 24, 
    name: "Three of Wands", 
    meaning: "Mở rộng, tiến bộ, hợp tác", 
    suit: "Wands", 
    keywords: ["mở rộng", "hợp tác", "tiến bộ", "thành công", "tầm nhìn"], 
    advice: "Hãy mở rộng tầm nhìn và tìm kiếm cơ hội hợp tác",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/f/ff/Wands03.jpg",
    detailedMeaning: "Three of Wands chỉ sự mở rộng và tiến bộ. Những nỗ lực của bạn đang bắt đầu có kết quả.",
    reversedMeaning: "Thiếu kế hoạch dài hạn, hợp tác không hiệu quả hoặc cơ hội bị bỏ lỡ.",
    element: "Fire"
  },
  { 
    id: 25, 
    name: "Four of Wands", 
    meaning: "Ổn định, kỷ niệm, thành tựu", 
    suit: "Wands", 
    keywords: ["ổn định", "kỷ niệm", "thành tựu", "hòa hợp", "cộng đồng"], 
    advice: "Đã đến lúc kỷ niệm thành tựu và tận hưởng sự ổn định",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a4/Wands04.jpg",
    detailedMeaning: "Four of Wands về sự ổn định và thành tựu. Đây là thời điểm để kỷ niệm và tận hưởng thành quả.",
    reversedMeaning: "Thiếu ổn định, xung đột trong gia đình hoặc không được công nhận.",
    element: "Fire"
  },
  { 
    id: 26, 
    name: "Five of Wands", 
    meaning: "Cạnh tranh, xung đột, thách thức", 
    suit: "Wands", 
    keywords: ["cạnh tranh", "xung đột", "thách thức", "bất đồng", "cạnh tranh"], 
    advice: "Đối mặt với thách thức một cách tích cực và học hỏi từ cạnh tranh",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/9/9d/Wands05.jpg",
    detailedMeaning: "Five of Wands chỉ cạnh tranh và xung đột. Đây là cơ hội để thử thách bản thân và phát triển.",
    reversedMeaning: "Tránh xung đột, cạnh tranh nội bộ hoặc thiếu động lực cạnh tranh.",
    element: "Fire"
  },
  { 
    id: 27, 
    name: "Six of Wands", 
    meaning: "Chiến thắng, công nhận, thành công", 
    suit: "Wands", 
    keywords: ["chiến thắng", "thành công", "công nhận", "danh tiếng", "lãnh đạo"], 
    advice: "Tận hưởng thành công nhưng hãy khiêm tốn và tiếp tục phát triển",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/5/5c/Wands06.jpg",
    detailedMeaning: "Six of Wands về chiến thắng và được công nhận. Những nỗ lực của bạn đã được đền đáp xứng đáng.",
    reversedMeaning: "Thất bại, mất danh tiếng hoặc thành công không được công nhận.",
    element: "Fire"
  },
  { 
    id: 28, 
    name: "Seven of Wands", 
    meaning: "Bảo vệ, kiên trì, thách thức", 
    suit: "Wands", 
    keywords: ["bảo vệ", "kiên trì", "thách thức", "quyết tâm", "đối đầu"], 
    advice: "Đứng vững lập trường và bảo vệ những gì bạn tin tưởng",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/e/e4/Wands07.jpg",
    detailedMeaning: "Seven of Wands về việc bảo vệ vị thế và đối mặt với thách thức. Bạn cần kiên trì và quyết tâm.",
    reversedMeaning: "Đầu hàng, mất vị thế hoặc thiếu quyết tâm để bảo vệ.",
    element: "Fire"
  },
  { 
    id: 29, 
    name: "Eight of Wands", 
    meaning: "Tốc độ, hành động nhanh, tiến bộ", 
    suit: "Wands", 
    keywords: ["tốc độ", "hành động", "tiến bộ", "giao tiếp", "động lực"], 
    advice: "Hành động nhanh chóng và nắm bắt momentum hiện tại",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/6/6b/Wands08.jpg",
    detailedMeaning: "Eight of Wands về tốc độ và tiến bộ nhanh chóng. Mọi thứ đang diễn ra rất nhanh.",
    reversedMeaning: "Chậm trễ, cản trở hoặc thiếu tiến bộ. Cần kiên nhẫn hơn.",
    element: "Fire"
  },
  { 
    id: 30, 
    name: "Nine of Wands", 
    meaning: "Kiên trì, bảo vệ, gần đích", 
    suit: "Wands", 
    keywords: ["kiên trì", "bảo vệ", "gần đích", "mệt mỏi", "quyết tâm"], 
    advice: "Dù mệt mỏi nhưng hãy kiên trì, bạn sắp đến đích rồi",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/4/4d/Wands09.jpg",
    detailedMeaning: "Nine of Wands về sự kiên trì khi gần đạt mục tiêu. Dù mệt mỏi nhưng đừng bỏ cuộc.",
    reversedMeaning: "Kiệt sức, bỏ cuộc hoặc thiếu ý chí để tiếp tục.",
    element: "Fire"
  },
  { 
    id: 31, 
    name: "Ten of Wands", 
    meaning: "Gánh nặng, trách nhiệm, hoàn thành", 
    suit: "Wands", 
    keywords: ["gánh nặng", "trách nhiệm", "hoàn thành", "áp lực", "mục tiêu"], 
    advice: "Chịu đựng gánh nặng hiện tại, thành công đang ở phía trước",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/0/0b/Wands10.jpg",
    detailedMeaning: "Ten of Wands về gánh nặng trách nhiệm khi gần hoàn thành mục tiêu. Cần sự kiên trì cuối cùng.",
    reversedMeaning: "Giảm bớt gánh nặng, ủy thác hoặc tìm cách làm việc hiệu quả hơn.",
    element: "Fire"
  },
  { 
    id: 32, 
    name: "Page of Wands", 
    meaning: "Tin tức tốt, cơ hội mới, nhiệt huyết", 
    suit: "Wands", 
    keywords: ["tin tức", "cơ hội", "nhiệt huyết", "học hỏi", "khám phá"], 
    advice: "Mở lòng đón nhận cơ hội mới và tin tức tích cực",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/6/6a/Wands11.jpg",
    detailedMeaning: "Page of Wands mang tin tức tốt và cơ hội mới. Đây là thời điểm để học hỏi và khám phá.",
    reversedMeaning: "Tin tức xấu, cơ hội bị lỡ hoặc thiếu nhiệt huyết học hỏi.",
    element: "Fire"
  },
  { 
    id: 33, 
    name: "Knight of Wands", 
    meaning: "Hành động, phiêu lưu, bốc đồng", 
    suit: "Wands", 
    keywords: ["hành động", "phiêu lưu", "bốc đồng", "dũng cảm", "năng động"], 
    advice: "Hành động với nhiệt huyết nhưng cần cân nhắc kỹ lưỡng",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/1/16/Wands12.jpg",
    detailedMeaning: "Knight of Wands về hành động quyết liệt và tinh thần phiêu lưu. Cần cân bằng nhiệt huyết với thận trọng.",
    reversedMeaning: "Bốc đồng, thiếu kiên nhẫn hoặc hành động mà không suy nghĩ.",
    element: "Fire"
  },
  { 
    id: 34, 
    name: "Queen of Wands", 
    meaning: "Tự tin, ấm áp, lãnh đạo", 
    suit: "Wands", 
    keywords: ["tự tin", "ấm áp", "lãnh đạo", "sáng tạo", "độc lập"], 
    advice: "Thể hiện sự tự tin và lãnh đạo với lòng ấm áp",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/0/0d/Wands13.jpg",
    detailedMeaning: "Queen of Wands đại diện cho sự tự tin, ấm áp và khả năng lãnh đạo tự nhiên. Bạn có sức mạnh nội tại mạnh mẽ.",
    reversedMeaning: "Thiếu tự tin, ghen tuông hoặc sử dụng quyền lực một cách tiêu cực.",
    element: "Fire"
  },
  { 
    id: 35, 
    name: "King of Wands", 
    meaning: "Lãnh đạo, tầm nhìn, thành công", 
    suit: "Wands", 
    keywords: ["lãnh đạo", "tầm nhìn", "thành công", "quyền lực", "trách nhiệm"], 
    advice: "Thể hiện khả năng lãnh đạo và tầm nhìn xa rộng",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/c/ce/Wands14.jpg",
    detailedMeaning: "King of Wands là nhà lãnh đạo tự nhiên với tầm nhìn xa và khả năng truyền cảm hứng cho người khác.",
    reversedMeaning: "Lạm dụng quyền lực, độc tài hoặc thiếu tầm nhìn lãnh đạo.",
    element: "Fire"
  },

  // MINOR ARCANA - CUPS (14 lá)
  { 
    id: 36, 
    name: "Ace of Cups", 
    meaning: "Tình yêu mới, cảm xúc, tâm linh", 
    suit: "Cups", 
    keywords: ["tình yêu", "cảm xúc", "tâm linh", "trực giác", "khởi đầu"], 
    advice: "Mở lòng đón nhận tình yêu và cảm xúc tích cực",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/3/36/Cups01.jpg",
    detailedMeaning: "Ace of Cups mang đến tình yêu mới và cảm xúc tích cực. Đây là lúc để mở lòng và kết nối với người khác.",
    reversedMeaning: "Cảm xúc bị chặn, tình yêu không được đáp lại hoặc thiếu kết nối tâm linh.",
    element: "Water"
  },
  { 
    id: 37, 
    name: "Two of Cups", 
    meaning: "Mối quan hệ, hợp tác, tình yêu", 
    suit: "Cups", 
    keywords: ["quan hệ", "hợp tác", "tình yêu", "cân bằng", "kết nối"], 
    advice: "Đầu tư vào mối quan hệ và tìm kiếm sự cân bằng",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/e/e1/Cups02.jpg",
    detailedMeaning: "Two of Cups về mối quan hệ hài hòa và sự kết nối sâu sắc giữa hai người.",
    reversedMeaning: "Mối quan hệ mất cân bằng, xung đột hoặc thiếu giao tiếp.",
    element: "Water"
  },
  { 
    id: 38, 
    name: "Three of Cups", 
    meaning: "Kỷ niệm, bạn bè, cộng đồng", 
    suit: "Cups", 
    keywords: ["kỷ niệm", "bạn bè", "cộng đồng", "vui vẻ", "thành công"], 
    advice: "Tận hưởng thời gian với bạn bè và kỷ niệm thành tựu",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/7/7a/Cups03.jpg",
    detailedMeaning: "Three of Cups về niềm vui, kỷ niệm và tình bạn. Đây là thời gian để chia sẻ hạnh phúc.",
    reversedMeaning: "Cô đơn, xung đột trong nhóm bạn hoặc thiếu hỗ trợ xã hội.",
    element: "Water"
  },
  { 
    id: 39, 
    name: "Four of Cups", 
    meaning: "Chán nản, thờ ơ, cơ hội bỏ lỡ", 
    suit: "Cups", 
    keywords: ["chán nản", "thờ ơ", "cơ hội", "suy ngẫm", "không hài lòng"], 
    advice: "Nhìn ra những cơ hội xung quanh và thoát khỏi thái độ thờ ơ",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/3/35/Cups04.jpg",
    detailedMeaning: "Four of Cups về sự chán nản và bỏ lỡ cơ hội. Cần mở mắt nhìn nhận những điều tốt đẹp xung quanh.",
    reversedMeaning: "Thoát khỏi trạng thái chán nản, nhận ra cơ hội mới hoặc thay đổi quan điểm.",
    element: "Water"
  },
  { 
    id: 40, 
    name: "Five of Cups", 
    meaning: "Mất mát, buồn bã, thất vọng", 
    suit: "Cups", 
    keywords: ["mất mát", "buồn bã", "thất vọng", "đau khổ", "hối tiếc"], 
    advice: "Chấp nhận mất mát và tìm kiếm hy vọng từ những gì còn lại",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/d/d7/Cups05.jpg",
    detailedMeaning: "Five of Cups về mất mát và đau khổ. Dù buồn bã, vẫn còn hy vọng và cơ hội phục hồi.",
    reversedMeaning: "Phục hồi sau mất mát, tha thứ hoặc tìm thấy closure.",
    element: "Water"
  },
  { 
    id: 41, 
    name: "Six of Cups", 
    meaning: "Kỷ niệm, quá khứ, ngây thơ", 
    suit: "Cups", 
    keywords: ["kỷ niệm", "quá khứ", "ngây thơ", "tuổi thơ", "hoài niệm"], 
    advice: "Học hỏi từ quá khứ nhưng sống trong hiện tại",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/1/17/Cups06.jpg",
    detailedMeaning: "Six of Cups về kỷ niệm và sự hoài niệm. Quá khứ mang lại bài học và niềm vui.",
    reversedMeaning: "Sống quá nhiều trong quá khứ, thiếu tiến bộ hoặc bỏ qua hiện tại.",
    element: "Water"
  },
  { 
    id: 42, 
    name: "Seven of Cups", 
    meaning: "Ảo tưởng, lựa chọn, mơ mộng", 
    suit: "Cups", 
    keywords: ["ảo tưởng", "lựa chọn", "mơ mộng", "nhầm lẫn", "ước muốn"], 
    advice: "Tập trung vào thực tế và đưa ra lựa chọn sáng suốt",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/a/ae/Cups07.jpg",
    detailedMeaning: "Seven of Cups về nhiều lựa chọn và ảo tưởng. Cần phân biệt giữa mơ mộng và thực tế.",
    reversedMeaning: "Rõ ràng về mục tiêu, đưa ra quyết định hoặc thoát khỏi ảo tưởng.",
    element: "Water"
  },
  { 
    id: 43, 
    name: "Eight of Cups", 
    meaning: "Rời bỏ, tìm kiếm, hành trình", 
    suit: "Cups", 
    keywords: ["rời bỏ", "tìm kiếm", "hành trình", "thay đổi", "khám phá"], 
    advice: "Dũng cảm rời bỏ những gì không còn phù hợp để tìm kiếm điều mới",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/6/60/Cups08.jpg",
    detailedMeaning: "Eight of Cups về việc rời bỏ để tìm kiếm điều có ý nghĩa hơn. Đây là hành trình tâm linh.",
    reversedMeaning: "Sợ thay đổi, bám víu vào quá khứ hoặc tránh đối mặt với vấn đề.",
    element: "Water"
  },
  { 
    id: 44, 
    name: "Nine of Cups", 
    meaning: "Hài lòng, thỏa mãn, ước muốn", 
    suit: "Cups", 
    keywords: ["hài lòng", "thỏa mãn", "ước muốn", "hạnh phúc", "thành công"], 
    advice: "Tận hưởng thành công và cảm ơn những gì bạn có",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/2/24/Cups09.jpg",
    detailedMeaning: "Nine of Cups về sự thỏa mãn và hạnh phúc. Ước muốn của bạn đang được thực hiện.",
    reversedMeaning: "Không hài lòng, thèm muốn nhiều hơn hoặc hạnh phúc giả tạo.",
    element: "Water"
  },
  { 
    id: 45, 
    name: "Ten of Cups", 
    meaning: "Hạnh phúc gia đình, hoàn thành cảm xúc", 
    suit: "Cups", 
    keywords: ["gia đình", "hạnh phúc", "hoàn thành", "cảm xúc", "hòa hợp"], 
    advice: "Trân trọng hạnh phúc gia đình và mối quan hệ bền vững",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/8/84/Cups10.jpg",
    detailedMeaning: "Ten of Cups về hạnh phúc gia đình và sự hoàn thành về mặt cảm xúc.",
    reversedMeaning: "Xung đột gia đình, thiếu hòa hợp hoặc ký vọng không thực tế.",
    element: "Water"
  },
  { 
    id: 46, 
    name: "Page of Cups", 
    meaning: "Tin tức tình yêu, sáng tạo, trực giác", 
    suit: "Cups", 
    keywords: ["tin tức", "tình yêu", "sáng tạo", "trực giác", "cảm xúc"], 
    advice: "Mở lòng với tin tức tình yêu và phát triển khả năng sáng tạo",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/a/ad/Cups11.jpg",
    detailedMeaning: "Page of Cups mang tin tức về tình yêu và cơ hội sáng tạo. Hãy tin vào trực giác.",
    reversedMeaning: "Tin tức thất vọng, sáng tạo bị cản trở hoặc cảm xúc không ổn định.",
    element: "Water"
  },
  { 
    id: 47, 
    name: "Knight of Cups", 
    meaning: "Lãng mạn, cảm xúc, theo đuổi", 
    suit: "Cups", 
    keywords: ["lãng mạn", "cảm xúc", "theo đuổi", "lý tưởng", "nghệ thuật"], 
    advice: "Theo đuổi tình yêu và lý tưởng với trái tim chân thật",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Cups12.jpg",
    detailedMeaning: "Knight of Cups về sự lãng mạn và theo đuổi lý tưởng. Hành động bằng trái tim.",
    reversedMeaning: "Quá cảm tính, không thực tế hoặc thất vọng trong tình yêu.",
    element: "Water"
  },
  { 
    id: 48, 
    name: "Queen of Cups", 
    meaning: "Trực giác, đồng cảm, chăm sóc", 
    suit: "Cups", 
    keywords: ["trực giác", "đồng cảm", "chăm sóc", "cảm xúc", "tâm linh"], 
    advice: "Sử dụng trực giác và lòng đồng cảm để hướng dẫn hành động",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/0/04/Cups13.jpg",
    detailedMeaning: "Queen of Cups đại diện cho trực giác mạnh mẽ và khả năng đồng cảm sâu sắc.",
    reversedMeaning: "Cảm xúc không ổn định, quá nhạy cảm hoặc thiếu ranh giới.",
    element: "Water"
  },
  { 
    id: 49, 
    name: "King of Cups", 
    meaning: "Cân bằng cảm xúc, khôn ngoan, lãnh đạo", 
    suit: "Cups", 
    keywords: ["cân bằng", "khôn ngoan", "lãnh đạo", "cảm xúc", "kinh nghiệm"], 
    advice: "Cân bằng cảm xúc với trí tuệ trong việc lãnh đạo",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/0/06/Cups14.jpg",
    detailedMeaning: "King of Cups về sự cân bằng hoàn hảo giữa cảm xúc và trí tuệ.",
    reversedMeaning: "Thiếu kiểm soát cảm xúc, thao túng hoặc lạm dụng quyền lực cảm xúc.",
    element: "Water"
  },

  // MINOR ARCANA - SWORDS (14 lá)
  { 
    id: 50, 
    name: "Ace of Swords", 
    meaning: "Ý tưởng mới, clarity, thành công", 
    suit: "Swords", 
    keywords: ["ý tưởng", "clarity", "thành công", "truth", "quyết đoán"], 
    advice: "Sử dụng trí tuệ và logic để đạt được thành công",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/1/1a/Swords01.jpg",
    detailedMeaning: "Ace of Swords mang đến ý tưởng mới và sự sáng suốt. Đây là lúc để hành động với trí tuệ.",
    reversedMeaning: "Nhầm lẫn, thiếu rõ ràng hoặc ý tưởng không thực tế.",
    element: "Air"
  },
  { 
    id: 51, 
    name: "Two of Swords", 
    meaning: "Quyết định khó khăn, cân bằng", 
    suit: "Swords", 
    keywords: ["quyết định", "cân bằng", "khó khăn", "lưỡng lự", "chờ đợi"], 
    advice: "Dành thời gian cân nhắc kỹ lưỡng trước khi quyết định",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/9/9e/Swords02.jpg",
    detailedMeaning: "Two of Swords về quyết định khó khăn và sự lưỡng lự. Cần thời gian để suy nghĩ.",
    reversedMeaning: "Indecision quá lâu, tránh quyết định hoặc thiên vị.",
    element: "Air"
  },
  { 
    id: 52, 
    name: "Three of Swords", 
    meaning: "Đau khổ, chia ly, heartbreak", 
    suit: "Swords", 
    keywords: ["đau khổ", "chia ly", "heartbreak", "buồn bã", "mất mát"], 
    advice: "Chấp nhận đau khổ như một phần của quá trình chữa lành",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/0/02/Swords03.jpg",
    detailedMeaning: "Three of Swords về đau khổ và heartbreak. Cần thời gian để lành vết thương.",
    reversedMeaning: "Chữa lành, tha thứ hoặc thoát khỏi đau khổ.",
    element: "Air"
  },
  { 
    id: 53, 
    name: "Four of Swords", 
    meaning: "Nghỉ ngơi, thiền định, tĩnh lặng", 
    suit: "Swords", 
    keywords: ["nghỉ ngơi", "thiền định", "tĩnh lặng", "phục hồi", "suy ngẫm"], 
    advice: "Dành thời gian nghỉ ngơi và suy ngẫm để phục hồi năng lượng",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/b/bf/Swords04.jpg",
    detailedMeaning: "Four of Swords về sự nghỉ ngơi và thiền định. Cần thời gian yên tĩnh để phục hồi.",
    reversedMeaning: "Restlessness, không thể nghỉ ngơi hoặc quá nhiều hoạt động.",
    element: "Air"
  },
  { 
    id: 54, 
    name: "Five of Swords", 
    meaning: "Xung đột, thất bại, mất mát", 
    suit: "Swords", 
    keywords: ["xung đột", "thất bại", "mất mát", "betrayal", "defeat"], 
    advice: "Học hỏi từ thất bại và tránh xung đột không cần thiết",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/2/23/Swords05.jpg",
    detailedMeaning: "Five of Swords về xung đột và thất bại. Cần học cách chấp nhận thua cuộc.",
    reversedMeaning: "Reconciliation, tha thứ hoặc tránh xung đột.",
    element: "Air"
  },
  { 
    id: 55, 
    name: "Six of Swords", 
    meaning: "Chuyển đổi, di chuyển, recovery", 
    suit: "Swords", 
    keywords: ["chuyển đổi", "di chuyển", "recovery", "progress", "cải thiện"], 
    advice: "Từ từ di chuyển khỏi khó khăn về phía tương lai tốt đẹp hơn",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Swords06.jpg",
    detailedMeaning: "Six of Swords về chuyển đổi và recovery. Dần dần thoát khỏi khó khăn.",
    reversedMeaning: "Stuck in problems, không thể move on hoặc tái phát vấn đề cũ.",
    element: "Air"
  },
  { 
    id: 56, 
    name: "Seven of Swords", 
    meaning: "Lừa dối, stealth, chiến lược", 
    suit: "Swords", 
    keywords: ["lừa dối", "stealth", "chiến lược", "cunning", "escape"], 
    advice: "Cẩn thận với sự lừa dối và hãy trung thực trong hành động",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/3/34/Swords07.jpg",
    detailedMeaning: "Seven of Swords về lừa dối và stealth. Cần cẩn thận với người xung quanh.",
    reversedMeaning: "Bị bắt, confess hoặc trở nên trung thực hơn.",
    element: "Air"
  },
  { 
    id: 57, 
    name: "Eight of Swords", 
    meaning: "Cảm giác bị trapped, limitation", 
    suit: "Swords", 
    keywords: ["trapped", "limitation", "restriction", "helpless", "confusion"], 
    advice: "Nhận ra rằng nhiều giới hạn chỉ tồn tại trong tâm trí bạn",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a7/Swords08.jpg",
    detailedMeaning: "Eight of Swords về cảm giác bị trapped. Nhiều limitation chỉ là mental blocks.",
    reversedMeaning: "Tự giải phóng, tìm ra cách thoát hoặc new perspective.",
    element: "Air"
  },
  { 
    id: 58, 
    name: "Nine of Swords", 
    meaning: "Lo lắng, nightmare, anxiety", 
    suit: "Swords", 
    keywords: ["lo lắng", "nightmare", "anxiety", "sợ hãi", "stress"], 
    advice: "Đối mặt với lo lắng và tìm cách giảm stress",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Swords09.jpg",
    detailedMeaning: "Nine of Swords về lo lắng và anxiety. Cần tìm cách quản lý stress.",
    reversedMeaning: "Overcome anxiety, tìm thấy peace hoặc get help.",
    element: "Air"
  },
  { 
    id: 59, 
    name: "Ten of Swords", 
    meaning: "Kết thúc, betrayal, bottom out", 
    suit: "Swords", 
    keywords: ["kết thúc", "betrayal", "bottom", "transformation", "new beginning"], 
    advice: "Chấp nhận kết thúc để mở đường cho khởi đầu mới",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/d/d4/Swords10.jpg",
    detailedMeaning: "Ten of Swords về kết thúc painful nhưng necessary. Sau đáy là khởi đầu mới.",
    reversedMeaning: "Recovery, regeneration hoặc tránh được worst-case scenario.",
    element: "Air"
  },
  { 
    id: 60, 
    name: "Page of Swords", 
    meaning: "Curiosity, new ideas, communication", 
    suit: "Swords", 
    keywords: ["curiosity", "ideas", "communication", "learning", "messages"], 
    advice: "Giữ thái độ tò mò và mở lòng với ý tưởng mới",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/4/4c/Swords11.jpg",
    detailedMeaning: "Page of Swords về curiosity và new ideas. Thời gian để học hỏi và giao tiếp.",
    reversedMeaning: "Gossip, misinformation hoặc lack of focus trong học tập.",
    element: "Air"
  },
  { 
    id: 61, 
    name: "Knight of Swords", 
    meaning: "Hành động nhanh, aggressive, determined", 
    suit: "Swords", 
    keywords: ["fast action", "aggressive", "determined", "impulsive", "charge"], 
    advice: "Hành động quyết liệt nhưng cần cân nhắc hậu quả",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/b/b0/Swords12.jpg",
    detailedMeaning: "Knight of Swords về hành động fast và aggressive. Cần balance với wisdom.",
    reversedMeaning: "Reckless, impulsive hoặc all talk no action.",
    element: "Air"
  },
  { 
    id: 62, 
    name: "Queen of Swords", 
    meaning: "Independent, direct, analytical", 
    suit: "Swords", 
    keywords: ["independent", "direct", "analytical", "honest", "clear"], 
    advice: "Sử dụng trí tuệ và honesty để đưa ra quyết định",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/d/d4/Swords13.jpg",
    detailedMeaning: "Queen of Swords về independence và analytical thinking. Trí tuệ sắc bén.",
    reversedMeaning: "Cold, harsh judgement hoặc lack of empathy.",
    element: "Air"
  },
  { 
    id: 63, 
    name: "King of Swords", 
    meaning: "Authority, logic, justice", 
    suit: "Swords", 
    keywords: ["authority", "logic", "justice", "leadership", "decision"], 
    advice: "Lãnh đạo với logic và justice, đưa ra quyết định fair",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/3/33/Swords14.jpg",
    detailedMeaning: "King of Swords về intellectual authority và justice. Lãnh đạo bằng trí tuệ.",
    reversedMeaning: "Abuse of power, unfair judgement hoặc lack of logic.",
    element: "Air"
  },

  // MINOR ARCANA - PENTACLES (14 lá)
  { 
    id: 64, 
    name: "Ace of Pentacles", 
    meaning: "Cơ hội mới về tiền bạc, khởi đầu thịnh vượng", 
    suit: "Pentacles", 
    keywords: ["cơ hội", "tiền bạc", "thịnh vượng", "manifestation", "security"], 
    advice: "Nắm bắt cơ hội tài chính và đầu tư cho tương lai",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/f/fd/Pents01.jpg",
    detailedMeaning: "Ace of Pentacles về cơ hội tài chính mới và material manifestation.",
    reversedMeaning: "Missed opportunity, poor planning hoặc lack of resources.",
    element: "Earth"
  },
  { 
    id: 65, 
    name: "Two of Pentacles", 
    meaning: "Balance, multitasking, adaptability", 
    suit: "Pentacles", 
    keywords: ["balance", "multitasking", "adaptability", "change", "flexibility"], 
    advice: "Cân bằng nhiều trách nhiệm và thích ứng với thay đổi",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/9/9f/Pents02.jpg",
    detailedMeaning: "Two of Pentacles về balancing multiple priorities và adaptability.",
    reversedMeaning: "Overwhelmed, disorganized hoặc dropped responsibilities.",
    element: "Earth"
  },
  { 
    id: 66, 
    name: "Three of Pentacles", 
    meaning: "Teamwork, collaboration, skill", 
    suit: "Pentacles", 
    keywords: ["teamwork", "collaboration", "skill", "learning", "planning"], 
    advice: "Hợp tác với người khác và phát triển kỹ năng chuyên môn",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/4/42/Pents03.jpg",
    detailedMeaning: "Three of Pentacles về teamwork và skill development trong môi trường collaborative.",
    reversedMeaning: "Lack of teamwork, poor communication hoặc subpar work.",
    element: "Earth"
  },
  { 
    id: 67, 
    name: "Four of Pentacles", 
    meaning: "Security, saving, possessiveness", 
    suit: "Pentacles", 
    keywords: ["security", "saving", "possessive", "control", "stability"], 
    advice: "Tìm kiếm security nhưng đừng quá bám víu vào material possessions",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/0/0f/Pents04.jpg",
    detailedMeaning: "Four of Pentacles về financial security nhưng có thể quá possessive.",
    reversedMeaning: "Generosity, sharing hoặc letting go of control.",
    element: "Earth"
  },
  { 
    id: 68, 
    name: "Five of Pentacles", 
    meaning: "Financial hardship, poverty, isolation", 
    suit: "Pentacles", 
    keywords: ["hardship", "poverty", "isolation", "struggle", "need"], 
    advice: "Tìm kiếm support trong thời gian khó khăn về tài chính",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/9/96/Pents05.jpg",
    detailedMeaning: "Five of Pentacles về financial hardship và feeling of isolation.",
    reversedMeaning: "Financial recovery, getting help hoặc improved circumstances.",
    element: "Earth"
  },
  { 
    id: 69, 
    name: "Six of Pentacles", 
    meaning: "Generosity, sharing, fairness", 
    suit: "Pentacles", 
    keywords: ["generosity", "sharing", "fairness", "charity", "balance"], 
    advice: "Chia sẻ tài sản một cách fair và generous với người khác",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Pents06.jpg",
    detailedMeaning: "Six of Pentacles về generosity và fair exchange of resources.",
    reversedMeaning: "Unfair exchange, debt hoặc strings attached generosity.",
    element: "Earth"
  },
  { 
    id: 70, 
    name: "Seven of Pentacles", 
    meaning: "Patience, investment, long-term planning", 
    suit: "Pentacles", 
    keywords: ["patience", "investment", "planning", "assessment", "growth"], 
    advice: "Kiên nhẫn chờ đợi kết quả của long-term investments",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/6/6a/Pents07.jpg",
    detailedMeaning: "Seven of Pentacles về patience và assessment of long-term investments.",
    reversedMeaning: "Impatience, poor planning hoặc lack of reward for effort.",
    element: "Earth"
  },
  { 
    id: 71, 
    name: "Eight of Pentacles", 
    meaning: "Skill development, mastery, dedication", 
    suit: "Pentacles", 
    keywords: ["skill", "mastery", "dedication", "craft", "improvement"], 
    advice: "Dedication trong việc phát triển kỹ năng sẽ mang lại mastery",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/4/49/Pents08.jpg",
    detailedMeaning: "Eight of Pentacles về dedication và skill development towards mastery.",
    reversedMeaning: "Lack of focus, poor quality work hoặc shortcuts.",
    element: "Earth"
  },
  { 
    id: 72, 
    name: "Nine of Pentacles", 
    meaning: "Independence, luxury, self-sufficiency", 
    suit: "Pentacles", 
    keywords: ["independence", "luxury", "self-sufficient", "achievement", "refinement"], 
    advice: "Tận hưởng thành quả của sự independent và hard work",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/f/f0/Pents09.jpg",
    detailedMeaning: "Nine of Pentacles về financial independence và luxury through own efforts.",
    reversedMeaning: "Dependence, setbacks hoặc overspending.",
    element: "Earth"
  },
  { 
    id: 73, 
    name: "Ten of Pentacles", 
    meaning: "Wealth, family legacy, long-term success", 
    suit: "Pentacles", 
    keywords: ["wealth", "family", "legacy", "tradition", "completion"], 
    advice: "Xây dựng lasting wealth và legacy cho generations",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/4/42/Pents10.jpg",
    detailedMeaning: "Ten of Pentacles về ultimate financial success và family legacy.",
    reversedMeaning: "Financial failure, family disputes hoặc lack of legacy.",
    element: "Earth"
  },
  { 
    id: 74, 
    name: "Page of Pentacles", 
    meaning: "New financial opportunity, study, practical", 
    suit: "Pentacles", 
    keywords: ["opportunity", "study", "practical", "manifestation", "planning"], 
    advice: "Học hỏi practical skills và planning cho financial goals",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/e/ec/Pents11.jpg",
    detailedMeaning: "Page of Pentacles về new opportunities và practical learning approach.",
    reversedMeaning: "Lack of progress, procrastination hoặc poor planning.",
    element: "Earth"
  },
  { 
    id: 75, 
    name: "Knight of Pentacles", 
    meaning: "Hard work, routine, reliability", 
    suit: "Pentacles", 
    keywords: ["hard work", "routine", "reliable", "methodical", "persistence"], 
    advice: "Persistence và methodical approach sẽ đưa đến success",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Pents12.jpg",
    detailedMeaning: "Knight of Pentacles về hard work và reliable progress towards goals.",
    reversedMeaning: "Laziness, unreliability hoặc lack of progress.",
    element: "Earth"
  },
  { 
    id: 76, 
    name: "Queen of Pentacles", 
    meaning: "Nurturing, practical, resourceful", 
    suit: "Pentacles", 
    keywords: ["nurturing", "practical", "resourceful", "generous", "down-to-earth"], 
    advice: "Nurture others while being practical và resourceful với resources",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/8/88/Pents13.jpg",
    detailedMeaning: "Queen of Pentacles về nurturing nature combined với practical wisdom.",
    reversedMeaning: "Self-care neglect, financial dependence hoặc materialism.",
    element: "Earth"
  },
  { 
    id: 77, 
    name: "King of Pentacles", 
    meaning: "Financial success, leadership, security", 
    suit: "Pentacles", 
    keywords: ["success", "leadership", "security", "abundance", "reliable"], 
    advice: "Lead với financial wisdom và create lasting security",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/1/1c/Pents14.jpg",
    detailedMeaning: "King of Pentacles về ultimate financial leadership và material mastery.",
    reversedMeaning: "Financial failure, poor investments hoặc materialistic obsession.",
    element: "Earth"
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
  
  // AI Integration states
  const [birthDate, setBirthDate] = useState<string>("");
  const [birthTime, setBirthTime] = useState<string>("");
  const [birthPlace, setBirthPlace] = useState<string>("");
  const [isAiAnalyzing, setIsAiAnalyzing] = useState(false);
  const [aiReading, setAiReading] = useState<string>("");
  const [userQuestion, setUserQuestion] = useState<string>("");

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
      
      // Nếu có thông tin ngày sinh, gửi dữ liệu đến AI
      if (birthDate) {
        generateAIReading(drawn);
      } else {
        // Đưa ra lời khuyên tổng thể thông thường
        generateAdvancedReading(drawn);
      }
      
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

  // Hàm gửi dữ liệu đến AI để phân tích
  const generateAIReading = async (cards: TarotCard[]) => {
    setIsAiAnalyzing(true);
    console.log('🎴 Starting AI reading generation...');
    
    try {
      // Chuẩn bị dữ liệu gửi đến AI
      const aiPrompt = {
        birthInfo: {
          date: birthDate,
          time: birthTime,
          place: birthPlace
        },
        cards: cards.map(card => ({
          name: card.name,
          suit: card.suit,
          meaning: card.meaning,
          reversed: card.reversed,
          keywords: card.keywords,
          detailedMeaning: card.detailedMeaning,
          reversedMeaning: card.reversedMeaning
        })),
        spread: {
          name: currentSpread.name,
          description: currentSpread.description,
          positions: currentSpread.positions
        },
        question: userQuestion,
        aspect: selectedAspect
      };

      console.log('📤 Sending request to AI API...');
      // Gửi request đến AI API
      const response = await fetch('/api/tarot-ai-reading', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(aiPrompt)
      });

      console.log('📥 Response status:', response.status);
      
      if (response.ok) {
        const result = await response.json();
        console.log('✅ AI reading received:', result.success, 'Length:', result.reading?.length);
        console.log('📖 AI reading content preview:', result.reading?.substring(0, 200) + '...');
        setAiReading(result.reading);
        setOverallReading(result.reading);
      } else {
        const errorText = await response.text();
        console.error('❌ API Error:', response.status, errorText);
        throw new Error('AI analysis failed');
      }
    } catch (error) {
      console.error('❌ Error getting AI reading:', error);
      // Fallback to traditional reading
      generateAdvancedReading(cards);
      setAiReading(""); // Clear AI reading để hiển thị traditional reading
    } finally {
      setIsAiAnalyzing(false);
      console.log('🔚 AI reading process completed');
    }
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
    const minorCount = totalCards - majorCount;
    const reversedPercentage = (reversedCount / totalCards) * 100;
    
    // Phân tích tỷ lệ Major vs Minor Arcana
    energy += "\n\n**Phân tích ẩn chính và ẩn phụ:**\n";
    
    if (majorCount > 0) {
      energy += `🌟 **Major Arcana (Ẩn chính): ${majorCount}/${totalCards} lá** - Đây là những thế lực lớn, bài học quan trọng và sự kiện có tác động sâu sắc đến hành trình cuộc sống của bạn. `;
      
      if (majorCount >= totalCards * 0.7) {
        energy += "Tỷ lệ ẩn chính rất cao cho thấy bạn đang trải qua giai đoạn chuyển đổi tâm linh quan trọng. Những sự kiện này mang tính định mệnh và sẽ định hình tương lai của bạn. ";
      } else if (majorCount >= totalCards * 0.5) {
        energy += "Tỷ lệ ẩn chính cao cho thấy đây là thời kỳ quan trọng với nhiều bài học tâm linh và cơ hội phát triển bản thân. ";
      } else {
        energy += "Ẩn chính xuất hiện nhắc nhở bạn về những bài học quan trọng cần chú ý trong giai đoạn này. ";
      }
    }
    
    if (minorCount > 0) {
      energy += `\n🏠 **Minor Arcana (Ẩn phụ): ${minorCount}/${totalCards} lá** - Đây là những tình huống hàng ngày, cảm xúc và trải nghiệm thực tế mà bạn có thể kiểm soát và tác động trực tiếp. `;
      
      // Phân tích theo suit
      const suits = cards.filter(card => card.suit !== "Major Arcana").map(card => card.suit);
      const suitCount = suits.reduce((acc, suit) => {
        acc[suit] = (acc[suit] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);
      
      if (suitCount.Wands > 0) {
        energy += `\n  ⚡ **Wands (Gậy): ${suitCount.Wands} lá** - Năng lượng hành động, sáng tạo và đam mê. `;
      }
      if (suitCount.Cups > 0) {
        energy += `\n  💧 **Cups (Cốc): ${suitCount.Cups} lá** - Cảm xúc, tình yêu và mối quan hệ. `;
      }
      if (suitCount.Swords > 0) {
        energy += `\n  ⚔️ **Swords (Kiếm): ${suitCount.Swords} lá** - Tư duy, giao tiếp và thách thức. `;
      }
      if (suitCount.Pentacles > 0) {
        energy += `\n  🌍 **Pentacles (Xu): ${suitCount.Pentacles} lá** - Tài chính, sự nghiệp và thành tựu vật chất. `;
      }
      
      if (minorCount >= totalCards * 0.7) {
        energy += "\nTỷ lệ ẩn phụ cao cho thấy bạn đang tập trung vào những vấn đề thực tế và có thể kiểm soát được tình hình hiện tại. ";
      }
    }
    
    // Phân tích bài lật ngược
    energy += "\n\n**Phân tích bài lật ngược:**\n";
    if (reversedPercentage >= 60) {
      energy += "🔄 Nhiều bài lật ngược cho thấy năng lượng nội tại, cần thời gian suy ngẫm và xem xét lại những quyết định. Đây là thời kỳ của việc học hỏi từ thử thách và phát triển nội tâm. ";
    } else if (reversedPercentage >= 30) {
      energy += "⚖️ Năng lượng cân bằng giữa thử thách và cơ hội. Cần linh hoạt trong cách tiếp cận và cân bằng giữa hành động và suy ngẫm. ";
    } else if (reversedPercentage > 0) {
      energy += "✨ Năng lượng chủ yếu tích cực với một số điểm cần chú ý. Thời điểm tốt để hành động nhưng cần lưu ý những khía cạnh được bài lật ngược chỉ ra. ";
    } else {
      energy += "🌟 Năng lượng hoàn toàn tích cực và thuận lợi. Thời điểm tuyệt vời để thực hiện kế hoạch và tiến về phía trước. ";
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
            Bói Bài Tarot
            <Sparkles className="w-8 h-8 text-yellow-400" />
          </h2>
          <p className="text-xl text-purple-200 mb-6">
            Khám phá vận mệnh với hệ thống tarot AI chi tiết và chính xác
          </p>

          {/* Thông tin cá nhân cho AI */}
          <div className="mb-8 p-6 bg-purple-800/30 rounded-xl border border-purple-500/30">
            <div className="text-center mb-4">
              <h3 className="text-lg font-semibold text-white mb-2">
                🔮 Thông tin cá nhân để AI phân tích chính xác
              </h3>
              <p className="text-purple-200 text-sm">
                Nhập thông tin để nhận được phân tích tarot cá nhân hóa từ AI
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium text-purple-200 mb-2">
                  Ngày sinh (bắt buộc) *
                </label>
                <input
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  className="w-full px-3 py-2 bg-purple-900/50 border border-purple-500/50 rounded-lg text-white focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-purple-200 mb-2">
                  Giờ sinh (tùy chọn)
                </label>
                <input
                  type="time"
                  value={birthTime}
                  onChange={(e) => setBirthTime(e.target.value)}
                  className="w-full px-3 py-2 bg-purple-900/50 border border-purple-500/50 rounded-lg text-white focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-purple-200 mb-2">
                  Nơi sinh (tùy chọn)
                </label>
                <input
                  type="text"
                  value={birthPlace}
                  onChange={(e) => setBirthPlace(e.target.value)}
                  placeholder="Ví dụ: Hà Nội, Việt Nam"
                  className="w-full px-3 py-2 bg-purple-900/50 border border-purple-500/50 rounded-lg text-white placeholder-purple-300 focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-purple-200 mb-2">
                  Câu hỏi cụ thể (tùy chọn)
                </label>
                <input
                  type="text"
                  value={userQuestion}
                  onChange={(e) => setUserQuestion(e.target.value)}
                  placeholder="Ví dụ: Tình yêu của tôi sẽ như thế nào?"
                  className="w-full px-3 py-2 bg-purple-900/50 border border-purple-500/50 rounded-lg text-white placeholder-purple-300 focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
            
            {!birthDate && (
              <p className="text-yellow-300 text-sm mt-2 text-center">
                ⚠️ Vui lòng nhập ngày sinh để nhận được phân tích AI chính xác nhất
              </p>
            )}
          </div>

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
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 text-lg font-semibold rounded-full shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
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
                  {aiReading ? (
                    <>
                      <span className="text-2xl">🤖</span>
                      Phân Tích AI Chi Tiết
                      <span className="text-2xl">✨</span>
                    </>
                  ) : (
                    <>
                      <Lightbulb className="w-6 h-6 text-yellow-400" />
                      Tổng quan và Lời khuyên
                    </>
                  )}
                </CardTitle>
                {aiReading && (
                  <div className="text-center">
                    <Badge variant="outline" className="text-green-400 border-green-400">
                      Phân tích bởi AI dựa trên thông tin cá nhân
                    </Badge>
                  </div>
                )}
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-4">
                  {isAiAnalyzing ? (
                    <div className="flex flex-col items-center gap-4 py-8">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400"></div>
                      <p className="text-purple-200">🤖 AI đang phân tích sâu dữ liệu của bạn...</p>
                      <p className="text-sm text-purple-300">Việc này có thể mất 10-30 giây</p>
                    </div>
                  ) : (
                    <>
                      <div className="text-left">
                        {aiReading ? (
                          <div className="space-y-4">
                            <div 
                              className="text-purple-200 leading-relaxed prose prose-invert max-w-none"
                              style={{ whiteSpace: 'pre-wrap' }}
                            >
                              {aiReading
                                .replace(/\*\*(.*?)\*\*/g, '')
                                .replace(/### /g, '\n🎯 ')
                                .replace(/## /g, '\n✨ ')
                                .split('\n')
                                .map((line, index) => (
                                  <p key={index} className={
                                    line.startsWith('✨') ? 'text-2xl font-bold text-yellow-300 mt-6 mb-4' :
                                    line.startsWith('🎯') ? 'text-xl font-bold text-white mt-4 mb-2' :
                                    'mb-2'
                                  }>
                                    {line}
                                  </p>
                                ))
                              }
                            </div>
                          </div>
                        ) : (
                          <p className="text-purple-200 leading-relaxed">{overallReading}</p>
                        )}
                      </div>
                    </>
                  )}
                  
                  {!isAiAnalyzing && (
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
                        <div className="text-yellow-400 font-semibold">Phân tích</div>
                        <div className="text-white text-sm">{birthDate ? "AI & Chiêm tinh" : "Truyền thống"}</div>
                      </div>
                    </div>
                  )}
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
