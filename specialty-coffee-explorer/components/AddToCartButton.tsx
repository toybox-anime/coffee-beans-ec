// src/components/AddToCartButton.tsx
"use client";

import { useCartStore } from "@/store/cartStore";
import { CoffeeBean } from "@/lib/data";

export default function AddToCartButton({ bean }: { bean: CoffeeBean }) {
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <button
      onClick={() => {
        addToCart(bean);
        alert(`${bean.name}をカートに追加しました！`);
      }}
      // 🚨 修正：px-6 py-3 → px-4 py-2 にサイズダウンし、text-sm を追加
      className="bg-amber-800 text-white text-sm font-bold px-4 py-2 rounded-full hover:bg-amber-900 active:scale-95 transition shadow-sm hover:shadow-md"
    >
      カートに入れる
    </button>
  );
}