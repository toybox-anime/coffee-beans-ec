// src/app/orders/page.tsx
import { prisma } from "@/lib/prisma"; // 👈 作成したDB接続クライアント
import Link from "next/link";

// 🚨 サーバーコンポーネントなので、async/await で直接DB操作が可能！
export default async function OrdersPage() {
  
  // 1. Prismaを使って、データベースから全注文を取得する
  const orders = await prisma.order.findMany({
    orderBy: {
      createdAt: 'desc', // 新しい順に並び替え
    },
    include: {
      items: true, // 紐づいている注文明細（OrderItem）も一緒に取ってくる（Eager Loading）
    },
  });

  return (
    <main className="p-10 max-w-4xl mx-auto min-h-screen">
      <h1 className="text-3xl font-bold text-amber-800 mb-8">📜 注文履歴</h1>

      {orders.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-xl shadow-sm">
          <p className="text-gray-500 mb-4">まだ注文履歴はありません。</p>
          <Link href="/" className="text-amber-700 font-bold hover:underline">
            お買い物を始める
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {/* 取得した orders 配列をマップで展開 */}
          {orders.map((order) => (
            <div key={order.id} className="bg-white p-6 rounded-xl shadow-sm border border-amber-100">
              <div className="flex justify-between items-start mb-4 border-b border-gray-100 pb-4">
                <div>
                  <p className="text-xs text-gray-500 uppercase font-bold">Order ID</p>
                  <p className="font-mono text-gray-700 text-sm">{order.id}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500 uppercase font-bold">購入日時</p>
                  <p className="text-gray-700">
                    {/* 日付を日本形式で表示 */}
                    {new Date(order.createdAt).toLocaleString('ja-JP')}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                {/* 注文ごとの明細（items）を展開 */}
                {order.items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-gray-800">
                      ☕ {item.beanName}
                    </span>
                    <span className="text-gray-600">¥{item.price.toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                <span className="font-bold text-gray-600">合計金額</span>
                <span className="font-bold text-xl text-amber-800">¥{order.totalAmount.toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}