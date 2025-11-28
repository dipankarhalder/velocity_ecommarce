import Link from "next/link";
import {
  Menu,
  Darrow,
  Percent,
  Processor,
  Motherboard,
  Memory,
  Monitor,
  Storage,
  Keyboard,
  Cabinate,
  Headphone,
  Consoles,
} from "@/components/icons";

const navItems = [
  { label: "Gaming", hasSubmenu: true },
  { label: "Components", hasSubmenu: true },
  { label: "Laptops", hasSubmenu: true },
  { label: "Mobiles", hasSubmenu: true },
  { label: "Monitors", hasSubmenu: true },
  { label: "Brands", hasSubmenu: true },
  { label: "Accessories", hasSubmenu: true },
];

const categories = [
  { icon: Processor, label: "Processor" },
  { icon: Motherboard, label: "Motherboard" },
  { icon: Memory, label: "Memory" },
  { icon: Monitor, label: "Monitor" },
  { icon: Storage, label: "Storage" },
  { icon: Keyboard, label: "Keyboard" },
  { icon: Cabinate, label: "Cabinate" },
  { icon: Headphone, label: "Headphone" },
  { icon: Consoles, label: "Console" },
];

export const Navigation = () => {
  return (
    <nav className="app_nav_wrapper" aria-label="Main navigation">
      <div className="app_nav_items">
        <div className="app_categry_navigation">
          <button
            className="app_nav_category"
            type="button"
            aria-label="Browse categories"
            aria-haspopup="true"
            aria-expanded="false"
            tabIndex={0}
          >
            <Menu aria-hidden="true" focusable="false" />
            <p>Categories</p>
          </button>
          <div
            className="app_nav_child_section"
            role="menu"
            aria-label="Categories"
          >
            <ul>
              {categories.map(({ icon: Icon, label }) => (
                <li key={label}>
                  <Link href="/" aria-label={label}>
                    <Icon aria-hidden="true" focusable="false" />
                    <p>{label}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <ul className="app_nav_links">
          {navItems.map(({ label, hasSubmenu }) => (
            <li key={label}>
              <button
                type="button"
                aria-label={hasSubmenu ? `${label} submenu` : label}
                {...(hasSubmenu && {
                  "aria-haspopup": "true",
                  "aria-expanded": "false",
                })}
                tabIndex={0}
              >
                <span>{label}</span>
                {hasSubmenu && <Darrow aria-hidden="true" focusable="false" />}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="app_nav_offers">
        <Link href="/" aria-label="View special offers">
          <Percent aria-hidden="true" focusable="false" />
          <p>Special Offers</p>
        </Link>
      </div>
    </nav>
  );
};
