"use client"
import React from 'react';
import { useParams } from 'next/navigation';
import { TermsOfService } from '@/config/termsOfService';
import { defaultLocale } from '@/lib/i18n';

const TermsOfServicePage = () => {
  const params = useParams();
  const lang = (params.lang as string) || defaultLocale;
  const terms = TermsOfService[lang.toUpperCase() as keyof typeof TermsOfService] || TermsOfService.EN;

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-gray-700">Terms of Service</h2>
      {terms.map((section, index) => (
        <div key={index} className="mb-6">
          <h3 className="text-2xl font-semibold mb-2 text-gray-700">{section.title}</h3>
          <p className="text-gray-500">{section.content}</p>
        </div>
      ))}
    </div>
  );
};
TermsOfServicePage.getLayout = (page: React.ReactNode) => <>{page}</>;
export default TermsOfServicePage;
