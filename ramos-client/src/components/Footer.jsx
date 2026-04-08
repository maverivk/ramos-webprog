import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="border-t-2 border-zinc-900 bg-zinc-50 px-4 py-8 sm:px-6 sm:py-12 lg:px-8 mt-auto">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-zinc-900">Wireframe Studio</h3>
            <p className="text-sm leading-6 text-zinc-600">
              Created by: Ramos, Maverick Adam B. from INF 233
            </p>
            <p className="text-xs text-zinc-400">
              © 2026 Wireframe Studio. All rights reserved.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-zinc-600 hover:text-zinc-900 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-zinc-600 hover:text-zinc-900 transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/articles" className="text-sm text-zinc-600 hover:text-zinc-900 transition-colors">
                  Articles
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
              Resources
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-zinc-600 hover:text-zinc-900 transition-colors">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-zinc-600 hover:text-zinc-900 transition-colors">
                  Tutorials
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-zinc-600 hover:text-zinc-900 transition-colors">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div className="space-y-4">
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
              Connect
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-zinc-600 hover:text-zinc-900 transition-colors">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-zinc-600 hover:text-zinc-900 transition-colors">
                  GitHub
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-zinc-600 hover:text-zinc-900 transition-colors">
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-zinc-200">
          <p className="text-center text-xs text-zinc-400">
            Built with React, Tailwind CSS, and love for design.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;