// src/components/Header.tsx
"use client"; // Zustandを使って状態を監視するのでClient Component

import { useCartStore } from '@/store/cartStore';

export default function Header() {
  // Storeからカートの中身（配列）を取得する
  const cart = useCartStore((state) => state.cart);

  return (
    <header className="bg-amber-900 text-white p-4 shadow-md sticky top-0 z-10">
      <div className="max-w-5xl mx-auto flex justify-between items-center">
        <div className="font-bold text-xl">☕ Specialty Coffee</div>
        <div className="flex items-center gap-2 bg-amber-800 px-4 py-2 rounded-full">
          <span>🛒 カート</span>
          {/* カートの配列の長さを表示 */}
          <span className="bg-white text-amber-900 font-bold rounded-full w-6 h-6 flex items-center justify-center text-sm">
            {cart.length}
          </span>
        </div>
      </div>
    </header>
  );
}