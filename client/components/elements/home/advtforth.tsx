"use client";

import Image from "next/image";
import cp1 from "@/public/cat_advt_1.jpg";
import cp2 from "@/public/cat_advt_2.jpg";
import cp3 from "@/public/cat_advt_3.jpg";
import cp4 from "@/public/cat_advt_4.jpg";

export const Advtforth = () => {
  return (
    <div className="app_half_advt">
      <div className="app_half_img_advt_forth">
        <Image src={cp1} alt="mac advert new" />
      </div>
      <div className="app_half_img_advt_forth">
        <Image src={cp2} alt="mac advert new" />
      </div>
      <div className="app_half_img_advt_forth">
        <Image src={cp3} alt="mac advert new" />
      </div>
      <div className="app_half_img_advt_forth">
        <Image src={cp4} alt="mac advert new" />
      </div>
    </div>
  );
};
