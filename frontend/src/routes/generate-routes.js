import { Route, Routes as ReactRoutes } from "react-router-dom";
import flattenDeep from "lodash/flattenDeep";
import ProtectedRoute from "./ProtectedRoutes";

const GenerateFlattenRoutes = (routes) => {
    if (!routes) return [];

    return flattenDeep(routes.map(({ routes: subRoutes, ...rest }) => [rest, GenerateFlattenRoutes(subRoutes)]));
}

export const renderRoutes = (mainRoutes) => {
    const Routes = ({ isAuthorized }) => {
        const layouts = mainRoutes.map(({ layout: Layout, routes }, index) => {
            const subRoutes = GenerateFlattenRoutes(routes);
            return (
                <Route key={index} element={<Layout />}>
                    <Route element={<ProtectedRoute isAuthorized={isAuthorized} />}>
                        {
                            subRoutes.map(({ component: Component, path, name }) => {
                                return (
                                    Component && path && (<Route key={name} element={<Component />} />)
                                )
                            })
                        }
                    </Route>
                </Route>
            )
        })
        return <ReactRoutes>{layouts}</ReactRoutes>
    }
    return Routes;
}