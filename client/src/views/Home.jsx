import { useParams, NavLink } from 'react-router-dom';
import TestimonialCard from '@/components/TestimonialCard';
import FullWidthLayout from '@/layouts/FullWidth';
//import img from '@/src/1.jpg'

const rootUrl = import.meta.env.BASE_URL;

const ContestantDetails = () => {
    const params = useParams();
    const id = params.id;

    return (
        <FullWidthLayout>
            <div className="bg-white">
                <section className="bg-white max-w-7xl mx-auto px-4 py-24">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-16 gap-x-[80px]">
                        <div className="order-2 md:order-1 grid items-center">
                            <div>
                                <h1 className="text-#333 text-3xl font-bold text-center">The Best Place For Music Contests</h1>
                                <p className="mt-2 text-[#444] text-sm font-regular leading-7">
                                    Start a contest, and discover new talent. Or partipate in one of the many exciting contests
                                    and show the world how awesome you are. On a global platform!
                                </p>
                                <div className="px-4 pt-4 flex justify-center">
                                    <NavLink to="/contests/new" className="bg-[#00c9b7] hover:bg-[#36b1a0] py-2 px-6  inline-block mx-auto mt-4  rounded-lg text-white text-center">Start A Contest</NavLink>
                                </div>
                            </div>
                        </div>
                        <div className="order-1 md:order-2">
                            <img className="rounded-lg mx-auto w-full" src={`/hero.png`} alt="avatar" />
                        </div>
                    </div>
                </section>

                <section className="bg-[#f8f8f8]">
                    <div className="max-w-7xl mx-auto px-4 py-24">
                        <h1 className="text-#333 text-3xl font-bold text-center">Get Started In Just A Few Minutes</h1>
                        <div className="grid grid-cols-1 sm:grid-cols-3 mt-16 gap-y-16 gap-x-[80px]">
                            <div className="grid grid-cols-2 sm:grid-cols-1">
                                <div className="flex justify-center items-center sm:block">
                                    <span className="bg-[#9106cd] w-12 h-12 rounded-full flex justify-center items-center">
                                        <span className="text-white text-2xl font-bold">1</span>
                                    </span>
                                </div>
                                <div className="sm:mt-12">
                                    <h2 className="text-lg font-medium">Create</h2>
                                    <p className="mt-2 text-md font-light">Fill the contest details</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-1">
                                <div className="flex justify-center items-center sm:block">
                                    <span className="bg-[#9106cd] w-12 h-12 rounded-full flex justify-center items-center">
                                        <span className="text-white text-2xl font-bold">2</span>
                                    </span>
                                </div>
                                <div className="sm:mt-12">
                                    <h2 className="text-lg font-medium">Share</h2>
                                    <p className="mt-2 text-md font-light">Share with the world and create buzz</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-1">
                                <div className="flex justify-center items-center sm:block">
                                    <span className="bg-[#9106cd] w-12 h-12 rounded-full flex justify-center items-center">
                                        <span className="text-white text-2xl font-bold">3</span>
                                    </span>
                                </div>
                                <div className="sm:mt-12">
                                    <h2 className="text-lg font-medium">Manage</h2>
                                    <p className="mt-2 text-md font-light">Administer the contest</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="bg-white max-w-7xl mx-auto px-4 py-24">
                    <h1 className="text-#333 text-3xl font-bold text-center">What The Community Says</h1>
                    <div className="grid grid-cols-3 gap-y-16 gap-x-[80px] mt-16">
                        <TestimonialCard name="John Doe" avatarUrl={rootUrl + "t1.jpg"} />
                        <TestimonialCard name="Jane Doe" avatarUrl={rootUrl + "t2.jpg"} />
                        <TestimonialCard name="Jack Doe" avatarUrl={rootUrl + "t3.jpg"} />
                    </div>
                </section>
            </div>
        </FullWidthLayout>
    )
}

export default ContestantDetails;