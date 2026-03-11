import type { Metadata } from "next";
import { Montserrat, Cormorant_Garamond } from "next/font/google";
import { MantineProvider, mantineHtmlProps, ColorSchemeScript } from "@mantine/core";
import "./globals.css";
import { Notifications } from "@mantine/notifications";

// Google Fonts
const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// Metadata
export const metadata: Metadata = {
  title: "SAD Rental - Sumber Anugrah Diesel Equipment Rental",
  description: "Easy diesel equipment rental platform - Gensets, heavy machinery, and more",
  authors: [{ name: "Galang Ivandry & Andhika Guntur" }],
  creator: "SAD RBPL Project",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
      </head>
      <body
        className={`${montserrat.variable} ${cormorant.variable} antialiased`}
      >
        <MantineProvider
          withGlobalClasses
          withCssVariables
          theme={{
            fontFamily: "var(--font-montserrat), sans-serif",
            headings: { fontFamily: "var(--font-cormorant), serif" },
            primaryColor: "blue",
          }}
        >
          <Notifications mt={50} position="top-right" />
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
