import { Metadata } from 'next';
import { getDictionary, defaultLocale } from "@/lib/i18n";

export async function generateMetadata(
  { params }: { params: { lang: string } }
): Promise<Metadata> {
  const lang = params.lang || defaultLocale;
  console.log("Current lang:======>", lang);
  const dict = await getDictionary(lang);

  return {
    title: dict.HomeMetadata.title,
    description: dict.HomeMetadata.description,
    openGraph: {
        title: dict.HomeMetadata.title,
        description: dict.HomeMetadata.description,
        images: [
            {
                url: '/girl1.png',
                width: 1200,
                height: 630,
                alt: dict.HomeMetadata.title,
            },
        ],
    },
  };
}

export default function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  return (
    <div lang={params.lang}>
      {children}
    </div>
  );
}