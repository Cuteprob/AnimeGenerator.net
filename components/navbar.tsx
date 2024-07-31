"use client";
import Image from "next/image";
import LangSwitch from "./header/langSwitch";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { localeNames,defaultLocale } from "@/lib/i18n";
import { NavLinksList,NavLink } from "@/lib/navLinksList";
import { MdMenu } from "react-icons/md";


const Navbar = () => {
	const pathname = usePathname();
	const [langName, setLangName] = useState<string>(defaultLocale);
	const [linkList, setLinkList] = useState<NavLink[]>([]);

	useEffect(() => {
		const fetchLinksList = async () => {
		  let currentLocale = defaultLocale;
		  if (pathname !== '/') {
			const localeFromPath = pathname.split('/')[1];
			if (Object.keys(localeNames).includes(localeFromPath)) {
			  currentLocale = localeFromPath;
			}
		  }
		  setLangName(currentLocale);
		  setLinkList(NavLinksList[`LINK_${currentLocale.toUpperCase()}` as keyof typeof NavLinksList] || []);
		};
		fetchLinksList();
	  }, [pathname]);
	
    return ( 
        <header className='w-full z-50 bg-base-100 p-5 sticky pb-0 max-w-[1280px] mx-auto md:mb-5 flex justify-between items-center'>
            <a
				aria-label='landing page template'
				className='flex items-center w-1/2 md:w-1/5'
				title='landing page template'
				href={`/`}
			>
				<Image
					width={200}
					height={200}
					src={'/logo.gif'}
					className='transition-all hover:scale-110 w-6 md:w-10 h-6 md:h-10'
					alt='logo'
				></Image>
				<h2 className='ml-3 font-bold leading-5'>Landing Page</h2>
			</a>

			<ul className='w-3/5 px-5 font-medium hidden md:flex flex-nowrap items-center justify-around'>
				{linkList.map((link, index) => {
					return (
						<li
							key={index}
							className='group py-3 text-center'
						>
							<a
								aria-label={link.name}
								className='group relative'
								title={link.name}
								href={`/${langName}${link.url}`}
							>
								{link.name}
								<div className='absolute left-[50%] group-hover:left-0 w-0 group-hover:w-full h-[3px] transition-all duration-300 bg-base-content/90'></div>
							</a>
						</li>
					);
				})}
			</ul>

            <div className='md:w-1/5 flex items-center justify-end gap-2'>
				
				{/* <ThemeToggle /> */}
				<LangSwitch />
				<div className='md:hidden dropdown dropdown-end'>
					<div tabIndex={0} className='btn btn-xs btn-ghost p-0 m-2'>
						<MdMenu size={18} />
					</div>
					<ul tabIndex={0} className='menu dropdown-content z-[100] p-2 shadow bg-base-100 opacity-100 rounded-box w-52'>
						{linkList.map((link, index) => {
							return (
								<li key={index}>
									<a
										aria-label={link.name}
										title={link.name}
										href={`/${langName}${link.url}`}
									>
										{link.name}
									</a>
								</li>
							);
						})}
					</ul>
				</div>
			</div>
        </header>
     );
}
 
export default Navbar;