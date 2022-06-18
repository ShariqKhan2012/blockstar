import { useForm } from 'react-hook-form';
import DefaultAvatar from '../assets/default-avatar.png'

const NewContest = () => {
    const { register, handleSubmit, formState: { errors }, setError, reset } = useForm();
    const registerOptions = {
        fullname: { required: "This field is required" },
        location: { required: "This field is required" },
        age: { required: "This field is required" },
        avatar: { required: "This field is required" },
        bio: { required: "This field is required" },
        /*password: {
          required: "Password is required",
          minLength: {
            value: 8,
            message: "Password must have at least 8 characters"
          }
        }*/
    };

    const onFormSubmit = async (data) => {
        console.log('data => ', data);
        
        const file = data.avatar[0];
        console.log('file => ', file);
        if ( !["image/jpg", "image/png"].includes(file.type)) {
            setError("avatar", {
                type: "filetype",
                message: "Only JPG/PNG files are allowed."
            });
            return;
        }

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
            <h1 className="text-teal text-3xl font-bold mb-4">Fill in your details</h1>
            <form onSubmit={handleSubmit(onFormSubmit, onError)} className="grid grid-cols-1 sm:grid-cols-2 gap-y-8 gap-x-16">
                <div>
                    <input name="fullname" {...register('fullname', registerOptions.fullname)} className="p-3 w-full border border-slate-300 rounded-md focus:outline-none" type="text" placeholder="Your full name" />
                    <small className="text-[#f00]">
                        {errors?.fullname && errors.fullname.message}
                    </small>
                </div>
                <div>
                    <input name="location" {...register('location', registerOptions.location)} className="p-3 w-full border border-slate-300 rounded-md focus:outline-none" type="text" placeholder="You are located in" />
                    <small className="text-[#f00]">
                        {errors?.location && errors.location.message}
                    </small>
                </div>
                <div>
                    <input name="age" {...register('age', registerOptions.age)} className="p-3 w-full  border border-slate-300 rounded-md focus:outline-none" type="number" min="1" placeholder="Your age" />
                    <small className="text-[#f00]">
                        {errors?.age && errors.age.message}
                    </small>
                </div>
                <div className="flex items-center space-x-6 ">
                    <div className="shrink-0">
                        <img className="h-16 w-16 object-cover rounded-full" src={DefaultAvatar} alt="Current profile photo" />
                    </div>
                    <label className="block cursor-pointer">
                        <span className="sr-only">Choose profile photo</span>
                        <input
                            type="file" name="avatar" {...register('avatar', registerOptions.avatar)}
                            className="block cursor-pointer w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4
                                    file:rounded-full file:border-0
                                    file:text-sm file:font-semibold
                                    file:bg-violet-50 file:text-violet-700
                                    hover:file:bg-violet-100"
                        />
                        <small className="text-[#f00]">
                            {errors?.avatar && errors.avatar.message}
                        </small>
                    </label>
                </div>
                <div>
                    <textarea name="bio" {...register('bio', registerOptions.bio)} className="p-3 w-full border border-slate-300 rounded-md focus:outline-none" placeholder="Describe yourself"></textarea>
                    <small className="text-[#f00]">
                        {errors?.bio && errors.bio.message}
                    </small>
                </div>
                <div className="sm:col-span-2">
                    <button className="bg-[#00c9b7] hover:bg-[#36b1a0] py-2 px-6  inline-block mx-auto my-4  rounded-lg text-white text-center">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default NewContest;