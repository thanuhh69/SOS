import React, { useState } from 'react';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Profile from   './pages/Profile';  

function App() {
  const [page, setPage] = useState('home');

  if (page === 'login') return <Login onNavigate={setPage} />;
  if (page === 'signup') return <Signup onNavigate={setPage} />;
  if (page === 'dashboard') return <Dashboard onNavigate={setPage} />;
  if (page === 'profile') return <Profile onNavigate={setPage} />;

  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif", background: '#080814', minHeight: '100vh', color: 'white', overflowX: 'hidden' }}>

      {/* Navbar */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 60px', borderBottom: '1px solid #1a1a3a', position: 'sticky', top: 0, background: '#080814cc', backdropFilter: 'blur(10px)', zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '32px', height: '32px', background: 'linear-gradient(135deg, #7C3AED, #3B82F6)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>S</div>
          <span style={{ fontSize: '20px', fontWeight: '700', background: 'linear-gradient(135deg, #7C3AED, #3B82F6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>StudentOS</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          {['Features', 'Pricing', 'About', 'Blog'].map(item => (
            <span key={item} style={{ fontSize: '14px', color: '#aaa', cursor: 'pointer' }}>{item}</span>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button onClick={() => setPage('login')} style={{ background: 'transparent', border: '1px solid #333', color: 'white', padding: '9px 22px', borderRadius: '8px', cursor: 'pointer', fontSize: '14px' }}>Login</button>
          <button onClick={() => setPage('signup')} style={{ background: 'linear-gradient(135deg, #7C3AED, #3B82F6)', border: 'none', color: 'white', padding: '9px 22px', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: '500' }}>Get Started Free</button>
        </div>
      </nav>

      {/* Hero */}
      <div style={{ textAlign: 'center', padding: '100px 20px 80px', position: 'relative' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '600px', height: '600px', background: 'radial-gradient(circle, #7C3AED22, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ display: 'inline-block', padding: '6px 16px', background: '#7C3AED22', border: '1px solid #7C3AED44', borderRadius: '20px', fontSize: '13px', color: '#a78bfa', marginBottom: '24px' }}>
          🚀 Built for Indian College Students
        </div>
        <h1 style={{ fontSize: '64px', fontWeight: '800', lineHeight: '1.1', marginBottom: '24px', maxWidth: '800px', margin: '0 auto 24px' }}>
          Your{' '}
          <span style={{ background: 'linear-gradient(135deg, #7C3AED, #3B82F6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Student Operating
          </span>
          {' '}System
        </h1>
        <p style={{ fontSize: '20px', color: '#888', maxWidth: '560px', margin: '0 auto 40px', lineHeight: '1.6' }}>
          AI-powered platform for placements, resumes, hackathons, and career growth — all in one place.
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button onClick={() => setPage('signup')} style={{ background: 'linear-gradient(135deg, #7C3AED, #3B82F6)', border: 'none', color: 'white', padding: '16px 40px', borderRadius: '12px', fontSize: '17px', cursor: 'pointer', fontWeight: '600' }}>
            Get Started Free →
          </button>
          <button onClick={() => setPage('login')} style={{ background: 'transparent', border: '1px solid #333', color: 'white', padding: '16px 40px', borderRadius: '12px', fontSize: '17px', cursor: 'pointer' }}>
            Watch Demo ▶
          </button>
        </div>
        <p style={{ color: '#555', fontSize: '13px', marginTop: '20px' }}>No credit card required • Free forever plan</p>
      </div>

      {/* Stats */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '60px', padding: '40px 20px', borderTop: '1px solid #111', borderBottom: '1px solid #111', flexWrap: 'wrap' }}>
        {[['10,000+', 'Students'], ['500+', 'Colleges'], ['85%', 'Placement Rate'], ['4.9★', 'Rating']].map(([val, label]) => (
          <div key={label} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '32px', fontWeight: '800', background: 'linear-gradient(135deg, #7C3AED, #3B82F6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{val}</div>
            <div style={{ fontSize: '14px', color: '#666', marginTop: '4px' }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Features */}
      <div style={{ padding: '80px 60px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 style={{ fontSize: '40px', fontWeight: '700', marginBottom: '16px' }}>Everything you need to get placed</h2>
          <p style={{ color: '#888', fontSize: '18px' }}>24 powerful modules, all powered by AI</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
          {[
            { icon: '🤖', title: 'AI Career Assistant', desc: 'Personalized roadmaps, skill gap analysis, and placement advice tailored to your profile', color: '#7C3AED' },
            { icon: '📄', title: 'AI Resume Builder', desc: 'Generate ATS-optimized resumes, LinkedIn summaries, and cover letters in seconds', color: '#3B82F6' },
            { icon: '🏆', title: 'Hackathon Hub', desc: 'Find hackathons, generate winning ideas, and get architecture suggestions', color: '#10B981' },
            { icon: '📊', title: 'Placement Predictor', desc: 'ML-powered prediction of your placement chances with company matching', color: '#F59E0B' },
            { icon: '📚', title: 'AI Study Assistant', desc: 'Summarize PDFs, generate notes, flashcards, and quizzes on any topic', color: '#EF4444' },
            { icon: '💡', title: 'Project Generator', desc: 'Get project ideas, tech stacks, database designs, and development plans', color: '#8B5CF6' },
          ].map((f, i) => (
            <div key={i} style={{ background: '#0d0d1f', border: '1px solid #1a1a3a', borderRadius: '16px', padding: '28px', cursor: 'pointer', transition: 'border-color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = f.color}
              onMouseLeave={e => e.currentTarget.style.borderColor = '#1a1a3a'}>
              <div style={{ fontSize: '36px', marginBottom: '14px' }}>{f.icon}</div>
              <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '10px' }}>{f.title}</h3>
              <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6' }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div style={{ padding: '80px 60px', background: '#0a0a1a' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 style={{ fontSize: '40px', fontWeight: '700', marginBottom: '16px' }}>Students love StudentOS</h2>
        </div>
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap', maxWidth: '1000px', margin: '0 auto' }}>
          {[
            { name: 'Rahul K.', college: 'JNTUH, CSE', text: 'Got placed at Amazon with 24 LPA. The AI career roadmap and resume builder were game changers!', avatar: '👨‍💻' },
            { name: 'Priya S.', college: 'VIT, IT', text: 'Won Smart India Hackathon using the AI idea generator. The pitch script it generated was perfect!', avatar: '👩‍💻' },
            { name: 'Arjun M.', college: 'BITS Pilani', text: 'Placement predictor told me exactly what to fix. Went from 45% to 89% chance in 2 months!', avatar: '🧑‍💻' },
          ].map((t, i) => (
            <div key={i} style={{ background: '#0d0d1f', border: '1px solid #1a1a3a', borderRadius: '16px', padding: '28px', maxWidth: '300px' }}>
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>{t.avatar}</div>
              <p style={{ fontSize: '14px', color: '#aaa', lineHeight: '1.7', marginBottom: '16px' }}>"{t.text}"</p>
              <div style={{ fontWeight: '600', fontSize: '15px' }}>{t.name}</div>
              <div style={{ fontSize: '13px', color: '#666' }}>{t.college}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Pricing */}
      <div style={{ padding: '80px 60px', maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 style={{ fontSize: '40px', fontWeight: '700', marginBottom: '16px' }}>Simple pricing</h2>
          <p style={{ color: '#888' }}>Start free, upgrade when you're ready</p>
        </div>
        <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {[
            { plan: 'Free', price: '₹0', period: 'forever', features: ['Placement Predictor', 'Basic Resume Builder', 'Hackathon Listings', '5 AI requests/day'], color: '#333', cta: 'Get Started' },
            { plan: 'Pro', price: '₹299', period: 'per month', features: ['Everything in Free', 'Unlimited AI requests', 'Advanced Resume Analysis', 'AI Mock Interviews', 'Priority Support'], color: '#7C3AED', cta: 'Start Pro', popular: true },
          ].map((p, i) => (
            <div key={i} style={{ background: '#0d0d1f', border: `2px solid ${p.color}`, borderRadius: '20px', padding: '36px', minWidth: '280px', position: 'relative' }}>
              {p.popular && <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', background: '#7C3AED', padding: '4px 16px', borderRadius: '20px', fontSize: '12px', fontWeight: '600' }}>Most Popular</div>}
              <div style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>{p.plan}</div>
              <div style={{ fontSize: '40px', fontWeight: '800', marginBottom: '4px' }}>{p.price}</div>
              <div style={{ fontSize: '13px', color: '#666', marginBottom: '24px' }}>{p.period}</div>
              {p.features.map((f, j) => (
                <div key={j} style={{ fontSize: '14px', color: '#aaa', marginBottom: '10px' }}>✓ {f}</div>
              ))}
              <button onClick={() => setPage('signup')} style={{ width: '100%', padding: '12px', marginTop: '20px', background: p.popular ? '#7C3AED' : 'transparent', border: `1px solid ${p.color}`, borderRadius: '10px', color: 'white', fontSize: '15px', cursor: 'pointer', fontWeight: '500' }}>{p.cta}</button>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ textAlign: 'center', padding: '80px 20px', background: 'linear-gradient(135deg, #7C3AED11, #3B82F611)' }}>
        <h2 style={{ fontSize: '40px', fontWeight: '700', marginBottom: '16px' }}>Ready to get placed? 🚀</h2>
        <p style={{ color: '#888', marginBottom: '32px', fontSize: '18px' }}>Join 10,000+ students already using StudentOS</p>
        <button onClick={() => setPage('signup')} style={{ background: 'linear-gradient(135deg, #7C3AED, #3B82F6)', border: 'none', color: 'white', padding: '16px 48px', borderRadius: '12px', fontSize: '18px', cursor: 'pointer', fontWeight: '600' }}>
          Start for Free →
        </button>
      </div>

      {/* Footer */}
      <footer style={{ padding: '40px 60px', borderTop: '1px solid #111', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <span style={{ background: 'linear-gradient(135deg, #7C3AED, #3B82F6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: '700', fontSize: '18px' }}>StudentOS</span>
        <span style={{ color: '#444', fontSize: '13px' }}>© 2026 StudentOS — Built with ❤️ for Indian students</span>
        <div style={{ display: 'flex', gap: '20px' }}>
          {['Privacy', 'Terms', 'Contact'].map(l => <span key={l} style={{ color: '#444', fontSize: '13px', cursor: 'pointer' }}>{l}</span>)}
        </div>
      </footer>

    </div>
  );
}

export default App;