import type { Metadata } from "next";
import "./globals.css";

import { Raleway } from "next/font/google";

import theme from "@/theme";
import { ThemeProvider } from "@mui/material";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "600", "700"],
  variable: "--font-raleway",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider theme={theme}>
      <html lang="pl" data-mui-color-scheme="dark">
        <body className={`${raleway.variable} bg-background-primary`}>
          <Navbar />
          <div className="flex flex-col min-h-screen font-raleway">
            <div className="pt-[70px] flex-grow">{children}</div>
            <Footer />
          </div>
        </body>
      </html>
    </ThemeProvider>
  );
}
