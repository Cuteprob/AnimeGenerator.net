"use client"
import React from 'react';
import { useParams } from 'next/navigation';
import { PrivacyPolicy } from '@/config/privacyPolicy';
import { defaultLocale } from '@/lib/i18n';

const PrivacyPolicyPage = () => {
  const params = useParams();
  const lang = (params.lang as string) || defaultLocale;
  const policy = PrivacyPolicy[lang.toUpperCase() as keyof typeof PrivacyPolicy] || PrivacyPolicy.EN;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-700">Privacy Policy</h1>
      {policy.map((section, index) => (
        <div key={index} className="mb-6">
          <h2 className="text-2xl font-semibold mb-2 text-gray-700">{section.title}</h2>
          <p className="text-gray-500">{section.content}</p>
        </div>
      ))}
    </div>
  );
};

export default PrivacyPolicyPage;
