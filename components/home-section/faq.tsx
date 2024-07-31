const FAQSection = ({locale, langName}:{locale:any, langName:string}) => {
    return ( 
        <section
            className='relative py-10 md:py-20'
        >
            <h3 className='font-bold text-3xl md:text-5xl bg-gradient-to-r from-base-content from-50% to-[#9c9c9c] md:text-center bg-clip-text text-transparent !leading-[1.25em]'>
           {locale.h3}
            </h3>
            <div className='hidden md:block absolute left-[50%] top-[30%] z-0'>
				<div className='absolute bottom-0 left-[-20%] right-0 top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]'></div>
			</div> 
        </section>
     );
}
 
export default FAQSection;