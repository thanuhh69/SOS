import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';

function Profile({ onNavigate }) {
  const user = auth.currentUser;
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [profile, setProfile] = useState({
    name: user?.displayName || '',
    email: user?.email || '',
    college: '',
    branch: '',
    year: '2nd Year',
    cgpa: '',
    skills: '',
    interests: '',
    bio: '',
    linkedin: '',
    github: '',
    portfolio: '',
    achievements: '',
    certifications: '',
  });

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      const ref = doc(db, 'users', user.uid);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        setProfile(prev => ({ ...prev, ...snap.data() }));
      }
      setLoading(false);
    };
    fetchProfile();
  }, [user]);

  const handleSave = async () => {
    setSaving(true);
    await setDoc(doc(db, 'users', user.uid), profile);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleLogout = async () => {
    await signOut(auth);
    onNavigate('home');
  };

  const input = (label, key, placeholder, type = 'text') => (
    <div style={{ marginBottom: '16px' }}>
      <label style={{ fontSize: '13px', color: '#888', display: 'block', marginBottom: '6px' }}>{label}</label>
      <input
        type={type}
        value={profile[key]}
        onChange={e => setProfile(prev => ({ ...prev, [key]: e.target.value }))}
        placeholder={placeholder}
        style={{ width: '100%', padding: '10px 12px', background: '#080814', border: '1px solid #1a1a3a', borderRadius: '8px', color: 'white', fontSize: '14px', boxSizing: 'border-box' }}
      />
    </div>
  );

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', background: '#080814', color: 'white' }}>
      Loading profile...
    </div>
  );

  return (
    <div style={{ background: '#080814', minHeight: '100vh', fontFamily: 'sans-serif', color: 'white' }}>

      {/* Header */}
      <div style={{ background: '#0d0d1f', borderBottom: '1px solid #1a1a3a', padding: '16px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span onClick={() => onNavigate('dashboard')} style={{ cursor: 'pointer', color: '#7C3AED', fontSize: '20px', fontWeight: '700' }}>StudentOS</span>
          <span style={{ color: '#444' }}>→</span>
          <span style={{ color: '#aaa', fontSize: '14px' }}>My Profile</span>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button onClick={() => onNavigate('dashboard')} style={{ padding: '8px 20px', background: 'transparent', border: '1px solid #1a1a3a', borderRadius: '8px', color: '#aaa', cursor: 'pointer', fontSize: '13px' }}>
            ← Dashboard
          </button>
          <button onClick={handleLogout} style={{ padding: '8px 20px', background: '#ef444422', border: '1px solid #ef4444', borderRadius: '8px', color: '#ef4444', cursor: 'pointer', fontSize: '13px' }}>
            🚪 Logout
          </button>
        </div>
      </div>

      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '32px 20px' }}>

        {/* Avatar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '32px', background: '#0d0d1f', border: '1px solid #1a1a3a', borderRadius: '16px', padding: '24px' }}>
          <div style={{ width: '72px', height: '72px', background: 'linear-gradient(135deg, #7C3AED, #3B82F6)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', fontWeight: '700', flexShrink: 0 }}>
            {profile.name ? profile.name[0].toUpperCase() : 'S'}
          </div>
          <div>
            <h2 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '4px' }}>{profile.name || 'Your Name'}</h2>
            <p style={{ color: '#666', fontSize: '14px', marginBottom: '4px' }}>{profile.email}</p>
            <p style={{ color: '#7C3AED', fontSize: '13px' }}>{profile.college || 'Add your college'} {profile.branch ? `• ${profile.branch}` : ''}</p>
          </div>
        </div>

        {/* Basic Info */}
        <div style={{ background: '#0d0d1f', border: '1px solid #1a1a3a', borderRadius: '16px', padding: '24px', marginBottom: '20px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '20px', color: '#7C3AED' }}>📋 Basic Information</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 20px' }}>
            {input('Full Name', 'name', 'Your full name')}
            {input('College', 'college', 'e.g. JNTUH, VIT, BITS')}
            {input('Branch', 'branch', 'e.g. CSE, IT, ECE')}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '13px', color: '#888', display: 'block', marginBottom: '6px' }}>Year of Study</label>
              <select value={profile.year} onChange={e => setProfile(prev => ({ ...prev, year: e.target.value }))}
                style={{ width: '100%', padding: '10px 12px', background: '#080814', border: '1px solid #1a1a3a', borderRadius: '8px', color: 'white', fontSize: '14px' }}>
                {['1st Year', '2nd Year', '3rd Year', '4th Year'].map(y => <option key={y}>{y}</option>)}
              </select>
            </div>
            {input('CGPA', 'cgpa', 'e.g. 8.5', 'number')}
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ fontSize: '13px', color: '#888', display: 'block', marginBottom: '6px' }}>Bio</label>
            <textarea value={profile.bio} onChange={e => setProfile(prev => ({ ...prev, bio: e.target.value }))}
              placeholder="Write a short bio about yourself..." rows={3}
              style={{ width: '100%', padding: '10px 12px', background: '#080814', border: '1px solid #1a1a3a', borderRadius: '8px', color: 'white', fontSize: '14px', boxSizing: 'border-box', resize: 'vertical' }} />
          </div>
        </div>

        {/* Skills */}
        <div style={{ background: '#0d0d1f', border: '1px solid #1a1a3a', borderRadius: '16px', padding: '24px', marginBottom: '20px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '20px', color: '#7C3AED' }}>💻 Skills & Interests</h3>
          {input('Skills', 'skills', 'e.g. Python, React, SQL, Machine Learning')}
          {input('Interests', 'interests', 'e.g. AI, Web Dev, Data Science, Cybersecurity')}
          {input('Certifications', 'certifications', 'e.g. AWS Cloud, Google ML, Meta Frontend')}
          {input('Achievements', 'achievements', 'e.g. Won SIH 2025, Top 10 in Flipkart Grid')}
        </div>

        {/* Links */}
        <div style={{ background: '#0d0d1f', border: '1px solid #1a1a3a', borderRadius: '16px', padding: '24px', marginBottom: '24px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '20px', color: '#7C3AED' }}>🔗 Social Links</h3>
          {input('LinkedIn URL', 'linkedin', 'https://linkedin.com/in/yourname')}
          {input('GitHub URL', 'github', 'https://github.com/yourusername')}
          {input('Portfolio URL', 'portfolio', 'https://yourportfolio.com')}
        </div>

        {/* Save Button */}
        <button onClick={handleSave} disabled={saving} style={{ width: '100%', padding: '14px', background: saved ? '#22c55e' : 'linear-gradient(135deg, #7C3AED, #3B82F6)', border: 'none', borderRadius: '12px', color: 'white', fontSize: '16px', cursor: 'pointer', fontWeight: '600', opacity: saving ? 0.7 : 1 }}>
          {saving ? '⏳ Saving...' : saved ? '✅ Saved!' : '💾 Save Profile'}
        </button>
      </div>
    </div>
  );
}

export default Profile;