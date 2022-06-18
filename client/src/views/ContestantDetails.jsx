import { useParams } from 'react-router-dom';
//import img from '../src/1.jpg'

const ContestantDetails = () => {
    const params = useParams();
    const id = params.id;

    return (
        <div className="max-w-7xl mx-auto p-4">
            <h1 className="text-#333 text-3xl font-bold text-center">Corey Anderson</h1>
            <span className="font-regular text-sm block text-center">0xaec234ec....4dae</span>

            <div className="grid sm:grid-rows md:grid-cols-2 mt-16 gap-y-16 gap-x-[80px]">
                <div className="sm:order-2 md:order-1">
                    <div className="">
                        <h2 className="text-2xl font-bold">About Me</h2>
                        <p className="mt-2 text-[#444] text-sm font-regular leading-7">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            Ut enim ad minim veniam. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            Ut enim ad minim veniam.
                            <br />
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            Ut enim ad minim veniam. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            Ut enim ad minim veniam.
                        </p>
                    </div>

                    <div className="text-[#333] text-md mt-8">
                        <p>
                            <span className="font-bold">Age: </span>
                            <span className="font-regular">28y</span>
                        </p>
                        <p className="mt-2">
                            <span className="font-bold">Based in: </span>
                            <span className="font-regular">Mumbai</span>
                        </p>
                        <p className="mt-2">
                            <span className="font-bold">Hobbies:  </span>
                            <span className="font-regular">Music, Photography</span>
                        </p>
                    </div>



                    <div className="mt-8">
                        <h2 className="text-2xl font-bold">Votes received</h2>
                        <div className="text-[#333] text-md">
                            <p className="mt-2">
                                <span className="font-bold">Round 1: </span>
                                <span className="font-regular">7</span>
                            </p>
                            <p className="mt-2">
                                <span className="font-bold">Round 2: </span>
                                <span className="font-regular">5</span>
                            </p>
                            <p className="mt-2">
                                <span className="font-bold">Round 3: </span>
                                <span className="font-regular">9</span>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="sm:order-1 md:order-2">
                    <img className="rounded-lg" src={`/src/images/${id}.jpg`} alt="avatar" />
                </div>
            </div>
        </div>
    )
}

export default ContestantDetails;