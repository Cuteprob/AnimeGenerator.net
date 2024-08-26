import { Metadata } from 'next';
import { getDictionary, defaultLocale } from "@/lib/i18n";

export async function generateMetadata({ params: { lang } }: { params: { lang: string } }): Promise<Metadata> {
  const dict = await getDictionary(lang || defaultLocale);

  return {
    title: dict.InspirationMetadata.title,
    description: dict.InspirationMetadata.description,
    openGraph: {
      title: dict.InspirationMetadata.title,
      description: dict.InspirationMetadata.description,
      images: [
        {
          url: 'https://yourdomain.com/og-image.jpg',
          width: 1200,
          height: 630,
          alt: dict.InspirationMetadata.title,
        },
      ],
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}