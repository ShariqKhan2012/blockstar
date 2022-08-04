const ContainedLayout = (props) => {
    return (
        <div className="w-full max-w-7xl mx-auto bg-white shadow-xl rounded-lg my-12 py-12 px-8">
            {props.children}
        </div>
    )
}

export default ContainedLayout;