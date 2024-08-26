import { FAQList } from "@/config/faqList";
import { FAQ } from "@/types/faq";

const FAQSection = ({ locale, langName }: { locale: any, langName: string }) => {
    const getFAQKey = (langName: string | undefined): string => {

        if (typeof langName === 'string' && langName.length > 0) {
          return `FAQ_${langName.toUpperCase()}`;
        }
        return 'FAQ_EN'; // 默认使用英语
      };
    let list: FAQ[] = FAQList[getFAQKey(langName) as keyof typeof FAQList] || FAQList['FAQ_EN'];
    
    return (
        <section
            className='relative py-10 text-black'
        >
            <h2 className='font-bold my-10 text-3xl md:text-5xl  md:text-center '>
                {locale.h2}
            </h2>

            <div className='relative z-10 w-full md:w-10/12 mx-auto flex flex-col gap-5'>
                {list.map((item, index) => {
                    return (
                        <div
                            key={index}
                            tabIndex={0}
                            className='collapse collapse-arrow bg-base-200 border-b-[1px] border-base-content rounded-none bg-transparent'
                        >
                            <div className='collapse-title text-xl font-medium'>
                                <h3>{item.question}</h3>
                            </div>
                            <div className='collapse-content'>
                                <h4>{item.answer}</h4>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className='hidden md:block absolute left-[50%] top-[30%] z-0'>
                <div className='absolute bottom-0 left-[-20%] right-0 top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]'></div>
            </div>
        </section>
    );
}

export default FAQSection;