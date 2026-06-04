import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import Button from '../../components/Button';
import { createUser } from '../../services/UserService';

const inputClasses = 
  'mt-2 w-full rounded-xl border-2 border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-zinc-900 focus:bg-zinc-100';

const actionButtonClassName = 'w-full rounded-xl py-3 text-[11px] tracking-[0.2em]';

const SignUpPage = () => {
  const navigate = useNavigate();
  
  // Form states
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [address, setAddress] = useState('');
  
  // UI states
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [wakingUp, setWakingUp] = useState(false);
  const loadingTimeoutRef = useRef(null);

  // Pre-wake the backend when sign-up page loads
  useEffect(() => {
    const wakeBackend = async () => {
      try {
        await fetch(`${import.meta.env.VITE_API_URL}/api/users?limit=1`);
        console.log('Backend pre-warmed');
      } catch (err) {
        // Silently fail - this is just a wake-up call
        console.log('Wake-up ping sent (even if error)');
      }
    };
    wakeBackend();
  }, []);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current);
      }
    };
  }, []);

  // Auto-generate username from email (optional)
  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    // Auto-generate username from email (remove @ and domain)
    if (newEmail && !username) {
      const suggestedUsername = newEmail.split('@')[0];
      setUsername(suggestedUsername);
    }
  };

  const validateForm = () => {
    // First Name validation
    if (!firstName.trim()) {
      setError('First name is required');
      return false;
    }
    
    // Last Name validation
    if (!lastName.trim()) {
      setError('Last name is required');
      return false;
    }
    
    // Email validation
    if (!email.trim()) {
      setError('Email is required');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Email is invalid');
      return false;
    }
    
    // Username validation
    if (!username.trim()) {
      setError('Username is required');
      return false;
    }
    if (username.includes(' ')) {
      setError('Username must not contain spaces');
      return false;
    }
    
    // Password validation
    if (!password) {
      setError('Password is required');
      return false;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return false;
    }
    
    // Confirm password validation
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    
    // Age validation (optional)
    if (age && isNaN(age)) {
      setError('Age must be a number');
      return false;
    }
    if (age && (age < 0 || age > 150)) {
      setError('Age must be between 0 and 150');
      return false;
    }
    
    // Contact number validation (optional)
    if (contactNumber && contactNumber.length !== 11) {
      setError('Contact number must be exactly 11 digits');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setWakingUp(false);
    
    if (!validateForm()) return;
    
    setLoading(true);
    
    // Set a timeout to detect if backend is waking up (cold start)
    loadingTimeoutRef.current = setTimeout(() => {
      setWakingUp(true);
    }, 3000); // Show "waking up" message after 3 seconds
    
    try {
      const userData = {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim().toLowerCase(),
        username: username.trim().toLowerCase(),
        password: password,
        age: age || '', // Optional field
        gender: gender || '', // Optional field
        contactNumber: contactNumber || '', // Optional field
        address: address || '', // Optional field
        type: 'editor', // Default role for new registrations
        isActive: true
      };
      
      const { data } = await createUser(userData);
      console.log('Registration successful:', data);
      
      setSuccess('Account created successfully! Redirecting to login...');
      
      // Clear form
      setFirstName('');
      setLastName('');
      setEmail('');
      setUsername('');
      setPassword('');
      setConfirmPassword('');
      setAge('');
      setGender('');
      setContactNumber('');
      setAddress('');
      
      // Redirect to login after 2 seconds
      setTimeout(() => {
        navigate('/auth/signin');
      }, 2000);
      
    } catch (err) {
      console.error('Registration failed:', err.response?.data?.message || err.message);
      
      // Handle specific error messages from backend
      if (err.response?.data?.message?.includes('duplicate') || 
          err.response?.data?.message?.includes('email')) {
        setError('Email or username already exists. Please use a different email.');
      } else {
        setError(err.response?.data?.message || 'Registration failed. Please try again.');
      }
    } finally {
      setLoading(false);
      clearTimeout(loadingTimeoutRef.current);
      setWakingUp(false);
    }
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
          {/* Backend waking up alert */}
          {wakingUp && (
            <div className="mb-6 rounded-xl border-2 border-yellow-200 bg-yellow-50 p-4 text-sm text-yellow-700">
              <div className="flex items-center gap-3">
                <svg className="h-5 w-5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>
                  <strong>Backend is waking up...</strong> This may take 30-60 seconds on the first signup after inactivity. Please wait.
                </span>
              </div>
            </div>
          )}
          
          {/* Success Message */}
          {success && (
            <div className="mb-6 rounded-xl border-2 border-green-200 bg-green-50 p-4 text-sm text-green-600">
              {success}
            </div>
          )}
          
          {/* Error Message */}
          {error && (
            <div className="mb-6 rounded-xl border-2 border-red-200 bg-red-50 p-4 text-sm text-red-600">
              {error}
            </div>
          )}
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Name Fields - Row */}
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="first-name" className="text-sm font-semibold text-zinc-700">
                  First Name *
                </label>
                <input
                  id="first-name"
                  type="text"
                  placeholder="Enter your first name"
                  autoComplete="given-name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className={inputClasses}
                  required
                />
              </div>

              <div>
                <label htmlFor="last-name" className="text-sm font-semibold text-zinc-700">
                  Last Name *
                </label>
                <input
                  id="last-name"
                  type="text"
                  placeholder="Enter your last name"
                  autoComplete="family-name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className={inputClasses}
                  required
                />
              </div>
            </div>

            {/* Age and Gender - Row */}
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="age" className="text-sm font-semibold text-zinc-700">
                  Age
                </label>
                <input
                  id="age"
                  type="number"
                  placeholder="Enter your age"
                  autoComplete="off"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className={inputClasses}
                  min="0"
                  max="150"
                />
              </div>

              <div>
                <label htmlFor="gender" className="text-sm font-semibold text-zinc-700">
                  Gender
                </label>
                <select
                  id="gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className={inputClasses}
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="signup-email" className="text-sm font-semibold text-zinc-700">
                Email Address *
              </label>
              <input
                id="signup-email"
                type="email"
                placeholder="Enter your email"
                autoComplete="email"
                value={email}
                onChange={handleEmailChange}
                className={inputClasses}
                required
              />
            </div>

            {/* Contact Number */}
            <div>
              <label htmlFor="contact-number" className="text-sm font-semibold text-zinc-700">
                Contact Number
              </label>
              <input
                id="contact-number"
                type="tel"
                placeholder="09171234567 (11 digits)"
                autoComplete="tel"
                value={contactNumber}
                onChange={(e) => {
                  const digitsOnly = e.target.value.replace(/\D/g, '').slice(0, 11);
                  setContactNumber(digitsOnly);
                }}
                className={inputClasses}
              />
              <p className="mt-2 text-xs leading-5 text-zinc-500">
                Enter exactly 11 digits (e.g., 09171234567)
              </p>
            </div>

            {/* Username */}
            <div>
              <label htmlFor="username" className="text-sm font-semibold text-zinc-700">
                Username *
              </label>
              <input
                id="username"
                type="text"
                placeholder="Choose a username (no spaces)"
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value.replace(/\s/g, ''))}
                className={inputClasses}
                required
              />
              <p className="mt-2 text-xs leading-5 text-zinc-500">
                No spaces allowed. This will be your unique identifier.
              </p>
            </div>

            {/* Address */}
            <div>
              <label htmlFor="address" className="text-sm font-semibold text-zinc-700">
                Address
              </label>
              <textarea
                id="address"
                placeholder="Enter your address"
                autoComplete="street-address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className={`${inputClasses} resize-none`}
                rows={2}
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="signup-password" className="text-sm font-semibold text-zinc-700">
                Password *
              </label>
              <input
                id="signup-password"
                type="password"
                placeholder="Create a password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={inputClasses}
                required
              />
              <p className="mt-2 text-xs leading-5 text-zinc-500">
                Use a secure password with letters, numbers, and symbols (minimum 8 characters).
              </p>
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirm-password" className="text-sm font-semibold text-zinc-700">
                Confirm Password *
              </label>
              <input
                id="confirm-password"
                type="password"
                placeholder="Confirm your password"
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={inputClasses}
                required
              />
            </div>

            <Button 
              type="submit" 
              variant="primary" 
              className={actionButtonClassName}
              disabled={loading}
            >
              {loading ? (wakingUp ? 'Waking up server...' : 'Creating Account...') : 'Create Account'}
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