import type { Metadata } from "next"
import "@/styles/style.scss"

export const metadata: Metadata = {
  title: "Marchant-Portal Moneybag",
  description: "Marchant your money is safe with us",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={``}>{children}</body>
    </html>
  )
}
