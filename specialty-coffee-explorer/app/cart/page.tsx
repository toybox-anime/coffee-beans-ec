// src/app/cart/page.tsx
"use client";

import { useCartStore } from "@/store/cartStore";
import Link from "next/link";
import { useState } from "react";
import { processCheckout } from "@/actions/checkout";
import toast from "react-hot-toast";

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCartStore();
  const [isProcessing, setIsProcessing] = useState(false);

  const totalPrice = cart.reduce((sum, bean) => sum + bean.price, 0);

  const handleCheckout = async () => {
    setIsProcessing(true);

    const toastId = toast.loading("決済処理中...");

    try {
      const result = await processCheckout(cart, totalPrice);

      if (result.success) {
        toast.dismiss(toastId);
        toast.success(`${result.message}\n注文番号: ${result.orderId}`);
        clearCart();
        // 注文履歴ページへリダイレクト
        setTimeout(() => {
          window.location.href = "/orders";
        }, 2000);
      } else {
        toast.dismiss(toastId);
        toast.error(result.message);
      }
    } catch (error) {
      toast.dismiss(toastId);
      toast.error("決済処理中にエラーが発生しました");
      console.error(error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRemoveItem = (index: number) => {
    removeFromCart(index);
    toast.success("商品をカートから削除しました");
  };

  return (
    <main className="p-10 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-3xl font-bold text-amber-800 mb-8">🛒 カートの中身</h1>

      {cart.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-xl shadow-sm">
          <p className="text-gray-500 mb-4">カートには何も入っていません。</p>
          <Link href="/" className="text-amber-700 font-bold hover:underline">
            商品一覧に戻る
          </Link>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <ul className="divide-y divide-gray-200">
            {cart.map((bean, index) => (
              <li
                key={`${bean.id}-${index}`}
                className="py-4 flex justify-between items-center"
              >
                <div>
                  <p className="font-bold text-gray-800">{bean.name}</p>
                  <p className="text-sm text-gray-500">
                    {bean.roast} / {bean.origin}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <p className="font-bold text-amber-700">
                    ¥{bean.price.toLocaleString()}
                  </p>
                  <button
                    onClick={() => handleRemoveItem(index)}
                    className="text-red-500 text-sm hover:underline disabled:opacity-50"
                    disabled={isProcessing}
                  >
                    削除
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-8 pt-6 border-t border-gray-200 flex justify-between items-center">
            <p className="text-xl font-bold">合計</p>
            <p className="text-3xl font-bold text-amber-800">
              ¥{totalPrice.toLocaleString()}
            </p>
          </div>

          <div className="mt-8 flex gap-4">
            <Link
              href="/"
              className="flex-1 text-center py-3 border border-amber-800 text-amber-800 rounded-lg hover:bg-amber-50 transition"
            >
              買い物を続ける
            </Link>

            <button
              onClick={handleCheckout}
              disabled={isProcessing}
              className={`flex-1 py-3 rounded-lg text-white transition font-bold ${
                isProcessing ? "bg-gray-400 cursor-not-allowed" : "bg-amber-800 hover:bg-amber-900"
              }`}
            >
              {isProcessing ? "決済処理中..." : "レジに進む"}
            </button>
          </div>
        </div>
      )}
    </main>
  );
}