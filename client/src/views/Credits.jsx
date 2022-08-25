import ContainedLayout from "@/layouts/Contained";

const rootUrl = import.meta.env.BASE_URL;

const Credits = () => {
    return (
        <ContainedLayout>
            <div className="grid mb-12">
                <h1 className="text-#333 text-4xl font-bold text-center mb-2">Credits</h1>
            </div>

            <div className="mb-12">
                <h2 className="text-center md:text-left text-2xl font-bold">Tools</h2>
                <ul className="mt-8 grid sm:grid-rows md:grid-cols-3 gap-y-5 gap-x-4">
                    <li className="mb-8 flex items-center justify-center md:justify-start">
                        <img className="inline-block h-20 w-20 mr-4" src={rootUrl + "react.svg"} />
                        <p><a className="text-blue-500" href="https://reactjs.org/">React JS </a></p>
                    </li>
                    <li className="mb-8 flex items-center justify-center md:justify-start">
                        <img className="inline-block h-20 w-20 mr-4" src={rootUrl + "vite.svg"} />
                        <p><a className="text-blue-500" href="https://vitejs.dev/">ViteJS </a></p>
                    </li>
                    <li className="mb-8 flex items-center justify-center md:justify-start">
                        <img className="inline-block h-20 w-20 mr-4" src={rootUrl + "web3js.png"} />
                        <p><a className="text-blue-500" href="https://github.com/ethereum/web3.js">Web3JS </a></p>
                    </li>
                    <li className="mb-8 flex items-center justify-center md:justify-start">
                        <img className="inline-block h-20 w-20 mr-4" src={rootUrl + "solidity.svg"} />
                        <p><a className="text-blue-500" href="https://soliditylang.org/">Solidity </a></p>
                    </li>
                    <li className="mb-8 flex items-center justify-center md:justify-start">
                        <img className="inline-block h-20 w-20 mr-4" src={rootUrl + "truffle.svg"} />
                        <p><a className="text-blue-500" href="https://trufflesuite.com/truffle/">Truffle</a></p>
                    </li>
                    <li className="mb-8 flex items-center justify-center md:justify-start">
                        <img className="inline-block h-20 w-20 mr-4" src={rootUrl + "ganache.svg"} />
                        <p><a className="text-blue-500" href="https://trufflesuite.com/ganache/">Ganache </a></p>
                    </li>
                    <li className="mb-8 flex items-center justify-center md:justify-start">
                        <img className="inline-block h-20 w-20 mr-4" src={rootUrl + "tailwind.svg"} />
                        <p><a className="text-blue-500" href="https://tailwindcss.com/">Tailwind CSS </a></p>
                    </li>
                </ul>
            </div>

            <hr />

            <div className="mt-12">
                <h2 className="text-center md:text-left text-2xl font-bold">Images</h2>
                <ul className="mt-8 grid sm:grid-rows md:grid-cols-3 gap-y-6 gap-x-4">
                    <li className="mb-8 flex items-center justify-center md:justify-start">
                        <img className="inline-block h-20 w-20 mr-4" src={rootUrl + "hero.png"} />
                        <p>by <a className="text-blue-500" href="https://pixabay.com/users/demysticway-5214362/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=4195221">Debi Brady</a> from <a className="text-blue-500" href="https://pixabay.com//?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=4195221">Pixabay</a></p>
                    </li>
                    <li className="mb-8 flex items-center justify-center md:justify-start">
                        <img className="inline-block h-20 w-20 mr-4" src={rootUrl + "0.png"} />
                        <p>by <a className="text-blue-500" href="https://pixabay.com/users/andremsantana-61090/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=4824353">André Santana AndreMS</a> from <a className="text-blue-500" href="https://pixabay.com//?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=4824353">Pixabay</a></p>
                    </li>
                    <li className="mb-8 flex items-center justify-center md:justify-start">
                        <img className="inline-block h-20 w-20 mr-4" src={rootUrl + "1.png"} />
                        <p>by <a className="text-blue-500" href="https://pixabay.com/users/jayr_jayr-21719584/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=6739934">Jayr</a> from <a className="text-blue-500" href="https://pixabay.com//?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=6739934">Pixabay</a></p>
                    </li>
                    <li className="mb-8 flex items-center justify-center md:justify-start">
                        <img className="inline-block h-20 w-20 mr-4" src={rootUrl + "2.png"} />
                        <p>by <a className="text-blue-500" href="https://pixabay.com/users/clker-free-vector-images-3736/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=25699">Clker-Free-Vector-Images</a> from <a className="text-blue-500" href="https://pixabay.com//?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=25699">Pixabay</a></p>
                    </li>
                    <li className="mb-8 flex items-center justify-center md:justify-start">
                        <img className="inline-block h-20 w-20 mr-4" src={rootUrl + "3.png"} />
                        <p>by <a className="text-blue-500" href="https://pixabay.com/users/alles-2597842/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=4839077">Alexander Lesnitsky</a> from <a className="text-blue-500" href="https://pixabay.com//?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=4839077">Pixabay</a></p>
                    </li>
                    <li className="mb-8 flex items-center justify-center md:justify-start">
                        <img className="inline-block h-20 w-20 mr-4" src={rootUrl + "4.png"} />
                        <p>by <a className="text-blue-500" href="https://pixabay.com/users/graphicmama-team-2641041/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1454349">GraphicMama-team</a> from <a className="text-blue-500" href="https://pixabay.com//?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1454349">Pixabay</a></p>
                    </li>
                    <li className="mb-8 flex items-center justify-center md:justify-start">
                        <img className="inline-block h-20 w-20 mr-4" src={rootUrl + "5.png"} />
                        <p>by <a className="text-blue-500" href="https://pixabay.com/users/clker-free-vector-images-3736/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=303352">Clker-Free-Vector-Images</a> from <a className="text-blue-500" href="https://pixabay.com//?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=303352">Pixabay</a></p>
                    </li>
                    <li className="mb-8 flex items-center justify-center md:justify-start">
                        <img className="inline-block h-20 w-20 mr-4" src={rootUrl + "6.png"} />
                        <p>by <a className="text-blue-500" href="https://pixabay.com/users/openclipart-vectors-30363/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=150473">OpenClipart-Vectors</a> from <a className="text-blue-500" href="https://pixabay.com//?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=150473">Pixabay</a></p>
                    </li>
                </ul>
            </div>


        </ContainedLayout>
    )
}

export default Credits;