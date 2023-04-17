import { TextField, TextFieldProps } from "@mui/material"
import { Controller, useFormContext } from "react-hook-form"

interface RHFInputProps {
    name: string
}

const RHFInput = ({ name, ...MUITextFieldMethods }: RHFInputProps & TextFieldProps) => {
    const { control } = useFormContext()
    return (
        <Controller
            name={name}
            control={control}
            render={({ field, formState: { errors } }) => (
                <TextField
                    error={!!errors.name}
                    {...MUITextFieldMethods}
                    {...field} />
            )}></Controller>
    )
}

export default RHFInput