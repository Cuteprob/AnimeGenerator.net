import { FaLeaf } from "react-icons/fa";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json())


const CreditsNum = () => {
    
    const {data,error} = useSWR(`/api/credits`,fetcher,{
        refreshInterval:0,
        revalidateOnFocus:false,
    })


    const credits = error ? "0" : data ? data.credits : <span className="animate-pulse"></span>;
    return (
        <div className="flex items-center">
            {/* <div className="relative flex items-center justify-center md:w-5 md:h-5 w-3 h-3 mr-1 bg-yellow-400 rounded-full border-2 border-yellow-500 shadow-inner">
                <div className="absolute inset-0 bg-yellow-300 rounded-full m-1"></div>
                <span className="relative text-xs font-bold text-yellow-800">$</span>
            </div> */}
            <FaLeaf className="relative text-green-500  w-3 h-3 mr-1" />
            <span className="font-bold md:text-xm text-xs text-green-500">{credits}</span>
        </div>
    );
}

export default CreditsNum;