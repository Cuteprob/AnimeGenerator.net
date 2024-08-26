"use client"
import Image from "next/image";
import useSWR from "swr";
import { Button } from "@/components/ui/button";
import { Copy, Download } from 'lucide-react';
import { useState, useEffect, useMemo, useCallback } from "react";
import toast from 'react-hot-toast';
import { useInView } from "react-intersection-observer";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const fetcher = (url: string) => fetch(url).then(res => res.json());


interface AnimeImage {
    id: string;
    url: string;
    prompt: string;
    tags: string[];
    model?: string;
    createdAt?: string;
}

interface AnimeImageProps {
    anime: AnimeImage;
    index: number;
    locale: any;
}

const AnimeImage: React.FC<AnimeImageProps> = ({ anime, index, locale }) => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        rootMargin: '200px 0px',
    });

    return (
        <div
            ref={ref}
            className="relative group rounded-lg overflow-hidden transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg"
            role="img"
            aria-label={`AI-generated anime image ${index + 1}`}
        >
            {inView ? (
                <Image
                    width={500}
                    height={500}
                    alt={`AI-generated anime image ${index + 1}`}
                    src={anime.url}
                    layout="responsive"
                    objectFit="cover"
                    className="rounded-lg"
                    priority={index < 4}
                />
            ) : (
                <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                    <span className="text-gray-400">{locale.galleryLoading}</span>
                </div>
            )}
        </div>
    );
};

interface GalleryProps {
    page: number;
    setTotalPages: (totalPages: number) => void;
    showViewMore?: boolean;
    locale: any;
    langName?: string;
}

const Gallery: React.FC<GalleryProps> = ({ page, setTotalPages, showViewMore = true, locale, langName }) => {
    const pageSize = 24;
    const { data, error } = useSWR(`/api/animes/getAnimes?page=${page}&pageSize=${pageSize}`, fetcher, { revalidateOnFocus: false });

    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    useEffect(() => {
        if (data) {
            setTotalPages(Math.ceil(data.total / pageSize));
        }
    }, [data, pageSize, setTotalPages]);


    useEffect(() => {
        if (error) {
            toast.error(locale?.galleryLoadError || 'Try later');
        }
    }, [error, locale]);

    const handleDownload = useCallback((url: string) => {
        const link = document.createElement('a');
        link.href = url;
        link.download = 'generated-anime.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toast.success(locale.downloadSuccess);
    }, [locale.downloadSuccess]);

    const handleCopy = useCallback((prompt: string) => {
        navigator.clipboard.writeText(prompt)
            .then(() => toast.success(locale.copySuccess))
            .catch(err => toast.error(locale.copyError));
    }, [locale.copySuccess, locale.copyError]);

    const animeList: AnimeImage[] = useMemo(() => {
        return Array.isArray(data?.animes) ? data.animes : [];
    }, [data]);

    const handleTagClick = useCallback((tag: string) => {
        setSelectedTags(prev =>
            prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
        );
    }, []);

    const filteredAnimeList = useMemo(() =>
        animeList.filter(anime =>
            selectedTags.length === 0 || selectedTags.some(tag => anime.tags.includes(tag))
        ),
        [animeList, selectedTags]
    );

    const allTags = useMemo(() =>
        Array.from(new Set(animeList.flatMap(anime => anime.tags))),
        [animeList]
    );

    if (error) {
        return <div>{locale.galleryLoadError}</div>;
    }

    if (!data) {
        return (
            <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)]">
                        <Image
                            src="/o6m.gif"
                            alt="Loading..."
                            width={100}
                            height={100}
                        />
                        <p className="mt-4 text-white">{locale.galleryLoading}</p>
                    </div>
        );
    }

    return (
        <section>
            <div className="bg-white p-4 rounded-lg shadow-lg max-w-6xl mx-auto">
                <h2 className='text-first text-xl font-semibold mb-4 text-center'>
                    {locale.galleryTitle}
                </h2>
                <div className="mb-4 flex flex-wrap gap-2">
                    {allTags.map(tag => (
                        <Badge
                            key={tag}
                            variant={selectedTags.includes(tag) ? "default" : "outline"}
                            onClick={() => handleTagClick(tag)}
                            className="cursor-pointer"
                            aria-label={`Filter by ${tag}`}
                        >
                            {tag}
                        </Badge>
                    ))}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {filteredAnimeList.map((anime, index) => (
                        <Dialog key={anime.id}>
                            <DialogTrigger asChild>
                                <div className="cursor-pointer">
                                    <AnimeImage
                                        anime={anime}
                                        index={index}
                                        locale={locale}
                                    />
                                </div>
                            </DialogTrigger>
                            <DialogContent className="max-w-4xl p-0 overflow-hidden bg-gray-50">
                                <div className="flex flex-col md:flex-row">
                                    <div className="relative md:w-2/3 bg-white flex items-center justify-center">
                                        <Image
                                            width={1000}
                                            height={1000}
                                            alt={`Full view of ${anime.prompt}`}
                                            src={anime.url}
                                            objectFit="contain"
                                            className="max-h-[80vh] w-auto"
                                        />
                                    </div>
                                    <div className="md:w-1/3 p-6 flex flex-col justify-between">
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-800 mb-4">{locale.animeDetails}</h3>
                                            <div className="space-y-4">
                                                <div>
                                                    <h4 className="text-sm font-semibold  text-gray-800">{locale.prompt}</h4>
                                                    <p className="text-sm text-gray-600 mt-1">{anime.prompt}</p>
                                                </div>
                                                <div>
                                                    <h4 className="text-sm font-semibold text-gray-800">{locale.model}</h4>
                                                    <p className="text-sm text-gray-600 mt-1">{anime.model || 'Not specified'}</p>
                                                </div>
                                                <div>
                                                    <h4 className="text-sm font-semibold text-gray-800">{locale.createTime}</h4>
                                                    <p className="text-sm text-gray-600 mt-1">{anime.createdAt || 'Not specified'}</p>
                                                </div>
                                                {anime.tags && anime.tags.length > 0 && (
                                                    <div>
                                                        <h4 className="text-sm font-medium text-gray-600">Styles</h4>
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
                                                {locale.copyPrompt}
                                            </Button>
                                            <Button
                                                variant="default"
                                                size="sm"
                                                onClick={() => handleDownload(anime.url)}
                                                className="w-full justify-center"
                                            >
                                                <Download className="h-4 w-4 mr-2" />
                                                {locale.download}
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </DialogContent>
                        </Dialog>
                    ))}
                </div>
            </div>
            {showViewMore && (
                <div className="py-4 flex justify-center">
                    <Link href={`/${langName}/inspiration`}className="bg-second text-white px-6 py-2 rounded-full hover:bg-opacity-70 transition-all duration-300 shadow-md hover:shadow-lg">
                        <h3>{locale.galleryViewMore}</h3>
                    </Link>
                </div>
            )}
        </section>
    );
}

export default Gallery;