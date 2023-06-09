import { Controller, FormProvider, SubmitHandler, useForm } from "react-hook-form"
import { ErrorMessage } from "@hookform/error-message"
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from "yup"
import { useState } from "react"
import RHFInput from "../components/RHFInput"
import { Button, Checkbox, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material"

export interface IFormValues {
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

    const initialValues: IFormValues = {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        gender: "",
        longDescription: false,
        description: ""
    }

    const [showPassword, setShowPassword] = useState<boolean>(false);

    const toggleShowPassword = () => {
        setShowPassword(prev => !prev)
    }

    const methods = useForm({
        mode: "all",
        resolver: yupResolver(validationSchema),
        defaultValues: initialValues
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
            methods.reset();
        })
    }

    const DisplayError = ({ name }: { name: keyof IFormValues }) => <ErrorMessage errors={methods.formState.errors} name={name} render={({ message }) => <p>{message}</p>} />

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
                {
                    /* <input type="text" {...register("name", { required: "Required" })} placeholder="Name" /> 
                    {methods.formState.errors.name && (<p>{methods.formState.errors.name.message?.toString()}</p>)} 
                    
                    <input type="text" {...methods.register("email", { required: "Required" })} placeholder="Email" />
                    {methods.formState.errors.email && (<p>{methods.formState.errors.email.message?.toString()}</p>)} 
                    
                    <fieldset>
                        <legend>Gender</legend>
                        <label htmlFor="male">Male</label>
                        <input {...methods.register("gender")} type="radio" id="male" value="male" />
                        <label htmlFor="female">Female</label>
                        <input {...methods.register("gender")} type="radio" id="female" value="female" />
                        <label htmlFor="other">Other</label>
                        <input {...methods.register("gender")} type="radio" id="other" value="other" />
                    </fieldset>
                    <DisplayError name="gender" /> 
                    
                    <input type={showPassword ? "text" : "password"} {...methods.register("password", { required: "Required" })} placeholder="Password" />
                    <DisplayError name="password" /> 
                    
                    <label htmlFor="">
                        Show Password
                        <input onChange={toggleShowPassword} type={"checkbox"} name={"showPassword"} id={"showPassword"} />
                    </label> 
                    
                    <input type="password" {...methods.register("confirmPassword")} placeholder="Confirm Password" />
                    <DisplayError name="confirmPassword" /> 
                    
                    <input type="description" {...methods.register("description")} placeholder="Description" />
                    <DisplayError name="description" /> 
                    
                    <label htmlFor="longDescription">
                        Long Description
                        <input type="checkbox" {...methods.register("longDescription")} />
                    </label> 
                    */
                }
                <RHFInput name={"name"} fullWidth={true} label="Name" variant="outlined" helperText={methods.formState.errors.name?.message?.toString()} />
                <RHFInput name={"email"} label="Email" variant="outlined" helperText={methods.formState.errors.email?.message?.toString()} />

                <FormControl>
                    <FormLabel>Gender</FormLabel>
                    <Controller control={methods.control} name="gender" render={({ field }) => (
                        <RadioGroup {...field}>
                            <FormControlLabel value={"male"} control={<Radio />} label="Male" />
                            <FormControlLabel value={"female"} control={<Radio />} label="Female" />
                            <FormControlLabel value={"other"} control={<Radio />} label="Other" />
                        </RadioGroup>
                    )} />
                </FormControl>
                <DisplayError name="gender" />

                <RHFInput name={"password"} type={showPassword ? "text" : "password"} label="Password" variant="outlined" helperText={methods.formState.errors.password?.message?.toString()} />
                <FormControlLabel control={<Checkbox onChange={toggleShowPassword} name={"showPassword"} id={"showPassword"} />} label="Show Password" />

                <RHFInput name={"confirmPassword"} type={"password"} label="Confirm Password" variant="outlined" helperText={methods.formState.errors.confirmPassword?.message?.toString()} />
                <RHFInput name="description" label="Description" variant="outlined" helperText={methods.formState.errors.description?.message?.toString()} />

                <DisplayError name="description" />

                <Controller control={methods.control} name="longDescription" render={({ field }) => (
                    <FormControlLabel {...field} control={<Checkbox id={"longDescription"} />} label="Long Description" />
                )} />

                <Button variant="contained" type="submit" disabled={methods.formState.isSubmitting || !methods.formState.isDirty}>Submit</Button>
                <Button variant="contained" onClick={() => methods.reset()}>Reset</Button>
                {/* <button type="submit" disabled={methods.formState.isSubmitting || !methods.formState.isDirty}>Submit</button> */}
                {/* <button onClick={() => methods.reset()}>Reset</button> */}
            </form>
        </FormProvider>
    )
}

export default ReactHookForm