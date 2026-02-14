// src/components/Header.tsx
"use client";

import { useCartStore } from '@/store/cartStore';
import Link from 'next/link';

export default function Header() {
  const cart = useCartStore((state) => state.cart);

  return (
    <header className="bg-amber-900 text-white p-4 shadow-md sticky top-0 z-10">
      <div className="max-w-5xl mx-auto flex justify-between items-center">
        
        {/* ① ロゴ（トップページへ） */}
        <Link href="/" className="font-bold text-xl hover:text-amber-200 transition">
          ☕ Specialty Coffee
        </Link>
        
        {/* 右側のメニューエリア */}
        <div className="flex items-center gap-6">
          
          {/* ② 🚨 ここに追加！注文履歴へのリンク */}
          <Link href="/orders" className="text-amber-100 hover:text-white transition text-sm font-bold flex items-center gap-1">
            <span>📜</span>
            <span>注文履歴</span>
          </Link>

          {/* ③ カートボタン（既存のまま） */}
          <Link href="/cart" className="flex items-center gap-2 bg-amber-800 px-4 py-2 rounded-full hover:bg-amber-700 transition cursor-pointer">
            <span>🛒 カート</span>
            <span className="bg-white text-amber-900 font-bold rounded-full w-6 h-6 flex items-center justify-center text-sm">
              {cart.length}
            </span>
          </Link>

        </div>
      </div>
    </header>
  );
}