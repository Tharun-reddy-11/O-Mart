import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { AuthProvider } from '@/components/auth-provider';
import { Toaster } from '@/components/ui/toaster';
import { CartProvider } from './providers/cart-provider';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
});

export const metadata: Metadata = {
  title: 'O-Mart - Modern Indian E-commerce Platform',
  description: 'Your one-stop shop for authentic Indian products',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body suppressHydrationWarning>
        <CartProvider>
          <ThemeProvider attribute="class" defaultTheme="light">
            <AuthProvider>
              <main className="min-h-screen bg-background font-sans antialiased">
                {children}
                <Toaster />
              </main>
            </AuthProvider>
          </ThemeProvider>
        </CartProvider>
      </body>
    </html>
  );
}