// LoginForm.tsx
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { LOGIN_MUTATION } from '../../graphql/mutations';
import { useAuth } from '../../context/AuthContext';
import { TYPE_COLORS } from '../../constants/colors';


export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const [loginMutation] = useMutation(LOGIN_MUTATION);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { data } = await loginMutation({
        variables: { username, password }
      });

      if (data?.auth?.login) {
        login(data.auth.login);
        navigate('/dashboard');
      }
    } catch (err) {
      setError('Nesprávné přihlašovací údaje');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-3 text-sm text-red-500 bg-red-100 rounded">
          {error}
        </div>
      )}

      {/* Username input */}
      <div>
        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
          Uživatelské jméno
        </label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="Vaše uživatelské jméno"
          disabled={loading}
          required
        />
      </div>

      {/* Password input */}
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
          Heslo
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="Zadejte heslo"
          disabled={loading}
          required
        />
      </div>

      {/* Submit button */}
      <button
        type="submit"
        disabled={loading}
        className={`w-full py-2 px-4 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2
        ${loading
            ? 'bg-type-all cursor-not-allowed'
            : `${TYPE_COLORS.main.button.active} text-white`}`}
      >
        {loading ? 'Přihlašování...' : 'Přihlásit se'}
      </button>
    </form>
  );
}