import './assets/styles/index.css';
import Layout from './components/Layout';
import AboutPage from './pages/LandingPages/AboutPage';
import ArticleListPage from './pages/LandingPages/ArticleListPage';
import ArticlePage from './pages/LandingPages/ArticlePage';
import HomePage from './pages/LandingPages/HomePage';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import NotFoundPage from './pages/NotFoundPage';
import AuthLayout from './layouts/AuthLayout';
import SignInPage from './pages/AuthPages/SignInPage';
import SignUpPage from './pages/AuthPages/SignUpPage';
import DashLayout from './layouts/DashLayout';
import DashboardPage from './pages/DashboardPages/DashboardPage';
import ReportsPage from './pages/DashboardPages/ReportsPage';
import UsersPage from './pages/DashboardPages/UsersPage';
import DashArticleListPage from './pages/DashboardPages/DashArticleListPage';

// Protected Route Component with alerts
const ProtectedRoute = ({ children, allowedRoles, pageName }) => {
  const token = localStorage.getItem('token');
  const userType = localStorage.getItem('type');
  
  if (!token) {
    alert('Please login first to access this page.');
    return <Navigate to="/auth/signin" replace />;
  }
  
  if (allowedRoles && !allowedRoles.includes(userType)) {
    // Show different alerts based on role and page
    if (pageName === 'UsersPage') {
      alert('Access Denied: Only Admin users can access the Users Management page.');
    } else if (pageName === 'ReportsPage' && userType === 'viewer') {
      alert('Access Denied: Viewers cannot access Reports. Please contact admin for upgrade.');
    } else if (pageName === 'DashboardPage' && userType === 'viewer') {
      alert('Access Denied: Viewers cannot access Dashboard. Please contact admin for upgrade.');
    } else {
      alert(`Access Denied: ${userType || 'Your'} role does not have permission to access this page.`);
    }
    return <Navigate to="/" replace />;
  }
  
  return children;
};

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
        path: '/articles/:name',
        element: <ArticlePage />
      },
    ],
  },
  {
    path: "auth/",
    element: <AuthLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "signin",
        element: <SignInPage />
      },
      {
        path: "signup",
        element: <SignUpPage />
      },
    ],
  },
  {
    path: "dashboard/",
    element: <DashLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute allowedRoles={['admin', 'editor']} pageName="DashboardPage">
            <DashboardPage />
          </ProtectedRoute>
        )
      },
      {
        path: "reports",
        element: (
          <ProtectedRoute allowedRoles={['admin', 'editor']} pageName="ReportsPage">
            <ReportsPage />
          </ProtectedRoute>
        )
      },
      {
        path: "users",
        element: (
          <ProtectedRoute allowedRoles={['admin']} pageName="UsersPage">
            <UsersPage />
          </ProtectedRoute>
        )
      },
      {
  path: "articles",
  element: (
    <ProtectedRoute allowedRoles={['admin', 'editor']}>
      <DashArticleListPage />
    </ProtectedRoute>
  )
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