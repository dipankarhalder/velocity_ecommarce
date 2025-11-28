"use client";

import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperClass } from "swiper/types";
import { Navigation, A11y } from "swiper/modules";
import { Larrow, Rarrow } from "@/components/icons";
import { BrandCard } from "@/components/elements/shared/brandCard";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";

const brandItems = [
  {
    id: 1,
    image: "/cl1.jpg",
  },
  {
    id: 2,
    image: "/cl2.jpg",
  },
  {
    id: 3,
    image: "/cl3.jpg",
  },
  {
    id: 4,
    image: "/cl4.jpg",
  },
  {
    id: 5,
    image: "/cl5.jpg",
  },
  {
    id: 6,
    image: "/cl6.jpg",
  },
  {
    id: 7,
    image: "/cl7.jpg",
  },
  {
    id: 8,
    image: "/cl8.jpg",
  },
  {
    id: 9,
    image: "/cl9.jpg",
  },
  {
    id: 10,
    image: "/cl10.jpg",
  },
];

export const Brands = () => {
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
    <div className="app_brands_cover" aria-labelledby="brand-heading">
      <div className="app_carousel_brand_heading">
        <h2 id="brand-heading" className="app_heading_info">
          Explore Brands
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
      <div className="app_list_of_brand_item">
        <Swiper
          modules={[Navigation, A11y]}
          spaceBetween={18}
          slidesPerView={8}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
          onSlideChange={handleSlideChange}
          aria-roledescription="carousel"
        >
          {brandItems.map((item) => (
            <SwiperSlide key={item.id}>
              <BrandCard {...item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
