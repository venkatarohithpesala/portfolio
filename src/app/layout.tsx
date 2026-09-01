import type { Metadata } from "next";
import { Geist, Geist_Mono, Dancing_Script } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "../components/SmoothScrollProvider";
import ParticleField from "../components/ParticleFieldLoader";
import CursorGlow from "../components/CursorGlow";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const dancingScript = Dancing_Script({
  variable: "--font-cursive",
  subsets: ["latin"],
  weight: ["700"],
});

export const metadata: Metadata = {
  title: "Venkata Rohith Pesala - Full Stack Cloud Engineer",
  description:
    "Full Stack Cloud Engineer building scalable, cloud-native solutions with Next.js, NestJS, and AWS. Explore my projects, experience, and skills.",
  keywords: [
    "Venkata Rohith Pesala",
    "Full Stack Developer",
    "Cloud Engineer",
    "AWS",
    "Next.js",
    "NestJS",
    "React",
    "Portfolio",
  ],
  authors: [{ name: "Venkata Rohith Pesala" }],
  openGraph: {
    title: "Venkata Rohith Pesala - Full Stack Cloud Engineer",
    description:
      "Full Stack Cloud Engineer building scalable, cloud-native solutions with Next.js, NestJS, and AWS.",
    images: ["/profile-pic.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Venkata Rohith Pesala - Full Stack Cloud Engineer",
    description:
      "Full Stack Cloud Engineer building scalable, cloud-native solutions with Next.js, NestJS, and AWS.",
    images: ["/profile-pic.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${dancingScript.variable} antialiased`}
      >
        <ParticleField />
        <CursorGlow />
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
