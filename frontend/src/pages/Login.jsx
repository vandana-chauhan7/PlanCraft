import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { authApi } from '../api/authApi';
import Button from '../components/common/Button';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const data = await authApi.login(email, password);
      login(data.access_token, { email });
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid credentials. Please consult your records and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#eaddce]/30 flex flex-col justify-center items-center p-4">
      <div className="max-w-md w-full bg-academia-parchment p-10 border border-academia-leather shadow-paper relative">
        {/* Decorative elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-academia-gold/50"></div>
        <div className="absolute top-4 left-4 w-3 h-3 rounded-full border border-academia-leather/40"></div>
        <div className="absolute top-4 right-4 w-3 h-3 rounded-full border border-academia-leather/40"></div>

        <div className="text-center mb-10">
          <h1 className="text-4xl font-serif font-bold italic tracking-wide text-academia-ink mb-2">PlanCraft</h1>
          <p className="text-academia-inkLight font-body text-sm">Enter the archives.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block font-serif text-sm text-academia-ink mb-1">Email Address</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent border-b border-academia-leather outline-none py-2 text-academia-ink focus:border-academia-gold transition-colors font-body"
              placeholder="scholar@academy.edu"
            />
          </div>
          <div>
            <label className="block font-serif text-sm text-academia-ink mb-1">Passcode</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent border-b border-academia-leather outline-none py-2 text-academia-ink focus:border-academia-gold transition-colors font-body"
            />
          </div>

          {error && <p className="text-[#8c3b3b] text-sm font-body italic text-center">{error}</p>}

          <div className="pt-4">
            <Button type="submit" variant="primary" fullWidth disabled={isLoading}>
              {isLoading ? 'Unlocking...' : 'Access Archives'}
            </Button>
          </div>
        </form>

        <p className="mt-8 text-center text-sm text-academia-inkLight font-body">
          Not yet enrolled? <a href="/register" className="text-academia-ink border-b border-academia-ink hover:text-academia-gold hover:border-academia-gold transition-colors">Register here</a>.
        </p>
      </div>
    </div>
  );
};

export default Login;
