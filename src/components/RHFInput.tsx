import { TextField } from "@mui/material"
import { Control, Controller } from "react-hook-form"
import { IFormValues } from "../pages/ReactHookForm"

interface RHFInputProps {
    name: keyof IFormValues,
    control: Control<IFormValues>
}

const RHFInput = ({ name, control }: RHFInputProps) => {
    return (
        <Controller name={name} control={control} render={({ field }) => (
            <TextField {...field} />
        )}></Controller>
    )
}

export default RHFInput