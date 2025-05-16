import './LoginPage.css';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { attemptLogin } from '../../services/UserServices';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const errorMessage = params.get('error');
    if (errorMessage === 'sessionExpired') {
      setError('Your session has expired. Please log in again.');
    }
  }, [location]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await attemptLogin({ email, password });

      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('userId', JSON.stringify(data.userId));
      localStorage.setItem('email', data.email);
      localStorage.setItem('avatar', data.image);

      navigate('/'); 
    } catch (err) {
      setError(err.message || 'Failed to login. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleLogin} noValidate>
        <h2>Welcome Back!</h2>
        <p>Please enter your credentials to log in to your account.</p>

        <div className="input-box">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
        </div>

        <div className="input-box">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
        </div>

        {error && <div className="error-message" role="alert">{error}</div>}

        <button className="btn-typ4" disabled={loading} type="submit">
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export { LoginPage };
