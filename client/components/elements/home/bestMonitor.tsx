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
    slug: "monitor",
    name: "Asus ProArt Display PA247CV Prof Monitor",
    image: "/m1.jpg",
    price: 41650,
    discount: 4,
  },
  {
    id: 2,
    slug: "monitor",
    name: "Asus VZ24EHE 24 Inch Professional Monitor",
    image: "/m2.jpg",
    price: 14900,
    discount: 7,
  },
  {
    id: 3,
    slug: "monitor",
    name: "AOC 27G4E 27 Inch Gaming Monitor",
    image: "/m3.jpg",
    price: 81250,
    discount: 10,
  },
  {
    id: 4,
    slug: "monitor",
    name: "AOC 22B30HM2 22 Inch Prof Monitor",
    image: "/m4.jpg",
    price: 141650,
    discount: 0,
  },
  {
    id: 5,
    slug: "monitor",
    name: "AOC 24B30HM2 24 Inch Prof Monitor",
    image: "/m5.jpg",
    price: 49990,
    discount: 18,
  },
  {
    id: 6,
    slug: "monitor",
    name: "Asus Rog Strix XG27ACS 27 - Inch 4K Monitor",
    image: "/m6.jpg",
    price: 38999,
    discount: 30,
  },
  {
    id: 7,
    slug: "monitor",
    name: "Asus TUF Gaming VG34VQL 34 Inch Curved Monitor",
    image: "/m7.jpg",
    price: 41650,
    discount: 0,
  },
  {
    id: 8,
    slug: "monitor",
    name: "Asus VZ24EHE 24 Inch Professional Monitor",
    image: "/m3.jpg",
    price: 9540,
    discount: 9,
  },
  {
    id: 9,
    slug: "monitor",
    name: "AOC 22B30HM2 22 Inch Prof Monitor",
    image: "/m4.jpg",
    price: 19790,
    discount: 17,
  },
];

export const BestMonitor = () => {
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
          Best Monitors
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
