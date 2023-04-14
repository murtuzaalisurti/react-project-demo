import { Field, Form, Formik, FormikHelpers, FormikProps, ErrorMessage, ErrorMessageProps } from "formik";
import { useState } from "react";
import * as Yup from "yup"

interface IFormValues {
    name: string,
    email: string,
    password: string,
    confirmPassword: string,
    gender: string,
    longDescription: boolean,
    description: string
}

const FormikForm = () => {

    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(prev => !prev)
    }

    const initialValues: IFormValues = {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        gender: "",
        longDescription: false,
        description: ""
    }

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

    const theError = (error: string) => (<>{error}</>)

    const onSubmit = async (values: IFormValues, actions: FormikHelpers<IFormValues>) => {
        try {
            await apiCall("/abc", values)
            console.log(values);
        } catch (error) {
            console.log(error);
        }
        actions.setSubmitting(false)
        actions.resetForm({
            values: initialValues
        })
    }

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={Yup.object().shape({
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
            })}
        >
            {({ errors, touched, isSubmitting, dirty }: FormikProps<IFormValues>) => (
                <Form noValidate>
                    <Field
                        type={"text"}
                        name={"name"}
                        id={"name"}
                        placeholder={"Name"}
                    />
                    <ErrorMessage name="name" render={theError} />
                    <Field
                        type={"email"}
                        name={"email"}
                        id={"email"}
                        placeholder={"Email"}
                        autoComplete={"on"}
                    />
                    <ErrorMessage name="email" render={theError} />
                    
                    <fieldset>
                        <legend>Gender</legend>
                        <label htmlFor="male">Male</label>
                        <Field type="radio" name="gender" id="male" value="male" />
                        <label htmlFor="female">Female</label>
                        <Field type="radio" name="gender" id="female" value="female" />
                        <label htmlFor="other">Other</label>
                        <Field type="radio" name="gender" id="other" value="other" />
                    </fieldset>
                    <ErrorMessage name="gender" render={theError} />
                    <Field
                        type={showPassword ? "text" : "password"}
                        name={"password"}
                        id={"password"}
                        placeholder={"Password"}
                    />
                    <ErrorMessage name="password" render={theError} />
                    <label htmlFor="showPassword">
                        Show Password
                        <input onChange={toggleShowPassword} type={"checkbox"} name={"showPassword"} id={"showPassword"} />
                    </label>
                    <Field
                        type={"password"}
                        name={"confirmPassword"}
                        id={"confirmPassword"}
                        placeholder={"Confirm Password"}
                    />
                    <ErrorMessage name="confirmPassword" render={theError} />
                    <Field
                        type={"text"}
                        name={"description"}
                        id={"description"}
                        placeholder={"Description"}
                    />
                    <ErrorMessage name="description" render={theError} />
                    <label htmlFor="longDescription">
                        Long Description
                        <Field type={"checkbox"} name={"longDescription"} />
                    </label>
                    <button type="submit" disabled={isSubmitting || !dirty}>Submit</button>
                </Form>
            )}
        </Formik>
    )
}

export default FormikForm