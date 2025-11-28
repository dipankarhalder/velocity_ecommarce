import "../styles/global.scss";
import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import { Providers } from "./providers";

import { IChildren } from "@/interface";

const fontSans = Nunito_Sans({
  variable: "--font",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Velocity",
  description: "A e-commerce platform and website for computer peripherals",
};

export default function RootLayout({ children }: Readonly<IChildren>) {
  return (
    <html lang="en">
      <body className={`${fontSans.variable}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
