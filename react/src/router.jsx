import { createBrowserRouter } from "react-router-dom";

import Dashboard from "./views/Dashboard";
import Surveys from "./views/Surveys";
import Login from "./views/Login";
import Register from "./views/Register";
import GuestLayout from "./components/GuestLayout";
import DefaultLayout from "./components/DefaultLayout";
import SurveyView from "./views/SurveyView";
import SurveyPublicView from "./views/SurveyPublicView";

const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout />,
        children: [
            {
                path: '/',
                element: <Dashboard />,
            },
            {
                path: '/surveys',
                element: <Surveys />,
            },
            {
                path: '/surveys/create',
                element: <SurveyView />,
            },
            {
                path: '/surveys/:id',
                element: <SurveyView />,
            },
        ]
    },
    {
        path: '/',
        element: <GuestLayout />,
        children: [
            {
                path: '/login',
                element: <Login />,
            },
            {
                path: '/register',
                element: <Register />,
            },
        ]
    },
    {
        path: '/surveys/public/:slug',
        element: <SurveyPublicView />,
    },
])

export default router;