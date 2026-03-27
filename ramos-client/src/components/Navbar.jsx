import { NavLink } from 'react-router-dom';

const links = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Articles', to: '/articles' },
];

const navLinkClassName = ({ isActive }) =>
  [
    `px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.24em] transition-all duration-200`,
    isActive
      ? `text-zinc-900 font-bold`
      : `text-zinc-600 hover:text-zinc-900`,
  ].join(' ');

const NavBar = () => {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-zinc-900 bg-zinc-100/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo with Image */}
        <NavLink to="/" className="transition-opacity hover:opacity-80">
          <img 
            src="/STUDIO.png" 
            alt="Wireframe Studio" 
            className="h-10 w-auto object-contain"
          />
        </NavLink>

        {/* Desktop Navigation with Visible Separator Lines */}
        <nav className="hidden items-center md:flex">
          {links.map((link, index) => (
            <div key={link.to} className="flex items-center">
              <NavLink
                to={link.to}
                end={link.to === '/'}
                className={navLinkClassName}
              >
                {link.label}
              </NavLink>
              {index < links.length - 1 && (
                <div className="mx-3 h-6 w-0.5 bg-zinc-400"></div>
              )}
            </div>
          ))}
        </nav>

        {/* Mobile Menu Button - Simple */}
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