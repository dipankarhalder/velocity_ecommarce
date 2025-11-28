import Image from "next/image";
import advt1 from "@/public/lad-1.jpg";
import advt2 from "@/public/lad-2.jpg";

export const Advtshalf = () => {
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
