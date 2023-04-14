import { Input } from "@mui/material"
import { Controller, useForm } from "react-hook-form"

interface RHFInputProps {
    name: string,
    control: any,
}

const RHFInput = ({ name }: any) => {
    const { control } = useForm({
        defaultValues: {
            name: "murtuza"
        }
    })
    return (
        <>
            <Controller name={name} control={control} render={({ field }) => (
                <Input {...field} />
            )}></Controller>
        </>
    )
}

export default RHFInput