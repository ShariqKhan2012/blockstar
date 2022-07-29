import Overlay from './Overlay';

const Loader = ({ show }) => {
    if (!show) {
        return '';
    }
    return (
        <Overlay>
            <div className="w-16 h-16 border-[6px] border-[#9106cd] border-solid rounded-full animate-spin border-t-transparent"> </div>
            <h2 className="mt-4 text-center text-[#ddd]  font-semibold">Please Wait...</h2>
        </Overlay>
    )
}

export default Loader;