import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Button from '../../components/Button';
import { loginUser } from '../../services/UserService';

const inputClasses = 
  'mt-2 w-full rounded-xl border-2 border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-zinc-900 focus:bg-zinc-100';

const actionButtonClassName = 'w-full rounded-xl py-3 text-[11px] tracking-[0.2em]';

const SignInPage = () => {
  const navigate = useNavigate();
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const isEmail = emailOrUsername.includes('@');
      const loginCredentials = isEmail 
        ? { email: emailOrUsername, password }
        : { username: emailOrUsername, password };
      
      const { data } = await loginUser(loginCredentials);
      console.log('Login successful:', data);
      
      // BLOCK VIEWERS FROM LOGGING IN
      if (data.type === 'viewer') {
        setError('Viewer accounts cannot access the dashboard. Please contact admin.');
        setLoading(false);
        return;
      }
      
      localStorage.setItem('token', data.token);
      localStorage.setItem('firstName', data.firstName);
      localStorage.setItem('type', data.type);
      localStorage.setItem('userId', data.userId);
      
      navigate('/dashboard');
    } catch (err) {
      console.error('Login failed:', err.response?.data?.message || err.message);
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex w-full flex-col gap-6">
      <section className="border-y-2 border-zinc-200 bg-zinc-50 px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <span className="inline-block text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
            Welcome Back
          </span>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl">
            Log In
          </h1>
          <p className="mt-4 text-base leading-relaxed text-zinc-600">
            Access your account using the same monochrome wireframe language used across the site.
          </p>
        </div>
      </section>

      <section className="border-y-2 border-zinc-200 bg-zinc-50 px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div className="mx-auto max-w-2xl">
          {error && (
            <div className="mb-6 rounded-xl border-2 border-red-200 bg-red-50 p-4 text-sm text-red-600">
              {error}
            </div>
          )}
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="signin-email" className="text-sm font-semibold text-zinc-700">
                Email or Username
              </label>
              <input
                id="signin-email"
                type="text"
                placeholder="Enter your email or username"
                autoComplete="username"
                value={emailOrUsername}
                onChange={(e) => setEmailOrUsername(e.target.value)}
                className={inputClasses}
                required
              />
            </div>

            <div>
              <label htmlFor="signin-password" className="text-sm font-semibold text-zinc-700">
                Password
              </label>
              <input
                id="signin-password"
                type="password"
                placeholder="Enter your password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={inputClasses}
                required
              />
              <p className="mt-2 text-xs leading-5 text-zinc-500">
                Must be a combination of minimum 8 letters, numbers, and symbols.
              </p>
            </div>

            <div className="flex items-center justify-between gap-4 text-sm">
              <label className="flex items-center gap-2 text-zinc-600">
                <input type="checkbox" className="h-4 w-4 rounded border-2 border-zinc-300 accent-zinc-900" />
                <span>Remember me</span>
              </label>
              <button type="button" className="font-semibold text-zinc-700 transition hover:text-zinc-900">
                Forgot Password?
              </button>
            </div>

            <Button type="submit" variant="primary" className={actionButtonClassName} disabled={loading}>
              {loading ? 'Logging in...' : 'Log In'}
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t-2 border-zinc-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-zinc-50 px-4 text-zinc-500">Or continue with</span>
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
              No account yet?{' '}
              <Link to="/auth/signup" className="font-semibold text-zinc-900 transition hover:text-zinc-600 underline-offset-4 hover:underline">
                Sign Up
              </Link>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default SignInPage;