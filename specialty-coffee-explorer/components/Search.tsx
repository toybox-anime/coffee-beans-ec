// src/components/Search.tsx
"use client"; // 🚨 超重要：これはブラウザ側で動くコンポーネントであるという宣言

import { useEffect, useRef } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

export default function Search() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);

  // 入力が止まって300ms後にURLを書き換える（サーバー検索の連打を避ける）
  const handleSearch = (term: string) => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => updateUrl(term), 300);
  };

  const updateUrl = (term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('q', term); // 入力があれば ?q=○○ をセット
    } else {
      params.delete('q');    // 空ならパラメーターを削除
    }
    // URLを書き換える（ページのリロードは発生せず、高速に切り替わります）
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="w-full flex justify-center">
      <input
        type="text"
        placeholder="名前・産地・焙煎度・風味で検索..."
        className="border-2 border-amber-200 rounded-full px-6 py-3 w-full max-w-md focus:outline-none focus:border-amber-500 transition shadow-sm"
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get('q')?.toString()}
      />
    </div>
  );
}