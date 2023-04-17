import { useState } from "react"

const Formik = (props: { render: (value: number) => JSX.Element }) => {
    const [count, setCount] = useState(2)
    return props.render(count)
}

// const Formik = (props: { render: (value: number) => JSX.Element }) => {
//     const [count, setCount] = useState(2)
//     return props.render(count)
// }

const Input = ({ value }: { value: number }) => {
    return <main>{value}</main>
}

const RenderProp = () => {
    return (
        <Formik render={(value: number) => <Input value={value} />} />
    )
}
// props.render() => <Wrapper render /> => <RenderThis />

export default RenderProp