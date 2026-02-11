// src/components/AddToCartButton.tsx
"use client"; // ブラウザでのクリック操作やZustandを使うために必須

import { CoffeeBean } from '@/lib/data';
import { useCartStore } from '@/store/cartStore';

export default function AddToCartButton({ bean }: { bean: CoffeeBean }) {
  // 先ほど作ったStoreから、追加用の関数を呼び出す
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <button 
      onClick={() => addToCart(bean)}
      className="mt-5 w-full bg-amber-800 text-white py-2 rounded-lg hover:bg-amber-900 transition active:scale-95"
    >
      カートに入れる
    </button>
  );
}