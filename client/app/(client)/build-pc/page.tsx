import Image from "next/image";
import { AddToCartButton } from "@/components/elements/shared/addToCartButton";
import { truncateText } from "@/components/utils";
import {
  Home,
  Larrow,
  Processor,
  Motherboard,
  Memory,
  Monitor,
  Storage,
  Keyboard,
  Cabinate,
  Headphone,
  Ssd,
  Consoles,
  SuccssTick,
  Headphn,
  Mouse,
  Cooling,
  Print,
  Pads,
  PowerSupply,
} from "@/components/icons";
import insideBanner from "../../../public/banner1.jpg";
import s1 from "../../../public/s1.jpg";
import s2 from "../../../public/s2.jpg";
import s3 from "../../../public/s3.jpeg";
import s4 from "../../../public/s4.jpg";
import s5 from "../../../public/s5.jpg";
import s6 from "../../../public/s6.jpeg";
import s7 from "../../../public/s7.jpg";
import s8 from "../../../public/s8.jpg";
import s9 from "../../../public/s9.png";
import s10 from "../../../public/s10.jpg";
import s12 from "../../../public/s12.jpeg";
import s13 from "../../../public/s13.jpg";
import s14 from "../../../public/s14.jpg";
import s15 from "../../../public/s15.jpg";
import s16 from "../../../public/s13.jpg";
import mb1 from "../../../public/mbs1.jpg";
import mb2 from "../../../public/mb2.jpg";
import mb3 from "../../../public/mb3.jpg";
import mb4 from "../../../public/mb4.jpeg";
import mb5 from "../../../public/mb5.jpeg";
import mb6 from "../../../public/mb6.jpg";
import mb7 from "../../../public/mb7.jpg";
import mb8 from "../../../public/mb8.jpg";
import mb9 from "../../../public/mb9.jpeg";
import mb10 from "../../../public/mb10.jpg";
import mb11 from "../../../public/mb11.jpg";

const mainComponents = [
  {
    icon: Processor,
    label: "Processor",
    status: false,
  },
  {
    icon: Motherboard,
    label: "Motherboard",
    status: true,
  },
  {
    icon: Memory,
    label: "Memory",
    status: false,
  },
  {
    icon: Storage,
    label: "Storage",
    status: false,
  },
  {
    icon: Ssd,
    label: "SSD",
    status: false,
  },
  {
    icon: Storage,
    label: "Graphics Card",
    status: false,
  },
];

const displayComponents = [
  {
    icon: Monitor,
    label: "Monitor",
    status: true,
  },
  {
    icon: Keyboard,
    label: "Keyboard",
    status: false,
  },
  {
    icon: Mouse,
    label: "Mouse",
    status: false,
  },
  {
    icon: Cooling,
    label: "Cooling System",
    status: false,
  },
  {
    icon: PowerSupply,
    label: "Power Supply",
    status: false,
  },
  {
    icon: Cabinate,
    label: "Cabinate",
    status: false,
  },
];

const accessoriesComponents = [
  {
    icon: Headphone,
    label: "Earphone",
    status: false,
  },
  {
    icon: Headphn,
    label: "Headphone",
    status: false,
  },
  {
    icon: Pads,
    label: "Mouse Pad",
    status: false,
  },
  {
    icon: Consoles,
    label: "Game Console",
    status: false,
  },
  {
    icon: Print,
    label: "Printer",
    status: false,
  },
];

