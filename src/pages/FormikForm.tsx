import { Field, Form, Formik } from "formik";

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

    const onSubmit = (values: IFormValues) => {
        console.log(values);
    }

    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
            {({values, errors, touched, handleBlur, handleChange}) => (
                <>
                    {JSON.stringify(values)}
                    <Form noValidate>
                        <Field 
                            type={"text"}
                            name={"name"}
                            id={"name"}
                            placeholder={"Name"}
                        />
                        <Field
                            type={"email"}
                            name={"email"}
                            id={"email"}
                            placeholder={"Email"}
                            autoComplete={"on"}
                        />
                        <Field
                            type={"password"}
                            name={"password"}
                            id={"password"}
                            placeholder={"Password"}
                        />
                        <button type="submit">Submit</button>
                    </Form>
                </>
            )}
        </Formik>
    )
}

export default FormikForm