import React from "react";
import products from "@/data/products.json";
import { ProductCard } from "@/components/elements/shared/productCard";

export default function Products() {
  return (
    <div className="app_main_product_list_container">
      <h2 id="bestsellers-heading" className="app_heading_info">
        Best Selling Products
      </h2>
      <div className="app_product_list_wrapper">
        {products.map((item) => (
          <ProductCard key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
}
