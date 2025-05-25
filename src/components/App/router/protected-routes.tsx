import {Navigate} from "react-router-dom";

import {LOGIN} from "@constants/routes.ts";

import Layout from "@components/layout";
import {getStorage} from "@utils/storage";
import {User} from "../../../store/reducers/User/types/types.ts";
import {EmployerLayout} from "@components/layout/EmployerLayout.tsx";
import {AdminLayout} from "@components/layout/AdminLayout.tsx";

export const UserRoutes = () => {
    getStorage<User>('user');

    const user = getStorage<User>('user');
    console.log((user && user.role === 'user'))

    return (user && user.role === 'user') ? (<Layout/>) : (<Navigate to={LOGIN} replace/>);
};

export const EmployerRoutes = () => {
    getStorage<User>('user');

    const user = getStorage<User>('user');

    return (user && user.role === 'employer') ? (<EmployerLayout/>) : (<Navigate to={LOGIN} replace/>);
};

export const AdminRoutes = () => {
    getStorage<User>('user');

    const user = getStorage<User>('user');
    return (user && user.role === 'admin') ? (<AdminLayout/>) : (<Navigate to={LOGIN} replace/>);
};
