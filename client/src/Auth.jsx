import { useState } from 'react';
import { api } from './services/api';
import { motion, AnimatePresence } from 'framer-motion';

const Icons = {
  Mail: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>,
  Lock: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
  ArrowRight: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>,
  Eye: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>,
  EyeOff: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/></svg>,
  Check: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>,
  Sparkles: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L12 3Z"/></svg>,
};

export default function Auth({ onLogin }) {
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({ email: "", password: "", confirmPassword: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    if (isRegister && form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      if (isRegister) {
        await api.register({ email: form.email, password: form.password });
        alert("Account created! Please login.");
        setIsRegister(false);
        setForm({ email: "", password: "", confirmPassword: "" });
      } else {
        const res = await api.login({ email: form.email, password: form.password });
        if (res.data.token) {
             localStorage.setItem('token', res.data.token);
             onLogin();
        }
      }
    } catch (err) {
      setError(err.response?.data || "Something went wrong");
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white relative overflow-hidden transition-colors duration-500">
      
  
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-screen animate-blob"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-screen animate-blob animation-delay-2000"></div>
        <div className="absolute top-[40%] left-[40%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-screen animate-blob animation-delay-4000"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: "spring", bounce: 0.3 }}
        className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 relative z-10 min-h-[600px]"
      >
  
        <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center relative">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex items-center gap-2 mb-8"
            >
                <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-2 rounded-lg text-white shadow-lg shadow-indigo-500/20">
                    <Icons.Sparkles />
                </div>
                <span className="text-xl font-bold tracking-tight">Timetable<span className="text-indigo-600 dark:text-indigo-400">.ai</span></span>
            </motion.div>

            <motion.div layout className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300">
                {isRegister ? "Create an account" : "Welcome back"}
              </h1>
              <p className="text-slate-500 dark:text-slate-400">
                {isRegister ? "Enter your details to start organizing efficiently." : "Please enter your details to sign in."}
              </p>
            </motion.div>

            <form onSubmit={handleSubmit} className="space-y-5">
              
          
              <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
                <div className="relative group">
                   <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-500 transition-colors">
                      <Icons.Mail />
                   </div>
                   <input 
                      className="w-full pl-12 pr-4 py-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 dark:focus:border-indigo-500 outline-none transition-all text-slate-900 dark:text-white placeholder-slate-400 font-medium" 
                      placeholder="Email address" 
                      type="email" 
                      required
                      value={form.email} 
                      onChange={e => setForm({...form, email: e.target.value})} 
                    />
                </div>
              </motion.div>


              <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.3 }}>
                <div className="relative group">
                   <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-500 transition-colors">
                      <Icons.Lock />
                   </div>
                   <input 
                      className="w-full pl-12 pr-12 py-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 dark:focus:border-indigo-500 outline-none transition-all text-slate-900 dark:text-white placeholder-slate-400 font-medium" 
                      placeholder="Password" 
                      type={showPassword ? "text" : "password"} 
                      required
                      value={form.password} 
                      onChange={e => setForm({...form, password: e.target.value})} 
                    />
                    <button 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors focus:outline-none"
                    >
                      {showPassword ? <Icons.EyeOff /> : <Icons.Eye />}
                    </button>
                </div>
              </motion.div>

          
              <AnimatePresence>
                {isRegister && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                      <div className="relative group pb-1">
                         <div className="absolute inset-y-0 left-0 top-0 bottom-1 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-500 transition-colors">
                            <Icons.Check />
                         </div>
                         <input 
                            className="w-full pl-12 pr-4 py-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 dark:focus:border-indigo-500 outline-none transition-all text-slate-900 dark:text-white placeholder-slate-400 font-medium" 
                            placeholder="Confirm Password" 
                            type="password" 
                            required={isRegister}
                            value={form.confirmPassword} 
                            onChange={e => setForm({...form, confirmPassword: e.target.value})} 
                          />
                      </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {error && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="p-3 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-400 text-sm text-center font-medium flex items-center justify-center gap-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>

            
              <motion.button 
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                disabled={loading}
                className="w-full py-4 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-lg hover:shadow-xl hover:shadow-indigo-500/20 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 group relative overflow-hidden"
              >
                 {loading ? (
                    <div className="flex items-center gap-2">
                        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Processing...</span>
                     </div>
                 ) : (
                    <>
                        <span>{isRegister ? "Sign up free" : "Sign in"}</span>
                        <motion.span 
                          animate={{ x: [0, 5, 0] }} 
                          transition={{ repeat: Infinity, duration: 1.5, repeatDelay: 1 }}
                        >
                            <Icons.ArrowRight />
                        </motion.span>
                    </>
                 )}
              </motion.button>
            </form>

            <motion.div layout className="mt-8 text-center">
                <span className="text-slate-500 dark:text-slate-400">
                    {isRegister ? "Already have an account?" : "Don't have an account yet?"}
                </span>
                <button 
                    onClick={() => {
                        setIsRegister(!isRegister);
                        setError("");
                        setForm({ email: "", password: "", confirmPassword: "" });
                    }}
                    className="ml-2 text-indigo-600 dark:text-indigo-400 font-bold hover:underline transition-colors"
                >
                    {isRegister ? "Log in" : "Sign up"}
                </button>
            </motion.div>
        </div>

      
        <div className="hidden md:block relative overflow-hidden bg-slate-900">
           
            <div className="absolute inset-0">
                <div className="absolute top-[-20%] right-[-20%] w-[100%] h-[100%] bg-indigo-600/30 rounded-full blur-[80px] animate-blob"></div>
                <div className="absolute bottom-[-20%] left-[-20%] w-[100%] h-[100%] bg-purple-600/30 rounded-full blur-[80px] animate-blob animation-delay-2000"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/90 to-purple-800/90 mix-blend-multiply"></div>
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]"></div>
            </div>

          
            <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center text-white z-10">
                <AnimatePresence mode="wait">
                    {isRegister ? (
                        <motion.div
                            key="register-visual"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.4 }}
                            className="max-w-md"
                        >
                            <div className="mb-6 inline-block p-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl">
                                <span className="text-4xl">🚀</span>
                            </div>
                            <h2 className="text-4xl font-bold mb-4">Start your journey</h2>
                            <p className="text-lg text-indigo-100 leading-relaxed">
                                Join thousands of schools and universities optimizing their schedules with our AI-powered genetic algorithms.
                            </p>
                            
                            <div className="mt-8 flex flex-wrap justify-center gap-3">
                                <span className="px-3 py-1 rounded-full bg-white/10 border border-white/10 text-sm">✨ Smart Sorting</span>
                                <span className="px-3 py-1 rounded-full bg-white/10 border border-white/10 text-sm">⚡ Instant Results</span>
                                <span className="px-3 py-1 rounded-full bg-white/10 border border-white/10 text-sm">🛡️ Conflict Free</span>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="login-visual"
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 50 }}
                            transition={{ duration: 0.4 }}
                            className="max-w-md"
                        >
                            <div className="mb-6 inline-block p-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl">
                                <span className="text-4xl">👋</span>
                            </div>
                            <h2 className="text-4xl font-bold mb-4">Welcome Back!</h2>
                            <p className="text-lg text-indigo-100 leading-relaxed">
                                Ready to generate some timetables? Log in to access your saved teachers, rooms, and subject configurations.
                            </p>
                            
                            <div className="mt-12 p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 text-left">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                                    <span className="text-xs font-mono opacity-70">SYSTEM STATUS</span>
                                </div>
                                <div className="space-y-2">
                                    <div className="h-1.5 w-[80%] bg-white/20 rounded-full"></div>
                                    <div className="h-1.5 w-[60%] bg-white/20 rounded-full"></div>
                                </div>
                                <p className="mt-3 text-xs opacity-70">AI Engine Online & Ready</p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
      </motion.div>
    </div>
  );
}