import { getDictionary } from '@/lib/i18n';

const HeroSection = async ({ locale, langName }: { locale: any, langName: string}) => {
 
    return (
        <section
            className="pt-14 pb-5 clip-path-hero"
        >
            <div className="w-full px-4 max-w-none">
                <h2 className='text-3xl md:text-5xl font-bold mb-4'>
                    {locale.h1}
                </h2>
                <h3 className='text-lg md:text-xl mb-8'>{locale.h2}</h3>
            </div>

        </section>
    );
}

export default HeroSection;