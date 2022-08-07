import { useForm } from 'react-hook-form';
import Button from './Button';

const SubmitPerformanceForm = (props) => {
    const { register, handleSubmit, formState: { errors }, setError, reset } = useForm();

    const registerOptions = {
        link: { required: "This field is required" },
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
                <input name="link" {...register('link', registerOptions.link)} className="p-3 w-full border border-slate-300 rounded-md focus:outline-none" type="url" placeholder="Link to your performance" />
                <small className="text-[#f00]">
                    {errors?.link && errors.link.message}
                </small>
            </div>

            <div className="sm:col-span-2">
                {/*<button className="bg-[#00c9b7] hover:bg-[#36b1a0] py-2 px-6  inline-block mx-auto  rounded-lg text-white text-center">Submit</button>*/}
                <Button type="secondary" label="Submit" />
            </div>
        </form>
    )
}

export default SubmitPerformanceForm;