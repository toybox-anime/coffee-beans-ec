// src/lib/data.ts

export type CoffeeBean = {
  id: string;
  name: string;
  price: number;
  origin: string;
  roast: string;
  flavorNotes: string[];
  imageUrl: string;
};

export const mockCoffeeBeans: CoffeeBean[] = [
  {
    id: "1",
    name: "エチオピア イルガチェフェ",
    price: 1200,
    origin: "エチオピア",
    roast: "中煎り",
    flavorNotes: ["フローラル", "レモン", "ティーライク"],
    // 🚨 修正：URLの中に .png を追加しました（これでNext.jsが許可します）
    imageUrl: "https://placehold.co/600x400/5d4037/ffffff.png?text=Ethiopia",
  },
  {
    id: "2",
    name: "ブラジル ショコラ",
    price: 980,
    origin: "ブラジル",
    roast: "深煎り",
    flavorNotes: ["ナッツ", "チョコレート", "甘み"],
    imageUrl: "https://placehold.co/600x400/3e2723/ffffff.png?text=Brazil",
  },
  {
    id: "3",
    name: "グアテマラ アンティグア",
    price: 1100,
    origin: "グアテマラ",
    roast: "中深煎り",
    flavorNotes: ["スパイシー", "スモーキー", "酸味"],
    imageUrl: "https://placehold.co/600x400/4e342e/ffffff.png?text=Guatemala",
  },
  {
    id: "4",
    name: "コロンビア スプレモ",
    price: 1050,
    origin: "コロンビア",
    roast: "中煎り",
    flavorNotes: ["キャラメル", "フルーティー", "バランス"],
    imageUrl: "https://placehold.co/600x400/6d4c41/ffffff.png?text=Colombia",
  },
];