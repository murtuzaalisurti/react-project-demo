import { TextField } from "@mui/material"
import { Control, Controller, useFormContext } from "react-hook-form"
import { IFormValues } from "../pages/ReactHookForm"

interface RHFInputProps {
    name: keyof IFormValues,
    // control: Control<IFormValues>
}

const RHFInput = ({ name }: RHFInputProps) => {
    const { control } = useFormContext()
    return (
        <Controller name={name} control={control} render={({ field }) => (
            <TextField {...field} />
        )}></Controller>
    )
}

export default RHFInput