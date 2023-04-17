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

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Root />}>
            <Route index element={<Home />} />
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