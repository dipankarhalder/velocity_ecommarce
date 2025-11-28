import Link from "next/link";
import { Logo } from "@/components/elements/common/logo";
import { SearchForm } from "@/components/elements/common/searchForm";
import { LoginButton } from "@/components/elements/common/loginButton";
import { Compare, Shoping, Heart } from "@/components/icons";

export const MainHeader = () => {
  return (
    <header className="app_main_header" role="banner">
      <div className="app_container">
        <div className="app_inside_main_header">
          <div className="app_main_header_left">
            <Link href="/" aria-label="Homepage">
              <Logo />
            </Link>
            <SearchForm />
          </div>
          <nav className="app_main_header_right" aria-label="User navigation">
            <div className="app_build_pc_btn">
              <Link href="/build-pc" aria-label="Build your custom PC">
                Build Your PC
              </Link>
            </div>
            <div className="app_main_header_spcl_btns">
              <ul role="list">
                <li className="app_login_btn">
                  <LoginButton />
                </li>
                <li>
                  <Link href="#" aria-label="Compare products">
                    <Compare aria-hidden="true" focusable="false" />
                  </Link>
                </li>
                <li>
                  <Link href="#" aria-label="View shopping cart">
                    <Shoping aria-hidden="true" focusable="false" />
                  </Link>
                </li>
                <li>
                  <Link href="#" aria-label="View wishlist">
                    <Heart aria-hidden="true" focusable="false" />
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
      {/* <span className="app_shadow_node" aria-hidden="true"></span> */}
    </header>
  );
};
