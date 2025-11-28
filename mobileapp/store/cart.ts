import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type CartItem = {
  id: number;
  title: string;
  price: string;
  mainPrice?: string;
  imgUrl: any;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (id: number) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  clearCart: () => void;
  getTotalCount: () => number;
  hydrate: () => Promise<void>;
};

export const useCartStore = create<CartState>((set, get) => ({
  items: [],

  addToCart: (item) => {
    const items = get().items;
    const existing = items.find((i) => i.id === item.id);
    let updated;
    if (existing) {
      updated = items.map((i) =>
        i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
      );
    } else {
      updated = [...items, { ...item, quantity: 1 }];
    }
    set({ items: updated });
    AsyncStorage.setItem("cartItems", JSON.stringify(updated));
  },

  removeFromCart: (id) => {
    const updated = get().items.filter((i) => i.id !== id);
    set({ items: updated });
    AsyncStorage.setItem("cartItems", JSON.stringify(updated));
  },

  increaseQuantity: (id) => {
    const updated = get().items.map((i) =>
      i.id === id ? { ...i, quantity: i.quantity + 1 } : i
    );
    set({ items: updated });
    AsyncStorage.setItem("cartItems", JSON.stringify(updated));
  },

  decreaseQuantity: (id) => {
    const updated = get()
      .items.map((i) => (i.id === id ? { ...i, quantity: i.quantity - 1 } : i))
      .filter((i) => i.quantity > 0);
    set({ items: updated });
    AsyncStorage.setItem("cartItems", JSON.stringify(updated));
  },

  clearCart: () => {
    set({ items: [] });
    AsyncStorage.removeItem("cartItems");
  },

  getTotalCount: () => {
    return get().items.reduce((acc, item) => acc + item.quantity, 0);
  },

  hydrate: async () => {
    const saved = await AsyncStorage.getItem("cartItems");
    if (saved) {
      set({ items: JSON.parse(saved) });
    }
  },
}));
