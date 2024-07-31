const HeroSection = ({ locale }: { locale: any}) => {
    return ( 
        <section
            className="relative z-10 flex flex-col items-start md:items-center py-10 md:py-20 overflow-hidden"
            
        >
            <h1 className='font-bold text-5xl md:text-7xl bg-gradient-to-r from-base-content from-50% to-[#9c9c9c] text-center bg-clip-text text-transparent !leading-[1.25em] mb-5'>
                {locale.h1}
            </h1>
            
            {/* 背景设置 */}
            <div className='absolute w-[100%] left-[0] top-[10%] md:top-[20%] h-[300px]'>
                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    id='patternId'
                    width='100%'
                    height='100%'
                >
                    <defs>
                        <pattern
                            id='a'
                            patternUnits='userSpaceOnUse'
                            width='20'
                            height='20'
                            patternTransform='scale(3) rotate(0)'
                        >
                            <rect
                                x='0'
                                y='0'
                                width='100%'
                                height='100%'
                                fill='hsla(0, 0%, 100%, 0)'
                            ></rect>
                            <path
                                d='M 10,-2.55e-7 V 20 Z M -1.1677362e-8,10 H 20 Z'
                                strokeWidth='0.5'
                                className='stroke-base-content/50'
                                fill='none'
                            ></path>
                        </pattern>
                    </defs>
                    <rect
                        width='800%'
                        height='800%'
                        transform='translate(0,0)'
                        fill='url(#a)'
                    ></rect>
                </svg>
                {/* <div className='bg-gradient-to-b from-base-100  from-20% to-transparent absolute inset-0 '></div> */}
                <div className='bg-gradient-to-l from-base-100  from-1% to-transparent to-30% absolute inset-0'></div>
                <div className='bg-gradient-to-r from-base-100  from-1% to-transparent to-30% absolute inset-0'></div>
                <div className='bg-gradient-to-t from-base-100  from-1% to-transparent to-30% absolute inset-0'></div>
            </div>
        </section>
     );
}
 
export default HeroSection;