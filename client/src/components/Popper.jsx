const Popper = (props) => {
    if(!props.show) {
        return '';
    }
    return (
        <div className="absolute z-10 top-[30px] right-0 w-[250px] rounded-lg p-6 bg-[#fafafa] border-2 border-[#ddd] shadow-lg text-center">
            <button onClick={props.onClose} className="absolute top-[1px] right-[1px] bg-[#f9f9f9]">
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16" id="IconChangeColor"> <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" id="mainIconPathAttribute" fill="#000000"></path> </svg>
            </button>
            {props.children}
        </div>
    )
}

export default Popper;