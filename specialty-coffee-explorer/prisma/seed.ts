import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// id を固定しているのは、既存の注文明細(OrderItem.beanId)との整合性を保つため
const products = [
  {
    id: "1",
    name: "エチオピア イルガチェフェ",
    price: 1200,
    origin: "エチオピア",
    roast: "中煎り",
    flavorNotes: ["フローラル", "レモン", "ティーライク"],
    imageUrl: "https://placehold.co/600x400/5d4037/ffffff.png?text=Ethiopia",
    description: "花のような香りと柑橘の明るい酸が特徴。紅茶のように軽やかな飲み口です。",
  },
  {
    id: "2",
    name: "ブラジル ショコラ",
    price: 980,
    origin: "ブラジル",
    roast: "深煎り",
    flavorNotes: ["ナッツ", "チョコレート", "甘み"],
    imageUrl: "https://placehold.co/600x400/3e2723/ffffff.png?text=Brazil",
    description: "ナッツとチョコレートの甘みが主役。ミルクとの相性も抜群の深煎りです。",
  },
  {
    id: "3",
    name: "グアテマラ アンティグア",
    price: 1100,
    origin: "グアテマラ",
    roast: "中深煎り",
    flavorNotes: ["スパイシー", "スモーキー", "酸味"],
    imageUrl: "https://placehold.co/600x400/4e342e/ffffff.png?text=Guatemala",
    description: "火山性土壌が育むスモーキーな香りと、しっかりしたコクが楽しめます。",
  },
  {
    id: "4",
    name: "コロンビア スプレモ",
    price: 1050,
    origin: "コロンビア",
    roast: "中煎り",
    flavorNotes: ["キャラメル", "フルーティー", "バランス"],
    imageUrl: "https://placehold.co/600x400/6d4c41/ffffff.png?text=Colombia",
    description: "キャラメルの甘さと果実感のバランスが良い、毎日飲みたい定番の一杯。",
  },
];

async function main() {
  for (const p of products) {
    await prisma.product.upsert({ where: { id: p.id }, update: p, create: p });
  }
  console.log(`Seeded ${products.length} products`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
