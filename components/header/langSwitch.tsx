'use client';
import { useParams, useRouter, usePathname } from 'next/navigation';
import { defaultLocale, LocaleNames, localeNames } from '@/lib/i18n';
import { useState, useEffect } from 'react';

export default function LangSwitch() {
  const params = useParams(); // 动态获取 URL 参数
  const lang = params.lang as string | undefined; // 断言 lang 是 string 或 undefined
  const pathname = usePathname(); // 动态获取当前路径
  const router = useRouter();

  // 定义 state 来保存当前的语言名称
  const [langName, setLangName] = useState(defaultLocale);

  // 使用 useEffect 来监听 lang 的变化
  useEffect(() => {
    const currentLang = (lang && lang !== 'index') ? lang : defaultLocale;
    setLangName(currentLang);
  }, [lang]); // 依赖 lang，当 lang 变化时重新计算 langName

  const [isOpen, setIsOpen] = useState(false);

  const handleSwitchLanguage = (value: string) => {
    return () => {
      let newPathname;
      if (pathname === '/') {
        newPathname = `/${value}`;
      } else {
        if (value === defaultLocale) {
          newPathname = '/';
        } else {
          newPathname = pathname.replace(`/${langName}`, `/${value}`);
        }
      }
      router.replace(newPathname);
      setIsOpen(false);
    };
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  }

  return (
    <div className='dropdown dropdown-end dropdown-hover z-[100]'>
      <div
        tabIndex={0}
        role='button'
        onClick={toggleDropdown}
        className='flex items-center justify-center md:bg-base-100 md:rounded-full w-15 md:w-[100px] h-5 text-sm md:h-8 md:shadow-sm md:hover:shadow-md transition-all'
      >
        {localeNames[langName as keyof LocaleNames]}
      </div>
      <ul
        tabIndex={0}
        className={`dropdown-content menu bg-base-100 rounded-box z-[1] w-40 p-2 shadow ${isOpen ? '' : 'hidden'}`}
      >
        {Object.keys(localeNames).map((key) => {
          const name = localeNames[key as keyof LocaleNames];
          return (
            <li key={key}>
              <a
                href='#'
                title={`switch to ${name}`}
                className='cursor-pointer'
                onClick={handleSwitchLanguage(key)}
              >
                {name}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}