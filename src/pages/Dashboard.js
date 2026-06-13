import CareerVerseAI from './CareerVerse';
import React, { useState } from 'react';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
const API_KEY = process.env.REACT_APP_GROQ_API_KEY || "";

async function askClaude(prompt) {

  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {

    method: 'POST',

    headers: {

      'Content-Type': 'application/json',

      'Authorization': `Bearer ${API_KEY}`

    },

    body: JSON.stringify({

      model: 'llama-3.1-8b-instant',

      messages: [{ role: 'user', content: prompt }],

      max_tokens: 1000

    })

  });

  const data = await res.json();

  return data.choices[0].message.content;

}

function Dashboard({ onNavigate }) {
  const [activeTab, setActiveTab] = useState('home');
  const user = auth.currentUser;

  const tabs = [
    { id: 'home', icon: '🏠', label: 'Home' },
    { id: 'placement', icon: '📊', label: 'Placement' },
    { id: 'career', icon: '🤖', label: 'AI Career' },
    { id: 'resume', icon: '📄', label: 'Resume Builder' },
    { id: 'hackathon', icon: '🏆', label: 'Hackathon Hub' },
    { id: 'project', icon: '💡', label: 'Project Generator' },
    { id: 'study', icon: '📚', label: 'Study Assistant' },
    { id: 'coding', icon: '💻', label: 'Coding Hub' },
    { id: 'preperation', icon: '🎯', label: 'Placement Prep' },
    { id: 'certifications', icon: '📑', label: 'Certifications' },
    { id: 'internship', icon: '💼', label: 'Internship Hub' },
    { id: 'community', icon: '🌐', label: 'Community' },
    { id: 'events', icon: '🎤', label: 'Events' },
    { id: 'productivity', icon: '⏰', label: 'Productivity' },
    { id: 'skills', icon: '📈', label: 'Skill Tracker' },
    { id: 'careerverse', icon: '🚀', label: 'Career Explorer' },
  ];

  const handleLogout = async () => {
    await signOut(auth);
    onNavigate('home');
  };

  const card = (content) => (
    <div style={{ background: '#1a1a2e', border: '1px solid #2a2a4a', borderRadius: '12px', padding: '24px', marginBottom: '16px' }}>
      {content}
    </div>
  );



  return (
    <div style={{ background: '#0f0f1a', minHeight: '100vh', fontFamily: 'sans-serif', color: 'white', display: 'flex' }}>

      {/* Sidebar */}
      <div style={{ width: '220px', background: '#1a1a2e', borderRight: '1px solid #2a2a4a', padding: '24px 16px', display: 'flex', flexDirection: 'column', gap: '4px', overflowY: 'auto', position: 'sticky', top: 0, height: '100vh' }}>

        <h2 style={{ color: '#7C3AED', marginBottom: '16px', fontSize: '20px' }}>StudentOS</h2>

        {/* User info */}
        <div style={{ background: '#0f0f1a', border: '1px solid #2a2a4a', borderRadius: '10px', padding: '12px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '36px', height: '36px', background: 'linear-gradient(135deg, #7C3AED, #3B82F6)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', fontWeight: '700', flexShrink: 0 }}>
            {user?.displayName ? user.displayName[0].toUpperCase() : user?.email?.[0].toUpperCase() || 'S'}
          </div>
          <div style={{ overflow: 'hidden' }}>
            <div style={{ fontSize: '13px', fontWeight: '600', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user?.displayName || 'Student'}</div>
            <div style={{ fontSize: '11px', color: '#666', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user?.email || ''}</div>
          </div>
        </div>

        {tabs.map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id)} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '9px 12px', borderRadius: '8px', border: 'none', cursor: 'pointer', background: activeTab === t.id ? '#7C3AED' : 'transparent', color: activeTab === t.id ? 'white' : '#aaa', fontSize: '13px', textAlign: 'left' }}>
            {t.icon} {t.label}
          </button>
        ))}

        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <button onClick={() => onNavigate('profile')} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '9px 12px', borderRadius: '8px', border: '1px solid #2a2a4a', background: 'transparent', color: '#aaa', cursor: 'pointer', fontSize: '13px', textAlign: 'left' }}>
            👤 My Profile
          </button>
          <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '9px 12px', borderRadius: '8px', border: '1px solid #ef444444', background: 'transparent', color: '#ef4444', cursor: 'pointer', fontSize: '13px', textAlign: 'left' }}>
            🚪 Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: '32px', overflowY: 'auto' }}>
        {activeTab === 'home' && <HomeTab onNavigate={onNavigate} user={user} />}
        {activeTab === 'placement' && <PlacementTab />}
        {activeTab === 'career' && <CareerTab />}
        {activeTab === 'resume' && <ResumeTab />}
        {activeTab === 'hackathon' && <HackathonTab />}
        {activeTab === 'project' && <ProjectTab />}
        {activeTab === 'study' && <StudyTab />}
        {activeTab === 'coding' && <CodingTab />}
        {activeTab === 'preperation' && <PlacementPrepTab />} 
        {activeTab === 'certifications' && <CertificationsTab />}
        {activeTab === 'internship' && <InternshipTab />}
        {activeTab === 'community' && <CommunityTab />}
        {activeTab === 'events' && <EventsTab />}
        {activeTab === 'productivity' && <ProductivityTab />}
        {activeTab === 'skills' && <SkillTrackerTab />}
        {activeTab === 'careerverse' && <CareerVerseTab />}
      </div>
    </div>
  );
}

