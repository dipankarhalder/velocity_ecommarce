"use client";

import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperClass } from "swiper/types";
import { Navigation, A11y } from "swiper/modules";
import { Larrow, Rarrow } from "@/components/icons";
import { ProductCard } from "@/components/elements/shared/productCard";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";

interface Product {
  id: number;
  slug: string;
  name: string;
  image: string;
  price: number;
  discount: number;
}

const products: Product[] = [
  {
    id: 1,
    slug: "processor",
    name: "AMD Ryzen 7 5800X Processor",
    image: "/p1.jpg",
    price: 41650,
    discount: 4,
  },
  {
    id: 2,
    slug: "storage",
    name: "Crucial P3 Plus 1TB NVMe Gen4 Internal SSD",
    image: "/p2.jpg",
    price: 14900,
    discount: 7,
  },
  {
    id: 3,
    slug: "memory",
    name: "ASUS Dual RTX 5060 OC 8GB GDDR7 Graphics Card",
    image: "/p3.jpg",
    price: 81250,
    discount: 22,
  },
  {
    id: 4,
    slug: "memory",
    name: "Dawg Y 990 ARGB E-ATX Mid Tower Case with Pre-installed",
    image: "/p4.jpg",
    price: 141650,
    discount: 20,
  },
  {
    id: 5,
    slug: "cabinate",
    name: "CyberPower UT2200E 2200VA UPS",
    image: "/p5.jpg",
    price: 49990,
    discount: 18,
  },
  {
    id: 6,
    slug: "memory",
    name: "ZOTAC RTX 5060 Solo 8GB GDDR7 Graphics Card",
    image: "/p6.jpg",
    price: 38999,
    discount: 30,
  },
  {
    id: 7,
    slug: "memory",
    name: "MSI RTX 5060 Inspire 2X OC 8GB GDDR7 Graphics Card",
    image: "/p7.jpg",
    price: 41650,
    discount: 19,
  },
  {
    id: 8,
    slug: "memory",
    name: "ASUS Dual RTX 5060 OC 8GB GDDR7 Graphics Card",
    image: "/p3.jpg",
    price: 9540,
    discount: 9,
  },
  {
    id: 9,
    slug: "cabinate",
    name: "Dawg Y 990 ARGB E-ATX Mid Tower Case with Pre-installed",
    image: "/p4.jpg",
    price: 19790,
    discount: 17,
  },
];

export const BestSellingProducts = () => {
  const swiperRef = useRef<SwiperClass | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const handleSlideChange = () => {
    if (swiperRef.current) {
      setIsBeginning(swiperRef.current.isBeginning);
      setIsEnd(swiperRef.current.isEnd);
    }
  };

  return (
    <div className="app_carousel_cover" aria-labelledby="bestsellers-heading">
      <div className="app_carousel_heading">
        <h2 id="bestsellers-heading" className="app_heading_info">
          Best Selling Products
        </h2>
        <div className="app_heading_btn_arrow">
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            disabled={isBeginning}
          >
            <Rarrow />
          </button>
          <button
            onClick={() => swiperRef.current?.slideNext()}
            disabled={isEnd}
          >
            <Larrow />
          </button>
        </div>
      </div>
      <div className="app_list_of_product_item">
        <Swiper
          modules={[Navigation, A11y]}
          spaceBetween={18}
          slidesPerView={6}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
          onSlideChange={handleSlideChange}
          aria-roledescription="carousel"
        >
          {products.map((item) => (
            <SwiperSlide key={item.id}>
              <ProductCard {...item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
