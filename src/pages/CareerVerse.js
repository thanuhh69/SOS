import { useState, useEffect, useRef } from "react";
// ── DATA ──────────────────────────────────────────────────────────────────────
const DOMAINS = [
  {
    id: "ai-ml", name: "AI & Machine Learning", icon: "🤖", color: "#1E3A5F", accent: "#3BA99C",
    demand: 98, difficulty: 4, salaryFresher: 8, salary3yr: 18, salary5yr: 30, salary10yr: 55,
    learningTime: "18–24 months", opportunities: "Data Scientist, ML Engineer, AI Researcher",
    skills: ["Python", "Mathematics", "Statistics", "Machine Learning", "Deep Learning", "NLP", "Generative AI", "MLOps"],
    tools: ["TensorFlow", "PyTorch", "Scikit-learn", "Keras", "Hugging Face"],
    certs: ["Google ML Cert", "AWS ML Specialty", "DeepLearning.AI"],
    roles: ["ML Engineer", "Data Scientist", "AI Researcher", "MLOps Engineer"],
    scope: "Fastest growing field; every industry is adopting AI",
    what: "Artificial Intelligence and Machine Learning involve creating systems that can learn from data, make decisions, and perform tasks that typically require human intelligence.",
    who: "Students who love mathematics, statistics, and enjoy solving complex problems through data."
  },
  {
    id: "data-science", name: "Data Science", icon: "📊", color: "#2D6A4F", accent: "#52B788",
    demand: 95, difficulty: 4, salaryFresher: 7, salary3yr: 16, salary5yr: 28, salary10yr: 50,
    learningTime: "12–18 months", opportunities: "Data Scientist, Analyst, ML Engineer",
    skills: ["Python/R", "Statistics", "Machine Learning", "SQL", "Data Visualization", "Big Data", "Feature Engineering"],
    tools: ["Pandas", "NumPy", "Matplotlib", "Tableau", "Spark"],
    certs: ["IBM Data Science", "Google Data Analytics", "Coursera DS Specialization"],
    roles: ["Data Scientist", "Statistician", "Business Analyst", "Research Scientist"],
    scope: "Data is the new oil — every decision is data-driven now",
    what: "Data Science combines statistics, programming, and domain knowledge to extract insights and build predictive models from large datasets.",
    who: "Students who love mathematics and statistics, and want to drive business decisions through data."
  },
  {
    id: "cybersecurity", name: "Cybersecurity", icon: "🔐", color: "#7B2D8B", accent: "#C77DFF",
    demand: 97, difficulty: 4, salaryFresher: 9, salary3yr: 20, salary5yr: 35, salary10yr: 60,
    learningTime: "18–24 months", opportunities: "Security Analyst, Ethical Hacker, CISO",
    skills: ["Networking", "Linux", "Cryptography", "Ethical Hacking", "Incident Response", "Cloud Security"],
    tools: ["Kali Linux", "Wireshark", "Metasploit", "Burp Suite", "Nessus"],
    certs: ["CEH", "CISSP", "CompTIA Security+", "OSCP"],
    roles: ["Security Analyst", "Penetration Tester", "SOC Analyst", "CISO"],
    scope: "Cyber threats are rising; massive talent shortage globally",
    what: "Cybersecurity focuses on protecting computer systems, networks, and data from digital attacks, theft, and damage.",
    who: "Students who love problem-solving, ethical hacking challenges, and protecting digital systems."
  },
  {
    id: "cloud", name: "Cloud Computing", icon: "☁️", color: "#0077B6", accent: "#00B4D8",
    demand: 96, difficulty: 3, salaryFresher: 8, salary3yr: 18, salary5yr: 32, salary10yr: 55,
    learningTime: "12–15 months", opportunities: "Cloud Architect, DevOps, Solutions Architect",
    skills: ["AWS/Azure/GCP", "Networking", "Docker", "Kubernetes", "Terraform", "Linux"],
    tools: ["AWS", "Azure", "GCP", "Docker", "Terraform", "Ansible"],
    certs: ["AWS Solutions Architect", "Azure Administrator", "GCP Associate"],
    roles: ["Cloud Architect", "Cloud Engineer", "Solutions Architect", "SRE"],
    scope: "All businesses moving to cloud; $1T+ market by 2030",
    what: "Cloud Computing involves delivering computing services — servers, storage, databases, networking — over the internet.",
    who: "Students interested in infrastructure, networking, and scalable system design."
  },
  {
    id: "devops", name: "DevOps", icon: "⚙️", color: "#E07000", accent: "#FF9F1C",
    demand: 94, difficulty: 3, salaryFresher: 8, salary3yr: 18, salary5yr: 30, salary10yr: 52,
    learningTime: "12–15 months", opportunities: "DevOps Engineer, SRE, Platform Engineer",
    skills: ["Linux", "CI/CD", "Docker", "Kubernetes", "Cloud", "Scripting", "Monitoring"],
    tools: ["Jenkins", "GitHub Actions", "Docker", "Kubernetes", "Prometheus", "Grafana"],
    certs: ["CKA", "AWS DevOps", "Docker Certified"],
    roles: ["DevOps Engineer", "SRE", "Platform Engineer", "Release Manager"],
    scope: "Every software team needs DevOps; critical for faster delivery",
    what: "DevOps bridges development and operations to enable continuous delivery of software through automation.",
    who: "Students who enjoy automation, infrastructure, and making software delivery faster and reliable."
  },
  {
    id: "fullstack", name: "Full Stack Dev", icon: "💻", color: "#1B4332", accent: "#40916C",
    demand: 92, difficulty: 3, salaryFresher: 6, salary3yr: 15, salary5yr: 28, salary10yr: 50,
    learningTime: "15–18 months", opportunities: "Full Stack Dev, Tech Lead, Startup CTO",
    skills: ["HTML/CSS", "JavaScript", "React/Vue", "Node.js", "Databases", "REST APIs", "Git"],
    tools: ["React", "Node.js", "MongoDB", "PostgreSQL", "Docker", "AWS"],
    certs: ["Meta Front-End Developer", "Full Stack Web Dev - Coursera"],
    roles: ["Full Stack Developer", "Frontend Developer", "Backend Developer", "Tech Lead"],
    scope: "Highest number of job openings globally; startup-friendly",
    what: "Full Stack Development covers both frontend (UI) and backend (server, database) development.",
    who: "Students who want to build complete web applications and have broad versatility."
  },
  {
    id: "data-analytics", name: "Data Analytics", icon: "📈", color: "#5C4033", accent: "#A1887F",
    demand: 90, difficulty: 2, salaryFresher: 5, salary3yr: 12, salary5yr: 22, salary10yr: 40,
    learningTime: "8–12 months", opportunities: "Data Analyst, Business Analyst, BI Developer",
    skills: ["SQL", "Excel", "Tableau/Power BI", "Python", "Statistics", "Data Storytelling"],
    tools: ["Power BI", "Tableau", "SQL", "Excel", "Python", "Looker"],
    certs: ["Google Data Analytics", "Microsoft Power BI", "Tableau Desktop"],
    roles: ["Data Analyst", "Business Intelligence Analyst", "Product Analyst"],
    scope: "Every company needs analysts; excellent entry-level demand",
    what: "Data Analytics involves collecting, processing, and performing statistical analysis on large datasets to help companies make better decisions.",
    who: "Students who love numbers, business, and want to use data to drive strategy."
  },
  {
    id: "mobile", name: "Mobile Dev", icon: "📱", color: "#B71C1C", accent: "#EF5350",
    demand: 89, difficulty: 3, salaryFresher: 6, salary3yr: 15, salary5yr: 27, salary10yr: 48,
    learningTime: "12–15 months", opportunities: "iOS/Android Dev, React Native, Flutter Dev",
    skills: ["Swift/Kotlin", "React Native", "Flutter", "REST APIs", "UI/UX", "Git"],
    tools: ["Xcode", "Android Studio", "Flutter", "React Native", "Firebase"],
    certs: ["Google Associate Android Dev", "Apple Developer Program"],
    roles: ["iOS Developer", "Android Developer", "React Native Developer", "Flutter Dev"],
    scope: "5B+ smartphone users; app economy growing rapidly",
    what: "Mobile Development involves creating applications for iOS and Android platforms.",
    who: "Students who use mobile apps daily and want to build experiences for billions of users."
  },
  {
    id: "blockchain", name: "Blockchain", icon: "⛓️", color: "#4A148C", accent: "#9C27B0",
    demand: 85, difficulty: 5, salaryFresher: 9, salary3yr: 22, salary5yr: 40, salary10yr: 70,
    learningTime: "18–24 months", opportunities: "Blockchain Dev, Smart Contract Auditor, DeFi",
    skills: ["Solidity", "Ethereum", "Web3.js", "Cryptography", "Smart Contracts", "DeFi"],
    tools: ["Hardhat", "Truffle", "MetaMask", "Remix", "Web3.js"],
    certs: ["Certified Blockchain Developer", "ConsenSys Academy"],
    roles: ["Blockchain Developer", "Smart Contract Auditor", "DeFi Engineer"],
    scope: "Web3 and DeFi growing; financial sector transformation",
    what: "Blockchain technology enables decentralized, immutable records of transactions across multiple systems.",
    who: "Students excited about decentralization, cryptography, and the future of finance."
  },
  {
    id: "uiux", name: "UI/UX Design", icon: "🎨", color: "#880E4F", accent: "#E91E63",
    demand: 88, difficulty: 2, salaryFresher: 5, salary3yr: 14, salary5yr: 25, salary10yr: 45,
    learningTime: "8–12 months", opportunities: "UX Designer, Product Designer, Design Lead",
    skills: ["Figma", "User Research", "Prototyping", "Design Systems", "HTML/CSS", "Psychology"],
    tools: ["Figma", "Adobe XD", "Sketch", "InVision", "Zeplin"],
    certs: ["Google UX Design Certificate", "Interaction Design Foundation"],
    roles: ["UX Designer", "UI Designer", "Product Designer", "Design Lead"],
    scope: "Design-driven companies outperform by 200%; massive demand",
    what: "UI/UX Design focuses on creating intuitive, visually appealing digital experiences that users love.",
    who: "Students who are creative, empathetic, and passionate about making technology accessible."
  },
  {
    id: "iot", name: "IoT", icon: "🌐", color: "#006064", accent: "#00BCD4",
    demand: 86, difficulty: 4, salaryFresher: 7, salary3yr: 16, salary5yr: 28, salary10yr: 48,
    learningTime: "18–24 months", opportunities: "IoT Engineer, Embedded Dev, Systems Architect",
    skills: ["C/C++", "Python", "MQTT", "Arduino", "Raspberry Pi", "Cloud IoT", "Sensors"],
    tools: ["Arduino", "Raspberry Pi", "MQTT", "AWS IoT", "Node-RED"],
    certs: ["AWS IoT", "Cisco IoT Fundamentals"],
    roles: ["IoT Engineer", "Firmware Developer", "Solutions Architect"],
    scope: "50B+ connected devices by 2030; smart cities, healthcare boom",
    what: "Internet of Things connects physical devices to the internet, enabling data collection and automation.",
    who: "Students interested in both hardware and software, and building smart connected systems."
  },
  {
    id: "robotics", name: "Robotics", icon: "🦾", color: "#33691E", accent: "#7CB342",
    demand: 87, difficulty: 5, salaryFresher: 8, salary3yr: 18, salary5yr: 32, salary10yr: 58,
    learningTime: "24–36 months", opportunities: "Robotics Engineer, Automation Specialist, R&D",
    skills: ["ROS", "C++", "Computer Vision", "Kinematics", "Control Systems", "ML"],
    tools: ["ROS/ROS2", "Gazebo", "MATLAB", "OpenCV", "Python"],
    certs: ["ROS Developer Certification", "FANUC Robotics"],
    roles: ["Robotics Engineer", "Automation Engineer", "R&D Scientist"],
    scope: "Automation and Industry 4.0; massive manufacturing transformation",
    what: "Robotics combines mechanical engineering, electronics, and AI to build autonomous machines.",
    who: "Students passionate about building physical machines that perceive and interact with the world."
  },
  {
    id: "embedded", name: "Embedded Systems", icon: "🔧", color: "#37474F", accent: "#78909C",
    demand: 82, difficulty: 4, salaryFresher: 7, salary3yr: 15, salary5yr: 26, salary10yr: 44,
    learningTime: "18–24 months", opportunities: "Firmware Engineer, VLSI, Automotive Systems",
    skills: ["C/C++", "Microcontrollers", "RTOS", "UART/SPI/I2C", "Assembly", "PCB Design"],
    tools: ["Keil", "STM32", "Arduino", "FreeRTOS", "PlatformIO"],
    certs: ["ARM Cortex Certification", "TI Embedded Systems"],
    roles: ["Firmware Engineer", "Embedded Developer", "VLSI Designer"],
    scope: "Automotive, medical, aerospace — high-value niche market",
    what: "Embedded Systems are dedicated computer systems built into larger devices to control specific functions.",
    who: "Students who love working close to hardware and building systems for real-world devices."
  },
  {
    id: "software-eng", name: "Software Engineering", icon: "🛠️", color: "#1A237E", accent: "#3F51B5",
    demand: 93, difficulty: 3, salaryFresher: 7, salary3yr: 16, salary5yr: 30, salary10yr: 55,
    learningTime: "12–18 months", opportunities: "SWE, Tech Lead, Architect, CTO",
    skills: ["DSA", "System Design", "OOP", "Design Patterns", "Testing", "Agile"],
    tools: ["Git", "JIRA", "VS Code", "Docker", "CI/CD"],
    certs: ["AWS Developer", "Oracle Java", "Microsoft Azure Developer"],
    roles: ["Software Engineer", "Backend Engineer", "Systems Architect", "Tech Lead"],
    scope: "Evergreen demand; foundation of all tech companies",
    what: "Software Engineering involves the systematic design, development, testing, and maintenance of software.",
    who: "Students who enjoy logical thinking, building reliable systems, and solving algorithmic problems."
  },
  {
    id: "quantum", name: "Quantum Computing", icon: "⚛️", color: "#1B0000", accent: "#FF6B35",
    demand: 75, difficulty: 5, salaryFresher: 12, salary3yr: 28, salary5yr: 50, salary10yr: 90,
    learningTime: "36+ months", opportunities: "Quantum Researcher, QML Engineer, Cryptographer",
    skills: ["Quantum Mechanics", "Linear Algebra", "Python", "Qiskit", "Quantum Algorithms"],
    tools: ["Qiskit", "Cirq", "Q#", "Pennylane"],
    certs: ["IBM Quantum Developer", "Quantum Computing MicroMasters"],
    roles: ["Quantum Researcher", "Quantum Software Engineer", "Cryptographer"],
    scope: "Next frontier; massive R&D investment; will disrupt all industries",
    what: "Quantum Computing uses quantum-mechanical phenomena to perform computations exponentially faster than classical computers.",
    who: "Students with strong mathematics and physics background who want to work on cutting-edge research."
  }
];

