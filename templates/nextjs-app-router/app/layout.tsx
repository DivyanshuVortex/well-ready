import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Next.js App Router",
  description: "Modern Next.js application with App Router and Tailwind CSS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
