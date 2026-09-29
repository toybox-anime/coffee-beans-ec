import { prisma } from "@/lib/prisma";
import type { CoffeeBean } from "@/lib/types";

// 名前・産地・焙煎度・風味タグのいずれかに部分一致した商品を返す
export async function getProducts(query?: string): Promise<CoffeeBean[]> {
  const q = query?.trim();
  return prisma.product.findMany({
    where: q
      ? {
          OR: [
            { name: { contains: q, mode: "insensitive" } },
            { origin: { contains: q, mode: "insensitive" } },
            { roast: { contains: q, mode: "insensitive" } },
            { flavorNotes: { has: q } },
          ],
        }
      : undefined,
    orderBy: { createdAt: "asc" },
  });
}

export async function getProductById(id: string): Promise<CoffeeBean | null> {
  return prisma.product.findUnique({ where: { id } });
}
