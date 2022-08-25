const TestimonialCard = ({ name, avatarUrl }) => {
    return (
        <div className="shadow-2xl shadow-[#aaa] rounded-xl border-solid border-1 border-transparent">
            <img className="object-cover rounded-sm tw-32 th-32 mx-auto w-full" src={avatarUrl} alt="avatar" />

            <div className="px-4 py-8 bg-[#f5f5f5]">
                <h2 className="mb-4 text-xl font-extrabold">{name}</h2>
                <p className="relative mt-2 text-[#444] text-sm font-regular">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam.
                </p>
            </div>
        </div>
    )
}

export default TestimonialCard;