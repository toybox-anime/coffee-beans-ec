// 商品の型。DB(Prisma Product)の形と一致させている
export type CoffeeBean = {
  id: string;
  name: string;
  price: number;
  origin: string;
  roast: string;
  flavorNotes: string[];
  imageUrl: string;
  description: string | null;
};
