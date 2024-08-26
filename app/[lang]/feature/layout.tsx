import { Metadata } from 'next';
import { getDictionary, defaultLocale } from "@/lib/i18n";

export async function generateMetadata(
  { params }: { params: { lang: string } }
): Promise<Metadata> {
  const lang = params.lang || defaultLocale;
  console.log("Current lang:======>", lang);
  const dict = await getDictionary(lang);

  return {
    title: dict.FeatureMetadata.title,
    description: dict.FeatureMetadata.description,
    openGraph: {
        title: dict.FeatureMetadata.title,
        description: dict.FeatureMetadata.description,
        images: [
            {
                url: '/girl1.png',
                width: 1200,
                height: 630,
                alt: dict.FeatureMetadata.title,
            },
        ],
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}