"use client"
import { useState, useEffect } from 'react';
import Gallery from "@/components/home-section/gallery";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { CustomPagination } from '@/components/customPagination';
import { useParams } from 'next/navigation';
import { getDictionary, defaultLocale } from "@/lib/i18n";

export default function InspirationPage() {
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const params = useParams();
    const langName = (params.lang as string) || defaultLocale;
    const [dict, setDict] = useState<any>(null);

    useEffect(() => {
        getDictionary(langName).then(setDict);
    }, [langName]);

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
        window.scrollTo(0, 0);
    };

    if (!dict) return null;

    return (
        <div className="min-h-screen bg-gradient-to-br from-first to-purple-600 text-white flex flex-col">
            <main className="flex-grow container mx-auto px-4 py-8">

                <Breadcrumb className="mb-6">
                    <BreadcrumbList className='text-white'>
                        <BreadcrumbItem >
                            <BreadcrumbLink className='hover:text-white text-gray-300' href={`/${langName}`}>{dict.Inspiration.breadcrumbHome}</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage className='text-white'>{dict.Inspiration.breadcrumbInspiration}</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>

                <h2 className="text-3xl md:text-4xl font-bold text-center my-8">{dict.Inspiration.title}</h2>

                <Gallery page={page} setTotalPages={setTotalPages} showViewMore={false} locale={dict.Generator} langName={langName} />

                <div className="py-6 flex justify-center">
                    <CustomPagination
                        currentPage={page}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </div>
            </main>
        </div>
    );
}