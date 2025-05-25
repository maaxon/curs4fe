import React, {useEffect} from 'react';
import './style.css'

import 'font-awesome/css/font-awesome.min.css';
import {theme} from "@styles/theme.ts";
import {ThemeProvider} from "styled-components";
import ErrorBoundary from "@components/ErrorBoundary";
import {RouterProvider} from "react-router-dom";
import {router} from "@components/App/router/router.tsx";
import {useAppDispatch, } from "@hooks/redux.ts";
import {init} from "../../store/reducers/User/slice/User.ts";
import {Toaster} from "sonner";
const App: React.FC = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(init());
    }, []);


    return (
        <ErrorBoundary>
            <ThemeProvider theme={theme}>
                <RouterProvider router={router}/>
                <Toaster position="bottom-right" theme="light" richColors={true}/>
            </ThemeProvider>
        </ErrorBoundary>
    );
};

export default App;
