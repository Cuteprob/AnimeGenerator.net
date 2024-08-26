import FeatureSection from "@/components/home-section/feature";
import { locales, getDictionary, defaultLocale } from "@/lib/i18n";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export default async function FeaturePage({
    params: { lang },
}: {
    params: { lang: string }
}) {
    const langName = lang || defaultLocale;
    const dict = await getDictionary(langName);

    return (
        <div className="min-h-screen flex flex-col">
            <main className="flex-grow container mx-auto px-4 py-8">

                <Breadcrumb className="mb-0">
                    <BreadcrumbList className='text-black'>
                        <BreadcrumbItem >
                            <BreadcrumbLink className='hover:text-black text-gray-500' href={`/${langName}`}>{dict.Feature.breadcrumbHome}</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage className='text-black'>{dict.Feature.breadcrumbFeature}</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>

                <FeatureSection locale={dict.Feature} langName={langName} />               
            </main>
        </div>
    );
}