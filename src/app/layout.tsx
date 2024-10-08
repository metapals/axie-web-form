import type { Metadata } from "next"
import { Plus_Jakarta_Sans } from "next/font/google"
import "./globals.css"
import { GoogleAnalytics } from "@next/third-parties/google"

const pj_sans = Plus_Jakarta_Sans({ subsets: ["latin"] })

export const metadata = {
  metadataBase: "https://axie-web-form.vercel.app/",
  title: "MetaPals Axie Infinity Early Access Form",
  description:
    "A website to register for Axie Infinity early access on Metapals",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <GoogleAnalytics gaId="G-9RYXF9GYW3" />
      <body className={pj_sans.className}>{children}</body>
    </html>
  )
}
