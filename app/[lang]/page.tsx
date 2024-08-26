import CTASection from "@/components/home-section/cta";
import FAQSection from "@/components/home-section/faq";
import FeatureSection from "@/components/home-section/feature";
import Generator from "@/components/home-section/generator/generator";
import HeroSection from "@/components/home-section/hero";
import HowToUse from "@/components/home-section/how-to-use";
import PricingSection from "@/components/home-section/pricing/pricing";
import TestimonialSection from "@/components/home-section/testimonial";

import { locales, getDictionary, defaultLocale } from "@/lib/i18n";

export default async function Home({
  params: { lang },
}: {
  params: { lang: string }
}) {
  const langName = lang || defaultLocale;
  const dict = await getDictionary(langName);

  return (
    <div className="w-full mx-auto">
      <div className="w-full bg-gradient-to-br from-first to-purple-600 text-white text-center">
        <HeroSection
          locale={dict.Hero} langName={langName}
        />
        <Generator id="Generator" locale={dict.Generator} langName={langName} />
      </div>


      <FeatureSection locale={dict.Feature} langName={langName} />
      <HowToUse locale={dict.HowItWorks} langName={langName} />
      <TestimonialSection locale={dict.Testimonial} langName={langName} />
      <div className="bg-gradient-to-br from-first to-purple-600 text-white min-h-screen px-4 sm:px-6 lg:px-8 py-10">
      <PricingSection locale={dict.Pricing} langName={langName} />
      </div>
      
      <FAQSection locale={dict.Faq} langName={langName} />
      <CTASection locale={dict.CTA} langName={langName} />

    </div>
  );
}

export async function generateStaticParams() {
  return ['en', 'zh', 'es', 'ru', 'ja', 'fr'].map((lang) => ({ lang }));
}