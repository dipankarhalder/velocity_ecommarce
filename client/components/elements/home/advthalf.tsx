import Image from "next/image";
import advt1 from "@/public/ads-2.jpg";
import advt2 from "@/public/ads-1.jpg";

export const Advthalf = () => {
  return (
    <div className="app_half_advt">
      <div className="app_half_img_advt">
        <Image src={advt1} alt="mac advert new" />
      </div>
      <div className="app_half_img_advt">
        <Image src={advt2} alt="mac advert new" />
      </div>
    </div>
  );
};
