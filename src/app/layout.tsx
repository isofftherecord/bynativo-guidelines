import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans, Kanit } from "next/font/google";

import "./globals.css";

const kanit = Kanit({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
});

const plexSans = IBM_Plex_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: {
    default: "byNativo Guidelines",
    template: "%s · byNativo Guidelines",
  },
  description:
    "Multi-brand brand guidelines platform for byNativo — logos, colors, typography.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${kanit.variable} ${plexSans.variable} ${plexMono.variable} h-full`}
    >
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}
