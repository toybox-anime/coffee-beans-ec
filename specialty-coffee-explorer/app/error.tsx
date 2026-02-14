// src/app/error.tsx
"use client";

import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-red-50 p-4">
      <div className="text-center max-w-md">
        <h2 className="text-4xl font-bold text-red-600 mb-4">⚠️ エラーが発生しました</h2>
        <p className="text-gray-700 mb-2">申し訳ありません。予期したエラーが発生しました。</p>
        <p className="text-gray-500 text-sm mb-8 bg-white p-4 rounded border border-red-200">
          {error.message || "原因不明のエラーが発生しました。"}
        </p>

        <div className="flex gap-4 justify-center">
          <button
            onClick={() => reset()}
            className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition font-bold"
          >
            再試行する
          </button>
          <Link
            href="/"
            className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition font-bold"
          >
            トップページに戻る
          </Link>
        </div>
      </div>
    </main>
  );
}