function HomeTab({ onNavigate, user }) {
  return (
    <div>
      <h2 style={{ fontSize: '28px', marginBottom: '8px' }}>Welcome back, {user?.displayName || 'Student'} 👋</h2>
      <p style={{ color: '#aaa', marginBottom: '32px' }}>Here's your StudentOS overview</p>
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '32px' }}>
        {[
          { icon: '📊', label: 'Placement Score', value: '72%' },
          { icon: '📄', label: 'Resume Score', value: '68/100' },
          { icon: '🏆', label: 'Hackathons', value: '3 Upcoming' },
          { icon: '📚', label: 'Learning Hours', value: '24 hrs' },
        ].map((s, i) => (
          <div key={i} style={{ background: '#1a1a2e', border: '1px solid #2a2a4a', borderRadius: '12px', padding: '20px', minWidth: '160px' }}>
            <div style={{ fontSize: '28px', marginBottom: '8px' }}>{s.icon}</div>
            <div style={{ fontSize: '13px', color: '#aaa' }}>{s.label}</div>
            <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#7C3AED' }}>{s.value}</div>
          </div>
        ))}
      </div>
      <div style={{ background: 'linear-gradient(135deg, #7C3AED22, #3B82F622)', border: '1px solid #7C3AED44', borderRadius: '12px', padding: '20px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontWeight: '600', marginBottom: '4px' }}>Complete your profile 👤</div>
          <div style={{ fontSize: '13px', color: '#aaa' }}>Add your college, skills, and links to get better AI recommendations</div>
        </div>
        <button onClick={() => onNavigate('profile')} style={{ padding: '10px 20px', background: '#7C3AED', border: 'none', borderRadius: '8px', color: 'white', cursor: 'pointer', fontSize: '13px', fontWeight: '500', whiteSpace: 'nowrap' }}>
          Edit Profile →
        </button>
      </div>
      <div style={{ background: '#1a1a2e', border: '1px solid #2a2a4a', borderRadius: '12px', padding: '20px' }}>
        <h3 style={{ marginBottom: '16px', fontSize: '16px' }}>🚀 Quick Actions</h3>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {['Build Resume', 'Predict Placement', 'Generate Project Idea', 'Find Hackathon', 'Get Career Roadmap'].map((a, i) => (
            <span key={i} style={{ padding: '8px 16px', background: '#7C3AED22', border: '1px solid #7C3AED44', borderRadius: '8px', fontSize: '13px', color: '#7C3AED', cursor: 'pointer' }}>{a}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function PlacementTab() {
  const [cgpa, setCgpa] = useState('');
  const [backlogs, setBacklogs] = useState(0);
  const [internships, setInternships] = useState(0);
  const [projects, setProjects] = useState(0);
  const [coding, setCoding] = useState(0);
  const [skills, setSkills] = useState([]);
  const [result, setResult] = useState(null);

  const allSkills = ['Python', 'JavaScript', 'SQL', 'ML', 'React', 'Java', 'DSA', 'Cloud'];
  const toggleSkill = (s) => setSkills(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);

  const predict = () => {
    const c = parseFloat(cgpa) || 0;
    let score = 0;
    score += (c / 10) * 30;
    score += Math.max(0, 1 - backlogs * 0.25) * 15;
    score += (internships / 3) * 20;
    score += (projects / 3) * 10;
    score += (coding / 3) * 10;
    score += Math.min(skills.length / 5, 1) * 15;
    setResult(Math.round(Math.min(score, 99)));
  };

  return (
    <div>
      <h2 style={{ fontSize: '24px', marginBottom: '24px' }}>📊 Placement Predictor</h2>
      <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
        <div style={{ background: '#1a1a2e', border: '1px solid #2a2a4a', borderRadius: '12px', padding: '24px', flex: 1, minWidth: '300px' }}>
          {[['CGPA', cgpa, setCgpa], ['Backlogs', backlogs, setBacklogs], ['Internships', internships, setInternships], ['Projects', projects, setProjects], ['Coding Level (0-3)', coding, setCoding]].map(([label, val, setter]) => (
            <div key={label} style={{ marginBottom: '14px' }}>
              <label style={{ fontSize: '13px', color: '#aaa', display: 'block', marginBottom: '6px' }}>{label}</label>
              <input type="number" value={val} onChange={e => setter(e.target.value)} style={{ width: '100%', padding: '10px', background: '#0f0f1a', border: '1px solid #2a2a4a', borderRadius: '8px', color: 'white', fontSize: '14px', boxSizing: 'border-box' }} />
            </div>
          ))}
          <div style={{ marginBottom: '16px' }}>
            <label style={{ fontSize: '13px', color: '#aaa', display: 'block', marginBottom: '10px' }}>Skills</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {allSkills.map(s => (
                <span key={s} onClick={() => toggleSkill(s)} style={{ padding: '6px 14px', borderRadius: '20px', fontSize: '13px', cursor: 'pointer', border: '1px solid', borderColor: skills.includes(s) ? '#7C3AED' : '#2a2a4a', background: skills.includes(s) ? '#7C3AED22' : 'transparent', color: skills.includes(s) ? '#7C3AED' : '#aaa' }}>{s}</span>
              ))}
            </div>
          </div>
          <button onClick={predict} style={{ width: '100%', padding: '12px', background: '#7C3AED', border: 'none', borderRadius: '8px', color: 'white', fontSize: '16px', cursor: 'pointer' }}>Predict →</button>
        </div>
        {result !== null && (
          <div style={{ background: '#1a1a2e', border: '1px solid #2a2a4a', borderRadius: '12px', padding: '24px', flex: 1, minWidth: '280px', textAlign: 'center' }}>
            <div style={{ fontSize: '64px', fontWeight: 'bold', color: result >= 70 ? '#22c55e' : result >= 45 ? '#f59e0b' : '#ef4444' }}>{result}%</div>
            <div style={{ fontSize: '18px', marginBottom: '16px' }}>{result >= 70 ? '🟢 Strong Prospect!' : result >= 45 ? '🟡 Moderate Chance' : '🔴 Needs Improvement'}</div>
            <p style={{ color: '#aaa', fontSize: '14px' }}>{result >= 70 ? 'Your profile is competitive. Focus on interview prep!' : result >= 45 ? 'A few improvements can boost your chances significantly.' : 'Work on DSA, projects and internships first.'}</p>
          </div>
        )}
      </div>
    </div>
  );
}

function CareerTab() {
  const [domain, setDomain] = useState('');
  const [skills, setSkills] = useState('');
  const [year, setYear] = useState('2nd Year');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeFeature, setActiveFeature] = useState('roadmap');

  const features = [
    { id: 'roadmap', label: '🗺️ Career Roadmap' },
    { id: 'projects', label: '💡 Project Suggestions' },
    { id: 'skillgap', label: '📊 Skill Gap Analysis' },
    { id: 'advice', label: '🎯 Placement Advice' },
    { id: 'plan', label: '📚 Learning Plan' },
  ];

  const generate = async () => {
    if (!domain) return alert('Please enter your domain');
    setLoading(true);
    setResponse('');
    const prompts = {
      roadmap: `Create a detailed career roadmap for an Indian college student in ${year} interested in ${domain} with skills: ${skills}. Include: months timeline, skills to learn, projects to build, certifications, and placement preparation. Format nicely with sections.`,
      projects: `Suggest 5 impressive project ideas for an Indian college student in ${year} interested in ${domain} with skills: ${skills}. For each project include: title, description, tech stack, difficulty, and impact on resume. Format nicely.`,
      skillgap: `Analyze skill gaps for an Indian college student in ${year} interested in ${domain} who knows: ${skills}. List: missing critical skills, nice-to-have skills, resources to learn each, and priority order. Format nicely.`,
      advice: `Give detailed placement advice for an Indian college student in ${year} targeting ${domain} roles with skills: ${skills}. Include: which companies to target, CGPA requirements, preparation timeline, interview tips, and common mistakes to avoid.`,
      plan: `Create a 3-month learning plan for an Indian college student in ${year} to get into ${domain} with current skills: ${skills}. Week by week breakdown with specific resources, projects, and milestones.`,
    };
    try {
      const res = await askClaude(prompts[activeFeature]);
      setResponse(res);
    } catch (e) {
      setResponse('Error connecting to AI. Please check your API key.');
    }
    setLoading(false);
  };

  return (
    <div>
      <h2 style={{ fontSize: '24px', marginBottom: '8px' }}>🤖 AI Career Assistant</h2>
      <p style={{ color: '#aaa', marginBottom: '24px' }}>Powered by AI — personalized just for you</p>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
        {features.map(f => (
          <button key={f.id} onClick={() => setActiveFeature(f.id)} style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid', borderColor: activeFeature === f.id ? '#7C3AED' : '#2a2a4a', background: activeFeature === f.id ? '#7C3AED22' : 'transparent', color: activeFeature === f.id ? '#7C3AED' : '#aaa', cursor: 'pointer', fontSize: '13px' }}>
            {f.label}
          </button>
        ))}
      </div>
      <div style={{ background: '#1a1a2e', border: '1px solid #2a2a4a', borderRadius: '12px', padding: '24px', marginBottom: '16px' }}>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '16px' }}>
          <div style={{ flex: 1, minWidth: '200px' }}>
            <label style={{ fontSize: '13px', color: '#aaa', display: 'block', marginBottom: '6px' }}>Your Domain / Interest</label>
            <input value={domain} onChange={e => setDomain(e.target.value)} placeholder="e.g. Full Stack, Data Science, AI/ML" style={{ width: '100%', padding: '10px', background: '#0f0f1a', border: '1px solid #2a2a4a', borderRadius: '8px', color: 'white', fontSize: '14px', boxSizing: 'border-box' }} />
          </div>
          <div style={{ flex: 1, minWidth: '200px' }}>
            <label style={{ fontSize: '13px', color: '#aaa', display: 'block', marginBottom: '6px' }}>Current Skills</label>
            <input value={skills} onChange={e => setSkills(e.target.value)} placeholder="e.g. Python, React, SQL" style={{ width: '100%', padding: '10px', background: '#0f0f1a', border: '1px solid #2a2a4a', borderRadius: '8px', color: 'white', fontSize: '14px', boxSizing: 'border-box' }} />
          </div>
          <div style={{ minWidth: '150px' }}>
            <label style={{ fontSize: '13px', color: '#aaa', display: 'block', marginBottom: '6px' }}>Year of Study</label>
            <select value={year} onChange={e => setYear(e.target.value)} style={{ width: '100%', padding: '10px', background: '#0f0f1a', border: '1px solid #2a2a4a', borderRadius: '8px', color: 'white', fontSize: '14px' }}>
              {['1st Year', '2nd Year', '3rd Year', '4th Year'].map(y => <option key={y}>{y}</option>)}
            </select>
          </div>
        </div>
        <button onClick={generate} disabled={loading} style={{ padding: '12px 32px', background: '#7C3AED', border: 'none', borderRadius: '8px', color: 'white', fontSize: '15px', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1 }}>
          {loading ? '⏳ Generating...' : '✨ Generate with AI'}
        </button>
      </div>
      {response && (
        <div style={{ background: '#1a1a2e', border: '1px solid #2a2a4a', borderRadius: '12px', padding: '24px' }}>
          <h3 style={{ marginBottom: '16px', color: '#7C3AED' }}>AI Response</h3>
          <pre style={{ whiteSpace: 'pre-wrap', fontSize: '14px', lineHeight: '1.7', color: '#ddd', fontFamily: 'sans-serif' }}>{response}</pre>
        </div>
      )}
    </div>
  );
}

function ResumeTab() {
  const [name, setName] = useState('');
  const [college, setCollege] = useState('');
  const [branch, setBranch] = useState('');
  const [skills, setSkills] = useState('');
  const [projects, setProjects] = useState('');
  const [internships, setInternships] = useState('');
  const [activeFeature, setActiveFeature] = useState('resume');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const features = [
    { id: 'resume', label: '📄 ATS Resume' },
    { id: 'linkedin', label: '💼 LinkedIn Summary' },
    { id: 'cover', label: '✉️ Cover Letter' },
    { id: 'score', label: '⭐ Resume Score' },
  ];

  const generate = async () => {
    if (!name || !skills) return alert('Please enter your name and skills');
    setLoading(true);
    setResponse('');
    const prompts = {
      resume: `Generate a professional ATS-friendly resume for an Indian college student:\nName: ${name}, College: ${college}, Branch: ${branch}\nSkills: ${skills}\nProjects: ${projects}\nInternships: ${internships}\nFormat it as a proper resume with sections: Summary, Education, Skills, Projects, Internships, Certifications. Make it impressive and ATS-optimized.`,
      linkedin: `Write a professional LinkedIn summary for an Indian college student:\nName: ${name}, Branch: ${branch}, Skills: ${skills}, Projects: ${projects}\nMake it engaging, professional, and under 200 words. Include a call to action.`,
      cover: `Write a professional cover letter for an Indian college student applying for internships/jobs:\nName: ${name}, College: ${college}, Branch: ${branch}, Skills: ${skills}\nMake it compelling, professional, and personalized.`,
      score: `Review and score this student profile for resume quality (out of 100):\nName: ${name}, College: ${college}, Branch: ${branch}\nSkills: ${skills}, Projects: ${projects}, Internships: ${internships}\nGive: overall score, section-wise scores, strengths, weaknesses, and specific improvement tips.`,
    };
    try {
      const res = await askClaude(prompts[activeFeature]);
      setResponse(res);
    } catch (e) {
      setResponse('Error connecting to AI. Please check your API key.');
    }
    setLoading(false);
  };

  return (
    <div>
      <h2 style={{ fontSize: '24px', marginBottom: '8px' }}>📄 AI Resume Builder</h2>
      <p style={{ color: '#aaa', marginBottom: '24px' }}>Generate ATS-ready resumes and more with AI</p>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
        {features.map(f => (
          <button key={f.id} onClick={() => setActiveFeature(f.id)} style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid', borderColor: activeFeature === f.id ? '#7C3AED' : '#2a2a4a', background: activeFeature === f.id ? '#7C3AED22' : 'transparent', color: activeFeature === f.id ? '#7C3AED' : '#aaa', cursor: 'pointer', fontSize: '13px' }}>
            {f.label}
          </button>
        ))}
      </div>
      <div style={{ background: '#1a1a2e', border: '1px solid #2a2a4a', borderRadius: '12px', padding: '24px', marginBottom: '16px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
          {[['Full Name', name, setName, 'e.g. Rahul Kumar'], ['College', college, setCollege, 'e.g. JNTUH'], ['Branch', branch, setBranch, 'e.g. CSE'], ['Skills', skills, setSkills, 'e.g. Python, React, SQL']].map(([label, val, setter, ph]) => (
            <div key={label}>
              <label style={{ fontSize: '13px', color: '#aaa', display: 'block', marginBottom: '6px' }}>{label}</label>
              <input value={val} onChange={e => setter(e.target.value)} placeholder={ph} style={{ width: '100%', padding: '10px', background: '#0f0f1a', border: '1px solid #2a2a4a', borderRadius: '8px', color: 'white', fontSize: '14px', boxSizing: 'border-box' }} />
            </div>
          ))}
        </div>
        {[['Projects', projects, setProjects, 'e.g. Placement Predictor using ML'], ['Internships', internships, setInternships, 'e.g. Python Intern at XYZ company']].map(([label, val, setter, ph]) => (
          <div key={label} style={{ marginBottom: '14px' }}>
            <label style={{ fontSize: '13px', color: '#aaa', display: 'block', marginBottom: '6px' }}>{label}</label>
            <textarea value={val} onChange={e => setter(e.target.value)} placeholder={ph} rows={2} style={{ width: '100%', padding: '10px', background: '#0f0f1a', border: '1px solid #2a2a4a', borderRadius: '8px', color: 'white', fontSize: '14px', boxSizing: 'border-box', resize: 'vertical' }} />
          </div>
        ))}
        <button onClick={generate} disabled={loading} style={{ padding: '12px 32px', background: '#7C3AED', border: 'none', borderRadius: '8px', color: 'white', fontSize: '15px', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1 }}>
          {loading ? '⏳ Generating...' : '✨ Generate with AI'}
        </button>
      </div>
      {response && (
        <div style={{ background: '#1a1a2e', border: '1px solid #2a2a4a', borderRadius: '12px', padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ color: '#7C3AED' }}>AI Generated Output</h3>
            <button onClick={() => navigator.clipboard.writeText(response)} style={{ padding: '6px 14px', background: 'transparent', border: '1px solid #2a2a4a', borderRadius: '6px', color: '#aaa', cursor: 'pointer', fontSize: '12px' }}>📋 Copy</button>
          </div>
          <pre style={{ whiteSpace: 'pre-wrap', fontSize: '14px', lineHeight: '1.7', color: '#ddd', fontFamily: 'sans-serif' }}>{response}</pre>
        </div>
      )}
    </div>
  );
}

function HackathonTab() {
  const [idea, setIdea] = useState('');
  const [tech, setTech] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeFeature, setActiveFeature] = useState('idea');

  const features = [
    { id: 'idea', label: '💡 Idea Generator' },
    { id: 'roadmap', label: '🗺️ Project Roadmap' },
    { id: 'architecture', label: '🏗️ Architecture' },
    { id: 'pitch', label: '🎤 Pitch Script' },
  ];

  const hackathons = [
    { name: 'Smart India Hackathon 2026', date: 'Aug 2026', prize: '₹1,00,000', type: 'National' },
    { name: 'HackWithInfy', date: 'Jul 2026', prize: '₹50,000', type: 'Corporate' },
    { name: 'Flipkart Grid 7.0', date: 'Sep 2026', prize: '₹75,000', type: 'Corporate' },
    { name: 'IIT Bombay Techfest', date: 'Dec 2026', prize: '₹25,000', type: 'College' },
  ];

  const generate = async () => {
    setLoading(true);
    setResponse('');
    const prompts = {
      idea: `Generate 5 innovative hackathon project ideas for Indian college students. Focus on solving real Indian problems. For each: title, problem, solution, tech stack, unique feature, wow factor.`,
      roadmap: `Create a detailed 48-hour hackathon roadmap for: "${idea || 'a social impact app'}" using ${tech || 'React and Python'}. Hour by hour breakdown, MVP features, stretch goals, presentation tips.`,
      architecture: `Design technical architecture for: "${idea || 'a smart campus app'}" using ${tech || 'React and Python'}. System design, database schema, API endpoints, tech stack justification.`,
      pitch: `Write a 3-minute hackathon pitch for: "${idea || 'an AI-powered student platform'}". Problem hook, solution demo, impact metrics, technical highlights, strong closing.`,
    };
    try {
      const res = await askClaude(prompts[activeFeature]);
      setResponse(res);
    } catch (e) {
      setResponse('Error connecting to AI.');
    }
    setLoading(false);
  };

  return (
    <div>
      <h2 style={{ fontSize: '24px', marginBottom: '8px' }}>🏆 Hackathon Hub</h2>
      <p style={{ color: '#aaa', marginBottom: '24px' }}>Find hackathons and get AI-powered help to win them</p>
      <div style={{ background: '#1a1a2e', border: '1px solid #2a2a4a', borderRadius: '12px', padding: '20px', marginBottom: '20px' }}>
        <h3 style={{ marginBottom: '16px', fontSize: '16px' }}>📅 Upcoming Hackathons</h3>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          {hackathons.map((h, i) => (
            <div key={i} style={{ background: '#0f0f1a', border: '1px solid #2a2a4a', borderRadius: '10px', padding: '16px', minWidth: '200px' }}>
              <div style={{ fontSize: '13px', color: '#7C3AED', marginBottom: '6px' }}>{h.type}</div>
              <div style={{ fontSize: '15px', fontWeight: 'bold', marginBottom: '6px' }}>{h.name}</div>
              <div style={{ fontSize: '13px', color: '#aaa' }}>{h.date} • {h.prize}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
        {features.map(f => (
          <button key={f.id} onClick={() => setActiveFeature(f.id)} style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid', borderColor: activeFeature === f.id ? '#7C3AED' : '#2a2a4a', background: activeFeature === f.id ? '#7C3AED22' : 'transparent', color: activeFeature === f.id ? '#7C3AED' : '#aaa', cursor: 'pointer', fontSize: '13px' }}>
            {f.label}
          </button>
        ))}
      </div>
      <div style={{ background: '#1a1a2e', border: '1px solid #2a2a4a', borderRadius: '12px', padding: '24px', marginBottom: '16px' }}>
        {activeFeature !== 'idea' && (
          <div style={{ display: 'flex', gap: '14px', marginBottom: '16px' }}>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: '13px', color: '#aaa', display: 'block', marginBottom: '6px' }}>Project Idea</label>
              <input value={idea} onChange={e => setIdea(e.target.value)} placeholder="e.g. AI-powered attendance system" style={{ width: '100%', padding: '10px', background: '#0f0f1a', border: '1px solid #2a2a4a', borderRadius: '8px', color: 'white', fontSize: '14px', boxSizing: 'border-box' }} />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: '13px', color: '#aaa', display: 'block', marginBottom: '6px' }}>Tech Stack</label>
              <input value={tech} onChange={e => setTech(e.target.value)} placeholder="e.g. React, Python, Firebase" style={{ width: '100%', padding: '10px', background: '#0f0f1a', border: '1px solid #2a2a4a', borderRadius: '8px', color: 'white', fontSize: '14px', boxSizing: 'border-box' }} />
            </div>
          </div>
        )}
        <button onClick={generate} disabled={loading} style={{ padding: '12px 32px', background: '#7C3AED', border: 'none', borderRadius: '8px', color: 'white', fontSize: '15px', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1 }}>
          {loading ? '⏳ Generating...' : '✨ Generate with AI'}
        </button>
      </div>
      {response && (
        <div style={{ background: '#1a1a2e', border: '1px solid #2a2a4a', borderRadius: '12px', padding: '24px' }}>
          <h3 style={{ color: '#7C3AED', marginBottom: '16px' }}>AI Response</h3>
          <pre style={{ whiteSpace: 'pre-wrap', fontSize: '14px', lineHeight: '1.7', color: '#ddd', fontFamily: 'sans-serif' }}>{response}</pre>
        </div>
      )}
    </div>
  );
}

function ProjectTab() {
  const [domain, setDomain] = useState('');
  const [skills, setSkills] = useState('');
  const [level, setLevel] = useState('Intermediate');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeFeature, setActiveFeature] = useState('ideas');

  const features = [
    { id: 'ideas', label: '💡 Project Ideas' },
    { id: 'techstack', label: '⚙️ Tech Stack' },
    { id: 'database', label: '🗄️ Database Design' },
    { id: 'plan', label: '📋 Dev Plan' },
  ];

  const generate = async () => {
    if (!domain) return alert('Please enter your domain');
    setLoading(true);
    setResponse('');
    const prompts = {
      ideas: `Generate 5 impressive project ideas for an Indian college student in ${domain} with skills: ${skills} at ${level} level. For each: title, problem it solves, key features, tech stack, difficulty, time to build, resume impact.`,
      techstack: `Recommend the best tech stack for a ${domain} project for an Indian college student with skills: ${skills}. Frontend, backend, database, deployment, why each choice, alternatives, learning resources.`,
      database: `Design a database schema for a ${domain} project. Tables/collections, fields, relationships, indexes, sample data. Explain each design decision.`,
      plan: `Create a detailed development plan for a ${domain} project at ${level} level with skills: ${skills}. Week by week: what to build, milestones, potential blockers, how to showcase on GitHub.`,
    };
    try {
      const res = await askClaude(prompts[activeFeature]);
      setResponse(res);
    } catch (e) {
      setResponse('Error connecting to AI.');
    }
    setLoading(false);
  };

  return (
    <div>
      <h2 style={{ fontSize: '24px', marginBottom: '8px' }}>💡 AI Project Generator</h2>
      <p style={{ color: '#aaa', marginBottom: '24px' }}>Generate project ideas, tech stacks, and development plans</p>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
        {features.map(f => (
          <button key={f.id} onClick={() => setActiveFeature(f.id)} style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid', borderColor: activeFeature === f.id ? '#7C3AED' : '#2a2a4a', background: activeFeature === f.id ? '#7C3AED22' : 'transparent', color: activeFeature === f.id ? '#7C3AED' : '#aaa', cursor: 'pointer', fontSize: '13px' }}>
            {f.label}
          </button>
        ))}
      </div>
      <div style={{ background: '#1a1a2e', border: '1px solid #2a2a4a', borderRadius: '12px', padding: '24px', marginBottom: '16px' }}>
        <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginBottom: '16px' }}>
          <div style={{ flex: 1, minWidth: '180px' }}>
            <label style={{ fontSize: '13px', color: '#aaa', display: 'block', marginBottom: '6px' }}>Domain</label>
            <input value={domain} onChange={e => setDomain(e.target.value)} placeholder="e.g. Web Dev, AI/ML, Mobile" style={{ width: '100%', padding: '10px', background: '#0f0f1a', border: '1px solid #2a2a4a', borderRadius: '8px', color: 'white', fontSize: '14px', boxSizing: 'border-box' }} />
          </div>
          <div style={{ flex: 1, minWidth: '180px' }}>
            <label style={{ fontSize: '13px', color: '#aaa', display: 'block', marginBottom: '6px' }}>Your Skills</label>
            <input value={skills} onChange={e => setSkills(e.target.value)} placeholder="e.g. Python, React" style={{ width: '100%', padding: '10px', background: '#0f0f1a', border: '1px solid #2a2a4a', borderRadius: '8px', color: 'white', fontSize: '14px', boxSizing: 'border-box' }} />
          </div>
          <div style={{ minWidth: '140px' }}>
            <label style={{ fontSize: '13px', color: '#aaa', display: 'block', marginBottom: '6px' }}>Level</label>
            <select value={level} onChange={e => setLevel(e.target.value)} style={{ width: '100%', padding: '10px', background: '#0f0f1a', border: '1px solid #2a2a4a', borderRadius: '8px', color: 'white', fontSize: '14px' }}>
              {['Beginner', 'Intermediate', 'Advanced'].map(l => <option key={l}>{l}</option>)}
            </select>
          </div>
        </div>
        <button onClick={generate} disabled={loading} style={{ padding: '12px 32px', background: '#7C3AED', border: 'none', borderRadius: '8px', color: 'white', fontSize: '15px', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1 }}>
          {loading ? '⏳ Generating...' : '✨ Generate with AI'}
        </button>
      </div>
      {response && (
        <div style={{ background: '#1a1a2e', border: '1px solid #2a2a4a', borderRadius: '12px', padding: '24px' }}>
          <h3 style={{ color: '#7C3AED', marginBottom: '16px' }}>AI Response</h3>
          <pre style={{ whiteSpace: 'pre-wrap', fontSize: '14px', lineHeight: '1.7', color: '#ddd', fontFamily: 'sans-serif' }}>{response}</pre>
        </div>
      )}
    </div>
  );
}

