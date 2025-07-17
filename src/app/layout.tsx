import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: '🔥 BBQ World',
    description: 'Partagez vos expériences barbecue avec le monde entier',
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="fr" className="dark">
        <body className={inter.className}>{children}</body>
        </html>
    )
}