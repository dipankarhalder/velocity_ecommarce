'use client';

import React from "react";
import { useParams } from 'next/navigation';
import Image from "next/image";
import products from "@/data/products.json";

interface Product {
  id: number;
  slug: string;
  name: string;
  image: string;
  price: number;
  discount: number;
  rating: number;
  reviewsCount: number;
  stock: number;
  description: string;
  specifications: object;
}

export default function ProductDetails() {
  const params = useParams();
  const productId = Number(params.id);
  const productSlug = params.slug;
  const product: Product | undefined = products.find(
    (p) => p.id === productId && p.slug === productSlug
  );

  if (!product) {
    return <div className="error">Product not found.</div>;
  }

  const discountedPrice = product.price - (product.price * product.discount) / 100;

  return (
    <div className="product_details_container">
      <div className="product_image_container">
        <Image src={product.image} alt={product.name} width={500} height={500} />
      </div>
      <div className="product_info_container">
        <h1>{product.name}</h1>
        <div className="rating">
          ⭐ {product.rating} / 5 ({product.reviewsCount} reviews)
        </div>
        <div className="price_block">
          <p className="price">Rs. {discountedPrice.toFixed(2)}</p>
          {product.discount > 0 && (
            <p className="original_price">
              MRP: <s>Rs. {product.price.toFixed(2)}</s> ({product.discount}% OFF)
            </p>
          )}
        </div>
        <p className={product.stock > 0 ? "in_stock" : "out_of_stock"}>
          {product.stock > 0 ? `In Stock (${product.stock} left)` : "Out of Stock"}
        </p>
        {product.stock > 0 && (
          <button className="cart_button">Add to Cart</button>
        )}
        <div className="description">
          <h3>Product Description</h3>
          <p>{product.description}</p>
        </div>
        <div className="specifications">
          <h3>Specifications</h3>
          <ul>
            {Object.entries(product.specifications).map(([key, value]) => (
              <li key={key}>
                <strong>{key}:</strong> {value}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
