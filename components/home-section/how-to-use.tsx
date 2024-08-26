import Link from "next/link";

const HowToUse = ({locale, langName}:{locale:any, langName:string}) => {
    return (
        <section
            className="bg-gradient-to-br from-first to-purple-600 text-white py-16 md:py-20 clip-path-how-it-works"
        >
            <div className="container mx-auto px-4">

                <div className="text-center mb-12">
                    <h2 className="font-bold text-3xl md:text-4xl">
                        {locale.h2}
                    </h2>
                    <h3 className="text-xl text-white mt-2">{locale.h3}</h3>
                </div>


                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="text-center">
                        <div className="bg-white text-primary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                            <span className="text-2xl font-bold">1</span>
                        </div>
                        <h3 className="text-xl font-semibold mb-2">{locale.description1_title}</h3>
                        <h4>{locale.description1}</h4>
                    </div>
                    <div className="text-center">
                        <div className="bg-white text-primary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                            <span className="text-2xl font-bold">2</span>
                        </div>
                        <h3 className="text-xl font-semibold mb-2">{locale.description2_title}</h3>
                        <h4>{locale.description2}</h4>
                    </div>
                    <div className="text-center">
                        <div className="bg-white text-primary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                            <span className="text-2xl font-bold">3</span>
                        </div>
                        <h3 className="text-xl font-semibold mb-2">{locale.description3_title}</h3>
                        <h4>{locale.description3}</h4>
                    </div>
                </div>

                <div className="mt-4 py-2 text-center mb-8 md:mb-0">
                    <Link href={`/${langName}`}  className="px-10 py-3 bg-second text-white rounded-full inline-block hover:bg-opacity-80 transition-all duration-300">
                        {locale.button}
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default HowToUse;