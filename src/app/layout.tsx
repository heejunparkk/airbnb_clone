import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/app/components/layout/Header';
import CategoryBar from '@/app/components/layout/CategoryBar';
// import Footer from "@/app/components/layout/Footer";

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className={inter.className} suppressHydrationWarning>
        <Header />
        <div className="pt-20">
          <CategoryBar />
        </div>
        <main>{children}</main>
        {/* <Footer /> */}
      </body>
    </html>
  );
}
