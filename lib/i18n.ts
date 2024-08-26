import {match} from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator';

export const locales = ['', 'en', 'en-US', 'zh', 'zh-CN', 'zh-TW', 'zh-HK', 'ja', 'ar', 'es', 'ru', "fr"];
export const defaultLocale = 'en';
export interface LocaleNames {
	en: string;
	zh: string;
	ja: string;
	ar: string;
	es: string;
	ru: string;
	fr: string;
}

export const localeNames:LocaleNames = {
	en: '🇺🇸 English',
	ja: '🇯🇵 日本語',
	ar: '🇸🇦 العربية',
	es: '🇪🇸 Español',
	ru: '🇷🇺 Русский',
	fr: '🇫🇷 Français',
	zh: '🇨🇳 中文',
};

export function getLocale(headers:any) {
	let languages = new Negotiator({ headers }).languages();
	return match(languages, locales, defaultLocale);
}

const dictionaries:any = {
	en: () => import('@/locales/en.json').then((module) => module.default),
	zh: () => import('@/locales/zh.json').then((module) => module.default),
	ja: () => import('@/locales/ja.json').then((module) => module.default),
	ar: () => import('@/locales/ar.json').then((module) => module.default),
	es: () => import('@/locales/es.json').then((module) => module.default),
	ru: () => import('@/locales/ru.json').then((module) => module.default),
	fr: () => import('@/locales/fr.json').then((module) => module.default),
};

export const getDictionary = async (locale:string) => {
	if (['zh-CN', 'zh-TW', 'zh-HK'].includes(locale)) {
		locale = 'zh';
	}

	if (!Object.keys(dictionaries).includes(locale)) {
		locale = 'en';
	}

	return dictionaries[locale]();
};

export const revalidate = 3600; // 每小时重新验证一次