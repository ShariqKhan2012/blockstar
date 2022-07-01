const Button = (props) => {
    return (
        <button
            onClick={props.onClick}
            className="bgt-[#9106cd] bg-[#00c9b7] hover:bg-[#36b1a0] py-2 px-6  inline-block rounded-lg text-white text-center font-medium text-md"
        >
            {props.label}
        </button>
    )
}

export default Button;