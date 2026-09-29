import { z } from 'zod';

// ✅ チェックアウトの入力。価格はクライアントを信用せず、商品IDだけを受け取る
export const CheckoutInputSchema = z.object({
  productIds: z.array(z.string().min(1)).min(1, 'Cart cannot be empty').max(50, 'Too many items'),
});

export type CheckoutInput = z.infer<typeof CheckoutInputSchema>;
