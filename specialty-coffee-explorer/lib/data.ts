// src/lib/data.ts

// ① データ構造（型）の定義
export type CoffeeBean = {
  id: string;
  name: string;
  origin: string;
  roast: 'Light' | 'Medium' | 'Dark'; // 焙煎度はこの3つの文字列しか許容しない（ユニオン型）
  price: number;
  flavorNotes: string[];
};

// ② 画面に表示するためのダミーデータ
export const mockCoffeeBeans: CoffeeBean[] = [
  {
    id: '1',
    name: 'エチオピア イルガチェフェ',
    origin: 'エチオピア',
    roast: 'Light',
    price: 1200,
    flavorNotes: ['フローラル', 'ベリー']
  },
  {
    id: '2',
    name: 'コロンビア スプレモ',
    origin: 'コロンビア',
    roast: 'Medium',
    price: 1000,
    flavorNotes: ['チョコレート', 'ナッツ']
  },
  {
    id: '3',
    name: 'インドネシア マンデリン',
    origin: 'インドネシア',
    roast: 'Dark',
    price: 1400,
    flavorNotes: ['アーシー', 'スパイス']
  }
];