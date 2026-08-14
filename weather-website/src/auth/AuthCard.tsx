import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function AuthCard() {
  const { register, login } = useAuth();

  const [mode, setMode] = useState<'login' | 'register'>('login');

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setError('');
    setMessage('');

    try {
      if (mode === 'register') {
        await register(fullName, email, password);

        setMessage(
          'Registration successful. Please login.'
        );

        setMode('login');
        setFullName('');
        setEmail('');
        setPassword('');
      } else {
        await login(email, password);
      }
    } catch (err: any) {
      setError(err.message);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">

        <h1 className="text-2xl font-bold text-center mb-6">
          SkyCast
        </h1>

        <div className="flex mb-6 border-b">
          <button
            type="button"
            onClick={() => setMode('login')}
            className={`flex-1 pb-3 ${
              mode === 'login'
                ? 'border-b-2 border-blue-500 font-semibold'
                : 'text-gray-500'
            }`}
          >
            Login
          </button>

          <button
            type="button"
            onClick={() => setMode('register')}
            className={`flex-1 pb-3 ${
              mode === 'register'
                ? 'border-b-2 border-blue-500 font-semibold'
                : 'text-gray-500'
            }`}
          >
            Register
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          {mode === 'register' && (
            <div>
              <label className="block text-sm font-medium mb-1">
                Full Name
              </label>

              <input
                type="text"
                value={fullName}
                onChange={(e) =>
                  setFullName(e.target.value)
                }
                className="w-full border rounded-lg p-3"
                placeholder="Enter your full name"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-1">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="w-full border rounded-lg p-3"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="w-full border rounded-lg p-3"
              placeholder="Enter your password"
            />
          </div>

          {error && (
            <p className="text-sm text-red-500">
              {error}
            </p>
          )}

          {message && (
            <p className="text-sm text-green-600">
              {message}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold"
          >
            {mode === 'login'
              ? 'Login'
              : 'Create Account'}
          </button>

        </form>
      </div>
    </div>
  );
}