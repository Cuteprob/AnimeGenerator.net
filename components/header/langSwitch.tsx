'use client';
import { useParams, useRouter, usePathname } from 'next/navigation';
import { defaultLocale, LocaleNames, localeNames } from '@/lib/i18n';
import { useState, useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { useLoading } from '@/lib/loadingContext';

export default function LangSwitch() {
  const params = useParams();
  const lang = (params.lang as string) || defaultLocale;
  const pathname = usePathname();
  const router = useRouter();
  const { setLoading } = useLoading();

  const [isOpen, setIsOpen] = useState(false);
  const [isChanging, setIsChanging] = useState(false);

  const handleSwitchLanguage = useCallback((value: string) => {
    return async () => {
      if (lang === value) return; // 如果选择的语言与当前语言相同，不执行任何操作
      
      setIsChanging(true);
      setLoading(true, 'Switching language...');
      let newPathname = pathname;
      const langRegex = new RegExp(`^/(${Object.keys(localeNames).join('|')})`);
      
      if (value === defaultLocale) {
        newPathname = pathname.replace(langRegex, '') || '/';
      } else if (langRegex.test(pathname)) {
        newPathname = pathname.replace(langRegex, `/${value}`);
      } else {
        newPathname = `/${value}${pathname}`;
      }

      // 确保路径不为空
      if (newPathname === '') newPathname = '/';

      try {
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Language switch timeout')), 5000)
        );
        await Promise.race([router.push(newPathname, { scroll: false }), timeoutPromise]);
      } catch (error) {
        console.error('Language switch error:', error);
        // 可以在这里添加错误提示
      } finally {
        setIsChanging(false);
        setIsOpen(false);
        setLoading(false);
      }
    };
  }, [lang, pathname, router, setLoading]);

  const toggleDropdown = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  return (
    <div className='dropdown dropdown-end dropdown-hover z-[100]'>
      <div
        tabIndex={0}
        role='button'
        onClick={toggleDropdown}
        className={cn(
          'flex items-center justify-center bg-base-100 rounded-full text-xs text-slate-600 w-[100px] h-5 h-8 shadow-sm md:hover:shadow-md transition-all',
          isChanging && 'opacity-50 cursor-not-allowed'
        )}
      >
        {localeNames[lang as keyof LocaleNames]}
      </div>
      <ul
        tabIndex={0}
        className={cn("dropdown-content menu bg-base-100 rounded-box text-slate-600 text-xs z-[1] w-40 p-2 shadow", !isOpen && "hidden")}
      >
        {Object.entries(localeNames).map(([key, name]) => (
          <li key={key}>
            <a
              href='#'
              title={`switch to ${name}`}
              className={cn('cursor-pointer', lang === key && 'font-bold')}
              onClick={handleSwitchLanguage(key)}
            >
              {name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}