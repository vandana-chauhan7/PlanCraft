import React, { useState } from 'react';
import { authApi } from '../api/authApi';
import Button from '../components/common/Button';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      await authApi.register({ email, password });
      setSuccess(true);
      // Can auto-login or redirect here
    } catch (err) {
      setError(err.response?.data?.detail || 'Enrollment failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setError(null);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setError(null);
  };

  if (success) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-[#eaddce]/30">
        <div className="bg-academia-parchment p-10 border border-academia-leather shadow-paper text-center">
          <h2 className="text-2xl font-serif text-academia-ink mb-4">Enrollment Successful</h2>
          <p className="text-academia-inkLight mb-6 font-body">Your scholarly record has been created.</p>
          <Button onClick={() => window.location.href = '/login'} variant="primary">Proceed to Login</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#eaddce]/30 flex flex-col justify-center items-center p-4">
      <div className="max-w-md w-full bg-academia-parchment p-10 border border-academia-leather shadow-paper">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-serif font-bold italic tracking-wide text-academia-ink mb-2">PlanCraft</h1>
          <p className="text-academia-inkLight font-body text-sm">Begin your scholarly journey.</p>
        </div>
        <form onSubmit={handleRegister} className="space-y-6">
          <div>
            <label className="block font-serif text-sm text-academia-ink mb-1">Email Address</label>
            <input type="email" required value={email} onChange={handleEmailChange} className="w-full bg-transparent border-b border-academia-leather outline-none py-2 focus:border-academia-gold font-body text-academia-ink" placeholder="scholar@academy.edu" />
          </div>
          <div>
            <label className="block font-serif text-sm text-academia-ink mb-1">Passcode</label>
            <input type="password" required value={password} onChange={handlePasswordChange} className="w-full bg-transparent border-b border-academia-leather outline-none py-2 focus:border-academia-gold font-body text-academia-ink" />
          </div>
          {error && <p className="text-[#8c3b3b] text-sm italic">{error}</p>}
          <div className="pt-4">
            <Button type="submit" variant="primary" fullWidth disabled={isLoading}>{isLoading ? 'Inscribing...' : 'Enroll'}</Button>
          </div>
        </form>
        <p className="mt-8 text-center text-sm text-academia-inkLight font-body">
          Already possess a record? <a href="/login" className="text-academia-ink border-b border-academia-ink hover:text-academia-gold hover:border-academia-gold">Log in here</a>.
        </p>
      </div>
    </div>
  );
};

export default Register;
