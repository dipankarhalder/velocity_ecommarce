import Link from "next/link";

import {
  Processor,
  Motherboard,
  Memory,
  Monitor,
  Storage,
  // Keyboard,
  Laptops,
  Headphone,
  Consoles,
  Mobiles,
} from "@/components/icons";

const categories = [
  {
    icon: Processor,
    path: "processor",
    label: "Processor",
    discount: "upto 30% off",
  },
  {
    icon: Motherboard,
    path: "motherboard",
    label: "Motherboard",
    discount: "upto 32% off",
  },
  { icon: Memory, path: "/memory", label: "Memory", discount: "upto 23% off" },
  {
    icon: Monitor,
    path: "monitor",
    label: "Monitor",
    discount: "upto 45% off",
  },
  {
    icon: Storage,
    path: "storage",
    label: "Storage",
    discount: "upto 31% off",
  },
  // {
  //   icon: Keyboard,
  //   path: "keyboard",
  //   label: "Keyboard",
  //   discount: "upto 16% off",
  // },
  {
    icon: Laptops,
    path: "laptops",
    label: "Laptops",
    discount: "upto 16% off",
  },
  {
    icon: Headphone,
    path: "headphone",
    label: "Headphone",
    discount: "upto 28% off",
  },
  {
    icon: Mobiles,
    path: "mobile",
    label: "Mobile",
    discount: "upto 21% off",
  },
  {
    icon: Consoles,
    path: "console",
    label: "Console",
    discount: "upto 38% off",
  },
];

export const CategoryItem = () => {
  return (
    <div className="app_categories_items">
      <ul>
        {categories.map(({ icon: Icon, path, label, discount }) => (
          <li key={label} role="listitem" aria-label={label}>
            <Link href={path}>
              <Icon aria-hidden="true" focusable="false" />
              <div className="app_category_text">
                <h6>{label}</h6>
                <p>{discount}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
