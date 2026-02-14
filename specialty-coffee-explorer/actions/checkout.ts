// src/actions/checkout.ts
"use server";

import { CoffeeBean } from "@/lib/data";
import { prisma } from "@/lib/prisma";
import { CheckoutInputSchema } from "@/lib/schemas";

export async function processCheckout(cartItems: CoffeeBean[], totalAmount: number) {
  try {
    // ✅ Zod でバリデーション実施
    const validationResult = CheckoutInputSchema.safeParse({
      cart: cartItems,
      totalAmount: totalAmount,
    });

    if (!validationResult.success) {
      const errors = validationResult.error.errors.map((e) => e.message).join(", ");
      return {
        success: false,
        orderId: null,
        message: `バリデーションエラー: ${errors}`,
      };
    }

    console.log("=== DBへの保存処理を開始します ===");

    // Orderを1件作りつつ、それに紐づくOrderItemも同時に複数件作成
    const order = await prisma.order.create({
      data: {
        totalAmount: validationResult.data.totalAmount,
        status: "COMPLETED",
        items: {
          create: validationResult.data.cart.map((bean) => ({
            beanId: bean.id,
            beanName: bean.name,
            price: bean.price,
          })),
        },
      },
    });

    console.log("=== DBへの保存が成功しました！ ===");

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
      message: "システムエラーが発生しました。",
    };
  }
}