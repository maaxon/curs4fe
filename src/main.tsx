import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@components/App';
import {Provider} from "react-redux";
import {store} from "./store/store.ts";

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
    <React.StrictMode>
        <Provider store={store}>
                <App/>
        </Provider>
    </React.StrictMode>,
);
