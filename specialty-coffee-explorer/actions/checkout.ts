"use server";

import { prisma } from "@/lib/prisma";
import { CheckoutInputSchema } from "@/lib/schemas";

// クライアントからは商品IDのみ受け取り、価格・合計はサーバー側でDBから確定する
export async function processCheckout(productIds: string[]) {
  try {
    const validationResult = CheckoutInputSchema.safeParse({ productIds });

    if (!validationResult.success) {
      const errors = validationResult.error.issues.map((e) => e.message).join(", ");
      return { success: false, orderId: null, message: `バリデーションエラー: ${errors}` };
    }

    const ids = validationResult.data.productIds;
    const products = await prisma.product.findMany({
      where: { id: { in: [...new Set(ids)] } },
    });
    const byId = new Map(products.map((p) => [p.id, p]));

    // 同じ商品を複数個カートに入れている場合も1行ずつ明細にする
    const lines = ids.map((id) => byId.get(id));
    if (lines.some((p) => !p)) {
      return { success: false, orderId: null, message: "販売終了の商品がカートに含まれています。" };
    }
    const items = lines as NonNullable<(typeof lines)[number]>[];
    const totalAmount = items.reduce((sum, p) => sum + p.price, 0);

    // Order と OrderItem を1トランザクションで作成
    const order = await prisma.order.create({
      data: {
        totalAmount,
        status: "COMPLETED",
        items: {
          create: items.map((p) => ({ beanId: p.id, beanName: p.name, price: p.price })),
        },
      },
    });

    return {
      success: true,
      orderId: order.id,
      message: "注文が完了し、データベースに保存されました！",
    };
  } catch (error) {
    console.error("DB保存エラー:", error);
    return { success: false, orderId: null, message: "システムエラーが発生しました。" };
  }
}
