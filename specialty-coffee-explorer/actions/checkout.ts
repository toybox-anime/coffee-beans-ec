// src/actions/checkout.ts
"use server"; // 🚨 超重要：このファイル内の関数はすべて「サーバー側（Node.js）」で実行されるという宣言

import { CoffeeBean } from "@/lib/data";

// 決済処理を行うサーバーサイドの関数（JavaのServiceクラスのメソッドのようなもの）
export async function processCheckout(cartItems: CoffeeBean[], totalAmount: number) {
  // ※ここで実際にデータベース(SQL)に保存したり、Stripeなどの決済APIを叩いたりします。
  
  console.log("=== サーバー側で処理を開始します ===");
  console.log(`購入アイテム数: ${cartItems.length}点`);
  console.log(`合計請求額: ¥${totalAmount.toLocaleString()}`);

  // 実際の通信やDB処理を想定して、2秒間待機するモック処理
  await new Promise((resolve) => setTimeout(resolve, 2000));

  console.log("=== 決済処理が完了しました ===");

  // フロントエンドに結果を返す
  return {
    success: true,
    orderId: `ORD-${Math.floor(Math.random() * 100000)}`,
    message: "注文が完了しました！",
  };
}