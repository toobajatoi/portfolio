import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { JetBrains_Mono } from 'next/font/google'
import '@/styles/globals.css'
import { ThemeProvider } from 'next-themes'

const inter = Inter({ subsets: ['latin'] })
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
})

export const metadata: Metadata = {
  title: 'Tooba Jatoi - Portfolio',
  description: 'AI Research Architect & Creative Director',
  icons: {
    icon: '/portfolio/images/bitmoji.png',
    apple: '/portfolio/images/bitmoji.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className="light">
      <head>
        <link rel="icon" type="image/png" href="/images/bitmoji.png" />
      </head>
      <body className={inter.className + ' ' + jetbrainsMono.variable}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <main className="min-h-screen bg-white dark:bg-black">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
} 