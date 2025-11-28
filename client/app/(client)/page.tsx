import { MainBanner } from "@/components/elements/home/mainBanner";
import { CategoryItem } from "@/components/elements/home/categoryItem";
import { BestSellingProducts } from "@/components/elements/home/bestSelling";
import { FullAdvt } from "@/components/elements/home/fullAdvt";
import { Advthalf } from "@/components/elements/home/advthalf";
import { PopularCategory } from "@/components/elements/home/popularCategory";
import { AdvtThird } from "@/components/elements/home/advtthird";
import { Advtforth } from "@/components/elements/home/advtforth";
import { BestMonitor } from "@/components/elements/home/bestMonitor";
import { Brands } from "@/components/elements/home/brands";
import { Advtshalf } from "@/components/elements/home/advtshalf";
import keyAdvt from "@/public/keyboardAdd.jpg";
import keyAdvtnew from "@/public/advmacitem.jpg";

export default function Home() {
  return (
    <>
      <MainBanner />
      <CategoryItem />
      <Advtforth />
      <FullAdvt imagepath={keyAdvt} imagealt={"Redragon keyboards"} />
      <BestSellingProducts />
      <Advthalf />
      <PopularCategory />
      <AdvtThird />
      <FullAdvt imagepath={keyAdvtnew} imagealt={"Macbook user"} />
      <BestMonitor />
      <Brands />
      <Advtshalf />
    </>
  );
}
