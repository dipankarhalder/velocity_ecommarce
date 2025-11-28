import Link from "next/link";
import { Location, Call, File, Map } from "@/components/icons"; //Affiliate

const navItems = [
  { href: '/', icon: <File aria-hidden="true" focusable="false" />, label: 'Blogs' },
  { href: '/', icon: <Call aria-hidden="true" focusable="false" />, label: 'Contact Us' },
  { href: '/', icon: <Map aria-hidden="true" focusable="false" />, label: 'Store Locator' },
  // { href: '/', icon: <Affiliate aria-hidden="true" focusable="false" />, label: 'Affiliate' },
];

export const TopHeader = () => {
  return (
    <div
      className="app_outside_content ap_full_bg"
      role="complementary"
      aria-label="Top information bar"
    >
      <div className="app_container">
        <div className="app_inside_content topheader_divide">
          <address
            className="app_top_header_left"
            aria-label="Velocity contact information"
          >
            <ul role="list">
              <li>
                <Location aria-hidden="true" focusable="false" />
                <p>124/A, R. S. Mallick Road, Jadavpur, Kolkata - 700084</p>
              </li>
              <li>
                <em>Call us:</em>
                <a href="tel:03345600550">033-4560-0550</a>
              </li>
              <li>
                <em>Email:</em>
                <a href="mailto:information@velocity.com">
                  information@velocity.com
                </a>
              </li>
            </ul>
          </address>
          <nav className="app_top_header_right" aria-label="Top header navigation">
            <ul role="list">
              {navItems.map(({ href, icon, label }, index) => (
                <li key={index}>
                  <Link href={href} aria-label={label}>
                    {icon}
                    <em>{label}</em>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};
