const Switch = (props) => {
    const onInputChanged = (e) => {
        if (props.onToggle) {
            props.onToggle();
        }
    }
    console.log('Switch Props =>', props);
    const onLabel = props.onLabel ?? 'On';
    const offLabel = props.offLabel ?? 'Off';
    
    let checkedBg = 'peer-checked:bg-green-500';
    let uncheckedBg = 'bg-red-500';
    let switchBg = 'after:bg-white';
    let fontColor = 'text-white';
    let shadow = 'shadow-lg';
    let cursor = 'cursor-pointer';

    if(props.disabled) {
        checkedBg = 'peer-checked:bg-gray-300';
        uncheckedBg = 'bg-gray-300';
        switchBg = 'after:bg-gray-400';
        fontColor = 'text-black';
        shadow = '';
        cursor = 'cursor-not-allowed';
    }
    
    return (
        <>
            <label  className={`inline-flex relative items-center mr-5 ${cursor}`}>
                <input type="checkbox" value="" className="sr-only peer" onChange={onInputChanged} checked={props.value} disabled={props.disabled}/>
                <div className={`w-auto h-7 ${fontColor} ${uncheckedBg} rounded-full peer peer-focus:ring-0 peer-focus:ring-purple-300  peer-checked:${fontColor} peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-1 peer-checked:after:right-[23px] peer-checked:after:left-[unset] ${switchBg}  after:borderttt-gray-300 after:borderttt after:rounded-full after:h-5 after:w-5 after:transition-all ${checkedBg} pl-7 pr-[7px] peer-checked:pl-[7px] peer-checked:pr-7 after:left-[3px] grid items-center ${shadow}`}>
                    {props.value ? onLabel : offLabel}
                </div>
            </label>
        </>
    )
}

export default Switch;