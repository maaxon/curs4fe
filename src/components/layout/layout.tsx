import GlobalStyles from '@styles/globalStyles';
import {Outlet} from 'react-router-dom';
import Footer from '@components/Footer';
import Header from '@components/Header';
import { PageWrapper} from './layout.styles.ts';
import {Suspense} from "react";

const Layout = () => {
    console.log('x2')
    return (
                    <PageWrapper className="nav-on-header bg-alt">
                        <GlobalStyles/>
                        <Header/>
                        <Suspense fallback={<h1>Loading..</h1>}>
                            <Outlet/>
                        </Suspense>
                        <Footer/>
                    </PageWrapper>
    );
};

export default Layout;
