import { useRoutes, Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { VortexDemoSecond } from "../pages/home-page";
import ChatPage from "../pages/search-page";
import { Navbar } from "@/components/navbar";
import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet /> {/* This will render the child routes */}
    </>
  );
};

export const Router = () => {
    const { isAuthenticated, isLoading, loginWithRedirect, handleRedirectCallback } = useAuth();

    // Handle the authentication callback
    useEffect(() => {
      if (window.location.search.includes('code=')) {
        (async () => {
          try {
            const result = await handleRedirectCallback();
            const returnTo = result?.appState?.returnTo || '/';
            window.location.replace(returnTo);
          } catch (error) {
            console.error('Error handling redirect:', error);
          }
        })();
      }
    }, [handleRedirectCallback]);

    if (isLoading) return (
    <div className="flex justify-center items-center min-h-screen">
    <div className="flex flex-row gap-2">
      <div className="w-4 h-4 rounded-full bg-black dark:bg-slate-100 animate-bounce"></div>
      <div
        className="w-4 h-4 rounded-full bg-red-500 animate-bounce [animation-delay:-.3s]"
      ></div>
      <div
        className="w-4 h-4 rounded-full bg-black dark:bg-slate-100 animate-bounce [animation-delay:-.5s]"
      ></div>
    </div>
    </div>
    )
    ;

    const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
      const location = window.location;

      if (!isAuthenticated) {
        loginWithRedirect({
          appState: {
            returnTo: location.pathname + location.search + location.hash
          }
        });
        return null;
      }
      return children;
    };

    const routes = [
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '',
          element: <VortexDemoSecond />,
        },
        // {
        //     path: 'try',
        //     element: (
        //       <ProtectedRoute>
        //         <ChatPage />
        //       </ProtectedRoute>
        //     ),
        // },
      ],
    },
    {
        path: 'try',
        element: (
          <ProtectedRoute>
            <ChatPage />
          </ProtectedRoute>
        ),
    },
    {
      path: '*',
      element: <Navigate to="/" />,
    },
  ];

  return useRoutes(routes);
};
