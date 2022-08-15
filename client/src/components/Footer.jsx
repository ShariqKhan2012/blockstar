const Footer = () => {
    return (
        <footer className="bg-[#444]">
                <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-3 gap-y-16 gap-x-[80px] text-white">
                    <div>
                        <h2 className="text-lg font-bold">About</h2>
                        <ul className="my-4 text-sm">
                            <li className="mb-2"><a href="#">About Us</a></li>
                            <li className="mb-2"><a href="#">Press</a></li>
                            <li><a href="#">Careers</a></li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-lg font-bold">Learn More</h2>
                        <ul className="my-4 text-sm">
                            <li className="mb-2"><a href="#">How It Works</a></li>
                            <li className="mb-2"><a href="#">Why Us</a></li>
                            <li><a href="#">FAQ</a></li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-lg font-bold">Legal</h2>
                        <ul className="my-4 text-sm">
                            <li className="mb-2"><a href="/credits">Credits</a></li>
                            <li className="mb-2"><a href="#">Terms Of Service</a></li>
                            <li><a href="#">Privacy Policy</a></li>
                        </ul>
                    </div>
                </div>
        </footer>

    )
}

export default Footer;