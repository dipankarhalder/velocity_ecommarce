import Image from "next/image";
import dg1 from "@/public/dg1.jpg";
import dg2 from "@/public/dg2.jpg";
import dg3 from "@/public/dg3.jpg";

export const AdvtThird = () => {
  return (
    <div className="app_half_advt">
      <div className="app_half_img_advt_third">
        <Image src={dg1} alt="mac advert new" />
      </div>
      <div className="app_half_img_advt_third">
        <Image src={dg2} alt="mac advert new" />
      </div>
      <div className="app_half_img_advt_third">
        <Image src={dg3} alt="mac advert new" />
      </div>
    </div>
  );
};
