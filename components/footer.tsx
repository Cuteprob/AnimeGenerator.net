"use client"
import React from "react";
import { footerData } from "@/config/footer";
import LinkGroup from "./footer/linkGroup";
import { useParams } from 'next/navigation';
import { getDictionary, defaultLocale } from "@/lib/i18n";
import { useEffect, useState } from "react";

const Footer = () => {
    const params = useParams();
    const lang = (params.lang as string) || defaultLocale;
    const [dict, setDict] = useState<any>(null);

    useEffect(() => {
        getDictionary(lang).then(setDict);
    }, [lang]);

    if (!dict) return null;

    return ( 
        <footer className='w-full space-y-4 pt-10 pb-6 flex flex-col items-center px-5 bg-[#202020] text-[#f7f7f7]'>
            <div className='max-w-[1024px] w-full mx-auto flex flex-col md:flex-row justify-between items-center md:items-end gap-4 text-sm'>
                <LinkGroup {...footerData} dict={dict} />
            </div>
            <div className='text-xs text-gray-400'>
                <p>&copy; {new Date().getFullYear()} AnimeGenerator.net {dict.footer.allRightsReserved}</p>
            </div>
        </footer>
     );
}
 
export default Footer;