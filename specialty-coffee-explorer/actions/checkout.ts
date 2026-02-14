// src/actions/checkout.ts
"use server";

import { CoffeeBean } from "@/lib/data";
import { prisma } from "@/lib/prisma"; 

export async function processCheckout(cartItems: CoffeeBean[], totalAmount: number) {
  try {
    console.log("=== DBへの保存処理を開始します ===");

    // Orderを1件作りつつ、それに紐づくOrderItemも同時に複数件作成（トランザクション処理）します
    const order = await prisma.order.create({
      data: {
        totalAmount: totalAmount,
        status: "COMPLETED",
        // items は schema.prisma で定義したリレーションの名前です
        items: {
          create: cartItems.map((bean) => ({
            beanId: bean.id,
            beanName: bean.name,
            price: bean.price,
          })),
        },
      },
    });

    console.log("=== DBへの保存が成功しました！ ===");
    
    // DBで自動生成された order.id（cuid）をフロントエンドに返す
    return {
      success: true,
      orderId: order.id, 
      message: "注文が完了し、データベースに保存されました！",
    };

  } catch (error) {
    console.error("DB保存エラー:", error);
    return { 
      success: false, 
      orderId: null,
      message: "システムエラーが発生しました。" 
    };
  }
}