import { Metadata } from 'next';
import { getDictionary, defaultLocale } from "@/lib/i18n";

export async function generateMetadata({ params: { lang } }: { params: { lang: string } }): Promise<Metadata> {
  const dict = await getDictionary(lang || defaultLocale);

  return {
    title: dict.MyInspirationMetadata.title,
    description: dict.MyInspirationMetadata.description,
    openGraph: {
      title: dict.MyInspirationMetadata.title,
      description: dict.MyInspirationMetadata.description,
      images: [
        {
          url: '/girl1.png',
          width: 1200,
          height: 630,
          alt: dict.MyInspirationMetadata.title,
        },
      ],
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}