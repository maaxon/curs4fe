import { PageWrapper} from './layout.styles.ts';
import Footer from "@components/Footer";
import {Outlet} from "react-router-dom";
import GlobalStyles from "@styles/globalStyles.ts";
import {AdminHeader} from "@components/Header/admin-header";

export const AdminLayout = () => {
    return (
        <PageWrapper className="nav-on-header bg-alt">
            <GlobalStyles/>
            <AdminHeader/>
            <Outlet/>
            <Footer/>
        </PageWrapper>
    );
};