import { StoreProvider, ToastProvider } from "@/components/providers"
import "@/styles/style.scss"
import type { Metadata } from "next"

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
      <body className={``}>
        <StoreProvider>{children}</StoreProvider>
        <ToastProvider />
      </body>
    </html>
  )
}
