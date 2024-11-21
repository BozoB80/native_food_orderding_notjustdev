import { createContext, PropsWithChildren, useContext, useState } from "react";
import { CartItem } from "../types";
import { randomUUID } from "expo-crypto";
import { Tables } from "@/database.types";
import { useRouter } from "expo-router";
import { useCreateOrder, useCreateOrderItems } from "@/queries";

type Product = Tables<"products">;

type CartType = {
  items: CartItem[];
  addItem: (product: Product, size: CartItem["size"]) => void;
  updateQuantity: (itemId: string, amount: -1 | 1) => void;
  total: number;
  checkout: () => void;
};

export const CartContext = createContext<CartType>({
  items: [],
  addItem: () => {},
  updateQuantity: () => {},
  total: 0,
  checkout: () => {},
});

const CartProvider = ({ children }: PropsWithChildren) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const router = useRouter();
  const { mutate: createOrder } = useCreateOrder((data) => {
    setItems([]);
    router.push(`/(user)/orders/${data.id}`);
  });
  const { mutate: createOrderItems } = useCreateOrderItems((data) => {
    setItems([]);
  });

  const addItem = (product: Product, size: CartItem["size"]) => {
    // if already in cart, increase quantity
    const existingItem = items.find(
      (item) => item.product === product && item.size === size
    );

    if (existingItem) {
      updateQuantity(existingItem.id, 1);
      return;
    }

    const newCartItem: CartItem = {
      id: randomUUID(),
      product,
      product_id: product.id,
      size,
      quantity: 1,
    };

    setItems([newCartItem, ...items]);
  };

  const updateQuantity = (itemId: string, amount: -1 | 1) => {
    const updatedItems = items
      .map((item) =>
        item.id !== itemId
          ? item
          : {
              ...item,
              quantity: item.quantity + amount,
            }
      )
      .filter((item) => item.quantity > 0);
    setItems(updatedItems);
  };

  const total = Number(
    items
      .reduce((acc, item) => acc + item.product.price * item.quantity, 0)
      .toFixed(2)
  );

  const checkout = () => {
    createOrder(
      {
        total,
      },
      {
        onSuccess: saveOrderItems,
      }
    );
  };

  const saveOrderItems = (order: Tables<"orders">) => {
    const orderItems = items.map((item) => ({
      product_id: item.product_id,
      size: item.size,
      quantity: item.quantity,
      order_id: order.id,
    }));

    createOrderItems(orderItems);
  };

  return (
    <CartContext.Provider
      value={{ items, addItem, updateQuantity, total, checkout }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;

export const useCart = () => useContext(CartContext);