const SKILL_TREES = {
  "ai-ml": [
    { id: 1, name: "Python Programming", level: 0, desc: "Core programming language for AI" },
    { id: 2, name: "Mathematics", level: 1, desc: "Linear algebra, calculus fundamentals" },
    { id: 3, name: "Statistics", level: 2, desc: "Probability distributions, inference" },
    { id: 4, name: "Data Preprocessing", level: 3, desc: "Cleaning and transforming data" },
    { id: 5, name: "Machine Learning", level: 4, desc: "Supervised & unsupervised learning" },
    { id: 6, name: "Deep Learning", level: 5, desc: "Neural networks, CNNs, RNNs" },
    { id: 7, name: "NLP", level: 6, desc: "Natural language processing techniques" },
    { id: 8, name: "Generative AI", level: 7, desc: "LLMs, diffusion models, GANs" },
    { id: 9, name: "MLOps", level: 8, desc: "Deploy & monitor ML in production" }
  ],
  "cybersecurity": [
    { id: 1, name: "Networking Basics", level: 0, desc: "TCP/IP, DNS, HTTP protocols" },
    { id: 2, name: "Linux Administration", level: 1, desc: "Command line, file systems" },
    { id: 3, name: "Scripting (Python/Bash)", level: 2, desc: "Automate security tasks" },
    { id: 4, name: "Cryptography", level: 3, desc: "Encryption, hashing, PKI" },
    { id: 5, name: "Ethical Hacking", level: 4, desc: "Penetration testing methodology" },
    { id: 6, name: "Web Security", level: 5, desc: "OWASP Top 10, XSS, SQLi" },
    { id: 7, name: "Incident Response", level: 6, desc: "Detect, contain, recover" },
    { id: 8, name: "Cloud Security", level: 7, desc: "AWS/Azure security best practices" },
    { id: 9, name: "CISSP / CISO", level: 8, desc: "Enterprise security leadership" }
  ],
  "fullstack": [
    { id: 1, name: "HTML & CSS", level: 0, desc: "Web structure and styling" },
    { id: 2, name: "JavaScript", level: 1, desc: "Core web programming language" },
    { id: 3, name: "React / Vue", level: 2, desc: "Modern frontend frameworks" },
    { id: 4, name: "Node.js", level: 3, desc: "Server-side JavaScript runtime" },
    { id: 5, name: "Databases (SQL/NoSQL)", level: 4, desc: "Data storage and querying" },
    { id: 6, name: "REST APIs", level: 5, desc: "Building and consuming APIs" },
    { id: 7, name: "Authentication & Auth", level: 6, desc: "JWT, OAuth, security" },
    { id: 8, name: "DevOps Basics", level: 7, desc: "CI/CD, Docker, deployment" },
    { id: 9, name: "System Design", level: 8, desc: "Scalable architecture patterns" }
  ]
};

