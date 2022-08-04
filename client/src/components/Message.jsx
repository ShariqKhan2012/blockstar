const Message = (props) => {
    const color = (props.type == 'error') ? 'red' : 'green';
    return (
        <div className={`w-auto text-left border-1 bg-[#f5f8ff] border-l-4 border-${color}-500 p-4`}>
            {props.children}
        </div>
    )
}

export default Message;