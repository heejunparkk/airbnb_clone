import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import Header from '@/app/components/layout/Header';
import CategoryBar from '@/app/components/layout/CategoryBar';
import { Providers } from '@/providers';
import VoiceCommandButton from './components/common/VoiceCommandButton';
import Footer from '@/app/components/layout/Footer';
import ChatCommandInput from './components/common/ChatCommandInput';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({ subsets: ['latin'], display: 'swap', weight: ['400', '500', '600', '700'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className={inter.className} suppressHydrationWarning>
        <Providers>
          <Toaster richColors />
          <Header />
          <div className="pt-20">
            <CategoryBar />
          </div>
          <main>{children}</main>
          <Footer />
          <VoiceCommandButton />
          <ChatCommandInput />
        </Providers>
      </body>
    </html>
  );
}
