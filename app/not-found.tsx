import Image from 'next/image';
import Link from 'next/link';
import { getDictionary,defaultLocale } from '@/lib/i18n';

export default async function NotFound() {
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 text-center">
      <div className="w-full max-w-md">
        <Image
          src="/404.png"
          alt="404 Not Found"
          width={400}
          height={400}
          priority
        />
      </div>
      <h1 className="mt-8 text-3xl md:text-4xl font-bold text-gray-800">404 - Page Not Found</h1>
      <p className="mt-4 text-lg md:text-xl text-gray-600">The page you are looking for does not exist or has been moved.</p>
      <Link 
        href={`/`}
        className="mt-8 px-6 py-3 bg-first text-white rounded-full hover:bg-first/75 transition-colors duration-300"
      >
        Go Back Home
      </Link>
    </div>
  );
}