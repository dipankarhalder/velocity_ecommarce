import Link from "next/link";
import Image from "next/image";
import { Home, Larrow } from "@/components/icons";
import Products from "@/components/elements/products";
import { Checkbox } from "./checkbox";
import insideBanner from "../../../public/banner1.jpg";
import mb1 from "../../../public/mb1.jpg";
import mb2 from "../../../public/mb2.png";
import mb3 from "../../../public/mb3.jpeg";
import mb4 from "../../../public/mb4.jpg";
import mb5 from "../../../public/mb5.jpg";

type PageProps = {
  params: Promise<{ slug: string }>;
};

const motherboard = [
  { path: mb1, title: "ASRock", discount: "upto 20% off" },
  { path: mb2, title: "Gigabyte", discount: "upto 16% off" },
  { path: mb3, title: "MSI", discount: "upto 24% off" },
  { path: mb4, title: "ASUS", discount: "upto 30% off" },
  { path: mb5, title: "Nzxt", discount: "upto 10% off" },
];

const filterOptions = [
  {
    id: 1,
    name: "Manufacturer",
    children: [
      { id: 1, title: "Asus" },
      { id: 2, title: "Gigabyte" },
      { id: 3, title: "ASRock" },
      { id: 4, title: "MSI" },
      { id: 5, title: "Nzxt" },
      { id: 6, title: "Ant Esports" },
    ],
  },
  {
    id: 2,
    name: "Stock Status",
    children: [
      { id: 1, title: "In Stock" },
      { id: 2, title: "Out of Stock" },
    ],
  },
  {
    id: 3,
    name: "Platform",
    children: [
      { id: 1, title: "AMD" },
      { id: 2, title: "Intel" },
    ],
  },
  {
    id: 4,
    name: "Socket",
    children: [
      { id: 1, title: "All" },
      { id: 2, title: "AM4" },
      { id: 3, title: "AM5" },
      { id: 4, title: "LGA775" },
      { id: 5, title: "LGA1151" },
      { id: 6, title: "LGA1200" },
      { id: 7, title: "LGA1700" },
      { id: 8, title: "LGA1851" },
      { id: 9, title: "SP5 (LGA 6096)" },
    ],
  },
  {
    id: 5,
    name: "Chipset",
    children: [
      { id: 1, title: "A520" },
      { id: 2, title: "A620" },
      { id: 3, title: "B450" },
      { id: 4, title: "B550" },
      { id: 5, title: "B650" },
      { id: 6, title: "B760" },
      { id: 7, title: "B860" },
      { id: 8, title: "G41" },
      { id: 9, title: "H310" },
      { id: 10, title: "H510" },
      { id: 11, title: "H610" },
      { id: 12, title: "H14PA" },
      { id: 13, title: "Q270" },
      { id: 14, title: "X870" },
    ],
  },
  {
    id: 6,
    name: "Supported Memory Type",
    children: [
      { id: 1, title: "DDR3" },
      { id: 2, title: "DDR4" },
      { id: 3, title: "DDR5" },
    ],
  },
  {
    id: 7,
    name: "Form Factor",
    children: [
      { id: 1, title: "ATX" },
      { id: 2, title: "CEB" },
      { id: 3, title: "E-ATX" },
      { id: 4, title: "M-ATX" },
      { id: 5, title: "Micro-ATX" },
    ],
  },
];

const chipset = [
  { id: 16, title: "A320" },
  { id: 1, title: "A520" },
  { id: 2, title: "A620" },
  { id: 3, title: "B450" },
  { id: 4, title: "B550" },
  { id: 5, title: "B650" },
  { id: 15, title: "B660" },
  { id: 6, title: "B760" },
  { id: 7, title: "B860" },
  { id: 8, title: "G41" },
  { id: 9, title: "H310" },
  { id: 10, title: "H510" },
  { id: 11, title: "H610" },
  { id: 12, title: "H14PA" },
  { id: 13, title: "Q270" },
  { id: 14, title: "X870" },
];

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;

  return (
    <>
      <div className="app_inside_banner">
        <Image
          src={insideBanner}
          alt="inside banner"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{ objectFit: "contain" }}
        />
      </div>
      <div className="app_bradecumb">
        <ul>
          <li>
            <Home className="app_brd_home" />
            <Larrow className="app_brd_arrow" />
          </li>
          <li>{slug}</li>
        </ul>
      </div>

      <div className="app_main_page_content">
        <div className="app_sidebar_filter">
          <h5>Filter Products</h5>
          <div className="app_filter_inside">
            {filterOptions.map((item) => (
              <div className="app_filter_items" key={item.id}>
                <h6>{item.name}</h6>
                <ul>
                  {item.children.map((itm) => (
                    <Checkbox title={itm.title} key={itm.id} />
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="app_main_list_content_area">
          <h4>{slug}</h4>
          <div className="app_main_product_category">
            <h6>Shop by Brands</h6>
            <ul>
              {motherboard.map((item) => (
                <li key={item.title}>
                  <span>
                    <Image
                      src={item.path}
                      alt="inside banner"
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      style={{ objectFit: "contain" }}
                    />
                  </span>
                  <div className="app_text_head_dis">
                    <h4>{item.title}</h4>
                    <p>{item.discount}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="app_chipset_list_items">
            <h6>Shop by Chipsets</h6>
            <ul>
              {chipset.map((item) => (
                <li key={item.id}>
                  <Link href="/">
                    <p>{item.title}</p>
                    <Larrow />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <Products />
        </div>
      </div>
    </>
  );
}
