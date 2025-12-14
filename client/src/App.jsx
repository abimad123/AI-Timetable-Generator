import { useState, useEffect, useCallback } from 'react';
import { api } from './services/api';
import { generateTimetable } from './services/geneticEngine';
import { Input, Select } from './components/Input';
import { motion, AnimatePresence } from 'framer-motion';
import Auth from './Auth'; // Import the Auth component

// --- Icons ---
const Icons = {
  // Add this inside the const Icons = { ... } object
LogOut: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>,
  Trash: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>,
  Generate: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v4"/><path d="M12 18v4"/><path d="M4.93 4.93l2.83 2.83"/><path d="M16.24 16.24l2.83 2.83"/><path d="M2 12h4"/><path d="M18 12h4"/><path d="M4.93 19.07l2.83-2.83"/><path d="M16.24 7.76l2.83-2.83"/></svg>,
  Plus: () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>,
  User: () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  Book: () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>,
  Home: () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  Sparkles: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L12 3Z"/></svg>,
  ArrowRight: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>,
  Download: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>,
  Moon: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>,
  Sun: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 24 } },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } }
};

const cardVariants = {
  hover: { y: -4, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)" }
};

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [teachers, setTeachers] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [timetable, setTimetable] = useState(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Form States
  const [teacherForm, setTeacherForm] = useState({ name: "", email: "", subject: "" });
  const [roomForm, setRoomForm] = useState({ name: "", capacity: "30" });
  const [subjectForm, setSubjectForm] = useState({ name: "", code: "", weeklyHours: "3", studentCount: "30" });

  const handleLogout = useCallback(() => {
    localStorage.removeItem('token');
    setToken(null);
    setTeachers([]);
    setRooms([]);
    setSubjects([]);
    setTimetable(null);
  }, []);

  useEffect(() => {
    // ✅ Fix: Only fetch data if we have a token
    if (token) {
      refreshData()
        .then(() => setLoading(false))
        .catch(() => {
           // If token is invalid (401), force logout
           handleLogout();
           setLoading(false);
        });
    } else {
      setLoading(false);
    }

    // Theme Logic
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (savedTheme === 'light') setIsDarkMode(false);
    else if (savedTheme === 'dark') setIsDarkMode(true);
    else setIsDarkMode(prefersDark);
  }, [token, handleLogout]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const refreshData = async () => {
    const [t, r, s] = await Promise.all([
      api.getTeachers(),
      api.getRooms(),
      api.getSubjects()
    ]);
    setTeachers(t);
    setRooms(r);
    setSubjects(s);
  };

  const handleAddTeacher = async () => {
    if (!teacherForm.name || !teacherForm.email) return alert("Fill all fields");
    await api.addTeacher({
      name: teacherForm.name,
      email: teacherForm.email,
      subject: teacherForm.subject 
    });
    setTeacherForm({ name: "", email: "", subject: "" });
    refreshData();
  };

  const handleAddRoom = async () => {
    if (!roomForm.name) return alert("Room name is required");
    await api.addRoom({ 
      name: roomForm.name, 
      capacity: parseInt(roomForm.capacity) || 30 
    });
    setRoomForm({ name: "", capacity: "30" });
    refreshData();
  };

  const handleAddSubject = async () => {
    if (!subjectForm.code || !subjectForm.name) return alert("Code and Name required");
    await api.addSubject({
      name: subjectForm.name,
      code: subjectForm.code,
      weeklyHours: parseInt(subjectForm.weeklyHours) || 3,
      studentCount: parseInt(subjectForm.studentCount) || 30
    });
    setSubjectForm({ name: "", code: "", weeklyHours: "3", studentCount: "30" });
    refreshData();
  };

  const handleDelete = async (type, id) => {
    if(!window.confirm("Are you sure?")) return;
    if (type === 'teacher') await api.deleteTeacher(id);
    if (type === 'room') await api.deleteRoom(id);
    if (type === 'subject') await api.deleteSubject(id);
    refreshData();
  };

  const handleGenerate = useCallback(async (scroll = true) => {
    if (teachers.length === 0 || rooms.length === 0 || subjects.length === 0) {
      alert("Please add at least one teacher, one room, and one subject.");
      return;
    }
    
    setGenerating(true);
    setTimetable(null);
    
    setTimeout(() => {
      const schedule = generateTimetable(teachers, rooms, subjects);
      
      const grouped = schedule.reduce((acc, slot) => {
        if (!acc[slot.day]) acc[slot.day] = [];
        acc[slot.day].push(slot);
        return acc;
      }, {});

      setTimetable(grouped);
      setGenerating(false);
      
      if(scroll) {
        setTimeout(() => {
            document.getElementById('schedule-section')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }, 800);
  }, [teachers, rooms, subjects]);

  const handleExportCSV = () => {
    if (!timetable) return;
    const headers = ["Day", "Time", "Subject", "Teacher", "Room"];
    const rows = [];
    Object.keys(timetable).forEach(day => {
      timetable[day].forEach(slot => {
        const clean = (text) => `"${text.replace(/"/g, '""')}"`;
        rows.push([clean(day), clean(slot.time), clean(slot.subject), clean(slot.teacher), clean(slot.room)].join(","));
      });
    });
    const csvContent = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `timetable_export_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const scrollToBuilder = () => {
    document.getElementById('builder-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  // ✅ Authentication Guard
  if (!token) {
    return <Auth onLogin={() => {
        setToken(localStorage.getItem('token'));
        // refreshData() will be triggered by useEffect when token changes
    }} />;
  }

  const dayOrder = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  if (loading) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white relative overflow-hidden transition-colors duration-300">
             <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-200/40 dark:from-indigo-900/40 via-white dark:via-slate-950 to-white dark:to-slate-950 z-0"></div>
             <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }} className="z-10 text-4xl">✨</motion.div>
             <p className="z-10 mt-4 text-slate-500 dark:text-slate-400 font-light tracking-widest uppercase text-sm">Initializing AI...</p>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-300 font-sans pb-20 relative selection:bg-indigo-500/30 overflow-x-hidden transition-colors duration-300">
      
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-3xl mix-blend-multiply dark:mix-blend-screen animate-blob"></div>
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-3xl mix-blend-multiply dark:mix-blend-screen animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-20%] left-[20%] w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-3xl mix-blend-multiply dark:mix-blend-screen animate-blob animation-delay-4000"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
      </div>

      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 dark:bg-slate-950/70 border-b border-slate-200 dark:border-white/5 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="flex items-center gap-3 cursor-pointer group" onClick={() => window.scrollTo({top:0, behavior:'smooth'})}>
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-2.5 rounded-xl shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-300">
              <span className="text-white"><Icons.Sparkles /></span>
            </div>
            <div className="flex flex-col">
              <h1 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight leading-none">Timetable<span className="text-indigo-500 dark:text-indigo-400">.ai</span></h1>
              <span className="text-[10px] text-slate-500 font-medium tracking-wide uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300 -mt-1">Intelligent Scheduler</span>
            </div>
          </motion.div>
          <div className="flex items-center gap-2 sm:gap-4">
            

              <motion.button whileTap={{ scale: 0.9 }} onClick={toggleTheme} className="p-2.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
              {isDarkMode ? <Icons.Sun /> : <Icons.Moon />}
            </motion.button>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => handleGenerate(true)} disabled={generating} className={`hidden md:flex items-center gap-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-[length:200%_auto] hover:bg-right transition-all duration-500 text-white px-5 py-2.5 rounded-xl font-medium shadow-xl shadow-indigo-900/20 ring-1 ring-white/10 ${generating ? 'opacity-70 cursor-wait' : ''}`}>
              {generating ? <><span className="animate-spin mr-1">⚡</span> Generating...</> : <><Icons.Generate /> <span className="hidden lg:inline">Generate</span></>}
            </motion.button>
      
<motion.button 
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.95 }}
  onClick={handleLogout} 
  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-red-50 dark:hover:bg-red-500/10 hover:text-red-600 dark:hover:text-red-400 transition-colors font-medium text-sm"
>
  <Icons.LogOut />
  <span className="hidden sm:inline">Logout</span>
</motion.button>

          
          </div>
        </div>
      </header>

      <main>
        <section className="relative z-10 flex flex-col items-center justify-center min-h-[85vh] text-center px-4 pt-10 pb-20">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/20 rounded-full blur-[120px] -z-10 pointer-events-none" />
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 dark:bg-slate-800/50 border border-slate-200 dark:border-indigo-500/30 text-indigo-600 dark:text-indigo-300 text-[11px] font-bold uppercase tracking-widest mb-8 backdrop-blur-md shadow-lg shadow-indigo-500/10">
                <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span></span>
                Genetic Algorithm Engine v2.0
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8 }} className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-slate-900 dark:text-white mb-8 tracking-tight max-w-5xl leading-[1.1]">
                Master Your Schedule <br className="hidden md:block" /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 dark:from-indigo-400 dark:via-purple-400 dark:to-indigo-400 animate-pulse">Without the Chaos.</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mb-10 leading-relaxed font-light">
                Say goodbye to scheduling conflicts. Our intelligent system allocates teachers, rooms, and subjects perfectly in milliseconds.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto px-4">
                <button onClick={scrollToBuilder} className="group px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-950 rounded-full font-bold text-lg hover:bg-slate-800 dark:hover:bg-indigo-50 transition-all shadow-xl shadow-indigo-500/20 flex items-center justify-center gap-2">Start Scheduling <span className="group-hover:translate-x-1 transition-transform"><Icons.ArrowRight /></span></button>
            </motion.div>
        </section>

        <div id="builder-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10 border-t border-slate-200 dark:border-white/5 bg-slate-50/50 dark:bg-slate-950/50">
            <div className="flex items-center justify-between mb-12">
                <div><h2 className="text-3xl font-bold text-slate-900 dark:text-white">Data Entry</h2><p className="text-slate-500">Define your resources constraints</p></div>
            </div>

            <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">

            <motion.div variants={itemVariants} className="flex flex-col h-[520px] bg-white dark:bg-slate-900/40 backdrop-blur-md border border-slate-200 dark:border-white/5 rounded-3xl shadow-xl dark:shadow-2xl overflow-hidden ring-1 ring-slate-900/5 dark:ring-white/5 transition-colors duration-300">
                <div className="p-6 border-b border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/5 flex justify-between items-center">
                <h2 className="font-bold text-slate-800 dark:text-white flex items-center gap-3"><div className="p-2 bg-blue-100 dark:bg-blue-500/20 rounded-lg text-blue-600 dark:text-blue-400"><Icons.User /></div> Teachers</h2>
                <span className="bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-300 dark:border-slate-700 text-xs px-2.5 py-0.5 rounded-full font-bold shadow-sm">{teachers.length}</span>
                </div>
                <div className="p-5 space-y-4 bg-gradient-to-b from-slate-50 dark:from-slate-900/50 to-transparent">
                <div className="grid grid-cols-2 gap-3">
                    <Input placeholder="Name" value={teacherForm.name} onChange={e => setTeacherForm({...teacherForm, name: e.target.value})} />
                    <Input placeholder="Email" value={teacherForm.email} onChange={e => setTeacherForm({...teacherForm, email: e.target.value})} />
                </div>
                <Select value={teacherForm.subject} onChange={e => setTeacherForm({...teacherForm, subject: e.target.value})}>
                    <option value="">Any Subject (General)</option>
                    {subjects.map((s) => (
                    <option key={s._id} value={s.code}>{s.name} ({s.code})</option>
                    ))}
                </Select>
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleAddTeacher} className="w-full bg-slate-800 dark:bg-slate-800 hover:bg-slate-700 dark:hover:bg-slate-700 border border-transparent dark:border-slate-700 text-white dark:text-slate-200 py-2.5 rounded-xl text-sm font-semibold transition-colors flex justify-center items-center gap-2 shadow-lg">
                    <Icons.Plus /> Add Teacher
                </motion.button>
                </div>
                <div className="flex-1 overflow-y-auto p-3 space-y-2 custom-scrollbar">
                <AnimatePresence mode="popLayout">
                    {teachers.length === 0 && (<motion.div initial={{opacity: 0}} animate={{opacity: 1}} className="flex flex-col items-center justify-center h-full text-slate-400 dark:text-slate-600 space-y-2"><Icons.User /><span className="text-sm">No teachers yet</span></motion.div>)}
                    {teachers.map(t => (
                    <motion.div key={t._id} variants={itemVariants} initial="hidden" animate="visible" exit="exit" layout className="group relative flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-800/80 border border-slate-100 dark:border-white/5 hover:border-blue-300 dark:hover:border-blue-500/30 transition-all cursor-default">
                        <div className="flex items-center gap-3 overflow-hidden">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-xs shadow-md">{t.name.charAt(0)}</div>
                            <div className="flex flex-col min-w-0">
                                <p className="font-semibold text-slate-700 dark:text-slate-200 truncate text-sm">{t.name}</p>
                                <p className="text-[11px] text-slate-500 truncate">{t.email} • <span className="text-blue-500 dark:text-blue-400">{t.subject || 'General'}</span></p>
                            </div>
                        </div>
                        <button onClick={() => handleDelete('teacher', t._id)} className="opacity-0 group-hover:opacity-100 p-2 text-slate-400 hover:text-red-500 dark:text-slate-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-all"><Icons.Trash /></button>
                    </motion.div>
                    ))}
                </AnimatePresence>
                </div>
            </motion.div>

  
            <motion.div variants={itemVariants} className="flex flex-col h-[520px] bg-white dark:bg-slate-900/40 backdrop-blur-md border border-slate-200 dark:border-white/5 rounded-3xl shadow-xl dark:shadow-2xl overflow-hidden ring-1 ring-slate-900/5 dark:ring-white/5 transition-colors duration-300">
                <div className="p-6 border-b border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/5 flex justify-between items-center">
                <h2 className="font-bold text-slate-800 dark:text-white flex items-center gap-3"><div className="p-2 bg-emerald-100 dark:bg-emerald-500/20 rounded-lg text-emerald-600 dark:text-emerald-400"><Icons.Home /></div> Rooms</h2>
                <span className="bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-300 dark:border-slate-700 text-xs px-2.5 py-0.5 rounded-full font-bold shadow-sm">{rooms.length}</span>
                </div>
                <div className="p-5 space-y-4 bg-gradient-to-b from-slate-50 dark:from-slate-900/50 to-transparent">
                <div className="flex gap-3">
                    <Input className="flex-1" placeholder="Room Name" value={roomForm.name} onChange={e => setRoomForm({...roomForm, name: e.target.value})} />
                    <Input type="number" className="w-24 text-center" placeholder="Cap" value={roomForm.capacity} onChange={e => setRoomForm({...roomForm, capacity: e.target.value})} />
                </div>
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleAddRoom} className="w-full bg-slate-800 dark:bg-slate-800 hover:bg-slate-700 dark:hover:bg-slate-700 border border-transparent dark:border-slate-700 text-white dark:text-slate-200 py-2.5 rounded-xl text-sm font-semibold transition-colors flex justify-center items-center gap-2 shadow-lg">
                    <Icons.Plus /> Add Room
                </motion.button>
                </div>
                <div className="flex-1 overflow-y-auto p-3 space-y-2 custom-scrollbar">
                <AnimatePresence mode="popLayout">
                    {rooms.length === 0 && (<motion.div initial={{opacity: 0}} animate={{opacity: 1}} className="flex flex-col items-center justify-center h-full text-slate-400 dark:text-slate-600 space-y-2"><Icons.Home /><span className="text-sm">No rooms yet</span></motion.div>)}
                    {rooms.map(r => (
                    <motion.div key={r._id} variants={itemVariants} initial="hidden" animate="visible" exit="exit" layout className="group relative flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-800/80 border border-slate-100 dark:border-white/5 hover:border-emerald-300 dark:hover:border-emerald-500/30 transition-all cursor-default">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-bold text-xs border border-emerald-500/20">{r.capacity}</div>
                            <div><p className="font-semibold text-slate-700 dark:text-slate-200 text-sm">{r.name}</p><p className="text-[11px] text-slate-500">Max students</p></div>
                        </div>
                        <button onClick={() => handleDelete('room', r._id)} className="opacity-0 group-hover:opacity-100 p-2 text-slate-400 hover:text-red-500 dark:text-slate-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-all"><Icons.Trash /></button>
                    </motion.div>
                    ))}
                </AnimatePresence>
                </div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col h-[520px] bg-white dark:bg-slate-900/40 backdrop-blur-md border border-slate-200 dark:border-white/5 rounded-3xl shadow-xl dark:shadow-2xl overflow-hidden ring-1 ring-slate-900/5 dark:ring-white/5 transition-colors duration-300">
                <div className="p-6 border-b border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/5 flex justify-between items-center">
                <h2 className="font-bold text-slate-800 dark:text-white flex items-center gap-3"><div className="p-2 bg-purple-100 dark:bg-purple-500/20 rounded-lg text-purple-600 dark:text-purple-400"><Icons.Book /></div> Subjects</h2>
                <span className="bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-300 dark:border-slate-700 text-xs px-2.5 py-0.5 rounded-full font-bold shadow-sm">{subjects.length}</span>
                </div>
                <div className="p-5 space-y-4 bg-gradient-to-b from-slate-50 dark:from-slate-900/50 to-transparent">
                <div className="grid grid-cols-2 gap-3">
                    <Input placeholder="Name" value={subjectForm.name} onChange={e => setSubjectForm({...subjectForm, name: e.target.value})} />
                    <Input placeholder="Code" value={subjectForm.code} onChange={e => setSubjectForm({...subjectForm, code: e.target.value})} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <Input type="number" label="Hrs/Week" value={subjectForm.weeklyHours} onChange={e => setSubjectForm({...subjectForm, weeklyHours: e.target.value})} />
                    <Input type="number" label="Students" value={subjectForm.studentCount} onChange={e => setSubjectForm({...subjectForm, studentCount: e.target.value})} />
                </div>
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleAddSubject} className="w-full bg-slate-800 dark:bg-slate-800 hover:bg-slate-700 dark:hover:bg-slate-700 border border-transparent dark:border-slate-700 text-white dark:text-slate-200 py-2.5 rounded-xl text-sm font-semibold transition-colors flex justify-center items-center gap-2 shadow-lg">
                    <Icons.Plus /> Add Subject
                </motion.button>
                </div>
                <div className="flex-1 overflow-y-auto p-3 space-y-2 custom-scrollbar">
                <AnimatePresence mode="popLayout">
                    {subjects.length === 0 && (<motion.div initial={{opacity: 0}} animate={{opacity: 1}} className="flex flex-col items-center justify-center h-full text-slate-400 dark:text-slate-600 space-y-2"><Icons.Book /><span className="text-sm">No subjects yet</span></motion.div>)}
                    {subjects.map(s => (
                    <motion.div key={s._id} variants={itemVariants} initial="hidden" animate="visible" exit="exit" layout className="group relative flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-800/80 border border-slate-100 dark:border-white/5 hover:border-purple-300 dark:hover:border-purple-500/30 transition-all cursor-default">
                        <div className="flex flex-col min-w-0">
                            <div className="flex items-center gap-2">
                            <span className="font-mono text-xs text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-500/10 px-1.5 rounded border border-purple-200 dark:border-purple-500/20">{s.code}</span>
                            <p className="font-semibold text-slate-700 dark:text-slate-200 text-sm truncate">{s.name}</p>
                            </div>
                            <p className="text-[11px] text-slate-500 mt-0.5 ml-1">{s.weeklyHours}h/week • {s.studentCount} students</p>
                        </div>
                        <button onClick={() => handleDelete('subject', s._id)} className="opacity-0 group-hover:opacity-100 p-2 text-slate-400 hover:text-red-500 dark:text-slate-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-all"><Icons.Trash /></button>
                    </motion.div>
                    ))}
                </AnimatePresence>
                </div>
            </motion.div>
            </motion.div>

            <div id="schedule-section" className="space-y-8 min-h-[400px]">
            <AnimatePresence mode="wait">
            {timetable ? (
                <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, type: "spring" }}>
                <div className="flex items-center justify-between mb-8">
                    <div><h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Generated Schedule</h2><p className="text-slate-500 dark:text-slate-400 mt-1"> optimized for efficiency</p></div>
                    <div className="flex items-center gap-3">
                         <button onClick={handleExportCSV} className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-medium shadow-lg shadow-emerald-500/20 transition-all hover:-translate-y-0.5 active:translate-y-0"><Icons.Download /> Export CSV</button>
                        <div className="px-4 py-2 bg-white dark:bg-slate-800/50 rounded-full border border-slate-200 dark:border-white/10 text-sm text-slate-500 dark:text-slate-400 shadow-sm">Total Classes: <span className="text-slate-900 dark:text-white font-bold">{Object.values(timetable).flat().length}</span></div>
                    </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6">
                    {dayOrder.map((day, dayIdx) => {
                    const slots = timetable[day];
                    if(!slots) return null;
                    const sortedSlots = [...slots].sort((a,b) => a.sortTime - b.sortTime);

                    return (
                        <motion.div key={day} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: dayIdx * 0.1 }} className="bg-white/80 dark:bg-slate-900/60 backdrop-blur-md border border-slate-200 dark:border-white/5 rounded-2xl overflow-hidden shadow-xl dark:shadow-2xl flex flex-col hover:border-indigo-300 dark:hover:border-white/10 transition-colors">
                        <div className="bg-slate-50/80 dark:bg-slate-800/50 p-4 border-b border-slate-200 dark:border-white/5 flex items-center justify-between">
                            <span className="font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest text-xs">{day}</span>
                            <span className="text-xs font-mono text-slate-500">{sortedSlots.length} slots</span>
                        </div>
                        <div className="p-3 space-y-3 flex-1 overflow-y-auto max-h-[600px] custom-scrollbar">
                            {sortedSlots.map((slot, idx) => (
                            <motion.div key={idx} whileHover="hover" variants={cardVariants} className="bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-800/50 p-4 rounded-xl border border-slate-200 dark:border-white/5 group relative shadow-sm">
                                <div className="absolute left-0 top-4 bottom-4 w-1 bg-indigo-500 rounded-r-full"></div>
                                <div className="ml-3">
                                    <div className="flex justify-between items-start mb-2"><span className="text-[10px] font-mono font-bold text-indigo-600 dark:text-indigo-300 bg-indigo-100 dark:bg-indigo-500/10 px-2 py-0.5 rounded-md border border-indigo-200 dark:border-indigo-500/20">{slot.time}</span></div>
                                    <h4 className="font-bold text-slate-800 dark:text-white text-sm mb-2 leading-snug">{slot.subject}</h4>
                                    <div className="space-y-1.5">
                                        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400"><Icons.User /> <span className="group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors">{slot.teacher}</span></div>
                                        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400"><Icons.Home /> <span className="group-hover:text-emerald-600 dark:group-hover:text-emerald-300 transition-colors">{slot.room}</span></div>
                                    </div>
                                </div>
                            </motion.div>
                            ))}
                        </div>
                        </motion.div>
                    )
                    })}
                </div>
                </motion.div>
            ) : (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center py-24 border border-dashed border-slate-300 dark:border-slate-800 rounded-3xl bg-slate-50 dark:bg-slate-900/20">
                    <div className="w-24 h-24 bg-white dark:bg-slate-800/50 rounded-full flex items-center justify-center mb-6 shadow-inner border border-slate-100 dark:border-white/5"><span className="text-4xl opacity-50 grayscale">📅</span></div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Ready to Schedule</h3>
                    <p className="text-slate-500 text-center max-w-md">Add your teachers, rooms, and subjects above, then click the <span className="text-indigo-600 dark:text-indigo-400 font-medium"> Generate </span> button to let AI create the perfect timetable.</p>
                </motion.div>
            )}
            </AnimatePresence>
            </div>
        </div>
      </main>
    </div>
  );
}

export default App;