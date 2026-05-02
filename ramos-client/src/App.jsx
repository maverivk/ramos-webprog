import './assets/styles/index.css';
import Layout from './components/Layout';
import AboutPage from './pages/LandingPages/AboutPage';
import ArticleListPage from './pages/LandingPages/ArticleListPage';
import ArticlePage from './pages/LandingPages/ArticlePage';
import HomePage from './pages/LandingPages/HomePage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import NotFoundPage from './pages/NotFoundPage';
import AuthLayout from './layouts/AuthLayout';
import SignInPage from './pages/AuthPages/SignInPage';
import SignUpPage from './pages/AuthPages/SignUpPage';
import DashLayout from './layouts/DashLayout';
import DashboardPage from './pages/DashboardPages/DashboardPage';
import ReportsPage from './pages/DashboardPages/ReportsPage';
import UsersPage from './pages/DashboardPages/UsersPage';

const routes = [
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: '/',
        element: <HomePage />
      },
      {
        path: '/about',
        element: <AboutPage />
      },
      {
        path: '/articles',
        element: <ArticleListPage />
      },
      {
        path: '/articles/:name', // -->articles/learn-react
        element: <ArticlePage />
      },
    ],
  },
  {
    path:"auth/",
    element:<AuthLayout />,
    errorElement: <NotFoundPage />,
    children:[
      {
        path:"signin",
        element:<SignInPage />
    },
    {
        path:"signup",
        element:<SignUpPage />
    },
  ],
  },
  {
    path:"dashboard/",
    element:<DashLayout />,
    errorElement: <NotFoundPage />,
    children:[
      {
        index: true,
        element:<DashboardPage />
    },

    
    {
        path:"reports",
        element:<ReportsPage />
    },
    {
        path:"users",
        element:<UsersPage />
    },
    
  ],
  },
];

const router = createBrowserRouter(routes);

function App() {
  return (
    <>
    <RouterProvider router={router} />
    </>
  );
}

export default App;