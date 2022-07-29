const Overlay = (props) => {
    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-[#28312fdb] flex flex-col items-center justify-center">
            {props.children}
        </div>
    )
}

export default Overlay;