// src/components/Search.tsx
"use client"; // 🚨 超重要：これはブラウザ側で動くコンポーネントであるという宣言

import { useRouter, useSearchParams, usePathname } from 'next/navigation';

export default function Search() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // 文字が入力されたら呼ばれる関数
  const handleSearch = (term: string) => {
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
    <div className="mb-8">
      <input
        type="text"
        placeholder="コーヒー豆の名前や産地で検索..."
        className="w-full max-w-md p-3 border border-amber-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get('q')?.toString()}
      />
    </div>
  );
}