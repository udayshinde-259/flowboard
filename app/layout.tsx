import { ClerkProvider } from "@clerk/nextjs";
import { Google_Sans } from "next/font/google";

import "./globals.css";

export const metadata = {
  title: "Flowbard",
  description: "A Trello clone built with Next.js",
};

const googleSans = Google_Sans({
  variable: "--font-google-sans",
  subsets: ["latin"],
  adjustFontFallback: false
});

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`h-full antialiased ${googleSans.variable} font-sans`}
    >
      <body className="min-h-full flex flex-col">
        <ClerkProvider>{children}</ClerkProvider>
      </body>
    </html>
  );
}