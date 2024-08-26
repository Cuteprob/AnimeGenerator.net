"use client"
import Image from "next/image";
import { useState, useEffect } from "react";
import useSWR from "swr";
import { Download, Copy, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import toast from 'react-hot-toast';

const fetcher = (url: string) => fetch(url).then((res) => res.json());


export default function GenerateResult({ id, locale }: { id: string, locale: any }) {
    const { data, error } = useSWR(id ? `/api/animes/getAnimeById/${id}` : null, fetcher, {
        revalidateOnFocus: false,
    });
    const [isLoading, setIsLoading] = useState(!!id);

    useEffect(() => {
        if (data && data.anime) {
            setIsLoading(false);
        }
    }, [data]);

    const handleDownload = () => {
        if (data?.anime?.url) {
            const link = document.createElement('a');
            link.href = data.anime.url;
            link.download = 'generated-anime.png';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            toast.success(locale.downloadSuccess);
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(data?.anime?.prompt || "")
            .then(() => toast.success(locale.copySuccess))
            .catch(err => toast.error(locale.copyError));
    };

    if (!id) {
        return (
            <div className="bg-white p-4 rounded-lg shadow-lg my-8 max-w-3xl mx-auto">
                <h3 className="text-first text-xl font-semibold mb-4">{locale.genResult}</h3>
                <div className="w-full h-[300px] bg-gray-200 rounded-lg flex items-center justify-center">
                    <span className="text-gray-400 text-center">{locale.genResultDes}</span>
                </div>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="bg-white p-4 rounded-lg shadow-lg my-8 max-w-3xl mx-auto">
                <h3 className="text-first text-xl font-semibold mb-4">{locale.genResultLoading}</h3>
                <div className="w-full h-[300px] bg-gray-200 rounded-lg flex items-center justify-center">
                    <span className="text-gray-400 text-center">{locale.genResultLoadingDes}</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-white p-4 rounded-lg shadow-lg my-8 max-w-3xl mx-auto">
                <h3 className="text-first text-xl font-semibold mb-4">{locale.genResultError}</h3>
                <div className="w-full h-[300px] bg-gray-200 rounded-lg flex items-center justify-center">
                    <p className="text-red-500">{locale.genResultErrorDes}</p>
                </div>
            </div>
        );
    }

    if (!data?.anime) {
        return (
            <div className="bg-white p-4 rounded-lg shadow-lg my-8 max-w-3xl mx-auto">
                <h3 className="text-first text-xl font-semibold mb-4">{locale.genResultLoading}</h3>
                <div className="w-full h-[300px] bg-gray-200 rounded-lg flex items-center justify-center">
                    <p className="text-gray-500">{locale.genResultLoadingDes}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white p-4 rounded-lg shadow-lg my-8 max-w-3xl mx-auto">
            <h3 className="text-first text-xl font-semibold mb-4 text-center"></h3>
            <Dialog>
                <DialogTrigger asChild>
                    <div className="flex justify-center">
                        <div className="relative w-[300px] h-[300px] bg-gray-200 rounded-lg overflow-hidden cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110 hover:shadow-lg">
                            <Image
                                src={data.anime.url}
                                alt={data.anime.prompt || locale.animeDetailsAlt}
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                </DialogTrigger>
                <DialogContent className="max-w-4xl p-0 overflow-hidden bg-gray-50">
                    <div className="flex flex-col md:flex-row">
                        <div className="relative md:w-2/3 bg-white flex items-center justify-center">
                            <Image
                                src={data.anime.url}
                                alt={data.anime.prompt || locale.animeDetailsAlt}
                                width={1000}
                                height={1000}
                                objectFit="contain"
                                className="max-h-[80vh] w-auto"
                            />

                        </div>
                        <div className="md:w-1/3 p-6 flex flex-col justify-between">
                            <div>
                                <h3 className="text-xl font-bold text-gray-800 mb-4">{locale.animeDetails}</h3>
                                <div className="space-y-4">
                                    <div>
                                        <h4 className="text-sm font-semibold text-gray-600">{locale.prompt}</h4>
                                        <p className="text-sm text-gray-800 mt-1">{data.anime.prompt}</p>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-semibold text-gray-600">{locale.model}</h4>
                                        <p className="text-sm text-gray-800 mt-1">{data.anime.model || ''}</p>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-semibold text-gray-600">{locale.createTime}</h4>
                                        <p className="text-sm text-gray-800 mt-1">{data.anime.createdAt || ''}</p>
                                    </div>
                                    {data.anime.tags && data.anime.tags.length > 0 && (
                                        <div>
                                            <h4 className="text-sm font-semibold text-gray-600">style</h4>
                                            <div className="flex flex-wrap gap-2 mt-1">
                                                {data.anime.tags.map((tag: string) => (
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
                                    onClick={handleCopy}
                                    className="w-full justify-center"
                                >
                                    <Copy className="h-4 w-4 mr-2" />
                                    {locale.copyPrompt}
                                </Button>
                                <Button
                                    variant="default"
                                    size="sm"
                                    onClick={handleDownload}
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
        </div>
    );
}