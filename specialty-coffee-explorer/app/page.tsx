// src/app/page.tsx
import { mockCoffeeBeans } from '@/lib/data';
import Search from '@/components/Search';
import AddToCartButton from '@/components/AddToCartButton';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const params = await searchParams;
  const query = params?.q || '';

  const filteredBeans = mockCoffeeBeans.filter((bean) => {
    return bean.name.includes(query) || bean.origin.includes(query);
  });

  return (
    <main className="p-10 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-amber-800 mb-8">
        ☕ Specialty Coffee Explorer
      </h1>

      <Search />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredBeans.map((bean) => (
          <div
            key={bean.id}
            className="border border-amber-200 p-5 rounded-xl shadow-sm hover:shadow-md transition"
          >
            <h2 className="text-xl font-bold text-gray-800">{bean.name}</h2>

            <div className="text-sm text-gray-600 mt-2 space-y-1">
              <p>📍 産地: {bean.origin}</p>
              <p>🔥 焙煎: {bean.roast}</p>
            </div>

            <p className="text-amber-700 font-bold mt-4 text-lg">
              ¥{bean.price.toLocaleString()}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {bean.flavorNotes.map((note) => (
                <span
                  key={note}
                  className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full"
                >
                  {note}
                </span>
              ))}
            </div>

            <AddToCartButton bean={bean} />
          </div>
        ))}

        {filteredBeans.length === 0 && (
          <p className="text-gray-500 col-span-3">
            一致するコーヒー豆が見つかりませんでした。
          </p>
        )}
      </div>
    </main>
  );
}