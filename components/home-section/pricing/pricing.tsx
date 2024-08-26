'use client';
import React, { useState } from 'react';
import PricingPlan from '@/components/home-section/pricing/pricingplan';
import { PricingSectionProps, PlanProps } from '@/types/pricing';
import { PricingList } from '@/config/pricingList';

const PricingSection: React.FC<PricingSectionProps> = ({ locale, langName }) => {
  const [isAnnual, setIsAnnual] = useState(true);
  console.log("langName ==== >", langName);
  const getPricingKey = (langName: string | undefined): string => {

    if (typeof langName === 'string' && langName.length > 0) {
      return `PRICING_${langName.toUpperCase()}`;
    }
    return 'PRICING_EN'; // 默认使用英语
  };

  const plans: PlanProps[] = PricingList[getPricingKey(langName)] || PricingList.PRICING_EN;

  return (
    <div className="bg-gradient-to-br from-first to-purple-600 text-white min-h-screen px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto py-10">
        <h2 className='text-3xl md:text-5xl font-bold mb-4 text-center'>{locale.h2}</h2>
        <h3 className="text-lg md:text-xl mb-12 text-center">{locale.h3}</h3>
        <div className="flex justify-center items-center mb-8">
          <span className={`mr-3 ${!isAnnual ? 'font-bold' : ''}`}>{locale.monthly}</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              className="sr-only peer" 
              checked={isAnnual}
              onChange={() => setIsAnnual(!isAnnual)}
              aria-label="Annual Subscription"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-first/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-second"></div>
          </label>
          <span className={`ml-3 ${isAnnual ? 'font-bold' : ''}`}>{locale.annually}</span>
          {isAnnual && (
            <span className="ml-2 bg-second bg-opacity-20 text-second text-xs font-semibold px-2 py-1 rounded-full">
              {locale.saveUpTo}
            </span>
          )}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <PricingPlan key={plan.title} {...plan} isAnnual={isAnnual} locale={locale} langName={langName} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingSection;