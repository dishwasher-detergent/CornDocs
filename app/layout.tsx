import { Nunito as FontSans } from "next/font/google"

import "./globals.css"

import { ThemeProvider } from "@/contexts/theme-provider"

import { cn } from "@/lib/utils"
import { Nav } from "@/components/ui/nav"

const fontSans = FontSans({
  subsets: ["latin"],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "relative flex min-h-screen flex-col bg-background antialiased",
          fontSans.className
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Nav />
          <main className="mx-auto w-full max-w-7xl flex-1 p-4">
            {children}
          </main>
          {/* <Footer /> */}
        </ThemeProvider>
      </body>
    </html>
  )
}
