import React, { useState } from 'react';
import { auth, googleProvider } from '../firebase';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';

function Login({ onNavigate }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) return setError('Please enter email and password');
    setLoading(true);
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      onNavigate('dashboard');
    } catch (e) {
      setError('Invalid email or password');
    }
    setLoading(false);
  };

  const handleGoogle = async () => {
    setLoading(true);
    setError('');
    try {
      await signInWithPopup(auth, googleProvider);
      onNavigate('dashboard');
    } catch (e) {
      setError('Google login failed. Try again.');
    }
    setLoading(false);
  };

  return (
    <div style={{ background: '#080814', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif' }}>
      <div style={{ background: '#0d0d1f', border: '1px solid #1a1a3a', borderRadius: '20px', padding: '44px', width: '100%', maxWidth: '420px', color: 'white' }}>

        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ width: '48px', height: '48px', background: 'linear-gradient(135deg, #7C3AED, #3B82F6)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', margin: '0 auto 16px' }}>S</div>
          <h2 style={{ fontSize: '26px', fontWeight: '700', marginBottom: '8px' }}>Welcome back 👋</h2>
          <p style={{ color: '#666', fontSize: '14px' }}>Login to your StudentOS account</p>
        </div>

        <button onClick={handleGoogle} disabled={loading} style={{ width: '100%', padding: '12px', background: 'transparent', border: '1px solid #333', borderRadius: '10px', color: 'white', fontSize: '15px', cursor: 'pointer', marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
          <span>🔵</span> Continue with Google
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
          <div style={{ flex: 1, height: '1px', background: '#1a1a3a' }} />
          <span style={{ color: '#444', fontSize: '13px' }}>or</span>
          <div style={{ flex: 1, height: '1px', background: '#1a1a3a' }} />
        </div>

        {error && <div style={{ background: '#ef444422', border: '1px solid #ef4444', borderRadius: '8px', padding: '10px', fontSize: '13px', color: '#ef4444', marginBottom: '16px' }}>{error}</div>}

        <div style={{ marginBottom: '16px' }}>
          <label style={{ fontSize: '13px', color: '#888', display: 'block', marginBottom: '6px' }}>Email</label>
          <input type="email" placeholder="you@college.edu" value={email} onChange={e => setEmail(e.target.value)}
            style={{ width: '100%', padding: '12px', background: '#080814', border: '1px solid #1a1a3a', borderRadius: '10px', color: 'white', fontSize: '14px', boxSizing: 'border-box' }} />
        </div>

        <div style={{ marginBottom: '24px' }}>
          <label style={{ fontSize: '13px', color: '#888', display: 'block', marginBottom: '6px' }}>Password</label>
          <input type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)}
            style={{ width: '100%', padding: '12px', background: '#080814', border: '1px solid #1a1a3a', borderRadius: '10px', color: 'white', fontSize: '14px', boxSizing: 'border-box' }} />
        </div>

        <button onClick={handleLogin} disabled={loading} style={{ width: '100%', padding: '13px', background: 'linear-gradient(135deg, #7C3AED, #3B82F6)', border: 'none', borderRadius: '10px', color: 'white', fontSize: '16px', cursor: 'pointer', fontWeight: '600', opacity: loading ? 0.7 : 1 }}>
          {loading ? '⏳ Logging in...' : 'Login →'}
        </button>

        <p style={{ textAlign: 'center', fontSize: '13px', color: '#666', marginTop: '20px' }}>
          Don't have an account?{' '}
          <span onClick={() => onNavigate('signup')} style={{ color: '#7C3AED', cursor: 'pointer' }}>Sign up</span>
        </p>
      </div>
    </div>
  );
}

export default Login;