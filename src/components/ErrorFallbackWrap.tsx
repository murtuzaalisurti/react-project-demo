import { ErrorBoundary } from 'react-error-boundary'
import DisplayError from './DisplayError'
import { Outlet } from 'react-router-dom'

const ErrorFallbackWrap = () => {
    return (
        <ErrorBoundary FallbackComponent={DisplayError}>
            <Outlet />
        </ErrorBoundary>
    )
}

export default ErrorFallbackWrap