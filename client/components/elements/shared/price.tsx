interface PriceProps {
  price: number;
  discount: number;
}

export const Price: React.FC<PriceProps> = ({ price, discount }) => {
  const discountedPrice = price * (1 - discount / 100);

  return (
    <div aria-label={`Price with discount`} className="app_product_price_sec">
      <p>
        <s aria-hidden="true">
          {price.toLocaleString("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0,
          })}
        </s>
      </p>
      <p>
        <strong>
          {discountedPrice.toLocaleString("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0,
          })}
        </strong>
      </p>
    </div>
  );
};
