import { Field, Form, Formik, FormikHelpers, FormikProps } from "formik";
import * as Yup from "yup"

interface IFormValues {
    name: string,
    email: string,
    password: string
}

const FormikForm = () => {

    const initialValues: IFormValues = {
        name: "",
        email: "",
        password: ""
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

    const onSubmit = async (values: IFormValues, actions: FormikHelpers<IFormValues>) => {
        try {
            await apiCall("/abc", values)

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={async (values, actions) => {
                try {
                    await apiCall("/abc", values)
                    actions.setSubmitting(false)
                    actions.resetForm({
                        values: initialValues
                    })
                    console.log(values);
                } catch (error) {
                    console.log(error);
                    actions.setSubmitting(false)
                    actions.resetForm({
                        values: initialValues
                    })
                }
            }}
            validationSchema={Yup.object().shape({
                name: Yup.string().required("Required"),
                email: Yup.string().email("Invalid email").required(),
                password: Yup.string().required().min(8, "It's shorter than 8 characters")
            })}
        >
            {({ values, errors, touched, isSubmitting }: FormikProps<IFormValues>) => (
                <Form noValidate>
                    <Field
                        type={"text"}
                        name={"name"}
                        id={"name"}
                        placeholder={"Name"}
                        required
                    />
                    <Field
                        type={"email"}
                        name={"email"}
                        id={"email"}
                        placeholder={"Email"}
                        autoComplete={"on"}
                        required
                    />
                    <Field
                        type={"password"}
                        name={"password"}
                        id={"password"}
                        placeholder={"Password"}
                        required
                    />
                    {errors.name}
                    <button type="submit" disabled={isSubmitting || !touched.name || !touched.email || !touched.password}>Submit</button>
                </Form>
            )}
        </Formik>
    )
}

export default FormikForm