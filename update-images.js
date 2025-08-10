// Script để cập nhật hình ảnh tarot
const imageMap = {
  // Cups
  "Two of Cups": "https://upload.wikimedia.org/wikipedia/commons/e/e1/Cups02.jpg",
  "Three of Cups": "https://upload.wikimedia.org/wikipedia/commons/7/7a/Cups03.jpg",
  "Four of Cups": "https://upload.wikimedia.org/wikipedia/commons/3/35/Cups04.jpg",
  "Five of Cups": "https://upload.wikimedia.org/wikipedia/commons/d/d7/Cups05.jpg",
  "Six of Cups": "https://upload.wikimedia.org/wikipedia/commons/1/17/Cups06.jpg",
  "Seven of Cups": "https://upload.wikimedia.org/wikipedia/commons/a/ae/Cups07.jpg",
  "Eight of Cups": "https://upload.wikimedia.org/wikipedia/commons/6/60/Cups08.jpg",
  "Nine of Cups": "https://upload.wikimedia.org/wikipedia/commons/2/24/Cups09.jpg",
  "Ten of Cups": "https://upload.wikimedia.org/wikipedia/commons/8/84/Cups10.jpg",
  "Page of Cups": "https://upload.wikimedia.org/wikipedia/commons/a/ad/Cups11.jpg",
  "Knight of Cups": "https://upload.wikimedia.org/wikipedia/commons/f/fa/Cups12.jpg",
  "Queen of Cups": "https://upload.wikimedia.org/wikipedia/commons/0/04/Cups13.jpg",
  "King of Cups": "https://upload.wikimedia.org/wikipedia/commons/0/06/Cups14.jpg",
  
  // Swords
  "Ace of Swords": "https://upload.wikimedia.org/wikipedia/commons/1/1a/Swords01.jpg",
  "Two of Swords": "https://upload.wikimedia.org/wikipedia/commons/9/9e/Swords02.jpg",
  "Three of Swords": "https://upload.wikimedia.org/wikipedia/commons/0/02/Swords03.jpg",
  "Four of Swords": "https://upload.wikimedia.org/wikipedia/commons/b/bf/Swords04.jpg",
  "Five of Swords": "https://upload.wikimedia.org/wikipedia/commons/2/23/Swords05.jpg",
  "Six of Swords": "https://upload.wikimedia.org/wikipedia/commons/2/29/Swords06.jpg",
  "Seven of Swords": "https://upload.wikimedia.org/wikipedia/commons/3/34/Swords07.jpg",
  "Eight of Swords": "https://upload.wikimedia.org/wikipedia/commons/a/a7/Swords08.jpg",
  "Nine of Swords": "https://upload.wikimedia.org/wikipedia/commons/2/2f/Swords09.jpg",
  "Ten of Swords": "https://upload.wikimedia.org/wikipedia/commons/d/d4/Swords10.jpg",
  "Page of Swords": "https://upload.wikimedia.org/wikipedia/commons/4/4c/Swords11.jpg",
  "Knight of Swords": "https://upload.wikimedia.org/wikipedia/commons/b/b0/Swords12.jpg",
  "Queen of Swords": "https://upload.wikimedia.org/wikipedia/commons/d/d4/Swords13.jpg",
  "King of Swords": "https://upload.wikimedia.org/wikipedia/commons/3/33/Swords14.jpg",
  
  // Pentacles
  "Ace of Pentacles": "https://upload.wikimedia.org/wikipedia/commons/f/fd/Pents01.jpg",
  "Two of Pentacles": "https://upload.wikimedia.org/wikipedia/commons/9/9f/Pents02.jpg",
  "Three of Pentacles": "https://upload.wikimedia.org/wikipedia/commons/4/42/Pents03.jpg",
  "Four of Pentacles": "https://upload.wikimedia.org/wikipedia/commons/3/35/Pents04.jpg",
  "Five of Pentacles": "https://upload.wikimedia.org/wikipedia/commons/9/96/Pents05.jpg",
  "Six of Pentacles": "https://upload.wikimedia.org/wikipedia/commons/a/a6/Pents06.jpg",
  "Seven of Pentacles": "https://upload.wikimedia.org/wikipedia/commons/6/6a/Pents07.jpg",
  "Eight of Pentacles": "https://upload.wikimedia.org/wikipedia/commons/4/49/Pents08.jpg",
  "Nine of Pentacles": "https://upload.wikimedia.org/wikipedia/commons/f/f0/Pents09.jpg",
  "Ten of Pentacles": "https://upload.wikimedia.org/wikipedia/commons/4/42/Pents10.jpg",
  "Page of Pentacles": "https://upload.wikimedia.org/wikipedia/commons/e/ec/Pents11.jpg",
  "Knight of Pentacles": "https://upload.wikimedia.org/wikipedia/commons/d/d5/Pents12.jpg",
  "Queen of Pentacles": "https://upload.wikimedia.org/wikipedia/commons/8/87/Pents13.jpg",
  "King of Pentacles": "https://upload.wikimedia.org/wikipedia/commons/1/1c/Pents14.jpg"
};

console.log(JSON.stringify(imageMap, null, 2));
