"use client";

import TestimonialCard from "@/components/ui/testimonialCard";
import { TestimonialsList } from "@/config/testimotialsList";

const TestimonialSection = ({ locale, langName }: { locale: any, langName: string }) => {
    let list = TestimonialsList['TESTIMONIAL_EN'];
    return (
        <section
            className='relative py-10 md:py-20 text-black'
        >
            <div className="container mx-auto px-4 text-center">
                <h2 className='text-3xl md:text-4xl font-bold mb-8 '>
                    {locale.h2}
                </h2>
                <p className="text-xl text-white mt-2">{locale.h3}</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-gray-200 p-6 rounded-lg shadow-md">
                        <div className="flex items-center mb-4">
                            <img src="/avatar_3.jpg" alt="User Avatar" className="rounded-full mr-4 h-[50px] w-[50px]" />、
                            <div>
                                <p className="font-semibold">Sarah K.</p>
                                <div className="text-yellow-400">★★★★★</div>
                            </div>
                        </div>
                        <p className="text-gray-700">&quot;This AI Anime Generator is a game-changer! I&apos;ve created stunning characters for my webcomic in minutes. Highly recommended!&quot;</p>
                    </div>
                    <div className="bg-gray-200 p-6 rounded-lg shadow-md">
                        <div className="flex items-center mb-4">
                            <img src="/avatar_2.jpg" alt="User Avatar" className="rounded-full mr-4 h-[50px] w-[50px]" />
                            <div>
                                <p className="font-semibold">Jason T.</p>
                                <div className="text-yellow-400">★★★★☆</div>
                            </div>
                        </div>
                        <p className="text-gray-700">This AI Anime Generator is a revolutionary tool! It allowed me to create beautiful characters for my webcomic in just a few minutes. I highly recommend it for any creative project!</p>
                    </div>
                    <div className="bg-gray-200 p-6 rounded-lg shadow-md">
                        <div className="flex items-center mb-4">
                            <img src="/avatar_1.jpg" alt="User Avatar" className="rounded-full mr-4 h-[50px] w-[50px]" />
                            <div>
                                <p className="font-semibold">Judy K.</p>
                                <div className="text-yellow-400">★★★★★</div>
                            </div>
                        </div>
                        <p className="text-gray-700">素晴らしい！このAIツールは私のアニメ制作ワークフローを完全に変えました。驚くほど詳細な背景を簡単に作成できます。</p>
                    </div>
                </div>


            </div>
        </section>
    );
}

export default TestimonialSection;