const QUIZ_QUESTIONS = [
  { q: "How much do you enjoy mathematics and statistics?", key: "math" },
  { q: "How much do you enjoy writing code and algorithms?", key: "coding" },
  { q: "How much do you enjoy visual design and aesthetics?", key: "design" },
  { q: "How much do you enjoy solving complex problems?", key: "problemsolving" },
  { q: "How much do you enjoy working with networks and security?", key: "networking" },
  { q: "How much do you enjoy analyzing data and finding patterns?", key: "data" },
  { q: "How much do you enjoy building hardware or physical systems?", key: "hardware" },
  { q: "How much do you enjoy creative and artistic work?", key: "creative" }
];

function getRecommendations(answers) {
  const scores = {};
  DOMAINS.forEach(d => { scores[d.id] = 0; });
  const a = answers;
  if (a.math > 3) { scores["ai-ml"] += a.math * 2; scores["data-science"] += a.math * 2; scores["quantum"] += a.math * 3; }
  if (a.coding > 3) { scores["fullstack"] += a.coding * 2; scores["software-eng"] += a.coding * 2; scores["devops"] += a.coding; }
  if (a.design > 3) { scores["uiux"] += a.design * 3; scores["mobile"] += a.design; }
  if (a.problemsolving > 3) { scores["ai-ml"] += a.problemsolving; scores["cybersecurity"] += a.problemsolving * 2; scores["robotics"] += a.problemsolving; }
  if (a.networking > 3) { scores["cybersecurity"] += a.networking * 2; scores["cloud"] += a.networking * 2; scores["devops"] += a.networking; }
  if (a.data > 3) { scores["data-analytics"] += a.data * 3; scores["data-science"] += a.data * 2; scores["ai-ml"] += a.data; }
  if (a.hardware > 3) { scores["embedded"] += a.hardware * 3; scores["iot"] += a.hardware * 2; scores["robotics"] += a.hardware * 2; }
  if (a.creative > 3) { scores["uiux"] += a.creative * 3; scores["mobile"] += a.creative; }
  return Object.entries(scores).sort((a, b) => b[1] - a[1]).slice(0, 3).map(([id]) => DOMAINS.find(d => d.id === id));
}

// ── COMPONENTS ────────────────────────────────────────────────────────────────

function useScrollReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function AnimatedCounter({ target, suffix = "", duration = 2000 }) {
  const [count, setCount] = useState(0);
  const [ref, visible] = useScrollReveal();
  useEffect(() => {
    if (!visible) return;
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [visible, target, duration]);
  return <span ref={ref}>{count}{suffix}</span>;
}

function DifficultyStars({ level }) {
  return (
    <div style={{ display: "flex", gap: 3 }}>
      {[1,2,3,4,5].map(i => (
        <div key={i} style={{
          width: 8, height: 8, borderRadius: "50%",
          background: i <= level ? "#3BA99C" : "#E2E8F0"
        }}/>
      ))}
    </div>
  );
}

function SalaryBar({ label, value, max = 100, color }) {
  const [ref, visible] = useScrollReveal();
  return (
    <div ref={ref} style={{ marginBottom: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
        <span style={{ fontSize: 12, color: "#64748B" }}>{label}</span>
        <span style={{ fontSize: 13, fontWeight: 600, color: "#1F2937" }}>₹{value} LPA</span>
      </div>
      <div style={{ background: "#E2E8F0", borderRadius: 99, height: 8, overflow: "hidden" }}>
        <div style={{
          width: visible ? `${(value / max) * 100}%` : "0%",
          height: "100%", borderRadius: 99,
          background: color || "linear-gradient(90deg, #1E3A5F, #3BA99C)",
          transition: "width 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)"
        }}/>
      </div>
    </div>
  );
}

// ── HERO ──────────────────────────────────────────────────────────────────────
function Hero({ onExplore, onQuiz }) {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 60);
    return () => clearInterval(id);
  }, []);

  const particles = useRef(Array.from({ length: 40 }, (_, i) => ({
    x: Math.random() * 100, y: Math.random() * 100,
    vx: (Math.random() - 0.5) * 0.03, vy: (Math.random() - 0.5) * 0.03,
    size: Math.random() * 3 + 1, opacity: Math.random() * 0.4 + 0.1,
    label: ["AI", "☁️", "🔐", "📊", "🤖", "⚙️", "💻", "⛓️", "🦾", "⚛️"][i % 10]
  })));

  useEffect(() => {
    particles.current.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > 100) p.vx *= -1;
      if (p.y < 0 || p.y > 100) p.vy *= -1;
    });
  }, [tick]);

  const [mounted, setMounted] = useState(false);
  useEffect(() => { setTimeout(() => setMounted(true), 100); }, []);

  return (
    <section style={{
      minHeight: "100vh", background: "linear-gradient(135deg, #0F1E35 0%, #1E3A5F 40%, #0F2A4A 100%)",
      position: "relative", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center"
    }}>
      {/* Particle canvas */}
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
        {particles.current.map((p, i) => (
          <text key={i} x={`${p.x}%`} y={`${p.y}%`} fontSize={p.size * 5 + 8}
            opacity={p.opacity} fill="rgba(59,169,156,0.6)">{p.label}</text>
        ))}
        {particles.current.slice(0, 15).map((p, i) =>
          particles.current.slice(i + 1, i + 4).map((q, j) => {
            const dx = p.x - q.x, dy = p.y - q.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist > 20) return null;
            return <line key={`${i}-${j}`} x1={`${p.x}%`} y1={`${p.y}%`} x2={`${q.x}%`} y2={`${q.y}%`}
              stroke="rgba(59,169,156,0.15)" strokeWidth="0.5"/>;
          })
        )}
      </svg>

      {/* Gradient orbs */}
      <div style={{ position: "absolute", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(59,169,156,0.12) 0%, transparent 70%)", top: "10%", left: "10%", pointerEvents: "none" }}/>
      <div style={{ position: "absolute", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(30,58,95,0.3) 0%, transparent 70%)", bottom: "10%", right: "10%", pointerEvents: "none" }}/>

      <div style={{ textAlign: "center", padding: "0 24px", position: "relative", zIndex: 1, maxWidth: 800 }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(59,169,156,0.15)",
          border: "1px solid rgba(59,169,156,0.3)", borderRadius: 99, padding: "6px 16px",
          marginBottom: 24, opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(-20px)",
          transition: "all 0.8s ease"
        }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#3BA99C", animation: "pulse 2s infinite" }}/>
          <span style={{ fontSize: 13, color: "#3BA99C", fontWeight: 500 }}>15+ Technology Career Paths</span>
        </div>

        <h1 style={{
          fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 800, lineHeight: 1.2, marginBottom: 20,
          background: "linear-gradient(135deg, #FFFFFF 0%, #A8D5E2 100%)", WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent", opacity: mounted ? 1 : 0,
          transform: mounted ? "translateY(0)" : "translateY(30px)", transition: "all 0.9s ease 0.2s",
          fontFamily: "'Poppins', sans-serif"
        }}>
          Find Your Future Career<br />in Technology
        </h1>

        <p style={{
          fontSize: "clamp(1rem, 2vw, 1.2rem)", color: "rgba(255,255,255,0.75)", lineHeight: 1.7,
          marginBottom: 40, maxWidth: 600, margin: "0 auto 40px",
          opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.9s ease 0.4s"
        }}>
          Explore 15+ technology domains through visual roadmaps, salary insights,
          skill trees, and career simulations.
        </p>

        <div style={{
          display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap",
          opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.9s ease 0.6s"
        }}>
          <button onClick={onExplore} style={{
            padding: "14px 32px", borderRadius: 12, border: "none", cursor: "pointer",
            background: "linear-gradient(135deg, #3BA99C, #2D8A7E)", color: "#fff",
            fontSize: 16, fontWeight: 600, letterSpacing: 0.3,
            boxShadow: "0 8px 24px rgba(59,169,156,0.4)", transition: "all 0.3s ease",
            fontFamily: "'Poppins', sans-serif"
          }}
            onMouseEnter={e => { e.target.style.transform = "translateY(-3px)"; e.target.style.boxShadow = "0 12px 32px rgba(59,169,156,0.5)"; }}
            onMouseLeave={e => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "0 8px 24px rgba(59,169,156,0.4)"; }}
          >🚀 Explore Careers</button>

          <button onClick={onQuiz} style={{
            padding: "14px 32px", borderRadius: 12, cursor: "pointer",
            background: "rgba(255,255,255,0.08)", border: "1.5px solid rgba(255,255,255,0.25)",
            color: "#fff", fontSize: 16, fontWeight: 600, letterSpacing: 0.3,
            backdropFilter: "blur(10px)", transition: "all 0.3s ease",
            fontFamily: "'Poppins', sans-serif"
          }}
            onMouseEnter={e => { e.target.style.background = "rgba(255,255,255,0.15)"; e.target.style.transform = "translateY(-3px)"; }}
            onMouseLeave={e => { e.target.style.background = "rgba(255,255,255,0.08)"; e.target.style.transform = "translateY(0)"; }}
          >🎯 Take Career Quiz</button>
        </div>

        {/* Stats row */}
        <div style={{
          display: "flex", gap: 32, justifyContent: "center", marginTop: 60, flexWrap: "wrap",
          opacity: mounted ? 1 : 0, transition: "all 0.9s ease 0.8s"
        }}>
          {[["15+", "Tech Domains"], ["₹90 LPA", "Top Salaries"], ["500K+", "Job Openings"], ["95%", "Placement Rate"]].map(([num, label]) => (
            <div key={label} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 24, fontWeight: 800, color: "#3BA99C", fontFamily: "'Poppins', sans-serif" }}>{num}</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", marginTop: 2 }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{ position: "absolute", bottom: 30, left: "50%", transform: "translateX(-50%)", animation: "bounce 2s infinite" }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2">
          <path d="M12 5v14M5 12l7 7 7-7"/>
        </svg>
      </div>

      <style>{`
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.6;transform:scale(1.2)} }
        @keyframes bounce { 0%,100%{transform:translateX(-50%) translateY(0)} 50%{transform:translateX(-50%) translateY(8px)} }
      `}</style>
    </section>
  );
}

