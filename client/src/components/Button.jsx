const Button = (props) => {
    let bgColor = 'bg-[#9106cd]'; //primary, by default
    let bgHoverColor = !props.disabled ? 'hover:bg-[#850cb9]' : ''; //primary, by default
    let color = '';
    let border = '';
    let shadow = 'shadow-lg shadow-gray-400/50';

    if (props.type == 'secondary') {
        bgColor = 'bg-[#00c9b7]';
        if (!props.disabled) {
            bgHoverColor = 'hover:bg-[#36b1a0]';
        }
    }
    else if (props.type == 'danger') {
        bgColor = 'bg-red-500';
        if (!props.disabled) {
            bgHoverColor = 'hover:bg-red-600';
        }
    }
    else if (props.type == 'warning') {
        bgColor = 'bg-orange-500';
        if (!props.disabled) {
            bgHoverColor = 'hover:bg-orange-600';
        }
    }

    if (props.disabled) {
        shadow = '';
        border = 'border-[1px] border-gray-500';
        bgColor = 'bg-gray-300';
        color = 'text-[#888]';
    }

    return (
        <button
            onClick={props.onClick}
            className={`${bgColor} ${bgHoverColor} ${shadow} py-2 px-6 min-w-[100px] rounded-lg ${border}  text-white ${color} text-center font-medium text-md`}
            disabled={props.disabled}
        >
            {props.label}
        </button>
    )
}

export default Button;