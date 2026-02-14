// src/app/not-found.tsx
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-stone-100 text-center p-4">
      <h2 className="text-6xl font-bold text-stone-300 mb-4">404</h2>
      <p className="text-2xl font-bold text-gray-700 mb-2">ページが見つかりません</p>
      <p className="text-gray-500 mb-8">お探しのコーヒー豆は、すでに飲み干されたかもしれません。</p>
      
      <Link 
        href="/" 
        className="bg-amber-800 text-white px-6 py-3 rounded-full font-bold hover:bg-amber-900 transition"
      >
        トップページに戻る
      </Link>
    </div>
  );
}