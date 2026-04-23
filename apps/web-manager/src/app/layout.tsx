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

// Metadata minimal
export const metadata: Metadata = {
  title: "SAD Manager",
  description: "Manager App for managing Sumber Anugrah Diesel bookings",
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
            primaryColor: "violet",
          }}
        >
          <Notifications mt={50} position="top-right" />
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
