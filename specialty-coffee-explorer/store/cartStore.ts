// src/store/cartStore.ts
import { create } from 'zustand';
import { CoffeeBean } from '@/lib/data';

// ① Storeの型定義（JavaのInterfaceのようなもの）
type CartStore = {
  cart: CoffeeBean[]; // カートの中身（配列）
  addToCart: (bean: CoffeeBean) => void; // カートに追加する関数
};

// ② Storeの作成（シングルトンインスタンスの生成）
export const useCartStore = create<CartStore>((set) => ({
  cart: [], // 初期値は空の配列
  
  // 既存のカート状態（state.cart）を展開し、新しい豆（bean）を末尾に追加する
  addToCart: (bean) => set((state) => ({ 
    cart: [...state.cart, bean] 
  })),
}));