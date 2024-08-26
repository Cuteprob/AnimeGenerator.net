'use client'
import React, { useState, useCallback } from 'react';
import { CheckIcon, XIcon } from 'lucide-react';
import { PlanProps } from '@/types/pricing';
import Link from 'next/link';
import toast from 'react-hot-toast';

interface PricingPlanProps extends PlanProps {
  isAnnual: boolean;
  locale:any;
  langName:string;
}

const PricingPlan: React.FC<PricingPlanProps> = ({ 
  title, 
  price, 
  annualDiscount, 
  duration, 
  credits, 
  features, 
  recommend, 
  bestValue, 
  isAnnual,
  locale,
  langName
}) => {
    const [showModal, setShowModal] = useState(false);
    const [email, setEmail] = useState('');

    const getPlanStyle = () => {
        switch(title) {
            case 'Free':
                return 'bg-gradient-to-br from-gray-500 to-gray-600';
            case 'Basic':
                return 'bg-gradient-to-br from-blue-500 to-purple-600';
            case 'Pro':
                return 'bg-gradient-to-br from-purple-500 to-pink-600';
            default:
                return 'bg-gradient-to-br from-indigo-500 to-blue-600';
        }
    };

    const calculatePrice = () => {
        if (isAnnual && annualDiscount > 0) {
            const discountedPrice = price * (1 - annualDiscount / 100);
            return discountedPrice.toFixed(2);
        }
        return price.toFixed(2);
    };

    const calculateAnnualPrice = () => {
        if (isAnnual && annualDiscount > 0) {
            return (price * (1 - annualDiscount / 100) * 12).toFixed(2);
        }
        return (price * 12).toFixed(2);
    };

    const handleSubscribe = useCallback(() => {
        setShowModal(true);
    }, []);

    const handleSubmit = useCallback((e: React.FormEvent) => {
        e.preventDefault();
        // Here you would typically send this data to your backend
        console.log(`${locale.submit1} ${email} ${locale.submit2} ${title} ${locale.submit3}`);
        setShowModal(false);
        setEmail('');
        // toast.success('Thank you for your interest! We will notify you when premium services are available.');
        toast.success(locale.submitSuccess);
    }, [email, title]);

    return (
        <>
            <div className={`${getPlanStyle()} rounded-lg p-6 shadow-md relative overflow-hidden`}>
                {bestValue && (
                    <div className="absolute top-0 left-0 bg-yellow-400 text-gray-800 text-xs font-semibold px-3 py-1 rounded-br-lg">
                        {locale.bestValue}
                    </div>
                )}
                {recommend && (
                    <div className="absolute top-0 left-0 bg-yellow-400 text-gray-800 text-xs font-semibold px-3 py-1 rounded-br-lg">
                        {locale.mostPopular}
                    </div>
                )}
                {isAnnual && annualDiscount > 0 && (
                    <div className="absolute top-0 right-0 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-bl-lg transform rotate-12 translate-x-2 -translate-y-1 shadow-md">
                        Save {annualDiscount}%
                    </div>
                )}
                <div className="flex justify-between items-center mb-4 mt-6">
                    <h3 className="text-xl font-bold text-white">{title}</h3>
                </div>
                <div className="mb-4">
                    {isAnnual && price > 0 ? (
                        <>
                            <span className="text-lg line-through text-gray-300 mr-2">${price.toFixed(2)}</span>
                            <span className="text-3xl font-bold text-white">${calculatePrice()}</span>
                        </>
                    ) : (
                        <span className="text-3xl font-bold text-white">${calculatePrice()}</span>
                    )}
                    <span className="text-base font-normal text-white"> / {duration}</span>
                </div>
                <ul className="mb-6">
                    {features.map((feature, index) => (
                        <li key={index} className="flex items-center mb-2 text-white">
                            {feature.included ? <CheckIcon className='mr-2' /> : <XIcon className='mr-2' />}
                            {feature.text}
                        </li>
                    ))}
                </ul>
                <div className="flex items-center justify-between">
                    {title === locale.free_title ? (
                        <Link href={`/${langName}`} className="flex-grow bg-white bg-opacity-20 hover:bg-opacity-30 text-white font-bold py-3 px-6 rounded-full transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-center">
                            {locale.free_button}
                        </Link>
                    ) : (
                        <button onClick={handleSubscribe} className="flex-grow bg-second/80 hover:bg-second text-white font-bold py-3 px-6 rounded-full transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                            {locale.basic_button}
                        </button>
                    )}
                    {isAnnual && title !== locale.free_title && (
                        <span className="text-xs text-white ml-2">
                            {locale.billed} ${calculateAnnualPrice()}
                        </span>
                    )}
                </div>

                {showModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-gradient-to-br from-first to-purple-600 p-8 rounded-lg max-w-md w-full text-white shadow-xl">
                            <h2 className="text-2xl font-bold mb-4">{locale.subscribe} {title} {locale.plan}</h2>
                            <p className="mb-6">{locale.premium} {locale.soon}</p>
                            <form onSubmit={handleSubmit}>
                                <input 
                                    type="email" 
                                    value={email} 
                                    onChange={(e) => setEmail(e.target.value)} 
                                    placeholder="Enter your email" 
                                    className="w-full p-3 mb-4 border border-purple-300 rounded bg-white bg-opacity-20 text-white placeholder-purple-200 focus:outline-none focus:border-purple-500"
                                    required
                                />
                                <div className="flex justify-end">
                                    <button 
                                        type="button" 
                                        onClick={() => setShowModal(false)} 
                                        className="mr-4 px-6 py-2 text-purple-200 rounded hover:bg-purple-700 transition duration-300"
                                    >
                                        {locale.cancel}
                                    </button>
                                    <button 
                                        type="submit" 
                                        className="px-6 py-2 bg-second text-white rounded hover:bg-opacity-80 transition duration-300"
                                    >
                                        {locale.submit}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default PricingPlan;