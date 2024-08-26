"use client"
import { useAuth } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Copy, Download } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import toast from 'react-hot-toast';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { getDictionary } from "@/lib/i18n";
import { useParams } from "next/navigation";

interface AnimeImage {
    id: string;
    url: string;
    prompt: string;
    tags: string[];
    model?: string;
    createdAt?: string;
}

export default function MyInspirationPage() {
    const { userId } = useAuth();
    const [userImages, setUserImages] = useState<AnimeImage[]>([]);
    const [loading, setLoading] = useState(true);
    const params = useParams();
    const [dict, setDict] = useState<any>(null);

    useEffect(() => {
        const fetchDictionary = async () => {
            const result = await getDictionary(params.lang as string);
            setDict(result);
        };
        fetchDictionary();
    }, [params.lang]);

    useEffect(() => {
        if (userId) {
            fetchUserImages(userId);
        }
    }, [userId]);

    const fetchUserImages = async (userId: string) => {
        try {
            const response = await fetch(`/api/user/userAnimes?userId=${userId}`);
            if (response.ok) {
                const data = await response.json();
                setUserImages(data);
            } else {
                console.error("Failed to fetch user images");
            }
        } catch (error) {
            console.error("Error fetching user images:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCopy = (prompt: string) => {
        navigator.clipboard.writeText(prompt)
            .then(() => toast.success(dict?.MyInspiration.promptCopied))
            .catch(() => toast.error(dict?.MyInspiration.promptCopyFailed));
    };

    const handleDownload = (url: string) => {
        const link = document.createElement('a');
        link.href = url;
        link.download = 'my-anime-inspiration.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toast.success(dict?.MyInspiration.downloadStarted);
    };

    if (!dict) return null;

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)]">
                <Image
                    src="/o6m.gif"
                    alt={dict.MyInspiration.loading}
                    width={100}
                    height={100}
                />
                <p className="mt-4 text-black">{dict.MyInspiration.loading}</p>
            </div>
        );
    }

    if (userImages.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)] text-center">
                <Image
                    src="/empty-inspiration.png"
                    alt={dict.MyInspiration.noInspirations}
                    width={200}
                    height={200}
                />
                <h2 className="text-2xl font-bold mt-4 text-gray-800">{dict.MyInspiration.noInspirations}</h2>
                <p className="mt-2 text-gray-600">{dict.MyInspiration.startCreating}</p>
                <Button className="mt-4" onClick={() => window.location.href = '/'}>
                    {dict.MyInspiration.createFirstAnime}
                </Button>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <Breadcrumb className="mb-0">
                <BreadcrumbList className='text-black'>
                    <BreadcrumbItem>
                        <BreadcrumbLink className='hover:text-black text-gray-500' href={`/${params.lang}`}>{dict.MyInspiration.breadcrumbHome}</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage className='text-black'>{dict.MyInspiration.breadcrumbMyInspiration}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">{dict.MyInspiration.title}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {userImages.map((anime, index) => (
                    <Dialog key={anime.id}>
                        <DialogTrigger asChild>
                            <div className="cursor-pointer">
                                <Image
                                    width={500}
                                    height={500}
                                    alt={`${dict.MyInspiration.aiGeneratedImage} ${index + 1}`}
                                    src={anime.url}
                                    className="rounded-lg transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg"
                                />
                            </div>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl p-0 overflow-hidden bg-gray-50">
                            <div className="flex flex-col md:flex-row">
                                <div className="relative md:w-2/3 bg-white flex items-center justify-center">
                                    <Image
                                        width={1000}
                                        height={1000}
                                        alt={`${dict.MyInspiration.fullView} ${anime.prompt}`}
                                        src={anime.url}
                                        objectFit="contain"
                                        className="max-h-[80vh] w-auto"
                                    />
                                </div>
                                <div className="md:w-1/3 p-6 flex flex-col justify-between">
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-800 mb-4">{dict.MyInspiration.imageDetails}</h3>
                                        <div className="space-y-4">
                                            <div>
                                                <h4 className="text-sm font-semibold text-gray-800">{dict.MyInspiration.prompt}</h4>
                                                <p className="text-sm text-gray-600 mt-1">{anime.prompt}</p>
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-semibold text-gray-800">{dict.MyInspiration.model}</h4>
                                                <p className="text-sm text-gray-600 mt-1">{anime.model || dict.MyInspiration.notSpecified}</p>
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-semibold text-gray-800">{dict.MyInspiration.createdOn}</h4>
                                                <p className="text-sm text-gray-600 mt-1">{anime.createdAt || dict.MyInspiration.notSpecified}</p>
                                            </div>
                                            {anime.tags && anime.tags.length > 0 && (
                                                <div>
                                                    <h4 className="text-sm font-medium text-gray-600">{dict.MyInspiration.styles}</h4>
                                                    <div className="flex flex-wrap gap-2 mt-1">
                                                        {anime.tags.map(tag => (
                                                            <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="mt-6 space-y-3">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleCopy(anime.prompt)}
                                            className="w-full justify-center"
                                        >
                                            <Copy className="h-4 w-4 mr-2" />
                                            {dict.MyInspiration.copyPrompt}
                                        </Button>
                                        <Button
                                            variant="default"
                                            size="sm"
                                            onClick={() => handleDownload(anime.url)}
                                            className="w-full justify-center"
                                        >
                                            <Download className="h-4 w-4 mr-2" />
                                            {dict.MyInspiration.downloadImage}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>
                ))}
            </div>
        </div>
    );
}
