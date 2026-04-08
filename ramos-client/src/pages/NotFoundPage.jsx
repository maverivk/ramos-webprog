import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';

function NotFoundPage() {
  return (
    <div className="flex w-full flex-col gap-6">
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-3xl text-center">
          {/* Animated 404 */}
          <div className="relative mb-8">
            <div className="text-[120px] sm:text-[180px] lg:text-[220px] font-black text-zinc-900 leading-none tracking-tighter">
              404
            </div>
            <div className="absolute inset-0 flex items-center justify-center opacity-10">
              <div className="h-32 w-32 sm:h-48 sm:w-48 rounded-full border-4 border-zinc-900" />
            </div>
          </div>

          {/* Decorative line */}
          <div className="mb-6 flex justify-center">
            <div className="h-1 w-16 bg-zinc-900" />
          </div>

          {/* Error message */}
          <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 mb-3">
            Oops! Page Not Found
          </h1>
          <p className="text-base sm:text-lg text-zinc-600 mb-2">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <p className="text-sm text-zinc-500 mb-8">
            The link you followed might be broken, or the page may have been removed.
          </p>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/">
              <Button className="w-full sm:w-auto">← Back to Home</Button>
            </Link>
            <Link to="/articles">
              <Button className="w-full sm:w-auto bg-transparent border-2 border-zinc-900 text-zinc-900 hover:bg-zinc-900 hover:text-zinc-50 transition-colors">
                Browse Articles →
              </Button>
            </Link>
          </div>

          {/* Helpful links */}
          <div className="mt-12 pt-8 border-t border-zinc-200">
            <p className="text-xs text-zinc-400 mb-3">You might want to try:</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link to="/" className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors">
                Home
              </Link>
              <span className="text-zinc-300">•</span>
              <Link to="/about" className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors">
                About
              </Link>
              <span className="text-zinc-300">•</span>
              <Link to="/articles" className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors">
                All Articles
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default NotFoundPage;