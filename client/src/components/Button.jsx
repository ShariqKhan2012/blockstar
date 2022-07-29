const Button = (props) => {
    let bgColor = 'bg-[#9106cd]'; //primary, by default
    let bgHoverColor = 'hover:bg-[#850cb9]'; //primary, by default

    if(props.type == 'secondary') {
        bgColor = 'bg-[#00c9b7]';
        bgHoverColor = 'hover:bg-[#36b1a0]';
    }
    else if(props.type == 'danger') {
        bgColor = 'bg-red-500';
        bgHoverColor = 'hover:bg-red-600';
    }
    else if(props.type == 'warning') {
        bgColor = 'bg-orange-500';
        bgHoverColor = 'hover:bg-orange-600';
    }

    return (
        <button
            onClick={props.onClick}
            className={`${bgColor} ${bgHoverColor} shadow-lg shadow-gray-400/50 py-2 px-6 min-w-[100px] rounded-lg text-white text-center font-medium text-md`}
        >
            {props.label}
        </button>
    )
}

export default Button;