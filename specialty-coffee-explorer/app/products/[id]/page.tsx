// src/app/products/[id]/page.tsx
import Image from "next/image";
import { getProductById } from "@/lib/products";
import AddToCartButton from "@/components/AddToCartButton";
import Link from "next/link";
import { notFound } from "next/navigation";

// 商品はDBから取得するため、リクエストごとに描画する
export const dynamic = "force-dynamic";

// Next.jsのルール：params は Promise型として受け取ります（v15以降）
export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // URLの { id } を取得
  const { id } = await params;

  // DBから、IDが一致するコーヒー豆を探す
  const bean = await getProductById(id);

  // もし豆が見つからなかったら、404ページを表示する
  if (!bean) {
    notFound();
  }

  return (
    <main className="p-10 max-w-4xl mx-auto min-h-screen">
      {/* パンくずリスト的なナビゲーション */}
      <Link href="/" className="text-gray-500 hover:text-amber-800 mb-8 inline-block">
        ← 商品一覧に戻る
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white p-8 rounded-2xl shadow-sm">
        
        {/* 左側：商品画像 */}
        <div className="relative h-80 w-full rounded-xl overflow-hidden bg-gray-100">
          <Image
            src={bean.imageUrl}
            alt={bean.name}
            fill
            className="object-cover"
            priority // 詳細ページはすぐに表示したいので優先読み込み
          />
        </div>

        {/* 右側：商品情報 */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{bean.name}</h1>
          <p className="text-amber-700 font-bold text-2xl mb-4">¥{bean.price.toLocaleString()}</p>
          
          <div className="space-y-4 mb-8">
            <div className="flex border-b border-gray-100 pb-2">
              <span className="font-bold w-24 text-gray-500">産地</span>
              <span>{bean.origin}</span>
            </div>
            <div className="flex border-b border-gray-100 pb-2">
              <span className="font-bold w-24 text-gray-500">焙煎度</span>
              <span>{bean.roast}</span>
            </div>
            <div className="flex border-b border-gray-100 pb-2">
              <span className="font-bold w-24 text-gray-500">特徴</span>
              <div className="flex gap-2">
                {bean.flavorNotes.map(note => (
                  <span key={note} className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full">
                    {note}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <p className="text-gray-600 leading-relaxed mb-8">
            {bean.description ??
              `${bean.origin}産の${bean.roast}。${bean.flavorNotes.join("、")}のような風味が特徴の一杯です。`}
          </p>

          {/* カートに追加ボタン（再利用！） */}
          <AddToCartButton bean={bean} />
        </div>
      </div>
    </main>
  );
}