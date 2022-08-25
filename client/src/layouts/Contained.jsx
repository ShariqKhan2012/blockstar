const ContainedLayout = (props) => {
    return (
        <div className="w-full relative max-w-7xl mx-auto bg-white shadow-xl rounded-lg my-12 px-4 md:px-8 py-8 md:py-12">
            {props.children}
        </div>
    )
}

export default ContainedLayout;