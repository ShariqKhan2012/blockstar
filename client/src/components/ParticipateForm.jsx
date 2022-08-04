import { useForm } from 'react-hook-form';
import Button from './Button';
import DefaultAvatar from '../assets/default-avatar.png'

const ParticipateForm = (props) => {
    const { register, handleSubmit, formState: { errors }, setError, reset } = useForm();

    const registerOptions = {
        nickname: { required: "This field is required" },
        performanceLink: { required: "This field is required" },
        bio: { required: "This field is required" },
    };

    const onFormSubmit = async (data) => {
        console.log('data => ', data);
        props.onSubmit(data);
    }

    const onError = (err) => {
        console.log(err);
    }

    return (
        <form onSubmit={handleSubmit(onFormSubmit, onError)} >
            <div className="mb-6">
                <input name="nickname" {...register('nickname', registerOptions.nickname)} className="p-3 w-full border border-slate-300 rounded-md focus:outline-none" type="text" placeholder="Your nickname" />
                <small className="text-[#f00]">
                    {errors?.nickname && errors.nickname.message}
                </small>
            </div>

            <div className="mb-6">
                <input name="performanceLink" {...register('performanceLink', registerOptions.performanceLink)} className="p-3 w-full border border-slate-300 rounded-md focus:outline-none" type="text" placeholder="Link to your performance video" />
                <small className="text-[#f00]">
                    {errors?.performanceLink && errors.performanceLink.message}
                </small>
            </div>

            <div className="mb-6">
                <textarea name="bio" maxLength="50" {...register('bio', registerOptions.bio)} className="p-3 w-full border border-slate-300 rounded-md focus:outline-none" placeholder="Describe yourself"></textarea>
                <small><em>Max 60 characters allowed</em></small>
                <small className="block text-[#f00]">
                    {errors?.bio && errors.bio.message}
                </small>
            </div>

            <div className="sm:col-span-2">
                {/*<button className="bg-[#00c9b7] hover:bg-[#36b1a0] py-2 px-6  inline-block mx-auto  rounded-lg text-white text-center">Submit</button>*/}
                <Button type="secondary" label="Submit" />
            </div>
        </form>
    )
}

export default ParticipateForm;