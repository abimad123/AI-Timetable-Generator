import React from 'react';

export const Input = ({ label, error, className = "", ...props }) => {
  return (
    <div className="w-full">
      {label && <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5 ml-1">{label}</label>}
      <input
        className={`w-full bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 text-slate-900 dark:text-slate-100 rounded-xl px-4 py-2.5 
        focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 focus:bg-white dark:focus:bg-slate-800 
        transition-all duration-300 placeholder-slate-400 dark:placeholder-slate-500 shadow-sm dark:shadow-inner ${className}`}
        {...props}
      />
      {error && <p className="text-red-500 dark:text-red-400 text-xs mt-1 ml-1">{error}</p>}
    </div>
  );
};

export const Select = ({ label, children, className = "", ...props }) => {
  return (
    <div className="w-full">
      {label && <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5 ml-1">{label}</label>}
      <div className="relative">
        <select
          className={`w-full bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 text-slate-900 dark:text-slate-100 rounded-xl px-4 py-2.5 pr-8
          focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 focus:bg-white dark:focus:bg-slate-800 
          appearance-none transition-all duration-300 shadow-sm dark:shadow-inner ${className}`}
          {...props}
        >
          {children}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
          <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
        </div>
      </div>
    </div>
  );
};