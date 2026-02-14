// src/components/AddToCartButton.tsx
"use client";

import { useCartStore } from "@/store/cartStore";
import { CoffeeBean } from "@/lib/data";
import toast from "react-hot-toast";

export default function AddToCartButton({ bean }: { bean: CoffeeBean }) {
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddToCart = () => {
    try {
      addToCart(bean);
      toast.success(`${bean.name}をカートに追加しました！`);
    } catch (error) {
      toast.error("カートへの追加に失敗しました");
    }
  };

  return (
    <button
      onClick={handleAddToCart}
      className="bg-amber-800 text-white text-sm font-bold px-4 py-2 rounded-full hover:bg-amber-900 active:scale-95 transition shadow-sm hover:shadow-md"
    >
      カートに入れる
    </button>
  );
}