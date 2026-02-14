import { z } from 'zod';
import { CoffeeBean } from './data';

// ✅ CoffeeBean のバリデーションスキーマ
export const CoffeeBeanSchema = z.object({
  id: z.string().min(1, 'ID is required'),
  name: z.string().min(1, 'Name is required'),
  price: z.number().int().positive('Price must be positive'),
  origin: z.string().min(1, 'Origin is required'),
  roast: z.string().min(1, 'Roast is required'),
  flavorNotes: z.array(z.string()),
  imageUrl: z.string().url('Invalid image URL'),
});

// ✅ カート内容のバリデーションスキーマ
export const CartItemSchema = z.object({
  bean: CoffeeBeanSchema,
  quantity: z.number().int().positive().optional().default(1),
});

// ✅ チェックアウト（決済）のバリデーションスキーマ
export const CheckoutInputSchema = z.object({
  cart: z.array(CoffeeBeanSchema).min(1, 'Cart cannot be empty'),
  totalAmount: z.number().int().positive('Total amount must be positive'),
});

export type CheckoutInput = z.infer<typeof CheckoutInputSchema>;
export type CartItem = z.infer<typeof CartItemSchema>;
