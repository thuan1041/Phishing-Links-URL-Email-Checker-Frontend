// routes.js
import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import HomeLayout from './layouts/homeLayout';
import HomeSubLayout from './layouts/homeSubLayout';

const routes = [
    {
        path: '/',
        element: <HomeLayout />,
        exact: true,
        children: [
            {
                path: 'home',
                element: <HomeSubLayout/>,
            },
        ],
    },
];

export const router = createBrowserRouter(routes);
