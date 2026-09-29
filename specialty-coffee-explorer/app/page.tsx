import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import AddToCartButton from "@/components/AddToCartButton";
import Search from "@/components/Search";
import { getProducts } from "@/lib/products";

// 商品はDBから取得するため、リクエストごとに描画する
export const dynamic = "force-dynamic";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const filteredBeans = await getProducts(q);

  return (
    <main className="p-10 max-w-5xl mx-auto min-h-screen">
      <h1 className="text-4xl font-bold text-amber-900 mb-8 text-center drop-shadow-sm">
        ☕ Specialty Coffee Explorer
      </h1>

      {/* 検索ボックスエリア */}
      <div className="mb-10 flex justify-center">
        <Suspense>
          <Search />
        </Suspense>
      </div>

      {/* 商品一覧エリア */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredBeans.map((bean) => (
          <div
            key={bean.id}
            className="group border border-amber-100 bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
          >
            {/* 🖼️ ここが画像エリア（Next/Image） */}
            <div className="relative h-56 w-full bg-gray-100 overflow-hidden">
              <Image
                src={bean.imageUrl}
                alt={bean.name}
                fill // 親要素に合わせて画像をいっぱいに広げる設定
                className="object-cover group-hover:scale-110 transition-transform duration-500" // ホバー時にズームするアニメーション
              />
            </div>

            {/* 商品情報エリア */}
            <div className="p-6 flex flex-col flex-grow">
              <div className="flex justify-between items-start mb-2">
                <Link href={`/products/${bean.id}`} className="flex-1">
                  <h2 className="text-xl font-bold text-gray-800 hover:text-amber-700 transition line-clamp-1">
                    {bean.name}
                  </h2>
                </Link>
                <span className="bg-amber-100 text-amber-800 text-xs font-bold px-2 py-1 rounded-full ml-2 whitespace-nowrap">
                  {bean.roast}
                </span>
              </div>

              <p className="text-sm text-gray-500 mb-4 flex items-center gap-1">
                <span>📍</span> {bean.origin}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {bean.flavorNotes.map((note) => (
                  <span
                    key={note}
                    className="text-xs border border-amber-200 text-amber-700 px-2 py-1 rounded-md"
                  >
                    {note}
                  </span>
                ))}
              </div>

              {/* 価格とカートボタン */}
              <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100">
                <p className="text-amber-900 font-bold text-xl">
                  ¥{bean.price.toLocaleString()}
                </p>
                <AddToCartButton bean={bean} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 検索結果が0件だった場合の表示 */}
      {filteredBeans.length === 0 && (
        <div className="text-center py-20">
          <p className="text-gray-400 text-lg">
            該当するコーヒー豆が見つかりませんでした... 😢
          </p>
        </div>
      )}
    </main>
  );
}