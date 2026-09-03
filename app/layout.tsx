import { ClerkProvider } from "@clerk/nextjs";
import { Google_Sans, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const googleSans = Google_Sans({
  variable: "--font-google-sans",
  subsets: ["latin"],
});

export const metadata = {
  title: "Flowbard",
  description: "A Trello clone built with Next.js",
};

export default function RootLayout({ children }:LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", googleSans.variable, "font-sans", geist.variable)}
    >
      <body className="min-h-full flex flex-col">
        <ClerkProvider>{children}</ClerkProvider>
      </body>
    </html>
  );
}