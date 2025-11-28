"use client";

import { useState } from "react";

interface AddToCartButtonProps {
  productName: string;
  itemSelected?: number;
}

export const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  productName,
  itemSelected,
}) => {
  const [quantity, setQuantity] = useState(itemSelected || 0);

  const handleAdd = () => {
    setQuantity(1);
  };

  const increase = () => {
    setQuantity((prev) => (prev < 6 ? prev + 1 : prev));
  };

  const decrease = () => {
    setQuantity((prev) => {
      const newQty = prev - 1;
      return newQty <= 0 ? 0 : newQty;
    });
  };

  return (
    <div className="app_btn_add" aria-label={`Cart actions for ${productName}`}>
      {quantity === 0 ? (
        <button onClick={handleAdd} aria-label={`Add ${productName} to cart`}>
          Add
        </button>
      ) : (
        <div
          className="app_btn_quantity"
          role="group"
          aria-label={`Quantity selector for ${productName}`}
        >
          <button
            onClick={decrease}
            aria-label={`Decrease quantity of ${productName}`}
          >
            -
          </button>
          <span aria-live="polite" aria-atomic="true">
            {quantity}
          </span>
          <button
            onClick={increase}
            aria-label={`Increase quantity of ${productName}`}
            disabled={quantity >= 6}
            title={
              quantity >= 6
                ? "Maximum limit reached"
                : `Increase ${productName}`
            }
          >
            +
          </button>
        </div>
      )}
    </div>
  );
};
