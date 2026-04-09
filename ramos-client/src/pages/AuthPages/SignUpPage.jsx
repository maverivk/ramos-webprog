import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Button from '../../components/Button';

const inputClasses = 
  'mt-2 w-full rounded-xl border-2 border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-zinc-900 focus:bg-zinc-100';

const actionButtonClassName = 'w-full rounded-xl py-3 text-[11px] tracking-[0.2em]';

const SignUpPage = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <div className="flex w-full flex-col gap-6">
      {/* Header Section */}
      <section className="border-y-2 border-zinc-200 bg-zinc-50 px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <span className="inline-block text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
            Join Us
          </span>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl">
            Sign Up
          </h1>
          <p className="mt-4 text-base leading-relaxed text-zinc-600">
            Create your account with the same monochrome layout pattern and shared button treatment.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="border-y-2 border-zinc-200 bg-zinc-50 px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="first-name" className="text-sm font-semibold text-zinc-700">
                  First Name
                </label>
                <input
                  id="first-name"
                  type="text"
                  placeholder="Enter your first name"
                  autoComplete="given-name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className={inputClasses}
                />
              </div>

              <div>
                <label htmlFor="last-name" className="text-sm font-semibold text-zinc-700">
                  Last Name
                </label>
                <input
                  id="last-name"
                  type="text"
                  placeholder="Enter your last name"
                  autoComplete="family-name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className={inputClasses}
                />
              </div>
            </div>

            <div>
              <label htmlFor="signup-email" className="text-sm font-semibold text-zinc-700">
                Email Address
              </label>
              <input
                id="signup-email"
                type="email"
                placeholder="Enter your email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClasses}
              />
            </div>

            <div>
              <label htmlFor="signup-password" className="text-sm font-semibold text-zinc-700">
                Password
              </label>
              <input
                id="signup-password"
                type="password"
                placeholder="Create a password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={inputClasses}
              />
              <p className="mt-2 text-xs leading-5 text-zinc-500">
                Use a secure password with letters, numbers, and symbols (minimum 8 characters).
              </p>
            </div>

            <Button type="submit" variant="primary" className={actionButtonClassName}>
              Create Account
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t-2 border-zinc-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-zinc-50 px-4 text-zinc-500">Or sign up with</span>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <Button type="button" variant="secondary" className={actionButtonClassName}>
                Google
              </Button>
              <Button type="button" variant="secondary" className={actionButtonClassName}>
                Apple
              </Button>
            </div>

            <div className="pt-4 text-center text-sm text-zinc-600">
              Already have an account?{' '}
              <Link to="/auth/signin" className="font-semibold text-zinc-900 transition hover:text-zinc-600 underline-offset-4 hover:underline">
                Log In
              </Link>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default SignUpPage;