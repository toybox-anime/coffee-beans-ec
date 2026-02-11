// src/store/cartStore.ts
import { create } from 'zustand';
import { CoffeeBean } from '@/lib/data';

type CartStore = {
  cart: CoffeeBean[];
  addToCart: (bean: CoffeeBean) => void;
  removeFromCart: (index: number) => void; // 👈 削除機能を追加
  clearCart: () => void;                   // 👈 全クリア機能を追加
};

export const useCartStore = create<CartStore>((set) => ({
  cart: [],
  addToCart: (bean) => set((state) => ({ cart: [...state.cart, bean] })),
  
  // 指定されたインデックスの商品だけを取り除く
  removeFromCart: (index) => set((state) => ({
    cart: state.cart.filter((_, i) => i !== index)
  })),
  
  // カートを空の配列に戻す
  clearCart: () => set({ cart: [] }),
}));