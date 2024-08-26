"use client";
import Image from "next/image";
import LangSwitch from "./header/langSwitch";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { localeNames, defaultLocale } from "@/lib/i18n";
import { NavLinksList, NavLink } from "@/config/navLinksList";
import { MdMenu } from "react-icons/md";
import SignIn from "./header/sign-in";
import CreditsNum from "./header/creditsNum";
import { useAuth } from "@clerk/nextjs";

const Navbar = () => {
  const pathname = usePathname();
  const [langName, setLangName] = useState<string>(defaultLocale);
  const [linkList, setLinkList] = useState<NavLink[]>([]);
  const { isSignedIn } = useAuth();

  useEffect(() => {
    const fetchLinksList = async () => {
      let currentLocale = defaultLocale;
      if (pathname !== "/") {
        const localeFromPath = pathname.split("/")[1];
        if (Object.keys(localeNames).includes(localeFromPath)) {
          currentLocale = localeFromPath;
        }
      }
      setLangName(currentLocale);
      setLinkList(
        NavLinksList[`LINK_${currentLocale.toUpperCase()}` as keyof typeof NavLinksList] || []
      );
    };
    fetchLinksList();
  }, [pathname]);

  return (
    <header className="w-full z-50 bg-first py-4 sticky top-0">
      <div className="container px-4 mx-auto flex justify-between items-center">
        {/* Left Section: Logo */}
        <a
          aria-label="landing page template"
          className="flex items-center"
          title="landing page template"
          href={`/`}
        >
          <Image
            width={48}
            height={48}
            src={"/o6m.gif"}
            unoptimized
            className="transition-all hover:scale-110 h-8 w-8 md:w-12 md:h-12 rounded-full"
            alt="logo"
          />
          <h1 className="font-bold text-l md:text-xl ml-3">AI Anime Generator</h1>
        </a>

        {/* Middle Section: Links for Desktop */}
        <nav className="hidden md:flex md:items-center space-x-6">
          <ul className="flex space-x-6">
            {linkList.map((link, index) => (
              <li key={index}>
                <a
                  aria-label={link.name}
                  className="block py-2 hover:text-second transition duration-300"
                  title={link.name}
                  href={`/${langName}${link.url}`}
                >
                  {link.name}
                  <div className="absolute left-[50%] group-hover:left-0 w-0 group-hover:w-full h-[3px] transition-all duration-300 bg-base-content/90"></div>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right Section: Sign-in, Credits, and LangSwitch */}
        <div className="flex items-center space-x-2 md:space-x-4">
          <LangSwitch />
          {isSignedIn && <CreditsNum />}
          <SignIn />

          {/* Menu Button for Mobile */}
          <div className="md:hidden dropdown dropdown-end">
            <summary 
			tabIndex={0} 
			className="btn btn-xs btn-ghost p-0 mr-2 "
			>
              <MdMenu size={24} />
            </summary>
            <ul
              tabIndex={0}
              className="menu dropdown-content z-[100] p-2 shadow bg-base-100 opacity-100 rounded-box w-52"
            >
              {linkList.map((link, index) => (
                <li key={index}>
                  <a
                    aria-label={link.name}
                    title={link.name}
                    href={`/${langName}${link.url}`}
                    className="block py-2 text-black hover:text-second transition duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;