const motherboard = [
  {
    id: 1,
    name: "AMD Ryzen 7 5800X Processor",
    image: s1,
    price: 41650,
    discount: 4,
  },
  {
    id: 2,
    name: "Crucial P3 Plus 1TB NVMe Gen4 Internal SSD",
    image: s2,
    price: 14900,
    discount: 7,
    selected: true,
  },
  {
    id: 3,
    name: "ASUS Dual RTX 5060 OC 8GB GDDR7 Graphics Card",
    image: s3,
    price: 81250,
    discount: 22,
  },
  {
    id: 4,
    name: "Dawg Y 990 ARGB E-ATX Mid Tower Case with Pre-installed",
    image: s4,
    price: 141650,
    discount: 20,
  },
  {
    id: 5,
    name: "CyberPower UT2200E 2200VA UPS",
    image: s5,
    price: 49990,
    discount: 18,
  },
  {
    id: 6,
    name: "ZOTAC RTX 5060 Solo 8GB GDDR7 Graphics Card",
    image: s6,
    price: 38999,
    discount: 30,
  },
  {
    id: 7,
    name: "MSI RTX 5060 Inspire 2X OC 8GB GDDR7 Graphics Card",
    image: s7,
    price: 41650,
    discount: 19,
  },
  {
    id: 8,
    name: "ASUS Dual RTX 5060 OC 8GB GDDR7 Graphics Card",
    image: s8,
    price: 9540,
    discount: 9,
  },
  {
    id: 9,
    name: "Dawg Y 990 ARGB E-ATX Mid Tower Case with Pre-installed",
    image: s9,
    price: 19790,
    discount: 17,
  },
  {
    id: 10,
    name: "Dawg Y 990 ARGB E-ATX Mid Tower Case with Pre-installed",
    image: s10,
    price: 19790,
    discount: 17,
  },
  {
    id: 12,
    name: "Dawg Y 990 ARGB E-ATX Mid Tower Case with Pre-installed",
    image: s12,
    price: 19790,
    discount: 17,
  },
  {
    id: 13,
    name: "Dawg Y 990 ARGB E-ATX Mid Tower Case with Pre-installed",
    image: s13,
    price: 19790,
    discount: 17,
  },
  {
    id: 14,
    name: "Dawg Y 990 ARGB E-ATX Mid Tower Case with Pre-installed",
    image: s14,
    price: 19790,
    discount: 17,
  },
  {
    id: 15,
    name: "Dawg Y 990 ARGB E-ATX Mid Tower Case with Pre-installed",
    image: s15,
    price: 19790,
    discount: 17,
  },
  {
    id: 16,
    name: "Dawg Y 990 ARGB E-ATX Mid Tower Case with Pre-installed",
    image: s16,
    price: 19790,
    discount: 17,
  },
];

const monitors = [
  {
    id: 1,
    name: "AMD Ryzen 7 5800X Processor",
    image: mb1,
    price: 41650,
    discount: 4,
  },
  {
    id: 2,
    name: "Crucial P3 Plus 1TB NVMe Gen4 Internal SSD",
    image: mb2,
    price: 14900,
    discount: 7,
  },
  {
    id: 3,
    name: "ASUS Dual RTX 5060 OC 8GB GDDR7 Graphics Card",
    image: mb3,
    price: 81250,
    discount: 22,
  },
  {
    id: 4,
    name: "Dawg Y 990 ARGB E-ATX Mid Tower Case with Pre-installed",
    image: mb4,
    price: 141650,
    discount: 20,
  },
  {
    id: 5,
    name: "CyberPower UT2200E 2200VA UPS",
    image: mb5,
    price: 49990,
    discount: 18,
  },
  {
    id: 6,
    name: "ZOTAC RTX 5060 Solo 8GB GDDR7 Graphics Card",
    image: mb6,
    price: 38999,
    discount: 30,
  },
  {
    id: 7,
    name: "MSI RTX 5060 Inspire 2X OC 8GB GDDR7 Graphics Card",
    image: mb7,
    price: 41650,
    discount: 19,
    selected: true,
  },
  {
    id: 8,
    name: "ASUS Dual RTX 5060 OC 8GB GDDR7 Graphics Card",
    image: mb8,
    price: 9540,
    discount: 9,
  },
  {
    id: 9,
    name: "Dawg Y 990 ARGB E-ATX Mid Tower Case with Pre-installed",
    image: mb9,
    price: 19790,
    discount: 17,
  },
  {
    id: 10,
    name: "Dawg Y 990 ARGB E-ATX Mid Tower Case with Pre-installed",
    image: mb10,
    price: 19790,
    discount: 17,
  },
  {
    id: 11,
    name: "Dawg Y 990 ARGB E-ATX Mid Tower Case with Pre-installed",
    image: mb11,
    price: 19790,
    discount: 17,
  },
];

const selectedItems = [
  {
    id: 1,
    title: "Motherboard",
    items: [
      {
        id: 1,
        name: "Crucial P3 Plus 1TB NVMe Gen4 Internal SSD",
        image: s2,
        price: 14900,
        selected: true,
      },
    ],
  },
  {
    id: 2,
    title: "Monitor",
    items: [
      {
        id: 1,
        name: "MSI RTX 5060 Inspire 2X OC 8GB GDDR7 Graphics Card",
        image: mb7,
        price: 41650,
        selected: true,
      },
    ],
  },
];