function StudyTab() {
  const [topic, setTopic] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeFeature, setActiveFeature] = useState('explain');

  const features = [
    { id: 'explain', label: '📖 Topic Explanation' },
    { id: 'notes', label: '📝 Notes Generator' },
    { id: 'flashcards', label: '🃏 Flashcards' },
    { id: 'quiz', label: '❓ Quiz Generator' },
    { id: 'assignment', label: '📋 Assignment Helper' },
  ];

  const generate = async () => {
    if (!topic) return alert('Please enter a topic');
    setLoading(true);
    setResponse('');
    const prompts = {
      explain: `Explain "${topic}" to an Indian engineering college student simply. What it is, why it matters, real-world examples, how it works step by step, common misconceptions, interview relevance.`,
      notes: `Generate comprehensive study notes for "${topic}" for an Indian engineering student. Key concepts, definitions, formulas, important points, exam tips, summary.`,
      flashcards: `Create 10 flashcards for "${topic}". Format each as: Q: [question] A: [answer]. Cover definitions, concepts, applications, and interview questions.`,
      quiz: `Create a 10-question quiz on "${topic}" for an Indian engineering student. Mix MCQs, true/false, short answer. Include answers at the end.`,
      assignment: `Help approach an assignment on "${topic}". Key concepts needed, step-by-step approach, important points, common mistakes to avoid, sample structure.`,
    };
    try {
      const res = await askClaude(prompts[activeFeature]);
      setResponse(res);
    } catch (e) {
      setResponse('Error connecting to AI.');
    }
    setLoading(false);
  };

  return (
    <div>
      <h2 style={{ fontSize: '24px', marginBottom: '8px' }}>📚 AI Study Assistant</h2>
      <p style={{ color: '#aaa', marginBottom: '24px' }}>Your personal AI tutor — explains, summarizes, and quizzes you</p>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
        {features.map(f => (
          <button key={f.id} onClick={() => setActiveFeature(f.id)} style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid', borderColor: activeFeature === f.id ? '#7C3AED' : '#2a2a4a', background: activeFeature === f.id ? '#7C3AED22' : 'transparent', color: activeFeature === f.id ? '#7C3AED' : '#aaa', cursor: 'pointer', fontSize: '13px' }}>
            {f.label}
          </button>
        ))}
      </div>
      <div style={{ background: '#1a1a2e', border: '1px solid #2a2a4a', borderRadius: '12px', padding: '24px', marginBottom: '16px' }}>
        <label style={{ fontSize: '13px', color: '#aaa', display: 'block', marginBottom: '6px' }}>Topic / Subject</label>
        <input value={topic} onChange={e => setTopic(e.target.value)} placeholder="e.g. Binary Search Trees, Operating Systems, Machine Learning" style={{ width: '100%', padding: '10px', background: '#0f0f1a', border: '1px solid #2a2a4a', borderRadius: '8px', color: 'white', fontSize: '14px', boxSizing: 'border-box', marginBottom: '16px' }} />
        <button onClick={generate} disabled={loading} style={{ padding: '12px 32px', background: '#7C3AED', border: 'none', borderRadius: '8px', color: 'white', fontSize: '15px', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1 }}>
          {loading ? '⏳ Generating...' : '✨ Generate with AI'}
        </button>
      </div>
      {response && (
        <div style={{ background: '#1a1a2e', border: '1px solid #2a2a4a', borderRadius: '12px', padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ color: '#7C3AED' }}>AI Response</h3>
            <button onClick={() => navigator.clipboard.writeText(response)} style={{ padding: '6px 14px', background: 'transparent', border: '1px solid #2a2a4a', borderRadius: '6px', color: '#aaa', cursor: 'pointer', fontSize: '12px' }}>📋 Copy</button>
          </div>
          <pre style={{ whiteSpace: 'pre-wrap', fontSize: '14px', lineHeight: '1.7', color: '#ddd', fontFamily: 'sans-serif' }}>{response}</pre>
        </div>
      )}
    </div>
  );
}
function CodingTab() {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('Python');
  const [topic, setTopic] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeFeature, setActiveFeature] = useState('review');

  const features = [
    { id: 'review', label: '🔍 AI Code Review' },
    { id: 'question', label: '❓ Daily Question' },
    { id: 'explain', label: '📖 Explain Code' },
    { id: 'interview', label: '🎯 Interview Questions' },
    { id: 'challenge', label: '💪 Coding Challenge' },
  ];

  const generate = async () => {
    setLoading(true);
    setResponse('');
    const prompts = {
      review: `Review this ${language} code and give detailed feedback:\n\n${code || 'No code provided'}\n\nInclude: bugs, improvements, best practices, time complexity, and optimized version.`,
      question: `Give me a ${topic || 'random'} coding problem for an Indian placement interview. Include: problem statement, examples, constraints, hints, and solution in ${language}.`,
      explain: `Explain this ${language} code line by line for a beginner:\n\n${code || 'No code provided'}\n\nInclude: what each line does, logic flow, and key concepts used.`,
      interview: `Give 10 ${topic || 'DSA'} interview questions asked at Indian product companies like Flipkart, Amazon, Google. For each: question, difficulty, approach, and solution in ${language}.`,
      challenge: `Create a ${topic || 'medium difficulty'} coding challenge for an Indian placement student. Include: problem, examples, constraints, brute force approach, optimal solution in ${language}, and time/space complexity.`,
    };
    try {
      const res = await askClaude(prompts[activeFeature]);
      setResponse(res);
    } catch (e) {
      setResponse('Error connecting to AI.');
    }
    setLoading(false);
  };

  return (
    <div>
      <h2 style={{ fontSize: '24px', marginBottom: '8px' }}>💻 Coding Practice Hub</h2>
      <p style={{ color: '#aaa', marginBottom: '24px' }}>AI-powered coding practice for placements</p>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
        {features.map(f => (
          <button key={f.id} onClick={() => setActiveFeature(f.id)} style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid', borderColor: activeFeature === f.id ? '#7C3AED' : '#2a2a4a', background: activeFeature === f.id ? '#7C3AED22' : 'transparent', color: activeFeature === f.id ? '#7C3AED' : '#aaa', cursor: 'pointer', fontSize: '13px' }}>
            {f.label}
          </button>
        ))}
      </div>

      <div style={{ background: '#1a1a2e', border: '1px solid #2a2a4a', borderRadius: '12px', padding: '24px', marginBottom: '16px' }}>
        <div style={{ display: 'flex', gap: '14px', marginBottom: '16px', flexWrap: 'wrap' }}>
          <div style={{ minWidth: '140px' }}>
            <label style={{ fontSize: '13px', color: '#aaa', display: 'block', marginBottom: '6px' }}>Language</label>
            <select value={language} onChange={e => setLanguage(e.target.value)} style={{ width: '100%', padding: '10px', background: '#0f0f1a', border: '1px solid #2a2a4a', borderRadius: '8px', color: 'white', fontSize: '14px' }}>
              {['Python', 'Java', 'JavaScript', 'C++', 'C'].map(l => <option key={l}>{l}</option>)}
            </select>
          </div>
          <div style={{ flex: 1, minWidth: '200px' }}>
            <label style={{ fontSize: '13px', color: '#aaa', display: 'block', marginBottom: '6px' }}>Topic (optional)</label>
            <input value={topic} onChange={e => setTopic(e.target.value)} placeholder="e.g. Arrays, Trees, Dynamic Programming" style={{ width: '100%', padding: '10px', background: '#0f0f1a', border: '1px solid #2a2a4a', borderRadius: '8px', color: 'white', fontSize: '14px', boxSizing: 'border-box' }} />
          </div>
        </div>
        {(activeFeature === 'review' || activeFeature === 'explain') && (
          <div style={{ marginBottom: '16px' }}>
            <label style={{ fontSize: '13px', color: '#aaa', display: 'block', marginBottom: '6px' }}>Paste your code</label>
            <textarea value={code} onChange={e => setCode(e.target.value)} placeholder="Paste your code here..." rows={6} style={{ width: '100%', padding: '10px', background: '#0f0f1a', border: '1px solid #2a2a4a', borderRadius: '8px', color: '#22c55e', fontSize: '13px', boxSizing: 'border-box', resize: 'vertical', fontFamily: 'monospace' }} />
          </div>
        )}
        <button onClick={generate} disabled={loading} style={{ padding: '12px 32px', background: '#7C3AED', border: 'none', borderRadius: '8px', color: 'white', fontSize: '15px', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1 }}>
          {loading ? '⏳ Generating...' : '✨ Generate with AI'}
        </button>
      </div>

      {response && (
        <div style={{ background: '#1a1a2e', border: '1px solid #2a2a4a', borderRadius: '12px', padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ color: '#7C3AED' }}>AI Response</h3>
            <button onClick={() => navigator.clipboard.writeText(response)} style={{ padding: '6px 14px', background: 'transparent', border: '1px solid #2a2a4a', borderRadius: '6px', color: '#aaa', cursor: 'pointer', fontSize: '12px' }}>📋 Copy</button>
          </div>
          <pre style={{ whiteSpace: 'pre-wrap', fontSize: '14px', lineHeight: '1.7', color: '#ddd', fontFamily: 'sans-serif' }}>{response}</pre>
        </div>
      )}
    </div>
  );
}
function PlacementPrepTab() {
  const [role, setRole] = useState('');
  const [company, setCompany] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeFeature, setActiveFeature] = useState('hr');

  const features = [
    { id: 'hr', label: '🤝 HR Questions' },
    { id: 'technical', label: '💻 Technical Questions' },
    { id: 'aptitude', label: '🧮 Aptitude Test' },
    { id: 'mock', label: '🎭 Mock Interview' },
    { id: 'feedback', label: '📝 Interview Feedback' },
  ];

  const generate = async () => {
    setLoading(true);
    setResponse('');
    const prompts = {
      hr: `Give 15 most common HR interview questions for ${company || 'Indian product companies'} for a ${role || 'software engineer'} role. For each: question, what they're testing, and a strong sample answer for a fresh Indian college graduate.`,
      technical: `Give 10 technical interview questions for ${company || 'Indian product companies'} for a ${role || 'software engineer'} role. Include: question, concept tested, detailed answer, and follow-up questions they might ask.`,
      aptitude: `Create a 15-question aptitude test for Indian placement exams like ${company || 'TCS, Infosys, Wipro'}. Include: quantitative, logical reasoning, verbal ability. Give answers and explanations at the end.`,
      mock: `Conduct a mock interview for a ${role || 'software engineer'} position at ${company || 'a top Indian product company'}. Ask 8 questions one by one (mix of HR and technical), then give overall feedback and rating out of 10.`,
      feedback: `Give a detailed interview preparation checklist for ${role || 'software engineer'} role at ${company || 'Indian product companies'}. Include: technical topics to prepare, HR tips, body language, common mistakes, day-before tips, and what to bring.`,
    };
    try {
      const res = await askClaude(prompts[activeFeature]);
      setResponse(res);
    } catch (e) {
      setResponse('Error connecting to AI.');
    }
    setLoading(false);
  };

  return (
    <div>
      <h2 style={{ fontSize: '24px', marginBottom: '8px' }}>🎯 Placement Preparation</h2>
      <p style={{ color: '#aaa', marginBottom: '24px' }}>AI-powered interview prep for Indian placements</p>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
        {features.map(f => (
          <button key={f.id} onClick={() => setActiveFeature(f.id)} style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid', borderColor: activeFeature === f.id ? '#7C3AED' : '#2a2a4a', background: activeFeature === f.id ? '#7C3AED22' : 'transparent', color: activeFeature === f.id ? '#7C3AED' : '#aaa', cursor: 'pointer', fontSize: '13px' }}>
            {f.label}
          </button>
        ))}
      </div>

      <div style={{ background: '#1a1a2e', border: '1px solid #2a2a4a', borderRadius: '12px', padding: '24px', marginBottom: '16px' }}>
        <div style={{ display: 'flex', gap: '14px', marginBottom: '16px', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '180px' }}>
            <label style={{ fontSize: '13px', color: '#aaa', display: 'block', marginBottom: '6px' }}>Target Role</label>
            <input value={role} onChange={e => setRole(e.target.value)} placeholder="e.g. Software Engineer, Data Analyst" style={{ width: '100%', padding: '10px', background: '#0f0f1a', border: '1px solid #2a2a4a', borderRadius: '8px', color: 'white', fontSize: '14px', boxSizing: 'border-box' }} />
          </div>
          <div style={{ flex: 1, minWidth: '180px' }}>
            <label style={{ fontSize: '13px', color: '#aaa', display: 'block', marginBottom: '6px' }}>Target Company</label>
            <input value={company} onChange={e => setCompany(e.target.value)} placeholder="e.g. TCS, Amazon, Flipkart" style={{ width: '100%', padding: '10px', background: '#0f0f1a', border: '1px solid #2a2a4a', borderRadius: '8px', color: 'white', fontSize: '14px', boxSizing: 'border-box' }} />
          </div>
        </div>
        <button onClick={generate} disabled={loading} style={{ padding: '12px 32px', background: '#7C3AED', border: 'none', borderRadius: '8px', color: 'white', fontSize: '15px', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1 }}>
          {loading ? '⏳ Generating...' : '✨ Generate with AI'}
        </button>
      </div>

      {response && (
        <div style={{ background: '#1a1a2e', border: '1px solid #2a2a4a', borderRadius: '12px', padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ color: '#7C3AED' }}>AI Response</h3>
            <button onClick={() => navigator.clipboard.writeText(response)} style={{ padding: '6px 14px', background: 'transparent', border: '1px solid #2a2a4a', borderRadius: '6px', color: '#aaa', cursor: 'pointer', fontSize: '12px' }}>📋 Copy</button>
          </div>
          <pre style={{ whiteSpace: 'pre-wrap', fontSize: '14px', lineHeight: '1.7', color: '#ddd', fontFamily: 'sans-serif' }}>{response}</pre>
        </div>
      )}
    </div>
  );
}
function CertificationsTab() {
  const [certName, setCertName] = useState('');
  const [platform, setPlatform] = useState('');
  const [certs, setCerts] = useState([
    { name: 'AWS Cloud Practitioner', platform: 'Amazon', date: 'Jan 2026', status: 'Completed' },
    { name: 'Meta Frontend Developer', platform: 'Coursera', date: 'Mar 2026', status: 'Completed' },
    { name: 'Google Data Analytics', platform: 'Google', date: 'In Progress', status: 'In Progress' },
  ]);
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeFeature, setActiveFeature] = useState('suggest');

  const features = [
    { id: 'suggest', label: '💡 Suggest Certifications' },
    { id: 'roadmap', label: '🗺️ Learning Roadmap' },
    { id: 'prepare', label: '📝 Exam Preparation' },
  ];

  const addCert = () => {
    if (!certName) return;
    setCerts(prev => [...prev, { name: certName, platform: platform || 'Other', date: new Date().toLocaleDateString('en-IN', { month: 'short', year: 'numeric' }), status: 'In Progress' }]);
    setCertName('');
    setPlatform('');
  };

  const toggleStatus = (i) => {
    setCerts(prev => prev.map((c, idx) => idx === i ? { ...c, status: c.status === 'Completed' ? 'In Progress' : 'Completed' } : c));
  };

  const deleteCert = (i) => {
    setCerts(prev => prev.filter((_, idx) => idx !== i));
  };

  const generate = async () => {
    setLoading(true);
    setResponse('');
    const prompts = {
      suggest: `Suggest the top 10 certifications for Indian college students in 2026 that boost placement chances. For each: name, platform, cost, duration, difficulty, and which companies value it most.`,
      roadmap: `Create a certification roadmap for an Indian college student to maximize placement chances. Month by month plan: which cert to do when, why, cost, and how it helps in interviews.`,
      prepare: `Give a preparation guide for popular Indian placement certifications like AWS, Google, Microsoft, Meta. For each: exam format, key topics, free resources, tips to pass, and validity period.`,
    };
    try {
      const res = await askClaude(prompts[activeFeature]);
      setResponse(res);
    } catch (e) {
      setResponse('Error connecting to AI.');
    }
    setLoading(false);
  };

  return (
    <div>
      <h2 style={{ fontSize: '24px', marginBottom: '8px' }}>📑 Certification Tracker</h2>
      <p style={{ color: '#aaa', marginBottom: '24px' }}>Track your certifications and get AI recommendations</p>

      {/* Add Certificate */}
      <div style={{ background: '#1a1a2e', border: '1px solid #2a2a4a', borderRadius: '12px', padding: '20px', marginBottom: '20px' }}>
        <h3 style={{ fontSize: '15px', marginBottom: '14px' }}>➕ Add Certification</h3>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <input value={certName} onChange={e => setCertName(e.target.value)} placeholder="Certification name" style={{ flex: 2, minWidth: '180px', padding: '10px', background: '#0f0f1a', border: '1px solid #2a2a4a', borderRadius: '8px', color: 'white', fontSize: '14px', boxSizing: 'border-box' }} />
          <input value={platform} onChange={e => setPlatform(e.target.value)} placeholder="Platform (e.g. Coursera)" style={{ flex: 1, minWidth: '140px', padding: '10px', background: '#0f0f1a', border: '1px solid #2a2a4a', borderRadius: '8px', color: 'white', fontSize: '14px', boxSizing: 'border-box' }} />
          <button onClick={addCert} style={{ padding: '10px 20px', background: '#7C3AED', border: 'none', borderRadius: '8px', color: 'white', cursor: 'pointer', fontSize: '14px' }}>Add</button>
        </div>
      </div>

      {/* Certificates List */}
      <div style={{ background: '#1a1a2e', border: '1px solid #2a2a4a', borderRadius: '12px', padding: '20px', marginBottom: '20px' }}>
        <h3 style={{ fontSize: '15px', marginBottom: '14px' }}>🏆 My Certifications ({certs.length})</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {certs.map((c, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', background: '#0f0f1a', borderRadius: '10px', border: '1px solid #2a2a4a' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '20px' }}>{c.status === 'Completed' ? '✅' : '⏳'}</span>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: '500' }}>{c.name}</div>
                  <div style={{ fontSize: '12px', color: '#666' }}>{c.platform} • {c.date}</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <span onClick={() => toggleStatus(i)} style={{ padding: '4px 12px', borderRadius: '20px', fontSize: '12px', cursor: 'pointer', background: c.status === 'Completed' ? '#22c55e22' : '#f59e0b22', color: c.status === 'Completed' ? '#22c55e' : '#f59e0b', border: `1px solid ${c.status === 'Completed' ? '#22c55e44' : '#f59e0b44'}` }}>
                  {c.status}
                </span>
                <span onClick={() => deleteCert(i)} style={{ color: '#ef4444', cursor: 'pointer', fontSize: '16px' }}>🗑️</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Features */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
        {features.map(f => (
          <button key={f.id} onClick={() => setActiveFeature(f.id)} style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid', borderColor: activeFeature === f.id ? '#7C3AED' : '#2a2a4a', background: activeFeature === f.id ? '#7C3AED22' : 'transparent', color: activeFeature === f.id ? '#7C3AED' : '#aaa', cursor: 'pointer', fontSize: '13px' }}>
            {f.label}
          </button>
        ))}
      </div>
      <div style={{ background: '#1a1a2e', border: '1px solid #2a2a4a', borderRadius: '12px', padding: '20px', marginBottom: '16px' }}>
        <button onClick={generate} disabled={loading} style={{ padding: '12px 32px', background: '#7C3AED', border: 'none', borderRadius: '8px', color: 'white', fontSize: '15px', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1 }}>
          {loading ? '⏳ Generating...' : '✨ Generate with AI'}
        </button>
      </div>
      {response && (
        <div style={{ background: '#1a1a2e', border: '1px solid #2a2a4a', borderRadius: '12px', padding: '24px' }}>
          <h3 style={{ color: '#7C3AED', marginBottom: '16px' }}>AI Response</h3>
          <pre style={{ whiteSpace: 'pre-wrap', fontSize: '14px', lineHeight: '1.7', color: '#ddd', fontFamily: 'sans-serif' }}>{response}</pre>
        </div>
      )}
    </div>
  );
}
function InternshipTab() {
  const [skills, setSkills] = useState('');
  const [domain, setDomain] = useState('');
  const [cgpa, setCgpa] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeFeature, setActiveFeature] = useState('find');
  const [applications, setApplications] = useState([
    { company: 'Google', role: 'SWE Intern', status: 'Applied', date: 'Jun 1' },
    { company: 'Flipkart', role: 'Data Science Intern', status: 'Interview', date: 'Jun 3' },
    { company: 'Swiggy', role: 'Backend Intern', status: 'Rejected', date: 'May 28' },
  ]);
  const [newCompany, setNewCompany] = useState('');
  const [newRole, setNewRole] = useState('');

  const features = [
    { id: 'find', label: '🔍 Find Internships' },
    { id: 'match', label: '✅ Resume Match' },
    { id: 'eligibility', label: '📋 Eligibility Check' },
    { id: 'email', label: '📧 Cold Email' },
  ];

  const statusColors = {
    'Applied': '#3B82F6',
    'Interview': '#f59e0b',
    'Rejected': '#ef4444',
    'Offered': '#22c55e',
  };

  const addApplication = () => {
    if (!newCompany) return;
    setApplications(prev => [...prev, { company: newCompany, role: newRole || 'Intern', status: 'Applied', date: new Date().toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }) }]);
    setNewCompany('');
    setNewRole('');
  };

  const updateStatus = (i, status) => {
    setApplications(prev => prev.map((a, idx) => idx === i ? { ...a, status } : a));
  };

  const generate = async () => {
    setLoading(true);
    setResponse('');
    const prompts = {
      find: `List 15 best internship opportunities for Indian college students in ${domain || 'software engineering'} with skills: ${skills || 'Python, React'}. For each: company, role, stipend, duration, location, how to apply, and eligibility. Include both product companies and startups.`,
      match: `Check resume match for internship applications. Student profile: Skills: ${skills}, Domain: ${domain}, CGPA: ${cgpa}. Which types of companies should they target? What's missing from their profile? How to improve match rate?`,
      eligibility: `Check eligibility for internships at top Indian companies for a student with: Skills: ${skills}, CGPA: ${cgpa}, Domain: ${domain}. List eligible companies, borderline cases, and companies to target after improvements.`,
      email: `Write a cold email template for an Indian college student applying for ${domain || 'software engineering'} internship with skills: ${skills}. Make it professional, concise, and compelling. Include subject line and follow-up email.`,
    };
    try {
      const res = await askClaude(prompts[activeFeature]);
      setResponse(res);
    } catch (e) {
      setResponse('Error connecting to AI.');
    }
    setLoading(false);
  };

  return (
    <div>
      <h2 style={{ fontSize: '24px', marginBottom: '8px' }}>💼 Internship Hub</h2>
      <p style={{ color: '#aaa', marginBottom: '24px' }}>Find internships and track your applications</p>

      {/* Application Tracker */}
      <div style={{ background: '#1a1a2e', border: '1px solid #2a2a4a', borderRadius: '12px', padding: '20px', marginBottom: '20px' }}>
        <h3 style={{ fontSize: '15px', marginBottom: '14px' }}>📋 Application Tracker</h3>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '14px', flexWrap: 'wrap' }}>
          <input value={newCompany} onChange={e => setNewCompany(e.target.value)} placeholder="Company name" style={{ flex: 1, minWidth: '140px', padding: '9px', background: '#0f0f1a', border: '1px solid #2a2a4a', borderRadius: '8px', color: 'white', fontSize: '13px', boxSizing: 'border-box' }} />
          <input value={newRole} onChange={e => setNewRole(e.target.value)} placeholder="Role" style={{ flex: 1, minWidth: '140px', padding: '9px', background: '#0f0f1a', border: '1px solid #2a2a4a', borderRadius: '8px', color: 'white', fontSize: '13px', boxSizing: 'border-box' }} />
          <button onClick={addApplication} style={{ padding: '9px 18px', background: '#7C3AED', border: 'none', borderRadius: '8px', color: 'white', cursor: 'pointer', fontSize: '13px' }}>Add</button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {applications.map((a, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', background: '#0f0f1a', borderRadius: '8px', border: '1px solid #2a2a4a' }}>
              <div>
                <span style={{ fontWeight: '500', fontSize: '14px' }}>{a.company}</span>
                <span style={{ color: '#666', fontSize: '13px' }}> • {a.role} • {a.date}</span>
              </div>
              <select value={a.status} onChange={e => updateStatus(i, e.target.value)} style={{ padding: '4px 10px', borderRadius: '6px', border: 'none', background: `${statusColors[a.status]}22`, color: statusColors[a.status], fontSize: '12px', cursor: 'pointer' }}>
                {['Applied', 'Interview', 'Offered', 'Rejected'].map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
          ))}
        </div>
      </div>

      {/* AI Features */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
        {features.map(f => (
          <button key={f.id} onClick={() => setActiveFeature(f.id)} style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid', borderColor: activeFeature === f.id ? '#7C3AED' : '#2a2a4a', background: activeFeature === f.id ? '#7C3AED22' : 'transparent', color: activeFeature === f.id ? '#7C3AED' : '#aaa', cursor: 'pointer', fontSize: '13px' }}>
            {f.label}
          </button>
        ))}
      </div>

      <div style={{ background: '#1a1a2e', border: '1px solid #2a2a4a', borderRadius: '12px', padding: '24px', marginBottom: '16px' }}>
        <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginBottom: '16px' }}>
          <div style={{ flex: 1, minWidth: '160px' }}>
            <label style={{ fontSize: '13px', color: '#aaa', display: 'block', marginBottom: '6px' }}>Your Skills</label>
            <input value={skills} onChange={e => setSkills(e.target.value)} placeholder="e.g. Python, React, SQL" style={{ width: '100%', padding: '10px', background: '#0f0f1a', border: '1px solid #2a2a4a', borderRadius: '8px', color: 'white', fontSize: '14px', boxSizing: 'border-box' }} />
          </div>
          <div style={{ flex: 1, minWidth: '160px' }}>
            <label style={{ fontSize: '13px', color: '#aaa', display: 'block', marginBottom: '6px' }}>Domain</label>
            <input value={domain} onChange={e => setDomain(e.target.value)} placeholder="e.g. Web Dev, Data Science" style={{ width: '100%', padding: '10px', background: '#0f0f1a', border: '1px solid #2a2a4a', borderRadius: '8px', color: 'white', fontSize: '14px', boxSizing: 'border-box' }} />
          </div>
          <div style={{ minWidth: '100px' }}>
            <label style={{ fontSize: '13px', color: '#aaa', display: 'block', marginBottom: '6px' }}>CGPA</label>
            <input value={cgpa} onChange={e => setCgpa(e.target.value)} placeholder="e.g. 8.5" style={{ width: '100%', padding: '10px', background: '#0f0f1a', border: '1px solid #2a2a4a', borderRadius: '8px', color: 'white', fontSize: '14px', boxSizing: 'border-box' }} />
          </div>
        </div>
        <button onClick={generate} disabled={loading} style={{ padding: '12px 32px', background: '#7C3AED', border: 'none', borderRadius: '8px', color: 'white', fontSize: '15px', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1 }}>
          {loading ? '⏳ Generating...' : '✨ Generate with AI'}
        </button>
      </div>

      {response && (
        <div style={{ background: '#1a1a2e', border: '1px solid #2a2a4a', borderRadius: '12px', padding: '24px' }}>
          <h3 style={{ color: '#7C3AED', marginBottom: '16px' }}>AI Response</h3>
          <pre style={{ whiteSpace: 'pre-wrap', fontSize: '14px', lineHeight: '1.7', color: '#ddd', fontFamily: 'sans-serif' }}>{response}</pre>
        </div>
      )}
    </div>
  );
}
function CommunityTab() {
  const [post, setPost] = useState('');
  const [category, setCategory] = useState('Discussion');
  const [posts, setPosts] = useState([
    { id: 1, author: 'Rahul K.', college: 'JNTUH', category: 'Discussion', content: 'Just got placed at Amazon! AMA about the interview process 🎉', likes: 24, time: '2h ago', avatar: 'R' },
    { id: 2, author: 'Priya S.', college: 'VIT', category: 'Project Showcase', content: 'Built a real-time collaborative code editor using React + WebSockets. Check it out on GitHub!', likes: 18, time: '4h ago', avatar: 'P' },
    { id: 3, author: 'Arjun M.', college: 'BITS', category: 'Doubt', content: 'Can someone explain the difference between BFS and DFS with examples? Struggling with graphs 😅', likes: 7, time: '5h ago', avatar: 'A' },
    { id: 4, author: 'Sneha R.', college: 'NIT Trichy', category: 'Team Formation', content: 'Looking for 2 teammates for Smart India Hackathon 2026. Need React + ML skills. DM me!', likes: 12, time: '6h ago', avatar: 'S' },
    { id: 5, author: 'Kiran T.', college: 'IIIT Hyderabad', category: 'Discussion', content: 'Which is better for placements — DSA practice on LeetCode or building projects? Share your experience!', likes: 31, time: '8h ago', avatar: 'K' },
  ]);
  const [likedPosts, setLikedPosts] = useState([]);

  const categories = ['Discussion', 'Project Showcase', 'Doubt', 'Team Formation', 'Achievement'];

  const categoryColors = {
    'Discussion': '#3B82F6',
    'Project Showcase': '#10B981',
    'Doubt': '#F59E0B',
    'Team Formation': '#8B5CF6',
    'Achievement': '#EF4444',
  };

  const addPost = () => {
    if (!post.trim()) return;
    const newPost = {
      id: posts.length + 1,
      author: 'You',
      college: 'Your College',
      category,
      content: post,
      likes: 0,
      time: 'Just now',
      avatar: 'Y',
    };
    setPosts(prev => [newPost, ...prev]);
    setPost('');
  };

  const toggleLike = (id) => {
    setLikedPosts(prev => prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]);
    setPosts(prev => prev.map(p => p.id === id ? { ...p, likes: likedPosts.includes(id) ? p.likes - 1 : p.likes + 1 } : p));
  };

  return (
    <div>
      <h2 style={{ fontSize: '24px', marginBottom: '8px' }}>🌐 Student Community</h2>
      <p style={{ color: '#aaa', marginBottom: '24px' }}>Connect with students across India</p>

      {/* Stats */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
        {[['👥', '10,000+', 'Students'], ['🏫', '500+', 'Colleges'], ['💬', '50K+', 'Posts'], ['🤝', '2K+', 'Teams Formed']].map(([icon, val, label]) => (
          <div key={label} style={{ background: '#1a1a2e', border: '1px solid #2a2a4a', borderRadius: '10px', padding: '14px 20px', textAlign: 'center', flex: 1, minWidth: '100px' }}>
            <div style={{ fontSize: '20px' }}>{icon}</div>
            <div style={{ fontSize: '18px', fontWeight: '700', color: '#7C3AED' }}>{val}</div>
            <div style={{ fontSize: '12px', color: '#666' }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Create Post */}
      <div style={{ background: '#1a1a2e', border: '1px solid #2a2a4a', borderRadius: '12px', padding: '20px', marginBottom: '20px' }}>
        <h3 style={{ fontSize: '15px', marginBottom: '14px' }}>✍️ Create Post</h3>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '10px', flexWrap: 'wrap' }}>
          {categories.map(c => (
            <span key={c} onClick={() => setCategory(c)} style={{ padding: '5px 12px', borderRadius: '20px', fontSize: '12px', cursor: 'pointer', border: '1px solid', borderColor: category === c ? categoryColors[c] : '#2a2a4a', background: category === c ? `${categoryColors[c]}22` : 'transparent', color: category === c ? categoryColors[c] : '#aaa' }}>
              {c}
            </span>
          ))}
        </div>
        <textarea value={post} onChange={e => setPost(e.target.value)} placeholder="Share something with the community... a doubt, achievement, project, or looking for teammates?" rows={3}
          style={{ width: '100%', padding: '10px', background: '#0f0f1a', border: '1px solid #2a2a4a', borderRadius: '8px', color: 'white', fontSize: '14px', boxSizing: 'border-box', resize: 'none', marginBottom: '10px' }} />
        <button onClick={addPost} style={{ padding: '10px 24px', background: '#7C3AED', border: 'none', borderRadius: '8px', color: 'white', cursor: 'pointer', fontSize: '14px', fontWeight: '500' }}>
          Post →
        </button>
      </div>

      {/* Filter */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
        {['All', ...categories].map(c => (
          <span key={c} style={{ padding: '6px 14px', borderRadius: '20px', fontSize: '12px', cursor: 'pointer', background: '#1a1a2e', border: '1px solid #2a2a4a', color: '#aaa' }}>{c}</span>
        ))}
      </div>

      {/* Posts Feed */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {posts.map(p => (
          <div key={p.id} style={{ background: '#1a1a2e', border: '1px solid #2a2a4a', borderRadius: '12px', padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '38px', height: '38px', background: 'linear-gradient(135deg, #7C3AED, #3B82F6)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', fontWeight: '700' }}>
                  {p.avatar}
                </div>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: '600' }}>{p.author}</div>
                  <div style={{ fontSize: '12px', color: '#666' }}>{p.college} • {p.time}</div>
                </div>
              </div>
              <span style={{ padding: '4px 10px', borderRadius: '20px', fontSize: '11px', background: `${categoryColors[p.category]}22`, color: categoryColors[p.category], border: `1px solid ${categoryColors[p.category]}44` }}>
                {p.category}
              </span>
            </div>
            <p style={{ fontSize: '14px', color: '#ddd', lineHeight: '1.6', marginBottom: '12px' }}>{p.content}</p>
            <div style={{ display: 'flex', gap: '16px' }}>
              <span onClick={() => toggleLike(p.id)} style={{ fontSize: '13px', color: likedPosts.includes(p.id) ? '#ef4444' : '#666', cursor: 'pointer' }}>
                {likedPosts.includes(p.id) ? '❤️' : '🤍'} {p.likes}
              </span>
              <span style={{ fontSize: '13px', color: '#666', cursor: 'pointer' }}>💬 Reply</span>
              <span style={{ fontSize: '13px', color: '#666', cursor: 'pointer' }}>🔗 Share</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
function EventsTab() {
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeFeature, setActiveFeature] = useState('find');
  const [registered, setRegistered] = useState([]);

  const events = [
    { id: 1, name: 'Full Stack Web Dev Bootcamp', host: 'Coding Ninjas', date: 'Jun 15, 2026', time: '7:00 PM', type: 'Workshop', price: 'Free', spots: '500 left' },
    { id: 2, name: 'AI/ML Career Roadmap Session', host: 'Google Developers', date: 'Jun 18, 2026', time: '6:00 PM', type: 'Webinar', price: 'Free', spots: '200 left' },
    { id: 3, name: 'Resume Building Masterclass', host: 'LinkedIn India', date: 'Jun 20, 2026', time: '5:00 PM', type: 'Workshop', price: 'Free', spots: '350 left' },
    { id: 4, name: 'Cracking FAANG Interviews', host: 'InterviewBit', date: 'Jun 22, 2026', time: '8:00 PM', type: 'Webinar', price: 'Free', spots: '1000 left' },
    { id: 5, name: 'Open Source Contribution Guide', host: 'GitHub India', date: 'Jun 25, 2026', time: '6:30 PM', type: 'Live Session', price: 'Free', spots: '750 left' },
    { id: 6, name: 'System Design for Beginners', host: 'Scaler', date: 'Jun 28, 2026', time: '7:00 PM', type: 'Workshop', price: 'Free', spots: '400 left' },
  ];

  const typeColors = {
    'Workshop': '#7C3AED',
    'Webinar': '#3B82F6',
    'Live Session': '#10B981',
  };

  const features = [
    { id: 'find', label: '🔍 Find Events' },
    { id: 'suggest', label: '💡 Suggest Events' },
    { id: 'prepare', label: '📝 Event Prep' },
  ];

  const generate = async () => {
    setLoading(true);
    setResponse('');
    const prompts = {
      find: `List 10 upcoming tech events, webinars, and workshops for Indian college students in June-July 2026. Include: name, host, date, topic, registration link, and why to attend.`,
      suggest: `Suggest the best tech events, conferences, and webinars an Indian college student should attend in 2026 to boost their career. Include online and offline events across India.`,
      prepare: `How should an Indian college student prepare for and get the most out of tech webinars and workshops? Include: before, during, and after tips, networking advice, and how to add it to resume.`,
    };
    try {
      const res = await askClaude(prompts[activeFeature]);
      setResponse(res);
    } catch (e) {
      setResponse('Error connecting to AI.');
    }
    setLoading(false);
  };

  return (
    <div>
      <h2 style={{ fontSize: '24px', marginBottom: '8px' }}>🎤 Webinar & Events</h2>
      <p style={{ color: '#aaa', marginBottom: '24px' }}>Discover and register for tech events</p>

      {/* Upcoming Events */}
      <div style={{ marginBottom: '24px' }}>
        <h3 style={{ fontSize: '16px', marginBottom: '16px' }}>📅 Upcoming Events</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '14px' }}>
          {events.map(e => (
            <div key={e.id} style={{ background: '#1a1a2e', border: '1px solid #2a2a4a', borderRadius: '12px', padding: '18px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span style={{ padding: '3px 10px', borderRadius: '20px', fontSize: '11px', background: `${typeColors[e.type]}22`, color: typeColors[e.type] }}>{e.type}</span>
                <span style={{ fontSize: '12px', color: '#22c55e' }}>{e.price}</span>
              </div>
              <h4 style={{ fontSize: '15px', fontWeight: '600', marginBottom: '6px' }}>{e.name}</h4>
              <p style={{ fontSize: '13px', color: '#666', marginBottom: '10px' }}>by {e.host}</p>
              <div style={{ fontSize: '12px', color: '#aaa', marginBottom: '12px' }}>
                📅 {e.date} • ⏰ {e.time}<br />
                👥 {e.spots}
              </div>
              <button
                onClick={() => setRegistered(prev => prev.includes(e.id) ? prev.filter(id => id !== e.id) : [...prev, e.id])}
                style={{ width: '100%', padding: '8px', background: registered.includes(e.id) ? '#22c55e22' : '#7C3AED', border: registered.includes(e.id) ? '1px solid #22c55e' : 'none', borderRadius: '8px', color: registered.includes(e.id) ? '#22c55e' : 'white', cursor: 'pointer', fontSize: '13px', fontWeight: '500' }}>
                {registered.includes(e.id) ? '✅ Registered' : 'Register Free →'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Registered Events */}
      {registered.length > 0 && (
        <div style={{ background: '#1a1a2e', border: '1px solid #22c55e44', borderRadius: '12px', padding: '20px', marginBottom: '20px' }}>
          <h3 style={{ fontSize: '15px', marginBottom: '12px', color: '#22c55e' }}>✅ My Registered Events ({registered.length})</h3>
          {events.filter(e => registered.includes(e.id)).map(e => (
            <div key={e.id} style={{ fontSize: '14px', color: '#aaa', padding: '6px 0', borderBottom: '1px solid #2a2a4a' }}>
              📌 {e.name} — {e.date}
            </div>
          ))}
        </div>
      )}

      {/* AI Features */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
        {features.map(f => (
          <button key={f.id} onClick={() => setActiveFeature(f.id)} style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid', borderColor: activeFeature === f.id ? '#7C3AED' : '#2a2a4a', background: activeFeature === f.id ? '#7C3AED22' : 'transparent', color: activeFeature === f.id ? '#7C3AED' : '#aaa', cursor: 'pointer', fontSize: '13px' }}>
            {f.label}
          </button>
        ))}
      </div>
      <div style={{ background: '#1a1a2e', border: '1px solid #2a2a4a', borderRadius: '12px', padding: '20px', marginBottom: '16px' }}>
        <button onClick={generate} disabled={loading} style={{ padding: '12px 32px', background: '#7C3AED', border: 'none', borderRadius: '8px', color: 'white', fontSize: '15px', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1 }}>
          {loading ? '⏳ Generating...' : '✨ Generate with AI'}
        </button>
      </div>
      {response && (
        <div style={{ background: '#1a1a2e', border: '1px solid #2a2a4a', borderRadius: '12px', padding: '24px' }}>
          <h3 style={{ color: '#7C3AED', marginBottom: '16px' }}>AI Response</h3>
          <pre style={{ whiteSpace: 'pre-wrap', fontSize: '14px', lineHeight: '1.7', color: '#ddd', fontFamily: 'sans-serif' }}>{response}</pre>
        </div>
      )}
    </div>
  );
}function ProductivityTab() {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Complete DSA assignment', done: false, priority: 'high' },
    { id: 2, text: 'Submit ML project report', done: false, priority: 'high' },
    { id: 3, text: 'Practice 5 LeetCode problems', done: true, priority: 'medium' },
    { id: 4, text: 'Watch React hooks tutorial', done: false, priority: 'low' },
  ]);
  const [newTask, setNewTask] = useState('');
  const [priority, setPriority] = useState('medium');
  const [pomodoroTime, setPomodoroTime] = useState(25 * 60);
  const [pomodoroRunning, setPomodoroRunning] = useState(false);
  const [pomodoroInterval, setPomodoroInterval] = useState(null);
  const [activeFeature, setActiveFeature] = useState('tasks');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [examName, setExamName] = useState('');
  const [examDate, setExamDate] = useState('');
  const [exams, setExams] = useState([
    { name: 'Data Structures Exam', date: '2026-06-20' },
    { name: 'Machine Learning Test', date: '2026-06-25' },
  ]);

  const priorityColors = { high: '#ef4444', medium: '#f59e0b', low: '#22c55e' };

  const addTask = () => {
    if (!newTask.trim()) return;
    setTasks(prev => [...prev, { id: Date.now(), text: newTask, done: false, priority }]);
    setNewTask('');
  };

  const toggleTask = (id) => setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));
  const deleteTask = (id) => setTasks(prev => prev.filter(t => t.id !== id));

  const startPomodoro = () => {
    if (pomodoroRunning) {
      clearInterval(pomodoroInterval);
      setPomodoroRunning(false);
    } else {
      const interval = setInterval(() => {
        setPomodoroTime(prev => {
          if (prev <= 1) { clearInterval(interval); setPomodoroRunning(false); return 25 * 60; }
          return prev - 1;
        });
      }, 1000);
      setPomodoroInterval(interval);
      setPomodoroRunning(true);
    }
  };

  const resetPomodoro = () => {
    clearInterval(pomodoroInterval);
    setPomodoroRunning(false);
    setPomodoroTime(25 * 60);
  };

  const getDaysLeft = (date) => {
    const diff = new Date(date) - new Date();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  const addExam = () => {
    if (!examName || !examDate) return;
    setExams(prev => [...prev, { name: examName, date: examDate }]);
    setExamName('');
    setExamDate('');
  };

  const generate = async () => {
    setLoading(true);
    setResponse('');
    const prompts = {
      planner: `Create a weekly study planner for an Indian engineering student balancing college, placements, and projects. Include: daily schedule, study hours, breaks, and productivity tips.`,
      tips: `Give the top 20 productivity tips specifically for Indian college students preparing for placements. Include time management, focus techniques, and avoiding distractions.`,
    };
    try {
      const res = await askClaude(prompts[activeFeature === 'planner' ? 'planner' : 'tips']);
      setResponse(res);
    } catch (e) {
      setResponse('Error connecting to AI.');
    }
    setLoading(false);
  };

  const minutes = Math.floor(pomodoroTime / 60).toString().padStart(2, '0');
  const seconds = (pomodoroTime % 60).toString().padStart(2, '0');

  return (
    <div>
      <h2 style={{ fontSize: '24px', marginBottom: '8px' }}>⏰ Productivity System</h2>
      <p style={{ color: '#aaa', marginBottom: '24px' }}>Stay focused and organized</p>

      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>

        {/* Left Column */}
        <div style={{ flex: 2, minWidth: '300px' }}>

          {/* Task Manager */}
          <div style={{ background: '#1a1a2e', border: '1px solid #2a2a4a', borderRadius: '12px', padding: '20px', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '15px', marginBottom: '14px' }}>✅ Task Manager</h3>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
              <input value={newTask} onChange={e => setNewTask(e.target.value)} onKeyPress={e => e.key === 'Enter' && addTask()} placeholder="Add a task..." style={{ flex: 1, padding: '9px', background: '#0f0f1a', border: '1px solid #2a2a4a', borderRadius: '8px', color: 'white', fontSize: '13px', boxSizing: 'border-box' }} />
              <select value={priority} onChange={e => setPriority(e.target.value)} style={{ padding: '9px', background: '#0f0f1a', border: '1px solid #2a2a4a', borderRadius: '8px', color: 'white', fontSize: '13px' }}>
                <option value="high">🔴 High</option>
                <option value="medium">🟡 Medium</option>
                <option value="low">🟢 Low</option>
              </select>
              <button onClick={addTask} style={{ padding: '9px 16px', background: '#7C3AED', border: 'none', borderRadius: '8px', color: 'white', cursor: 'pointer', fontSize: '13px' }}>Add</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {tasks.map(t => (
                <div key={t.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px', background: '#0f0f1a', borderRadius: '8px', border: `1px solid ${t.done ? '#2a2a4a' : priorityColors[t.priority]}22` }}>
                  <input type="checkbox" checked={t.done} onChange={() => toggleTask(t.id)} style={{ cursor: 'pointer', width: '16px', height: '16px' }} />
                  <span style={{ flex: 1, fontSize: '13px', color: t.done ? '#444' : '#ddd', textDecoration: t.done ? 'line-through' : 'none' }}>{t.text}</span>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: priorityColors[t.priority] }} />
                  <span onClick={() => deleteTask(t.id)} style={{ color: '#ef4444', cursor: 'pointer', fontSize: '14px' }}>×</span>
                </div>
              ))}
            </div>
            <div style={{ fontSize: '12px', color: '#666', marginTop: '10px' }}>
              {tasks.filter(t => t.done).length}/{tasks.length} completed
            </div>
          </div>

          {/* Exam Countdown */}
          <div style={{ background: '#1a1a2e', border: '1px solid #2a2a4a', borderRadius: '12px', padding: '20px' }}>
            <h3 style={{ fontSize: '15px', marginBottom: '14px' }}>📅 Exam Countdown</h3>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '14px', flexWrap: 'wrap' }}>
              <input value={examName} onChange={e => setExamName(e.target.value)} placeholder="Exam name" style={{ flex: 2, minWidth: '140px', padding: '9px', background: '#0f0f1a', border: '1px solid #2a2a4a', borderRadius: '8px', color: 'white', fontSize: '13px', boxSizing: 'border-box' }} />
              <input type="date" value={examDate} onChange={e => setExamDate(e.target.value)} style={{ flex: 1, minWidth: '130px', padding: '9px', background: '#0f0f1a', border: '1px solid #2a2a4a', borderRadius: '8px', color: 'white', fontSize: '13px' }} />
              <button onClick={addExam} style={{ padding: '9px 16px', background: '#7C3AED', border: 'none', borderRadius: '8px', color: 'white', cursor: 'pointer', fontSize: '13px' }}>Add</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {exams.map((e, i) => {
                const days = getDaysLeft(e.date);
                return (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', background: '#0f0f1a', borderRadius: '8px', border: `1px solid ${days <= 3 ? '#ef444444' : '#2a2a4a'}` }}>
                    <span style={{ fontSize: '13px' }}>{e.name}</span>
                    <span style={{ fontSize: '13px', fontWeight: '600', color: days <= 3 ? '#ef4444' : days <= 7 ? '#f59e0b' : '#22c55e' }}>
                      {days > 0 ? `${days} days left` : 'Today!'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div style={{ flex: 1, minWidth: '220px' }}>

          {/* Pomodoro Timer */}
          <div style={{ background: '#1a1a2e', border: '1px solid #2a2a4a', borderRadius: '12px', padding: '20px', marginBottom: '16px', textAlign: 'center' }}>
            <h3 style={{ fontSize: '15px', marginBottom: '16px' }}>🍅 Pomodoro Timer</h3>
            <div style={{ fontSize: '56px', fontWeight: '800', color: pomodoroRunning ? '#7C3AED' : '#ddd', marginBottom: '16px', fontFamily: 'monospace' }}>
              {minutes}:{seconds}
            </div>
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
              <button onClick={startPomodoro} style={{ padding: '10px 20px', background: pomodoroRunning ? '#ef444422' : '#7C3AED', border: pomodoroRunning ? '1px solid #ef4444' : 'none', borderRadius: '8px', color: pomodoroRunning ? '#ef4444' : 'white', cursor: 'pointer', fontSize: '14px' }}>
                {pomodoroRunning ? '⏸ Pause' : '▶ Start'}
              </button>
              <button onClick={resetPomodoro} style={{ padding: '10px 16px', background: 'transparent', border: '1px solid #2a2a4a', borderRadius: '8px', color: '#aaa', cursor: 'pointer', fontSize: '14px' }}>
                🔄
              </button>
            </div>
            <p style={{ fontSize: '12px', color: '#666', marginTop: '12px' }}>25 min focus • 5 min break</p>
          </div>

          {/* AI Planner */}
          <div style={{ background: '#1a1a2e', border: '1px solid #2a2a4a', borderRadius: '12px', padding: '20px' }}>
            <h3 style={{ fontSize: '15px', marginBottom: '14px' }}>🤖 AI Planner</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '12px' }}>
              {[['planner', '📅 Weekly Planner'], ['tips', '💡 Productivity Tips']].map(([id, label]) => (
                <button key={id} onClick={() => setActiveFeature(id)} style={{ padding: '9px', borderRadius: '8px', border: '1px solid', borderColor: activeFeature === id ? '#7C3AED' : '#2a2a4a', background: activeFeature === id ? '#7C3AED22' : 'transparent', color: activeFeature === id ? '#7C3AED' : '#aaa', cursor: 'pointer', fontSize: '13px' }}>
                  {label}
                </button>
              ))}
            </div>
            <button onClick={generate} disabled={loading} style={{ width: '100%', padding: '10px', background: '#7C3AED', border: 'none', borderRadius: '8px', color: 'white', fontSize: '14px', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1 }}>
              {loading ? '⏳...' : '✨ Generate'}
            </button>
          </div>
        </div>
      </div>

      {response && (
        <div style={{ background: '#1a1a2e', border: '1px solid #2a2a4a', borderRadius: '12px', padding: '24px', marginTop: '16px' }}>
          <h3 style={{ color: '#7C3AED', marginBottom: '16px' }}>AI Response</h3>
          <pre style={{ whiteSpace: 'pre-wrap', fontSize: '14px', lineHeight: '1.7', color: '#ddd', fontFamily: 'sans-serif' }}>{response}</pre>
        </div>
      )}
    </div>
  );
}
function SkillTrackerTab() {
  const [skills, setSkills] = useState([
    { name: 'Python', level: 75, category: 'Language' },
    { name: 'React', level: 60, category: 'Frontend' },
    { name: 'SQL', level: 50, category: 'Database' },
    { name: 'Machine Learning', level: 40, category: 'AI/ML' },
    { name: 'DSA', level: 55, category: 'CS Fundamentals' },
    { name: 'System Design', level: 25, category: 'CS Fundamentals' },
  ]);
  const [newSkill, setNewSkill] = useState('');
  const [newLevel, setNewLevel] = useState(50);
  const [newCategory, setNewCategory] = useState('Language');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeFeature, setActiveFeature] = useState('analyze');

  const stats = [
    { icon: '💻', label: 'Projects Built', value: '8' },
    { icon: '🏆', label: 'Hackathons', value: '3' },
    { icon: '📑', label: 'Certifications', value: '4' },
    { icon: '⏱️', label: 'Learning Hours', value: '120' },
    { icon: '🔥', label: 'Day Streak', value: '12' },
    { icon: '⭐', label: 'Skill Score', value: '72' },
  ];

  const categories = ['Language', 'Frontend', 'Backend', 'Database', 'AI/ML', 'CS Fundamentals', 'DevOps', 'Mobile'];

  const levelColors = (level) => {
    if (level >= 75) return '#22c55e';
    if (level >= 50) return '#f59e0b';
    return '#ef4444';
  };

  const addSkill = () => {
    if (!newSkill.trim()) return;
    setSkills(prev => [...prev, { name: newSkill, level: parseInt(newLevel), category: newCategory }]);
    setNewSkill('');
    setNewLevel(50);
  };

  const updateLevel = (index, level) => {
    setSkills(prev => prev.map((s, i) => i === index ? { ...s, level: parseInt(level) } : s));
  };

  const deleteSkill = (index) => {
    setSkills(prev => prev.filter((_, i) => i !== index));
  };

  const generate = async () => {
    setLoading(true);
    setResponse('');
    const skillList = skills.map(s => `${s.name}: ${s.level}%`).join(', ');
    const prompts = {
      analyze: `Analyze these skill levels for an Indian college student: ${skillList}. Give: overall assessment, strongest skills, weakest skills, what to improve first, and how these skills compare to placement requirements at top Indian companies.`,
      improve: `Create a 30-day skill improvement plan for an Indian college student with these skills: ${skillList}. Daily tasks, resources, mini projects, and milestones for each skill.`,
      compare: `Compare these skills: ${skillList} against what top Indian companies (TCS, Infosys, Flipkart, Amazon, Google) expect. Show gap analysis and what to focus on for each company tier.`,
    };
    try {
      const res = await askClaude(prompts[activeFeature]);
      setResponse(res);
    } catch (e) {
      setResponse('Error connecting to AI.');
    }
    setLoading(false);
  };

  return (
    <div>
      <h2 style={{ fontSize: '24px', marginBottom: '8px' }}>📈 Skill Tracker</h2>
      <p style={{ color: '#aaa', marginBottom: '24px' }}>Track your growth and identify skill gaps</p>

      {/* Stats */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
        {stats.map((s, i) => (
          <div key={i} style={{ background: '#1a1a2e', border: '1px solid #2a2a4a', borderRadius: '10px', padding: '14px 18px', textAlign: 'center', flex: 1, minWidth: '90px' }}>
            <div style={{ fontSize: '20px' }}>{s.icon}</div>
            <div style={{ fontSize: '20px', fontWeight: '700', color: '#7C3AED' }}>{s.value}</div>
            <div style={{ fontSize: '11px', color: '#666' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Add Skill */}
      <div style={{ background: '#1a1a2e', border: '1px solid #2a2a4a', borderRadius: '12px', padding: '20px', marginBottom: '20px' }}>
        <h3 style={{ fontSize: '15px', marginBottom: '14px' }}>➕ Add Skill</h3>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <input value={newSkill} onChange={e => setNewSkill(e.target.value)} placeholder="Skill name" style={{ flex: 2, minWidth: '140px', padding: '9px', background: '#0f0f1a', border: '1px solid #2a2a4a', borderRadius: '8px', color: 'white', fontSize: '13px', boxSizing: 'border-box' }} />
          <select value={newCategory} onChange={e => setNewCategory(e.target.value)} style={{ flex: 1, minWidth: '130px', padding: '9px', background: '#0f0f1a', border: '1px solid #2a2a4a', borderRadius: '8px', color: 'white', fontSize: '13px' }}>
            {categories.map(c => <option key={c}>{c}</option>)}
          </select>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1, minWidth: '150px' }}>
            <input type="range" min="0" max="100" value={newLevel} onChange={e => setNewLevel(e.target.value)} style={{ flex: 1, accentColor: '#7C3AED' }} />
            <span style={{ fontSize: '13px', color: '#aaa', minWidth: '35px' }}>{newLevel}%</span>
          </div>
          <button onClick={addSkill} style={{ padding: '9px 18px', background: '#7C3AED', border: 'none', borderRadius: '8px', color: 'white', cursor: 'pointer', fontSize: '13px' }}>Add</button>
        </div>
      </div>

      {/* Skills List */}
      <div style={{ background: '#1a1a2e', border: '1px solid #2a2a4a', borderRadius: '12px', padding: '20px', marginBottom: '20px' }}>
        <h3 style={{ fontSize: '15px', marginBottom: '16px' }}>🎯 My Skills</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {skills.map((s, i) => (
            <div key={i}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <div>
                  <span style={{ fontSize: '14px', fontWeight: '500' }}>{s.name}</span>
                  <span style={{ fontSize: '11px', color: '#666', marginLeft: '8px', padding: '2px 8px', background: '#2a2a4a', borderRadius: '10px' }}>{s.category}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <input type="range" min="0" max="100" value={s.level} onChange={e => updateLevel(i, e.target.value)} style={{ width: '80px', accentColor: levelColors(s.level) }} />
                  <span style={{ fontSize: '13px', fontWeight: '600', color: levelColors(s.level), minWidth: '35px' }}>{s.level}%</span>
                  <span onClick={() => deleteSkill(i)} style={{ color: '#ef4444', cursor: 'pointer', fontSize: '16px' }}>×</span>
                </div>
              </div>
              <div style={{ height: '6px', background: '#0f0f1a', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${s.level}%`, background: levelColors(s.level), borderRadius: '4px', transition: 'width 0.3s' }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Analysis */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
        {[['analyze', '🔍 Analyze Skills'], ['improve', '📈 Improvement Plan'], ['compare', '🏢 Company Comparison']].map(([id, label]) => (
          <button key={id} onClick={() => setActiveFeature(id)} style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid', borderColor: activeFeature === id ? '#7C3AED' : '#2a2a4a', background: activeFeature === id ? '#7C3AED22' : 'transparent', color: activeFeature === id ? '#7C3AED' : '#aaa', cursor: 'pointer', fontSize: '13px' }}>
            {label}
          </button>
        ))}
      </div>
      <div style={{ background: '#1a1a2e', border: '1px solid #2a2a4a', borderRadius: '12px', padding: '20px', marginBottom: '16px' }}>
        <button onClick={generate} disabled={loading} style={{ padding: '12px 32px', background: '#7C3AED', border: 'none', borderRadius: '8px', color: 'white', fontSize: '15px', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1 }}>
          {loading ? '⏳ Generating...' : '✨ Analyze with AI'}
        </button>
      </div>
      {response && (
        <div style={{ background: '#1a1a2e', border: '1px solid #2a2a4a', borderRadius: '12px', padding: '24px' }}>
          <h3 style={{ color: '#7C3AED', marginBottom: '16px' }}>AI Response</h3>
          <pre style={{ whiteSpace: 'pre-wrap', fontSize: '14px', lineHeight: '1.7', color: '#ddd', fontFamily: 'sans-serif' }}>{response}</pre>
        </div>
      )}
    </div>
  );
}
function CareerVerseTab() {
  return (
    <div style={{ margin: '-32px', minHeight: '100vh', overflow: 'auto' }}>
      <CareerVerseAI />
    </div>
  );
}
export default Dashboard;