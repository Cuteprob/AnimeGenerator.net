import PricingSection from "@/components/home-section/pricing/pricing";
import { locales, getDictionary, defaultLocale } from "@/lib/i18n";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export default async function PricingPage({
    params: { lang },
}: {
    params: { lang: string }
}) {
    const langName = lang || defaultLocale;
    const dict = await getDictionary(langName);

    return (
        <div className="min-h-screen bg-gradient-to-br from-first to-purple-600 flex flex-col">
            <main className=" flex-grow container mx-auto px-4 pt-6">
            <Breadcrumb className="mb-0">
                    <BreadcrumbList className='text-white'>
                        <BreadcrumbItem >
                            <BreadcrumbLink className='hover:text-white text-gray-300' href={`/${langName}`}>{dict.Pricing.breadcrumbHome}</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage className='text-white'>{dict.Pricing.breadcrumbPricing}</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>

                <PricingSection locale={dict.Pricing} langName={langName} />               
            </main>
        </div>
    );
}