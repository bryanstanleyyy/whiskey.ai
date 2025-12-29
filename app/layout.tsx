import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Whiskey.ai - Your Friendly Pug Assistant',
  description: 'Chat with Whiskey, the adorably confused pug who tries to help with your questions!',
  keywords: ['AI', 'chatbot', 'pug', 'assistant', 'chat', 'fun'],
  authors: [{ name: 'Whiskey the Pug' }],
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Whiskey.ai',
  },
  openGraph: {
    title: 'Whiskey.ai',
    description: 'Your friendly (and slightly confused) pug assistant',
    type: 'website',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#C77A4E' },
    { media: '(prefers-color-scheme: dark)', color: '#D4A574' }
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
