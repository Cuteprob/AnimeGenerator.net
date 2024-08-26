import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { ClerkProvider } from "@clerk/nextjs";
import { LoadingProvider } from "@/lib/loadingContext";
import { Toaster } from 'react-hot-toast';
import { GoogleAnalytics } from '@next/third-parties/google';

const poppins = Poppins({
  weight: ["300", "400", "600", "700"],
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html className={poppins.className}>
        <head>
        </head>
        <body>
          <LoadingProvider>
            <div className="bg-gray-100 w-full min-h-svh text-white">
              <Navbar />
              <div className="">
                {children}
              </div>
              <Footer />
            </div>
          </LoadingProvider>
          <Toaster position="top-center" reverseOrder={false} />
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_TAG_ID || ''}/>
        </body>
      </html>
    </ClerkProvider>
  );
}