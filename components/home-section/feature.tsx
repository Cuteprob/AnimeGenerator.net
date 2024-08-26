import Image from "next/image";
import Link from "next/link";

const FeatureSection = ({ locale, langName }: { locale: any, langName: string }) => {
    return (
        <section className="relative py-10 md:py-20">
            <div className="container mx-auto px-4 text-black">
                <div className="text-center  mb-10">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-5">{locale.h2}</h2>
                    <h3 className="font-semibold text-gray-500 text-xl md:text-2xl">
                        {locale.h3}
                    </h3>
                </div>

                <div className="flex flex-col md:grid md:grid-cols-2 gap-4 md:gap-8 md:py-5 md:px-20 items-center">
                    <div className="order-1 md:order-none">
                        <Image
                            src={"/girl1.png"}
                            alt="Play Icon"
                            width={500}
                            height={520}
                            className="mb-4"
                        />
                    </div>
                    <div className="flex flex-col order-2 md:order-none">
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold mb-4">{locale.feature1}</h3>
                            <p>{locale.description1}</p>
                        </div>
                        <div className="mt-4 py-2 text-center mb-8 md:mb-0">
                            <Link href={`/${langName}`} className="px-10 py-3 bg-second text-white rounded-full inline-block hover:bg-opacity-80 transition-all duration-300">
                                {locale.button}
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:grid md:grid-cols-2 gap-4 md:gap-8 md:py-5 md:px-20 items-center">
                    <div className="order-1 md:order-none md:col-start-2">
                        <Image
                            src={"/1001.png"}
                            alt="Play Icon"
                            width={500}
                            height={520}
                            className="mb-4"
                        />
                    </div>
                    <div className="flex flex-col order-2 md:order-none md:col-start-1 md:row-start-1">
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold mb-4">{locale.feature2}</h3>
                            <p>{locale.description2}</p>
                        </div>
                        <div className="mt-4 py-2 text-center mb-8 md:mb-0">
                            <Link href={`/${langName}`}className="px-10 py-3 bg-second text-white rounded-full inline-block hover:bg-opacity-80 transition-all duration-300">
                                {locale.button}
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:grid md:grid-cols-2 gap-4 md:gap-8 md:py-5 md:px-20 items-center">
                    <div className="order-1 md:order-none">
                        <Image
                            src={"/wukong.png"}
                            alt="Play Icon"
                            width={500}
                            height={520}
                            className="mb-4"
                        />
                    </div>
                    <div className="flex flex-col order-2 md:order-none">
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold mb-4">{locale.feature3}</h3>
                            <p>{locale.description3}</p>
                        </div>
                        <div className="mt-4 py-2 text-center mb-8 md:mb-0">
                            <Link href={`/${langName}`} className="px-10 py-3 bg-second text-white rounded-full inline-block hover:bg-opacity-80 transition-all duration-300">
                                {locale.button}
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:grid md:grid-cols-2 gap-4 md:gap-8 md:py-5 md:px-20 items-center">
                    <div className="order-2 md:order-1">
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold mb-4">{locale.feature4}</h3>
                            <p>{locale.description4}</p>
                        </div>
                        <div className="mt-4 py-2 text-center mb-8 md:mb-0">
                            <Link href={`/${langName}`} className="px-10 py-3 bg-second text-white rounded-full inline-block hover:bg-opacity-80 transition-all duration-300">
                                {locale.button}
                            </Link>
                        </div>
                    </div>
                    <div className="order-1 md:order-2">
                        <Image
                            src={"/girl2.png"}
                            alt="Character Design"
                            width={500}
                            height={520}
                            className="mb-4"
                        />
                    </div>
                    <div className='hidden md:block absolute left-[20%] top-[10%] z-0'>
                        <div className='absolute bottom-0 left-[-20%] right-0 top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]'></div>
                    </div>
                </div>

                <div className="flex flex-col md:grid md:grid-cols-2 gap-4 md:gap-8 md:py-5 md:px-20 items-center">
                    <div className="order-1 md:order-1">
                        <Image
                            src={"/1004.png"}
                            alt="Play Icon"
                            width={500}
                            height={520}
                            className="mb-4"
                        />
                    </div>
                    <div className="flex flex-col order-2 md:order-2">
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold mb-4">{locale.feature5}</h3>
                            <p>{locale.description5}</p>
                        </div>
                        <div className="mt-4 py-2 text-center mb-8 md:mb-0">
                            <Link href={`/${langName}`} className="px-10 py-3 bg-second text-white rounded-full inline-block hover:bg-opacity-80 transition-all duration-300">
                                {locale.button}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default FeatureSection;