// ── DOMAIN CARD ───────────────────────────────────────────────────────────────
function DomainCard({ domain, index, onClick }) {
  const [ref, visible] = useScrollReveal();
  const [hovered, setHovered] = useState(false);
  return (
    <div ref={ref} onClick={() => onClick(domain)} style={{
      background: "#fff", borderRadius: 20, padding: "24px",
      border: "1.5px solid #E2E8F0", cursor: "pointer", position: "relative", overflow: "hidden",
      transform: visible ? "translateY(0)" : "translateY(40px)",
      opacity: visible ? 1 : 0,
      transition: `all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 60}ms`,
      boxShadow: hovered ? "0 20px 60px rgba(30,58,95,0.15)" : "0 4px 20px rgba(0,0,0,0.05)",
      scale: hovered ? "1.02" : "1"
    }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Top accent */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 4,
        background: `linear-gradient(90deg, ${domain.color}, ${domain.accent})`,
        transform: hovered ? "scaleX(1)" : "scaleX(0)",
        transformOrigin: "left", transition: "transform 0.4s ease"
      }}/>

      <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 16 }}>
        <div style={{
          width: 48, height: 48, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center",
          background: `${domain.color}18`, fontSize: 22, flexShrink: 0,
          transition: "transform 0.3s ease", transform: hovered ? "scale(1.1) rotate(5deg)" : "none"
        }}>{domain.icon}</div>
        <div>
          <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "#1F2937", fontFamily: "'Poppins', sans-serif", lineHeight: 1.3 }}>{domain.name}</h3>
          <p style={{ margin: "4px 0 0", fontSize: 12, color: "#64748B" }}>{domain.learningTime}</p>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
        <div>
          <p style={{ margin: 0, fontSize: 10, color: "#94A3B8", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 3 }}>Difficulty</p>
          <DifficultyStars level={domain.difficulty} />
        </div>
        <div style={{ textAlign: "right" }}>
          <p style={{ margin: 0, fontSize: 10, color: "#94A3B8", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 3 }}>Demand</p>
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <div style={{ width: 50, height: 4, borderRadius: 99, background: "#E2E8F0", overflow: "hidden" }}>
              <div style={{ width: `${domain.demand}%`, height: "100%", background: "#22C55E", borderRadius: 99 }}/>
            </div>
            <span style={{ fontSize: 11, fontWeight: 600, color: "#22C55E" }}>{domain.demand}%</span>
          </div>
        </div>
      </div>

      <div style={{ borderTop: "1px solid #F1F5F9", paddingTop: 12 }}>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {domain.skills.slice(0, 3).map(s => (
            <span key={s} style={{
              background: `${domain.color}12`, color: domain.color,
              padding: "2px 8px", borderRadius: 99, fontSize: 10, fontWeight: 500
            }}>{s}</span>
          ))}
        </div>
      </div>

      <div style={{
        position: "absolute", bottom: 12, right: 16, fontSize: 20,
        opacity: hovered ? 1 : 0, transform: hovered ? "translateX(0)" : "translateX(10px)",
        transition: "all 0.3s ease", color: domain.accent
      }}>→</div>
    </div>
  );
}

