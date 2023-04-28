import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import Home from "../pages/Home";
import Nested from "../components/Nested";
import Root from "../pages/Layouts/Root";
import NestedLevelTwo from "../components/NestedLevelTwo";
import NotFound from "../pages/NotFound";
import FormikForm from "../pages/FormikForm";
import ReactHookForm from "../pages/ReactHookForm";
import RenderProp from "../components/RenderProp";
import MaterialUI from "../pages/MaterialUI";
import { Suspense, lazy } from "react";
import DisplayError from "../components/DisplayError";
import { ErrorBoundary } from "react-error-boundary";
import FoodItemsRedux from "../pages/FoodItemsRedux";
import UsersRedux from "../pages/UsersRedux";

const AxiosImplementation = lazy(() => import('../pages/AxiosImplementation'))

const router = createBrowserRouter(
    createRoutesFromElements(
        // <Route path="/" element={<Root />} ErrorBoundary={DisplayError}>
        <Route path="/" element={
            <ErrorBoundary FallbackComponent={(props) => <DisplayError {...props} />}>
                <Root />
            </ErrorBoundary>
        }>
            <Route index element={<Home />} />
            <Route path="axios" element={
                <Suspense fallback={<>{"loading"}</>}>
                    <AxiosImplementation />
                </Suspense>
            } />
            <Route path="rtk" element={<FoodItemsRedux />} />
            <Route path="rtkAsync" element={<UsersRedux />} />
            <Route path="formik" element={<FormikForm />} />
            <Route path="rhf" element={<ReactHookForm />} />
            <Route path="mui" element={<MaterialUI />} />
            <Route path="renderProp" element={<RenderProp />} />
            <Route path="nested" element={<Nested />}>
                <Route path="nestedTwo" element={<NestedLevelTwo />} />
            </Route>

            <Route path="*" element={<NotFound />} />
        </Route>
    )
)

export default router