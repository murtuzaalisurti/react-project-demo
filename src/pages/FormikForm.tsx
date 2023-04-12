import { Field, Form, Formik, FormikHelpers, FormikProps } from "formik";

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
        <Formik initialValues={initialValues} onSubmit={async (values, actions) => {
            // console.log(actions);
            try {
                await apiCall("/abc", values)
                actions.setSubmitting(false)
                console.log(values);
            } catch (error) {
                console.log(error);
                actions.setSubmitting(false)
            }
        }}>
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