const Ribbon = (props) => {
    return (
        <div className="absolute -top-[5px] -right-[5px] z-[1] overflow-hidden w-[75px] h-[75px] text-right">
            <span className="absolute top-[19px] -right-[21px] text-[11px] font-bold text-white text-center rotate-[45deg] w-[100px] block bg-[#00c9b7] leading-5 shadow-[0_3px_10px_-5px_rgba(0,0,0,1)]   bg-gradient-to-b from-[#00c9b7] to-[#14a296] ">
                {props.label}
                <span className="before absolute left-0 top-[100%] -z-[1] border-[3px] border-l-[#14a296] border-t-[#14a296] border-r-transparent border-b-transparent"></span>
                <span className="after absolute right-0 top-[100%] -z-[1] border-[3px] border-r-[#14a296] border-t-[#14a296] border-l-transparent border-b-transparent"></span>
            </span>
        </div>
    )
}
export default Ribbon;