import { create } from "zustand";
import { Product } from "@prisma/client";

import { OrderItem } from "./types";

interface Store {
  order: OrderItem[];
  addToOrder: (product: Product) => void;
  increaseQuantity: (id: Product["id"]) => void;
  decreaseQuantity: (id: Product["id"]) => void;
  removeItem: (id: Product["id"]) => void;
  clearStore: () => void;
}

export const useStore = create<Store>((set, get) => ({
  order: [],
  addToOrder: (product): void => {
    const { categoryId, image, ...data } = product;
    let order: OrderItem[] = [];

    if (get().order.find((i): boolean => i.id === product.id)) {
      order = get().order.map(
        (i): OrderItem =>
          i.id === product.id
            ? {
                ...i,
                quantity: i.quantity + 1,
                subtotal: i.price * (i.quantity + 1),
              }
            : i
      );
    } else {
      order = [
        ...get().order,
        {
          ...data,
          quantity: 1,
          subtotal: 1 * product.price,
        },
      ];
    }

    set((_) => ({
      order,
    }));
  },
  increaseQuantity(id: number): void {
    set((state) => ({
      order: state.order.map(
        (i): OrderItem =>
          i.id === id
            ? {
                ...i,
                quantity: i.quantity + 1,
                subtotal: i.price * (i.quantity + 1),
              }
            : i
      ),
    }));
  },
  decreaseQuantity(id): void {
    const order = get().order.map(
      (i): OrderItem =>
        i.id === id
          ? {
              ...i,
              quantity: i.quantity - 1,
              subtotal: i.price * (i.quantity - 1)
            }
          : i
    );

    set(() => ({
      order,
    }));
  },
  removeItem(id): void {
    set((state) => ({
      order: state.order.filter((i): boolean => i.id !== id)
    }));
  },
  clearStore(): void {
    set(() => ({
      order: [],
    }));
  }
}));
