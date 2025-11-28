import Image from "next/image";
import type { StaticImageData } from "next/image";

interface AdvtProp {
  imagepath: string | StaticImageData;
  imagealt: string;
}

export const FullAdvt = ({ imagepath, imagealt }: AdvtProp) => {
  return (
    <div className="app_full_advt">
      <Image src={imagepath} alt={imagealt} />
    </div>
  );
};
