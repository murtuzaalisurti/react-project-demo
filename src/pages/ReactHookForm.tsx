import { SubmitHandler, useForm } from "react-hook-form"
import { ErrorMessage } from "@hookform/error-message"
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from "yup"
import { useState } from "react"

interface IFormValues {
    name: string,
    email: string,
    password: string,
    confirmPassword: string,
    gender: string,
    longDescription: boolean,
    description: string
}

const validationSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    gender: Yup.string().oneOf(["male", "female", "other"]),
    password: Yup.string().required().min(8, "It's shorter than 8 characters"),
    confirmPassword: Yup.string().oneOf([Yup.ref("password")], "passwords do not match"),
    longDescription: Yup.boolean(),
    description: Yup.string().when('longDescription', {
        is: true,
        then: (schema) => {
            return schema.max(50)
        },
        otherwise: (schema) => {
            return schema.max(20)
        },
    })
})

const ReactHookForm = () => {

    const [showPassword, setShowPassword] = useState<boolean>(false);

    const toggleShowPassword = () => {
        setShowPassword(prev => !prev)
    }

    const { register, formState: { errors, isSubmitting, isDirty }, handleSubmit, reset } = useForm<IFormValues>({
        resolver: yupResolver(validationSchema)
    });

    const apiCall = (route: string, payload: IFormValues): Promise<{
        status: number,
        message: string,
        data?: IFormValues
    }> => {
        return new Promise((resolve, reject) => {
            route === "" && reject({
                status: 500,
                message: "Incorrect Route"
            })
            setTimeout(() => {
                resolve({
                    status: 200,
                    message: "OK",
                    data: payload
                })
            }, 2000)
        })
    }

    const onSubmit: SubmitHandler<IFormValues> = async (data) => {
        apiCall("/abc", data).then(data => {
            console.log(data);
        }).catch(err => {
            console.log(err)
        }).finally(() => {
            reset();
        })
    }

    const DisplayError = ({ name }: { name: keyof IFormValues }) => <ErrorMessage errors={errors} name={name} render={({ message }) => <p>{message}</p>} />

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input type="text" {...register("name", { required: "Required" })} placeholder="Name" />
            {errors.name && (<p>{errors.name.message?.toString()}</p>)}

            <input type="text" {...register("email", { required: "Required" })} placeholder="Email" />
            {errors.email && (<p>{errors.email.message?.toString()}</p>)}

            {/* <input type="text" {...register("gender")} placeholder="Gender" /> */}
            <fieldset>
                <legend>Gender</legend>
                <label htmlFor="male">Male</label>
                <input {...register("gender")} type="radio" id="male" value="male" />
                <label htmlFor="female">Female</label>
                <input {...register("gender")} type="radio" id="female" value="female" />
                <label htmlFor="other">Other</label>
                <input {...register("gender")} type="radio" id="other" value="other" />
            </fieldset>
            <DisplayError name="gender" />

            <input type={showPassword ? "text" : "password"} {...register("password", { required: "Required" })} placeholder="Password" />
            <DisplayError name="password" />

            <label htmlFor="">
                Show Password
                <input onChange={toggleShowPassword} type={"checkbox"} name={"showPassword"} id={"showPassword"} />
            </label>

            <input type="password" {...register("confirmPassword")} placeholder="Confirm Password" />
            <DisplayError name="confirmPassword" />

            <input type="description" {...register("description")} placeholder="Description" />
            <DisplayError name="description" />

            <label htmlFor="longDescription">
                Long Description
                <input type="checkbox" {...register("longDescription")} />
            </label>

            <button type="submit" disabled={isSubmitting || !isDirty}>Submit</button>
            <button onClick={() => reset()}>Reset</button>
        </form>
    )
}

export default ReactHookForm