// ── SKILL TREE ────────────────────────────────────────────────────────────────
function SkillTree({ domain }) {
  const tree = SKILL_TREES[domain.id] || SKILL_TREES["ai-ml"].map((n, i) => ({
    ...n, name: domain.skills[i] || n.name, desc: "Essential skill for " + domain.name
  }));
  const [active, setActive] = useState(null);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setProgress(p => p < tree.length - 1 ? p + 1 : p), 300);
    return () => clearInterval(id);
  }, [tree.length]);

  return (
    <div style={{ padding: "0 16px" }}>
      <div style={{ position: "relative", paddingLeft: 60 }}>
        {/* Vertical line */}
        <div style={{
          position: "absolute", left: 27, top: 20, width: 2,
          height: `${(progress / (tree.length - 1)) * (tree.length * 68)}px`,
          background: `linear-gradient(180deg, ${domain.color}, ${domain.accent})`,
          transition: "height 2s ease", borderRadius: 2
        }}/>

        {tree.map((node, i) => (
          <div key={node.id} onClick={() => setActive(active === i ? null : i)} style={{
            display: "flex", alignItems: "center", gap: 16, marginBottom: 12,
            opacity: i <= progress ? 1 : 0.25, transition: "opacity 0.5s ease",
            cursor: "pointer"
          }}>
            {/* Node circle */}
            <div style={{
              width: 36, height: 36, borderRadius: "50%", flexShrink: 0, zIndex: 1,
              background: i <= progress ? `linear-gradient(135deg, ${domain.color}, ${domain.accent})` : "#E2E8F0",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: i <= progress ? `0 4px 12px ${domain.color}40` : "none",
              transition: "all 0.4s ease", transform: active === i ? "scale(1.15)" : "scale(1)"
            }}>
              <span style={{ color: i <= progress ? "#fff" : "#94A3B8", fontSize: 12, fontWeight: 700 }}>{i + 1}</span>
            </div>

            {/* Content */}
            <div style={{
              flex: 1, background: active === i ? `${domain.color}10` : "#F8FAFC",
              borderRadius: 12, padding: "10px 14px",
              border: `1.5px solid ${active === i ? domain.color + "40" : "#E2E8F0"}`,
              transition: "all 0.3s ease"
            }}>
              <p style={{ margin: 0, fontWeight: 600, fontSize: 14, color: "#1F2937" }}>{node.name}</p>
              {active === i && <p style={{ margin: "4px 0 0", fontSize: 12, color: "#64748B" }}>{node.desc}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── DOMAIN DETAIL ─────────────────────────────────────────────────────────────
function DomainDetail({ domain, onBack }) {
  const [tab, setTab] = useState("overview");
  const tabs = ["overview", "roadmap", "salary", "jobs"];

  return (
    <div style={{ minHeight: "100vh", background: "#F8FAFC" }}>
      {/* Header */}
      <div style={{ background: `linear-gradient(135deg, ${domain.color} 0%, ${domain.accent}CC 100%)`, padding: "48px 24px 32px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='20'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }}/>
        <div style={{ maxWidth: 900, margin: "0 auto", position: "relative" }}>
          <button onClick={onBack} style={{ background: "rgba(255,255,255,0.2)", border: "none", borderRadius: 8, padding: "8px 16px", color: "#fff", cursor: "pointer", marginBottom: 20, display: "flex", alignItems: "center", gap: 6, fontSize: 14 }}>
            ← Back to Domains
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <div style={{ width: 72, height: 72, borderRadius: 20, background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36 }}>{domain.icon}</div>
            <div>
              <h1 style={{ margin: 0, color: "#fff", fontSize: 28, fontWeight: 800, fontFamily: "'Poppins', sans-serif" }}>{domain.name}</h1>
              <p style={{ margin: "6px 0 0", color: "rgba(255,255,255,0.8)", fontSize: 15 }}>{domain.what}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ background: "#fff", borderBottom: "1px solid #E2E8F0", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", padding: "0 24px" }}>
          {tabs.map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              padding: "16px 20px", border: "none", background: "none", cursor: "pointer",
              fontSize: 14, fontWeight: tab === t ? 600 : 400,
              color: tab === t ? domain.color : "#64748B",
              borderBottom: `2px solid ${tab === t ? domain.color : "transparent"}`,
              textTransform: "capitalize", transition: "all 0.2s"
            }}>{t}</button>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "32px 24px" }}>
        {tab === "overview" && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
            {[
              { title: "Who Should Choose This?", content: domain.who, icon: "👤" },
              { title: "Future Scope", content: domain.scope, icon: "🔭" },
              { title: "Key Tools", content: domain.tools.join(", "), icon: "🛠️" },
              { title: "Top Certifications", content: domain.certs.join(", "), icon: "🎓" }
            ].map(item => (
              <div key={item.title} style={{ background: "#fff", borderRadius: 16, padding: 24, border: "1px solid #E2E8F0" }}>
                <div style={{ fontSize: 28, marginBottom: 12 }}>{item.icon}</div>
                <h3 style={{ margin: "0 0 8px", fontSize: 15, fontWeight: 700, color: "#1F2937" }}>{item.title}</h3>
                <p style={{ margin: 0, fontSize: 14, color: "#64748B", lineHeight: 1.6 }}>{item.content}</p>
              </div>
            ))}
          </div>
        )}

        {tab === "roadmap" && (
          <div>
            <h2 style={{ marginBottom: 24, fontFamily: "'Poppins', sans-serif", color: "#1F2937" }}>Skill Roadmap</h2>
            <SkillTree domain={domain} />
          </div>
        )}

        {tab === "salary" && (
          <div style={{ background: "#fff", borderRadius: 16, padding: 32, border: "1px solid #E2E8F0" }}>
            <h2 style={{ marginBottom: 24, fontFamily: "'Poppins', sans-serif", color: "#1F2937" }}>Salary Growth Trajectory</h2>
            <SalaryBar label="Fresher (0-1 yr)" value={domain.salaryFresher} max={100} color={domain.color} />
            <SalaryBar label="3 Years Experience" value={domain.salary3yr} max={100} color={domain.color} />
            <SalaryBar label="5 Years Experience" value={domain.salary5yr} max={100} color={domain.color} />
            <SalaryBar label="10 Years Experience" value={domain.salary10yr} max={100} color={domain.color} />
            <p style={{ marginTop: 16, fontSize: 13, color: "#94A3B8" }}>* Salaries in LPA (Lakhs Per Annum) for Indian market</p>
          </div>
        )}

        {tab === "jobs" && (
          <div>
            {domain.roles.map((role, i) => (
              <div key={role} style={{ background: "#fff", borderRadius: 12, padding: "16px 20px", marginBottom: 12, border: "1px solid #E2E8F0", display: "flex", alignItems: "center", gap: 16 }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: `${domain.color}15`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: domain.color }}>{i + 1}</div>
                <div>
                  <p style={{ margin: 0, fontWeight: 600, color: "#1F2937" }}>{role}</p>
                  <p style={{ margin: "2px 0 0", fontSize: 13, color: "#64748B" }}>Avg: ₹{[domain.salaryFresher, domain.salary3yr, domain.salary5yr, domain.salary10yr][i] || domain.salary3yr} LPA</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ── CAREER QUIZ ───────────────────────────────────────────────────────────────
function CareerQuiz({ onClose }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState(null);

  const handleAnswer = (key, val) => {
    const newAnswers = { ...answers, [key]: val };
    setAnswers(newAnswers);
    if (step < QUIZ_QUESTIONS.length - 1) setStep(s => s + 1);
    else setResults(getRecommendations(newAnswers));
  };

  if (results) return (
    <div style={{ background: "#fff", minHeight: "100vh", padding: "48px 24px" }}>
      <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
        <div style={{ fontSize: 56, marginBottom: 16 }}>🎯</div>
        <h2 style={{ fontFamily: "'Poppins', sans-serif", color: "#1F2937", fontSize: 28, marginBottom: 8 }}>Your Top Career Matches</h2>
        <p style={{ color: "#64748B", marginBottom: 40 }}>Based on your interests and strengths</p>
        {results.map((d, i) => (
          <div key={d.id} style={{
            background: "#F8FAFC", borderRadius: 20, padding: "24px", marginBottom: 16, border: "2px solid",
            borderColor: i === 0 ? d.color : "#E2E8F0",
            transform: i === 0 ? "scale(1.02)" : "none"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16, textAlign: "left" }}>
              <div style={{ fontSize: 40 }}>{d.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  {i === 0 && <span style={{ background: "#22C55E", color: "#fff", fontSize: 10, padding: "2px 8px", borderRadius: 99, fontWeight: 600 }}>BEST MATCH</span>}
                  <h3 style={{ margin: 0, fontWeight: 700, color: "#1F2937" }}>#{i + 1} {d.name}</h3>
                </div>
                <p style={{ margin: "4px 0 0", fontSize: 13, color: "#64748B" }}>₹{d.salaryFresher}–{d.salary5yr} LPA growth path • {d.learningTime}</p>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 20, fontWeight: 800, color: d.color }}>{d.demand}%</div>
                <div style={{ fontSize: 11, color: "#94A3B8" }}>Demand</div>
              </div>
            </div>
          </div>
        ))}
        <button onClick={onClose} style={{
          marginTop: 24, padding: "14px 32px", borderRadius: 12, border: "none", cursor: "pointer",
          background: "linear-gradient(135deg, #1E3A5F, #3BA99C)", color: "#fff", fontSize: 16, fontWeight: 600
        }}>Explore These Careers →</button>
      </div>
    </div>
  );

  const q = QUIZ_QUESTIONS[step];
  return (
    <div style={{ background: "#fff", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ maxWidth: 560, width: "100%", textAlign: "center" }}>
        {/* Progress */}
        <div style={{ marginBottom: 40 }}>
          <div style={{ display: "flex", gap: 4, marginBottom: 12 }}>
            {QUIZ_QUESTIONS.map((_, i) => (
              <div key={i} style={{ flex: 1, height: 3, borderRadius: 99, background: i <= step ? "#3BA99C" : "#E2E8F0", transition: "background 0.3s" }}/>
            ))}
          </div>
          <p style={{ fontSize: 13, color: "#94A3B8" }}>Question {step + 1} of {QUIZ_QUESTIONS.length}</p>
        </div>

        <h2 style={{ fontFamily: "'Poppins', sans-serif", fontSize: 22, color: "#1F2937", marginBottom: 40, lineHeight: 1.4 }}>{q.q}</h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 8 }}>
          {[1,2,3,4,5].map(val => (
            <button key={val} onClick={() => handleAnswer(q.key, val)} style={{
              padding: "16px 8px", borderRadius: 12, border: "2px solid #E2E8F0",
              background: "#F8FAFC", cursor: "pointer", transition: "all 0.2s ease",
              fontFamily: "'Poppins', sans-serif"
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "#3BA99C"; e.currentTarget.style.background = "#F0FDFB"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "#E2E8F0"; e.currentTarget.style.background = "#F8FAFC"; }}
            >
              <div style={{ fontSize: 22, marginBottom: 4 }}>{"⭐".repeat(val)}</div>
              <div style={{ fontSize: 11, color: "#64748B" }}>{["Very Low", "Low", "Medium", "High", "Very High"][val - 1]}</div>
            </button>
          ))}
        </div>

        <button onClick={onClose} style={{ marginTop: 32, background: "none", border: "none", color: "#94A3B8", cursor: "pointer", fontSize: 14 }}>← Back to Explorer</button>
      </div>
    </div>
  );
}

// ── COMPARISON TOOL ───────────────────────────────────────────────────────────
function ComparisonTool() {
  const [a, setA] = useState("ai-ml");
  const [b, setB] = useState("cybersecurity");
  const [ref, visible] = useScrollReveal();

  const domA = DOMAINS.find(d => d.id === a);
  const domB = DOMAINS.find(d => d.id === b);

  const metrics = [
    { key: "demand", label: "Market Demand", max: 100 },
    { key: "difficulty", label: "Learning Difficulty", max: 5 },
    { key: "salaryFresher", label: "Fresher Salary (LPA)", max: 15 },
    { key: "salary5yr", label: "5-Year Salary (LPA)", max: 60 },
    { key: "salary10yr", label: "10-Year Salary (LPA)", max: 100 }
  ];

  return (
    <section ref={ref} style={{ padding: "80px 24px", background: "#fff" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48, opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(30px)", transition: "all 0.8s ease" }}>
          <h2 style={{ fontSize: 32, fontWeight: 800, fontFamily: "'Poppins', sans-serif", color: "#1F2937", marginBottom: 8 }}>Compare Career Paths</h2>
          <p style={{ color: "#64748B" }}>Side-by-side analysis to help you choose</p>
        </div>

        {/* Selectors */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: 16, alignItems: "center", marginBottom: 40, opacity: visible ? 1 : 0, transition: "all 0.8s ease 0.2s" }}>
          <select value={a} onChange={e => setA(e.target.value)} style={{ padding: "12px 16px", borderRadius: 12, border: "2px solid #E2E8F0", fontSize: 14, color: "#1F2937", background: "#fff", cursor: "pointer" }}>
            {DOMAINS.map(d => <option key={d.id} value={d.id}>{d.icon} {d.name}</option>)}
          </select>
          <div style={{ fontSize: 20, textAlign: "center", color: "#94A3B8" }}>vs</div>
          <select value={b} onChange={e => setB(e.target.value)} style={{ padding: "12px 16px", borderRadius: 12, border: "2px solid #E2E8F0", fontSize: 14, color: "#1F2937", background: "#fff", cursor: "pointer" }}>
            {DOMAINS.map(d => <option key={d.id} value={d.id}>{d.icon} {d.name}</option>)}
          </select>
        </div>

        {/* Headers */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 80px 1fr", gap: 8, marginBottom: 12 }}>
          <div style={{ background: `${domA.color}12`, borderRadius: 12, padding: "12px 16px", display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 24 }}>{domA.icon}</span>
            <span style={{ fontWeight: 700, color: domA.color, fontSize: 14 }}>{domA.name}</span>
          </div>
          <div/>
          <div style={{ background: `${domB.color}12`, borderRadius: 12, padding: "12px 16px", display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 24 }}>{domB.icon}</span>
            <span style={{ fontWeight: 700, color: domB.color, fontSize: 14 }}>{domB.name}</span>
          </div>
        </div>

        {/* Comparison bars */}
        {metrics.map(m => {
          const va = domA[m.key], vb = domB[m.key];
          const pctA = (va / m.max) * 100, pctB = (vb / m.max) * 100;
          return (
            <div key={m.key} style={{ display: "grid", gridTemplateColumns: "1fr 80px 1fr", gap: 8, marginBottom: 8, alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: `${pctA}%`, maxWidth: "70%", height: 28, borderRadius: 8, background: `linear-gradient(90deg, ${domA.color}, ${domA.accent})`, display: "flex", alignItems: "center", justifyContent: "flex-end", paddingRight: 8, minWidth: 40, transition: "width 0.8s ease" }}>
                  <span style={{ fontSize: 11, color: "#fff", fontWeight: 600 }}>{va}{m.key === "demand" ? "%" : ""}</span>
                </div>
              </div>
              <div style={{ textAlign: "center", fontSize: 11, color: "#94A3B8", lineHeight: 1.3 }}>{m.label}</div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div style={{ width: `${pctB}%`, maxWidth: "70%", height: 28, borderRadius: 8, background: `linear-gradient(90deg, ${domB.color}, ${domB.accent})`, display: "flex", alignItems: "center", justifyContent: "flex-start", paddingLeft: 8, minWidth: 40, transition: "width 0.8s ease" }}>
                  <span style={{ fontSize: 11, color: "#fff", fontWeight: 600 }}>{vb}{m.key === "demand" ? "%" : ""}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// ── SALARY SECTION ────────────────────────────────────────────────────────────
function SalarySection() {
  const [ref, visible] = useScrollReveal();
  const [selected, setSelected] = useState("ai-ml");
  const domain = DOMAINS.find(d => d.id === selected);

  return (
    <section ref={ref} style={{ padding: "80px 24px", background: "#F8FAFC" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48, opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(30px)", transition: "all 0.8s ease" }}>
          <h2 style={{ fontSize: 32, fontWeight: 800, fontFamily: "'Poppins', sans-serif", color: "#1F2937", marginBottom: 8 }}>Salary Insights</h2>
          <p style={{ color: "#64748B" }}>Growth trajectory across all tech domains</p>
        </div>

        {/* Domain selector chips */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center", marginBottom: 40 }}>
          {DOMAINS.map(d => (
            <button key={d.id} onClick={() => setSelected(d.id)} style={{
              padding: "6px 14px", borderRadius: 99, border: `1.5px solid ${selected === d.id ? d.color : "#E2E8F0"}`,
              background: selected === d.id ? d.color : "#fff", color: selected === d.id ? "#fff" : "#64748B",
              fontSize: 12, cursor: "pointer", transition: "all 0.2s ease", fontWeight: selected === d.id ? 600 : 400
            }}>{d.icon} {d.name}</button>
          ))}
        </div>

        <div style={{ background: "#fff", borderRadius: 24, padding: 32, border: "1px solid #E2E8F0" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 32 }}>
            <div style={{ width: 56, height: 56, borderRadius: 16, background: `${domain.color}15`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28 }}>{domain.icon}</div>
            <div>
              <h3 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: "#1F2937", fontFamily: "'Poppins', sans-serif" }}>{domain.name}</h3>
              <p style={{ margin: "2px 0 0", fontSize: 13, color: "#64748B" }}>Salary growth in India</p>
            </div>
            <div style={{ marginLeft: "auto", background: `${domain.color}12`, borderRadius: 12, padding: "8px 16px" }}>
              <div style={{ fontSize: 22, fontWeight: 800, color: domain.color }}>₹{domain.salary10yr} LPA</div>
              <div style={{ fontSize: 11, color: "#94A3B8" }}>at 10 years</div>
            </div>
          </div>

          <SalaryBar label="🌱 Fresher (0-1 yr)" value={domain.salaryFresher} max={100} color={domain.color} />
          <SalaryBar label="📈 3 Years" value={domain.salary3yr} max={100} color={domain.color} />
          <SalaryBar label="🚀 5 Years" value={domain.salary5yr} max={100} color={domain.color} />
          <SalaryBar label="👑 10 Years" value={domain.salary10yr} max={100} color={domain.color} />
        </div>
      </div>
    </section>
  );
}

// ── ROADMAP TIMELINE ──────────────────────────────────────────────────────────
function RoadmapTimeline() {
  const [ref, visible] = useScrollReveal();
  const years = [
    { year: "Year 1", color: "#3BA99C", items: ["Programming Fundamentals", "Data Structures", "Git & Version Control", "SQL Basics", "Math for Tech"] },
    { year: "Year 2", color: "#1E3A5F", items: ["Personal Projects", "Choose Specialization", "Hackathons", "Open Source Contributions", "Technical Blogs"] },
    { year: "Year 3", color: "#F59E0B", items: ["Internships", "Advanced DSA", "Competitive Programming", "Domain Certifications", "Networking"] },
    { year: "Year 4", color: "#22C55E", items: ["Advanced Projects", "Placement Preparation", "Mock Interviews", "Soft Skills", "Job Applications"] }
  ];

  return (
    <section ref={ref} style={{ padding: "80px 24px", background: "#fff" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 56, opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(30px)", transition: "all 0.8s ease" }}>
          <h2 style={{ fontSize: 32, fontWeight: 800, fontFamily: "'Poppins', sans-serif", color: "#1F2937", marginBottom: 8 }}>B.Tech Career Roadmap</h2>
          <p style={{ color: "#64748B" }}>Your 4-year journey from student to professional</p>
        </div>

        <div style={{ position: "relative" }}>
          {/* Timeline spine */}
          <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: 2, background: "linear-gradient(180deg, #3BA99C, #22C55E)", transform: "translateX(-50%)" }}/>

          {years.map((y, i) => (
            <div key={y.year} style={{
              display: "flex", justifyContent: i % 2 === 0 ? "flex-start" : "flex-end",
              marginBottom: 40, opacity: visible ? 1 : 0,
              transform: visible ? "none" : `translateX(${i % 2 === 0 ? "-30px" : "30px"})`,
              transition: `all 0.7s ease ${i * 150}ms`
            }}>
              <div style={{ width: "44%", background: "#F8FAFC", borderRadius: 16, padding: "20px 24px", border: `2px solid ${y.color}25`, position: "relative" }}>
                {/* Connector dot */}
                <div style={{
                  position: "absolute", top: "50%", [i % 2 === 0 ? "right" : "left"]: -32,
                  transform: "translateY(-50%)", width: 20, height: 20, borderRadius: "50%",
                  background: y.color, border: "3px solid #fff", boxShadow: `0 0 0 3px ${y.color}40`
                }}/>

                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                  <div style={{ background: y.color, color: "#fff", borderRadius: 8, padding: "4px 12px", fontSize: 13, fontWeight: 700 }}>{y.year}</div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {y.items.map(item => (
                    <div key={item} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#374151" }}>
                      <div style={{ width: 5, height: 5, borderRadius: "50%", background: y.color, flexShrink: 0 }}/>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── FUTURE TRENDS ─────────────────────────────────────────────────────────────
function FutureTrends() {
  const [ref, visible] = useScrollReveal();
  const trends = [
    { rank: 1, name: "Generative AI", growth: 340, icon: "🤖", color: "#7C3AED" },
    { rank: 2, name: "Cybersecurity", growth: 280, icon: "🔐", color: "#DC2626" },
    { rank: 3, name: "Cloud & Edge", growth: 220, icon: "☁️", color: "#2563EB" },
    { rank: 4, name: "Quantum Computing", growth: 190, icon: "⚛️", color: "#059669" },
    { rank: 5, name: "Robotics & Automation", growth: 175, icon: "🦾", color: "#D97706" },
    { rank: 6, name: "Blockchain & Web3", growth: 160, icon: "⛓️", color: "#7C3AED" }
  ];

  return (
    <section ref={ref} style={{ padding: "80px 24px", background: "#0F1E35" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 56, opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(30px)", transition: "all 0.8s ease" }}>
          <h2 style={{ fontSize: 32, fontWeight: 800, fontFamily: "'Poppins', sans-serif", color: "#fff", marginBottom: 8 }}>Future Trends 2025–2035</h2>
          <p style={{ color: "rgba(255,255,255,0.6)" }}>The fastest-growing tech domains of the next decade</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
          {trends.map((t, i) => (
            <div key={t.rank} style={{
              background: "rgba(255,255,255,0.05)", borderRadius: 16, padding: "20px 24px",
              border: "1px solid rgba(255,255,255,0.1)",
              opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(30px)",
              transition: `all 0.6s ease ${i * 100}ms`
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: `${t.color}25`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>{t.icon}</div>
                <div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginBottom: 2 }}>RANK #{t.rank}</div>
                  <h3 style={{ margin: 0, color: "#fff", fontWeight: 700, fontSize: 15 }}>{t.name}</h3>
                </div>
                <div style={{ marginLeft: "auto", color: "#22C55E", fontWeight: 800, fontSize: 18 }}>+{t.growth}%</div>
              </div>
              <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 99, height: 6, overflow: "hidden" }}>
                <div style={{ width: visible ? `${(t.growth / 340) * 100}%` : "0%", height: "100%", background: t.color, borderRadius: 99, transition: `width 1.2s ease ${i * 150}ms` }}/>
              </div>
              <p style={{ margin: "8px 0 0", fontSize: 11, color: "rgba(255,255,255,0.4)" }}>Projected growth by 2035</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── STATS DASHBOARD ───────────────────────────────────────────────────────────
function StatsDashboard() {
  const [ref, visible] = useScrollReveal();
  const stats = [
    { label: "Average Tech Salary", value: 24, suffix: " LPA", icon: "💰", color: "#22C55E" },
    { label: "Open Tech Jobs in India", value: 500, suffix: "K+", icon: "💼", color: "#3BA99C" },
    { label: "Industry Growth (5yr)", value: 68, suffix: "%", icon: "📈", color: "#F59E0B" },
    { label: "Domains Covered", value: 15, suffix: "+", icon: "🗺️", color: "#7C3AED" }
  ];

  return (
    <section ref={ref} style={{ padding: "80px 24px", background: "#fff" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48, opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(30px)", transition: "all 0.8s ease" }}>
          <h2 style={{ fontSize: 32, fontWeight: 800, fontFamily: "'Poppins', sans-serif", color: "#1F2937", marginBottom: 8 }}>Industry Snapshot</h2>
          <p style={{ color: "#64748B" }}>Real numbers from India's tech ecosystem</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))", gap: 20 }}>
          {stats.map((s, i) => (
            <div key={s.label} style={{
              background: "#F8FAFC", borderRadius: 20, padding: 28, textAlign: "center",
              border: `1px solid ${s.color}25`,
              opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(30px)",
              transition: `all 0.6s ease ${i * 120}ms`
            }}>
              <div style={{ fontSize: 36, marginBottom: 8 }}>{s.icon}</div>
              <div style={{ fontSize: 36, fontWeight: 800, color: s.color, fontFamily: "'Poppins', sans-serif", lineHeight: 1.1 }}>
                {visible ? <><AnimatedCounter target={s.value} />{s.suffix}</> : "—"}
              </div>
              <p style={{ margin: "8px 0 0", fontSize: 13, color: "#64748B", lineHeight: 1.4 }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── ECOSYSTEM MAP ─────────────────────────────────────────────────────────────
function EcosystemMap() {
  const [ref, visible] = useScrollReveal();
  const [hovered, setHovered] = useState(null);

  const nodes = [
    { id: "center", x: 50, y: 50, label: "Tech Universe", size: 64, color: "#1E3A5F", icon: "🌐" },
    { id: "ai", x: 50, y: 14, label: "AI / ML", size: 48, color: "#7C3AED", icon: "🤖", related: ["Data Science", "MLOps", "GenAI"] },
    { id: "cyber", x: 82, y: 28, label: "Cybersecurity", size: 44, color: "#DC2626", icon: "🔐", related: ["Ethical Hacking", "Cloud Sec", "SOC"] },
    { id: "cloud", x: 86, y: 62, label: "Cloud", size: 44, color: "#2563EB", icon: "☁️", related: ["DevOps", "SRE", "Serverless"] },
    { id: "data", x: 62, y: 86, label: "Data", size: 44, color: "#059669", icon: "📊", related: ["Analytics", "BI", "DataEng"] },
    { id: "dev", x: 28, y: 86, label: "Development", size: 44, color: "#1E3A5F", icon: "💻", related: ["Frontend", "Backend", "Mobile"] },
    { id: "robotics", x: 14, y: 62, label: "Robotics", size: 40, color: "#D97706", icon: "🦾", related: ["IoT", "Embedded", "Automation"] },
    { id: "design", x: 14, y: 28, label: "Design", size: 40, color: "#EC4899", icon: "🎨", related: ["UX Research", "UI Systems", "Motion"] }
  ];

  return (
    <section ref={ref} style={{ padding: "80px 24px", background: "#F8FAFC" }}>
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48, opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(30px)", transition: "all 0.8s ease" }}>
          <h2 style={{ fontSize: 32, fontWeight: 800, fontFamily: "'Poppins', sans-serif", color: "#1F2937", marginBottom: 8 }}>Technology Ecosystem</h2>
          <p style={{ color: "#64748B" }}>Hover to explore how domains connect</p>
        </div>

        <div style={{ position: "relative", paddingBottom: "100%", opacity: visible ? 1 : 0, transition: "opacity 0.8s ease 0.2s" }}>
          <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} viewBox="0 0 100 100">
            {/* Lines from center to satellites */}
            {nodes.slice(1).map(n => (
              <line key={n.id} x1="50" y1="50" x2={n.x} y2={n.y}
                stroke={hovered === n.id ? n.color : "#E2E8F0"}
                strokeWidth={hovered === n.id ? 0.5 : 0.2}
                strokeDasharray={hovered === n.id ? "none" : "1,2"}
                style={{ transition: "all 0.3s" }}/>
            ))}
          </svg>

          {nodes.map(n => (
            <div key={n.id} style={{
              position: "absolute",
              left: `${n.x}%`, top: `${n.y}%`,
              transform: "translate(-50%, -50%)",
              width: n.size, height: n.size,
              borderRadius: "50%",
              background: n.id === "center" ? `linear-gradient(135deg, ${n.color}, #3BA99C)` : `${n.color}18`,
              border: `2px solid ${hovered === n.id ? n.color : n.id === "center" ? "transparent" : n.color + "40"}`,
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              cursor: n.id !== "center" ? "pointer" : "default",
              transition: "all 0.3s ease",
              boxShadow: hovered === n.id ? `0 8px 24px ${n.color}40` : n.id === "center" ? "0 8px 32px rgba(30,58,95,0.3)" : "none",
              zIndex: hovered === n.id ? 10 : 1,
              scale: hovered === n.id ? "1.15" : "1"
            }}
              onMouseEnter={() => n.id !== "center" && setHovered(n.id)}
              onMouseLeave={() => setHovered(null)}
            >
              <span style={{ fontSize: n.id === "center" ? 20 : 16 }}>{n.icon}</span>
              <span style={{ fontSize: n.id === "center" ? 7 : 6, fontWeight: 700, color: n.id === "center" ? "#fff" : n.color, textAlign: "center", lineHeight: 1.2, marginTop: 2 }}>{n.label}</span>

              {/* Tooltip */}
              {hovered === n.id && n.related && (
                <div style={{
                  position: "absolute", bottom: "110%", left: "50%", transform: "translateX(-50%)",
                  background: "#1F2937", borderRadius: 8, padding: "8px 12px", whiteSpace: "nowrap",
                  zIndex: 100, boxShadow: "0 8px 24px rgba(0,0,0,0.2)"
                }}>
                  {n.related.map(r => (
                    <div key={r} style={{ fontSize: 10, color: "#fff", marginBottom: 2 }}>→ {r}</div>
                  ))}
                  <div style={{ position: "absolute", top: "100%", left: "50%", transform: "translateX(-50%)", borderLeft: "5px solid transparent", borderRight: "5px solid transparent", borderTop: "5px solid #1F2937" }}/>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── MAIN APP ──────────────────────────────────────────────────────────────────
export default function CareerVerseAI() {
  const [view, setView] = useState("home"); // home | quiz | detail
  const [selectedDomain, setSelectedDomain] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const domainsRef = useRef(null);

  const filteredDomains = DOMAINS.filter(d => {
    const matchSearch = d.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchFilter = filter === "all" || (filter === "easy" && d.difficulty <= 2) || (filter === "hard" && d.difficulty >= 4) || (filter === "highsalary" && d.salary5yr >= 30);
    return matchSearch && matchFilter;
  });

  const scrollToDomains = () => { domainsRef.current?.scrollIntoView({ behavior: "smooth" }); };

  if (view === "quiz") return <CareerQuiz onClose={() => setView("home")} />;
  if (view === "detail" && selectedDomain) return <DomainDetail domain={selectedDomain} onBack={() => setView("home")} />;

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#F8FAFC", color: "#1F2937" }}>
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;800&family=Inter:wght@400;500;600&display=swap" rel="stylesheet"/>

      {/* Nav */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        background: "rgba(255,255,255,0.92)", backdropFilter: "blur(20px)",
        borderBottom: "1px solid #E2E8F0", padding: "0 24px", height: 64,
        display: "flex", alignItems: "center", justifyContent: "space-between"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: "linear-gradient(135deg, #1E3A5F, #3BA99C)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🚀</div>
          <span style={{ fontWeight: 800, fontSize: 18, color: "#1E3A5F", fontFamily: "'Poppins', sans-serif" }}>CareerVerse<span style={{ color: "#3BA99C" }}>AI</span></span>
        </div>
        <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
          {["Domains", "Salary", "Compare", "Roadmap"].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} style={{ fontSize: 14, color: "#64748B", textDecoration: "none", fontWeight: 500, transition: "color 0.2s" }}
              onMouseEnter={e => e.target.style.color = "#1E3A5F"}
              onMouseLeave={e => e.target.style.color = "#64748B"}
            >{item}</a>
          ))}
          <button onClick={() => setView("quiz")} style={{
            padding: "8px 20px", borderRadius: 8, border: "none", cursor: "pointer",
            background: "linear-gradient(135deg, #1E3A5F, #3BA99C)", color: "#fff",
            fontSize: 13, fontWeight: 600, fontFamily: "'Poppins', sans-serif"
          }}>Career Quiz →</button>
        </div>
      </nav>

      <div style={{ paddingTop: 64 }}>
        <Hero onExplore={scrollToDomains} onQuiz={() => setView("quiz")} />
        <StatsDashboard />

        {/* Domains Section */}
        <section id="domains" ref={domainsRef} style={{ padding: "80px 24px", background: "#F8FAFC" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <h2 style={{ fontSize: 32, fontWeight: 800, fontFamily: "'Poppins', sans-serif", color: "#1F2937", marginBottom: 8 }}>Explore Tech Domains</h2>
              <p style={{ color: "#64748B", marginBottom: 32 }}>Click any card to dive deep into the career path</p>

              {/* Search + Filter */}
              <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 24 }}>
                <div style={{ position: "relative" }}>
                  <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="🔍 Search domains..." style={{
                    padding: "10px 16px 10px 40px", borderRadius: 12, border: "2px solid #E2E8F0",
                    fontSize: 14, width: 240, background: "#fff", outline: "none"
                  }}/>
                  <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", fontSize: 16 }}>🔍</span>
                </div>
                {[["all", "All Domains"], ["easy", "Easy Start"], ["hard", "Advanced"], ["highsalary", "High Salary"]].map(([val, label]) => (
                  <button key={val} onClick={() => setFilter(val)} style={{
                    padding: "10px 16px", borderRadius: 12, border: `2px solid ${filter === val ? "#1E3A5F" : "#E2E8F0"}`,
                    background: filter === val ? "#1E3A5F" : "#fff", color: filter === val ? "#fff" : "#64748B",
                    fontSize: 13, cursor: "pointer", fontWeight: filter === val ? 600 : 400, transition: "all 0.2s"
                  }}>{label}</button>
                ))}
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20 }}>
              {filteredDomains.map((domain, i) => (
                <DomainCard key={domain.id} domain={domain} index={i} onClick={(d) => { setSelectedDomain(d); setView("detail"); }} />
              ))}
            </div>
          </div>
        </section>

        <EcosystemMap />

        <section id="salary">
          <SalarySection />
        </section>

        <RoadmapTimeline />

        <section id="compare">
          <ComparisonTool />
        </section>

        <FutureTrends />

        {/* CTA */}
        <section style={{ padding: "80px 24px", background: "linear-gradient(135deg, #1E3A5F 0%, #0F2A4A 100%)", textAlign: "center" }}>
          <div style={{ maxWidth: 600, margin: "0 auto" }}>
            <div style={{ fontSize: 56, marginBottom: 16 }}>🎯</div>
            <h2 style={{ fontSize: 32, fontWeight: 800, color: "#fff", fontFamily: "'Poppins', sans-serif", marginBottom: 12 }}>Ready to Find Your Path?</h2>
            <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 16, marginBottom: 32, lineHeight: 1.7 }}>
              Take the AI-powered career quiz and get personalized recommendations based on your interests and strengths.
            </p>
            <button onClick={() => setView("quiz")} style={{
              padding: "16px 40px", borderRadius: 14, border: "none", cursor: "pointer",
              background: "linear-gradient(135deg, #3BA99C, #2D8A7E)", color: "#fff",
              fontSize: 18, fontWeight: 700, letterSpacing: 0.3, fontFamily: "'Poppins', sans-serif",
              boxShadow: "0 8px 32px rgba(59,169,156,0.4)", transition: "all 0.3s ease"
            }}
              onMouseEnter={e => { e.target.style.transform = "translateY(-4px)"; e.target.style.boxShadow = "0 16px 40px rgba(59,169,156,0.5)"; }}
              onMouseLeave={e => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "0 8px 32px rgba(59,169,156,0.4)"; }}
            >Start Career Quiz →</button>
          </div>
        </section>

        {/* Footer */}
        <footer style={{ padding: "32px 24px", background: "#0F1E35", textAlign: "center" }}>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 13 }}>
            © 2024 CareerVerse AI — Empowering B.Tech students to find their perfect tech career path
          </p>
        </footer>
      </div>
    </div>
  );
}
