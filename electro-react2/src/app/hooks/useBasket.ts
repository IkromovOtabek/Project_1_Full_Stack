import { useState } from "react";
import { CardItem } from "../../lib/types/search";

const useBasket = () => {
  const readCart = (): CardItem[] => {
    const cartJson: string | null = localStorage.getItem("cartData");
    if (!cartJson) return [];
    try {
      const parsed = JSON.parse(cartJson);
      const normalized = Array.isArray(parsed)
        ? // Oldingi bugdan qolgan ichma-ich array holatini tekislaymiz.
          parsed.flat(1)
        : [];
      return normalized.filter(
        (item: CardItem) => item && typeof item._id === "string",
      );
    } catch {
      return [];
    }
  };

  const [cartItems, setCartItems] = useState<CardItem[]>(readCart());

  const onAdd = (input: CardItem) => {
    const exist: any = cartItems.find(
      (item: CardItem) => item._id === input._id,
    );
    if (exist) {
      const cartUpdate = cartItems.map((item: CardItem) =>
        item._id === input._id
          ? { ...exist, quantity: exist.quantity + 1 }
          : item,
      );
      setCartItems(cartUpdate);
      localStorage.setItem("cartData", JSON.stringify(cartUpdate));
    } else {
      const cartUpdate = [...cartItems, { ...input }];
      setCartItems(cartUpdate);
      localStorage.setItem("cartData", JSON.stringify(cartUpdate));
    }
  };

  const onRemove = (input: CardItem) => {
    const exist: any = cartItems.find(
      (item: CardItem) => item._id === input._id,
    );
    if (exist.quantity === 1) {
      const cartUpdate = cartItems.filter(
        (item: CardItem) => item._id !== input._id,
      );
      setCartItems(cartUpdate);
      localStorage.setItem("cartData", JSON.stringify(cartUpdate));
    } else {
      const cartUpdate = cartItems.map((item: CardItem) =>
        item._id === input._id
          ? { ...exist, quantity: exist.quantity - 1 }
          : item,
      );
      setCartItems(cartUpdate);
      localStorage.setItem("cartData", JSON.stringify(cartUpdate));
    }
  };

  const onDelete = (input: CardItem) => {
    const cartUpdate = cartItems.filter(
      (item: CardItem) => item._id !== input._id,
    );
    setCartItems(cartUpdate);
    localStorage.setItem("cartData", JSON.stringify(cartUpdate));
  };

  const onDeleteAll = () => {
    setCartItems([]);
    localStorage.removeItem("cartData");
  };
 
  return {
    cartItems,
    onAdd,
    onRemove,
    onDelete,
    onDeleteAll,
  };
};

export default useBasket;
