import { NavLink, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const allLinks = [
  { label: 'Home', to: '/', roles: ['admin', 'editor', 'viewer', 'public'] },
  { label: 'About', to: '/about', roles: ['admin', 'editor', 'viewer', 'public'] },
  { label: 'Articles', to: '/articles', roles: ['admin', 'editor', 'viewer', 'public'] },
  { label: 'Dashboard', to: '/dashboard', roles: ['admin', 'editor'] },
  { label: 'Manage Articles', to: '/dashboard/articles', roles: ['admin', 'editor'] },
  { label: 'Reports', to: '/dashboard/reports', roles: ['admin', 'editor'] },
  { label: 'Users', to: '/dashboard/users', roles: ['admin'] },
];

const navLinkClassName = ({ isActive }) =>
  [
    `px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.24em] transition-all duration-200`,
    isActive
      ? `text-zinc-900 font-bold`
      : `text-zinc-600 hover:text-zinc-900`,
  ].join(' ');

const NavBar = () => {
  const navigate = useNavigate();
  const [authKey, setAuthKey] = useState(Date.now());

  // Get fresh data from localStorage
  const token = localStorage.getItem('token');
  const userType = localStorage.getItem('type');

  // Listen for auth changes
  useEffect(() => {
    const handleStorageChange = () => {
      setAuthKey(Date.now());
    };
    
    // Listen for custom auth change event
    const handleAuthChange = () => {
      setAuthKey(Date.now());
    };
    
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('authChange', handleAuthChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('authChange', handleAuthChange);
    };
  }, []);

  // Filter links based on user role
  const getVisibleLinks = () => {
    if (!token) {
      // Not logged in - show only public pages
      return allLinks.filter(link => link.roles.includes('public'));
    }
    // Logged in - show based on role
    return allLinks.filter(link => link.roles.includes(userType));
  };

  const visibleLinks = getVisibleLinks();

  const handleSignOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('firstName');
    localStorage.removeItem('type');
    localStorage.removeItem('userId');
    
    // Dispatch custom event to notify other components
    window.dispatchEvent(new Event('authChange'));
    
    navigate('/auth/signin');
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-zinc-900 bg-zinc-100/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <NavLink to="/" className="transition-opacity hover:opacity-80">
          <img 
            src="/STUDIO.png" 
            alt="Wireframe Studio" 
            className="h-10 w-auto object-contain"
          />
        </NavLink>

        <nav className="hidden items-center md:flex">
          {visibleLinks.map((link, index) => (
            <div key={link.to} className="flex items-center">
              <NavLink
                to={link.to}
                end={link.to === '/'}
                className={navLinkClassName}
              >
                {link.label}
              </NavLink>
              {index < visibleLinks.length - 1 && (
                <div className="mx-3 h-6 w-0.5 bg-zinc-400"></div>
              )}
            </div>
          ))}
        </nav>

        {token ? (
          <button
            onClick={handleSignOut}
            className="rounded-full border-2 border-zinc-900 px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-900 transition-all duration-200 hover:bg-zinc-900 hover:text-zinc-100"
          >
            Sign Out
          </button>
        ) : (
          <NavLink to="/auth/signin">
            <button className="rounded-full border-2 border-zinc-900 px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-900 transition-all duration-200 hover:bg-zinc-900 hover:text-zinc-100">
              Sign In
            </button>
          </NavLink>
        )}

        <div className="block md:hidden">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-zinc-900">
            <div className="space-y-1.5">
              <div className="h-0.5 w-5 bg-zinc-900"></div>
              <div className="h-0.5 w-5 bg-zinc-900"></div>
              <div className="h-0.5 w-5 bg-zinc-900"></div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBar;