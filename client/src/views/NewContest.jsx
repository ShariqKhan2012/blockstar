import { useForm } from 'react-hook-form';
import DefaultAvatar from '../assets/default-avatar.png'

const Participate = () => {
    const { register, handleSubmit, formState: { errors }, setError, reset } = useForm();
    const registerOptions = {
        title: { required: "This field is required" },
        participatingFee: { required: "This field is required" },
        votingFee: { required: "This field is required" },
    };

    const onFormSubmit = async (data) => {
        console.log('data => ', data);

        /*const formData = new FormData();
        formData.append("workshop", data.workshop);
        formData.append("participants", data.participants);
        formData.append("startdate", data.startdate);
        formData.append("selectedfile", data.selectedfile[0]);
        formData.append("establishmentdate", data.establishmentdate);
        console.log(data.selectedfile[0]);

        

        reset();
        const requestOptions = {
            method: "POST",
            // headers: { 'Content-Type': 'application/json' },
            body: formData
        };

        const response = await fetch(
            "http://localhost:3001/workshop",
            requestOptions
        );
        try {
            if (response.status == 200) {
                toast.success("Successfully added");
            }
        } catch {
            toast.error("Invalid");
        }
        const jsonData = await response.json();
        console.log(jsonData);
        */
    }

    const onError = (err) => {
        console.log(err);
    }

    return (
        <div className="max-w-7xl mx-auto p-4">
            <h1 className="text-teal text-3xl font-bold mb-4">Fill the contest details</h1>
            <form onSubmit={handleSubmit(onFormSubmit, onError)} className="grid grid-cols-1 sm:grid-cols-2 gap-y-8 gap-x-16">
                <div>
                    <input name="title" {...register('title', registerOptions.title)} className="p-3 w-full border border-slate-300 rounded-md focus:outline-none" type="text" placeholder="Your full name" />
                    <small className="text-[#f00]">
                        {errors?.title && errors.title.message}
                    </small>
                </div>
                <div>
                    <input name="participatingFee" {...register('participatingFee', registerOptions.age)} className="p-3 w-full  border border-slate-300 rounded-md focus:outline-none" type="number" min="1" placeholder="Participating Fee" />
                    <small className="text-[#f00]">
                        {errors?.participatingFee && errors.participatingFee.message}
                    </small>
                </div>
                <div>
                    <input name="votingFee" {...register('votingFee', registerOptions.votingFee)} className="p-3 w-full  border border-slate-300 rounded-md focus:outline-none" type="number" min="1" placeholder="Participating Fee" />
                    <small className="text-[#f00]">
                        {errors?.votingFee && errors.votingFee.message}
                    </small>
                </div>

                <div className="sm:col-span-2">
                    <button className="bg-[#00c9b7] hover:bg-[#36b1a0] py-2 px-6  inline-block mx-auto my-4  rounded-lg text-white text-center">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default Participate;