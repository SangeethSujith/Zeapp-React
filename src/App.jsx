import React from 'react';
import { useSelector } from 'react-redux';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Slide, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from './components/shared/Loader';
import ScrollToTop from './components/shared/ScrollToTop';
import { appRoutes } from './routes';

const App = () => {
    
    const router = createBrowserRouter(appRoutes());
    const { loaders } = useSelector((state) => state.common);
    console.log('loaders', loaders)

    return (
        <React.StrictMode>
            {loaders.length > 0 && <Loader />}
            <ToastContainer closeButton transition={Slide} icon theme="colored" hideProgressBar />
            <RouterProvider router={router}>
                <ScrollToTop />
            </RouterProvider>
        </React.StrictMode>
    );
}

export default App;
