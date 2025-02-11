import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/app/components/layout/Header';
import CategoryBar from '@/app/components/layout/CategoryBar';
import { Providers } from './providers';
// import Footer from "@/app/components/layout/Footer";

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className={inter.className} suppressHydrationWarning>
        <Providers>
          <Header />
          <div className="pt-20">
            <CategoryBar />
          </div>
          <main>{children}</main>
        </Providers>
        {/* <Footer /> */}
      </body>
    </html>
  );
}
