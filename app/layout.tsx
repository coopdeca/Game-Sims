import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Football Sim Lab",
  description:
    "NFL and college football matchup simulator"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
