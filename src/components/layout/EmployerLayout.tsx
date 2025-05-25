import { PageWrapper} from './layout.styles.ts';
import Footer from "@components/Footer";
import {Outlet} from "react-router-dom";
import GlobalStyles from "@styles/globalStyles.ts";
import EmployerHeader from "@components/Header/employer-header/EmployerHeader.tsx";

export const EmployerLayout = () => {
    return (
        <PageWrapper className="nav-on-header bg-alt">
            <GlobalStyles/>
            <EmployerHeader/>
            <Outlet/>
            <Footer/>
            </PageWrapper>
    );
};