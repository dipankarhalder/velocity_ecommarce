import { IChildren } from "@/interface";
import { TopHeader } from "@/components/elements/common/topHeader";
import { MainHeader } from "@/components/elements/common/mainHeader";
import { Navigation } from "@/components/elements/common/navigation";
import { LoginPopup } from "@/components/elements/common/loginPopup";

export default function MainLayout({ children }: Readonly<IChildren>) {
  return (
    <section className="app_main_wrapper">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <TopHeader />
      <MainHeader />
      <nav className="app_navigation" aria-label="Main navigation">
        <div className="app_container">
          <Navigation />
        </div>
      </nav>
      <main
        id="main-content"
        role="main"
        className="app_main_cover"
        aria-label="Main content"
      >
        <div className="app_container">{children}</div>
      </main>
      <footer></footer>
      <LoginPopup />
    </section>
  );
}
