import CTASection from "@/components/home-section/cta";
import FAQSection from "@/components/home-section/faq";
import FeatureSection from "@/components/home-section/feature";
import HeroSection from "@/components/home-section/hero";
import PricingSection from "@/components/home-section/pricing";
import TestimonialSection from "@/components/home-section/testimonial";

import { locales, getDictionary, defaultLocale } from "@/lib/i18n";


export default async function Home({
  params: {lang},
}:{
  params: {lang: string}
}) {
  const langName = (lang && lang[0]) || defaultLocale;
  const dict = await getDictionary(langName);
  return (
   <div className="max-w-[1280px] mx-auto">
      <HeroSection 
        locale ={dict.Hero}
      />
      <FeatureSection locale={dict.Feature} langName={langName}/>
      <PricingSection locale={dict.Pricing} langName={langName}/>
      <TestimonialSection locale={dict.Testimonial} langName={langName}/>
      <FAQSection locale={dict.Faq} langName={langName}/>
      <CTASection locale={dict.CTA} CTALocale={dict.CTAButton}/>
   </div>
  );
}