export default function BuildPC() {
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
          <li>Build Your PC</li>
        </ul>
      </div>
      <div className="app_build_main_content_list">
        <div className="app_build_mian_area">
          <div className="app_category_build_item">
            <h5>Main Components</h5>
            <ul>
              {mainComponents.map(({ icon: Icon, label, status }) => (
                <li
                  key={label}
                  role="listitem"
                  aria-label={label}
                  className={status ? "active_item_list" : ""}
                >
                  <div className="app_left_side_build">
                    <Icon aria-hidden="true" focusable="false" />
                    <h6>{label}</h6>
                  </div>
                  {status && (
                    <div className="app_status_update">
                      <SuccssTick />
                    </div>
                  )}
                </li>
              ))}
            </ul>
            <div className="app_build_product_view_sec">
              <ul>
                {motherboard.map((item) => {
                  const discountedPrice =
                    item.price * (1 - item.discount / 100);

                  return (
                    <li
                      key={item.id}
                      className={item.selected ? "active_item" : ""}
                    >
                      <article
                        className="app_item_product_card"
                        role="group"
                        aria-label={`${item.name}, ${item.discount}% off`}
                      >
                        <figure>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            style={{ objectFit: "contain" }}
                          />
                        </figure>
                        <h3>{truncateText(item.name, 30)}</h3>
                        <div className="app_price_and_btn">
                          <div className="app_product_price_sec">
                            <p>
                              {discountedPrice.toLocaleString("en-IN", {
                                style: "currency",
                                currency: "INR",
                                maximumFractionDigits: 0,
                              })}
                            </p>
                          </div>
                          <AddToCartButton productName={item.name} itemSelected={item.selected ? 1 : 0} />
                        </div>
                      </article>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div className="app_category_build_item">
            <h5>Other Components</h5>
            <ul>
              {displayComponents.map(({ icon: Icon, label, status }) => (
                <li
                  key={label}
                  role="listitem"
                  aria-label={label}
                  className={status ? "active_item_list" : ""}
                >
                  <div className="app_left_side_build">
                    <Icon aria-hidden="true" focusable="false" />
                    <h6>{label}</h6>
                  </div>
                  {status && (
                    <div className="app_status_update">
                      <SuccssTick />
                    </div>
                  )}
                </li>
              ))}
            </ul>
            <div className="app_build_product_view_sec">
              <ul>
                {monitors.map((item) => {
                  const discountedPrice =
                    item.price * (1 - item.discount / 100);

                  return (
                    <li
                      key={item.id}
                      className={item.selected ? "active_item" : ""}
                    >
                      <article
                        className="app_item_product_card"
                        role="group"
                        aria-label={`${item.name}, ${item.discount}% off`}
                      >
                        <figure>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            style={{ objectFit: "contain" }}
                          />
                        </figure>
                        <h3>{truncateText(item.name, 30)}</h3>
                        <div className="app_price_and_btn">
                          <div className="app_product_price_sec">
                            <p>
                              {discountedPrice.toLocaleString("en-IN", {
                                style: "currency",
                                currency: "INR",
                                maximumFractionDigits: 0,
                              })}
                            </p>
                          </div>
                          <AddToCartButton productName={item.name} itemSelected={item.selected ? 1 : 0} />
                        </div>
                      </article>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div className="app_category_build_item">
            <h5>Accessories</h5>
            <ul>
              {accessoriesComponents.map(({ icon: Icon, label, status }) => (
                <li
                  key={label}
                  role="listitem"
                  aria-label={label}
                  className={status ? "active_item_list" : ""}
                >
                  <div className="app_left_side_build">
                    <Icon aria-hidden="true" focusable="false" />
                    <h6>{label}</h6>
                  </div>
                  {status && (
                    <div className="app_status_update">
                      <SuccssTick />
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="app_price_calculation">
          {selectedItems.map((item) => (
            <div key={item.id} className="app_right_side_price">
              <h3>{item.title}</h3>
              <ul>
                {item.items.map((itm) => (
                  <li key={itm.id}>
                    <p>{itm.name}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
