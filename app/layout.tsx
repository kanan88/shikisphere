import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ui/theme-provider";

const dmSans = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ShikiSphere",
  description: "Explore The Diverse Realms of Anime Magic with Shikimori API",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={dmSans.className}>
        <main className="max-w-7xl mx-auto bg-white dark:bg-[#0F1117]">
          <Header />
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
          <Footer />
        </main>
      </body>
    </html>
  );
};

export default RootLayout;
