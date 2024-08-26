"use client";
import Link from 'next/link';
import { useState } from 'react';

const CTASection = ({ locale, langName }: { locale: any, langName: string }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <section className='relative py-10 md:py-20 bg-gradient-to-br from-first to-purple-600 text-white'>
            <div className="mx-10">
                <h2 className='font-bold text-4xl md:text-6xl md:text-center'>
                    {locale.h2}
                </h2>

                <div className="text-center mt-10">
                    <p className="my-10 text-xl py-3 text-white">
                        {locale.h3}
                    </p>

                    <Link 
                        href={`/${langName}`}
                        className={`
                            inline-block px-10 py-3 
                            bg-second text-white 
                            rounded-full font-semibold
                            transition-all duration-300 ease-in-out
                            ${isHovered ? 'bg-opacity-80 transform scale-105' : ''}
                            hover:bg-opacity-80 hover:scale-105                         
                            active:bg-opacity-90
                            cursor-pointer
                            z-10 relative
                        `}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        {locale.button}
                    </Link>
                </div>

                <div className='hidden md:block absolute left-[30%] top-0 z-0'>
                    <div className='absolute bottom-0 left-[-20%] right-0 top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]'></div>
                </div>
            </div>
        </section>
    );
}

export default CTASection;